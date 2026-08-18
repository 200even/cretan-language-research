#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const commentaryDir = getArg('--commentary-dir');
const outPath = getArg('--out', 'data/generated/boundary-mask.csv');

if (!commentaryDir) {
  console.error('Usage: node scripts/build-boundary-mask.mjs --commentary-dir /path/to/commentary --out boundary-mask.csv');
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

const decodeEntities = text => text
  .replace(/&nbsp;/gi, ' ')
  .replace(/&bull;/gi, '•')
  .replace(/&middot;/gi, '·')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));

const htmlToText = html => {
  let text = String(html);
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  text = text.replace(/<\/?(?:br|p|div|table|tbody|tr|td|th|dt|dd|li|ul|ol|h[1-6])\b[^>]*>/gi, ' ');
  text = text.replace(/<[^>]+>/g, '');
  return canonical(decodeEntities(text));
};

// Prefer the first inscription table. This deliberately excludes explanatory
// prose such as "cf. KA-RU[ on HT 75", which previously contaminated the mask
// for a secure KA-RU attestation on HT 97. Non-tabular inscriptions fall back
// to the whole file and remain a separately auditable limitation.
const transcriptionRegion = html => {
  const table = String(html).match(/<table\b[^>]*>[\s\S]*?<\/table>/i);
  return table ? table[0] : String(html);
};

const SIGN = String.raw`(?:\*[0-9]+[A-Z]?|[A-Z]+[0-9]*)`;
const WORD = String.raw`${SIGN}(?:-${SIGN})+`;
const wordPattern = new RegExp(WORD, 'g');

const rows = new Map();
const getRow = (commentaryId, form, sourceFile) => {
  const normalized = canonical(form);
  const key = `${commentaryId}\t${normalized}`;
  if (!rows.has(key)) {
    rows.set(key, {
      commentary_id: commentaryId,
      form: normalized,
      table_occurrences: 0,
      left_insecure_occurrences: 0,
      right_insecure_occurrences: 0,
      any_insecure_occurrences: 0,
      source_files: new Set(),
      evidence: new Set(),
    });
  }
  const row = rows.get(key);
  row.source_files.add(sourceFile);
  return row;
};

const files = fs.readdirSync(commentaryDir)
  .filter(file => file.toLowerCase().endsWith('.html'))
  .sort();

for (const file of files) {
  const fullPath = path.join(commentaryDir, file);
  const commentaryId = path.basename(file, path.extname(file));
  const rawHtml = fs.readFileSync(fullPath, 'utf8');
  const text = htmlToText(transcriptionRegion(rawHtml));

  for (const match of text.matchAll(wordPattern)) {
    const form = match[0];
    const start = match.index;
    const end = start + match[0].length;
    const before = text.slice(Math.max(0, start - 6), start);
    const after = text.slice(end, Math.min(text.length, end + 6));

    // GORILA-derived fragment notation may appear as ]-DI-NA as well as ]DI-NA.
    const leftInsecure = /]\s*-?\s*$/.test(before) || /\[\[\s*$/.test(before);
    // Right fragments appear as KU-TA[, QI-TU-[•], etc.
    const rightInsecure = /^\s*-?\s*\[/.test(after) || /^\s*]]/.test(after);

    const row = getRow(commentaryId, form, file);
    row.table_occurrences++;
    if (leftInsecure) row.left_insecure_occurrences++;
    if (rightInsecure) row.right_insecure_occurrences++;
    if (leftInsecure || rightInsecure) {
      row.any_insecure_occurrences++;
      row.evidence.add(text.slice(Math.max(0, start - 20), Math.min(text.length, end + 20)));
    }
  }
}

const escapeCsv = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const outputRows = [...rows.values()]
  .filter(row => row.any_insecure_occurrences > 0)
  .sort((a, b) => a.commentary_id.localeCompare(b.commentary_id) || a.form.localeCompare(b.form));

const headers = [
  'commentary_id',
  'form',
  'table_occurrences',
  'left_insecure_occurrences',
  'right_insecure_occurrences',
  'any_insecure_occurrences',
  'source_files',
  'evidence',
];

const csv = [
  headers.join(','),
  ...outputRows.map(row => [
    row.commentary_id,
    row.form,
    row.table_occurrences,
    row.left_insecure_occurrences,
    row.right_insecure_occurrences,
    row.any_insecure_occurrences,
    [...row.source_files].join(' | '),
    [...row.evidence].slice(0, 3).join(' || '),
  ].map(escapeCsv).join(',')),
].join('\n') + '\n';

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, csv);

const insecureOccurrences = outputRows.reduce((sum, row) => sum + row.any_insecure_occurrences, 0);
console.log(`Boundary mask: ${outputRows.length} inscription/form rows; ${insecureOccurrences} damaged/insecure table occurrences.`);
console.log(`Wrote ${outPath}`);
