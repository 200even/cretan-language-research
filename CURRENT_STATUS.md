# Current Research Status

**Authoritative project status as of 2026-08-20.**

This file supersedes stronger productiveness wording in older discovery-run READMEs and candidate audits wherever they conflict with the clean-v2.1 confirmatory and Stage 5D results. Historical files are retained rather than rewritten out of the record.

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

## Stage 5E0: Linear B positive control has begun

The referee-approved context-conditioned morphology architecture is now **FROZEN before any Linear B edge-sign results are inspected**.

Primary control domains:

- Pylos (PY)
- Knossos (KN)

Mandatory Level-3 authorization requires **bidirectional PY -> KN and KN -> PY transfer** on structural roles that independently pass the cross-site isomorphism and power gates.

Mycenae/Thebes remain a sealed Level-4 holdout. Failure there can invalidate only an adequately powered test; underpowered Level-4 results are `INDETERMINATE_DUE_TO_SPARSITY` and cannot trigger PY/KN retuning.

### Frozen semantic firewall

- All logograms collapse immediately to one `[LOGOGRAM]` class.
- All numeric values collapse to `[NUMBER]`.
- Structural roles are generated only from raw line breaks, token order, character-column geometry and generic token classes.
- No translations, lemmas, Greek morphology, commodity identities, tablet-series labels or known administrative interpretations may enter role construction or prediction.
- Confirmatory suffix models see only `[MASKED_STEM] + FINAL_SIGN`; confirmatory prefix models see only `INITIAL_SIGN + [MASKED_STEM]`.
- Stem and document leakage are jointly prevented with connected components of a stem-document bipartite graph.
- Word length is explicitly included in baseline `M0`; edge signs enter only in `M1`, so the primary statistic asks whether the edge improves held-out prediction beyond length/document controls.

### Frozen structural outcomes

Nine anonymous roles (`SR01`-`SR09`) are mechanically defined from generic layout predicates, including direct numeric adjacency, generic-logogram adjacency, repeated parallel rows, quantified parallel entries, indented child blocks, geometric parent rows and sole-lexical rows. Human-readable aliases are descriptive only and carry no administrative semantics.

A role is Level-3 transfer-eligible only if it has at least 100 positives, 100 negatives and 30 positive documents at **both** PY and KN, passes document-concentration control, and passes the frozen anonymous synthetic-effect power gate.

Frozen DĀMOS v2 asset SHA-256:

`eab9ccdfc4324b62f015bccd5e3f917f256cab8c058840842127eadecfbca2d2`

Protocol: [`results/stage5e0-linearb-control/STAGE5E0_PROTOCOL_LOCK.md`](results/stage5e0-linearb-control/STAGE5E0_PROTOCOL_LOCK.md)  
Extractor: [`scripts/stage5e0/extract_structural_roles.py`](scripts/stage5e0/extract_structural_roles.py)

**Current Stage 5E0 status:** architecture/source/role grammar frozen; corpus extraction and blind role census are the next execution step. Greek linguistic annotation remains sealed.

## Current interpretation

> **clean-v2.1 supports several replicated local one-stage terminal-extension relations, but no recoverable multi-stage suffix-transition network.**

The strongest new negative result is structural: there is no clean-v2.1 evidence satisfying the preregistered definition of an agglutinative `X -> X-Y -> X-Y-Z` chain.

The project is now testing a more consequential proposition: whether morphology can predict independently defined administrative structure under a method first validated on deciphered-but-blinded Linear B.

## Roadmap

- Phase 1B diplomatic reconstruction: **COMPLETE**
- Stage 5C global TI/JA edge productivity: **COMPLETE — NEGATIVE**
- Stage 5D one-stage morphotactic network: **COMPLETE**
- Stage 5D multi-stage chaining: **COMPLETE — ZERO VALIDATED CHAINS**
- Stage 5E0 Linear B positive control: **ACTIVE — PROTOCOL FROZEN**
- Stage 5E1 Linear A contextual morphology: **BLOCKED pending Level-3 PY <-> KN authorization**
- Phase 6 grammatical inference: **NOT OPEN**

Phase 1B report: [`results/phase1b-confirmatory-v2.1/`](results/phase1b-confirmatory-v2.1/)  
Stage 5D report: [`results/stage5d-clean-v2.1/`](results/stage5d-clean-v2.1/)  
Stage 5E0 preregistration: [`results/stage5e0-linearb-control/`](results/stage5e0-linearb-control/)
