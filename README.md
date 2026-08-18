# Linear A Morphology Benchmark

**A reproducible, epigraphically audited framework for testing morphological claims in Linear A.**

Linear A remains undeciphered. This repository does not propose a decipherment or identify the underlying Minoan language. It addresses a narrower prerequisite:

> **When two Linear A sign groups look morphologically related, how strong is the evidence that the relationship is real?**

The project combines automated candidate discovery with inscription-level audit. Positive results, false positives, damaged readings, onomastic families, scribal confounds, and failed hypotheses are preserved in a versioned benchmark so that morphological claims can be reproduced and challenged rather than selected retrospectively.

## Core rule

Computational work on Linear A is unusually vulnerable to false patterns because the corpus is small, heterogeneous, partly fragmentary, and rich in personal names, place names, ritual formulae, commodity notation, and regional or scribal variation.

**Discovery is computational. Promotion is epigraphic.**

A candidate does not become evidence for morphology until its forms, boundaries, damage state, provenance, and context have been audited.

## Current status

[`BENCHMARK.md`](BENCHMARK.md) defines the evidence model. Machine-readable adjudications live in:

- [`data/morphology-benchmark.csv`](data/morphology-benchmark.csv)
- [`data/morphology-audit-queue.csv`](data/morphology-audit-queue.csv)
- [`data/validated-leads.csv`](data/validated-leads.csv)
- [`data/davis-2026-unblinding.csv`](data/davis-2026-unblinding.csv)

Negative examples are deliberately retained. A system that recovers attractive positives while also reproducing known damage artifacts is not considered successful.

## Independent replication of Davis 2026

The first affix-ranking experiment was frozen **before** the identities of Brent Davis's six 2026 morphology candidates were known to this project.

After the blind v0.1 and v0.2 outputs had been frozen, Davis supplied his six candidates directly by email:

- prefixes: **`A-`, `I-`**
- suffixes: **`-RE`, `-RO`, `-TE`, `-TI`**

Our frozen v0.2 ranks were:

| Davis candidate | blind rank |
|---|---:|
| `A-` | **1 / 116** |
| `I-` | **4 / 116** |
| `-RO` | **1 / 116** |
| `-TE` | **4 / 116** |
| `-RE` | **7 / 116** |
| `-TI` | **11 / 116** |

The pre-registered comparison of our top two prefixes and top four suffixes yields **3/6 exact cutoff overlap**, classified in advance as a **partial conceptual replication**. That remains the official replication score.

Separately, all six Davis candidates fall within the top 11 positions of their corresponding 116-sign rankings. This is descriptive secondary evidence, not a replacement success criterion.

Protocol: [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md)

## What happened after unblinding

We then subjected the automatic exact-pair evidence for **all six Davis candidates** to the same damage-aware audit.

The result is more informative than a simple rank comparison:

| element | blind rank | damage-aware pair result | current assessment |
|---|---:|---|---|
| `A-` | **#1 prefix** | 2 Tier A + 2 Tier B automatic survivors; independent same-tablet Tier A control | **strongest reproduced element** |
| `I-` | **#4 prefix** | 2 Tier A + 1 Tier B survivors | strong prefix evidence despite missing prereg top-2 cutoff |
| `-RO` | **#1 suffix** | 1 Tier B; 3 pairs fail/reclassify | very strong edge signal, weak minimal-pair support |
| `-TE` | **#4 suffix** | no new Tier A; contextual/literature evidence survives | strong distributional signal, exact-pair support weak |
| `-RE` | **#7 suffix** | one secure formal pair, strongly onomastic; five fail as clean pairs | likely onomastic/derivational morphology |
| `-TI` | **#11 suffix** | 1 Tier A + 2 Tier B survivors | best exact-pair survival among Davis suffixes despite lower global rank |

Full synthesis: [`results/davis-six-audit-synthesis.md`](results/davis-six-audit-synthesis.md)

Individual audits:

- [`audits/A.md`](audits/A.md)
- [`audits/I.md`](audits/I.md)
- [`audits/RO.md`](audits/RO.md)
- [`audits/TE.md`](audits/TE.md)
- [`audits/RE.md`](audits/RE.md)
- [`audits/TI.md`](audits/TI.md)

## Strongest current result: initial `A-`

`A-` now has the strongest convergence of independent evidence in the project.

The blind algorithm ranked it #1. Damage-aware audit retained strong relationships including:

- `KA-RU ~ A-KA-RU` — Tier A, with unusually useful administrative-context convergence;
- `SI-KI-RA ~ A-SI-KI-RA` — Tier A and already recognized in published scholarship;
- `SA-RA₂ ~ A-SA-RA₂` — Tier B;
- `PA-RA-NE ~ A-PA-RA-NE` — Tier B.

The same-tablet `TA-NA-TE ~ A-TA-NA-TE` contrast at Zakros is an additional published Tier-A replication/control.

The supported claim remains structural:

> **Linear A has strong evidence for an initial morphological element `A-` that alternates with unprefixed forms in at least some lexical and onomastic environments.**

Its grammatical function is unknown. Article, case, definiteness, and semantic interpretations remain hypotheses.

## Why the suffixes matter even when their minimal pairs fail

The `RO`, `TE`, and `RE` audits exposed a central methodological distinction:

> **boundary enrichment, exact paradigmatic alternation, and grammatical function are separate evidentiary questions.**

For example, `RO` is independently selected by Davis and ranks #1 in our blind suffix analysis, yet most apparent `X ~ X-RO` pairs collapse when damage or onomastics are restored. That does not make the word-final distribution unreal. It means a distributional suffix signal cannot be justified by fabricated minimal pairs.

`RE` appears particularly concentrated in probable anthroponyms, suggesting that a real derivational or onomastic ending may be better detected by edge statistics than by ordinary bare/extended paradigms.

`TI` shows the inverse pattern: weaker global rank but substantially better exact-pair survival.

## Corpus-engineering result

The six audits now provide multiple labeled cases where a cleaned computational word field silently removed an initial or final break and thereby manufactured a perfect-looking morphological pair.

This is no longer an anecdotal warning. It is a benchmarked failure mode.

The next large-scale extractor therefore must construct a **damage-aware word layer before generating exact pairs**. A post-hoc regex filter cannot recover boundary information that has already been discarded.

## Current benchmark-positive examples

The benchmark is intentionally conservative. Representative positives now include:

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

## What the first scoring model got wrong

The frozen ranking combined:

1. word-edge enrichment;
2. apparent exact extension pairs;
3. raw boundary support.

The audits show that these dimensions should not yet be collapsed into one score.

The next model will separate:

1. **boundary distribution** — how strongly a sign favors a word edge;
2. **damage-aware paradigmatic evidence** — how many secure `X ~ A-X` or `X ~ X-A` relationships survive;
3. **lexical-class concentration** — names, places, ritual formulae, administrative headings, etc.;
4. **contextual role equivalence** — whether paired forms actually occupy comparable functions.

## Next work

The highest-value next phase is **v0.3**, not another external-language comparison:

1. build a damage-aware word/boundary layer;
2. rerun pure edge statistics separately from exact-pair scoring;
3. stratify the corpus by probable onomastic/personnel, ritual, and ordinary administrative contexts;
4. rerun the Davis-six comparison across those independent dimensions;
5. apply the identical audit to the high-ranked non-Davis candidates **`JA`, `ME`, and `NE`**.

That final comparison is especially important. `JA` already has two Tier-A exact extensions. If `JA` or `ME` survives the same controls as well as or better than the established Davis candidates, that becomes a specific result potentially worth bringing to specialist attention.

## Reproduce the frozen ranking

The exploratory corpus is pinned to `mwenge/lineara.xyz` commit:

```text
43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a
```

Original run:

```bash
node scripts/rank-affixes.mjs \
  --corpus /path/to/lineara.xyz/LinearAInscriptions.js \
  --out-dir replication-output
```

Logogram sensitivity run:

```bash
node scripts/rank-affixes.mjs \
  --corpus /path/to/lineara.xyz/LinearAInscriptions.js \
  --out-dir replication-output-logogram-filter \
  --exclude-known-logograms
```

Implementation: [`scripts/rank-affixes.mjs`](scripts/rank-affixes.mjs)

## Data provenance

This repository is **not** an authoritative edition of Linear A.

Evidence is prioritized roughly as:

1. published inscription/facsimile editions, especially GORILA;
2. specialist transcription and palaeographic resources such as SigLA;
3. published linguistic/contextual scholarship;
4. computational corpora and derived analytical layers;
5. this project's inference.

See [`UPSTREAM.md`](UPSTREAM.md) and [`SOURCES.md`](SOURCES.md).

## Repository map

```text
BENCHMARK.md
METHODOLOGY.md
REJECTED_HYPOTHESES.md
SOURCES.md
UPSTREAM.md

scripts/
  rank-affixes.mjs

data/
  morphology-benchmark.csv
  morphology-audit-queue.csv
  validated-leads.csv
  davis-2026-unblinding.csv

audits/
  A.md
  I.md
  RO.md
  TE.md
  RE.md
  TI.md

results/
  davis-six-audit-synthesis.md

experiments/
  davis-2026-affix-replication.md
  mitanni-indo-aryan-pilot.md
  toponym-kober-grid.md

leads/
  JA.md
  SI-DA.md
  DA-KU.md
  21F-TU.md
  KU-PA3.md
```

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
