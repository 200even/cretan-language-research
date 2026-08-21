# Current Research Status

**Authoritative project status as of 2026-08-21.**

This file supersedes stronger productiveness wording in older discovery-run READMEs and candidate audits wherever they conflict with the clean-v2.1 confirmatory, Stage 5D, or Stage 5E0 results. Historical files are retained rather than rewritten out of the record.

## Phase 1B is complete

The boundary-damage blocker has been resolved with a candidate-blind diplomatic overlay. Frozen SigLA SHA-256:

`cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d`

Repaired clean-v2.1 primary stratum:

- **554** Tablet/Nodule/Roundel words of length 2–8
- **211** documents
- **374** word types
- effective token weight **457**

Hostile diplomatic control suite: **PASS 6/6**.

## Stage 5C: global edge productivity is negative

The unchanged locked Test 2B detector was recalibrated on clean-v2.1 and passed the preregistered 10% synthetic suffix gate **20/20**; negative control **0/20**.

| Candidate | ΔLL | 99% document-bootstrap CI | Result |
|---|---:|---:|---|
| `TI` | -0.5697 | [-3.6315, +2.0194] | **No global edge-productivity evidence** |
| `JA` | +0.9007 | [-3.0357, +4.8210] | **No global edge-productivity evidence** |

Neither is established as a globally productive suffix or assigned a grammatical function.

## Stage 5D: clean-v2.1 morphotactic network is complete

Stage 5D was rebuilt candidate-blind under the referee's tightened rule:

- base stems must be >=2 signs;
- same extension must occur on >=2 base stems and >=2 documents;
- at least one witness must clear hierarchical factorization/truncation;
- no higher-priority epigraphic explanation may account for all witnesses;
- multi-stage transitions require two replicated **complete** `X -> X-Y -> X-Y-Z` ladders;
- no skipped-state inference.

### Blind topology

Primary administrative stratum:

- 23 primitive exact one-sign extension edges
- 16 distinct extension signs
- 4 signs pass blind dual independence
- 2 sibling/fan-out parent motifs
- **0 complete three-state ladders**
- **0 abstract second-stage transitions**

A separate brute-force implementation independently reproduced **0 ladders** in the primary, nonprimary, and full clean-v2.1 corpora.

### Post-unblinding adjudication

| sign | stems | extended docs | Stage 5D status |
|---|---:|---:|---|
| `JA` | 4 | 5 | **PROMOTED local morphotactic edge** |
| `TI` | 3 | 3 | **PROMOTED local morphotactic edge, caveated** |
| `PA` | 2 | 4 | **PROMOTED under referee rule, rule-limited** |
| `RO` | 2 | 2 | **LEVEL 1 exploratory; onomastic veto** |

Promotion here means only a replicated **local formal terminal-extension relation**. It does not override the negative global Test 2B result and does not license a grammatical label.

Two sibling motifs survive:

- `A-RI -> {A-RI-PA, A-RI-SU}`
- `KU-PA -> {KU-PA-JA, KU-PA-RI}`

They are fan-outs, not chains.

### Historical network revisions

- `U -> TI -> NU`: **DIED AS A STAGE 5D CHAIN**. There are zero complete ladders and no clean-v2.1 `U-TI-NU` word.
- `WA -> JA/E`: **not recovered as a lexical-state edge**. One internal `WA-JA` sequence survives in nonprimary ritual material, but not a complete ladder.
- `U -> JA`: **not recovered**.
- `KU-PA3` extension family: **not represented in clean-v2.1**, so Stage 5D makes no linguistic claim about it.

## Stage 5E0: Linear B positive control is complete and failed authorization

Stage 5E0 tested whether a semantics-blind, length-controlled edge-sign detector could predict mechanically defined administrative structure in Linear B before any equivalent method was applied to Linear A.

Frozen DĀMOS v2 asset SHA-256:

`eab9ccdfc4324b62f015bccd5e3f917f256cab8c058840842127eadecfbca2d2`

Secure PY/KN lexical rows analyzed: **9,287**

- Pylos: **5,830**
- Knossos: **3,457**

Five roles passed cross-site abundance/isomorphism screening: `SR01`, `SR02`, `SR03`, `SR05`, `SR09`.

All **10** eligible role/direction combinations passed the frozen cross-site synthetic-effect power gate, but **0** passed the mandatory bidirectional PY <-> KN real-data criterion.

### Level 1: Pylos

**INDETERMINATE / NOT ESTABLISHED.** The leakage-proof stem-document component rule collapsed almost the whole site into one connected component:

- suffix grouping largest component: **98.46%** of rows
- prefix grouping largest component: **98.20%** of rows

No Pylos role/direction cleared the within-site power gate, so real Pylos tests were correctly not scored.

### Level 2: Knossos

**NO POSITIVE; partially testable.** The largest connected components still contained roughly 90–91% of rows. Five role/direction combinations cleared within-site power (`SR02` suffix/prefix, `SR03` suffix/prefix, `SR05` suffix), and all five had negative held-out DeltaLL.

### Level 3: mandatory bidirectional transfer

**FAILED.** Cross-site transfer was adequately powered under the preregistered synthetic OR=2.0 effect.

Two one-direction `KN -> PY` results for `SR01` were positive after Holm correction, but neither corresponding `PY -> KN` transfer passed. Every other eligible role/direction also failed bidirectional replication.

Therefore:

- `level3_positive = []`
- `linear_a_authorized = false`
- Stage 5E1 remains **BLOCKED**
- Phase 6 remains **NOT OPEN**

The correct conclusion is:

> **The frozen Stage 5E0 edge-sign detector did not validate as a site-portable morphosyntactic predictor on blinded Linear B and therefore cannot be applied confirmatorily to Linear A.**

This does not imply that Linear B lacks contextual morphology. It falsifies the sufficiency of this particular frozen detector architecture for the required positive control.

Blind outputs and hashes are archived under `results/stage5e0-linearb-control/blind-run/`. Full result report: [`results/stage5e0-linearb-control/STAGE5E0_BLIND_RESULT.md`](results/stage5e0-linearb-control/STAGE5E0_BLIND_RESULT.md).

Greek annotations may now be opened only for **diagnostic unblinding**. Stage 5E0 itself may not be retuned. Any revised detector must be preregistered as a separate experiment.

## Current interpretation

> **clean-v2.1 supports several replicated local one-stage terminal-extension relations, but no recoverable multi-stage suffix-transition network. The first context-conditioned detector failed its Linear B positive-control authorization gate.**

The strongest current positive Linear A evidence remains the shallow local JA/TI/PA extension structure from Stage 5D. No grammatical function is licensed.

The next scientifically justified action is diagnostic unblinding of the frozen Linear B control to determine why the edge-sign-only detector failed: whether the failure arises from Linear B orthographic realization of morphology, over-coarse edge representation, structural-role mismatch, or another identifiable mechanism. That diagnosis may motivate a separately preregistered Stage 5E0b, but cannot alter Stage 5E0.

## Roadmap

- Phase 1B diplomatic reconstruction: **COMPLETE**
- Stage 5C global TI/JA edge productivity: **COMPLETE — NEGATIVE**
- Stage 5D one-stage morphotactic network: **COMPLETE**
- Stage 5D multi-stage chaining: **COMPLETE — ZERO VALIDATED CHAINS**
- Stage 5E0 Linear B positive control: **COMPLETE — LEVEL 3 NOT ESTABLISHED**
- Stage 5E0 diagnostic Greek unblinding: **AUTHORIZED, NOT YET EXECUTED**
- Stage 5E1 Linear A contextual morphology: **BLOCKED**
- Phase 6 grammatical inference: **NOT OPEN**

Phase 1B report: [`results/phase1b-confirmatory-v2.1/`](results/phase1b-confirmatory-v2.1/)  
Stage 5D report: [`results/stage5d-clean-v2.1/`](results/stage5d-clean-v2.1/)  
Stage 5E0 control: [`results/stage5e0-linearb-control/`](results/stage5e0-linearb-control/)
