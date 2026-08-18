#!/usr/bin/env node
import fs from 'node:fs';

// README: make v0.5 current, freeze its result, and move the research frontier.
{
  const path='README.md';
  let text=fs.readFileSync(path,'utf8');
  const start=text.indexOf('### Latest frozen discovery substrate: structural-aware v0.4 (v0.5 source-consistency revision pending)');
  const end=text.indexOf('### 1. Damage-aware v0.3 passes its benchmark',start);
  if(start<0||end<0) throw new Error('README current-substrate block not found');
  const block=`### Current discovery substrate: source-consistent v0.5\n\nv0.5 reconciles damage-preserving commentary identifiers with normalized corpus IDs, scans all explicit inscription tables on composite objects, and rejects normalized words assembled from separately damaged fragments. It deliberately keeps the v0.4 ranking formulas unchanged so changes reflect extraction rather than rescoring.\n\nThe frozen v0.5 regression gate passes:\n\n> **30/30 structural/source negatives excluded; 13/13 audited structurally complete controls retained.**\n\nThe run begins with 1,285 candidate syllabic occurrences and retains **938**, excluding 347; **672** unique forms remain. v0.4 retained 951 occurrences and 681 forms.\n\nThe strongest structural paradigmatic signals remain stable: prefix \`A\` (6), prefix \`I\` (4), suffix \`JA\` (5), and suffix \`TI\` (3). Source reconciliation reduces weaker suffixes: \`RA\` 3→2, \`TE\` 3→2, and \`QE\`, \`SU\`, and \`WI\` 2→1 each.\n\nExperiment: [\`experiments/source-consistent-v05.md\`](experiments/source-consistent-v05.md)  \nGenerated results: [\`results/source-consistent-v0.5/\`](results/source-consistent-v0.5/)  \nRegression: [\`results/source-consistent-v0.5/REGRESSION.md\`](results/source-consistent-v0.5/REGRESSION.md)\n\nFrozen v0.4 remains reproducible as the preceding historical discovery run; its 26/26 + 11/11 PASS is preserved against the benchmark then registered, including the later-withdrawn \`KU-NI\` retention label.\n\n`;
  text=text.slice(0,start)+block+text.slice(end);

  const nextStart=text.indexOf('## Next work');
  const nextEnd=text.indexOf('## Repository map',nextStart);
  if(nextStart<0||nextEnd<0) throw new Error('README next-work block not found');
  const next=`## Next work\n\nv0.5 is complete and source-consistent against the frozen 30/13 regression gate. The next discovery-stage priority is a **registered comparative hostile audit of the three highest unaudited two-pair suffix candidates in v0.5**, rather than choosing among them after looking at context:\n\n1. \`MI\`: \`JA-RE ~ JA-RE-MI\`, \`I-DA ~ I-DA-MI\`;\n2. \`PA\`: \`KA-KU ~ KA-KU-PA\`, \`A-RI ~ A-RI-PA\`;\n3. \`SA\`: \`QA-*118 ~ QA-*118-SA\`, \`A-JE ~ A-JE-SA\`;\n4. freeze one common promotion rule before source/context inspection;\n5. preserve the \`JA\` functional stop rule and do not assign translations from exact-pair survival alone.\n\nCurrent ranking: [\`results/source-consistent-v0.5/paradigm-ranking.csv\`](results/source-consistent-v0.5/paradigm-ranking.csv).  \nv0.5 experiment: [\`experiments/source-consistent-v05.md\`](experiments/source-consistent-v05.md).\n\n`;
  text=text.slice(0,nextStart)+next+text.slice(nextEnd);

  const evidence='- [`data/v05-regression-backlog.csv`](data/v05-regression-backlog.csv)';
  if(text.includes(evidence)&&!text.includes('- [`data/v05-regression-set.csv`]')) text=text.replace(evidence,evidence+'\n- [`data/v05-regression-set.csv`](data/v05-regression-set.csv)\n- [`data/v05-source-overrides.csv`](data/v05-source-overrides.csv)');
  fs.writeFileSync(path,text);
}

// METHODOLOGY: document v0.5 as the current pre-promotion extraction layer.
{
  const path='METHODOLOGY.md';
  let text=fs.readFileSync(path,'utf8');
  if(!text.includes('## Source-consistent extraction protocol (v0.5)')){
    const marker='### String-decomposition ambiguity';
    const section=`## Source-consistent extraction protocol (v0.5)\n\nv0.5 promotes **source representation consistency** to an explicit pre-ranking requirement while leaving v0.4 scoring unchanged. It adds three generic controls discovered by the QE/SU/WI hostile audit:\n\n1. **combined-ID reconciliation:** inscription identifiers embedded in source headings such as \`HT 79 [+] 83\` are normalized to corpus-style IDs such as \`HT79+83\`;\n2. **multi-table inscription scanning:** every table explicitly structured as inscription data is boundary-scanned, not only the first table on a commentary page;\n3. **segmented-fragment flattening:** several independently broken sign groups in one source row cannot be concatenated into a normalized lexical word.\n\nThe first registered run failed one case (29/30 exclusions, 13/13 retentions) because \`SA-RO-QE[\` occurs in the second inscription table for HT 62 [+] 73. The parser was generalized to all explicit inscription tables; the final frozen gate passes **30/30 exclusions and 13/13 retentions**.\n\nThe corpus effect is 1,285 candidate syllabic occurrences → **938 retained / 347 excluded**, with 672 unique retained forms.\n\n**Rule:** a complete normalized token cannot override a higher-fidelity source that preserves damage, object composition, or independent fragment segmentation. Source reconciliation happens before exact-pair generation.\n\nSee [\`experiments/source-consistent-v05.md\`](experiments/source-consistent-v05.md) and [\`results/source-consistent-v0.5/REGRESSION.md\`](results/source-consistent-v0.5/REGRESSION.md).\n\n`;
    if(!text.includes(marker)) throw new Error('METHODOLOGY insertion marker not found');
    text=text.replace(marker,section+marker);
  }
  fs.writeFileSync(path,text);
}

console.log('Applied v0.5 documentation migration.');
