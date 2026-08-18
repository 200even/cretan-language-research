# Davis 2026 universe-matched v0.2 comparison

**Status:** registered after target unblinding and after Davis's candidate-universe clarification; secondary sensitivity analysis.  
**Original primary experiment:** [`davis-2026-affix-replication.md`](davis-2026-affix-replication.md).  
**Frozen scoring implementation:** [`../scripts/rank-affixes.mjs`](../scripts/rank-affixes.mjs).  
**Frozen upstream corpus:** `mwenge/lineara.xyz` commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.

## New methodological clarification

On 2026-08-18, after supplying the six target affixes, Brent Davis clarified directly by email that his analysis considered only the **50 Linear B main-series syllabograms that have Linear A homomorphs** and did not include untransliterated signs. His inline Table 6.2 supplied the eligible sign set.

The 50 signs are recorded in machine-readable form at [`../data/davis-2026-main-grid-universe.csv`](../data/davis-2026-main-grid-universe.csv). The private email and image are not reproduced in the public repository.

This matters because the frozen v0.2 project ranked **116 signs per edge**, including numbered/untransliterated signs that were not candidates in Davis's analysis.

## Research question

Without changing the frozen v0.2 corpus, filtering, score, weights, or target identities:

> Where do Davis's six affix candidates rank when the already-frozen v0.2 ranking is restricted to the same 50-sign candidate universe Davis says he used?

This is an **apples-to-apples candidate-universe sensitivity analysis**, not a new blind test.

## Procedure fixed before the matched result is inspected

1. Rerun the exact frozen v0.2 implementation with `--exclude-obvious-logograms` against the same pinned upstream corpus.
2. Require the rerun to reproduce:
   - 116 ranked signs per side;
   - `A` prefix rank 1, score 7.841664;
   - `I` prefix rank 4, score 4.659528;
   - `RO` suffix rank 1, score 6.649032;
   - `TE` suffix rank 4, score 4.869416;
   - `RE` suffix rank 7, score 4.240705;
   - `TI` suffix rank 11, score 3.698981.
3. Remove every sign not present in Davis's 50-sign set.
4. **Do not recompute any score.** Preserve the frozen v0.2 order among eligible signs and renumber ranks from 1 to 50.
5. Apply the original numerical cutoffs descriptively: top 2 prefixes and top 4 suffixes.
6. Report this result separately from the frozen primary 3/6 score.

The current `scripts/rank-affixes.mjs` has the same Git blob SHA as the version at the frozen v0.2 research commit (`c8b2a672d6df9cc3b8ceb98eee3febc113541170`), providing an additional implementation-provenance check.

## Interpretation constraints

- The original **3/6 partial conceptual replication remains the primary historical result** and is never redefined.
- The universe-matched result is post-unblinding because Davis's 50-sign restriction became known after his six target identities were known.
- A better matched rank is evidence about candidate-universe comparability, not independent confirmation of an affix.
- No score, threshold, corpus filter, or target set may be changed in response to the matched result.

## Outputs

The workflow persists under `results/davis-universe-matched-v0.2/`:

- `v02-rerun/affix-ranking.csv`
- `v02-rerun/affix-ranking.md`
- `universe-ranking.csv`
- `davis-six-comparison.csv`
- `README.md`
- `PROVENANCE.md`

The evaluator is [`../scripts/evaluate-davis-universe-v02.mjs`](../scripts/evaluate-davis-universe-v02.mjs).
