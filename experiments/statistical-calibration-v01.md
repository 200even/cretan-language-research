# Statistical calibration v0.1

**Status:** completed; frozen permutation and exact external-target nulls executed without retuning.  
**Purpose:** quantify how surprising the strongest source-audited structural morphology signals are under null models that preserve important corpus marginals, without changing any discovery score or manual audit tier.

## Targets frozen before simulation

Primary structural targets from the current source-aware corpus:

- prefix `A-`: observed source-retained exact-pair count = **6**;
- prefix `I-`: observed exact-pair count = **4**;
- suffix `-JA`: observed exact-pair count = **5**;
- suffix `-TI`: observed exact-pair count = **3**.

These counts are structural candidate counts, not translations and not probabilities that a sign is a morpheme. Manual promotion remains separate; in particular `JA` has four Tier-A/B families after hostile audit.

The input is frozen v0.5 `secure-word-occurrences.csv`, with the two explicit post-v0.5 normalized-form source failures in `data/v06-form-exclusions.csv` removed before calibration. v0.3-v0.5 rankings and audits are not rewritten.

To match the frozen v0.4/v0.5 exact-pair generator, candidate extended forms must contain **at least three signs**, leaving a residual/base of at least two signs.

## Null N1: length-stratified type-level edge permutation

For each unique retained word type of length >= 3:

- prefix test: hold the residual string after the first sign fixed and permute first signs among word types of the same word length;
- suffix test: hold the residual string before the final sign fixed and permute final signs among word types of the same word length.

The observed retained lexicon is held fixed as the base-form lexicon. After each permutation, a provisional exact pair exists when the fixed residual itself is an observed retained word type.

This preserves:

- the number and lengths of retained candidate word types;
- the set of candidate residual stems;
- the edge-sign frequency distribution within each word length;
- the observed base lexicon used to determine exact extensions.

It destroys the association between a particular residual stem and a particular edge sign, which is the null being tested.

## Null N2: site-stratified sensitivity model

A second permutation uses unique `(site, word form)` records for forms of length >= 3. Edge signs are permuted within `(site, word length)` strata while residual strings remain fixed. Exact pairs are deduplicated globally after permutation and checked against the same observed retained base lexicon.

N2 is a sensitivity analysis intended to preserve coarse geographic/documentary clustering. Sparse strata reduce randomization freedom, so it is reported separately from N1 rather than replacing it.

## Statistics

For each target sign and side, report:

1. observed unique exact-pair count;
2. mean and quantiles of the null count;
3. empirical one-sided p-value `P(null >= observed)` using `(extreme + 1)/(iterations + 1)`;
4. family-wise/max-sign empirical p-value: in each permutation record the maximum exact-pair count attained by any edge sign on that side and compare that maximum with the target observed count.

The max-sign value is deliberately conservative and addresses the fact that morphology discovery examined many signs.

## Simulation parameters

- deterministic PRNG seed: `20260818`;
- **50,000 permutations** for N1;
- **50,000 permutations** for N2;
- no adaptive stopping;
- no retuning after seeing results.

## Results

| target | observed | N1 p | N1 max-sign p | N2 p | N2 max-sign p |
|---|---:|---:|---:|---:|---:|
| `A-` | 6 | 0.233315 | 0.259135 | 0.161937 | 0.211356 |
| `I-` | 4 | 0.091918 | 0.857883 | 0.170137 | 0.891902 |
| `-JA` | 5 | 0.080098 | 0.328313 | 0.057959 | 0.518390 |
| `-TI` | 3 | 0.214556 | 0.996800 | 0.145517 | 0.999020 |

No internal target reaches conventional significance under either max-sign calibration. `JA` is the strongest target-specific internal signal but remains non-significant after accounting for the many-sign discovery search. This does **not** reverse the manual finding that `JA` is the strongest productive morphology candidate; it says raw structural pair count alone is not statistically exceptional enough under these nulls to carry that conclusion independently of epigraphic audit.

## Davis external-target calibration

Separately from the corpus permutations, an exact combinatorial null was calculated for the frozen Davis cutoff experiment.

Under a uniform external-target-placement null:

- two prefix targets are drawn without replacement from the prefix candidate universe;
- four suffix targets are drawn without replacement from the suffix candidate universe;
- success is the number landing inside the preregistered top-2 prefix and top-4 suffix cutoffs.

Results:

| comparison | observed | exact p(total hits >= observed) | exact p(side-pattern >= observed) |
|---|---:|---:|---:|
| primary frozen 116-sign v0.2 | 3/6 | **0.00026062810** | **0.00018098442** |
| post-unblinding 49-sign universe-matched sensitivity | 4/6 | **0.000097188151** | **0.000024565935** |

The primary 116-sign result is the confirmatory comparison that was frozen before Davis's six identities were known. The 49-sign result remains explicitly post-unblinding and cannot replace the primary 3/6 replication score.

The Davis result is therefore much more statistically unusual under its stated null than any one internally discovered exact-pair count. That distinction should remain central: **independent external replication and internal candidate discovery are different evidence classes.**

## Interpretation boundaries

A small permutation p-value means the structural exact-pair concentration is difficult to obtain by randomized edge assignment under the stated null. It does **not** establish grammatical function, translation, language family, or independence from every possible corpus/editorial process.

The Davis external-target p-value likewise calibrates ranking agreement under a uniform-placement null; it does not imply that the six affixes are semantically understood or that Linear A is deciphered.

## Reproducibility

Implementation: `scripts/statistical-calibration-v01.mjs`  
Generated results: `results/statistical-calibration-v0.1/`  
Seed: `20260818`  
Iterations: 50,000 per side/model.