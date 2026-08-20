# Edge Productivity v0.7b

**Status: PROVISIONAL / DATA-QUALITY BLOCKED**

This directory records the frozen v0.7b calibration and the first authorized
unblinding of **TI** and **JA**. The statistical detector was locked before
candidate inspection. However, the post-unblinding exact-pair audit exposed a
separate epigraphic problem in the Step 2 extraction layer: some **word-edge
damage markers were lost**, causing damaged forms to enter the nominally clean
administrative corpus.

Accordingly, the numerical TI/JA results below are reproducible, but they are
**not yet publication-grade evidence for or against morphology**. The next
allowed change is a candidate-blind repair of the edge-damage mask followed by
a rerun of the unchanged detector.

## Frozen source and calibration

SigLA source snapshot SHA-256:

`cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d`

Calibration script SHA-256:

`f19a24af71afd25091734638377f99570a3d370ef3022f1261850dc6a660e6be`

The primary confirmatory register is limited to **Tablet, Nodule, and Roundel**
supports, clean syllabographic words of length **2–8**. The frozen stratum has:

- 821 tokens
- 310 documents
- 589 distinct word types
- 2,274 sign positions
- effective weighted token count 696

Weights were frozen before synthetic injection:

`weight = min(1, 2 / n(site + original word-form))`

## Candidate-blind power calibration

A novel synthetic terminal sign was injected into 2%, 5%, 10%, and 20% of
eligible words. Twenty independent corpora were generated per rate.

| Injection rate | Recovered |
|---:|---:|
| 2% | 20/20 |
| 5% | 20/20 |
| 10% | 20/20 |
| 20% | 20/20 |

The preregistered hard stop required at least 80% recovery at a 10% injection
rate. The observed 20/20 recovery has a two-sided exact 95% lower confidence
bound of 83.16%, so the hard stop passed.

A boundary-independent synthetic candidate produced 0/20 false-positive
recoveries. This is a gross-miscalibration check, not a precise Type-I error
estimate.

## Authorized unblinding

The locked model was then run without parameter changes.

| Candidate | Sign occurrences | Terminal occurrences | Held-out ΔLL | 99% document-bootstrap CI | Confirmatory global edge result |
|---|---:|---:|---:|---:|---|
| TI | 48 | 25 | -0.792756 | [-2.945267, 0.844060] | No evidence |
| JA | 61 | 28 | +1.735067 | [-2.685630, 6.472686] | No evidence |

Under the locked criterion, neither candidate demonstrates global
edge-productivity in the current extracted corpus. TI slightly worsens
out-of-document boundary prediction; JA improves it modestly, but the 99%
interval crosses zero.

**This is not yet a final morphological verdict.** Global edge productivity and
exact paradigm segmentation are separate evidential claims.

## Epigraphic blocker discovered after unblinding

The exact-pair reassessment immediately exposed a defect in the clean-token
layer. Two already-audited examples in the primary administrative stratum are:

- **PH 28a:** extracted as `A-RI-JA`, but the diplomatic audit records
  `A-RI-JA[` (right edge damaged).
- **HT 39:** extracted as `SA-MA-TI`, but the diplomatic audit records
  `]SA-MA-TI` (left edge damaged).

Thus the Step 2 decoder preserved many sign-level uncertainty markers but did
not reliably preserve all word-edge damage metadata.

### Consequence

The v0.7b unblinding run must be treated as **provisional**. We do not change
the statistical model. Instead:

1. construct a candidate-blind word-edge damage mask from diplomatic sources;
2. enumerate every token whose eligibility changes;
3. freeze and hash the corrected corpus;
4. rerun the exact same TI/JA detector;
5. separately reassess exact-pair evidence.

This preserves the preregistration while correcting an upstream epigraphic
inclusion error.

## Files

- `preregistration_v07b_addendum.md` — frozen methodological addendum.
- `calibration_report.json` — machine-readable calibration summary.
- `power_curve_results.csv` — candidate-blind power curve.
- `unblinding_provisional_v07b.json` — machine-readable TI/JA result and blocker.
- `run_edge_productivity_v07b.py` — locked candidate runner.

## Data licensing

The raw SigLA dataset is **not redistributed here**. SigLA is cited as:

Ester Salgarella and Simon Castellan, *SigLA: The Signs of Linear A: a
palæographical database*, https://sigla.phis.me/ (dataset and drawings
CC BY-NC-SA 4.0).

