# Sibling-ending grid experiment v0.2

**Status:** preregistered after the v0.1 stem × ending matrix returned zero two-stem overlaps.  
**Purpose:** perform a more Kober-like search that does **not** require an attested bare stem before comparing endings.

## Motivation

v0.1 grouped only exact `X ~ X-S` pairs from the frozen v0.5 output. It found seven multi-ending stems but **zero pairs of stems sharing two endings**. Requiring bare `X` to exist is a strong ascertainment constraint and may under-detect paradigms in a sparse corpus.

v0.2 therefore asks:

> Do independently attested sibling forms `X-A`, `X-B`, ... reveal repeated ending contrasts across multiple stems even when bare `X` is unattested?

## Frozen discovery rule

Input is the source-consistent v0.5 secure-word occurrence set, with post-v0.5 source-conflicted forms in `data/v06-regression-backlog.csv` masked forward.

For every retained syllabic word with at least **three signs**:

1. treat the final sign as a provisional ending;
2. treat all preceding signs as a provisional stem, requiring at least **two signs**;
3. a stem enters the sibling-family set only if it occurs with at least **two distinct final signs**;
4. identical word forms are deduplicated for family structure, while occurrence/site/scribe support is retained separately.

This is candidate generation only. The algorithm does not assert that the final sign is actually a morpheme.

## Grid discovery rule

For every pair of sibling-family stems, compute the intersection of their final-sign sets.

A **formal grid candidate** requires:

- at least two independent stems;
- at least two shared final signs;
- therefore at least four source-retained word forms forming a 2×2 rectangle;
- no cell masked by a known source-conflict control.

Candidates are ranked descriptively by:

1. number of shared endings;
2. number of distinct sites across the four-plus cells;
3. number of distinct scribes where available;
4. existing manual Tier A/B support, reported separately rather than folded into one score.

## Promotion rule

No formal grid becomes morphology automatically. Every cell in the highest-ranked grids must undergo hostile inscription-level audit.

A grid is promoted only if:

- all four core cells are epigraphically/source secure;
- at least three of the four cells receive Tier A/B morphological or strong common-stem status;
- no stronger competing segmentation explains the rectangle;
- the same contrast is not simply one onomastic naming convention restricted to one scribal context unless explicitly classified as derivational/onomastic morphology.

## Function rule

Even a promoted 2×2 grid does not identify grammatical meaning. Case/number/person/etc. are tested only afterward by contextual prediction.

## Negative controls

Known fragment, continuation, logogram, cross-script, normalized/source-divergence, and source-limited failures remain visible and excluded from promotion.

## Non-claim

This is a combinatorial morphology experiment, not a decipherment or translation procedure.