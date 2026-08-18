# Linear A Morphology Benchmark

**A reproducible, epigraphically audited framework for testing morphological claims in Linear A.**

Linear A remains undeciphered. This repository does not propose a decipherment or identify the underlying Minoan language. It addresses a narrower prerequisite:

> **When two Linear A sign groups look morphologically related, how strong is the evidence that the relationship is real?**

The project combines automated candidate discovery with inscription-level audit. Positive results, false positives, damaged readings, onomastic families, scribal confounds, and failed hypotheses are all preserved in a versioned benchmark so that proposed morphology can be reproduced and challenged rather than selected retrospectively.

## Why this project exists

Computational work on Linear A is unusually vulnerable to false patterns. The corpus is small, heterogeneous, partly fragmentary, and rich in personal names, place names, fixed formulae, commodity notation, and regional or scribal variation.

A string-level comparison can produce an apparently excellent paradigm even when a boundary is damaged, damage information has been flattened, a derived substring is mistaken for a word, a form is onomastic, or a pattern is restricted to one scribe or genre.

The central rule is:

**Discovery is computational. Promotion is epigraphic.**

A candidate does not become evidence for morphology until its forms, boundaries, damage state, provenance, and context have been audited.

## Current project status

### Benchmark

[`BENCHMARK.md`](BENCHMARK.md) defines the evidence model. Machine-readable adjudications live in:

- [`data/morphology-benchmark.csv`](data/morphology-benchmark.csv) — accepted, candidate, rejected, and reclassified relationships;
- [`data/morphology-audit-queue.csv`](data/morphology-audit-queue.csv) — candidates awaiting manual audit;
- [`data/validated-leads.csv`](data/validated-leads.csv) — detailed inscription-level observations;
- [`data/davis-2026-unblinding.csv`](data/davis-2026-unblinding.csv) — frozen rank comparison with Davis's six affix candidates.

Negative examples are deliberately retained. A system that recovers attractive positives while also reproducing known damage artifacts is not considered successful.

## Independent replication of Davis 2026

The first affix-ranking experiment was frozen **before** the identities of Brent Davis's six 2026 morphology candidates were known to this project.

The ranking used:

- sign position at word beginnings and endings;
- exact apparent whole-word relationships `X ~ A-X` and `X ~ X-A`;
- no proposed translation;
- no external-language matching;
- no hand-coded knowledge of Davis's candidates.

After the blind v0.1 and v0.2 outputs had been frozen, Davis supplied the six identities directly by email on 2026-08-17:

- prefixes: **`A-`, `I-`**;
- suffixes: **`-RE`, `-RO`, `-TE`, `-TI`**.

The frozen v0.2 ranks were:

| Davis candidate | side | blind rank |
|---|---|---:|
| `A-` | prefix | **1 / 116** |
| `I-` | prefix | **4 / 116** |
| `-RO` | suffix | **1 / 116** |
| `-TE` | suffix | **4 / 116** |
| `-RE` | suffix | **7 / 116** |
| `-TI` | suffix | **11 / 116** |

The pre-registered criterion compared our top 2 prefixes and top 4 suffixes with Davis's corresponding sets. That yields **3/6 exact cutoff overlap**, classified in advance as a **partial conceptual replication**.

A separate descriptive observation is that **all six Davis candidates fall within the top 10% of their corresponding 116-sign rankings**, and five are rank 7 or better. That observation is reported separately because it was not the pre-registered success criterion.

Full protocol and interpretation: [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md).

Implementation: [`scripts/rank-affixes.mjs`](scripts/rank-affixes.mjs).

## Why disagreement is useful

Our frozen top four suffixes were:

1. `RO`
2. `JA`
3. `ME`
4. `TE`

Davis's four are `RE`, `RO`, `TE`, and `TI`.

So `JA` and `ME` outrank Davis candidates `RE` and `TI` under our pair-sensitive score. That difference creates useful experiments rather than invalidating either method: Davis's approach and this benchmark are detecting overlapping but non-identical structural signals.

## Example: `RO` and the audit layer

`RO` is particularly informative because it is both **Davis's suffix candidate** and our **#1 blind suffix candidate**.

The blind pipeline generated four apparent exact pairs:

```text
KI-DA  ~ KI-DA-RO
SA-MA  ~ SA-MA-RO
DI-NA  ~ DI-NA-RO
A-DA   ~ A-DA-RO
```

Manual epigraphic review split them:

- two apparent base forms were fragmentary and had lost damage information in the computational representation;
- one pair is better treated as a likely onomastic/lexical comparison;
- one pair, `A-DA ~ A-DA-RO`, survives as a Tier B formal candidate.

See [`audits/RO.md`](audits/RO.md).

This does **not** contradict Davis's distributional identification of `RO`. It demonstrates that two questions must remain separate:

1. Is a sign strongly enriched at a word boundary?
2. Do apparent minimal pairs provide secure epigraphic evidence for the same morphology?

The benchmark is designed to measure both.

## Current benchmark-positive morphology

The seed benchmark is intentionally conservative:

| Relationship | Assessment | What it supports |
|---|---|---|
| `PA-SE ~ PA-SE-JA` | Tier A | exact final `JA` extension |
| `KU-PA ~ KU-PA-JA` | Tier A | independent exact final `JA` extension |
| `*21F-TU ~ *21F-TU-NE` | Tier A | same-scribe contrast with cross-scribe replication |
| `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` | Tier A | exact final `TI` extension across scribes |
| `SI-DA-TE ~ A-SI-DA-TO-I` | Tier B | same-tablet formal relationship; function unresolved |
| `A-DA ~ A-DA-RO` | Tier B | secure cross-site formal relationship; lexical identity unresolved |

These are **structural observations**, not translations.

## Research strategy

The project follows a grammar-first combinatorial approach:

1. identify recurring formal relationships without choosing a language family;
2. preserve inscriptional provenance and damage state;
3. test candidates across scribes, sites, and genres;
4. use negative controls and rejected cases to measure false-positive behavior;
5. infer grammatical function only when a form predicts a recurring administrative or syntactic role;
6. compare external languages only after the internal structural prediction exists.

Full methodology: [`METHODOLOGY.md`](METHODOLOGY.md).

## Reproduce the ranking

The exploratory corpus is pinned to `mwenge/lineara.xyz` commit:

```text
43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a
```

Run the original ranking with:

```bash
node scripts/rank-affixes.mjs \
  --corpus /path/to/lineara.xyz/LinearAInscriptions.js \
  --out-dir replication-output
```

Run the separately versioned obvious-logogram sensitivity analysis with:

```bash
node scripts/rank-affixes.mjs \
  --corpus /path/to/lineara.xyz/LinearAInscriptions.js \
  --out-dir replication-output-logogram-filter \
  --exclude-known-logograms
```

GitHub Actions runs the same procedure against the pinned upstream commit and records provenance.

## Data provenance

This repository is **not** an authoritative edition of Linear A.

Evidence is prioritized roughly as:

1. published inscription/facsimile editions, especially GORILA;
2. specialist transcription and palaeographic resources such as SigLA;
3. published linguistic/contextual scholarship;
4. computational corpora and derived analytical layers;
5. this project's inference.

`lineara.xyz` is a productive searchable substrate, but cleaned or derived data never outrank the inscription. The `RO` audit demonstrates why.

See [`UPSTREAM.md`](UPSTREAM.md) and [`SOURCES.md`](SOURCES.md).

## Next work

The Davis unblinding gives the audit queue a clearer priority:

1. audit `RE` and `TE`, where Davis's suffix set overlaps our high-ranked candidate families;
2. audit `I-` and `A-`, Davis's two prefixes and our ranks #4 and #1;
3. expand the `TI` audit beyond the existing Tier A `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` pair;
4. audit `JA` and `ME` as disagreement cases;
5. build a damage-aware corpus layer before the next large-scale exact-pair run;
6. reproduce Davis's exact Packard refinement if the chapter/data become available;
7. repeat against an independently encoded SigLA-derived corpus.

## Repository map

```text
BENCHMARK.md                       benchmark definition and evidence tiers
METHODOLOGY.md                     research protocol
REJECTED_HYPOTHESES.md             failed and downgraded hypotheses
SOURCES.md                         working bibliography
UPSTREAM.md                        corpus provenance and source hierarchy

scripts/
  rank-affixes.mjs                 reproducible candidate-ranking pipeline

data/
  morphology-benchmark.csv         adjudicated morphology benchmark
  morphology-audit-queue.csv       pending audit queue
  validated-leads.csv              inscription-level observations
  davis-2026-unblinding.csv        Davis-six frozen-rank comparison

audits/
  RO.md                            audit of first blind top-ranked suffix

experiments/
  davis-2026-affix-replication.md  blind replication and unblinding
  mitanni-indo-aryan-pilot.md      negative external-language pilot
  toponym-kober-grid.md            pre-registered geographic test

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
