# Stage 5E0b — gold acquisition checkpoint

Status (2026-09-21): **TARGETED DĀMOS ACQUISITION AND OCCURRENCE JOIN COMPLETE; STRUCTURAL AUDIT PASSED; GOLD NOT FROZEN DUE TO SPARSITY**.

This is a separate preregistered Kober–Paradigm positive control. Stage 5E0 remains frozen and negative. Neither Stage 5E1 nor Phase 6 is authorized by this checkpoint.

## Acquired and reconciled

Juan Piquero Rodríguez supplied the 2019 *El léxico del griego micénico* (LGM) PDF for research use with an explicit non-redistribution request. The PDF is not committed.

Nine DĀMOS normalized-exact searches are archived for the pilot: `wa-na-ka`, `wa-na-ka-to`, `wa-na-ka-te`, `wa-na-ke-te`, `qa-si-re-u`, `qa-si-re-we`, `e-qe-ta`, `e-qe-ta-e`, and `e-qe-ta-i`. They contain 37 occurrence rows in total. `qa-si-re-we` is an archived zero-result search.

The 37-row DĀMOS–LGM join was independently reconciled against the saved source exports: zero missing rows, zero extras, zero duplicate source pointers, and no source-field mismatches. All package checksums and all nine acquisition-manifest hashes matched the saved Library copies.

## Epigraphic override

DĀMOS remains authoritative for readings, segmentation, damage and uncertainty. The joined ledger partitions into 11 `PRIMARY_GOLD_CANDIDATE` rows and 26 `QUARANTINED` rows with no overlap or unclassified rows.

The principal quarantine decisions were confirmed against the saved LGM passages: fragmentary `]wa-na-ka-to`; damaged `wa-]na-ka-te`; disputed TH X 105; morphologically ambiguous `e-qe-ta`; uncertain `e-qe-ta-e` line context; unclear PY An 607 interpretation for `e-qe-ta-i`; and damaged/uncertain LGM evidence for `qa-si-re-we`.

Four otherwise admissible candidates have damage elsewhere in their line context while the target word itself is intact. These require explicit human adjudication before any freeze.

## Sufficiency result

The pilot does not yet support a Stage 5E0b gold freeze.

- `ἄναξ`: 7 primary candidates and at least two distinct secure surface forms. Eligible on the form-diversity prerequisite.
- `βασιλεύς`: 4 candidates but only the secure surface `qa-si-re-u`. Not eligible.
- `ἑπέτᾱς`: no primary candidates after mandatory quarantine. Not eligible.
- Candidate archive coverage: PY 10, KN 1, MY 0, TH 0. The MY/TH external holdout cannot be evaluated.

Disposition: **INDETERMINATE_DUE_TO_SPARSITY / GOLD NOT FROZEN / SCORING PROHIBITED**.

See `AUDIT_REPORT_2026-09-21.md` for the reconciliation and sufficiency audit.

## Next action

Expand the candidate-blind LGM→DĀMOS acquisition to additional common-word lemmas with independently secure multi-form paradigms and sufficient archive coverage, including MY/TH where possible. Do not choose forms based on detector behavior. Re-run the same audit after expansion. Freeze `linear_b_gold_v1.csv`, schema, provenance manifest and SHA-256 only when the preregistered sufficiency and adjudication requirements are met.

## Publication/access policy

Do not commit or redistribute the LGM PDF, restricted source exports, or occurrence-level source data without verified redistribution rights. Public GitHub may contain protocols, code, aggregate counts, citations, audit results and cryptographic hashes.
