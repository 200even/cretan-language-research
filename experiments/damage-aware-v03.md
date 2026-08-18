# Damage-aware morphology v0.3

**Status:** completed and regression-validated.  
**Upstream corpus:** `mwenge/lineara.xyz` at commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**Primary result directory:** [`../results/damage-aware-v0.3/`](../results/damage-aware-v0.3/).  
**Purpose:** remove damage-created exact morphology pairs before candidate ranking and separate boundary distribution from paradigmatic evidence.

## Research question

The Davis-six first-pass audit found that more than half of the automatic `X ~ affix+X` / `X ~ X+affix` candidates appeared to fail because a relevant word boundary had been flattened in the cleaned computational corpus.

v0.3 asks:

> Can a reproducible damage-aware extraction layer remove known boundary-created false pairs while retaining known secure morphology controls, without hard-coding the individual words into the extraction algorithm?

A second objective is methodological:

> What changes when boundary enrichment and exact-paradigm evidence are reported independently instead of collapsed into one composite morphology score?

## Frozen regression gate

Before the validated run, the repository froze a regression set in [`../data/v03-regression-set.csv`](../data/v03-regression-set.csv).

After correcting one erroneous human label discovered by the experiment itself, the final regression gate contains:

- **19** independently adjudicated damage/insecure-boundary relationships that the extractor must exclude;
- **6** strong secure controls that the extractor must retain.

The secure controls include examples for Davis's `A-`, `I-`, and `-TI` candidates.

The target is strict: all negative controls removed and all secure controls retained.

## Data architecture

v0.1/v0.2 used the convenient upstream `transliteratedWords` field. That representation is searchable but can lose break/damage information.

v0.3 keeps the cleaned words for corpus indexing but derives a separate boundary mask from the GORILA-derived transcription material in the upstream `commentary/*.html` layer.

The boundary-mask builder:

1. reads the inscription transcription table rather than explanatory commentary where a table is available;
2. detects fragment notation immediately adjacent to transliterated sign groups;
3. records the **number of insecure occurrences** of a form within an inscription rather than globally blacklisting that spelling;
4. permits another complete occurrence of the same spelling on the same inscription to survive;
5. applies the mask before exact-pair generation.

Implementation:

- [`../scripts/build-boundary-mask.mjs`](../scripts/build-boundary-mask.mjs)
- [`../scripts/rank-affixes-v03.mjs`](../scripts/rank-affixes-v03.mjs)
- [`../scripts/evaluate-v03-regression.mjs`](../scripts/evaluate-v03-regression.mjs)
- [`.github/workflows/damage-aware-v03.yml`](../.github/workflows/damage-aware-v03.yml)

## Development history preserved by the regression test

The first executable version failed usefully:

- damaged relationships removed: **17/20**;
- secure controls retained: **4/6**.

That exposed three implementation problems:

1. fragment notation such as `]-DI-NA` was not recognized;
2. explanatory prose such as “cf. KA-RU[ on HT 75” could contaminate an otherwise secure `KA-RU` attestation;
3. a binary form-level mask could not represent an inscription such as HT 103, where `DA-KU-SE-NE[` occurs damaged once and `DA-KU-SE-NE` occurs complete elsewhere.

The parser was changed generically rather than patched for those words.

A later run reached:

- **19/20** damage controls removed;
- **6/6** secure controls retained.

The sole apparent failure was `KU-NI ~ KU-NI-TE`. Direct inspection showed that the benchmark label, not the extractor, was wrong: HT 79+83 contains a complete `KU-NI` word. The negative label had generalized from a fragmentary attestation elsewhere. `KU-NI-TE` is complete at KH 92.

The benchmark was therefore corrected rather than forcing the program to satisfy a bad target.

## Final regression result

The corrected frozen gate passes:

> **19/19 known damage-created/insecure relationships excluded; 6/6 secure controls retained.**

See [`../results/damage-aware-v0.3/REGRESSION.md`](../results/damage-aware-v0.3/REGRESSION.md).

This validates v0.3 against the present benchmark for its intended purpose. It does **not** imply that every retained exact string pair is a genuine grammatical paradigm; contextual, onomastic, scribal, and lexical-identity audits remain necessary.

## Corpus effect

v0.3 begins with:

- **1,285** candidate syllabic occurrences after the obvious-logogram filter;
- **931** unique cleaned forms.

After applying the damage/boundary mask:

- **970** complete occurrences remain;
- **315** occurrences are excluded as boundary-insecure;
- **696** unique complete forms remain.

The scale of that reduction explains why damage state cannot be treated as a minor post-processing concern.

## Two independent evidence dimensions

v0.3 deliberately abandons the v0.2 composite ranking.

### Dimension A: boundary enrichment

For each sign, the program reports its enrichment at the relevant word edge relative to internal occurrences.

This dimension continues to recover `RO` strongly:

| element | side | v0.3 boundary rank | edge occurrences | internal occurrences |
|---|---|---:|---:|---:|
| `A` | prefix | **6** | 110 | 12 |
| `I` | prefix | **48** | 48 | 42 |
| `RO` | suffix | **1** | 64 | 7 |
| `TE` | suffix | **31** | 45 | 17 |
| `RE` | suffix | **39** | 47 | 25 |
| `TI` | suffix | **42** | 37 | 31 |
| `ME` | suffix | **4** | 24 | 4 |
| `NE` | suffix | **34** | 22 | 9 |
| `JA` | suffix | **37** | 44 | 21 |

The raw enrichment ranking is informative but clearly **not sufficient as a morphology ranking**. Rare signs with zero internal attestations dominate several top positions even with very small counts. This is now a documented result, not something to be repaired post hoc in v0.3.

A future boundary model should add a separate frequency/significance or support dimension rather than silently retuning this frozen statistic.

### Dimension B: damage-aware exact paradigms

The exact-pair ranking changes the picture dramatically:

#### Prefixes

| rank | sign | secure exact pairs | damage-excluded pairs |
|---:|---|---:|---:|
| **1** | `A` | **6** | 5 |
| 2 | `SI` | 4 | 2 |
| **3** | `I` | **4** | 5 |

The two Davis prefixes therefore remain among the strongest paradigmatic signals after damage correction.

#### Suffixes

| rank | sign | secure exact pairs | damage-excluded pairs |
|---:|---|---:|---:|
| **1** | `JA` | **7** | 1 |
| **2** | `ME` | **4** | 2 |
| **3** | `TI` | **3** | 2 |
| 4 | `RA` | 3 | 3 |
| **5** | `TE` | **3** | 3 |
| 13 | `NE` | 2 | 2 |
| 14 | `RO` | 2 | 2 |
| **33** | `RE` | **1** | 5 |

The ordering within equal pair counts is descriptive and depends partly on the number of damage-excluded pairs; it should not be interpreted as a calibrated probability of affixhood.

## Davis-six interpretation after v0.3

v0.3 does not alter the original pre-registered Davis replication score of **3/6**. That result belongs to the frozen v0.2 experiment.

It does clarify *why* the six behave differently:

- `A-`: high-frequency boundary signal and the strongest secure prefix-paradigm signal;
- `I-`: weak on pure enrichment but strong in secure exact paradigms;
- `-RO`: strongest boundary-enrichment suffix but relatively weak as a clean exact paradigm;
- `-TE`: moderate distributional signal with three secure formal comparisons after correcting `KU-NI`;
- `-RE`: weak exact-pair signal, consistent with the hypothesis that much of its morphology may be onomastic/derivational rather than ordinary bare/extended alternation;
- `-TI`: comparatively weak pure boundary enrichment but strong paradigmatic support.

This confirms the central v0.3 premise: **“morphological evidence” is multidimensional.**

## New high-priority result: final `JA`

The most important non-Davis result is `JA`.

After damage masking, the automatic exact-pair layer retains **seven** complete sign-level relationships:

- `PA-SE ~ PA-SE-JA`
- `A-SE ~ A-SE-JA`
- `*306-TU ~ *306-TU-JA`
- `KU-PA ~ KU-PA-JA`
- `A-MA ~ A-MA-JA`
- `JA-SA ~ JA-SA-JA`
- `PU2-RE ~ PU2-RE-JA`

Only one of the eight original apparent `JA` pairs is removed by the damage layer.

Two of these (`PA-SE ~ PA-SE-JA`, `KU-PA ~ KU-PA-JA`) were already benchmark-positive before v0.3. The five additional complete-form relationships are **not automatically promoted**. They still require the same context, scribal, lexical-class, and onomastic audit applied to Davis's six.

The defensible current statement is:

> **Final `JA` is the strongest additional candidate generated by the damage-aware paradigmatic screen and merits a dedicated full audit.**

This is not yet a claim that `JA` has a particular grammatical meaning, or even that all seven pairs instantiate one productive suffix.

## `ME` and `NE`

`ME` also remains important:

- boundary-enrichment rank: **#4**;
- secure exact pairs: **4**, paradigm rank **#2**.

Its surviving forms include ritual/formulaic material, so lexical-class stratification is essential before promotion.

`NE` is more mixed:

- secure exact pairs: **2**;
- damage-excluded pairs: **2**;
- one existing positive (`*21F-TU ~ *21F-TU-NE`) and one known problematic comparison (`PA-RA ~ PA-RA-NE`) remain enough to keep it useful as a benchmark/control family rather than a straightforward new suffix claim.

## Quantified damage correction

The revised Davis-six first-pass accounting is:

> **19/37 = 51.4%** of the original automatic exact pairs fail specifically because a relevant boundary is damaged or insecure.

The earlier figure of 20/37 (54.1%) was corrected when v0.3 demonstrated that `KU-NI ~ KU-NI-TE` had been wrongly labeled negative. The correction is itself a positive property of the benchmark workflow: computational regression tests can expose erroneous human adjudications as well as corpus artifacts.

## Limitations

1. The boundary mask currently derives primarily from the first transcription table in the upstream GORILA-derived commentary HTML. Non-tabular items use a fallback and deserve independent review.
2. Mapping combined/sided inscription IDs to commentary files remains a corpus-engineering approximation.
3. A complete sign-level `X ~ X-A` relationship is not proof of common lexical identity.
4. The pure boundary-enrichment metric is unstable for very low-frequency signs and should not be interpreted as a calibrated affix score.
5. The corpus remains an exploratory computational substrate, not a replacement for GORILA or SigLA.

## Next registered work

1. audit all seven surviving `JA` pairs with the same standard used for the Davis six;
2. audit the four surviving `ME` pairs;
3. retain `NE` as a mixed positive/negative control and re-audit its surviving pairs;
4. add lexical-class stratification (onomastic/personnel, ritual, ordinary administration);
5. design a separately versioned boundary-evidence statistic that accounts for support/frequency without modifying the frozen v0.3 result;
6. repeat the extraction from an independently encoded SigLA-derived corpus where feasible.

The highest-value immediate experiment is the dedicated `JA` audit. If `JA` retains several independent, contextually credible paradigms under the same controls as Davis's six, that would constitute a specific additional morphology result rather than merely a difference in ranking methodology.

## Post-v0.3 JA audit

The separately completed [final `JA` audit](../audits/JA.md) deliberately leaves the frozen v0.3 output unchanged but demonstrates that `accepted_secure` in v0.3 means **physically boundary-secure in the available upstream layer**, not fully adjudicated morphology.

Of the seven `JA` pairs v0.3 marked secure:

- 2 remain Tier A;
- 2 remain Tier B;
- 1 is comparison-only;
- 2 are rejected.

The two rejections expose failure classes outside v0.3's design:

1. `JA-SA ~ JA-SA-JA`: editorial/cross-face continuation and ritual abbreviation;
2. `PU2-RE ~ PU2-RE-JA`: authoritative fragment boundaries absent from the exploratory source layer.

Therefore v0.3 remains validated for its registered physical-boundary regression task, while v0.4 should extend the benchmark to **segmentation continuity** and **source-coverage provenance**.
