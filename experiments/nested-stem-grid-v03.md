# Nested stem-depth grid experiment v0.3

**Status:** registered after sibling-ending grid v0.2 failed hostile promotion.  
**Purpose:** test repeated morphological contrasts without assuming that the linguistically relevant boundary is exactly one sign from the word edge.

## Motivation

Two prior grid experiments establish the problem:

- v0.1 required an attested bare stem and found seven multi-ending families but zero two-stem overlaps;
- v0.2 removed the bare-stem requirement and found 33 sibling families plus one 2×2 rectangle, but the rectangle failed because `I-TI-TI-KU-NI` provides a competing deeper segmentation for apparent `TI-TI + KU`.

Thus exact one-sign stripping can detect formal rectangles while cutting through a larger morphological/lexical unit.

## Registered discovery strategy

For every source-retained word, enumerate terminal decompositions at multiple depths while requiring a residual stem of at least two signs:

- one-sign ending: `X-S1`;
- two-sign ending: `X-S1-S2`;
- where attested structure supports it, nested chains such as `P-X-S` are recorded without deciding in advance which layer is grammatical.

The algorithm then searches for **repeated contrasts**, not merely repeated last signs. Example abstractly:

```text
X + A     X + B
Y + A     Y + B
```

where `A` and `B` may each be one- or two-sign terminal sequences, provided the decomposition depth is the same across the two stems.

## Controls

1. source conflicts in `data/v06-form-exclusions.csv` remain excluded;
2. known manual competing decompositions are annotated rather than silently removed;
3. a longer attested form containing a proposed cell intact (for example `I-TI-TI-KU-NI`) is evidence about stem depth and must be surfaced in candidate output;
4. residual stems of fewer than two signs are excluded;
5. no candidate is promoted from edit distance alone.

## Promotion rule

A nested grid requires:

- at least two independent residual stems;
- at least two shared terminal sequences at the same depth;
- all core forms source secure;
- at least three core relationships reaching Tier A/B after hostile audit;
- no stronger decomposition that destroys the shared contrast.

## Statistical follow-up

If any nested grid survives hostile audit, run a separately registered permutation/null model preserving observed word lengths and terminal-sequence frequencies before functional interpretation.

## Non-claim

This experiment searches internal combinatorial structure only. It does not assign grammatical functions, translations, or a language family.