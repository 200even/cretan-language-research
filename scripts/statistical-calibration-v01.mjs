#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ITERATIONS = 50000;
const BASE_SEED = 20260818;
const INPUT = 'results/source-consistent-v0.5/secure-word-occurrences.csv';
const EXCLUSIONS = 'data/v06-form-exclusions.csv';
const OUT = 'results/statistical-calibration-v0.1';

const TARGETS = {
  prefix: { A: 6, I: 4 },
  suffix: { JA: 5, TI: 3 },
};

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
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
  const clean = rows.filter(r => r.some(v => v !== ''));
  const [headers, ...body] = clean;
  return body.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ''])));
}

function csvEscape(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}
function writeCsv(file, headers, rows) {
  const text = [headers.join(','), ...rows.map(r => headers.map(h => csvEscape(r[h])).join(','))].join('\n') + '\n';
  fs.writeFileSync(path.join(OUT, file), text);
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function shuffleCopy(values, rng) {
  const a = values.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tokens(form) { return form.split('-').filter(Boolean); }

const occurrences = parseCsv(fs.readFileSync(INPUT, 'utf8'));
const excludedForms = new Set(parseCsv(fs.readFileSync(EXCLUSIONS, 'utf8')).map(r => r.form));
const activeOccurrences = occurrences.filter(r => !excludedForms.has(r.form));
const lexicon = new Set(activeOccurrences.map(r => r.form));
const typeForms = [...lexicon].sort();

function makeRecords(side, mode) {
  const source = mode === 'N1'
    ? typeForms.map(form => ({ form, site: '' }))
    : [...new Map(activeOccurrences.map(r => [`${r.site}\t${r.form}`, { form: r.form, site: r.site || 'UNKNOWN' }])).values()];

  const records = [];
  for (const item of source) {
    const ss = tokens(item.form);
    // Match frozen v0.4/v0.5 exact-pair generation: variant has >=3 signs.
    if (ss.length < 3) continue;
    const edge = side === 'prefix' ? ss[0] : ss.at(-1);
    const residual = side === 'prefix' ? ss.slice(1).join('-') : ss.slice(0, -1).join('-');
    records.push({
      form: item.form,
      site: item.site,
      length: ss.length,
      edge,
      residual,
      eligible: lexicon.has(residual),
    });
  }
  return records;
}

function observedCounts(records) {
  const seen = new Set();
  const counts = new Map();
  for (const r of records) {
    if (!r.eligible) continue;
    const key = `${r.edge}\t${r.residual}`;
    if (seen.has(key)) continue;
    seen.add(key);
    counts.set(r.edge, (counts.get(r.edge) || 0) + 1);
  }
  return counts;
}

function buildStrata(records, mode) {
  const strata = new Map();
  records.forEach((r, index) => {
    const key = mode === 'N1' ? String(r.length) : `${r.site}\t${r.length}`;
    if (!strata.has(key)) strata.set(key, []);
    strata.get(key).push({ ...r, index });
  });
  return [...strata.values()].map(group => ({
    records: group,
    edges: group.map(r => r.edge),
    eligibleIndices: group.map((r, i) => r.eligible ? i : -1).filter(i => i >= 0),
  }));
}

function quantile(sorted, q) {
  if (!sorted.length) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  return sorted[lo] * (hi - pos) + sorted[hi] * (pos - lo);
}

function runModel(side, mode, seed) {
  const records = makeRecords(side, mode);
  const strata = buildStrata(records, mode);
  const observed = observedCounts(records);
  const targetEntries = Object.entries(TARGETS[side]);

  for (const [sign, expected] of targetEntries) {
    const actual = observed.get(sign) || 0;
    if (actual !== expected) throw new Error(`${mode} ${side} ${sign}: observed ${actual}, expected frozen ${expected}`);
  }

  const rng = mulberry32(seed);
  const targetNull = Object.fromEntries(targetEntries.map(([sign]) => [sign, []]));
  const maxNull = [];

  for (let iter = 0; iter < ITERATIONS; iter++) {
    const seenPairs = new Set();
    const counts = new Map();

    for (const stratum of strata) {
      const randomized = shuffleCopy(stratum.edges, rng);
      for (const i of stratum.eligibleIndices) {
        const rec = stratum.records[i];
        const edge = randomized[i];
        const pairKey = `${edge}\t${rec.residual}`;
        if (seenPairs.has(pairKey)) continue;
        seenPairs.add(pairKey);
        counts.set(edge, (counts.get(edge) || 0) + 1);
      }
    }

    let max = 0;
    for (const n of counts.values()) if (n > max) max = n;
    maxNull.push(max);
    for (const [sign] of targetEntries) targetNull[sign].push(counts.get(sign) || 0);
  }

  const rows = [];
  for (const [sign, expected] of targetEntries) {
    const values = targetNull[sign];
    const sorted = values.slice().sort((a, b) => a - b);
    const extreme = values.filter(v => v >= expected).length;
    const maxExtreme = maxNull.filter(v => v >= expected).length;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    rows.push({
      model: mode,
      side,
      sign,
      observed: expected,
      null_mean: mean.toFixed(6),
      q50: quantile(sorted, .50).toFixed(3),
      q90: quantile(sorted, .90).toFixed(3),
      q95: quantile(sorted, .95).toFixed(3),
      q99: quantile(sorted, .99).toFixed(3),
      empirical_p: ((extreme + 1) / (ITERATIONS + 1)).toFixed(6),
      max_sign_p: ((maxExtreme + 1) / (ITERATIONS + 1)).toFixed(6),
      iterations: ITERATIONS,
      candidate_records: records.length,
      eligible_residual_records: records.filter(r => r.eligible).length,
      strata: strata.length,
    });
  }
  return rows;
}

function choose(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let x = 1;
  for (let i = 1; i <= k; i++) x = x * (n - k + i) / i;
  return x;
}
function hypergeom(N, K, n, k) {
  return choose(K, k) * choose(N - K, n - k) / choose(N, n);
}
function davisNull(label, N, observedPrefix, observedSuffix) {
  let totalTail = 0;
  let jointTail = 0;
  const observedTotal = observedPrefix + observedSuffix;
  for (let p = 0; p <= 2; p++) {
    const pp = hypergeom(N, 2, 2, p);
    for (let s = 0; s <= 4; s++) {
      const ps = hypergeom(N, 4, 4, s);
      const prob = pp * ps;
      if (p + s >= observedTotal) totalTail += prob;
      if (p >= observedPrefix && s >= observedSuffix) jointTail += prob;
    }
  }
  return {
    comparison: label,
    universe_per_side: N,
    prefix_targets: 2,
    suffix_targets: 4,
    prefix_cutoff: 2,
    suffix_cutoff: 4,
    observed_prefix_hits: observedPrefix,
    observed_suffix_hits: observedSuffix,
    observed_total_hits: observedTotal,
    exact_p_total_hits_ge_observed: totalTail.toPrecision(8),
    exact_p_joint_side_pattern_ge_observed: jointTail.toPrecision(8),
  };
}

fs.mkdirSync(OUT, { recursive: true });

const calibrationRows = [
  ...runModel('prefix', 'N1', BASE_SEED + 1),
  ...runModel('suffix', 'N1', BASE_SEED + 2),
  ...runModel('prefix', 'N2', BASE_SEED + 3),
  ...runModel('suffix', 'N2', BASE_SEED + 4),
];

writeCsv('edge-permutation-summary.csv', [
  'model','side','sign','observed','null_mean','q50','q90','q95','q99','empirical_p','max_sign_p','iterations','candidate_records','eligible_residual_records','strata'
], calibrationRows);

const davisRows = [
  davisNull('primary-frozen-v0.2', 116, 1, 2),
  davisNull('post-unblinding-universe-matched', 49, 2, 2),
];
writeCsv('davis-external-target-null.csv', [
  'comparison','universe_per_side','prefix_targets','suffix_targets','prefix_cutoff','suffix_cutoff','observed_prefix_hits','observed_suffix_hits','observed_total_hits','exact_p_total_hits_ge_observed','exact_p_joint_side_pattern_ge_observed'
], davisRows);

const n1 = calibrationRows.filter(r => r.model === 'N1');
const n2 = calibrationRows.filter(r => r.model === 'N2');
const rowFor = (rows, side, sign) => rows.find(r => r.side === side && r.sign === sign);

let md = '# Statistical calibration v0.1\n\n';
md += `Input: frozen v0.5 secure occurrences minus ${excludedForms.size} explicit post-v0.5 normalized-form source exclusions. Active occurrences: **${activeOccurrences.length}**; active unique forms: **${lexicon.size}**.\n\n`;
md += `Permutation seed: **${BASE_SEED}**. Iterations: **${ITERATIONS.toLocaleString()} per side/model**.\n\n`;
md += '## Edge-permutation results\n\n';
md += '| target | observed | N1 null mean | N1 p | N1 max-sign p | N2 null mean | N2 p | N2 max-sign p |\n';
md += '|---|---:|---:|---:|---:|---:|---:|---:|\n';
for (const [side, sign] of [['prefix','A'],['prefix','I'],['suffix','JA'],['suffix','TI']]) {
  const a = rowFor(n1, side, sign), b = rowFor(n2, side, sign);
  md += `| ${side === 'prefix' ? sign + '-' : '-' + sign} | ${a.observed} | ${a.null_mean} | ${a.empirical_p} | ${a.max_sign_p} | ${b.null_mean} | ${b.empirical_p} | ${b.max_sign_p} |\n`;
}
md += '\n`p` is the target-specific empirical tail probability. `max-sign p` compares the observed target count to the maximum count attained by **any** sign in each permutation and is the conservative multiple-search calibration.\n\n';
md += 'N1 permutes edge signs among unique word types within word length. N2 repeats the test on unique site/form records within site + word-length strata. The observed base lexicon and residual stems remain fixed.\n\n';
md += '## Davis external-target placement null\n\n';
md += '| comparison | universe | observed cutoff hits | exact p(total >= observed) | exact p(side pattern >= observed) |\n';
md += '|---|---:|---:|---:|---:|\n';
for (const r of davisRows) {
  md += `| ${r.comparison} | ${r.universe_per_side} | ${r.observed_total_hits}/6 (${r.observed_prefix_hits}/2 prefix, ${r.observed_suffix_hits}/4 suffix) | ${r.exact_p_total_hits_ge_observed} | ${r.exact_p_joint_side_pattern_ge_observed} |\n`;
}
md += '\nThe 116-sign result is the frozen primary experiment. The 49-sign result is a **post-unblinding sensitivity analysis** after Davis clarified his eligible sign universe; it does not replace the primary 3/6 score.\n\n';
md += '## Interpretation boundary\n\n';
md += 'These nulls calibrate formal concentration only. They do not convert a structural candidate into a translation or grammatical function, and they do not supersede inscription-level audit. Manual survival remains a separate evidence dimension.\n';
fs.writeFileSync(path.join(OUT, 'README.md'), md);

fs.writeFileSync(path.join(OUT, 'PROVENANCE.md'), `# Provenance\n\n- input: \`${INPUT}\`\n- forward exclusions: \`${EXCLUSIONS}\`\n- experiment: \`experiments/statistical-calibration-v01.md\`\n- script: \`scripts/statistical-calibration-v01.mjs\`\n- seed: ${BASE_SEED}\n- iterations: ${ITERATIONS} per side/model\n- generated: ${new Date().toISOString()}\n`);

console.log(md);
