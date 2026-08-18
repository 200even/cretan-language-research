#!/usr/bin/env node
import fs from 'node:fs';

const replaceSection = (text, start, end, replacement) => {
  const a = text.indexOf(start);
  const b = text.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Could not locate section ${start}`);
  return text.slice(0, a) + replacement + text.slice(b);
};

// README
{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');
  const section = `### 4. Final \`JA\` survives full audit as productive morphology\n\nThe most important non-Davis result from v0.3 remains final \`JA\`, but the manual audit substantially refines the automatic count.\n\nv0.3 ranked \`JA\` **#1 among suffixes by damage-aware exact paradigms** and generated seven apparently secure relationships. The completed inscription/context audit resolves those seven as:\n\n| pair | audit result |\n|---|---|\n| \`PA-SE ~ PA-SE-JA\` | **Tier A** |\n| \`KU-PA ~ KU-PA-JA\` | **Tier A** |\n| \`A-SE ~ A-SE-JA\` | **Tier B** |\n| \`*306-TU ~ *306-TU-JA\` | **Tier B / onomastic risk** |\n| \`A-MA ~ A-MA-JA\` | Tier C / comparison-only |\n| \`JA-SA ~ JA-SA-JA\` | rejected: cross-face continuation / ritual abbreviation |\n| \`PU2-RE ~ PU2-RE-JA\` | rejected: authoritative fragment boundaries absent from exploratory source layer |\n\nSo **4/7** survive as credible Tier-A/B morphology candidates; only the two original controls currently satisfy the strongest benchmark standard.\n\nThe important structural conclusion survives:\n\n> **Final \`JA\` behaves as a productive morphological element in at least some Linear A vocabulary. Its grammatical function remains unknown.**\n\nThe audit also adds two failure modes not captured by v0.3 physical-damage masking: **editorial/cross-face segmentation** and **authoritative source-coverage gaps**.\n\nFull audit: [\`audits/JA.md\`](audits/JA.md)  \nSummary: [\`data/ja-audit-summary.csv\`](data/ja-audit-summary.csv)\n\n`;
  text = replaceSection(text, '### 4. Final `JA` is the strongest additional paradigmatic candidate', '### 5. Different affixes have different evidentiary profiles', section);

  const next = `## Next work\n\nThe immediate priority is now **contextual-function testing of the four surviving \`JA\` families**, followed by the same full audit for \`ME\`:\n\n1. test whether \`PA-SE/PA-SE-JA\` tablet-vs-roundel distribution predicts a repeatable grammatical or documentary role;\n2. compare \`KU-PA/KU-PA-JA\` in ordinary commodity administration;\n3. test the possible place/designation behavior of \`A-SE/A-SE-JA\` without assuming a geographic gloss;\n4. isolate onomastic/personnel effects in \`*306-TU/*306-TU-JA\`;\n5. audit the four v0.3 \`ME\` pairs under the same controls;\n6. design v0.4 regression cases for cross-face continuation and missing-authoritative-reading coverage;\n7. separately develop a frequency-aware boundary-evidence statistic without altering frozen v0.3;\n8. repeat key extraction against an independently encoded specialist corpus, preferably SigLA-derived, where practical.\n\nA grammatical function for \`JA\` should be proposed only if the same contextual contrast is reproduced across more than one independent Tier-A/B family.\n\n`;
  text = replaceSection(text, '## Next work', '## Repository map', next);
  text = text.replace('- [`data/davis-six-audit-summary.csv`](data/davis-six-audit-summary.csv)\n', '- [`data/davis-six-audit-summary.csv`](data/davis-six-audit-summary.csv)\n- [`data/ja-audit-summary.csv`](data/ja-audit-summary.csv)\n');
  text = text.replace('  davis-six-audit-summary.csv\n  v03-regression-set.csv', '  davis-six-audit-summary.csv\n  ja-audit-summary.csv\n  v03-regression-set.csv');
  text = text.replace('  TI.md\n\nresults/', '  TI.md\n  JA.md\n\nresults/');
  fs.writeFileSync(path, text);
}

// Methodology: add new extraction safeguards learned from JA audit.
{
  const path = 'METHODOLOGY.md';
  let text = fs.readFileSync(path, 'utf8');
  const marker = '## Kober-grid protocol';
  if (!text.includes('## Segmentation and source-coverage controls')) {
    const insert = `## Segmentation and source-coverage controls\n\nThe final \`JA\` audit exposed two false-positive classes beyond physical fragment brackets.\n\n### Cross-face / editorial continuation\n\nA normalized token is not automatically a word. An apparent form may be only one part of a sequence explicitly continued across faces, lines, or object surfaces.\n\nExample: IO Za 12 exposes \`JA-SA\` in the cleaned word layer, but the inscription commentary states that the two faces divide one longer form \`JA-SA-|SA-RA-ME\`. Such a token cannot serve as a bare stem in an exact-pair test.\n\n**Rule:** before promotion, check whether an apparent word is explicitly continued by the edition, repeated as part of a longer formula, or segmented editorially for layout rather than lexical reasons.\n\n### Authoritative source-coverage gaps\n\nA parser can only preserve damage information present in its input source. A newer editio princeps or specialist edition may contain fragment traces absent from an exploratory HTML corpus.\n\nExample: the exploratory record allowed \`PU2-RE\` on PK Za 28, but the 2022 editio princeps reads \`]-PU2-RE\` and cites ZA Zb 34 as \`]PU2-RE-JA\`. The apparent exact pair is therefore invalid.\n\n**Rule:** candidate promotion requires checking the most authoritative/recent available reading, especially for items whose exploratory transcription is placeholder, incomplete, or postdates the frozen upstream dataset.\n\nThese are separate from the v0.3 physical-boundary mask and should become dedicated v0.4 regression classes.\n\n`;
    text = text.replace(marker, insert + marker);
  }
  fs.writeFileSync(path, text);
}

// v0.3 experiment: preserve frozen result while noting what later audit learned.
{
  const path = 'experiments/damage-aware-v03.md';
  let text = fs.readFileSync(path, 'utf8');
  if (!text.includes('## Post-v0.3 JA audit')) {
    text += `\n## Post-v0.3 JA audit\n\nThe separately completed [final \`JA\` audit](../audits/JA.md) deliberately leaves the frozen v0.3 output unchanged but demonstrates that \`accepted_secure\` in v0.3 means **physically boundary-secure in the available upstream layer**, not fully adjudicated morphology.\n\nOf the seven \`JA\` pairs v0.3 marked secure:\n\n- 2 remain Tier A;\n- 2 remain Tier B;\n- 1 is comparison-only;\n- 2 are rejected.\n\nThe two rejections expose failure classes outside v0.3's design:\n\n1. \`JA-SA ~ JA-SA-JA\`: editorial/cross-face continuation and ritual abbreviation;\n2. \`PU2-RE ~ PU2-RE-JA\`: authoritative fragment boundaries absent from the exploratory source layer.\n\nTherefore v0.3 remains validated for its registered physical-boundary regression task, while v0.4 should extend the benchmark to **segmentation continuity** and **source-coverage provenance**.\n`;
  }
  fs.writeFileSync(path, text);
}

// Rejected hypotheses: record both failed JA pairs explicitly.
{
  const path = 'REJECTED_HYPOTHESES.md';
  let text = fs.readFileSync(path, 'utf8');
  const marker = '\n---\n\n## Principle';
  if (!text.includes('## 12. `JA-SA ~ JA-SA-JA` as a clean final-`JA` paradigm')) {
    const insert = `\n## 12. \`JA-SA ~ JA-SA-JA\` as a clean final-\`JA\` paradigm\n\n**Original appearance:** damage-aware v0.3 treated both strings as complete and therefore generated a perfect \`X ~ X-JA\` relationship.\n\n**Audit result:** IO Za 12 explicitly continues \`JA-SA-\` across the object into \`-SA-RA-ME\`; it is not a free bare word. SAM Wa 1 belongs to the same seal/formula family. KN Zg 55 \`JA-SA-JA\` is plausibly an abbreviation of the larger \`JA-SA-SA-RA...\` family.\n\n**Status:** **rejected as a productive-suffix pair.** The failure is editorial/cross-face segmentation, not physical damage.\n\nSee [\`audits/JA.md\`](audits/JA.md).\n\n## 13. \`PU2-RE ~ PU2-RE-JA\` as a secure whole-word final-\`JA\` pair\n\n**Original appearance:** the frozen exploratory corpus exposed complete \`PU2-RE\` and \`PU2-RE-JA\` tokens, and v0.3 found no bracket-based boundary problem.\n\n**Authoritative check:** Del Freo, Zurbach & Knappett (2022) read PK Za 28 as \`]-PU2-RE\` and cite ZA Zb 34 as \`]PU2-RE-JA\`. The relevant left boundaries are not secure.\n\n**Status:** **rejected as an exact whole-word pair.** This is a source-coverage failure: the exploratory source layer did not encode the authoritative fragment information.\n\nSee [\`audits/JA.md\`](audits/JA.md).\n`;
    text = text.replace(marker, insert + marker);
  }
  fs.writeFileSync(path, text);
}

console.log('Applied JA audit documentation updates.');
