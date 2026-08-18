#!/usr/bin/env node
import fs from 'node:fs';

const esc = v => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"','""')}"` : s;
};
const appendCsvRow = (text, row) => text.replace(/\s*$/, '\n') + row.map(esc).join(',') + '\n';

// 1) Correct TE audit after resolving the HT79+83 source conflict.
{
  const p = 'audits/TE.md';
  const t = `# Audit: final \`-TE\`\n\n**Status:** completed, with a later source-hierarchy correction after the QE/SU/WI comparative screen.  \n**Blind v0.2 rank:** suffix #4 / 116.  \n**Davis 2026:** independently identifies \`-TE\` as one of four likely Linear A suffixes.  \n**Current exact-pair result:** **0 Tier A + 1 Tier B + 1 Tier C + 4 rejected/source-insecure** among the six frozen automatic pairs.\n\n## Why this file was corrected again\n\nThe project previously promoted \`KU-NI ~ KU-NI-TE\` after the normalized HT79+83 item page parsed \`KU-NI\` as a complete word. The later comparative audit checked that token against the separate GORILA-derived damage-preserving commentary for HT79 [+] 83, which gives:\n\n\`\`\`text\n]KU-NI[\n\`\`\`\n\nUnder the project's source hierarchy, damage-preserving inscriptional boundary evidence outranks normalized word tokenization. The earlier Tier-B promotion is therefore withdrawn. This correction does **not** alter the frozen v0.2 ranking or the v0.3 regression PASS: \`KU-NI\` was never one of v0.3's six retained-positive regression controls.\n\n## Pair-by-pair result\n\n| pair | current adjudication |\n|---|---|\n| \`DU-RI ~ DU-RI-TE\` | rejected: insecure boundaries |\n| \`SI-RU ~ SI-RU-TE\` | **Tier B / reclassified**; complete forms but administrative vs ritual-formula mismatch |\n| \`KU-NI ~ KU-NI-TE\` | **rejected**: proposed base source-conflicted/insecure (\`]KU-NI[\`) |\n| \`I-JA ~ I-JA-TE\` | **Tier C / comparison-only** |\n| \`A-DI-KI-TE ~ A-DI-KI-TE-TE\` | rejected as mechanical exact pair; broader literature-based morphology question remains separate |\n| \`A-TA-NA ~ A-TA-NA-TE\` | rejected: damaged base |\n\nThe exact-pair evidence is therefore narrower than previously reported. This does **not** refute Davis's distributional identification of final \`TE\`; boundary distribution and clean whole-word paradigms remain separate evidence dimensions.\n\n## External lead\n\n\`AU-RE ~ AU-RE-TE\` remains a literature-derived comparison outside the frozen automatic six and requires its own epigraphic audit before promotion.\n\n## Methodological consequence\n\n> When normalized tokenization conflicts with a damage-preserving inscription transcription, boundary security is determined by the damage-preserving layer.\n\nThe \`KU-NI\` conflict is registered in \`data/v05-regression-backlog.csv\` rather than rewriting frozen v0.4 outputs.\n\n## Sources / provenance\n\n- HT79 [+] 83 damage-preserving GORILA-derived commentary: \`]KU-NI[\`;\n- normalized HT79+83 item page, retained explicitly as the conflicting representation;\n- KH92 for complete \`KU-NI-TE\`;\n- Valério and Thomas for broader published morphology discussions;\n- pinned exploratory corpus commit \`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a\`.\n\n## Non-claim\n\nNo function or translation is assigned to \`TE\`.\n`;
  fs.writeFileSync(p, t);
}

// 2) Correct Davis-six aggregate accounting.
fs.writeFileSync('data/davis-six-audit-summary.csv', `element,side,blind_v0_2_rank,automatic_pairs,secure_tier_a,secure_tier_b,secure_comparison_or_reclassified,damage_or_insecure_boundary_failures,other_failures_or_unverified,notes\nA,prefix,1,8,2,2,0,3,1,"Independent same-tablet TA-NA-TE ~ A-TA-NA-TE adds a further Tier-A replication outside the eight automatic pairs"\nI,prefix,4,8,2,1,1,4,0,"TA-JA ~ I-TA-JA reclassified for strong contextual/lexical mismatch"\nRO,suffix,1,4,0,1,1,2,0,"RO remains strongly edge-enriched despite weak exact-pair survival"\nTE,suffix,4,6,0,1,1,4,0,"KU-NI ~ KU-NI-TE withdrawn after damage-preserving HT79[+]83 commentary showed ]KU-NI[; SI-RU remains Tier B"\nRE,suffix,7,6,0,1,0,5,0,"Only secure automatic pair is strongly onomastic/derivational"\nTI,suffix,11,5,1,2,0,2,0,"DA-KU-SE-NE-TI retained with explicit alternative-segmentation caveat"\nTOTAL,,,37,5,8,3,20,1,"20/37 = 54.1% of automatic pairs fail because a relevant boundary is damaged/insecure or source-conflicted; current accounting after HT79[+]83 source-hierarchy correction"\n`);

// 3) Rewrite the Davis audit synthesis without touching the frozen 3/6 result.
{
  const p = 'results/davis-six-audit-synthesis.md';
  const t = `# Davis 2026 affixes: audit synthesis\n\n**Status:** completed first-pass audit with later source-hierarchy corrections.  \n**Davis target set:** prefixes \`A-\`, \`I-\`; suffixes \`-RE\`, \`-RO\`, \`-TE\`, \`-TI\`.  \n**Frozen blind comparison:** **3/6, partial conceptual replication.** Later audits do not change that result.\n\n## Frozen ranking result\n\n| element | frozen v0.2 rank /116 |\n|---|---:|\n| \`A\` prefix | **1** |\n| \`I\` prefix | **4** |\n| \`RO\` suffix | **1** |\n| \`TE\` suffix | **4** |\n| \`RE\` suffix | **7** |\n| \`TI\` suffix | **11** |\n\nThe preregistered top-2-prefix/top-4-suffix overlap remains **3/6**. The later Davis-universe-matched sensitivity result remains separately **4/6**.\n\n## Current exact-pair audit accounting\n\n| element | automatic pairs | Tier A | Tier B | comparison/reclassified | damage/source-insecure | other |\n|---|---:|---:|---:|---:|---:|---:|\n| \`A-\` | 8 | 2 | 2 | 0 | 3 | 1 |\n| \`I-\` | 8 | 2 | 1 | 1 | 4 | 0 |\n| \`-RO\` | 4 | 0 | 1 | 1 | 2 | 0 |\n| \`-TE\` | 6 | 0 | 1 | 1 | 4 | 0 |\n| \`-RE\` | 6 | 0 | 1 | 0 | 5 | 0 |\n| \`-TI\` | 5 | 1 | 2 | 0 | 2 | 0 |\n| **Total** | **37** | **5** | **8** | **3** | **20** | **1** |\n\nThus **20/37 = 54.1%** of the targeted automatic pairs currently fail because a relevant word boundary is damaged/insecure or contradicted by a higher-fidelity source representation.\n\n## Why the count changed back from 19 to 20\n\nAn earlier v0.3-era correction promoted \`KU-NI ~ KU-NI-TE\` because the normalized HT79+83 item page showed a complete \`KU-NI\`. The later QE/SU/WI screen compared that token with the separate damage-preserving GORILA-derived commentary for the same tablet, which gives \`]KU-NI[\`. The project therefore reverses the earlier promotion.\n\nThis is not a change to the frozen v0.3 regression outcome. The regression's six positive controls do not include \`KU-NI\`; v0.3 still passed its registered 19-negative/6-positive gate as run. The new source conflict instead becomes a v0.5 regression control.\n\n## Current profiles\n\n- **A-** remains the strongest Davis-prefix convergence, with multiple Tier-A/B families.\n- **I-** also has strong paradigmatic evidence despite weaker raw distributional rank.\n- **RO** remains globally edge-enriched but locally sparse in clean exact paradigms.\n- **TE** remains an independent Davis distributional candidate, but its six automatic exact pairs now yield only one Tier-B family (\`SI-RU ~ SI-RU-TE\`) plus one Tier-C comparison.\n- **RE** remains largely onomastic/derivational in its surviving evidence.\n- **TI** retains unusually good exact-pair survival, including the Tier-A \`DA-KU-SE-NE ~ DA-KU-SE-NE-TI\` family with its segmentation caveat.\n\n## Methodological conclusion\n\nDistribution, exact paradigms, lexical class, context, and source integrity must remain separate evidence dimensions. Normalized corpus tokenization is an index layer, not final epigraphic truth.\n\n## Non-claim\n\nNothing here translates a Linear A affix or identifies the Minoan language.\n`;
  fs.writeFileSync(p, t);
}

// 4) Update benchmark: correct MB-TE-003 and append the six new comparative controls.
{
  const p = 'data/morphology-benchmark.csv';
  let text = fs.readFileSync(p, 'utf8');
  let lines = text.trimEnd().split(/\r?\n/);
  const te = ['MB-TE-003','KU-NI','KU-NI-TE','suffix','TE','HT79+83','KH92','Haghia Triada','Chania','unknown','unknown','no','source conflict: normalized item parses KU-NI complete; damage-preserving commentary preserves ]KU-NI[','not-comparable','rejected','rejected','Damage-preserving source leaves both boundaries of proposed base insecure; normalized tokenization cannot establish a whole-word base','audits/TE.md; HT79[+]83 commentary; v05-regression-backlog'];
  const idx = lines.findIndex(l => l.startsWith('MB-TE-003,'));
  if (idx < 0) throw new Error('MB-TE-003 missing');
  lines[idx] = te.map(esc).join(',');
  const newRows = [
    ['MB-QE-001','KA-PA','KA-PA-QE','suffix','QE','HT6a','HT6a','Haghia Triada','Haghia Triada','HT Scribe 16','HT Scribe 16','yes','none','same-tablet administrative frame/entry contrast','A','positive','Complete exact same-tablet extension in one scribal production; function unknown','audits/QE.md; HT6 commentary'],
    ['MB-QE-002','SA-RO','SA-RO-QE','suffix','QE','multiple HT','HT73','Haghia Triada','Haghia Triada','multiple','HT Scribe 23','no','variant preserved as SA-RO-QE[','not-comparable','rejected','rejected','Right boundary of proposed extended form is insecure in damage-preserving commentary','audits/QE.md; HT62[+]73 commentary'],
    ['MB-SU-001','KU-NI','KU-NI-SU','suffix','SU','HT79+83','HT10; HT86; HT95','Haghia Triada','Haghia Triada','unknown','multiple','no','base source-conflicted; damage-preserving commentary gives ]KU-NI[','not-comparable','rejected','rejected','Repeated KU-NI-SU cannot repair insecure boundaries of proposed base','audits/SU.md; HT79 commentary'],
    ['MB-SU-002','A-RI','A-RI-SU','suffix','SU','PH6','HT118','Phaistos','Haghia Triada','unknown','HT Scribe 3','yes','none','MM II word-only list versus LM IB quantified account','C','comparison-only','Complete strings but site/chronology/document mismatch leaves common lexical identity unproved','audits/SU.md; PH6; HT118'],
    ['MB-WI-001','JA-DI','JA-DI-WI','suffix','WI','PHWc39','KNZb35','Phaistos','Knossos','unknown','unknown','no','variant represented as ]JA[ ]DI-[ ]WI[','not-comparable','rejected','rejected','Normalized corpus flattened separated damaged segments into one syllabic-looking word','audits/WI.md; PHWc39; KNZb35'],
    ['MB-WI-002','PA3-NI','PA3-NI-WI','suffix','WI','HT85a; HT102','SYZa4','Haghia Triada','Syme','HT Scribes 9; 5','unknown','yes','none','administrative probable designation/toponym versus ritual formula slot','B','reclassified','Complete repeated base and complete ritual extension support possible onomastic/relational/derivational morphology; generic inflection unproved','audits/WI.md; HT85; HT102; SYZa4; Thomas 2020']
  ];
  for (const r of newRows) if (!lines.some(l => l.startsWith(`${r[0]},`))) lines.push(r.map(esc).join(','));
  fs.writeFileSync(p, lines.join('\n') + '\n');
}

// 5) Update audit queue: correct TE row and append six completed audit rows.
{
  const p = 'data/morphology-audit-queue.csv';
  let text = fs.readFileSync(p, 'utf8');
  let lines = text.trimEnd().split(/\r?\n/);
  const teIdx = lines.findIndex(l => l.startsWith('AQ-TE-003,'));
  if (teIdx >= 0) lines[teIdx] = ['AQ-TE-003',2,'suffix','TE',4,4.869,'KU-NI ~ KU-NI-TE','rejected-control','Are both word boundaries secure across source layers?','rejected-source-conflicted-base'].map(esc).join(',');
  const rows = [
    ['AQ-QE-001',5,'suffix','QE',null,null,'KA-PA ~ KA-PA-QE','Tier-A-positive','Same lexeme with final QE under same-tablet control?','completed-tier-a'],
    ['AQ-QE-002',5,'suffix','QE',null,null,'SA-RO ~ SA-RO-QE','rejected-control','Is variant right boundary secure?','rejected-damaged-variant'],
    ['AQ-SU-001',6,'suffix','SU',null,null,'KU-NI ~ KU-NI-SU','rejected-control','Is normalized KU-NI complete in damage-preserving source?','rejected-source-conflicted-base'],
    ['AQ-SU-002',6,'suffix','SU',null,null,'A-RI ~ A-RI-SU','Tier-C-comparison','Common lexeme across site/chronology/register?','completed-comparison-only'],
    ['AQ-WI-001',7,'suffix','WI',null,null,'JA-DI ~ JA-DI-WI','rejected-control','Is variant one securely segmented word?','rejected-segmented-fragments'],
    ['AQ-WI-002',7,'suffix','WI',null,null,'PA3-NI ~ PA3-NI-WI','Tier-B-candidate','Onomastic/relational morphology or lexical coincidence across admin/ritual?','completed-tier-b-reclassified']
  ];
  for (const r of rows) if (!lines.some(l => l.startsWith(`${r[0]},`))) lines.push(r.map(esc).join(','));
  fs.writeFileSync(p, lines.join('\n') + '\n');
}

// 6) Extend cross-suffix comparison.
fs.writeFileSync('data/suffix-audit-comparison.csv', `suffix,v03_secure_exact_pairs,v04_structural_exact_pairs,v04_warned_pairs,manual_tier_a,manual_tier_b,manual_other_or_reclassified,manual_rejected,productive_morphology_status,interpretation\nJA,7,5,1,2,2,1,2,supported,"v0.4 automatically removes both manually rejected structural/source false pairs; multiple independent Tier-A/B families remain; function unknown"\nME,4,1,0,0,1,0,3,not-established,"v0.4 automatically reproduces the manual structural audit: only A-RA-TU ~ A-RA-TU-ME survives"\nNE,2,2,1,1,0,1,2,not-established,"One exceptionally strong *21F-TU family survives; PA-RA remains structurally secure but is flagged onomastic; two other bases are damaged"\nRA,3,3,0,0,1,1,1,not-established,"SA-RA ~ SA-RA-RA superseded by stronger same-tablet SA-RA2 comparison; MI-DA remains Tier-B possible onomastic/derivational morphology"\nQE,,2,0,1,0,0,1,not-established,"KA-PA ~ KA-PA-QE is Tier A same-tablet morphology; SA-RO-QE is actually right-fragmentary"\nSU,,2,0,0,0,1,1,not-established,"KU-NI base is source-conflicted/insecure; A-RI ~ A-RI-SU remains comparison-only"\nWI,,2,0,0,1,0,1,not-established,"JA-DI-WI is segmented damaged material; PA3-NI ~ PA3-NI-WI remains Tier-B possible relational/onomastic morphology"\n`);

// 7) Methodology: replace stale KU-NI corollary and add source-consistency rules.
{
  const p = 'METHODOLOGY.md';
  let text = fs.readFileSync(p, 'utf8');
  const old = 'An important corollary is that the benchmark can be wrong. When a regression test contradicts a human label, the underlying inscription is rechecked. The `KU-NI ~ KU-NI-TE` case demonstrated this: direct inspection of HT 79+83 showed a complete `KU-NI` occurrence, so the negative benchmark label was corrected rather than forcing the extractor to reproduce it.';
  const neu = 'An important corollary is that the benchmark can be wrong in either direction. The `KU-NI` history demonstrates this twice: normalized HT 79+83 tokenization initially caused the project to promote `KU-NI ~ KU-NI-TE`, but a later comparison against the separate GORILA-derived damage-preserving commentary exposed `]KU-NI[`. The promotion was therefore withdrawn. Frozen experiment outputs remain historical facts; newly discovered source conflicts are registered as forward regression controls rather than silently rewriting past runs.';
  if (text.includes(old)) text = text.replace(old, neu);
  if (!text.includes('### Source-representation precedence')) {
    const marker = '### String-decomposition ambiguity';
    const add = `### Source-representation precedence\n\nNormalized item pages and flattened word indexes are discovery aids, not final authorities on physical word boundaries. When they conflict with an inscription-oriented transcription that preserves brackets, continuation marks, or separated fragments, the **damage-preserving representation controls boundary security**.\n\nThe QE/SU/WI screen exposed three v0.4 misses:\n\n- HT 73 \`SA-RO-QE[\`: lost right-boundary damage;\n- KN Zb 35 \`]JA[ ]DI-[ ]WI[\`: separated damaged segments flattened into one word;\n- HT 79 [+] 83 \`]KU-NI[\`: normalized tokenization overstated a complete base.\n\nThese do not retroactively alter the frozen v0.4 ranking. They are preregistered in \`data/v05-regression-backlog.csv\` for the next source-consistency pipeline.\n\n**Rule:** never repair a damaged boundary from normalized tokenization alone, and never join separated damaged segments into a lexical word unless the specialist edition explicitly licenses that segmentation.\n\n`;
    if (!text.includes(marker)) throw new Error('method marker missing');
    text = text.replace(marker, add + marker);
  }
  fs.writeFileSync(p, text);
}

// 8) README: record result and move frontier to v0.5 source consistency.
{
  const p = 'README.md';
  let text = fs.readFileSync(p, 'utf8');
  const start = text.indexOf('## Next work');
  const end = text.indexOf('## Repository map', start);
  if (start < 0 || end < 0) throw new Error('README Next work block missing');
  const block = `## Next work\n\nThe preregistered comparative audit of \`QE\`, \`SU\`, and \`WI\` is complete. None meets the two-family productivity rule:\n\n- \`QE\`: **1 Tier A + 1 rejected**; the same-tablet \`KA-PA ~ KA-PA-QE\` family is exceptionally strong locally.\n- \`SU\`: **0 Tier A/B + 1 Tier C + 1 rejected**.\n- \`WI\`: **1 Tier B + 1 rejected**.\n\nMore importantly, the screen exposed three source-consistency failures in frozen v0.4: lost damage in \`SA-RO-QE[\`, segmented-fragment flattening in KN Zb 35, and the \`KU-NI\` normalized/damage-preserving source conflict. The latter also withdraws the earlier Tier-B promotion of \`KU-NI ~ KU-NI-TE\`; the frozen Davis replication scores themselves are unchanged.\n\nThe next research priority is therefore **v0.5 source-consistency / fragment-aware extraction**, not another manual suffix hunt.\n\n1. make damage-preserving source representations authoritative over normalized tokenization for boundary security;\n2. detect separated damaged segments before word construction;\n3. add the four frozen controls in \`data/v05-regression-backlog.csv\`;\n4. rerun the full structural discovery corpus without retuning toward any suffix;\n5. only then select new morphology candidates from the v0.5 output.\n\nComparative audit: [\`experiments/qe-su-wi-comparative-audit.md\`](experiments/qe-su-wi-comparative-audit.md).  \nResult: [\`results/qe-su-wi-comparative-audit.md\`](results/qe-su-wi-comparative-audit.md).  \nBacklog: [\`data/v05-regression-backlog.csv\`](data/v05-regression-backlog.csv).\n\n`;
  text = text.slice(0,start) + block + text.slice(end);
  const needle = '- [`data/ra-audit-summary.csv`](data/ra-audit-summary.csv)';
  if (text.includes(needle) && !text.includes('- [`data/qe-su-wi-audit-summary.csv`]')) text = text.replace(needle, needle + '\n- [`data/qe-su-wi-audit-summary.csv`](data/qe-su-wi-audit-summary.csv)\n- [`data/v05-regression-backlog.csv`](data/v05-regression-backlog.csv)');
  fs.writeFileSync(p, text);
}

// 9) Mark comparative experiment completed, preserving its preregistration text.
{
  const p = 'experiments/qe-su-wi-comparative-audit.md';
  let text = fs.readFileSync(p, 'utf8');
  text = text.replace('**Status:** registered before inscription-level adjudication.', '**Status:** completed; protocol below was registered before inscription-level adjudication.');
  if (!text.includes('## Completed result')) text += `\n## Completed result\n\n- \`QE\`: 1/2 A/B survivors (one Tier A), productivity not established.\n- \`SU\`: 0/2 A/B survivors, productivity not established.\n- \`WI\`: 1/2 A/B survivors (one Tier B), productivity not established.\n- **No suffix passed the registered productivity rule.**\n\nThe audit also exposed three new source-consistency failure controls and forced withdrawal of the earlier \`KU-NI ~ KU-NI-TE\` promotion. Full result: [\`../results/qe-su-wi-comparative-audit.md\`](../results/qe-su-wi-comparative-audit.md).\n`;
  fs.writeFileSync(p, text);
}

console.log('Applied QE/SU/WI audit integration and KU-NI correction.');
