# Linear A Morphology Benchmark

**A reproducible, epigraphically audited framework for testing morphological claims in Linear A.**

Linear A remains undeciphered. This repository does not propose a decipherment or identify the underlying Minoan language. It addresses a narrower prerequisite:

> **When two Linear A sign groups look morphologically related, how strong is the evidence that the relationship is real?**

The project combines automated candidate discovery with inscription-level audit. Positive results, false positives, damaged readings, onomastic families, scribal confounds, and failed hypotheses are preserved so that morphology claims can be reproduced and challenged rather than selected retrospectively.

## Core rule

**Discovery is computational. Promotion is epigraphic.**

A candidate does not become evidence for morphology until its forms, boundaries, damage state, provenance, lexical identity, and context have been audited.

## Current headline results

### Current discovery substrate: structural-aware v0.4

v0.4 extends the validated damage-aware extractor with type/source controls for **editorial continuation, complex-logogram flattening, cross-script contamination, and authoritative source corrections**. Lexical/onomastic warnings are annotated separately rather than used as hidden exclusions.

The frozen expanded regression gate passes:

> **26/26 structural/source negatives excluded; 11/11 secure controls retained.**

The run begins with 1,285 candidate syllabic occurrences and retains **951** after structural/type/source masking. The new extractor automatically reproduces several conclusions that previously required manual audit:

- final `JA`: 7 v0.3 apparent pairs → **5** v0.4 structural pairs; both manually rejected false pairs disappear automatically;
- final `ME`: 4 → **1**, matching the completed manual source/type audit;
- final `NE`: 2 structural pairs remain, but one is explicitly flagged onomastic, leaving the Tier-A `*21F-TU` family as the clean core.

Top v0.4 suffixes by structural exact paradigms are `JA` (5), `TI` (3), `RA` (3), and `TE` (3). These are candidate-generation counts, not probabilities or translations.

Experiment: [`experiments/structural-aware-v04.md`](experiments/structural-aware-v04.md)  
Generated results: [`results/structural-aware-v0.4/`](results/structural-aware-v0.4/)  
Regression: [`results/structural-aware-v0.4/REGRESSION.md`](results/structural-aware-v0.4/REGRESSION.md)

### 1. Damage-aware v0.3 passes its benchmark

The first large-scale exact-pair method was contaminated by normalized words whose damaged boundaries had disappeared. The Davis-six audit initially found that more than half of its apparent exact pairs were affected.

v0.3 restores an independent boundary mask **before** pair generation and keeps boundary-distribution evidence separate from exact-paradigm evidence.

Its frozen regression gate now passes:

> **19/19 known damage-created or insecure relationships removed; 6/6 strong secure controls retained.**

The validated run starts with 1,285 candidate syllabic occurrences and retains 970 complete occurrences after boundary masking.

Experiment: [`experiments/damage-aware-v03.md`](experiments/damage-aware-v03.md)  
Generated results: [`results/damage-aware-v0.3/`](results/damage-aware-v0.3/)  
Regression: [`results/damage-aware-v0.3/REGRESSION.md`](results/damage-aware-v0.3/REGRESSION.md)

### 2. Independent partial replication of Davis 2026

The first affix-ranking experiment was frozen **before** the identities of Brent Davis's six 2026 morphology candidates were known to this project.

Davis subsequently supplied the target set directly:

- prefixes: **`A-`, `I-`**
- suffixes: **`-RE`, `-RO`, `-TE`, `-TI`**

The frozen v0.2 ranks were:

| Davis candidate | blind rank |
|---|---:|
| `A-` | **1 / 116** |
| `I-` | **4 / 116** |
| `-RO` | **1 / 116** |
| `-TE` | **4 / 116** |
| `-RE` | **7 / 116** |
| `-TI` | **11 / 116** |

The pre-registered top-2-prefix / top-4-suffix comparison yields **3/6 exact cutoff overlap**, classified in advance as a **partial conceptual replication**. That score remains frozen; v0.3 does not rewrite it.

**Post-unblinding universe-matched sensitivity analysis.** On 2026-08-18 Davis clarified that his analysis considered only 50 Linear B main-series syllabograms with Linear A homomorphs and excluded untransliterated signs. Restricting the unchanged frozen v0.2 scores to the directly comparable members of that universe moves `I-` from rank 4 to **rank 2**, because `*86` and `*306` were never eligible in Davis's analysis. The matched cutoff overlap is therefore **4/6 = 2/2 prefixes + 2/4 suffixes**, still in the original "partial" band. This is a secondary post-unblinding result and does not replace the primary 3/6 score. One eligible label, `QI`, has no direct frozen v0.2 row and is not silently remapped to a numbered sign.

Protocol: [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md)  
Second-stage audit: [`results/davis-six-audit-synthesis.md`](results/davis-six-audit-synthesis.md)  
Universe-matched analysis: [`experiments/davis-2026-universe-matched-v02.md`](experiments/davis-2026-universe-matched-v02.md)  
Universe-matched results: [`results/davis-universe-matched-v0.2/`](results/davis-universe-matched-v0.2/)

### 3. `A-` and `I-` are strong under damage-aware paradigmatic evidence

v0.3 ranks the Davis prefixes:

- `A-`: **#1** prefix by secure exact paradigms, with 6 surviving pairs;
- `I-`: **#3**, with 4 surviving pairs.

Representative high-confidence relationships include:

- `KA-RU ~ A-KA-RU`
- `SI-KI-RA ~ A-SI-KI-RA`
- `TA-NA-TE ~ A-TA-NA-TE`
- `QA-*118 ~ I-QA-*118`
- `DA-MA-TE ~ I-DA-MA-TE`

The supported claim remains structural. The grammatical functions of `A-` and `I-` are unknown.

### 4. Final `JA` survives full audit as productive morphology

The most important non-Davis result from v0.3 remains final `JA`, but the manual audit substantially refines the automatic count.

v0.3 ranked `JA` **#1 among suffixes by damage-aware exact paradigms** and generated seven apparently secure relationships. The completed inscription/context audit resolves those seven as:

| pair | audit result |
|---|---|
| `PA-SE ~ PA-SE-JA` | **Tier A** |
| `KU-PA ~ KU-PA-JA` | **Tier A** |
| `A-SE ~ A-SE-JA` | **Tier B** |
| `*306-TU ~ *306-TU-JA` | **Tier B / onomastic risk** |
| `A-MA ~ A-MA-JA` | Tier C / comparison-only |
| `JA-SA ~ JA-SA-JA` | rejected: cross-face continuation / ritual abbreviation |
| `PU2-RE ~ PU2-RE-JA` | rejected: authoritative fragment boundaries absent from exploratory source layer |

So **4/7** survive as credible Tier-A/B morphology candidates; only the two original controls currently satisfy the strongest benchmark standard.

The important structural conclusion survives:

> **Final `JA` behaves as a productive morphological element in at least some Linear A vocabulary. Its grammatical function remains unknown.**

The audit also adds two failure modes not captured by v0.3 physical-damage masking: **editorial/cross-face segmentation** and **authoritative source-coverage gaps**.

Full audit: [`audits/JA.md`](audits/JA.md)  
Summary: [`data/ja-audit-summary.csv`](data/ja-audit-summary.csv)

A second-stage contextual-function test then compared the four surviving Tier-A/B families. Its registered promotion rule required the **same base→JA role change in at least two independent families**. The result is negative: **0/4 families produced a replicated role shift**. In particular, both `KU-PA/KU-PA-JA` and `A-SE/A-SE-JA` preserve essentially the same administrative recipient/designation-like slot. Simple assignments such as recipient, sender/source, roundel/receipt, sealed-document, or commodity-association marker are therefore rejected.

Function test: [`experiments/ja-context-function-test.md`](experiments/ja-context-function-test.md)  
Context matrix: [`data/ja-context-function-matrix.csv`](data/ja-context-function-matrix.csv)  
Summary: [`data/ja-context-function-summary.csv`](data/ja-context-function-summary.csv)

### Comparative audit: `ME` collapses under source/type controls

The same v0.3 screen that elevated `JA` ranked final `ME` #2 by accepted exact paradigms. A full audit produces a sharply different outcome:

| v0.3 `ME` pair | manual result |
|---|---|
| `A-RA-TU ~ A-RA-TU-ME` | **Tier B candidate** |
| `JA-SA-SA-RA ~ ...-ME` | rejected: cross-face continuation |
| `MA-RU ~ MA-RU-ME` | rejected: complex/logographic `*561` notation flattened as syllabic text |
| `SA-RA ~ SA-RA-ME` | rejected: cross-face continuation |

So only **1/4** damage-secure automatic pairs survives as a credible morphology candidate. The current benchmark therefore does **not** establish productive final `ME` morphology. This is an important contrast with `JA`, where four independent Tier-A/B families survived equivalent scrutiny.

The `ME` audit adds a new corpus failure mode: **complex-sign/logogram flattening can manufacture a syllabic-looking affix paradigm**.

Audit: [`audits/ME.md`](audits/ME.md)  
Lead: [`leads/ME.md`](leads/ME.md)  
Summary: [`data/me-audit-summary.csv`](data/me-audit-summary.csv)

### Comparative audit: `NE` has one strong local paradigm

The full `NE` audit produces an intermediate profile between `JA` and `ME`:

| candidate family | manual result |
|---|---|
| `*21F-TU ~ *21F-TU-NE` | **Tier A positive** |
| `QE-TU ~ QE-TU-NE` | rejected: base is `]QE-TU` |
| `PA-TA ~ PA-TA-NE` | rejected: base is `]PA-TA` |
| `PA-RA ~ PA-RA-NE` | reclassified: scribal + onomastic lexical-identity confound |

The `*21F-TU` family is exceptionally strong locally: HT Scribe 9 writes both bare and extended forms, and Scribe 11 independently replicates the extended form. But **only 1/4 original candidate families survives as credible morphology**, so current exact-pair evidence does not establish productive final `NE` across independent stems.

The extended `*21F-TU-NE` form occurs in both header-like and numbered recipient-like contexts, so no grammatical function is assigned.

Audit: [`audits/NE.md`](audits/NE.md)  
Lead: [`leads/NE.md`](leads/NE.md)  
Summary: [`data/ne-audit-summary.csv`](data/ne-audit-summary.csv)  
Cross-suffix comparison: [`data/suffix-audit-comparison.csv`](data/suffix-audit-comparison.csv)

### 5. Different affixes have different evidentiary profiles

v0.3 deliberately separates two dimensions that the earlier composite score conflated.

#### Boundary enrichment

`RO` remains the clearest example: it ranks **#1** among suffixes for raw word-final enrichment, yet only two complete `X ~ X-RO` strings survive the damage layer and both still require lexical/contextual caution.

`ME` ranks **#4** on boundary enrichment, while `JA` ranks only #37 despite leading the exact-paradigm table.

#### Secure exact paradigms

The top damage-aware suffix results are:

| rank | final sign | secure exact pairs | damage-excluded pairs |
|---:|---|---:|---:|
| **1** | `JA` | **7** | 1 |
| **2** | `ME` | **4** | 2 |
| **3** | `TI` | **3** | 2 |
| 4 | `RA` | 3 | 3 |
| **5** | `TE` | **3** | 3 |
| 13 | `NE` | 2 | 2 |
| 14 | `RO` | 2 | 2 |
| **33** | `RE` | **1** | 5 |

This is not a probability ranking of “true suffixes.” It demonstrates that edge concentration, exact stem alternation, lexical class, and grammatical function are distinct empirical questions.

## A benchmark correction discovered by the pipeline

The first manual audit labeled `KU-NI ~ KU-NI-TE` as a false pair because a fragmentary `KU-NI` attestation had been generalized to the form as a whole.

v0.3 refused to reproduce that negative label. Direct inspection of HT 79+83 showed a complete `KU-NI` occurrence, while `KU-NI-TE` is complete at KH 92.

The benchmark was corrected instead of tuning the program to a bad human label.

The revised Davis-six damage count is therefore:

> **19/37 = 51.4%** of the original apparent exact pairs fail specifically because a relevant boundary is damaged or insecure.

This is still more than half, but the correction matters: the benchmark is intended to be falsifiable too.

## Why raw boundary rank is not enough

v0.3 also exposed a limitation in a deliberately pure enrichment statistic. Rare numbered signs with only a few edge occurrences and zero internal occurrences can outrank common, independently supported candidates.

For example:

- `A` has 110 left-edge and 12 internal occurrences but ranks #6 on raw log-enrichment;
- `I` has 48 left-edge and 42 internal occurrences and ranks #48, despite four secure exact prefix paradigms.

No post-hoc weight change is applied to v0.3. A future version should add a separately registered support/significance measure rather than quietly retuning the frozen result.

## Evidence model

[`BENCHMARK.md`](BENCHMARK.md) defines the evidence tiers. Machine-readable data include:

- [`data/morphology-benchmark.csv`](data/morphology-benchmark.csv)
- [`data/morphology-audit-queue.csv`](data/morphology-audit-queue.csv)
- [`data/validated-leads.csv`](data/validated-leads.csv)
- [`data/davis-2026-unblinding.csv`](data/davis-2026-unblinding.csv)
- [`data/davis-2026-main-grid-universe.csv`](data/davis-2026-main-grid-universe.csv)
- [`data/davis-six-audit-summary.csv`](data/davis-six-audit-summary.csv)
- [`data/ja-audit-summary.csv`](data/ja-audit-summary.csv)
- [`data/ja-context-function-matrix.csv`](data/ja-context-function-matrix.csv)
- [`data/ja-context-function-summary.csv`](data/ja-context-function-summary.csv)
- [`data/ja-list-frame-matrix.csv`](data/ja-list-frame-matrix.csv)
- [`data/ja-list-frame-summary.csv`](data/ja-list-frame-summary.csv)
- [`data/me-audit-summary.csv`](data/me-audit-summary.csv)
- [`data/ne-audit-summary.csv`](data/ne-audit-summary.csv)
- [`data/ra-audit-summary.csv`](data/ra-audit-summary.csv)
- [`data/suffix-audit-comparison.csv`](data/suffix-audit-comparison.csv)
- [`data/v03-regression-set.csv`](data/v03-regression-set.csv)
- [`data/v04-regression-set.csv`](data/v04-regression-set.csv)
- [`data/v04-source-overrides.csv`](data/v04-source-overrides.csv)
- [`data/v04-lexical-warnings.csv`](data/v04-lexical-warnings.csv)

Negative and reclassified examples are deliberately retained.

## Current benchmark-positive examples

Representative strong formal relationships include:

| Relationship | Assessment | Evidence |
|---|---|---|
| `KA-RU ~ A-KA-RU` | Tier A | initial `A-`, administrative contextual convergence |
| `SI-KI-RA ~ A-SI-KI-RA` | Tier A | initial `A-`, published prior recognition |
| `TA-NA-TE ~ A-TA-NA-TE` | Tier A replication | same-tablet initial `A-` contrast |
| `QA-*118 ~ I-QA-*118` | Tier A | complete cross-site initial `I-` contrast |
| `DA-MA-TE ~ I-DA-MA-TE` | Tier A | repeated complete initial `I-` contrast |
| `PA-SE ~ PA-SE-JA` | Tier A | exact final `JA` extension |
| `KU-PA ~ KU-PA-JA` | Tier A | independent exact final `JA` extension |
| `*21F-TU ~ *21F-TU-NE` | Tier A | same-scribe + cross-scribe `NE` evidence |
| `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` | Tier A with segmentation caveat | exact final `TI` extension |

These are **structural observations, not translations**.

## Research strategy

The project follows a grammar-first combinatorial approach:

1. identify recurring formal relationships without choosing a language family;
2. restore damage and boundary state before generating paradigms;
3. test candidates across scribes, sites, genres, and lexical classes;
4. preserve rejected cases as controls;
5. infer grammatical function only when a form predicts a recurring administrative or syntactic role;
6. compare external languages only after an internal structural prediction exists.

Full protocol: [`METHODOLOGY.md`](METHODOLOGY.md)

## Reproduce v0.3

The exploratory corpus is pinned to `mwenge/lineara.xyz` commit:

```text
43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a
```

The GitHub Actions workflow runs the complete v0.3 pipeline:

[`.github/workflows/damage-aware-v03.yml`](.github/workflows/damage-aware-v03.yml)

Core scripts:

```text
scripts/build-boundary-mask.mjs
scripts/rank-affixes-v03.mjs
scripts/evaluate-v03-regression.mjs
```

The older frozen v0.1/v0.2 implementation remains at [`scripts/rank-affixes.mjs`](scripts/rank-affixes.mjs) for reproducibility.

## Next work

The hostile audit of final `RA` is complete: **0 Tier A + 1 Tier B + 1 Tier C + 1 rejected**, so productive `RA` is not established. The strongest surviving family is `MI-DA ~ MI-DA-RA`, retained only as possible onomastic/derivational morphology. The `SA-RA` family is a new string-decomposition control because HT30 itself favors `SA-RA₂ ~ SA-RA-RA` over simple `SA-RA + RA`.

The next research priority is a **registered comparative audit of the three tied clean two-pair v0.4 suffix candidates** rather than choosing one post hoc:

1. `QE`: `KA-PA ~ KA-PA-QE`, `SA-RO ~ SA-RO-QE`;
2. `SU`: `KU-NI ~ KU-NI-SU`, `A-RI ~ A-RI-SU`;
3. `WI`: `JA-DI ~ JA-DI-WI`, `PA3-NI ~ PA3-NI-WI`;
4. apply the same source, support, scribe, lexical-identity, and context standards to all six pairs before comparing survival rates;
5. keep the `JA` and `NE` functional stop rules in force until genuinely new independent paradigms appear;
6. preserve v0.4 extraction unchanged while manual promotion-stage audits continue.

RA audit: [`audits/RA.md`](audits/RA.md).  
Current structural ranking: [`results/structural-aware-v0.4/paradigm-ranking.csv`](results/structural-aware-v0.4/paradigm-ranking.csv).  
Cross-suffix audited comparison: [`data/suffix-audit-comparison.csv`](data/suffix-audit-comparison.csv).

## Repository map

```text
BENCHMARK.md
METHODOLOGY.md
REJECTED_HYPOTHESES.md
SOURCES.md
UPSTREAM.md

scripts/
  rank-affixes.mjs
  build-boundary-mask.mjs
  rank-affixes-v03.mjs
  evaluate-v03-regression.mjs
  build-structural-mask-v04.mjs
  rank-affixes-v04.mjs
  evaluate-v04-regression.mjs

data/
  morphology-benchmark.csv
  morphology-audit-queue.csv
  validated-leads.csv
  davis-2026-unblinding.csv
  davis-six-audit-summary.csv
  ja-audit-summary.csv
  me-audit-summary.csv
  ne-audit-summary.csv
  suffix-audit-comparison.csv
  v03-regression-set.csv
  v04-regression-set.csv
  v04-source-overrides.csv
  v04-lexical-warnings.csv

audits/
  A.md
  I.md
  RO.md
  TE.md
  RE.md
  TI.md
  ME.md
  NE.md
  JA.md

results/
  davis-six-audit-synthesis.md
  damage-aware-v0.3/
  structural-aware-v0.4/

experiments/
  davis-2026-affix-replication.md
  damage-aware-v03.md
  structural-aware-v04.md
  mitanni-indo-aryan-pilot.md
  toponym-kober-grid.md

leads/
  JA.md
  NE.md
  ME.md
  SI-DA.md
  DA-KU.md
  21F-TU.md
  KU-PA3.md
```

## Data provenance

This repository is **not** an authoritative edition of Linear A.

Evidence is prioritized roughly as:

1. published inscription/facsimile editions, especially GORILA;
2. specialist transcription and palaeographic resources such as SigLA;
3. published linguistic/contextual scholarship;
4. computational corpora and derived analytical layers;
5. this project's inference.

See [`UPSTREAM.md`](UPSTREAM.md) and [`SOURCES.md`](SOURCES.md).

## Contributing and specialist review

Corrections are welcome, especially concerning sign readings, damage, word boundaries, scribal attribution, administrative syntax, and prior scholarship.

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

If a result here is already established in the literature, it should be credited and reclassified as a **replication**, not presented as a new discovery.

## Scope and non-claims

This repository does **not** claim a decipherment, a Minoan language-family identification, exact Minoan pronunciation from Linear B values, or a translation from formal morphology.

The intended contribution is narrower:

> **make Linear A morphology claims easier to reproduce, falsify, compare, and improve.**

## Author and AI-assisted research

This is an independent research project by Scott Ferguson, whose professional background is in software engineering and technical product work rather than Aegean epigraphy or historical linguistics. That is a reason to expose the evidence and invite specialist correction, not to lower the evidentiary standard.

AI tools have assisted corpus exploration, hypothesis generation, source discovery, coding, and drafting. AI output is not treated as evidence. Claims are promoted only through traceable inscriptional data, reproducible computation, and cited scholarship.
