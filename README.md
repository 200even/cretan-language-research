# Linear A Morphology Benchmark

**A reproducible, epigraphically audited framework for testing morphological claims in Linear A.**

Linear A remains undeciphered. This repository does not propose a decipherment or identify the underlying Minoan language. It asks a narrower question:

> **When Linear A sign groups look morphologically related, how strong is the evidence that the relationship is real?**

## Core rule

**Discovery is computational. Promotion is epigraphic.**

Direct diplomatic evidence overrides normalized convenience data. Exact string relations do not by themselves establish morphology, suffixhood, or grammatical function. Failed hypotheses and superseded results remain in the repository as part of the evidentiary record.

The authoritative current state is [`CURRENT_STATUS.md`](CURRENT_STATUS.md).

## Current headline results

### Phase 1B: diplomatic repair complete

The frozen SigLA source was reconstructed and aligned candidate-blind to a pinned diplomatic glyph source. The repaired clean-v2.1 primary administrative corpus contains:

- **554** Tablet/Nodule/Roundel tokens of length 2–8
- **211** documents
- **374** word types
- effective token weight **457**

Full Phase 1B record: [`results/phase1b-confirmatory-v2.1/`](results/phase1b-confirmatory-v2.1/)

### Stage 5C: TI and JA are not globally edge-productive

The unchanged locked Test 2B detector passed its preregistered synthetic power gate on clean-v2.1, but neither real candidate cleared the 99% lower-bound criterion:

| candidate | held-out ΔLL | 99% document-bootstrap CI |
|---|---:|---:|
| `TI` | -0.5697 | [-3.6315, +2.0194] |
| `JA` | +0.9007 | [-3.0357, +4.8210] |

**Conclusion:** no confirmatory evidence that either is a globally productive terminal marker.

### Stage 5D: local edges survive, multi-stage chaining does not

Stage 5D rebuilt the morphotactic graph from clean-v2.1 under a referee-mandated blind protocol:

- base stems must be at least 2 signs;
- the same extension must occur across at least 2 stems and 2 documents;
- at least one witness must clear hierarchical factorization/truncation;
- no higher-priority epigraphic explanation may account for all witnesses;
- an abstract second-stage transition requires **two independently replicated complete `X -> X-Y -> X-Y-Z` ladders**;
- skipped-state inference is forbidden.

Blind primary-network result:

- **23** primitive exact one-sign extension edges
- **16** distinct extension signs
- **4** signs pass dual independence
- **2** sibling/fan-out motifs
- **0 complete three-state ladders**
- **0 abstract second-stage transitions**

After structural and epigraphic adjudication:

| sign | Stage 5D result |
|---|---|
| `JA` | **promoted local morphotactic edge** |
| `TI` | **promoted local morphotactic edge, caveated** |
| `PA` | **promoted under referee rule, rule-limited** |
| `RO` | **Level 1 exploratory; onomastic veto** |

These are **local formal terminal-extension relations**, not grammatical assignments and not evidence of global productivity.

Most importantly:

> **clean-v2.1 contains no complete `X -> X-Y -> X-Y-Z` ladder at all.**

The historically attractive `U -> TI -> NU` path therefore **dies as a Stage 5D morphotactic chain**. `WA -> JA/E` and `U -> JA` are likewise not recovered as lexical-state edges.

Full Stage 5D record: [`results/stage5d-clean-v2.1/`](results/stage5d-clean-v2.1/)

## Two fan-out motifs, not chains

The repaired primary corpus contains two common-parent sibling structures:

- `A-RI -> {A-RI-PA, A-RI-SU}`
- `KU-PA -> {KU-PA-JA, KU-PA-RI}`

The algorithm treats these as sibling alternatives. It does not convert them into ordered suffix chains.

## Independent Davis replication remains historical evidence

The frozen blind v0.2 experiment recovered **3/6** of Brent Davis's independently supplied 2026 candidates at the preregistered cutoff. A post-unblinding universe-matched sensitivity analysis gives **4/6**. Those results remain preserved as independent-replication evidence but do not override the later diplomatic repair.

See [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md) and [`results/davis-six-audit-synthesis.md`](results/davis-six-audit-synthesis.md).

## Current roadmap

- Phase 1B diplomatic reconstruction: **COMPLETE**
- Stage 5C global TI/JA edge productivity: **COMPLETE — NEGATIVE**
- Stage 5D local morphotactic network: **COMPLETE**
- Stage 5D multi-stage chaining: **COMPLETE — ZERO VALIDATED CHAINS**
- Phase 6 grammatical inference: **NOT OPEN**

The next justified experiment is a **candidate-controlled contextual contrast test**: do the promoted local `JA`, `TI`, and `PA` edges predict repeated structural-role changes across independent stem families? Until such a test succeeds, no case, number, tense, agreement, derivational, clitic, or semantic label is licensed.

## Reproducibility

Key protocol and code:

- [`METHODOLOGY.md`](METHODOLOGY.md)
- [`BENCHMARK.md`](BENCHMARK.md)
- [`REJECTED_HYPOTHESES.md`](REJECTED_HYPOTHESES.md)
- [`scripts/phase1b/`](scripts/phase1b/)
- [`scripts/stage5d/`](scripts/stage5d/)

The raw SigLA payload and full source-derived corpus tables are not redistributed here. Hashes and upstream provenance are retained in the result manifests and reports.

## Scope

This repository does **not** claim a decipherment, a Minoan language-family identification, exact pronunciation from Linear B values, or a translation from formal morphology.

The intended contribution is narrower:

> **make Linear A morphology claims easier to reproduce, falsify, compare, and improve.**
