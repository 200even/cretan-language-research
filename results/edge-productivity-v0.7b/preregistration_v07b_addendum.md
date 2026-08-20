# Linear A Morphology Project — Preregistration v0.7b Calibration Lock

## Status

This addendum was frozen while the confirmatory candidate signs remained blinded.
No TI, JA, KU-PA₃, PA-SE, or other target-specific outcome was inspected while
selecting the rules below or running the synthetic controls.

Frozen SigLA source SHA-256:

`cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d`

## v0.7a sparsity rule — locked

For any exact `X / X-Y` relation that does not coexist on a structurally
interpretable document, the Structural Truncation / Hierarchical Factorization
result is **INDETERMINATE**. Lack of co-occurrence is never coded as
"abbreviation unsupported."

Candidate-blind profiling found 98 exact prefix relations and only 2 pairs with
any same-document co-occurrence.

## Register eligibility rule

### Primary confirmatory edge-productivity stratum

Include only clean syllabographic words on:

- Tablet
- Nodule
- Roundel

and require word length **2–8 signs**.

The observed primary administrative-support stratum contains:

- 821 word tokens
- 310 documents
- 589 distinct word types
- 2,274 sign positions
- observed maximum word length = 6

The 8-sign ceiling therefore removes no primary-stratum token; it is a frozen
guardrail against phrase-level sequences if later corpus updates introduce them.

### Non-primary supports

Libation Tables, Jewellery, vessels, graffiti, architecture, and all other
support typologies are **not pooled** with the primary test. They are reserved
for independent replication strata. A result from those strata cannot alter
the primary confirmatory p-value.

## Dependence weighting

Normalize site names case-insensitively.

Within each `(site, original word-form)` group, cap total effective weight at 2:

`weight = min(1, 2 / n_group)`

These weights are frozen **before synthetic suffix injection** so the injection
cannot manufacture additional effective sample size.

Effective primary token weight = 696.0.

## Test 2B implementation lock

Primary detector: leave-one-document-out cross-validated logistic boundary model.

Null predictors:

- previous sign
- position from word start

Alternative:

- all null predictors
- candidate-sign indicator

Implementation:

- one-hot categorical encoding
- L2 logistic regression
- solver = `liblinear`
- C = 1.0
- max_iter = 100

For every held-out document, compute weighted log likelihood under both models.
The test statistic is held-out:

`ΔLL = LL_alternative - LL_null`

summed by document.

Recovery/significance calibration uses a document-level nonparametric bootstrap.
A synthetic candidate is considered recovered when the **99% bootstrap
confidence interval lower bound for ΔLL is greater than zero**.

Bootstrap replicates per synthetic run: 1,500.

## Synthetic terminal-suffix power calibration

For each eligible word independently, append a novel `[DUMMY]` sign with
probability:

- 2%
- 5%
- 10%
- 20%

Twenty independent synthetic corpora are generated per rate.

The synthetic sign is always terminal. This is deliberately a clean positive
control, not a claim that real morphology must behave this cleanly.

### Results

| Injection | Recovered | Estimated power | 95% exact binomial CI |
|---|---:|---:|---:|
| 2% | 20/20 | 100% | 83.16–100% |
| 5% | 20/20 | 100% | 83.16–100% |
| 10% | 20/20 | 100% | 83.16–100% |
| 20% | 20/20 | 100% | 83.16–100% |

At 10% injection, the weakest run still had a positive 99% ΔLL lower bound of
approximately **12.03**.

### Hard stop

Preregistered requirement:

`>= 80% recovery probability at 10% injection`

Observed:

`20/20 recovered; 95% exact lower confidence bound = 83.16%`

**HARD STOP PASSED.**

This establishes that the detector is not underpowered for a perfectly terminal
suffix occurring on roughly 10% of eligible administrative-support word tokens.

It does **not** establish equal power for a real candidate sign that also occurs
word-internally.

## Negative edge-control

As a gross-miscalibration check, assign a synthetic candidate flag independently
of word boundary to 3.5% of the existing sign positions, without changing any
Linear A strings or boundaries.

Twenty independent null corpora were tested with the identical recovery rule.

Result:

`0 / 20 false-positive recoveries`

The 95% exact binomial interval is approximately `0–16.84%`; therefore this small
negative-control run does not precisely estimate a nominal ~1% false-positive
rate. It only shows no obvious tendency for the detector to reward an arbitrary
rare indicator.

## Structural Truncation / Factorization synthetic control

The classifier distinguishes:

- `FACTORIZATION`: short form structurally parents longer family members
- `TRUNCATION`: full form followed by short repeat at the same hierarchy level
- `MIXED`: both signatures
- `INDETERMINATE`: neither diagnostic relation

1,000 canonical synthetic cases of each class were generated with irrelevant
structural noise. Classification was 1,000/1,000 for each class.

This validates classifier **logic**, not real-corpus power. Real structural
discrimination remains sparse because only 2 of the 98 exact prefix relations
co-occur on the same document.

## Unblinding gate

The following conditions are now satisfied:

1. SigLA snapshot frozen and hashed.
2. Clean token extraction validated.
3. v0.7a sparsity amendment locked.
4. Register eligibility frozen.
5. Dependence weighting frozen.
6. Structural classifier synthetic logic validated.
7. Terminal-suffix 10% power hard stop passed.
8. Candidate-blind negative control shows no gross false-positive pathology.

No candidate-specific result has yet been inspected.

The pipeline may now be code-locked before unblinding.

## Code lock

Candidate-blind calibration script: `04_run_blind_calibration.py`

SHA-256: `f19a24af71afd25091734638377f99570a3d370ef3022f1261850dc6a660e6be`

Any modification after candidate unblinding requires a new version and must not replace the confirmatory v0.7b result.
