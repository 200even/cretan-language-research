#!/usr/bin/env node
import fs from 'node:fs';

// README: preserve the frozen primary result, add the later matched-universe result.
{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');
  const anchor = 'The pre-registered top-2-prefix / top-4-suffix comparison yields **3/6 exact cutoff overlap**, classified in advance as a **partial conceptual replication**. That score remains frozen; v0.3 does not rewrite it.\n';
  if (!text.includes('Post-unblinding universe-matched sensitivity analysis')) {
    const addition = `\n**Post-unblinding universe-matched sensitivity analysis.** On 2026-08-18 Davis clarified that his analysis considered only 50 Linear B main-series syllabograms with Linear A homomorphs and excluded untransliterated signs. Restricting the unchanged frozen v0.2 scores to the directly comparable members of that universe moves \`I-\` from rank 4 to **rank 2**, because \`*86\` and \`*306\` were never eligible in Davis's analysis. The matched cutoff overlap is therefore **4/6 = 2/2 prefixes + 2/4 suffixes**, still in the original "partial" band. This is a secondary post-unblinding result and does not replace the primary 3/6 score. One eligible label, \`QI\`, has no direct frozen v0.2 row and is not silently remapped to a numbered sign.\n`;
    if (!text.includes(anchor)) throw new Error('README Davis anchor missing');
    text = text.replace(anchor, anchor + addition);
  }

  const links = 'Protocol: [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md)  \nSecond-stage audit: [`results/davis-six-audit-synthesis.md`](results/davis-six-audit-synthesis.md)';
  if (text.includes(links) && !text.includes('Universe-matched analysis: [`experiments/davis-2026-universe-matched-v02.md`]')) {
    text = text.replace(links, links + '  \nUniverse-matched analysis: [`experiments/davis-2026-universe-matched-v02.md`](experiments/davis-2026-universe-matched-v02.md)  \nUniverse-matched results: [`results/davis-universe-matched-v0.2/`](results/davis-universe-matched-v0.2/)');
  }

  const evidenceNeedle = '- [`data/davis-2026-unblinding.csv`](data/davis-2026-unblinding.csv)';
  if (text.includes(evidenceNeedle) && !text.includes('- [`data/davis-2026-main-grid-universe.csv`]')) {
    text = text.replace(evidenceNeedle, evidenceNeedle + '\n- [`data/davis-2026-main-grid-universe.csv`](data/davis-2026-main-grid-universe.csv)');
  }

  fs.writeFileSync(path, text);
}

// Original Davis experiment: append the later methodological clarification without
// changing any registered score or wording of the primary result.
{
  const path = 'experiments/davis-2026-affix-replication.md';
  let text = fs.readFileSync(path, 'utf8');
  if (!text.includes('## Later candidate-universe clarification (2026-08-18)')) {
    const marker = '## A stronger descriptive pattern, reported separately';
    const section = `## Later candidate-universe clarification (2026-08-18)\n\nAfter the primary result was frozen and unblinded, Davis clarified directly that his statistical analysis admitted only **50 Linear B main-series syllabograms with Linear A homomorphs** and did not admit untransliterated signs. The original project ranking had admitted 116 observed signs per edge.\n\nA separately registered post-unblinding sensitivity analysis therefore filters the **unchanged v0.2 scores** to Davis's stated candidate universe. It finds:\n\n- \`A-\`: rank 1 → **1**;\n- \`I-\`: rank 4 → **2**;\n- \`RO\`: rank 1 → **1**;\n- \`TE\`: rank 4 → **4**;\n- \`RE\`: rank 7 → **7**;\n- \`TI\`: rank 11 → **10**.\n\nThe corresponding cutoff overlap is **4/6 = 2/2 prefixes + 2/4 suffixes**. Under the categories registered for this experiment, 4/6 remains a **partial conceptual replication**.\n\nThis secondary result does **not** replace the primary 3/6 score because the candidate-universe restriction was learned after target unblinding. It does show that the original miss on \`I-\` was partly caused by candidate-universe mismatch: the signs ranked #2 and #3 ahead of it (\`*86\`, \`*306\`) were ineligible under Davis's stated method.\n\nThe frozen v0.2 corpus directly contains 49 of Davis's 50 labels; \`QI\` has no ranking row. No post-hoc \`QI\` ↔ numbered-sign crosswalk is imposed.\n\nFull protocol and outputs: [\`davis-2026-universe-matched-v02.md\`](davis-2026-universe-matched-v02.md) and [\`../results/davis-universe-matched-v0.2/\`](../results/davis-universe-matched-v0.2/).\n\n`;
    if (!text.includes(marker)) throw new Error('Original Davis experiment marker missing');
    text = text.replace(marker, section + marker);
  }
  fs.writeFileSync(path, text);
}

console.log('Applied Davis universe-matched documentation updates.');
