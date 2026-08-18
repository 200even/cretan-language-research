#!/usr/bin/env node
import fs from 'node:fs';

function appendUnique(path, id, line) {
  let text = fs.readFileSync(path, 'utf8').replace(/\s+$/, '');
  if (!text.includes(`${id},`)) text += `\n${line}`;
  fs.writeFileSync(path, text + '\n');
}

const benchmarkRows = [
  ['MB-MI-001','MB-MI-001,JA-RE,JA-RE-MI,suffix,MI,"ARKH1b normalized; ARKH1 commentary",HT87,Arkhalchori,Haghia Triada,ARKH Scribe 1,HT Scribe 9,no,"normalized base conflicts with ]PA-RE in damage-preserving source",source-reading-conflict,not-comparable,rejected,"Normalized ARKH1b JA-RE changes the first sign and drops the insecure left boundary preserved as ]PA-RE; exact MI pair invalid","audits/MI.md; ARKH1 damage-preserving commentary; HT87 commentary"'],
  ['MB-MI-002','MB-MI-002,I-DA,I-DA-MI,suffix,MI,"PKZa18; ZA24",SYZa1,"Palaikastro; Zakros",Syme,unknown,unknown,yes,none,"cross-site libation-formula slot",A,positive,"PKZa18 and SYZa1 place complete I-DA / I-DA-MI between dividers in closely comparable ritual formula positions before JA- material","audits/MI.md; PKZa18; SYZa1; ZA24"'],
  ['MB-PA-001','MB-PA-001,KA-KU,KA-KU-PA,suffix,PA,HT62+73,"HT16; HTWc3015; HTWc3016",Haghia Triada,Haghia Triada,HT Scribe 23,"HT Scribe 10; roundel scribes",yes,none,"same-site linked administrative cluster",B,candidate,"Complete base and repeatedly attested extended form support common lexical identity; role difference leaves function unresolved","audits/PA.md; HT62; HT16; HTWc3015; HTWc3016"'],
  ['MB-PA-002','MB-PA-002,A-RI,A-RI-PA,suffix,PA,PH6,PE2,Phaistos,Petras,unknown,unknown,yes,none,"word-only MM II list versus numerical/fractional account",C,comparison-only,"Exact short-string extension survives but site/document/chronology mismatch leaves common lexical identity unproved","audits/PA.md; PH6; PE2"'],
  ['MB-SA-001','MB-SA-001,QA-*118,QA-*118-SA,suffix,SA,KH10,HT70,Khania,Haghia Triada,KH Scribe 5,unknown,no,"variant preserved as ]QA-*118-SA",source-boundary-conflict,not-comparable,rejected,"Damage-preserving HT70 transcription shows insecure left boundary omitted by v0.5 normalized tokenization","audits/SA.md; KH10; HT70"'],
  ['MB-SA-002','MB-SA-002,A-JE,A-JE-SA,suffix,SA,THEZb7,IOZa<1>,Thera,Iouktas,unknown,unknown,yes,"extended inscription lost and not seen by GORILA","isolated vessel inscriptions; source-limited",C,comparison-only,"Formal extension is transmitted but A-JE-SA depends on an old reading of a now-lost painted inscription and cannot be independently rechecked","audits/SA.md; THEZb7; IOZa<1>"'],
];
for (const [id,line] of benchmarkRows) appendUnique('data/morphology-benchmark.csv', id, line);

const queueRows = [
  ['AQ-MI-001','AQ-MI-001,2,suffix,MI,,,"JA-RE ~ JA-RE-MI",rejected-control,"Does normalized JA-RE survive damage-preserving source comparison?",rejected-source-reading-conflict'],
  ['AQ-MI-002','AQ-MI-002,1,suffix,MI,,,"I-DA ~ I-DA-MI",Tier-A-positive,"Does MI survive in the same libation-formula slot across sites?",validated-tier-a'],
  ['AQ-PA-001','AQ-PA-001,2,suffix,PA,,,"KA-KU ~ KA-KU-PA",Tier-B-candidate,"Does repeated KA-KU-PA reflect common-stem derivation or a distinct administrative designation?",validated-tier-b'],
  ['AQ-PA-002','AQ-PA-002,3,suffix,PA,,,"A-RI ~ A-RI-PA",comparison-only,"Does cross-site A-RI extension have independent lexical/contextual support?",tier-c-comparison'],
  ['AQ-SA-001','AQ-SA-001,2,suffix,SA,,,"QA-*118 ~ QA-*118-SA",rejected-control,"Is the extended form actually complete?",rejected-damaged-variant'],
  ['AQ-SA-002','AQ-SA-002,3,suffix,SA,,,"A-JE ~ A-JE-SA",comparison-only,"Can the lost IOZa<1> reading support more than formal comparison?",tier-c-source-limited'],
];
for (const [id,line] of queueRows) appendUnique('data/morphology-audit-queue.csv', id, line);

let readme = fs.readFileSync('README.md','utf8');
readme = readme.replace('### Current discovery substrate: source-consistent v0.5','### Latest frozen discovery substrate: source-consistent v0.5 (post-v0.5 audit errata registered)');
const headlineNeedle = 'The strongest structural paradigmatic signals remain stable: prefix `A` (6), prefix `I` (4), suffix `JA` (5), and suffix `TI` (3). Source reconciliation reduces weaker suffixes: `RA` 3→2, `TE` 3→2, and `QE`, `SU`, and `WI` 2→1 each.';
if (readme.includes(headlineNeedle) && !readme.includes('The later MI/PA/SA hostile audit exposed two additional source-representation misses')) {
  readme = readme.replace(headlineNeedle, headlineNeedle + '\n\nThe later MI/PA/SA hostile audit exposed two additional source-representation misses in retained v0.5 candidates: normalized ARKH1b `JA-RE` conflicts with damage-preserving `]PA-RE`, and HT70 preserves `]QA-*118-SA`. These do not rewrite the frozen v0.5 run; they are registered in `data/v06-regression-backlog.csv` and mean v0.5 remains a discovery substrate rather than a source-complete edition.');
}
const nextBlock = `## Next work\n\nThe preregistered comparative audit of \`MI\`, \`PA\`, and \`SA\` is complete. **None meets the two-family productivity rule.**\n\n- \`MI\`: **1 Tier A + 1 rejected**. \`I-DA ~ I-DA-MI\` is a strong cross-site libation-formula relationship; the apparent \`JA-RE\` base collapses against damage-preserving \`]PA-RE\`.\n- \`PA\`: **1 Tier B + 1 Tier C**. \`KA-KU ~ KA-KU-PA\` survives as a credible administrative formal family.\n- \`SA\`: **1 Tier C + 1 rejected**. \`QA-*118-SA\` is actually left-fragmentary; \`A-JE ~ A-JE-SA\` remains source-limited.\n\nThe project now stops descending the suffix ranking and moves to **multi-ending stem grids**. The first preregistered anchor is \`I-DA\`, because the completed MI audit establishes \`I-DA-MI\` at Tier A while frozen v0.5 also contains \`I-DA-A\` and \`I-DA-DA\`.\n\nImmediate sequence:\n\n1. hostile-audit the \`I-DA-A\` and \`I-DA-DA\` cells;\n2. build a corpus-wide stem × final-ending matrix from v0.5 exact pairs, masking known source conflicts and preserving manual tiers;\n3. search for a second independent stem sharing at least two endings before calling anything a paradigm grid;\n4. only after a formal grid survives, test contextual/grammatical function.\n\nRegistered grid protocol: [\`experiments/multi-ending-grid-v01.md\`](experiments/multi-ending-grid-v01.md).  \nComparative audit: [\`results/mi-pa-sa-comparative-audit.md\`](results/mi-pa-sa-comparative-audit.md).  \nForward source controls: [\`data/v06-regression-backlog.csv\`](data/v06-regression-backlog.csv).\n\n`;
readme = readme.replace(/## Next work\n[\s\S]*?(?=## Repository map)/, nextBlock);
fs.writeFileSync('README.md', readme);

let method = fs.readFileSync('METHODOLOGY.md','utf8');
const marker = '### String-decomposition ambiguity';
const errata = `### Post-v0.5 hostile-audit source controls\n\nThe MI/PA/SA comparative audit exposed two further cases where normalized retained tokens disagree with the damage-preserving source:\n\n- ARKH1b normalized \`JA-RE\` versus ARKH 1 commentary \`]PA-RE\`;\n- HT70 normalized \`QA-*118-SA\` versus commentary \`]QA-*118-SA\`.\n\nThe first is stronger than a lost bracket: the normalized representation changes the first sign as well as the boundary state. These cases are registered in \`data/v06-regression-backlog.csv\`. Frozen v0.5 output remains historical; future extraction must treat source-level sign-reading divergence and fragment state as jointly authoritative over normalized word tokens.\n\n`;
if (!method.includes('### Post-v0.5 hostile-audit source controls')) method = method.replace(marker, errata + marker);
fs.writeFileSync('METHODOLOGY.md', method);

let v05 = fs.readFileSync('experiments/source-consistent-v05.md','utf8');
if (!v05.includes('## Post-v0.5 hostile-audit erratum')) {
  v05 += `\n## Post-v0.5 hostile-audit erratum\n\nA later preregistered MI/PA/SA audit found two additional source-representation misses outside the frozen v0.5 gate: ARKH1b normalized \`JA-RE\` conflicts with damage-preserving \`]PA-RE\`, and HT70 preserves \`]QA-*118-SA\`. The v0.5 PASS remains the historical result against its frozen regression set. The new failures are frozen forward in \`data/v06-regression-backlog.csv\`; v0.5 is not claimed to be a source-complete edition.\n`;
}
fs.writeFileSync('experiments/source-consistent-v05.md', v05);
