#!/usr/bin/env node
import fs from 'node:fs';

// README: distinguish historical frozen PASS from current source-consistency status.
{
  const p='README.md';
  let t=fs.readFileSync(p,'utf8');
  t=t.replace('### Current discovery substrate: structural-aware v0.4','### Latest frozen discovery substrate: structural-aware v0.4 (v0.5 source-consistency revision pending)');
  const gate='> **26/26 structural/source negatives excluded; 11/11 secure controls retained.**';
  if (t.includes(gate) && !t.includes('That is the historical result against the then-frozen v0.4 benchmark')) {
    t=t.replace(gate, gate+'\n\nThat is the historical result against the **then-frozen v0.4 benchmark**. The later QE/SU/WI audit found three source-representation misses and showed that one retention control (`KU-NI`) had been mislabeled as secure. The frozen run is not rewritten; those discoveries are registered for v0.5 and mean v0.4 should no longer be treated as source-complete.');
  }
  const s=t.indexOf('## A benchmark correction discovered by the pipeline');
  const e=t.indexOf('## Why raw boundary rank is not enough',s);
  if(s>=0 && e>=0){
    const block=`## A benchmark correction, followed by a correction of the correction\n\nThe `+'`KU-NI`'+` case is now an explicit example of why source hierarchy matters.\n\nDuring v0.3 development, the benchmark treated `+'`KU-NI ~ KU-NI-TE`'+` as damage-created. The normalized HT 79+83 item page then appeared to show a complete `+'`KU-NI`'+`, so the project withdrew that negative label and reported 19/37 Davis-six pairs as damage/insecure failures.\n\nThe later QE/SU/WI comparative audit checked the same token against the separate GORILA-derived **damage-preserving** commentary for HT 79 [+] 83. That source gives:\n\n`+'```text\n]KU-NI[\n```'+`\n\nThe Tier-B promotion of `+'`KU-NI ~ KU-NI-TE`'+` has therefore been withdrawn. This does **not** change the frozen v0.3 regression PASS, because `+'`KU-NI`'+` was not among its six retained-positive controls. It does change the later manual Davis-six audit accounting.\n\nThe current targeted Davis-six source/damage count is:\n\n> **20/37 = 54.1%** of the original apparent exact pairs fail because a relevant boundary is damaged, insecure, or contradicted by a higher-fidelity source representation.\n\nThe sequence of corrections is deliberately preserved. A benchmark that can reverse its own prior promotion when better source evidence appears is behaving as a falsifiable benchmark should.\n\n`;
    t=t.slice(0,s)+block+t.slice(e);
  }
  fs.writeFileSync(p,t);
}

// METHODOLOGY: make frozen v0.4 gate wording historically precise.
{
  const p='METHODOLOGY.md';
  let t=fs.readFileSync(p,'utf8');
  const old='The frozen v0.4 regression gate passes **26/26** structural/source negatives while retaining **11/11** secure controls. See [`experiments/structural-aware-v04.md`](experiments/structural-aware-v04.md).';
  const neu='The frozen v0.4 run passed its **then-registered** gate: 26/26 exclusion controls removed and 11/11 retention controls retained. A later source-consistency audit showed that one retention control (`KU-NI`) had itself been mislabeled as secure and exposed three additional source failures outside the frozen gate. The historical PASS is preserved, but v0.4 is not treated as source-complete; the new controls are registered for v0.5. See [`experiments/structural-aware-v04.md`](experiments/structural-aware-v04.md).';
  if(t.includes(old)) t=t.replace(old,neu);
  fs.writeFileSync(p,t);
}

// v0.3 experiment: add later erratum and correct current aggregate language while preserving frozen run.
{
  const p='experiments/damage-aware-v03.md';
  let t=fs.readFileSync(p,'utf8');
  if(!t.includes('## Later source-hierarchy erratum')){
    const marker='## Research question';
    const add=`## Later source-hierarchy erratum (2026-08-18)\n\nThe v0.3 development narrative below records what the project concluded **at the time of the frozen run**: normalized HT 79+83 tokenization appeared to supply a complete `+'`KU-NI`'+`, so a provisional damage-negative label was removed. A later audit compared that tokenization with the separate GORILA-derived damage-preserving commentary, which gives `+'`]KU-NI[`'+`.\n\nAccordingly, the later Tier-B promotion of `+'`KU-NI ~ KU-NI-TE`'+` is withdrawn and the current Davis-six manual source/damage count is **20/37 (54.1%)**, not 19/37. The frozen v0.3 regression result remains **19/19 registered negatives excluded and 6/6 registered positives retained**, because `+'`KU-NI`'+` was not one of those six positive controls. This is a later benchmark/source correction, not a retroactive change to the experiment.\n\n`;
    t=t.replace(marker,add+marker);
  }
  t=t.replace('After correcting one erroneous human label discovered by the experiment itself, the final regression gate contains:','At the time the regression was frozen, after removing one then-believed erroneous human label, the gate contained:');
  const q='## Quantified damage correction';
  const lim='## Limitations';
  const s=t.indexOf(q),e=t.indexOf(lim,s);
  if(s>=0&&e>=0){
    const block=`## Quantified damage correction\n\nAt the time of the frozen v0.3 write-up, the project reported **19/37 = 51.4%** after promoting `+'`KU-NI`'+` from normalized item tokenization. The later source-hierarchy audit showed the damage-preserving reading `+'`]KU-NI[`'+` and withdrew that promotion.\n\nThe **current manual Davis-six accounting is 20/37 = 54.1%** damage/source-insecure failures. The v0.3 regression artifact itself remains unchanged and still passes the gate that was actually registered and run.\n\n`;
    t=t.slice(0,s)+block+t.slice(e);
  }
  t=t.replace('- `-TE`: moderate distributional signal with three secure formal comparisons after correcting `KU-NI`;','- `-TE`: the frozen v0.3 output retained three formal strings, but later source audit invalidated `KU-NI` as a secure base; current manual exact-pair evidence is narrower;');
  fs.writeFileSync(p,t);
}

// v0.4 experiment: add post-run erratum without mutating frozen outputs.
{
  const p='experiments/structural-aware-v04.md';
  let t=fs.readFileSync(p,'utf8');
  if(!t.includes('## Post-v0.4 source-consistency erratum')){
    const marker='## Research question';
    const add=`## Post-v0.4 source-consistency erratum (2026-08-18)\n\nv0.4 **passed the regression gate that was frozen before its ranking**, and that historical PASS is preserved. Later hostile audit of the tied `+'`QE`'+`, `+'`SU`'+`, and `+'`WI`'+` candidates nevertheless found source representations not covered by that gate:\n\n- HT 73 preserves `+'`SA-RO-QE[`'+`, not a securely final `+'`SA-RO-QE`'+`;\n- KN Zb 35 preserves separated damaged segments `+'`]JA[ ]DI-[ ]WI[`'+`, not one complete `+'`JA-DI-WI`'+` word;\n- the damage-preserving HT 79 [+] 83 commentary gives `+'`]KU-NI[`'+`, contradicting normalized tokenization that had made `+'`KU-NI`'+` a v0.4 retention control.\n\nThus the statement “26/26 negatives excluded; 11/11 retention controls retained” remains true **of the frozen benchmark/run**, but one of those retention labels is no longer considered epigraphically correct and the benchmark was incomplete. The new failures are frozen forward in `+'`data/v05-regression-backlog.csv`'+`. v0.4 is therefore the latest historical discovery run, not the final source-consistent extractor.\n\n`;
    t=t.replace(marker,add+marker);
  }
  t=t.replace('- secure `JA`, `NE`, `KU-NI`, and `ME` formal controls to detect over-filtering.','- then-adjudicated `JA`, `NE`, `KU-NI`, and `ME` retention controls to detect over-filtering (the `KU-NI` label was later withdrawn; see erratum above).');
  t=t.replace('The retained controls include the Tier-A `A-`, `I-`, `TI`, `JA`, and `NE` relationships plus the corrected `KU-NI ~ KU-NI-TE` and surviving `A-RA-TU ~ A-RA-TU-ME` formal candidate.','The frozen run retained all then-registered positive controls. Later audit withdrew the `KU-NI ~ KU-NI-TE` control because the damage-preserving source gives `]KU-NI[`; the other frozen results remain historical outputs.');
  fs.writeFileSync(p,t);
}

console.log('Applied source-hierarchy errata to project documentation.');
