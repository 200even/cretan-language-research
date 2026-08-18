#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const commentaryDir = getArg('--commentary-dir');
const overridesPath = getArg('--source-overrides');
const outPath = getArg('--out', 'data/generated-v04/structural-mask.csv');
if (!commentaryDir || !overridesPath) {
  console.error('Usage: node scripts/build-structural-mask-v04.mjs --commentary-dir /path/to/commentary --source-overrides data/v04-source-overrides.csv --out structural-mask.csv');
  process.exit(2);
}

const canonical = value => String(value)
  .normalize('NFKC')
  .toUpperCase()
  .replaceAll('–', '-')
  .replaceAll('—', '-')
  .replace(/\s*-\s*/g, '-')
  .replace(/\s+/g, ' ')
  .trim();

const decodeEntities = text => String(text)
  .replace(/&nbsp;/gi, ' ')
  .replace(/&bull;/gi, '•')
  .replace(/&middot;/gi, '·')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));

const stripHtml = html => canonical(decodeEntities(String(html)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')));

const parseCsv = text => {
  const rows = []; let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const [headers, ...body] = rows.filter(r => r.some(v => v !== ''));
  return body.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ''])));
};

const SIGN = String.raw`(?:\*[0-9]+[A-Z]?|[A-Z]+[0-9]*)`;
const WORD = String.raw`${SIGN}(?:-${SIGN})+`;
const wordPattern = new RegExp(WORD, 'g');

const rows = new Map();
const getRow = (id, form) => {
  const cid = canonical(id);
  const normalized = canonical(form);
  const key = `${cid}\t${normalized}`;
  if (!rows.has(key)) rows.set(key, {
    commentary_id: cid,
    form: normalized,
    boundary_insecure_count: 0,
    continuation_fragment_count: 0,
    complex_logogram_count: 0,
    cross_script_count: 0,
    source_override_count: 0,
    reasons: new Set(),
    evidence: new Set(),
  });
  return rows.get(key);
};

const add = (id, form, field, reason, evidence = '') => {
  const row = getRow(id, form);
  row[field]++;
  row.reasons.add(reason);
  if (evidence) row.evidence.add(canonical(evidence));
};

const files = fs.readdirSync(commentaryDir).filter(f => f.toLowerCase().endsWith('.html')).sort();
for (const file of files) {
  const id = path.basename(file, path.extname(file));
  const html = fs.readFileSync(path.join(commentaryDir, file), 'utf8');

  // v0.3-compatible physical-boundary scan: prefer the first inscription table
  // so explanatory prose does not contaminate a secure spelling elsewhere.
  const firstTable = html.match(/<table\b[^>]*>[\s\S]*?<\/table>/i)?.[0] ?? html;
  const boundaryText = stripHtml(firstTable);
  for (const match of boundaryText.matchAll(wordPattern)) {
    const start = match.index;
    const end = start + match[0].length;
    const before = boundaryText.slice(Math.max(0, start - 6), start);
    const after = boundaryText.slice(end, Math.min(boundaryText.length, end + 6));
    const leftInsecure = /]\s*-?\s*$/.test(before) || /\[\[\s*$/.test(before);
    const rightInsecure = /^\s*-?\s*\[/.test(after) || /^\s*]]/.test(after);
    if (leftInsecure || rightInsecure) {
      add(id, match[0], 'boundary_insecure_count', 'physical_boundary', boundaryText.slice(Math.max(0, start - 18), Math.min(boundaryText.length, end + 18)));
    }
  }

  // Editorial continuation scan. A trailing hyphen at the end of a transcription
  // block or a leading hyphen at the start of the following block is evidence
  // that the normalized segment is not an independent free word.
  const blocks = [...html.matchAll(/<(?:dd|td)\b[^>]*>([\s\S]*?)<\/(?:dd|td)>/gi)].map(m => stripHtml(m[1]));
  for (const block of blocks) {
    const leftPattern = new RegExp(`(${WORD})-\\s*(?:$|[•·])`, 'g');
    for (const m of block.matchAll(leftPattern)) {
      add(id, m[1], 'continuation_fragment_count', 'editorial_continuation', block);
    }
    const rightPattern = new RegExp(`(?:^|:)\\s*-(${SIGN}(?:-${SIGN})+)`, 'g');
    for (const m of block.matchAll(rightPattern)) {
      add(id, m[1], 'continuation_fragment_count', 'editorial_continuation', block);
    }
  }

  // Type scans operate on explicit table columns/markers rather than word shape.
  for (const tableMatch of html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)) {
    const table = tableMatch[0];
    const trMatches = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
    if (!trMatches.length) continue;
    const parsedRows = trMatches.map(tr => [...tr[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/gi)].map(c => stripHtml(c[1])));

    const headerIndex = parsedRows.findIndex(cells => cells.some(c => c.includes('LOGOGRAM')) || cells.some(c => c.includes('STATEMENT')));
    if (headerIndex < 0) continue;
    const logogramCol = parsedRows[headerIndex].findIndex(c => c.includes('LOGOGRAM'));
    const statementCol = parsedRows[headerIndex].findIndex(c => c.includes('STATEMENT'));

    // Complex/logographic entries can be flattened by a normalized corpus into
    // strings such as MA-RU-ME even though the edition types MA+RU ME {*561}
    // in a LOGOGRAM column.
    if (logogramCol >= 0) {
      for (let r = headerIndex + 1; r < parsedRows.length; r++) {
        const cell = parsedRows[r][logogramCol] || '';
        if (!cell || (!cell.includes('+') && !/\{\s*\*\d+/i.test(cell))) continue;
        for (const segment of cell.split(/[•·;]/)) {
          if (!segment.includes('+') && !/\{\s*\*\d+/i.test(segment)) continue;
          const withoutBraces = segment.replace(/\{[^}]*\}/g, ' ');
          const tokens = withoutBraces.match(new RegExp(SIGN, 'g')) || [];
          if (tokens.length < 2) continue;
          add(id, tokens.join('-'), 'complex_logogram_count', 'complex_logogram', cell);
        }
      }
    }

    // Some corpus rows originate in explicitly Hieroglyphic seal impressions.
    // A statement beginning H: is not admitted as a Linear A free-word token.
    if (statementCol >= 0) {
      for (let r = headerIndex + 1; r < parsedRows.length; r++) {
        const cell = parsedRows[r][statementCol] || '';
        if (!/^H\s*:/.test(cell)) continue;
        for (const m of cell.matchAll(new RegExp(WORD, 'g'))) {
          add(id, m[0], 'cross_script_count', 'non_linear_a_script', cell);
        }
      }
    }
  }
}

// Explicit source corrections are versioned separately because they cannot be
// inferred from a pinned exploratory source that lacks the authoritative reading.
for (const override of parseCsv(fs.readFileSync(overridesPath, 'utf8'))) {
  const n = Math.max(1, Number(override.exclude_count || 1));
  const row = getRow(override.inscription_id, override.form);
  row.source_override_count += n;
  row.reasons.add(override.reason_class || 'source_override');
  if (override.rationale) row.evidence.add(canonical(override.rationale));
}

const escapeCsv = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const output = [...rows.values()].map(row => ({
  ...row,
  // Evidence layers can describe the same attestation, so use the maximum
  // rather than summing and accidentally excluding one occurrence twice.
  exclude_count: Math.max(row.boundary_insecure_count, row.continuation_fragment_count, row.complex_logogram_count, row.cross_script_count, row.source_override_count),
  reason_classes: [...row.reasons].sort().join('|'),
  evidence_text: [...row.evidence].slice(0, 5).join(' || '),
})).filter(row => row.exclude_count > 0)
  .sort((a, b) => a.commentary_id.localeCompare(b.commentary_id) || a.form.localeCompare(b.form));

const headers = ['commentary_id','form','exclude_count','boundary_insecure_count','continuation_fragment_count','complex_logogram_count','cross_script_count','source_override_count','reason_classes','evidence_text'];
const csv = [headers.join(','), ...output.map(row => headers.map(h => escapeCsv(row[h])).join(','))].join('\n') + '\n';
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, csv);

const totals = {
  boundary: output.reduce((s, r) => s + r.boundary_insecure_count, 0),
  continuation: output.reduce((s, r) => s + r.continuation_fragment_count, 0),
  logogram: output.reduce((s, r) => s + r.complex_logogram_count, 0),
  crossScript: output.reduce((s, r) => s + r.cross_script_count, 0),
  source: output.reduce((s, r) => s + r.source_override_count, 0),
};
console.log(`Structural mask rows: ${output.length}`);
console.log(`Evidence counts: boundary=${totals.boundary}, continuation=${totals.continuation}, complex_logogram=${totals.logogram}, cross_script=${totals.crossScript}, source_override=${totals.source}`);
console.log(`Wrote ${outPath}`);
