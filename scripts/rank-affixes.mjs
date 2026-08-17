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
const outDir = getArg('--out-dir', 'data/generated');
const excludeObviousLogograms = args.includes('--exclude-obvious-logograms');

// Named commodity/logographic labels that can occur inside hyphenated upstream
// tokens and therefore passed the v0.1 typographic word filter. This list is
// intentionally conservative and defines a sensitivity analysis, not a claim
// to be a complete classification of all Linear A non-phonographic signs.
const OBVIOUS_LOGOGRAM_LABELS = new Set([
  'AROM',
  'CAP',
  'CYP',
  'GAL',
  'GRA',
  'OLE',
  'OLIV',
  'VIN',
  'VIR',
  'VS',
]);

if (!corpusPath) {
  console.error('Usage: node scripts/rank-affixes.mjs --corpus /path/to/LinearAInscriptions.js [--out-dir data/generated] [--exclude-obvious-logograms]');
  process.exit(2);
}

const source = fs.readFileSync(corpusPath, 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(source, context, { timeout: 30000, filename: corpusPath });
const inscriptions = context.inscriptions;

if (!(inscriptions instanceof Map) && Object.prototype.toString.call(inscriptions) !== '[object Map]') {
  throw new Error('Expected upstream file to define `var inscriptions = new Map(...)`');
}

const normalize = s => String(s).normalize('NFC').trim();
const isNumeric = s =>
  /^[-+]?\d+(?:\.\d+)?(?:\s+\d+\/\d+)?$/.test(s) ||
  /^\d+\/\d+$/.test(s) ||
  /^[¼½¾⅓⅔⅛⅜⅝⅞]+$/.test(s);

// Mechanical completeness filter. With no sensitivity flag this reproduces
// the frozen v0.1 behavior. The optional obvious-logogram exclusion is v0.2.
const isCompleteSyllabicWord = raw => {
  const s = normalize(raw);
  if (!s || s === '\n' || isNumeric(s)) return false;
  if (!s.includes('-')) return false;
  if (/[\[\]{}?…]|𐝫/.test(s)) return false;
  if (/[+]/.test(s)) return false; // ligatures/logograms such as OLE+U
  if (/^[A-Z]{2,5}$/.test(s)) return false; // bare logogram labels

  const parts = s.split('-').filter(Boolean);
  if (parts.length < 2) return false;
  if (excludeObviousLogograms && parts.some(part => OBVIOUS_LOGOGRAM_LABELS.has(part))) return false;

  return parts.every(part =>
    /^(?:[A-Z]+(?:[₀₁₂₃₄₅₆₇₈₉]+)?|\*\d+[A-Z]?)$/.test(part)
  );
};

const splitSigns = s => normalize(s).split('-').filter(Boolean);

const occurrences = [];
for (const [id, rec] of inscriptions.entries()) {
  const words = rec?.transliteratedWords || [];
  for (let tokenIndex = 0; tokenIndex < words.length; tokenIndex++) {
    const form = normalize(words[tokenIndex]);
    if (!isCompleteSyllabicWord(form)) continue;

    occurrences.push({
      id,
      form,
      signs: splitSigns(form),
      site: normalize(rec?.site || ''),
      scribe: normalize(rec?.scribe || ''),
      support: normalize(rec?.support || ''),
      context: normalize(rec?.context || ''),
      tokenIndex,
    });
  }
}

const forms = new Map();
for (const occurrence of occurrences) {
  if (!forms.has(occurrence.form)) forms.set(occurrence.form, []);
  forms.get(occurrence.form).push(occurrence);
}

const signStats = new Map();
let initialSlots = 0;
let finalSlots = 0;
let internalSlots = 0;

const stat = sign => {
  if (!signStats.has(sign)) {
    signStats.set(sign, { sign, initial: 0, final: 0, internal: 0, tokens: 0 });
  }
  return signStats.get(sign);
};

for (const occurrence of occurrences) {
  const signs = occurrence.signs;
  initialSlots++;
  finalSlots++;
  internalSlots += Math.max(0, signs.length - 2);

  signs.forEach((sign, index) => {
    const row = stat(sign);
    row.tokens++;
    if (index === 0) row.initial++;
    if (index === signs.length - 1) row.final++;
    if (index > 0 && index < signs.length - 1) row.internal++;
  });
}

const prefixPairs = new Map();
const suffixPairs = new Map();

const addPair = (map, sign, base, variant) => {
  if (!map.has(sign)) map.set(sign, new Map());
  map.get(sign).set(`${base}\t${variant}`, { base, variant });
};

for (const variant of forms.keys()) {
  const signs = splitSigns(variant);
  if (signs.length < 3) continue; // proposed base must retain >=2 signs

  const prefix = signs[0];
  const prefixBase = signs.slice(1).join('-');
  if (forms.has(prefixBase)) addPair(prefixPairs, prefix, prefixBase, variant);

  const suffix = signs.at(-1);
  const suffixBase = signs.slice(0, -1).join('-');
  if (forms.has(suffixBase)) addPair(suffixPairs, suffix, suffixBase, variant);
}

const log2 = value => Math.log(value) / Math.log(2);

const boundaryMetrics = (row, side) => {
  const boundaryCount = side === 'prefix' ? row.initial : row.final;
  const boundarySlots = side === 'prefix' ? initialSlots : finalSlots;

  // Haldane correction avoids infinities for signs absent from internal slots.
  const boundaryRate = (boundaryCount + 0.5) / (boundarySlots + 1);
  const internalRate = (row.internal + 0.5) / (internalSlots + 1);
  const enrichment = log2(boundaryRate / internalRate);

  return { boundaryCount, boundaryRate, internalRate, enrichment };
};

const pairEvidence = (pairMap, sign) => {
  const pairs = [...(pairMap.get(sign)?.values() || [])];
  const sites = new Set();
  const scribes = new Set();
  let attestations = 0;

  for (const pair of pairs) {
    for (const form of [pair.base, pair.variant]) {
      for (const occurrence of forms.get(form) || []) {
        attestations++;
        if (occurrence.site) sites.add(occurrence.site);
        if (occurrence.scribe) scribes.add(occurrence.scribe);
      }
    }
  }

  return {
    pairs,
    pairCount: pairs.length,
    sites: sites.size,
    scribes: scribes.size,
    attestations,
  };
};

const rows = [];
for (const signRow of signStats.values()) {
  for (const side of ['prefix', 'suffix']) {
    const metrics = boundaryMetrics(signRow, side);
    const evidence = pairEvidence(side === 'prefix' ? prefixPairs : suffixPairs, signRow.sign);

    // Frozen independent score. Boundary enrichment is primary. Exact extension
    // pairs and raw edge support receive smaller corroborating bonuses.
    const pairBonus = log2(1 + evidence.pairCount) * 0.75;
    const supportBonus = log2(1 + metrics.boundaryCount) * 0.25;
    const score = metrics.enrichment + pairBonus + supportBonus;

    rows.push({
      side,
      sign: signRow.sign,
      score,
      boundary_count: metrics.boundaryCount,
      internal_count: signRow.internal,
      boundary_enrichment_log2: metrics.enrichment,
      exact_extension_pairs: evidence.pairCount,
      pair_sites: evidence.sites,
      pair_scribes: evidence.scribes,
      pair_attestations: evidence.attestations,
      examples: evidence.pairs
        .slice(0, 8)
        .map(pair => `${pair.base} ~ ${pair.variant}`)
        .join(' | '),
    });
  }
}

rows.sort(
  (a, b) =>
    b.score - a.score ||
    b.exact_extension_pairs - a.exact_extension_pairs ||
    b.boundary_count - a.boundary_count ||
    a.sign.localeCompare(b.sign)
);

fs.mkdirSync(outDir, { recursive: true });

const escapeCsv = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const headers = [
  'side',
  'rank',
  'sign',
  'score',
  'boundary_count',
  'internal_count',
  'boundary_enrichment_log2',
  'exact_extension_pairs',
  'pair_sites',
  'pair_scribes',
  'pair_attestations',
  'examples',
];

const ranked = [];
for (const side of ['prefix', 'suffix']) {
  let rank = 0;
  for (const row of rows.filter(candidate => candidate.side === side)) {
    rank++;
    ranked.push({ ...row, rank });
  }
}

const csv = [
  headers.join(','),
  ...ranked.map(row =>
    headers
      .map(header =>
        escapeCsv(
          header === 'score' || header === 'boundary_enrichment_log2'
            ? Number(row[header]).toFixed(6)
            : row[header]
        )
      )
      .join(',')
  ),
].join('\n') + '\n';

fs.writeFileSync(path.join(outDir, 'affix-ranking.csv'), csv);

const top = (side, count = 15) => ranked.filter(row => row.side === side).slice(0, count);

let markdown = '# Blind affix-ranking output\n\n';
markdown += `Corpus file: \`${path.basename(corpusPath)}\`\n\n`;
markdown += `Sensitivity mode: **${excludeObviousLogograms ? 'v0.2 obvious-logogram exclusion' : 'v0.1 frozen mechanical filter'}**.\n\n`;
markdown += `Secure syllabic word tokens analyzed: **${occurrences.length}**; unique forms: **${forms.size}**.\n\n`;
markdown += 'Ranking combines sign enrichment at the relevant word edge with a modest bonus for exact whole-word extension pairs `X ~ A-X` or `X ~ X-A`. It does not use Davis\'s published affix identities.\n\n';

for (const side of ['prefix', 'suffix']) {
  markdown += `## Top ${side} candidates\n\n`;
  markdown += '| rank | sign | score | edge count | log2 edge enrichment | exact pairs | examples |\n';
  markdown += '|---:|---|---:|---:|---:|---:|---|\n';

  for (const row of top(side)) {
    markdown += `| ${row.rank} | ${row.sign} | ${row.score.toFixed(3)} | ${row.boundary_count} | ${row.boundary_enrichment_log2.toFixed(3)} | ${row.exact_extension_pairs} | ${row.examples.replaceAll('|', '/')} |\n`;
  }
  markdown += '\n';
}

markdown += '## Interpretation rule\n\n';
markdown += 'This file is a **candidate ranking, not a grammatical analysis**. A high edge score can also arise from names, formulae, genre concentration, or orthographic conventions. Candidates must be audited against the benchmark before promotion.\n';

fs.writeFileSync(path.join(outDir, 'affix-ranking.md'), markdown);
console.log(markdown);
