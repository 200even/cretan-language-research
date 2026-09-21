# Stage 5E0b audit report — 2026-09-21

**Disposition:** STRUCTURAL JOIN AUDIT PASSED; GOLD FREEZE BLOCKED; SCORING PROHIBITED.

This audit covers the saved Stage 5E0b DĀMOS–LGM package and the privately held LGM source used to construct it. It does not redistribute the LGM PDF or raw restricted source material.

## 1. Acquisition and checksum integrity

The acquisition manifest contains nine normalized-exact DĀMOS searches. The archived Library copies reconcile exactly to the manifest:

| Search form | Tokens | Documents | Manifest SHA-256 |
|---|---:|---:|---|
| wa-na-ka | 5 | 5 | verified |
| wa-na-ka-to | 1 | 1 | verified |
| wa-na-ka-te | 6 | 6 | verified |
| wa-na-ke-te | 2 | 2 | verified |
| qa-si-re-u | 4 | 4 | verified |
| qa-si-re-we | 0 | 0 | verified zero-result file |
| e-qe-ta | 17 | 11 | verified |
| e-qe-ta-e | 1 | 1 | verified |
| e-qe-ta-i | 1 | 1 | verified |

All 14 files named in `package_checksums_v1.json` matched their recorded SHA-256 values. The `qa-si-re-we` zero-result export is a UTF-8 BOM-only file (3 bytes) whose SHA-256 matches the manifest. This establishes internal integrity of the archived acquisition package; it does not independently re-query the live DĀMOS service.

## 2. Occurrence join reconciliation

The nine source exports contain 37 occurrence rows in total. The joined ledger contains 37 rows.

Audit results:

- 37/37 join rows point to an existing source file and valid source row.
- DĀMOS item, line, physical-word, word, tablet, archive, diplomatic reading, normalized reading, context, hand, chronology and find-area fields match their source rows.
- Zero missing source occurrences.
- Zero extra joined occurrences.
- Zero duplicate source pointers.
- Zero duplicate physical-word IDs in the 37-row ledger.

The partition also reconciles exactly:

- 11 `PRIMARY_GOLD_CANDIDATE`
- 26 `QUARANTINED`
- zero overlap
- zero unclassified joined rows

## 3. Epigraphic override audit

The quarantine architecture is functioning fail-closed at the recorded rule level. The saved LGM passages support the principal caveats encoded by the package:

- `]wa-na-ka-to` / PY La 622 is explicitly fragmentary and remains quarantined.
- `wa-]na-ka-te` / PY Un 1426 is target-damaged and remains quarantined.
- TH X 105 is described by LGM as a doubtful/disputed context and remains quarantined.
- `e-qe-ta` is explicitly compatible with multiple case/number analyses and all 17 occurrences remain outside primary gold.
- `e-qe-ta-e` is quarantined under the strict line-context uncertainty rule.
- `e-qe-ta-i` on PY An 607 is quarantined because LGM states that the document's interpretation is unclear.
- `qa-si-re-we` has no DĀMOS result, while LGM gives only a damaged/restored possible plural with an anthroponym alternative.

No damaged or uncertain target reading appears among the 11 primary-gold candidates.

### Context-damage caveat

Four primary-gold candidates occur on lines containing damage or uncertain signs elsewhere in the line: PY Fr 1227, PY Fr 1235, PY Jn 431 and PY Jn 601. Their target words themselves are intact. The current implementation quarantines line-context damage only when that context is judged decisive for the morphological assignment. That distinction is defensible but requires explicit human adjudication before freeze; the automated script alone cannot determine whether surrounding damage is semantically or morphologically decisive.

## 4. Gold-eligibility audit

The 11 primary-gold candidates are distributed as follows:

- `ἄναξ`: 7 occurrences
  - `wa-na-ka` nominative singular: 1
  - `wa-na-ka-te` dative singular: 5
  - `wa-na-ke-te` dative singular orthographic variant: 1
- `βασιλεύς`: 4 occurrences
  - `qa-si-re-u` nominative singular only
- `ἑπέτᾱς`: 0 primary-gold candidates

Under the preregistered requirement of at least two distinct secure syllabographic surface forms per eligible lemma:

- **ἄναξ passes the form-diversity prerequisite.**
- **βασιλεύς fails** because only `qa-si-re-u` is securely attested in the acquired DĀMOS sample; `qa-si-re-we` returned zero and its LGM candidate is damaged/uncertain.
- **ἑπέτᾱς fails** because all acquired forms are quarantined under ambiguity or occurrence-context caveats.

Therefore the present package yields only **one eligible lemma** for primary Stage 5E0b evaluation.

## 5. Archive and externality audit

The 11 candidates are:

- PY: 10
- KN: 1
- MY: 0
- TH: 0

The preregistered MY/TH external holdout therefore has no primary-gold observations in this pilot. Gate E cannot be evaluated from this dataset.

## 6. Audit disposition

The package passes the mechanical integrity checks for acquisition hashes, row reconciliation, source pointers, partitioning, and recorded override logic.

It does **not** pass the scientific sufficiency gate for a frozen Stage 5E0b evaluation set. The current evidence is too sparse after the mandatory quarantine:

1. only one lemma satisfies secure-form diversity;
2. no MY/TH primary-gold holdout remains;
3. four otherwise admissible candidates still require explicit adjudication of non-target line damage;
4. the validator's structural checks cannot substitute for scholarly occurrence-level review.

**Status: INDETERMINATE_DUE_TO_SPARSITY / GOLD NOT FROZEN / SCORING PROHIBITED.**

## 7. Required next action

Expand the candidate-blind LGM→DĀMOS acquisition to additional common-word lemmas that independently satisfy the preregistered eligibility rule, prioritizing secure multi-form paradigms and archive coverage without selecting forms based on detector behavior. Seek sufficient MY/TH secure occurrences for the external holdout. Re-run this audit after expansion, then freeze `linear_b_gold_v1.csv` only if the lemma-diversity, provenance, adjudication and externality requirements are met.

Stage 5E0 remains frozen and negative. No Stage 5E1 or Linear A confirmatory scoring is authorized by this audit.
