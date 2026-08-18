#!/usr/bin/env node
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const corpusPath = getArg('--corpus');
const boundaryMaskPath = getArg('--boundary-mask');
const outDir = getArg('--out-dir', 'data/generated-v03');

if (!corpusPath || !boundaryMaskPath) {
  console.error('Usage: node scripts/rank-affixes-v03.mjs --corpus LinearAInscriptions.js --boundary-mask boundary-mask.csv [--out-dir output]');
  process.exit(2);
}

const OBVIOUS_LOGOGRAM_LABELS = new Set([
  'AROM', 'CAP', 'CYP', 'GAL', 'GRA', 'OLE', 'OLIV', 'VIN', 'VIR', 'VS',
]);

const canonical = value => String(value)
  .normalize('NFKC')
  .toUpperCase()
  .replaceAll('–', '-')
  .replaceAll('—', '-')
  .replace(/\s*-\s*/g, '-')
  .replace(/\s+/g, ' ')
  .trim();

const isNumeric = s =>
  /^[-+]?\d+(?:\.\d+)?(?:\s+\d+\/\d+)?$/.test(s) ||
  /^\d+\/\d+$/.test(s) ||
  /^[¼½¾⅓⅔⅛⅜⅝⅞]+$/.test(s);

const isSyllabicCandidate = raw => {
  const s = canonical(raw);
  if (!s || s === '\n' || isNumeric(s) || !s.includes('-')) return false;
  if (/[\[\]{}?…]|𐝫/.test(s)) return false;
  if (/[+]/.test(s)) return false;
  if (/^[A-Z]{2,5}$/.test(s)) return false;
  const parts = s.split('-').filter(Boolean);
  if (parts.length < 2) return false;
  if (parts.some(part => OBVIOUS_LOGOGRAM_LABELS.has(part))) return false;
  return parts.every(part => /^(?:[A-Z]+[0-9]*|\*\d+[A-Z]?)$/.test(part));
};

const splitSigns = form => canonical(form).split('-').filter(Boolean);

const parseCsv = text => {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [headers, ...body] = rows.filter(r => r.some(v => v !== ''));
  return body.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ''])));
};

const maskRows = parseCsv(fs.readFileSync(boundaryMaskPath, 'utf8'));
const mask = new Map();
for (const row of maskRows) {
  const key = `${canonical(row.commentary_id)}\t${canonical(row.form)}`;
  const existing = mask.get(key) || { left: false, right: false, sources: new Set() };
  existing.left ||= canonical(row.left_insecure) === 'YES';
  existing.right ||= canonical(row.right_insecure) === 'YES';
  if (row.source_files) existing.sources.add(row.source_files);
  mask.set(key, existing);
}

const source = fs.readFileSync(corpusPath, 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(source, context, { timeout: 30000, filename: corpusPath });
const inscriptions = context.inscriptions;
if (!(inscriptions instanceof Map) && Object.prototype.toString.call(inscriptions) !== '[object Map]') {
  throw new Error('Expected upstream file to define `var inscriptions = new Map(...)`');
}

const commentaryKeys = id => {
  const normalized = canonical(id);
  const candidates = [normalized];
  const sideStripped = normalized.replace(/(\d)[AB]$/, '$1');
  if (sideStripped !== normalized) candidates.push(sideStripped);
  return [...new Set(candidates)];
};

const boundaryState = (id, form) => {
  let left = false;
  let right = false;
  const hits = [];
  for (const key of commentaryKeys(id)) {
    const hit = mask.get(`${key}\t${canonical(form)}`);
    if (!hit) continue;
    left ||= hit.left;
    right ||= hit.right;
    hits.push(key);
  }
  return { leftInsecure: left, rightInsecure: right, maskHits: hits };
};

const allOccurrences = [];
for (const [id, rec] of inscriptions.entries()) {
  const words = rec?.transliteratedWords || [];
  for (let tokenIndex = 0; tokenIndex < words.length; tokenIndex++) {
    const form = canonical(words[tokenIndex]);
    if (!isSyllabicCandidate(form)) continue;
    const state = boundaryState(id, form);
    allOccurrences.push({
      id: canonical(id),
      form,
      signs: splitSigns(form),
      site: canonical(rec?.site || ''),
      scribe: canonical(rec?.scribe || ''),
      support: canonical(rec?.support || ''),
      tokenIndex,
      ...state,
      complete: !state.leftInsecure && !state.rightInsecure,
    });
  }
}

const secureOccurrences = allOccurrences.filter(row => row.complete);

const groupForms = occurrences => {
  const grouped = new Map();
  for (const occurrence of occurrences) {
    if (!grouped.has(occurrence.form)) grouped.set(occurrence.form, []);
    grouped.get(occurrence.form).push(occurrence);
  }
  return grouped;
};

const allForms = groupForms(allOccurrences);
const secureForms = groupForms(secureOccurrences);

// Pure boundary statistics: v0.3 intentionally does not include an exact-pair bonus.
const signStats = new Map();
let edgeSlots = secureOccurrences.length;
let internalSlots = 0;
const stat = sign => {
  if (!signStats.has(sign)) signStats.set(sign, { sign, initial: 0, final: 0, internal: 0 });
  return signStats.get(sign);
};

for (const occurrence of secureOccurrences) {
  const signs = occurrence.signs;
  internalSlots += Math.max(0, signs.length - 2);
  signs.forEach((sign, index) => {
    const row = stat(sign);
    if (index === 0) row.initial++;
    if (index === signs.length - 1) row.final++;
    if (index > 0 && index < signs.length - 1) row.internal++;
  });
}

const log2 = value => Math.log(value) / Math.log(2);
const boundaryRows = [];
for (const row of signStats.values()) {
  for (const side of ['prefix', 'suffix']) {
    const boundaryCount = side === 'prefix' ? row.initial : row.final;
    const boundaryRate = (boundaryCount + 0.5) / (edgeSlots + 1);
    const internalRate = (row.internal + 0.5) / (internalSlots + 1);
    boundaryRows.push({
      side,
      sign: row.sign,
      boundary_count: boundaryCount,
      internal_count: row.internal,
      boundary_enrichment_log2: log2(boundaryRate / internalRate),
    });
  }
}

const rankedBoundary = [];
for (const side of ['prefix', 'suffix']) {
  const sideRows = boundaryRows
    .filter(row => row.side === side)
    .sort((a, b) =>
      b.boundary_enrichment_log2 - a.boundary_enrichment_log2 ||
      b.boundary_count - a.boundary_count ||
      a.sign.localeCompare(b.sign)
    );
  sideRows.forEach((row, index) => rankedBoundary.push({ ...row, rank: index + 1 }));
}

// Generate every apparent v0.2-style exact pair from the cleaned forms, then
// classify it according to whether at least one complete damage-aware attestation
// survives for both base and variant.
const pairRows = [];
const seenPairs = new Set();
for (const variant of allForms.keys()) {
  const signs = splitSigns(variant);
  if (signs.length < 3) continue;

  for (const side of ['prefix', 'suffix']) {
    const sign = side === 'prefix' ? signs[0] : signs.at(-1);
    const base = side === 'prefix' ? signs.slice(1).join('-') : signs.slice(0, -1).join('-');
    if (!allForms.has(base)) continue;
    const key = `${side}\t${sign}\t${base}\t${variant}`;
    if (seenPairs.has(key)) continue;
    seenPairs.add(key);

    const baseSecure = secureForms.get(base)?.length || 0;
    const variantSecure = secureForms.get(variant)?.length || 0;
    const baseTotal = allForms.get(base)?.length || 0;
    const variantTotal = allForms.get(variant)?.length || 0;
    let status = 'accepted_secure';
    if (!baseSecure && !variantSecure) status = 'excluded_insecure_both';
    else if (!baseSecure) status = 'excluded_insecure_base';
    else if (!variantSecure) status = 'excluded_insecure_variant';

    const securePairOccurrences = [
      ...(secureForms.get(base) || []),
      ...(secureForms.get(variant) || []),
    ];
    const sites = new Set(securePairOccurrences.map(x => x.site).filter(Boolean));
    const scribes = new Set(securePairOccurrences.map(x => x.scribe).filter(Boolean));

    pairRows.push({
      side,
      sign,
      base,
      variant,
      status,
      base_total_attestations: baseTotal,
      base_secure_attestations: baseSecure,
      variant_total_attestations: variantTotal,
      variant_secure_attestations: variantSecure,
      secure_sites: sites.size,
      secure_scribes: scribes.size,
    });
  }
}

const paradigmRows = [];
const signsAndSides = new Set(pairRows.map(row => `${row.side}\t${row.sign}`));
for (const key of signsAndSides) {
  const [side, sign] = key.split('\t');
  const rows = pairRows.filter(row => row.side === side && row.sign === sign);
  const accepted = rows.filter(row => row.status === 'accepted_secure');
  const excluded = rows.filter(row => row.status !== 'accepted_secure');
  paradigmRows.push({
    side,
    sign,
    secure_exact_pairs: accepted.length,
    excluded_damage_pairs: excluded.length,
    total_apparent_pairs: rows.length,
    secure_examples: accepted.slice(0, 8).map(row => `${row.base} ~ ${row.variant}`).join(' | '),
  });
}

const rankedParadigms = [];
for (const side of ['prefix', 'suffix']) {
  const sideRows = paradigmRows
    .filter(row => row.side === side)
    .sort((a, b) =>
      b.secure_exact_pairs - a.secure_exact_pairs ||
      a.excluded_damage_pairs - b.excluded_damage_pairs ||
      a.sign.localeCompare(b.sign)
    );
  sideRows.forEach((row, index) => rankedParadigms.push({ ...row, rank: index + 1 }));
}

const escapeCsv = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const writeCsv = (filename, headers, rows) => {
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(header => escapeCsv(row[header])).join(',')),
  ].join('\n') + '\n';
  fs.writeFileSync(path.join(outDir, filename), csv);
};

fs.mkdirSync(outDir, { recursive: true });
writeCsv('boundary-ranking.csv',
  ['side', 'rank', 'sign', 'boundary_count', 'internal_count', 'boundary_enrichment_log2'],
  rankedBoundary.map(row => ({ ...row, boundary_enrichment_log2: row.boundary_enrichment_log2.toFixed(6) }))
);
writeCsv('paradigm-ranking.csv',
  ['side', 'rank', 'sign', 'secure_exact_pairs', 'excluded_damage_pairs', 'total_apparent_pairs', 'secure_examples'],
  rankedParadigms
);
writeCsv('exact-pairs.csv',
  ['side', 'sign', 'base', 'variant', 'status', 'base_total_attestations', 'base_secure_attestations', 'variant_total_attestations', 'variant_secure_attestations', 'secure_sites', 'secure_scribes'],
  pairRows.sort((a, b) => a.side.localeCompare(b.side) || a.sign.localeCompare(b.sign) || a.base.localeCompare(b.base))
);
writeCsv('secure-word-occurrences.csv',
  ['id', 'form', 'site', 'scribe', 'support', 'tokenIndex'],
  secureOccurrences
);
writeCsv('excluded-word-occurrences.csv',
  ['id', 'form', 'leftInsecure', 'rightInsecure', 'maskHits', 'site', 'scribe', 'support', 'tokenIndex'],
  allOccurrences.filter(row => !row.complete).map(row => ({ ...row, maskHits: row.maskHits.join(' | ') }))
);

const topBoundary = (side, n = 15) => rankedBoundary.filter(row => row.side === side).slice(0, n);
const topParadigm = (side, n = 15) => rankedParadigms.filter(row => row.side === side).slice(0, n);

let md = '# Damage-aware morphology v0.3\n\n';
md += `Corpus: \`${path.basename(corpusPath)}\`\n\n`;
md += `Boundary mask: \`${path.basename(boundaryMaskPath)}\`\n\n`;
md += `Candidate syllabic occurrences before boundary masking: **${allOccurrences.length}**.\n\n`;
md += `Complete occurrences retained: **${secureOccurrences.length}**; excluded as boundary-insecure: **${allOccurrences.length - secureOccurrences.length}**.\n\n`;
md += `Unique cleaned forms: **${allForms.size}**; unique complete forms: **${secureForms.size}**.\n\n`;
md += 'v0.3 deliberately reports **boundary enrichment** and **damage-aware paradigmatic evidence** as separate rankings. No composite morphology score is used.\n\n';

for (const side of ['prefix', 'suffix']) {
  md += `## ${side}: boundary enrichment\n\n`;
  md += '| rank | sign | edge count | internal count | log2 enrichment |\n|---:|---|---:|---:|---:|\n';
  for (const row of topBoundary(side)) {
    md += `| ${row.rank} | ${row.sign} | ${row.boundary_count} | ${row.internal_count} | ${row.boundary_enrichment_log2.toFixed(3)} |\n`;
  }
  md += '\n';

  md += `## ${side}: secure exact paradigms\n\n`;
  md += '| rank | sign | secure pairs | damage-excluded pairs | examples |\n|---:|---|---:|---:|---|\n';
  for (const row of topParadigm(side)) {
    md += `| ${row.rank} | ${row.sign} | ${row.secure_exact_pairs} | ${row.excluded_damage_pairs} | ${row.secure_examples.replaceAll('|', '/')} |\n`;
  }
  md += '\n';
}

md += '## Interpretation\n\n';
md += 'A high boundary rank and a high paradigm rank are different observations. Boundary concentration can arise in restricted lexical classes such as names or formulae, while a secure exact-pair signal can be strong even for a comparatively uncommon affix. Every surviving pair still requires contextual and onomastic audit before grammatical promotion.\n';
fs.writeFileSync(path.join(outDir, 'README.md'), md);
console.log(md);
