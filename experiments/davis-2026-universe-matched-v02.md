# Davis 2026 universe-matched v0.2 comparison

**Status:** completed; secondary post-unblinding sensitivity analysis.  
**Original primary experiment:** [`davis-2026-affix-replication.md`](davis-2026-affix-replication.md).  
**Frozen scoring implementation:** [`../scripts/rank-affixes.mjs`](../scripts/rank-affixes.mjs).  
**Frozen upstream corpus:** `mwenge/lineara.xyz` commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.

## New methodological clarification

On 2026-08-18, after supplying the six target affixes, Brent Davis clarified directly by email that his analysis considered only the **50 Linear B main-series syllabograms that have Linear A homomorphs** and did not include untransliterated signs. His inline Table 6.2 supplied the eligible sign set.

The 50 signs are recorded in machine-readable form at [`../data/davis-2026-main-grid-universe.csv`](../data/davis-2026-main-grid-universe.csv). The private email and image are not reproduced in the public repository.

This matters because the frozen v0.2 project ranked **116 signs per edge**, including numbered/untransliterated signs that were not candidates in Davis's analysis.

## Research question

Without changing the frozen v0.2 corpus, filtering, score, weights, or target identities:

> Where do Davis's six affix candidates rank when the already-frozen v0.2 ranking is restricted to the candidate universe Davis says he used?

This is an **apples-to-apples candidate-universe sensitivity analysis**, not a new blind test.

## Procedure registered before inspecting the matched result

1. Rerun the exact frozen v0.2 implementation with `--exclude-obvious-logograms` against the same pinned upstream corpus.
2. Require the rerun to reproduce:
   - 116 ranked signs per side;
   - `A` prefix rank 1, score 7.841664;
   - `I` prefix rank 4, score 4.659528;
   - `RO` suffix rank 1, score 6.649032;
   - `TE` suffix rank 4, score 4.869416;
   - `RE` suffix rank 7, score 4.240705;
   - `TI` suffix rank 11, score 3.698981.
3. Remove signs not present in Davis's 50-sign set.
4. **Do not recompute any frozen score.** Preserve the frozen v0.2 order among directly comparable eligible signs.
5. Apply the original numerical cutoffs descriptively: top 2 prefixes and top 4 suffixes.
6. Report this result separately from the frozen primary 3/6 score.

The current `scripts/rank-affixes.mjs` has the same Git blob SHA as the version at the frozen v0.2 research commit (`c8b2a672d6df9cc3b8ceb98eee3febc113541170`), providing an additional implementation-provenance check.

## Source-artifact verification

The calculation was also checked against the original frozen GitHub Actions artifact rather than relying only on a new rerun:

- workflow run: `31989509427`
- artifact: `blind-affix-ranking-v0.2-logogram-filter`
- artifact ID: `9274844052`
- artifact SHA-256: `bef4dad8dbb3ef7cb1b78cd0e0d960d0033492ab618105705e8b20ae382d1f18`

This independently confirms the source ranks and scores used below.

## Corpus-label compatibility discovered during execution

The frozen v0.2 ranking contains direct label matches for **49 of Davis's 50 eligible signs**. `QI` does not receive a row in the frozen ranking because the scorer only emitted signs observed in its retained corpus.

No score was invented for `QI`. In particular, the project does **not** silently identify `QI` with a numbered sign such as `*21F`, even though such a transliteration correspondence may be relevant in specialist practice. That would require a separately justified palaeographic crosswalk.

This implementation clarification does not depend on the six target outcomes: all six Davis affix candidates are among the 49 directly comparable labels. The top-2/top-4 test is therefore evaluable without remapping `QI`.

Machine-readable unscored entry: [`../results/davis-universe-matched-v0.2/eligible-but-unscored.csv`](../results/davis-universe-matched-v0.2/eligible-but-unscored.csv).

## Completed result

| side | Davis sign | frozen v0.2 rank /116 | matched rank among 49 directly observed eligible labels | unchanged score | cutoff | inside cutoff? |
|---|---|---:|---:|---:|---:|---|
| prefix | `A` | 1 | **1** | 7.841664 | 2 | **yes** |
| prefix | `I` | 4 | **2** | 4.659528 | 2 | **yes** |
| suffix | `RO` | 1 | **1** | 6.649032 | 4 | **yes** |
| suffix | `TE` | 4 | **4** | 4.869416 | 4 | **yes** |
| suffix | `RE` | 7 | **7** | 4.240705 | 4 | no |
| suffix | `TI` | 11 | **10** | 3.698981 | 4 | no |

### Cutoff score

- frozen primary comparison: **3/6** = prefixes 1/2 + suffixes 2/4;
- universe-matched sensitivity comparison: **4/6** = prefixes **2/2** + suffixes 2/4.

Under the descriptive categories registered for the original experiment, both 3/6 and 4/6 fall in the **partial conceptual replication** band.

The primary historical score is still **3/6**. It is not retroactively changed to 4/6.

## Why `I-` changes

The frozen v0.2 prefix ranking began:

1. `A`
2. `*86`
3. `*306`
4. `I`

Davis's clarification explicitly excludes untransliterated signs from his candidate universe. `*86` and `*306` are therefore ineligible for the universe-matched comparison, moving `I` from rank 4 to **rank 2** without changing its score or any corpus statistic.

This is the only cutoff change.

## Why the suffix score does not change

The frozen top four suffixes were already:

1. `RO`
2. `JA`
3. `ME`
4. `TE`

All four are members of Davis's stated 50-sign universe. Therefore the suffix cutoff remains 2/4 against Davis's `RE`, `RO`, `TE`, `TI` set.

`RE` remains rank **7**. `TI` improves from rank **11** to **10** after one intervening ineligible sign is removed, but remains outside the top four.

## Interpretation constraints

- The original **3/6 partial conceptual replication remains the primary historical result** and is never redefined.
- The universe-matched **4/6** result is post-unblinding because Davis's 50-sign restriction became known after his six target identities were known.
- The stronger prefix result indicates that the original miss on `I-` was partly a **candidate-universe mismatch**, not necessarily a disagreement in its underlying score.
- A better matched rank is evidence about methodological comparability, not independent proof that a sign is a grammatical affix.
- No score, threshold, corpus filter, or target set was changed in response to the result.

## Outputs

The workflow persists under [`../results/davis-universe-matched-v0.2/`](../results/davis-universe-matched-v0.2/):

- `v02-rerun/affix-ranking.csv`
- `v02-rerun/affix-ranking.md`
- `universe-ranking.csv`
- `eligible-but-unscored.csv`
- `davis-six-comparison.csv`
- `README.md`
- `PROVENANCE.md`

The evaluator is [`../scripts/evaluate-davis-universe-v02.mjs`](../scripts/evaluate-davis-universe-v02.mjs).
