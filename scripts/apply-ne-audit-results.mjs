#!/usr/bin/env node
import fs from 'node:fs';

function replaceRow(path, prefix, replacement) {
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  const i = lines.findIndex(line => line.startsWith(prefix));
  if (i < 0) throw new Error(`Missing ${prefix} in ${path}`);
  lines[i] = replacement;
  fs.writeFileSync(path, lines.join('\n'));
}

function appendRows(path, idPrefix, rows) {
  let text = fs.readFileSync(path, 'utf8').replace(/\s+$/, '');
  if (!text.includes(idPrefix)) text += '\n' + rows.join('\n');
  fs.writeFileSync(path, text + '\n');
}

replaceRow(
  'data/morphology-benchmark.csv',
  'MB-PARA-001,',
  'MB-PARA-001,PA-RA,PA-RA-NE,lexical-identity-test,NE,"HT128a; PH3a","HT115a; HT115b","Haghia Triada; Phaistos",Haghia Triada,"HT Scribe 9; unknown","HT Scribe 8",yes,none,"recipient-like contexts superficially overlap but lexical identity unresolved",rejected,reclassified,"Both strings are secure, but HT forms segregate by scribe and PA-RA-NE is independently treated as a Minoan personal name in Linear A/B comparative scholarship; cannot support productive NE","audits/NE.md; HT115a/HT128a transaction layers; Salgarella Linear A/B onomastic comparison"'
);

appendRows('data/morphology-benchmark.csv', 'MB-NE-002,', [
  'MB-NE-002,QE-TU,QE-TU-NE,suffix,NE,HT41,HT12,Haghia Triada,Haghia Triada,"HT Scribe 14","HT Scribe 11",no,"base preserved as ]QE-TU",not-comparable,rejected,rejected,"Complete QE-TU-NE cannot form an exact paradigm with fragmentary ]QE-TU","audits/NE.md; HT41 and HT12 GORILA-derived records; v0.3 excluded_insecure_base"',
  'MB-NE-003,PA-TA,PA-TA-NE,suffix,NE,KH79+89,"HT94b; HT122a; HTWe1019a",Khania,Haghia Triada,unknown,multiple,no,"base preserved as ]PA-TA",not-comparable,rejected,rejected,"Complete PA-TA-NE attestations cannot repair the insecure left boundary of the sole apparent base","audits/NE.md; KH79+89 commentary; v0.3 excluded_insecure_base"'
]);

replaceRow(
  'data/morphology-audit-queue.csv',
  'AQ-NE-001,',
  'AQ-NE-001,8,suffix,NE,5,4.735,"*21F-TU ~ *21F-TU-NE",Tier-A-positive,"Primary-edition revalidation; benchmark positive control","validated-tier-a-same-scribe-cross-scribe"'
);
replaceRow(
  'data/morphology-audit-queue.csv',
  'AQ-NE-002,',
  'AQ-NE-002,8,suffix,NE,5,4.735,"QE-TU ~ QE-TU-NE",rejected-control,"Secure same-lexeme relationship?","rejected-damaged-base"'
);
replaceRow(
  'data/morphology-audit-queue.csv',
  'AQ-NE-003,',
  'AQ-NE-003,8,suffix,NE,5,4.735,"PA-TA ~ PA-TA-NE",rejected-control,"Secure same-lexeme relationship?","rejected-damaged-base"'
);
replaceRow(
  'data/morphology-audit-queue.csv',
  'AQ-NE-004,',
  'AQ-NE-004,8,suffix,NE,5,4.735,"PA-RA ~ PA-RA-NE",reclassified-control,"Does expanded corpus remove or preserve scribal confound?","reclassified-onomastic-scribal-lexical-identity"'
);

{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');
  const marker = '### 5. Different affixes have different evidentiary profiles';
  if (!text.includes('### Comparative audit: `NE` has one strong local paradigm')) {
    const section = `### Comparative audit: \`NE\` has one strong local paradigm\n\nThe full \`NE\` audit produces an intermediate profile between \`JA\` and \`ME\`:\n\n| candidate family | manual result |\n|---|---|\n| \`*21F-TU ~ *21F-TU-NE\` | **Tier A positive** |\n| \`QE-TU ~ QE-TU-NE\` | rejected: base is \`]QE-TU\` |\n| \`PA-TA ~ PA-TA-NE\` | rejected: base is \`]PA-TA\` |\n| \`PA-RA ~ PA-RA-NE\` | reclassified: scribal + onomastic lexical-identity confound |\n\nThe \`*21F-TU\` family is exceptionally strong locally: HT Scribe 9 writes both bare and extended forms, and Scribe 11 independently replicates the extended form. But **only 1/4 original candidate families survives as credible morphology**, so current exact-pair evidence does not establish productive final \`NE\` across independent stems.\n\nThe extended \`*21F-TU-NE\` form occurs in both header-like and numbered recipient-like contexts, so no grammatical function is assigned.\n\nAudit: [\`audits/NE.md\`](audits/NE.md)  \nLead: [\`leads/NE.md\`](leads/NE.md)  \nSummary: [\`data/ne-audit-summary.csv\`](data/ne-audit-summary.csv)  \nCross-suffix comparison: [\`data/suffix-audit-comparison.csv\`](data/suffix-audit-comparison.csv)\n\n`;
    if (!text.includes(marker)) throw new Error('README affix-profile marker missing');
    text = text.replace(marker, section + marker);
  }

  if (!text.includes('- [`data/ne-audit-summary.csv`](data/ne-audit-summary.csv)')) {
    text = text.replace('- [`data/me-audit-summary.csv`](data/me-audit-summary.csv)\n', '- [`data/me-audit-summary.csv`](data/me-audit-summary.csv)\n- [`data/ne-audit-summary.csv`](data/ne-audit-summary.csv)\n- [`data/suffix-audit-comparison.csv`](data/suffix-audit-comparison.csv)\n');
  }

  const start = text.indexOf('## Next work');
  const end = text.indexOf('## Repository map', start);
  if (start >= 0 && end > start) {
    const next = `## Next work\n\nThe three non-Davis suffix screens now have full manual outcomes: \`JA\` is productive, while \`ME\` and \`NE\` are not established as productive across independent stems. The next priority is therefore **v0.4 corpus/type control**, not another semantic drill-down.\n\n1. keep the \`JA\` and \`NE\` functional stop rules in force until genuinely new independent paradigms appear;\n2. register permanent controls for cross-face continuation, authoritative-source gaps, damaged bases, onomastic lexical-identity confounds, and complex-logogram flattening;\n3. make v0.4 distinguish syllabic words, complex signs/logograms, headings, and editorial continuations before paradigm generation;\n4. rerun the corpus under v0.4 before choosing the next non-Davis suffix family;\n5. compare audited survival rates against Davis's suffixes and the known positive prefixes;\n6. seek same-tablet or same-scribe multi-stem paradigms as the strongest path toward grammatical function.\n\nThe current comparative survival table is [\`data/suffix-audit-comparison.csv\`](data/suffix-audit-comparison.csv).\n\n`;
    text = text.slice(0, start) + next + text.slice(end);
  }

  if (!text.includes('  NE.md\n')) text = text.replace('  ME.md\n', '  ME.md\n  NE.md\n');
  if (!text.includes('  ne-audit-summary.csv\n')) text = text.replace('  ja-audit-summary.csv\n', '  ja-audit-summary.csv\n  me-audit-summary.csv\n  ne-audit-summary.csv\n  suffix-audit-comparison.csv\n');
  if (!text.includes('  NE.md\n  SI-DA.md')) text = text.replace('  JA.md\n  SI-DA.md', '  JA.md\n  NE.md\n  ME.md\n  SI-DA.md');
  fs.writeFileSync(path, text);
}

console.log('Applied NE audit results.');
