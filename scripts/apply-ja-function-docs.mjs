#!/usr/bin/env node
import fs from 'node:fs';

// README updates
{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');

  const anchor = 'Full audit: [`audits/JA.md`](audits/JA.md)  \nSummary: [`data/ja-audit-summary.csv`](data/ja-audit-summary.csv)\n';
  const insertion = `${anchor}\nA second-stage contextual-function test then compared the four surviving Tier-A/B families. Its registered promotion rule required the **same base→JA role change in at least two independent families**. The result is negative: **0/4 families produced a replicated role shift**. In particular, both \`KU-PA/KU-PA-JA\` and \`A-SE/A-SE-JA\` preserve essentially the same administrative recipient/designation-like slot. Simple assignments such as recipient, sender/source, roundel/receipt, sealed-document, or commodity-association marker are therefore rejected.\n\nFunction test: [\`experiments/ja-context-function-test.md\`](experiments/ja-context-function-test.md)  \nContext matrix: [\`data/ja-context-function-matrix.csv\`](data/ja-context-function-matrix.csv)  \nSummary: [\`data/ja-context-function-summary.csv\`](data/ja-context-function-summary.csv)\n`;
  if (!text.includes('0/4 families produced a replicated role shift')) {
    if (!text.includes(anchor)) throw new Error('README JA audit anchor not found');
    text = text.replace(anchor, insertion);
  }

  const nextStart = text.indexOf('## Next work');
  const mapStart = text.indexOf('## Repository map', nextStart);
  if (nextStart < 0 || mapStart < 0) throw new Error('README next-work section not found');
  const next = `## Next work\n\nThe coarse contextual-function test is complete and negative. The immediate \`JA\` priority is now **micro-syntax**, not another global semantic guess:\n\n1. encode immediate left/right neighbors for every secure \`PA-SE\`, \`KU-PA\`, \`A-SE\`, \`*306-TU\` and corresponding \`JA\` form;\n2. distinguish transaction signs from commodity logograms, numerals, and dividers;\n3. match \`JA\` forms to non-\`JA\` recipient/designation entries from the same tablets and scribes;\n4. test whether \`JA\` predicts a recurring neighboring-sign construction even when the broad administrative role is unchanged;\n5. keep roundels separate from tablet syntax;\n6. audit the four v0.3 \`ME\` pairs under the same standards;\n7. extend v0.4 regression coverage to cross-face segmentation and authoritative-source gaps;\n8. require replication across at least two independent families before assigning any grammatical function.\n\nThe working search hypothesis may be described as **relational/derivational or agreement-like**, but no such function is established yet.\n\n`;
  text = text.slice(0, nextStart) + next + text.slice(mapStart);

  if (!text.includes('- [`data/ja-context-function-matrix.csv`](data/ja-context-function-matrix.csv)')) {
    text = text.replace('- [`data/ja-audit-summary.csv`](data/ja-audit-summary.csv)\n', '- [`data/ja-audit-summary.csv`](data/ja-audit-summary.csv)\n- [`data/ja-context-function-matrix.csv`](data/ja-context-function-matrix.csv)\n- [`data/ja-context-function-summary.csv`](data/ja-context-function-summary.csv)\n');
  }

  fs.writeFileSync(path, text);
}

// Methodology update
{
  const path = 'METHODOLOGY.md';
  let text = fs.readFileSync(path, 'utf8');
  const marker = '## Kober-grid protocol';
  if (!text.includes('## Functional-assignment controls')) {
    const insert = `## Functional-assignment controls\n\nOnce a morphological element survives formal audit, its **function is a separate hypothesis** and must be tested across independent stems.\n\nA grammatical/semantic function should not be promoted from one visually striking pair. The current minimum standard is:\n\n1. predefine the observable contextual contrast being tested;\n2. recover the same base→extended contrast in at least **two independent Tier-A/B families**;\n3. require inscriptional/documentary evidence rather than an etymological gloss alone;\n4. test explicit counterexamples where bare and extended forms occupy the same proposed role;\n5. separate archaeological document function from linguistic word function;\n6. treat computational labels such as sender/recipient as secondary analytical evidence unless independently justified epigraphically;\n7. report a failed functional test without downgrading the underlying morphology unless the morphology itself is contradicted.\n\nThe completed \`JA\` contextual-function experiment is the current model. It recovered no repeated coarse role change across four families and therefore rejects simple \`JA\` assignments such as recipient, sender/source, receipt/roundel, sealed-document, or commodity-association marker. See [\`experiments/ja-context-function-test.md\`](experiments/ja-context-function-test.md).\n\n`;
    if (!text.includes(marker)) throw new Error('Methodology marker not found');
    text = text.replace(marker, insert + marker);
  }
  fs.writeFileSync(path, text);
}

console.log('Applied JA contextual-function documentation updates.');
