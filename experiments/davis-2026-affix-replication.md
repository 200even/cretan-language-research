# Replication: Davis 2026 Linear A affix analysis

**Status:** unblinded; partial conceptual replication under the pre-registered cutoff.  
**Registered:** 2026-08-16.  
**Unblinded:** 2026-08-17, after the blind v0.1 and v0.2 artifacts were frozen.  
**Target:** Brent Davis, *The Undeciphered Aegean Scripts* (Cambridge University Press, 2026), Chapter 4, “Linear A Morphology,” pp. 171–204.

## Question

Can an independently specified sign-edge analysis of a frozen Linear A corpus recover the same small set of likely affixes identified by Davis's refinement of Packard's statistical method?

This is a **conceptual replication**, not a line-by-line reimplementation of Davis's calculation. Our ranking combines word-edge enrichment with a modest bonus for apparent exact whole-word extensions. Davis's method was not available in full when the experiment was registered.

## Blinding and provenance

Before the first full-corpus output was generated:

- Davis's six sign identities were not known to the project;
- they were not entered into code, benchmark data, or scoring rules;
- weights were not tuned toward any desired sign;
- no semantic or external-language information was used in the score.

The blind outputs were frozen in GitHub Actions before unblinding.

On 2026-08-17, after the artifacts were frozen, Brent Davis supplied the six identities directly by email in response to a request for the information. The private email itself is not reproduced in this repository; only the six research targets needed for replication are recorded.

Davis's candidates are:

- prefixes: `A-`, `I-`;
- suffixes: `-RE`, `-RO`, `-TE`, `-TI`.

Machine-readable comparison: [`../data/davis-2026-unblinding.csv`](../data/davis-2026-unblinding.csv).

## Frozen corpus

Primary exploratory corpus:

- `mwenge/lineara.xyz`;
- commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`;
- file `LinearAInscriptions.js`.

A later SigLA-derived run should be treated as an independent corpus-version replication.

## Frozen scoring rule

For every sign `S`, separately at word beginnings and endings, the v0.1/v0.2 analysis calculated:

1. boundary occurrence count;
2. internal occurrence count;
3. log2 boundary enrichment with a 0.5 continuity correction;
4. number of apparent exact whole-word extensions `X ~ S-X` or `X ~ X-S`.

The frozen score was:

`score = boundary_enrichment + 0.75 * log2(1 + exact_extension_pairs) + 0.25 * log2(1 + boundary_count)`

Implementation: [`../scripts/rank-affixes.mjs`](../scripts/rank-affixes.mjs).

## v0.1 and v0.2

The original v0.1 mechanical filter retained 1,347 tokens and 966 unique forms. It exposed obvious logogram contamination because labels such as `VIN`, `CYP`, and `VS` could occur inside hyphenated upstream strings.

The separately versioned v0.2 sensitivity analysis excluded a conservative list of obvious logogram labels while leaving the scoring rule unchanged. It retained:

- **1,284 tokens**;
- **930 unique forms**;
- **116 ranked signs** on each edge.

The Davis comparison below uses the cleaner frozen **v0.2** ranking.

## Pre-registered evaluation

Before unblinding, the protocol specified:

- compare Davis's **2 prefixes** with our frozen **top 2 prefix candidates**;
- compare Davis's **4 suffixes** with our frozen **top 4 suffix candidates**;
- classify 5–6/6 as strong, 3–4/6 as partial, and 0–2/6 as weak/non-replication.

These categories are descriptive, not inferential p-values.

## Unblinded result

### Prefixes

| Davis candidate | frozen v0.2 rank | score | inside pre-registered top 2? |
|---|---:|---:|---|
| `A-` | **1 / 116** | 7.842 | **yes** |
| `I-` | **4 / 116** | 4.660 | no |

Prefix cutoff overlap: **1/2**.

### Suffixes

| Davis candidate | frozen v0.2 rank | score | inside pre-registered top 4? |
|---|---:|---:|---|
| `-RO` | **1 / 116** | 6.649 | **yes** |
| `-TE` | **4 / 116** | 4.869 | **yes** |
| `-RE` | **7 / 116** | 4.241 | no |
| `-TI` | **11 / 116** | 3.699 | no |

Suffix cutoff overlap: **2/4**.

### Pre-registered score

Total exact cutoff overlap: **3/6**.

Under the categories fixed before unblinding, this is a **partial conceptual replication**.

## Later candidate-universe clarification (2026-08-18)

After the primary result was frozen and unblinded, Davis clarified directly that his statistical analysis admitted only **50 Linear B main-series syllabograms with Linear A homomorphs** and did not admit untransliterated signs. The original project ranking had admitted 116 observed signs per edge.

A separately registered post-unblinding sensitivity analysis therefore filters the **unchanged v0.2 scores** to Davis's stated candidate universe. It finds:

- `A-`: rank 1 → **1**;
- `I-`: rank 4 → **2**;
- `RO`: rank 1 → **1**;
- `TE`: rank 4 → **4**;
- `RE`: rank 7 → **7**;
- `TI`: rank 11 → **10**.

The corresponding cutoff overlap is **4/6 = 2/2 prefixes + 2/4 suffixes**. Under the categories registered for this experiment, 4/6 remains a **partial conceptual replication**.

This secondary result does **not** replace the primary 3/6 score because the candidate-universe restriction was learned after target unblinding. It does show that the original miss on `I-` was partly caused by candidate-universe mismatch: the signs ranked #2 and #3 ahead of it (`*86`, `*306`) were ineligible under Davis's stated method.

The frozen v0.2 corpus directly contains 49 of Davis's 50 labels; `QI` has no ranking row. No post-hoc `QI` ↔ numbered-sign crosswalk is imposed.

Full protocol and outputs: [`davis-2026-universe-matched-v02.md`](davis-2026-universe-matched-v02.md) and [`../results/davis-universe-matched-v0.2/`](../results/davis-universe-matched-v0.2/).

## A stronger descriptive pattern, reported separately

The cutoff score is the primary result and is not changed after seeing Davis's targets.

However, the full ranks contain an additional descriptive observation:

- `A`: rank 1, top 0.9% of prefix ranks;
- `I`: rank 4, top 3.4%;
- `RO`: rank 1, top 0.9% of suffix ranks;
- `TE`: rank 4, top 3.4%;
- `RE`: rank 7, top 6.0%;
- `TI`: rank 11, top 9.5%.

Thus **all six Davis candidates fall within the top 10% of the corresponding 116-sign rankings**, and five of six are rank 7 or better.

This is encouraging convergence, but the top-10% observation was not a pre-registered success criterion and must not replace the 3/6 primary score.

## What the disagreements tell us

Our top four suffixes were:

1. `RO`;
2. `JA`;
3. `ME`;
4. `TE`.

Davis's suffix set is:

- `RE`;
- `RO`;
- `TE`;
- `TI`.

Therefore `JA` and `ME` outrank Davis candidates `RE` and `TI` under our score.

That difference is scientifically useful. Our score rewards exact apparent extensions as well as edge enrichment. It is not simply a reconstruction of Davis's Packard-style statistic. Future work should determine whether `JA` and `ME` are:

- genuine morphology emphasized by our pair-sensitive score;
- formulaic/onomastic/genre effects;
- artifacts of corpus representation;
- or signals that Davis's narrower top-four cutoff intentionally excludes.

Likewise, Davis's `RE` and `TI` may be better detected by his distributional statistic than by ours.

## The `RO` result clarifies the benchmark's role

`RO` is especially informative.

It is:

- Davis's suffix candidate;
- our **#1 blind suffix candidate**;
- yet poorly supported by our automatically generated exact minimal pairs after epigraphic audit.

The four raw `X ~ X-RO` pairs resolved as:

| automatic pair | audit outcome |
|---|---|
| `KI-DA ~ KI-DA-RO` | rejected: apparent base fragmentary |
| `DI-NA ~ DI-NA-RO` | rejected: apparent base fragmentary |
| `SA-MA ~ SA-MA-RO` | reclassified: likely onomastic/lexical comparison |
| `A-DA ~ A-DA-RO` | Tier B candidate |

See [`../audits/RO.md`](../audits/RO.md).

This is **not a contradiction** of Davis's identification of `RO` as a suffix candidate. It demonstrates that two questions must be kept distinct:

1. **Is a sign strongly enriched at a word boundary?**
2. **Do apparent whole-word minimal pairs provide clean epigraphic evidence for the same morphology?**

A sign can score strongly on the first while many superficially supporting pairs fail the second.

## The `TI` result shows the converse

`TI` is Davis's suffix candidate but only rank **11** in our global suffix ranking. At the same time, the benchmark contains a strong local formal relationship:

`DA-KU-SE-NE ~ DA-KU-SE-NE-TI`

That pair survives as Tier A formal evidence across scribes.

So a suffix can have a relatively modest global edge rank while possessing strong local paradigm evidence.

Together, `RO` and `TI` support the benchmark's central design principle: **distributional evidence and epigraphically audited paradigm evidence are complementary, not interchangeable.**

## Corpus-engineering result

The first `RO` audit also identified a high-impact failure mode:

> cleaned transliteration fields can flatten damage/boundary information and manufacture exact morphological pairs.

The next extractor should attach an explicit damage/boundary mask from raw sign records or an independently encoded specialist corpus before exact-pair scoring.

## Next experiments

The unblinding changes the priority order.

1. **Audit `RE` and `TE` first**, because they are Davis suffixes and our pipeline independently generated multiple exact-pair candidates for each.
2. **Audit `I-`**, Davis's second prefix and our rank #4 candidate.
3. **Audit `A-`**, Davis's first prefix and our rank #1 candidate, with special attention to the 11 apparent exact prefix pairs.
4. **Audit `TI` beyond the known `DA-KU-SE-NE` pair** to determine why a Davis suffix ranks only #11 globally.
5. **Audit `JA` and `ME` as disagreement cases**, because they outrank two Davis suffixes under our scoring rule.
6. Build the damage-aware corpus layer and repeat the ranking.
7. Reimplement Davis's exact Packard refinement if the chapter/data become available.
8. Repeat the experiment against an independently encoded SigLA-derived corpus.

## Interpretation

This experiment does **not** independently prove that all six signs are grammatical affixes. It shows that a separately designed and frozen analysis, using a different scoring rule, places all six of Davis's candidates unusually high and reproduces three inside its stricter pre-registered cutoffs.

The most important outcome is methodological convergence:

> two independently specified approaches are detecting substantially the same word-edge structure in Linear A, while disagreeing enough to create useful test cases for the benchmark.

That is a stronger foundation for future grammatical work than selecting candidate affixes after inspecting published answers.
