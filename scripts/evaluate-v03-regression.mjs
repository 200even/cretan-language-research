#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const benchmarkPath = getArg('--benchmark');
const regressionPath = getArg('--regression');
const pairsPath = getArg('--pairs');
const outDir = getArg('--out-dir', 'data/generated-v03');
if (!benchmarkPath || !regressionPath || !pairsPath) {
  console.error('Usage: node scripts/evaluate-v03-regression.mjs --benchmark morphology-benchmark.csv --regression v03-regression-set.csv --pairs exact-pairs.csv [--out-dir output]');
  process.exit(2);
}

const canonical = value => String(value).normalize('NFKC').toUpperCase().trim();

const parseCsv = text => {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
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

const benchmark = parseCsv(fs.readFileSync(benchmarkPath, 'utf8'));
const regression = parseCsv(fs.readFileSync(regressionPath, 'utf8'));
const pairs = parseCsv(fs.readFileSync(pairsPath, 'utf8'));
const byBenchmarkId = new Map(benchmark.map(row => [row.benchmark_id, row]));
const pairMap = new Map(pairs.map(row => [
  `${canonical(row.side)}\t${canonical(row.sign)}\t${canonical(row.base)}\t${canonical(row.variant)}`,
  row,
]));

const results = [];
for (const test of regression) {
  const row = byBenchmarkId.get(test.benchmark_id);
  if (!row) throw new Error(`Regression case ${test.benchmark_id} missing from benchmark`);
  if (!['prefix', 'suffix'].includes(row.operation)) {
    throw new Error(`Regression case ${test.benchmark_id} is not a simple prefix/suffix row`);
  }
  const key = `${canonical(row.operation)}\t${canonical(row.added_material)}\t${canonical(row.base_form)}\t${canonical(row.variant_form)}`;
  const pair = pairMap.get(key);
  const observed = pair?.status || 'not_generated';

  let pass = false;
  if (test.expectation === 'exclude_damage') pass = observed !== 'accepted_secure';
  if (test.expectation === 'retain_secure') pass = observed === 'accepted_secure';

  results.push({
    benchmark_id: test.benchmark_id,
    expectation: test.expectation,
    side: row.operation,
    sign: row.added_material,
    base: row.base_form,
    variant: row.variant_form,
    observed_status: observed,
    pass: pass ? 'yes' : 'no',
    rationale: test.rationale,
  });
}

const damage = results.filter(row => row.expectation === 'exclude_damage');
const retained = results.filter(row => row.expectation === 'retain_secure');
const damagePass = damage.filter(row => row.pass === 'yes').length;
const retainedPass = retained.filter(row => row.pass === 'yes').length;
const failures = results.filter(row => row.pass !== 'yes');

const escapeCsv = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
fs.mkdirSync(outDir, { recursive: true });
const headers = ['benchmark_id','expectation','side','sign','base','variant','observed_status','pass','rationale'];
const csv = [headers.join(','), ...results.map(row => headers.map(h => escapeCsv(row[h])).join(','))].join('\n') + '\n';
fs.writeFileSync(path.join(outDir, 'regression-results.csv'), csv);

let md = '# v0.3 regression evaluation\n\n';
md += `Known damage-created/insecure pairs removed: **${damagePass}/${damage.length}**.\n\n`;
md += `Strong secure positives retained: **${retainedPass}/${retained.length}**.\n\n`;
md += '| benchmark | expectation | pair | observed | pass |\n|---|---|---|---|---|\n';
for (const row of results) {
  md += `| ${row.benchmark_id} | ${row.expectation} | ${row.base} ~ ${row.variant} | ${row.observed_status} | ${row.pass} |\n`;
}
md += '\n';
if (failures.length) {
  md += `**Regression status: FAIL (${failures.length} cases).**\n`;
} else {
  md += '**Regression status: PASS.**\n';
}
fs.writeFileSync(path.join(outDir, 'REGRESSION.md'), md);
console.log(md);

if (failures.length) process.exit(1);
