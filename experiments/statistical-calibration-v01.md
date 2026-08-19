# Statistical calibration v0.1

**Status:** preregistered before the first permutation run.  
**Purpose:** quantify how surprising the strongest source-audited structural morphology signals are under null models that preserve important corpus marginals, without changing any discovery score or manual audit tier.

## Targets frozen before simulation

Primary structural targets from the current source-aware corpus:

- prefix `A-`: observed source-retained exact-pair count = **6**;
- prefix `I-`: observed exact-pair count = **4**;
- suffix `-JA`: observed exact-pair count = **5**;
- suffix `-TI`: observed exact-pair count = **3**.

These counts are structural candidate counts, not translations and not probabilities that a sign is a morpheme. Manual promotion remains separate; in particular `JA` has four Tier-A/B families after hostile audit.

The input is frozen v0.5 `secure-word-occurrences.csv`, with the two explicit post-v0.5 normalized-form source failures in `data/v06-form-exclusions.csv` removed before calibration. v0.3-v0.5 rankings and audits are not rewritten.

## Null N1: length-stratified type-level edge permutation

For each unique retained word type of length >= 2:

- prefix test: hold the residual string after the first sign fixed and permute first signs among word types of the same word length;
- suffix test: hold the residual string before the final sign fixed and permute final signs among word types of the same word length.

The observed retained lexicon is held fixed as the base-form lexicon. After each permutation, a provisional exact pair exists when the fixed residual itself is an observed retained word type.

This preserves:

- the number and lengths of retained word types;
- the set of candidate residual stems;
- the edge-sign frequency distribution within each word length;
- the observed base lexicon used to determine exact extensions.

It destroys the association between a particular residual stem and a particular edge sign, which is the null being tested.

## Null N2: site-stratified sensitivity model

A second permutation uses unique `(site, word form)` records. Edge signs are permuted within `(site, word length)` strata while residual strings remain fixed. Exact pairs are deduplicated globally after permutation and checked against the same observed retained base lexicon.

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

## Davis external-target calibration

Separately from the corpus permutations, calculate an exact combinatorial null for the frozen Davis cutoff experiment.

Under a uniform external-target-placement null:

- two prefix targets are drawn without replacement from the prefix candidate universe;
- four suffix targets are drawn without replacement from the suffix candidate universe;
- success is the number landing inside the preregistered top-2 prefix and top-4 suffix cutoffs.

Report:

- primary frozen 116-sign experiment: observed **3/6** cutoff hits;
- post-unblinding universe-matched 49-observed-sign sensitivity: observed **4/6** cutoff hits.

The second result remains explicitly post-unblinding and cannot replace the primary replication score.

## Interpretation boundaries

A small permutation p-value means the structural exact-pair concentration is difficult to obtain by randomized edge assignment under the stated null. It does **not** establish grammatical function, translation, language family, or independence from every possible corpus/editorial process.

If N1 and N2 disagree materially, report the disagreement rather than selecting the more favorable model.

## Reproducibility

The implementation will live in `scripts/statistical-calibration-v01.mjs`; generated output will be written to `results/statistical-calibration-v0.1/`.