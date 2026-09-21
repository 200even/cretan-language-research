# Referee update — Stage 5E0b, 2026-09-21

**Disposition requested:** acknowledge acquisition progress only; maintain **GOLD NOT FROZEN / SCORING PROHIBITED**. No approval of a linguistic result is requested.

## What changed

Juan Piquero Rodríguez replied on September 21 and supplied the LGM PDF for research use with an explicit non-redistribution request. Three DĀMOS normalized-exact occurrence probes (`wa-na-ka`, `qa-si-re-u`, `e-qe-ta`) are acquired: 5 + 4 + 17 = 26 rows. Preliminary epigraphic screening identifies 20 intact readings and six damaged/uncertain readings. LGM initial-family extraction informed six follow-up search targets (`wa-na-ka-to`, `wa-na-ka-te`, `wa-na-ke-te`, `e-qe-ta-e`, `e-qe-ta-i`, `qa-si-re-we`). The six targets are not claimed to be complete paradigm coverage or occurrence-verified morphology.

## Controls retained

1. Stage 5E0 remains frozen and negative. Stage 5E0b is a separate preregistered architecture.
2. DĀMOS epigraphy overrides LGM in every conflict. Preserve exact readings; quarantine disagreement, damage, uncertain signs, segmentation changes, unresolved homographs and morphology ambiguity from primary gold.
3. Proper names omitted from LGM are unlabeled, never negative controls by default.
4. Primary evaluation requires highest-confidence occurrence-resolved analyses and at least two distinct secure syllabographic surface forms per eligible lemma.
5. Development PY/KN; external MY/TH is not available for tuning. Do not infer external transfer success from this pilot.
6. No Gate P/M scores, model selection, baseline comparisons, or Linear A authorization before audited gold freeze.

## Repository changes proposed in this PR

- Acquisition status and access policy in `ACQUISITION_STATUS.md`.
- Fail-closed structural freeze validator requiring provenance, explicit audit attestation, SHA-256, unique occurrence IDs, secure readings, matched joins, highest confidence, and lemma form diversity. It cannot substitute for independent scholarly adjudication.
- GitHub Actions job compiles the validator and asserts no gold CSV is committed; it deliberately has no scoring job.

## Outstanding evidence / requested referee scrutiny

- Complete stratified DĀMOS exports and occurrence-level LGM joins; document/line/token disambiguation, especially repeated occurrences within a tablet.
- Verify all LGM page references and form-specific confidence before promoting any provisional ledger row.
- Produce quarantine ledger and independently audit conflict/exclusion counts, archive and morphology coverage.
- Freeze `linear_b_gold_v1.csv`, schema, provenance manifest and SHA-256 with restricted source handling.
- Review whether the structural validator adequately handles set-valued morphology and avoids conflating repeated token IDs or normalized spellings; strengthen before gold freeze as needed.

**Referee question:** Does this checkpoint correctly preserve the preregistered epigraphic override and prevent premature scoring, and what additional acquisition or adjudication controls are required before authorizing the gold freeze?

This is a submitted project-side referee update, **not** a claim that an independent referee has responded or approved it.
