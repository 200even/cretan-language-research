# Statistical calibration v0.1

Input: frozen v0.5 secure occurrences minus 2 explicit post-v0.5 normalized-form source exclusions. Active occurrences: **936**; active unique forms: **670**.

Permutation seed: **20260818**. Iterations: **50,000 per side/model**.

## Edge-permutation results

| target | observed | N1 null mean | N1 p | N1 max-sign p | N2 null mean | N2 p | N2 max-sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| A- | 6 | 4.228100 | 0.233315 | 0.259135 | 3.874000 | 0.161937 | 0.211356 |
| I- | 4 | 1.805080 | 0.091918 | 0.857883 | 2.260500 | 0.170137 | 0.891902 |
| -JA | 5 | 2.479920 | 0.080098 | 0.328313 | 2.280420 | 0.057959 | 0.518390 |
| -TI | 3 | 1.640400 | 0.214556 | 0.996800 | 1.383400 | 0.145517 | 0.999020 |

`p` is the target-specific empirical tail probability. `max-sign p` compares the observed target count to the maximum count attained by **any** sign in each permutation and is the conservative multiple-search calibration.

N1 permutes edge signs among unique word types within word length. N2 repeats the test on unique site/form records within site + word-length strata. The observed base lexicon and residual stems remain fixed.

## Davis external-target placement null

| comparison | universe | observed cutoff hits | exact p(total >= observed) | exact p(side pattern >= observed) |
|---|---:|---:|---:|---:|
| primary-frozen-v0.2 | 116 | 3/6 (1/2 prefix, 2/4 suffix) | 0.00026062810 | 0.00018098442 |
| post-unblinding-universe-matched | 49 | 4/6 (2/2 prefix, 2/4 suffix) | 0.000097188151 | 0.000024565935 |

The 116-sign result is the frozen primary experiment. The 49-sign result is a **post-unblinding sensitivity analysis** after Davis clarified his eligible sign universe; it does not replace the primary 3/6 score.

## Interpretation boundary

These nulls calibrate formal concentration only. They do not convert a structural candidate into a translation or grammatical function, and they do not supersede inscription-level audit. Manual survival remains a separate evidence dimension.
