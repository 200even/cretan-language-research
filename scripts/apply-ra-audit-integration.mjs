#!/usr/bin/env node
import fs from 'node:fs';

const esc = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"','""')}"` : text;
};

// Append benchmark rows without rewriting existing adjudications.
{
  const path = 'data/morphology-benchmark.csv';
  let text = fs.readFileSync(path, 'utf8');
  const headers = text.split(/\r?\n/, 1)[0].split(',');
  const rows = [
    {
      benchmark_id:'MB-RA-001', base_form:'SA-RA', variant_form:'SA-RA-RA', operation:'suffix', added_material:'RA',
      base_inscriptions:'HT62+73', variant_inscriptions:'HT30', base_site:'Haghia Triada', variant_site:'Haghia Triada',
      base_scribe:'unknown', variant_scribe:'HT Scribe 1', boundaries_secure:'yes', damage_status:'none',
      context_equivalence:'same-site administrative; stronger same-tablet SA-RA2 alternation', evidence_tier:'rejected', adjudication:'reclassified',
      reason:'HT30 itself contains SA-RA2 and Younger proposes SA-RA2 and SA-RA-RA may be one and the same; the automatic SA-RA + RA segmentation is not the strongest inscription-internal analysis',
      provenance_note:'audits/RA.md; HT30 Younger commentary; HT62+73 GORILA-linked transcription'
    },
    {
      benchmark_id:'MB-RA-002', base_form:'A-DA', variant_form:'A-DA-RA', operation:'suffix', added_material:'RA',
      base_inscriptions:'TY3a', variant_inscriptions:'KNZf31', base_site:'Tylissos', variant_site:'Knossos',
      base_scribe:'unknown', variant_scribe:'unknown', boundaries_secure:'yes', damage_status:'none',
      context_equivalence:'administrative recipient versus inscribed silver hairpin', evidence_tier:'C', adjudication:'comparison-only',
      reason:'Complete exact extension but cross-site support and discourse mismatch leave common lexical identity unproved',
      provenance_note:'audits/RA.md; TY3a transaction layer; KNZf31 GORILA-linked record; Verduci and Davis 2015 material context'
    },
    {
      benchmark_id:'MB-RA-003', base_form:'MI-DA', variant_form:'MI-DA-RA', operation:'suffix', added_material:'RA',
      base_inscriptions:'HT27b', variant_inscriptions:'PKZb25', base_site:'Haghia Triada', variant_site:'Palaikastro',
      base_scribe:'HT Scribe 11', variant_scribe:'unknown', boundaries_secure:'yes', damage_status:'none',
      context_equivalence:'administrative recipient/designation versus vessel inscription of unknown function', evidence_tier:'B', adjudication:'reclassified',
      reason:'Both forms are complete; editors call MI-DA-RA a hapax and cannot determine whether it is anthroponym or toponym, leaving a plausible onomastic/derivational relation but no demonstrated generic inflection',
      provenance_note:'audits/RA.md; HT27b GORILA-linked record; Schoep and Driessen 2002-2003 PK Zb 25'
    }
  ];
  for (const row of rows) {
    if (text.includes(`\n${row.benchmark_id},`) || text.startsWith(`${row.benchmark_id},`)) continue;
    text = text.replace(/\s*$/, '\n') + headers.map(h => esc(row[h] ?? '')).join(',') + '\n';
  }
  fs.writeFileSync(path, text);
}

// README: record RA result and move the next-work frontier to the tied clean two-pair suffixes.
{
  const path = 'README.md';
  let text = fs.readFileSync(path, 'utf8');
  const start = text.indexOf('## Next work');
  const end = text.indexOf('## Repository map', start);
  if (start < 0 || end < 0) throw new Error('README Next work block not found');
  const next = `## Next work\n\nThe hostile audit of final \`RA\` is complete: **0 Tier A + 1 Tier B + 1 Tier C + 1 rejected**, so productive \`RA\` is not established. The strongest surviving family is \`MI-DA ~ MI-DA-RA\`, retained only as possible onomastic/derivational morphology. The \`SA-RA\` family is a new string-decomposition control because HT30 itself favors \`SA-RA₂ ~ SA-RA-RA\` over simple \`SA-RA + RA\`.\n\nThe next research priority is a **registered comparative audit of the three tied clean two-pair v0.4 suffix candidates** rather than choosing one post hoc:\n\n1. \`QE\`: \`KA-PA ~ KA-PA-QE\`, \`SA-RO ~ SA-RO-QE\`;\n2. \`SU\`: \`KU-NI ~ KU-NI-SU\`, \`A-RI ~ A-RI-SU\`;\n3. \`WI\`: \`JA-DI ~ JA-DI-WI\`, \`PA3-NI ~ PA3-NI-WI\`;\n4. apply the same source, support, scribe, lexical-identity, and context standards to all six pairs before comparing survival rates;\n5. keep the \`JA\` and \`NE\` functional stop rules in force until genuinely new independent paradigms appear;\n6. preserve v0.4 extraction unchanged while manual promotion-stage audits continue.\n\nRA audit: [\`audits/RA.md\`](audits/RA.md).  \nCurrent structural ranking: [\`results/structural-aware-v0.4/paradigm-ranking.csv\`](results/structural-aware-v0.4/paradigm-ranking.csv).  \nCross-suffix audited comparison: [\`data/suffix-audit-comparison.csv\`](data/suffix-audit-comparison.csv).\n\n`;
  text = text.slice(0, start) + next + text.slice(end);

  const evidenceNeedle = '- [`data/ne-audit-summary.csv`](data/ne-audit-summary.csv)';
  if (text.includes(evidenceNeedle) && !text.includes('- [`data/ra-audit-summary.csv`]')) {
    text = text.replace(evidenceNeedle, evidenceNeedle + '\n- [`data/ra-audit-summary.csv`](data/ra-audit-summary.csv)');
  }
  fs.writeFileSync(path, text);
}

// Methodology: add the new promotion-stage failure class without changing v0.4 extraction.
{
  const path = 'METHODOLOGY.md';
  let text = fs.readFileSync(path, 'utf8');
  if (!text.includes('### String-decomposition ambiguity')) {
    const marker = '## Separate morphology evidence dimensions';
    const section = `### String-decomposition ambiguity\n\nA structurally secure exact pair can still be a false morphological decomposition. The RA audit supplies the control: automatic \`SA-RA ~ SA-RA-RA\` is formally valid, but HT30 itself contains \`SA-RA₂\` and Younger's commentary proposes \`SA-RA₂\` and \`SA-RA-RA\` may be the same form. A stronger inscription-internal alternation therefore supersedes the mechanical \`base + suffix\` segmentation.\n\nThis is a **promotion-stage** control, not an automatic v0.4 exclusion. Competing decompositions must be adjudicated from the inscription, palaeography, editorial conventions, and context; the extractor should not guess which lexical analysis is correct.\n\n`;
    if (!text.includes(marker)) throw new Error('METHODOLOGY marker missing');
    text = text.replace(marker, section + marker);
  }
  fs.writeFileSync(path, text);
}

console.log('Applied RA audit integration.');
