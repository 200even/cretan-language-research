# Stage 5E0b — gold acquisition checkpoint

Status (2026-09-21): **GOLD SOURCES ACQUIRED; TARGETED EXTRACTION AND OCCURRENCE JOIN IN PROGRESS; GOLD NOT FROZEN**.

This is a separate preregistered Kober–Paradigm positive control. Stage 5E0 remains frozen and negative. Neither Stage 5E1 nor Phase 6 is authorized by this acquisition checkpoint.

## Acquired, not yet validated

- Juan Piquero Rodríguez supplied the 2019 *El léxico del griego micénico* (LGM) PDF on 2026-09-21 for research use and requested that the PDF not be redistributed. The PDF is **not committed**.
- Three normalized-exact DĀMOS acquisition probes (`wa-na-ka`, `qa-si-re-u`, `e-qe-ta`) yielded 26 occurrence-level records: 5, 4, and 17 respectively. The 26 records are a pilot, not corpus frequencies or the full stratified sample.
- Initial inspection identifies 20 intact and 6 damaged/uncertain token readings. These are preliminary acquisition classifications, not gold labels. The 6 flagged occurrences are KN Vd 136, PY Na 1013, TH Of 36 (`wa-na-ka[`); KN As 4493 (`e-qe-ṭạ`); PY An 614 (`ẹ-qe-ta`); PY Wa 917 (`]e-qe-ta`). Preserve exact DĀMOS reading and token identity.
- LGM family-level forms have been inspected; the acquisition manifest includes `wa-na-ka-to` (noting LGM's damaged `]wa-na-ka-to`), `wa-na-ka-te`, `wa-na-ke-te`, `e-qe-ta-e`, `e-qe-ta-i`, and `qa-si-re-we`. Search forms are probes, not proof of occurrence-level morphology.

## Mandatory epigraphic override

Join DĀMOS occurrence epigraphy to LGM linguistic analyses by document/tablet, normalized form, and line/token when available. DĀMOS wins on readings, segmentation, damage, and uncertainty. Conflicts are quarantined and excluded from primary `G_eval`; never silently repair epigraphy from LGM or algorithm output. LGM's omission of proper names is **unlabeled**, not negative evidence. Only highest-confidence, occurrence-resolved linguistic analyses enter the primary evaluation. An ambiguous surface form such as `e-qe-ta` must not receive a single blanket case/number label.

## Gate and next actions

`ACQUIRE → JOIN → QUARANTINE → AUDIT → FREEZE → RESUME`.

1. Complete the stratified DĀMOS acquisition and retain occurrence IDs, exact readings, document/line, export provenance and source versions.
2. Verify LGM form, lemma, morphology, confidence, reference and page; resolve each occurrence or quarantine ambiguity.
3. Audit conflict/exclusion counts, archive coverage and the prerequisite of at least two distinct secure syllabographic surface forms per eligible lemma.
4. Freeze `linear_b_gold_v1.csv`, schema, manifest and SHA-256 only after audit. No score, baseline comparison, or tuning until then.
5. Run the frozen Stage 5E0b protocol only after independent verification of the freeze; MY/TH remains an external holdout, not a tuning set.

## Publication/access policy

Do not commit or redistribute LGM PDF, restricted source exports, or derived occurrence-level datasets without verified redistribution rights. Commit protocols, extraction/validation code, schemas, aggregate counts, source citations, and cryptographic hashes when available. This document does not assert a gold CSV, complete join, completed audit, or a passing validation test.
