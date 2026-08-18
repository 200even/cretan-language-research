#!/usr/bin/env node
import fs from 'node:fs';

const benchmarkPath = 'data/morphology-benchmark.csv';
const queuePath = 'data/morphology-audit-queue.csv';

const benchmarkReplacement = 'MB-TE-003,KU-NI,KU-NI-TE,suffix,TE,HT79+83,KH92,Haghia Triada,Chania,unknown,unknown,yes,none,"cross-site; possible onomastic/derivational relation",B,candidate,"Complete KU-NI is attested on HT79+83 and KU-NI-TE is complete on KH92; formal suffix relation survives, lexical identity and function unresolved","audits/TE.md; HT79+83 upstream transcription; KH92 published transcription; v0.3 regression correction"';
const queueReplacement = 'AQ-TE-003,2,suffix,TE,4,4.869,"KU-NI ~ KU-NI-TE",Tier-B-candidate,"Same lexeme or onomastic/derivational relation?","survives-formal-audit-corrected"';

const replaceRow = (filePath, prefix, replacement) => {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const index = lines.findIndex(line => line.startsWith(prefix));
  if (index < 0) throw new Error(`Could not find ${prefix} in ${filePath}`);
  lines[index] = replacement;
  fs.writeFileSync(filePath, lines.join('\n'));
};

replaceRow(benchmarkPath, 'MB-TE-003,', benchmarkReplacement);
replaceRow(queuePath, 'AQ-TE-003,', queueReplacement);
console.log('Applied v0.3 KU-NI benchmark correction.');
