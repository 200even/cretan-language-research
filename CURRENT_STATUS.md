# Current Research Status

**Authoritative project status as of 2026-08-20.**

This file supersedes stronger productiveness wording in older discovery-run READMEs and candidate audits wherever they conflict with the Phase 1B clean-v2.1 confirmatory result. Historical files are retained rather than rewritten out of the record.

## Phase 1B is complete

The boundary-damage blocker has been resolved with a candidate-blind diplomatic overlay. The frozen SigLA source hash is:

`cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d`

The original Step-2 population was reconstructed against its frozen fingerprints:

- 1,401 total word tokens
- 1,036 clean
- original primary stratum: 821 tokens / 310 documents / 589 word types / effective weight 696

The repaired clean-v2.1 primary stratum contains:

- **554** Tablet/Nodule/Roundel words of length 2–8
- **211** documents
- **374** word types
- effective token weight **457**

The hostile diplomatic control suite passes **6/6**.

## Test 2B: global edge productivity

The unchanged locked detector (`04_run_blind_calibration.py`, SHA-256 `f19a24af71afd25091734638377f99570a3d370ef3022f1261850dc6a660e6be`) was recalibrated on clean-v2.1.

The preregistered 10% synthetic suffix gate passes **20/20**, with exact 95% lower power bound **0.8316** and weakest 99% ΔLL lower bound **+4.6245**. Negative control: **0/20** false-positive recoveries.

| Candidate | ΔLL | 99% document-bootstrap CI | Current global result |
|---|---:|---:|---|
| `TI` | -0.5697 | [-3.6315, +2.0194] | **No global edge-productivity evidence** |
| `JA` | +0.9007 | [-3.0357, +4.8210] | **No global edge-productivity evidence** |

The conclusion is stable across 100 independently hash-derived bootstrap seeds per candidate.

## Local exact-pair evidence

The negative global result does not erase local formal relations.

`JA` retains four exact one-sign extensions on the repaired corpus:

- `*306-TU ~ *306-TU-JA`
- `A-MA ~ A-MA-JA`
- `KU-PA ~ KU-PA-JA`
- `PA-SE ~ PA-SE-JA`

`TI` retains three:

- `DA-KU-SE-NE ~ DA-KU-SE-NE-TI`
- `JA-KU ~ JA-KU-TI`
- `RI-RU-MA ~ RI-RU-MA-TI`

The earlier `SA-MA ~ SA-MA-TI` relation is eliminated because HT 39 is diplomatically `]SA-MA-TI`.

No TI or JA short/long pair co-occurs on the same document. Under the frozen sparsity rule, suffixing versus truncation/factorization remains **INDETERMINATE** for every TI/JA pair.

Current grades:

- **TI: C+/B−, Level 2A local candidate.** Global Test 2B negative; all surviving exact relations have substantial alternative-analysis caveats.
- **JA: B, replicated Level 2A structural candidate.** Global Test 2B negative; four exact cross-stem patterns survive, but `JA` is not established as a productive suffix or assigned a grammatical function.

## Roadmap consequence

- Phase 1B diplomatic reconstruction: **COMPLETE**
- Stage 5C global TI/JA edge-productivity test: **COMPLETE — NEGATIVE**
- TI/JA exact-pair reassessment: **COMPLETE**
- truncation/factorization discriminator: **INDETERMINATE for all TI/JA pairs**
- Stage 5D suffix-transition network: **UNBLOCKED, but must be rebuilt from clean-v2.1**
- Phase 6 grammatical inference: **NOT OPEN**

Full report and reproducibility artifacts: [`results/phase1b-confirmatory-v2.1/`](results/phase1b-confirmatory-v2.1/).
