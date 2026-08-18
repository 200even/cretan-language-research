#!/usr/bin/env node
import fs from 'node:fs';

const benchmarkPath = 'data/morphology-benchmark.csv';
const queuePath = 'data/morphology-audit-queue.csv';

const replaceByPrefix = (lines, prefix, replacement) => {
  const i = lines.findIndex(line => line.startsWith(prefix));
  if (i < 0) throw new Error(`Missing row ${prefix}`);
  lines[i] = replacement;
};

// Benchmark: preserve the two original Tier-A rows and append the five newly adjudicated v0.3 candidates.
{
  const text = fs.readFileSync(benchmarkPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const rows = [
    'MB-JA-003,A-SE,A-SE-JA,suffix,JA,"HT81; HT93a; HT132; ZA Zb3",HT115a,"Haghia Triada; Zakros",Haghia Triada,multiple,"HT Scribe 8",yes,none,"administrative; possible place/designation role",B,candidate,"Multiple complete base attestations plus complete administrative JA form; short base and lexical function prevent Tier-A promotion","audits/JA.md; HT81; HT93; HT115; HT132 upstream GORILA-derived records"',
    'MB-JA-004,*306-TU,*306-TU-JA,suffix,JA,"HT9a; HT9b; HT119; HT122a",HT115b,Haghia Triada,Haghia Triada,multiple,"HT Scribe 8",yes,none,"personnel/account; probable designation/onomastic concentration",B,reclassified,"Repeated complete exact base and complete JA form; context suggests derivational/onomastic rather than generic inflectional morphology","audits/JA.md; HT9; HT115; HT119 upstream GORILA-derived records"',
    'MB-JA-005,A-MA,A-MA-JA,suffix,JA,"MA1b; HS Zg1",KH14,"Malia; Hagios Stefanos",Khania,unknown,"KH Scribe 1",yes,none,"cross-site/support/chronology mismatch",C,comparison-only,"Both strings are complete but two-sign base and documentary mismatch leave common lexical identity unestablished","audits/JA.md; MA1b; KH14 upstream records"',
    'MB-JA-006,JA-SA,JA-SA-JA,suffix,JA,"IOZa12; SAMWa1",KNZg55,"Iouktas; Samothrace",Knossos,unknown,unknown,no,"editorial/cross-face continuation rather than physical damage",not-comparable,rejected,rejected,"IO Za12 explicitly continues JA-SA-|SA-RA-ME across faces; SAM Wa1 belongs to the same seal/formula family; no secure free JA-SA base is established","audits/JA.md; IOZa12; SAMWa1; KNZg55 upstream commentary"',
    'MB-JA-007,PU2-RE,PU2-RE-JA,suffix,JA,PKZa28,"ZA Zb34; PKZa16",Palaikastro,"Zakros; Palaikastro",unknown,unknown,no,"authoritative readings preserve insecure left boundary; exploratory source coverage gap",not-comparable,rejected,rejected,"2022 editio princeps reads PK Za28 as ]-PU2-RE and cites ZA Zb34 as ]PU2-RE-JA; normalized corpus manufactured complete words","audits/JA.md; Del Freo-Zurbach-Knappett 2022; v0.3 source-coverage failure"',
  ];
  for (const row of rows) {
    const id = row.split(',')[0];
    const existing = lines.findIndex(line => line.startsWith(`${id},`));
    if (existing >= 0) lines[existing] = row;
    else lines.splice(3, 0, row);
  }
  fs.writeFileSync(benchmarkPath, lines.join('\n'));
}

// Audit queue: resolve v0.3 candidates and explicitly retire the stale v0.2 A-RI row.
{
  const text = fs.readFileSync(queuePath, 'utf8');
  const lines = text.split(/\r?\n/);
  replaceByPrefix(lines, 'AQ-JA-003,', 'AQ-JA-003,7,suffix,JA,2,4.977,"A-SE ~ A-SE-JA",Tier-B-candidate,"Does the multiple-base administrative evidence establish common lexical identity?","survives-formal-audit-tier-b"');
  replaceByPrefix(lines, 'AQ-JA-004,', 'AQ-JA-004,7,suffix,JA,2,4.977,"*306-TU ~ *306-TU-JA",Tier-B-reclassified,"Generic suffix or onomastic/derivational formation?","survives-formal-audit-onomastic-risk"');
  replaceByPrefix(lines, 'AQ-JA-005,', 'AQ-JA-005,7,suffix,JA,2,4.977,"A-MA ~ A-MA-JA",Tier-C-comparison,"Do cross-site/support attestations establish one lexeme?","comparison-only-lexical-identity-unproved"');
  replaceByPrefix(lines, 'AQ-JA-006,', 'AQ-JA-006,7,suffix,JA,2,4.977,"JA-SA ~ JA-SA-JA",rejected-control,"Is JA-SA actually an independently segmented free word?","rejected-cross-face-continuation-formula"');
  replaceByPrefix(lines, 'AQ-JA-007,', 'AQ-JA-007,7,suffix,JA,2,4.977,"A-RI ~ A-RI-JA",obsolete-v0.2-control,"Why did this older candidate disappear under v0.3?","v0.3-excluded-insecure-variant"');
  replaceByPrefix(lines, 'AQ-JA-008,', 'AQ-JA-008,7,suffix,JA,2,4.977,"PU2-RE ~ PU2-RE-JA",rejected-control,"Do authoritative editions preserve complete left boundaries?","rejected-authoritative-fragment-source-coverage"');
  fs.writeFileSync(queuePath, lines.join('\n'));
}

console.log('Applied final JA audit adjudications to benchmark and queue.');
