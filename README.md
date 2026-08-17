# Linear A Morphology Benchmark

**A reproducible, epigraphically audited framework for testing morphological claims in Linear A.**

Linear A remains undeciphered. This repository does not propose a decipherment or identify the underlying Minoan language. It addresses a narrower prerequisite:

> **When two Linear A sign groups look morphologically related, how strong is the evidence that the relationship is real?**

The project combines automated candidate discovery with inscription-level audit. Positive results, false positives, damaged readings, onomastic families, scribal confounds, and failed hypotheses are all preserved in a versioned benchmark so that proposed morphology can be reproduced and challenged rather than selected retrospectively.

## Why this project exists

Computational work on Linear A is unusually vulnerable to false patterns. The corpus is small, heterogeneous, partly fragmentary, and rich in personal names, place names, fixed formulae, commodity notation, and regional or scribal variation.

A string-level comparison can therefore produce an apparently excellent paradigm even when:

- a word boundary is damaged;
- a cleaned transcription has silently removed the damage marker;
- a database-derived substring is mistaken for an inscriptional word;
- two related-looking forms are actually personal names;
- a pattern is confined to one scribe or genre;
- a short CV sequence matches by chance.

The central rule of this repository is simple:

**Discovery is computational. Promotion is epigraphic.**

A candidate does not become evidence for morphology until its forms, boundaries, damage state, provenance, and context have been audited.

## Current project status

### Benchmark

[`BENCHMARK.md`](BENCHMARK.md) defines the evidence model. Machine-readable adjudications live in:

- [`data/morphology-benchmark.csv`](data/morphology-benchmark.csv) — accepted, candidate, rejected, and reclassified relationships;
- [`data/morphology-audit-queue.csv`](data/morphology-audit-queue.csv) — candidates awaiting manual audit;
- [`data/validated-leads.csv`](data/validated-leads.csv) — detailed inscription-level observations used by the current research leads.

The benchmark deliberately includes negative examples. A morphology system that recovers attractive positives while also reproducing known damage artifacts is not considered successful.

### Blind affix-ranking experiment

The first automated experiment was frozen before comparison with Brent Davis's 2026 morphology analysis.

The independent ranking uses:

- position of signs at word beginnings and endings;
- exact whole-word relationships of the form `X ~ A-X` and `X ~ X-A`;
- no proposed translation;
- no external-language matching;
- no hand-coded knowledge of Davis's reported affix identities.

Protocol and results:

- [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md)
- [`scripts/rank-affixes.mjs`](scripts/rank-affixes.mjs)
- GitHub Actions workflow: [`.github/workflows/blind-affix-replication.yml`](.github/workflows/blind-affix-replication.yml)

The first pass and a separately versioned logogram-filter sensitivity run both recover strong edge signals for several signs. The important result is not the ranking alone, but what happens after audit.

### Example: why the audit layer matters

The blind pipeline ranked final `RO` as its strongest suffix candidate and generated four apparent exact pairs:

```text
KI-DA  ~ KI-DA-RO
SA-MA  ~ SA-MA-RO
DI-NA  ~ DI-NA-RO
A-DA   ~ A-DA-RO
```

Manual epigraphic review split those four cases:

- two short base forms were created by damage information being flattened in the computational corpus;
- one pair is better treated as a likely onomastic/lexical comparison;
- one pair, `A-DA ~ A-DA-RO`, survives as a genuine Tier B formal candidate.

See [`audits/RO.md`](audits/RO.md).

This is the behavior the benchmark is designed to measure. A high statistical score may identify a real distributional phenomenon while the apparent supporting paradigms still fail inscription-level scrutiny.

## Current benchmark-positive morphology

The seed benchmark is intentionally conservative. Its strongest formal positives currently include:

| Relationship | Assessment | What it supports |
|---|---|---|
| `PA-SE ~ PA-SE-JA` | Tier A | exact final `JA` extension |
| `KU-PA ~ KU-PA-JA` | Tier A | independent exact final `JA` extension |
| `*21F-TU ~ *21F-TU-NE` | Tier A | same-scribe bare/extended contrast with cross-scribe replication |
| `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` | Tier A | exact final `TI` extension across scribes |
| `SI-DA-TE ~ A-SI-DA-TO-I` | Tier B | strong same-tablet formal relationship; function unresolved |
| `A-DA ~ A-DA-RO` | Tier B | secure cross-site formal relationship; lexical identity unresolved |

These are **structural observations**, not translations. For example, the evidence that `JA` behaves productively does not establish that it means "from," "of," or any other grammatical category.

## Research strategy

The project follows a grammar-first, combinatorial approach:

1. identify recurring formal relationships without choosing a language family;
2. preserve exact inscriptional provenance and damage state;
3. test candidates across scribes, sites, and genres;
4. use negative controls and rejected cases to estimate false-positive behavior;
5. infer grammatical function only when a form predicts a recurring administrative or syntactic role;
6. compare external languages only after the internal structural prediction exists.

This makes the project useful even if no lexical item is ever translated. A reliable constraint on Linear A morphology is already information that future decipherment hypotheses must explain.

Full methodology: [`METHODOLOGY.md`](METHODOLOGY.md).

## Reproduce the affix ranking

The exploratory corpus is currently pinned to Michael Wengler's `mwenge/lineara.xyz` at commit:

```text
43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a
```

After checking out that version, run:

```bash
node scripts/rank-affixes.mjs \
  --corpus /path/to/lineara.xyz/LinearAInscriptions.js \
  --out-dir replication-output
```

For the separately versioned sensitivity analysis that removes known logogram labels:

```bash
node scripts/rank-affixes.mjs \
  --corpus /path/to/lineara.xyz/LinearAInscriptions.js \
  --out-dir replication-output-logogram-filter \
  --exclude-known-logograms
```

GitHub Actions runs the same procedure against the pinned upstream commit and records the resulting artifact and provenance.

## Data provenance

This repository is **not** an authoritative edition of Linear A.

The evidence hierarchy is:

1. published inscription/facsimile editions, especially GORILA;
2. specialist transcription and paleographic resources such as SigLA;
3. published linguistic and contextual scholarship;
4. computational corpora and derived analytical layers;
5. this project's own inference.

`lineara.xyz` is used as a highly productive searchable computational substrate, but cleaned or derived data never outrank the underlying inscription. The `RO` audit demonstrates why that distinction matters.

See [`UPSTREAM.md`](UPSTREAM.md) and [`SOURCES.md`](SOURCES.md).

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
  morphology-benchmark.csv         machine-readable adjudicated benchmark
  morphology-audit-queue.csv       pending audit queue
  validated-leads.csv              validated inscription observations

audits/
  RO.md                            audit of the first blind top-ranked suffix

experiments/
  davis-2026-affix-replication.md  blinded affix replication protocol/results
  mitanni-indo-aryan-pilot.md      negative external-language pilot
  toponym-kober-grid.md            pre-registered geographic morphology test

leads/
  JA.md
  SI-DA.md
  DA-KU.md
  21F-TU.md
  KU-PA3.md
```

## What would count as progress?

Useful contributions include:

- a newly validated morphological pair;
- a convincing rejection of an apparent pair;
- recovery of a recurring grammatical role for an affix;
- proof that a candidate is instead onomastic, orthographic, regional, or scribal;
- preservation of damage metadata that eliminates computational false positives;
- successful independent replication of published morphology results;
- a corpus-version comparison showing why two analyses disagree.

A failed hypothesis is therefore a result if it narrows the space of defensible analyses.

## Contributing and specialist review

Corrections are welcome, especially from researchers working in Aegean epigraphy, Linear A palaeography, Mycenaean philology, Bronze Age administration, historical linguistics, or computational corpus methods.

The most useful contributions are precise and falsifiable: inscription ID, reading, source/edition, proposed correction, and whether the correction strengthens, weakens, or invalidates an existing benchmark row.

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

If a result in this repository is already established in the literature, it should be credited and reclassified as a **replication**, not presented as a new discovery.

## Scope and non-claims

This repository does **not** claim:

- a decipherment of Linear A;
- that Minoan belongs to a particular language family;
- that conventional Linear B-derived sign values reproduce exact Minoan pronunciation;
- that a statistically edge-enriched sign is automatically a grammatical affix;
- that a formal morphological relationship supplies a translation.

The intended contribution is narrower:

> **make Linear A morphology claims easier to reproduce, falsify, compare, and improve.**

## Author and AI-assisted research

This is an independent research project by Scott Ferguson, whose professional background is in software engineering and technical product work rather than Aegean epigraphy or historical linguistics. That is a reason for the project to expose its evidence and invite specialist correction, not to lower the evidentiary standard.

AI tools have been used for corpus exploration, hypothesis generation, source discovery, coding assistance, and drafting. AI output is not treated as evidence. Claims are promoted only through traceable inscriptional data, reproducible computation, and cited scholarship.
