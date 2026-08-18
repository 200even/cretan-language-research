#!/usr/bin/env node
import fs from 'node:fs';

// README
{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');

  if (!text.includes('### Current discovery substrate: structural-aware v0.4')) {
    const marker = '## Current headline results\n\n';
    const section = `### Current discovery substrate: structural-aware v0.4\n\nv0.4 extends the validated damage-aware extractor with type/source controls for **editorial continuation, complex-logogram flattening, cross-script contamination, and authoritative source corrections**. Lexical/onomastic warnings are annotated separately rather than used as hidden exclusions.\n\nThe frozen expanded regression gate passes:\n\n> **26/26 structural/source negatives excluded; 11/11 secure controls retained.**\n\nThe run begins with 1,285 candidate syllabic occurrences and retains **951** after structural/type/source masking. The new extractor automatically reproduces several conclusions that previously required manual audit:\n\n- final \`JA\`: 7 v0.3 apparent pairs → **5** v0.4 structural pairs; both manually rejected false pairs disappear automatically;\n- final \`ME\`: 4 → **1**, matching the completed manual source/type audit;\n- final \`NE\`: 2 structural pairs remain, but one is explicitly flagged onomastic, leaving the Tier-A \`*21F-TU\` family as the clean core.\n\nTop v0.4 suffixes by structural exact paradigms are \`JA\` (5), \`TI\` (3), \`RA\` (3), and \`TE\` (3). These are candidate-generation counts, not probabilities or translations.\n\nExperiment: [\`experiments/structural-aware-v04.md\`](experiments/structural-aware-v04.md)  \nGenerated results: [\`results/structural-aware-v0.4/\`](results/structural-aware-v0.4/)  \nRegression: [\`results/structural-aware-v0.4/REGRESSION.md\`](results/structural-aware-v0.4/REGRESSION.md)\n\n`;
    if (!text.includes(marker)) throw new Error('README headline marker missing');
    text = text.replace(marker, marker + section);
  }

  const nextStart = text.indexOf('## Next work');
  const nextEnd = text.indexOf('## Repository map', nextStart);
  if (nextStart >= 0 && nextEnd > nextStart) {
    const next = `## Next work\n\nv0.4 is now the current candidate-generation substrate. The next research priority is **manual audit of final \`RA\`**, the strongest new non-Davis suffix candidate after structural/type controls.\n\n1. audit the three v0.4 \`RA\` relationships: \`SA-RA ~ SA-RA-RA\`, \`A-DA ~ A-DA-RA\`, and \`MI-DA ~ MI-DA-RA\`;\n2. require the same boundary, source-type, context, scribe, and lexical-identity standards used for \`JA\`, \`ME\`, and \`NE\`;\n3. if \`RA\` collapses, move to the clean two-pair candidates \`QE\`, \`SU\`, and \`WI\`;\n4. keep the \`JA\` and \`NE\` functional stop rules in force until genuinely new independent paradigms appear;\n5. preserve the v0.4 extraction statistic unchanged while a separately registered future experiment addresses low-frequency instability in raw boundary enrichment;\n6. continue to prefer same-tablet or same-scribe multi-stem paradigms as the strongest route toward grammatical function.\n\nCurrent structural ranking: [\`results/structural-aware-v0.4/paradigm-ranking.csv\`](results/structural-aware-v0.4/paradigm-ranking.csv).  \nCross-suffix audited comparison: [\`data/suffix-audit-comparison.csv\`](data/suffix-audit-comparison.csv).\n\n`;
    text = text.slice(0, nextStart) + next + text.slice(nextEnd);
  }

  const evidenceNeedle = '- [`data/v03-regression-set.csv`](data/v03-regression-set.csv)';
  if (text.includes(evidenceNeedle) && !text.includes('- [`data/v04-regression-set.csv`](data/v04-regression-set.csv)')) {
    text = text.replace(evidenceNeedle, evidenceNeedle + '\n- [`data/v04-regression-set.csv`](data/v04-regression-set.csv)\n- [`data/v04-source-overrides.csv`](data/v04-source-overrides.csv)\n- [`data/v04-lexical-warnings.csv`](data/v04-lexical-warnings.csv)');
  }

  if (!text.includes('  build-structural-mask-v04.mjs')) {
    text = text.replace('  evaluate-v03-regression.mjs\n', '  evaluate-v03-regression.mjs\n  build-structural-mask-v04.mjs\n  rank-affixes-v04.mjs\n  evaluate-v04-regression.mjs\n');
  }
  if (!text.includes('  v04-regression-set.csv')) {
    text = text.replace('  v03-regression-set.csv\n', '  v03-regression-set.csv\n  v04-regression-set.csv\n  v04-source-overrides.csv\n  v04-lexical-warnings.csv\n');
  }
  if (!text.includes('  structural-aware-v0.4/')) {
    text = text.replace('  damage-aware-v0.3/\n', '  damage-aware-v0.3/\n  structural-aware-v0.4/\n');
  }
  if (!text.includes('  structural-aware-v04.md')) {
    text = text.replace('  damage-aware-v03.md\n', '  damage-aware-v03.md\n  structural-aware-v04.md\n');
  }

  fs.writeFileSync(path, text);
}

// Methodology
{
  const path = 'METHODOLOGY.md';
  let text = fs.readFileSync(path, 'utf8');

  if (!text.includes('## Structural/type-aware extraction protocol (v0.4)')) {
    const marker = '## Separate morphology evidence dimensions';
    const section = `## Structural/type-aware extraction protocol (v0.4)\n\nv0.4 extends damage awareness into **source and token type**. Before a normalized spelling can participate in a morphology pair, the pipeline now checks whether the attestation is actually eligible to be treated as a Linear A syllabic free word.\n\nThe structural mask recognizes:\n\n- physical fragment boundaries;\n- explicit cross-line / cross-face lexical continuation marked by leading or trailing hyphens;\n- complex signs or ligatures typed in a source table's **logogram** column, including normalized flattenings such as \`MA+RU ME {*561}\` → apparent \`MA-RU-ME\`;\n- rows explicitly typed as Hieroglyphic (for example \`H:\`) so cross-script seal material does not enter the Linear A free-word pool;\n- versioned authoritative source corrections when the pinned exploratory source lacks a later or more precise reading.\n\nRules:\n\n1. exclusions are counted per inscription/form attestation, never as global spelling bans;\n2. overlapping structural reasons do not cause the same occurrence to be excluded twice;\n3. authoritative overrides must be epigraphic/source corrections, not semantic interpretations;\n4. lexical-class and onomastic concerns are stored as **warnings**, not hidden extraction exclusions;\n5. a structurally retained pair remains only a formal candidate until common lexical identity and contextual equivalence are audited.\n\nThe frozen v0.4 regression gate passes **26/26** structural/source negatives while retaining **11/11** secure controls. See [\`experiments/structural-aware-v04.md\`](experiments/structural-aware-v04.md).\n\nA useful consequence is that corpus preprocessing is now itself benchmarked: the extractor must reproduce known failures such as cross-face \`JA-SA\`, complex/logographic \`MA-RU-ME\`, and authoritative-boundary \`PU2-RE\` without being told which affix is being tested.\n\n`;
    if (!text.includes(marker)) throw new Error('Methodology insertion marker missing');
    text = text.replace(marker, section + marker);
  }

  const oldVersion = 'The frozen v0.1/v0.2 analyses remain preserved as historical results. v0.3 is a separately versioned damage-aware pipeline and does not retroactively alter the pre-registered Davis comparison score.';
  const newVersion = 'The frozen v0.1/v0.2 analyses remain preserved as historical results. v0.3 is the frozen damage-aware pipeline; v0.4 is the separately versioned structural/type-aware discovery substrate. Neither later version retroactively alters the pre-registered Davis comparison score.';
  if (text.includes(oldVersion)) text = text.replace(oldVersion, newVersion);

  const safeguard = '- globally blacklisting a spelling because one attestation of it is damaged.';
  if (text.includes(safeguard) && !text.includes('admitting explicitly cross-script')) {
    text = text.replace(safeguard, safeguard + '\n- admitting explicitly cross-script (e.g. Hieroglyphic) sign groups into the Linear A free-word morphology pool;\n- treating a complex/logographic source entry as an ordinary syllabic word because a normalized corpus flattened its notation;\n- treating editorial continuation across a line or object face as an independent word boundary.');
  }

  fs.writeFileSync(path, text);
}

console.log('Applied v0.4 README and methodology updates.');
