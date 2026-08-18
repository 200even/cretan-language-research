#!/usr/bin/env node
import fs from 'node:fs';

function appendUnique(path, id, line) {
  let text = fs.readFileSync(path, 'utf8').replace(/\s+$/, '');
  if (!text.includes(`${id},`)) text += `\n${line}`;
  fs.writeFileSync(path, text + '\n');
}

appendUnique('data/morphology-benchmark.csv','MB-IDA-001','MB-IDA-001,I-DA,I-DA-A,suffix,A,"PKZa18; ZA24",KOZa1,"Palaikastro; Zakros",Kophinas,unknown,unknown,yes,none,"shared libation-formula system; exact local slot not identical",B,candidate,"Complete I-DA-A occurs in the libation formula on KOZa1; common stem identity with complete ritual I-DA is plausible, but ending function and exact slot equivalence remain unresolved","audits/I-DA-grid.md; PKZa18; ZA24; KOZa1"');
appendUnique('data/morphology-benchmark.csv','MB-IDA-002','MB-IDA-002,I-DA,I-DA-DA,suffix,DA,"PKZa18; ZA24",CRZg4,"Palaikastro; Zakros",Crete,unknown,unknown,yes,none,"complete reel-seal form versus ritual/admin base",C,comparison-only,"I-DA-DA is securely read on CRZg4, but support and documentary context do not independently establish the same lexical item","audits/I-DA-grid.md; PKZa18; ZA24; CRZg4"');
appendUnique('data/morphology-audit-queue.csv','AQ-IDA-001','AQ-IDA-001,1,suffix,A,,,"I-DA ~ I-DA-A",Tier-B-candidate,"Does I-DA-A reproduce the ritual stem in a comparable formulaic environment?",validated-tier-b');
appendUnique('data/morphology-audit-queue.csv','AQ-IDA-002','AQ-IDA-002,3,suffix,DA,,,"I-DA ~ I-DA-DA",comparison-only,"Does reel-seal I-DA-DA have independent evidence for common lexical identity?",tier-c-comparison');
