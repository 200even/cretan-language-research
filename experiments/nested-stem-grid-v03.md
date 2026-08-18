# Nested stem-depth grid experiment v0.3

**Status:** completed; no new promotable grid recovered.  
**Purpose:** test repeated morphological contrasts without assuming that the linguistically relevant boundary is exactly one sign from the word edge.

## Motivation

Two prior grid experiments established the problem:

- v0.1 required an attested bare stem and found seven multi-ending families but zero two-stem overlaps;
- v0.2 removed the bare-stem requirement and found 33 sibling families plus one 2×2 rectangle, but hostile audit rejected promotion because `I-TI-TI-KU-NI` provides a competing deeper segmentation for apparent `TI-TI + KU`.

Thus exact one-sign stripping can detect formal rectangles while cutting through a larger morphological/lexical unit.

## Registered discovery strategy

For every source-retained word, v0.3 enumerated terminal decompositions at depths one and two while requiring a residual stem of at least two signs:

- one-sign terminal: `X-S1`;
- two-sign terminal: `X-S1-S2`.

It searched only for repeated contrasts at the same depth across two independent residual stems. Longer retained words containing a proposed cell intact were surfaced as competing stem-depth warnings.

## Controls

1. source conflicts in `data/v06-form-exclusions.csv` were excluded;
2. known manual competing decompositions were annotated rather than silently removed;
3. longer-form containment was reported explicitly;
4. residual stems shorter than two signs were excluded;
5. no candidate was promoted from edit distance alone.

## Generated result

After the explicit post-v0.5 form exclusions, the run contained:

- **936** usable secure occurrences;
- **679** candidate cells across terminal depths 1-2;
- **48** multi-terminal families;
- **1** two-stem repeated-terminal grid.

No depth-2 grid exists. The sole grid is the same depth-1 rectangle found in v0.2:

| provisional stem | `KU` | `MA` |
|---|---|---|
| `TI-TI` | `TI-TI-KU` | `TI-TI-MA` |
| `KU-RU` | `KU-RU-KU` | `KU-RU-MA` |

v0.3 automatically marks `TI-TI-KU` as nested because it occurs intact inside the longer retained `I-TI-TI-KU-NI`.

Generated results: `results/nested-stem-grid-v0.3/`.

## Promotion result

The only rectangle had already failed the v0.2 hostile audit:

- `KU-RU-KU ~ KU-RU-MA`: Tier B possible derivational/onomastic sibling family;
- `TI-TI-KU ~ TI-TI-MA`: Tier C comparison-only with competing stem-depth evidence.

The registered grid threshold is therefore not met. **No Kober-style paradigm grid is currently established.**

## Stop rule / consequence

Three increasingly permissive grid formulations have now been tested without producing a promotable replicated paradigm:

1. bare-stem exact-pair matrix: zero two-stem overlaps;
2. one-sign sibling endings without bare stems: one rectangle, rejected on audit;
3. one- and two-sign nested terminals: no additional rectangle.

Do not continue increasing segmentation freedom merely to force a grid. The next research milestone is **statistical calibration of the morphology signals already recovered**, followed by replication against an independently encoded corpus where feasible.

## Non-claim

This experiment does not establish a Linear A paradigm, grammatical function, translation, or language family.