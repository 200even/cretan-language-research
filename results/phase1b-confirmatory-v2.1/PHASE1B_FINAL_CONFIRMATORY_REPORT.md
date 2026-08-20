# Cretan Language Research — Phase 1B Final Confirmatory Report

**Date:** 2026-08-20  
**Status:** **PHASE 1B COMPLETE; Test 2B rerun complete; TI/JA global edge-productivity unsupported.**

## Repository publication note

The raw SigLA payload and the full reconstructed token/boundary tables are intentionally not redistributed in this public repository. Their hashes are preserved in `phase1b_final_manifest.json`. The scripts in `scripts/phase1b/` regenerate the working artifacts from the frozen upstream inputs.

## Executive result

The Phase 1B boundary-damage blocker has been resolved with a candidate-blind diplomatic overlay and a fail-closed alignment rule. The frozen SigLA source was recovered byte-for-byte, the original Step-2 clean population was reconstructed against its preregistered fingerprints, the repaired clean-v2.1 corpus was materialized, and the unchanged v0.7b detector was recalibrated.

The preregistered 10% synthetic terminal-suffix power gate passes on the repaired corpus (20/20 recoveries; exact 95% lower bound 0.8316; weakest 99% ΔLL lower bound +4.6245). The negative control gives 0/20 false-positive recoveries.

The permitted TI/JA rerun then gives:

| Candidate | total | terminal | internal | docs | ΔLL | 99% bootstrap CI | Test 2B |
|---|---:|---:|---:|---:|---:|---:|---|
| TI | 38 | 20 | 18 | 27 | -0.5697 | [-3.6315, +2.0194] | **NO GLOBAL EDGE EVIDENCE** |
| JA | 37 | 19 | 18 | 33 | +0.9007 | [-3.0357, +4.8210] | **NO GLOBAL EDGE EVIDENCE** |

Neither 99% lower bound exceeds zero. The result is also stable under 100 independently hash-derived bootstrap seeds per candidate: every replicate family gives the same non-significant decision.

This closes Stage 5C as a **negative confirmatory result for global edge productivity**, not as a rejection of all morphology.

---

## 1. Frozen inputs

### SigLA

Uploaded raw SigLA source:

`sigla_database_2026-08-19(1).js`

SHA-256:

`cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d`

This exactly matches the preregistered frozen source hash.

### Diplomatic boundary source

Repository / commit:

`mwenge/lineara.xyz @ 43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`

Frozen `LinearAInscriptions.js` SHA-256:

`4da8e1f9693d30880ee505e56541fc189add70605bad88436c44a8e11a57764c`

Only aligned transliteration/glyph boundary-damage evidence is used. Semantic transaction classifications are excluded.

Diplomatic rule, frozen candidate-blind:

- `𐝫` before a lexical glyph word → `OPEN_LEFT`
- `𐝫` after a lexical glyph word → `OPEN_RIGHT`
- `𐝫` inside the surviving glyph sequence → `INTERIOR_DAMAGE`

The source-level hostile suite passes 6/6: PH28a, HT39, ZA19, HT55b, KNWb33, IOZa11.

---

## 2. Reconstruction of the original Step-2 population

The raw source was decoded and the original candidate-blind Step-2 inclusion logic reconstructed. The resulting clean membership reproduces the frozen audit fingerprints exactly:

- 1,401 total word tokens
- 1,036 clean
- 365 excluded
- 398 documents with at least one clean word
- 182 clean one-sign words
- 854 clean words of length >=2
- 2,590 clean sign positions
- 679 clean word types
- 104 clean sign labels
- max clean word length 19, on KN Zf 13

The original primary administrative stratum is also reproduced exactly:

- 821 Tablet/Nodule/Roundel words of length 2–8
- 310 documents
- 589 word types
- 2,274 sign positions
- effective token weight 696.0

This multidimensional match is the validation criterion; the 1,036 count was not reached by selecting exclusions post hoc.

---

## 3. Clean-v2.1 boundary reconstruction

### Original locked builder

Original Phase-1B builder SHA-256:

`24ecfa6d655712e1dc5f7b9e5736c4d749cf1dade250d44ef60bc2bb75d78688`

It uses forced monotonic exact alignment and fails closed on unknown or ambiguous boundaries.

### Pre-unblinding v2.1 amendment

During hostile-control acceptance testing, SigLA `KN Wb 33a` failed to resolve positively to diplomatic `KNWb33`; it was merely excluded as `UNKNOWN_BOUNDARY`. That was safe statistically but failed the stricter hostile-control requirement of *positive damage recovery*.

A candidate-blind document-key amendment was therefore made **before any clean-v2 TI/JA outcome was inspected**:

> A lowercase Latin face suffix on a SigLA document ID may be stripped only when the exact unsuffixed diplomatic document key exists. Latin suffixes are not stripped from diplomatic keys.

Thus `KN Wb 33a → KNWb33` is allowed, while `HT 41b → HT41a` is not.

Builder v2.1 SHA-256:

`3e2f4a68c88cf7a1d5d44da11f7f411172b5bf56663abd1d1ac5fc4b385d400b`

Dedicated v2.1 test confirms one-way exact-target-only aliasing and positive `QA-KI[` recovery.

### Materialized clean-v2.1

`sigla_tokens_clean_v2_1.csv` SHA-256:

`83298a8c5b8f852edaf8d0f25bcc7affb07a71aa27561169f5152ad5bf28b3c9`

Corpus counts:

- 1,401 SigLA input rows
- 899 with positive diplomatic boundary coverage
- 502 `UNKNOWN_BOUNDARY`
- 580 full clean-v2.1 words
- 554 clean-v2.1 words in the locked primary 2–8-sign administrative stratum
- 211 primary documents
- 374 primary word types
- effective primary token weight 457.0

Relative to the original 821-token primary stratum, 267 tokens are removed:

| reason | removed |
|---|---:|
| UNKNOWN_BOUNDARY | 85 |
| OPEN_LEFT | 78 |
| OPEN_RIGHT | 66 |
| OPEN_LEFT + OPEN_RIGHT | 37 |
| INTERIOR_DAMAGE | 1 |

This is substantially stricter than superseded v0.7c and is expected from the positive-coverage/fail-closed policy.

---

## 4. Statistical code lock and recalibration

Locked calibration script SHA-256:

`f19a24af71afd25091734638377f99570a3d370ef3022f1261850dc6a660e6be`

The recovered executable script matches this hash byte-for-byte. The statistical architecture was not modified:

- Tablet/Nodule/Roundel, 2–8 signs
- site + original-form dependence cap, total weight <=2
- leave-one-document-out CV
- null: previous sign + position from word start
- alternative: null + candidate indicator
- L2 logistic regression, `liblinear`, C=1.0, max_iter=100
- held-out weighted ΔLL
- 1,500 document bootstrap replicates
- recovery if 99% CI lower bound >0

Because a full monolithic run exceeded the execution ceiling, deterministic seed ranges were executed in batches using the unchanged locked functions. No replicate count, seed, model, CI rule, or recovery criterion was altered.

### Repaired-corpus power curve

| injection | recovered | exact 95% power CI | weakest 99% ΔLL lower |
|---:|---:|---:|---:|
| 2% | 12/20 | 0.3605–0.8088 | -0.1862 |
| 5% | 20/20 | 0.8316–1.0000 | +0.0811 |
| 10% | **20/20** | **0.8316–1.0000** | **+4.6245** |
| 20% | 20/20 | 0.8316–1.0000 | +16.4128 |

Preregistered hard stop: at least 80% estimated recovery at 10%, with exact 95% lower bound >0.80.

**HARD STOP: PASS.**

Negative boundary-independent control: **0/20 false-positive recoveries.**

The smaller repaired corpus is detectably weaker at 2%, but remains adequately calibrated at the preregistered 10% target.

---

## 5. TI / JA confirmatory rerun

### RNG provenance amendment

The historical candidate-wrapper bootstrap RNG integer was not preserved in the preregistration or recoverable artifacts. The substantive bootstrap design *was* locked: document resampling, 1,500 replicates, 0.5%/99.5% quantiles.

Before computing clean-v2.1 TI/JA outcomes, the following deterministic seed rule was frozen:

`seed(candidate) = first 64 bits of SHA256(frozen_sigla_sha | clean_v2_sha | candidate)`

This prevents result-dependent seed selection. As a robustness check, 100 additional seeds per candidate were independently derived from the same immutable hashes plus an integer counter.

### Results

#### TI

- occurrences: 38
- terminal: 20
- internal: 18
- candidate documents: 27
- held-out ΔLL: **-0.569710**
- 99% document-bootstrap CI: **[-3.631467, +2.019442]**
- 100-seed lower-bound range: **[-3.8754, -3.0971]**
- decision: **NO GLOBAL EDGE-PRODUCTIVITY EVIDENCE**

#### JA

- occurrences: 37
- terminal: 19
- internal: 18
- candidate documents: 33
- held-out ΔLL: **+0.900695**
- 99% document-bootstrap CI: **[-3.035656, +4.820958]**
- 100-seed lower-bound range: **[-3.5069, -2.6308]**
- decision: **NO GLOBAL EDGE-PRODUCTIVITY EVIDENCE**

The historical RNG-seed gap therefore does not affect either decision.

---

## 6. Exact-pair reassessment

Across all 580 clean-v2.1 words there are 24 exact one-sign `X ~ X-Y` extensions with base length >=2.

JA supplies four, the largest count for any extension sign:

- `*306-TU ~ *306-TU-JA`
- `A-MA ~ A-MA-JA`
- `KU-PA ~ KU-PA-JA`
- `PA-SE ~ PA-SE-JA`

TI supplies three:

- `DA-KU-SE-NE ~ DA-KU-SE-NE-TI`
- `JA-KU ~ JA-KU-TI`
- `RI-RU-MA ~ RI-RU-MA-TI`

The earlier `SA-MA ~ SA-MA-TI` relation is correctly eliminated because HT39 is diplomatically `]SA-MA-TI` and therefore open-left.

No TI or JA short/long pair co-occurs on the same document. Under the frozen v0.7a sparsity rule, truncation/hierarchical factorization is therefore **INDETERMINATE** for every candidate pair.

Only one of all 24 exact extensions has same-document co-occurrence: `KA-PA ~ KA-PA-QE` on HT 6a.

### Epigraphic caveats remain

TI's three exact relations are not equivalent evidence:

- `DA-KU-SE-NE ~ ...-TI`: HT104 commentary permits alternative segmentation with TI as a separate ideogram.
- `JA-KU ~ JA-KU-TI`: the MA2b context independently shows `JA-KU | TI` boundary behavior, so a separate element/clitic-like analysis remains live.
- `RI-RU-MA ~ RI-RU-MA-TI`: the PH31b extended form retains its earlier direct-transcription caveat.

JA's four replicated exact patterns survive the diplomatic repair, but lack same-document directionality evidence. They remain structural candidates, not established suffixes.

---

## 7. Scientific interpretation

### What is now established

1. The original normalized SigLA boundary layer was insufficient for publication-grade edge morphology.
2. The diplomatic `𐝫` overlay provides a candidate-blind positive-coverage repair that passes the hostile suite.
3. The repaired confirmatory corpus is materially smaller: primary 821 → 554 tokens and effective weight 696 → 457.
4. Despite that shrinkage, the preregistered 10% power gate still passes.
5. **TI does not show global terminal-edge productivity.**
6. **JA does not show global terminal-edge productivity.**
7. JA nevertheless retains four cross-stem exact one-sign extension patterns; TI retains three less-secure patterns.

### What is not established

- TI is not established as a suffix, plural marker, case marker, tense/aspect marker, or agreement marker.
- JA is not established as a suffix or assigned grammatical function.
- Failure of the global edge test does not falsify local/lexically restricted morphology.
- Exact pairs alone cannot distinguish morphology from structural truncation, abbreviation, factorization, cliticization, or segmentation alternatives.

### Revised grades

- **TI: C+/B−; Level 2A local candidate.** Global Test 2B negative; exact-pair replication remains epigraphically/structurally compromised.
- **JA: B; replicated Level 2A structural candidate.** Global Test 2B negative; four exact cross-stem patterns survive, but factorization/truncation remains indeterminate.

No grammatical interpretation gate is opened by these results.

---

## 8. Roadmap consequence

| Workstream | Status after this run |
|---|---|
| Phase 1B diplomatic boundary reconstruction | **COMPLETE** |
| Hostile control gate | **PASS 6/6** |
| Step-2 provenance reconstruction | **COMPLETE / fingerprint matched** |
| clean-v2.1 materialization | **COMPLETE** |
| v0.7b recalibration | **PASS** |
| Stage 5C TI global edge productivity | **COMPLETE — NEGATIVE** |
| Stage 5C JA global edge productivity | **COMPLETE — NEGATIVE** |
| exact TI/JA pair reassessment | **COMPLETE** |
| truncation/factorization discrimination | **INDETERMINATE for all TI/JA pairs** |
| Stage 5D suffix-transition network | **UNBLOCKED BY PHASE 1B, but must be rebuilt on clean-v2.1 before interpretation** |
| Phase 6 grammatical inference | **NOT OPEN** |

The old v0.7c unblinding remains superseded and must not be cited as the confirmatory result.

---

## 9. Reproducibility artifacts

The full local run produced the following hashed artifacts; large source-derived tables are not all redistributed in this public repository:

- `reconstruct_sigla_step2_work.py`
- `sigla_tokens_step2_rebuilt.csv`
- `build_sigla_tokens_clean_v2_1.py`
- `test_phase1b_builder_v2_1.py`
- `sigla_tokens_clean_v2_1.csv`
- `sigla_tokens_boundary_audit_v2_1.csv`
- `sigla_document_alignment_audit_v2_1.csv`
- `sigla_clean_v2_1_summary.json`
- `04_run_blind_calibration.py`
- `calibration_clean_v2_1/calibration_report.json`
- `calibration_clean_v2_1/synthetic_suffix_runs.csv`
- `calibration_clean_v2_1/negative_control_runs.csv`
- `run_phase1b_ti_ja_confirmatory.py`
- `phase1b_ti_ja_confirmatory_results.json`
- `phase1b_ti_ja_confirmatory_results.csv`
- `phase1b_clean_v2_1_exact_one_sign_extensions.csv`
- `phase1b_ti_ja_exact_pairs_v2_1.csv`
- `phase1b_exact_pair_reassessment_v2_1.json`

See `phase1b_final_manifest.json` for byte sizes and SHA-256 hashes.
