#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const rankingPath = getArg('--ranking');
const universePath = getArg('--universe');
const targetsPath = getArg('--targets');
const outDir = getArg('--out-dir', 'results/davis-universe-matched-v0.2');

if (!rankingPath || !universePath || !targetsPath) {
  console.error('Usage: node scripts/evaluate-davis-universe-v02.mjs --ranking affix-ranking.csv --universe data/davis-2026-main-grid-universe.csv --targets data/davis-2026-unblinding.csv [--out-dir DIR]');
  process.exit(2);
}

const parseCsv = text => {
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
  const nonempty = rows.filter(r => r.some(v => v !== ''));
  const [headers, ...body] = nonempty;
  return body.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ''])));
};

const esc = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const writeCsv = (filename, headers, rows) => {
  fs.mkdirSync(outDir, { recursive: true });
  const text = [headers.join(','), ...rows.map(row => headers.map(h => esc(row[h])).join(','))].join('\n') + '\n';
  fs.writeFileSync(path.join(outDir, filename), text);
};

const canonical = value => String(value).normalize('NFKC').trim().toUpperCase();
const ranking = parseCsv(fs.readFileSync(rankingPath, 'utf8')).map(row => ({
  ...row,
  side: canonical(row.side).toLowerCase(),
  sign: canonical(row.sign),
  rank: Number(row.rank),
  score: Number(row.score),
}));
const universeRows = parseCsv(fs.readFileSync(universePath, 'utf8'));
const targets = parseCsv(fs.readFileSync(targetsPath, 'utf8'))
  .filter(row => String(row.davis_candidate).toLowerCase() === 'yes')
  .map(row => ({ ...row, side: canonical(row.side).toLowerCase(), sign: canonical(row.sign) }));

const universe = [...new Set(universeRows.map(row => canonical(row.sign)).filter(Boolean))];
if (universe.length !== 50) throw new Error(`Expected exactly 50 unique Davis-universe signs, found ${universe.length}`);
const universeSet = new Set(universe);

for (const side of ['prefix', 'suffix']) {
  const rows = ranking.filter(row => row.side === side);
  if (rows.length !== 116) throw new Error(`Frozen v0.2 baseline mismatch: expected 116 ${side} rows, found ${rows.length}`);
}

// Reproduction guard: values published from the frozen v0.2 artifact before
// Davis's 50-sign universe clarification was received.
const frozenChecks = [
  ['prefix','A',1,7.841664],
  ['prefix','I',4,4.659528],
  ['suffix','RO',1,6.649032],
  ['suffix','TE',4,4.869416],
  ['suffix','RE',7,4.240705],
  ['suffix','TI',11,3.698981],
];
for (const [side, sign, expectedRank, expectedScore] of frozenChecks) {
  const row = ranking.find(r => r.side === side && r.sign === sign);
  if (!row) throw new Error(`Frozen check missing ${side} ${sign}`);
  if (row.rank !== expectedRank || Math.abs(row.score - expectedScore) > 0.0000005) {
    throw new Error(`Frozen v0.2 reproduction mismatch for ${side} ${sign}: got rank ${row.rank}, score ${row.score}`);
  }
}

// The frozen scorer emitted rows only for signs actually observed in its retained
// corpus. Do not invent a post-hoc score for an eligible Davis sign that has no
// frozen row. Report such signs separately and rank the directly comparable
// observed members while preserving their frozen order.
const missingRows = [];
const matched = [];
for (const side of ['prefix','suffix']) {
  const sideRows = ranking.filter(row => row.side === side);
  const missing = universe.filter(sign => !sideRows.some(row => row.sign === sign));
  for (const sign of missing) missingRows.push({ side, sign, status: 'eligible_but_not_scored_in_frozen_v0_2' });

  const filtered = sideRows
    .filter(row => universeSet.has(row.sign))
    .sort((a,b) => a.rank - b.rank);
  filtered.forEach((row, i) => matched.push({ ...row, observed_universe_rank: i + 1 }));
}

for (const target of targets) {
  if (!matched.some(row => row.side === target.side && row.sign === target.sign)) {
    throw new Error(`Davis target is not directly comparable in frozen v0.2: ${target.side} ${target.sign}`);
  }
}

const observedCounts = Object.fromEntries(['prefix','suffix'].map(side => [side, matched.filter(r => r.side === side).length]));

const comparison = targets.map(target => {
  const original = ranking.find(row => row.side === target.side && row.sign === target.sign);
  const row = matched.find(r => r.side === target.side && r.sign === target.sign);
  const cutoff = target.side === 'prefix' ? 2 : 4;
  return {
    side: target.side,
    sign: target.sign,
    frozen_v0_2_rank_116: original.rank,
    observed_universe_rank: row.observed_universe_rank,
    eligible_universe_size: 50,
    observed_eligible_signs: observedCounts[target.side],
    score_unchanged: original.score.toFixed(6),
    cutoff,
    in_cutoff_original_116: original.rank <= cutoff ? 'yes' : 'no',
    in_cutoff_universe_matched: row.observed_universe_rank <= cutoff ? 'yes' : 'no',
    rank_change: original.rank - row.observed_universe_rank,
  };
});

const originalHits = comparison.filter(r => r.in_cutoff_original_116 === 'yes').length;
const matchedHits = comparison.filter(r => r.in_cutoff_universe_matched === 'yes').length;
const prefixHits = comparison.filter(r => r.side === 'prefix' && r.in_cutoff_universe_matched === 'yes').length;
const suffixHits = comparison.filter(r => r.side === 'suffix' && r.in_cutoff_universe_matched === 'yes').length;

writeCsv(
  'universe-ranking.csv',
  ['side','observed_universe_rank','sign','frozen_rank_116','score','boundary_count','internal_count','boundary_enrichment_log2','exact_extension_pairs'],
  matched.map(row => ({
    side: row.side,
    observed_universe_rank: row.observed_universe_rank,
    sign: row.sign,
    frozen_rank_116: row.rank,
    score: row.score.toFixed(6),
    boundary_count: row.boundary_count,
    internal_count: row.internal_count,
    boundary_enrichment_log2: row.boundary_enrichment_log2,
    exact_extension_pairs: row.exact_extension_pairs,
  }))
);
writeCsv('eligible-but-unscored.csv', ['side','sign','status'], missingRows);
writeCsv(
  'davis-six-comparison.csv',
  ['side','sign','frozen_v0_2_rank_116','observed_universe_rank','eligible_universe_size','observed_eligible_signs','score_unchanged','cutoff','in_cutoff_original_116','in_cutoff_universe_matched','rank_change'],
  comparison
);

const missingSigns = [...new Set(missingRows.map(row => row.sign))];
let md = '# Davis 2026 universe-matched v0.2 comparison\n\n';
md += '**Status:** post-unblinding universe-matched reanalysis. The frozen v0.2 score is unchanged.  \n';
md += '**Eligible universe:** 50 Linear B main-series syllabograms with Linear A homomorphs, as clarified directly by Davis.  \n';
md += '**Important:** this does not replace or redefine the original pre-registered 3/6 result.\n\n';
md += '## Reproduction guard\n\n';
md += 'Before filtering, the rerun reproduces 116 ranked signs per side and the previously frozen ranks/scores of all six Davis targets. No target score is recalculated after filtering; ineligible signs are removed and the surviving frozen order is renumbered.\n\n';
md += '## Corpus-label compatibility\n\n';
md += `The frozen scorer contains **${observedCounts.prefix}/50** directly matching eligible labels on each side. The eligible label(s) absent from the frozen ranking are: **${missingSigns.join(', ')}**. Because the frozen scorer emitted only observed signs, no score is invented for an absent label.\n\n`;
md += 'This repository has separately noted that some scholarship uses `QI` for material the exploratory corpus may encode with numbered sign labels such as `*21F`. **No `QI` ↔ numbered-sign mapping is imposed here.** Any such palaeographic crosswalk must be registered and justified separately.\n\n';
md += 'All six Davis target affixes are directly present in the comparable set, so the original top-2-prefix / top-4-suffix cutoff can still be evaluated without that unresolved crosswalk.\n\n';
md += '## Result\n\n';
md += '| side | sign | frozen rank /116 | matched rank among observed eligible signs | unchanged score | cutoff | matched? |\n';
md += '|---|---|---:|---:|---:|---:|---|\n';
for (const row of comparison) {
  md += `| ${row.side} | ${row.sign} | ${row.frozen_v0_2_rank_116} | **${row.observed_universe_rank}/${row.observed_eligible_signs}** | ${row.score_unchanged} | ${row.cutoff} | **${row.in_cutoff_universe_matched}** |\n`;
}
md += '\n';
md += `Original cutoff overlap: **${originalHits}/6** (frozen primary result).\n\n`;
md += `Universe-matched cutoff overlap: **${matchedHits}/6** = prefixes **${prefixHits}/2**, suffixes **${suffixHits}/4**.\n\n`;
md += 'Under the original descriptive categories, 4/6 remains in the **partial conceptual replication** band. The improvement from 3/6 to 4/6 comes entirely from `I-`: the two signs ahead of it in the 116-sign prefix ranking (`*86`, `*306`) were outside Davis\'s stated eligible universe.\n\n';
md += '`TI` improves from rank 11 to rank 10 among directly observed eligible suffix labels; `RE` remains rank 7. The suffix top four remain `RO`, `JA`, `ME`, `TE`, so suffix cutoff overlap remains 2/4.\n\n';
md += '## Interpretation\n\n';
md += 'This is the cleanest direct-label candidate-universe sensitivity comparison currently available. Because the 50-sign restriction was learned after the six target identities were known, it is a **secondary post-unblinding analysis**, not a new preregistered score. The original 3/6 result remains the primary historical replication statistic.\n';
fs.writeFileSync(path.join(outDir, 'README.md'), md);
console.log(md);
