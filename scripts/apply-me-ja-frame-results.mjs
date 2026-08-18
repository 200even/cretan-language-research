#!/usr/bin/env node
import fs from 'node:fs';

function appendRows(path, idPrefix, rows) {
  let text = fs.readFileSync(path, 'utf8').replace(/\s+$/, '');
  if (!text.includes(idPrefix)) text += '\n' + rows.join('\n');
  fs.writeFileSync(path, text + '\n');
}

appendRows('data/morphology-benchmark.csv', 'MB-ME-001,', [
  'MB-ME-001,A-RA-TU,A-RA-TU-ME,suffix,ME,ZA7a,HTWc3024,Zakros,Haghia Triada,unknown,unknown,yes,none,"cross-site; tablet/roundel; lexical identity unresolved",B,candidate,"Complete formal final-ME extension survives, but no same-site/scribe contextual identity or grammatical function is established","audits/ME.md; ZA7a and HTWc3024 GORILA-derived item records"',
  'MB-ME-002,JA-SA-SA-RA,JA-SA-SA-RA-ME,suffix,ME,IOZa16,"multiple ritual",Iouktas,"multiple ritual sites",unknown,unknown,no,"cross-face lexical continuation",not-comparable,rejected,"IOZa16 breaks JA-SA-SA-RA- / -ME across faces; commentary explicitly reconstructs one full JA-SA-SA-RA-ME word","audits/ME.md; IOZa16 GORILA-derived commentary"',
  'MB-ME-003,MA-RU,MA-RU-ME,suffix,ME,HT117a,HT24a,Haghia Triada,Haghia Triada,"HT Scribe 9",unknown,no,"data-type mismatch: complex/logographic notation flattened as syllabic word",not-comparable,rejected,"Bare MA-RU is a personnel/list entry; HT24a supposed MA-RU-ME is tabulated in the logogram column as MA+RU ME {*561}, so the normalized corpus manufactured a syllabic-looking suffix pair","audits/ME.md; HT117a and HT24a GORILA-derived records; HT24a logogram tabulation"',
  'MB-ME-004,SA-RA,SA-RA-ME,suffix,ME,"HT62+73; SAMWa1",IOZa12,"Haghia Triada; Samothrace",Iouktas,unknown,unknown,no,"cross-face lexical continuation",not-comparable,rejected,"IOZa12 SA-RA-ME is the second face of JA-SA- | -SA-RA-ME, not an independent free variant","audits/ME.md; IOZa12 GORILA-derived commentary"'
]);

appendRows('data/morphology-audit-queue.csv', 'AQ-ME-001,', [
  'AQ-ME-001,8,suffix,ME,3,4.879,"A-RA-TU ~ A-RA-TU-ME",Tier-B-candidate,"Same lexeme across Zakros tablet and Haghia Triada roundel?","survives-formal-audit-tier-b"',
  'AQ-ME-002,8,suffix,ME,3,4.879,"JA-SA-SA-RA ~ JA-SA-SA-RA-ME",rejected-control,"Is the apparent bare form an independent word?","rejected-cross-face-continuation"',
  'AQ-ME-003,8,suffix,ME,3,4.879,"MA-RU ~ MA-RU-ME",rejected-control,"Is the extended form an ordinary syllabic word or complex logographic notation?","rejected-logogram-flattening"',
  'AQ-ME-004,8,suffix,ME,3,4.879,"SA-RA ~ SA-RA-ME",rejected-control,"Is SA-RA-ME independently segmented?","rejected-cross-face-continuation"'
]);

// README comparative section and next-work refresh.
{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');
  const marker = '### 5. Different affixes have different evidentiary profiles';
  if (!text.includes('### Comparative audit: `ME` collapses under source/type controls')) {
    const section = `### Comparative audit: \`ME\` collapses under source/type controls\n\nThe same v0.3 screen that elevated \`JA\` ranked final \`ME\` #2 by accepted exact paradigms. A full audit produces a sharply different outcome:\n\n| v0.3 \`ME\` pair | manual result |\n|---|---|\n| \`A-RA-TU ~ A-RA-TU-ME\` | **Tier B candidate** |\n| \`JA-SA-SA-RA ~ ...-ME\` | rejected: cross-face continuation |\n| \`MA-RU ~ MA-RU-ME\` | rejected: complex/logographic \`*561\` notation flattened as syllabic text |\n| \`SA-RA ~ SA-RA-ME\` | rejected: cross-face continuation |\n\nSo only **1/4** damage-secure automatic pairs survives as a credible morphology candidate. The current benchmark therefore does **not** establish productive final \`ME\` morphology. This is an important contrast with \`JA\`, where four independent Tier-A/B families survived equivalent scrutiny.\n\nThe \`ME\` audit adds a new corpus failure mode: **complex-sign/logogram flattening can manufacture a syllabic-looking affix paradigm**.\n\nAudit: [\`audits/ME.md\`](audits/ME.md)  \nLead: [\`leads/ME.md\`](leads/ME.md)  \nSummary: [\`data/me-audit-summary.csv\`](data/me-audit-summary.csv)\n\n`;
    if (!text.includes(marker)) throw new Error('README comparative marker missing');
    text = text.replace(marker, section + marker);
  }

  const start = text.indexOf('## Next work');
  const end = text.indexOf('## Repository map', start);
  if (start >= 0 && end > start) {
    const next = `## Next work\n\nThe current priority is now **comparative morphology**, not further semantic drilling on \`JA\`.\n\n1. keep the \`JA\` functional stop rule in force until genuinely new evidence appears;\n2. audit \`NE\` next, because it already contains the Tier-A \`*21F-TU ~ *21F-TU-NE\` control plus unresolved v0.2/v0.3 candidates;\n3. compare audited survival rates and evidence profiles across \`JA\`, \`ME\`, \`NE\`, and Davis's suffixes;\n4. register v0.4 extraction controls for cross-face continuation, authoritative-source gaps, and complex-logogram flattening;\n5. stratify morphology by lexical class rather than forcing one affix model across personnel, ritual, commodity, and ordinary administrative vocabulary;\n6. seek new same-tablet/same-scribe paradigms before assigning grammatical functions.\n\nThe completed \`JA\` list/frame test is negative: even broader account hierarchy does not recover a general \`JA\` function. See [\`experiments/ja-list-frame-test.md\`](experiments/ja-list-frame-test.md).\n\n`;
    text = text.slice(0, start) + next + text.slice(end);
  }

  if (!text.includes('- [`data/me-audit-summary.csv`](data/me-audit-summary.csv)')) {
    text = text.replace('- [`data/ja-context-function-summary.csv`](data/ja-context-function-summary.csv)\n', '- [`data/ja-context-function-summary.csv`](data/ja-context-function-summary.csv)\n- [`data/ja-list-frame-matrix.csv`](data/ja-list-frame-matrix.csv)\n- [`data/ja-list-frame-summary.csv`](data/ja-list-frame-summary.csv)\n- [`data/me-audit-summary.csv`](data/me-audit-summary.csv)\n');
  }
  if (!text.includes('  ME.md')) text = text.replace('  TI.md\n', '  TI.md\n  ME.md\n');
  fs.writeFileSync(path, text);
}

// Methodology: add logogram/type flattening to safeguards.
{
  const path = 'METHODOLOGY.md';
  let text = fs.readFileSync(path, 'utf8');
  const danger = '- globally blacklisting a spelling because one attestation of it is damaged.';
  if (text.includes(danger) && !text.includes('flattening complex logograms or ligatures')) {
    text = text.replace(danger, danger + '\n- flattening complex logograms or ligatures into hyphenated syllabic-looking strings and then treating them as ordinary words;\n- treating a line or face break as a word boundary when the edition explicitly continues the same lexical item across the break.');
  }
  const corpusRule = '- exact `X ~ X-A` / `X ~ A-X` relationships are generated only after boundary masking;';
  if (text.includes(corpusRule) && !text.includes('support/type classification')) {
    text = text.replace(corpusRule, corpusRule + '\n- support/type classification must distinguish ordinary syllabic words from logograms, ligatures, and complex signs before morphology generation;\n- editorial line/face continuation must be reconciled before a segment is admitted as a free word;');
  }
  fs.writeFileSync(path, text);
}

// Rejected hypotheses / controls.
{
  const path = 'REJECTED_HYPOTHESES.md';
  let text = fs.readFileSync(path, 'utf8').replace(/\s+$/, '');
  if (!text.includes('## `ME` automatic exact-pair controls')) {
    text += `\n\n## \`ME\` automatic exact-pair controls\n\nThe v0.3 screen produced four damage-secure apparent \`X ~ X-ME\` relationships. Full source/type audit rejects three:\n\n- \`JA-SA-SA-RA ~ JA-SA-SA-RA-ME\`: IO Za 16 continues the same word across faces as \`JA-SA-SA-RA- | -ME\`.\n- \`SA-RA ~ SA-RA-ME\`: IO Za 12 continues \`JA-SA- | -SA-RA-ME\`; \`SA-RA-ME\` is not a free word there.\n- \`MA-RU ~ MA-RU-ME\`: HT 24a tabulates the supposed extended form as complex/logographic \`MA+RU ME {*561}\`, not an ordinary syllabic word parallel to HT 117a \`MA-RU\`.\n\nOnly \`A-RA-TU ~ A-RA-TU-ME\` remains as a Tier-B formal candidate. Productive final \`ME\` is therefore not established by the current exact-pair benchmark. See [\`audits/ME.md\`](audits/ME.md).\n`;
  }
  fs.writeFileSync(path, text + '\n');
}

console.log('Applied ME audit and JA list/frame results.');
