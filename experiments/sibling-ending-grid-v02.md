# Sibling-ending grid experiment v0.2

**Status:** completed; formal candidate generation plus hostile audit finished.  
**Purpose:** perform a more Kober-like search that does **not** require an attested bare stem before comparing endings.

## Motivation

v0.1 grouped only exact `X ~ X-S` pairs from the frozen v0.5 output. It found seven multi-ending stems but **zero pairs of stems sharing two endings**. Requiring bare `X` to exist is a strong ascertainment constraint and may under-detect paradigms in a sparse corpus.

v0.2 therefore asked:

> Do independently attested sibling forms `X-A`, `X-B`, ... reveal repeated ending contrasts across multiple stems even when bare `X` is unattested?

## Frozen discovery rule

Input is the source-consistent v0.5 secure-word occurrence set, with post-v0.5 source-conflicted normalized forms masked forward.

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

Candidates are ranked descriptively by shared endings, site/scribe spread, and existing manual support, without a composite morphology score.

## Frozen promotion rule

A grid is promoted only if:

- all four core cells are epigraphically/source secure;
- at least three of the four cells receive Tier A/B morphological or strong common-stem status;
- no stronger competing segmentation explains the rectangle;
- the same contrast is not simply one onomastic naming convention restricted to one scribal context unless explicitly classified as derivational/onomastic morphology.

## Generated result

The run used **938** frozen-v0.5 secure occurrences and masked the two explicit post-v0.5 normalized-form failures (`JA-RE`, `QA-*118-SA`). It generated:

- **471** provisional stem-ending cells;
- **33** sibling families with two or more endings;
- exactly **one** two-stem rectangle sharing two endings.

The sole rectangle was:

| provisional stem | `KU` | `MA` |
|---|---|---|
| `TI-TI` | `TI-TI-KU` | `TI-TI-MA` |
| `KU-RU` | `KU-RU-KU` | `KU-RU-MA` |

See `results/sibling-ending-grid-v0.2/`.

## Hostile-audit result

All four forms are source secure, so the rectangle is not a damage artifact.

However, the two rows do not receive equal morphological support:

- **`KU-RU-KU ~ KU-RU-MA`: Tier B sibling family.** Both forms are complete Haghia Triada administrative vocabulary, occur under different scribes, and plausibly share a lexical stem; possible onomastic/derivational morphology remains unresolved.
- **`TI-TI-KU ~ TI-TI-MA`: Tier C / comparison-only.** The forms cross site, chronology, and document class, and HT 96 independently preserves `I-TI-TI-KU-NI`, showing `TI-TI-KU` intact inside a longer morphologically suggestive form. That supplies a competing stem depth/decomposition which one-final-sign stripping cannot resolve.

The grid therefore fails the registered `>=3` Tier-A/B/core-common-stem threshold and is **not promoted**.

Audit: `audits/sibling-grid-TITI-KURU.md`.  
Machine summary: `data/sibling-grid-v02-audit-summary.csv`.

## Main methodological result

Relaxing the bare-stem requirement was worthwhile: seven v0.1 multi-ending stems became 33 sibling families and a single formal 2x2 rectangle appeared. But hostile audit still prevented promotion.

The next grid method should therefore model **nested morphology / competing stem depths** rather than assuming that removing exactly one final sign always finds the linguistically relevant stem.

## Function rule

No grammatical meaning was tested because no grid passed formal promotion.

## Non-claim

This experiment does not establish a Linear A paradigm, translate `KU` or `MA`, or identify a grammatical category or language family.