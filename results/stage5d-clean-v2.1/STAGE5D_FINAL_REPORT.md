# Stage 5D Final Report — clean-v2.1 Morphotactic Network

**Date:** 2026-08-20  
**Status:** **STAGE 5D COMPLETE**  
**Interpretation ceiling:** formal morphotactics only; Phase 6 grammatical inference remains CLOSED.

## 1. Method lock

The experiment was frozen before inspecting new sign-specific results.

- clean-v2.1 SHA-256: `83298a8c5b8f852edaf8d0f25bcc7affb07a71aa27561169f5152ad5bf28b3c9`
- diplomatic census SHA-256: `7f116db2b32eeaf1c639e0c54f0c4755c6b4144e4ddf03c17af51e9121f0c8f5`
- preregistration SHA-256: `93ed22b16c9d16d75e29e52013ac52abb7687dd9169f21e27df882803aa74a4c`
- blind-network script SHA-256: `b54a917510bdb1369df33a59080fa522a0cc46d0584d397c4cd948d177f85e63`
- pre-unblinding blind-lock SHA-256: `da7d5ca6fde2964251bf2508d45a62ae4206c35960a670865768f129fbb03557`

Primitive lexical-state edges were defined only as exact one-sign terminal extensions `X -> X-Y`, with `len(X) >= 2`. A multi-stage chain required all three independently attested complete forms `X`, `X-Y`, and `X-Y-Z`. No skipped-state inference was permitted.

Primary promotion and nonprimary material were analyzed separately; ritual/nonprimary evidence was never pooled into the administrative promotion network.

## 2. Blind result before sign identities were opened

### Primary administrative stratum

- 554 tokens
- 211 documents
- 374 word types
- 23 primitive exact one-sign extension edges
- 16 distinct extension signs
- 4 extension signs passed blind dual independence
- 2 sibling/fan-out parent motifs
- **0 complete three-state ladders**
- **0 abstract second-stage transitions**

### Nonprimary stratum

- 26 tokens
- 23 documents
- 26 types
- 1 primitive extension edge
- 0 dual-independent extension signs
- **0 complete three-state ladders**

### Independent verification

A second brute-force implementation, not importing the Stage 5D code, independently reproduced:

- primary: 374 types / 23 edges / **0 ladders**
- nonprimary: 26 types / 1 edge / **0 ladders**
- full: 399 types / 24 edges / **0 ladders**

This is the central Stage 5D result:

> **clean-v2.1 contains no complete `X -> X-Y -> X-Y-Z` lexical-state ladder at all.**

Therefore no multi-stage morphotactic transition can be promoted under the referee's mandatory rule.

## 3. Chain versus sibling topology

The algorithm behaved as preregistered.

There are **no CHAIN motifs**.

There are two primary SIBLING/fan-out motifs:

1. `A-RI -> A-RI-PA` and `A-RI -> A-RI-SU`
2. `KU-PA -> KU-PA-JA` and `KU-PA -> KU-PA-RI`

These are common-parent branches, not paths, and are therefore not evidence for ordered suffix chaining.

## 4. Unblinded simple extension candidates

Four extension signs reached the blind dual-independence gate:

| sign | distinct base stems | extended-form documents | sites | blind dual independence |
|---|---:|---:|---:|---|
| `JA` | 4 | 5 | 4 | PASS |
| `TI` | 3 | 3 | 4 | PASS |
| `PA` | 2 | 4 | 3 | PASS |
| `RO` | 2 | 2 | 4 | PASS |

The referee required factorization clearance and a no-superseding-epigraphy review before promotion.

## 5. Factorization and epigraphic adjudication

### JA — PROMOTED LOCAL MORPHOTACTIC EDGE

Witness families:

- `*306-TU ~ *306-TU-JA`
- `A-MA ~ A-MA-JA`
- `KU-PA ~ KU-PA-JA`
- `PA-SE ~ PA-SE-JA`

Factorization clearance is direct: `PA-SE-JA` occurs on HT Wc 3001 and HT Wc 3002, each an isolated lexical statement in the diplomatic census. The extension therefore cannot be produced there by a same-document header-to-subentry truncation relation.

The clean-v2.1 JA addendum preserves all four exact formal relations. Individual families have lexical/onomastic caveats, but no single higher-priority epigraphic explanation accounts for all four.

**Stage 5D status:** `PROMOTED_LOCAL_MORPHOTACTIC_EDGE`.

This does **not** reverse Test 2B. JA still lacks global edge-productivity evidence and is not established as a universal suffix or assigned a grammatical function.

### TI — PROMOTED LOCAL MORPHOTACTIC EDGE WITH CAVEATS

Witness families:

- `DA-KU-SE-NE ~ DA-KU-SE-NE-TI`
- `JA-KU ~ JA-KU-TI`
- `RI-RU-MA ~ RI-RU-MA-TI`

HT 104 clears the factorization trap: `DA-KU-SE-NE-TI` is a coordinate quantified entry parallel to `I-DU-TI` and `PA-DA-SU-TI`, not a nested header/subentry artifact.

A competing segmentation of final TI as a separate ideogram is explicitly preserved for HT 104. Nevertheless, the earlier TI audit retains all three current relations as formal survivors, and no one higher-priority epigraphic explanation accounts for all three.

**Stage 5D status:** `PROMOTED_LOCAL_MORPHOTACTIC_EDGE_WITH_CAVEATS`.

This is compatible with the negative global Test 2B result: TI may participate in restricted formal constructions without being a globally productive terminal marker.

### PA — PROMOTED UNDER THE REFEREE RULE, BUT RULE-LIMITED

Witness families:

- `A-RI ~ A-RI-PA`
- `KA-KU ~ KA-KU-PA`

PE 2 supplies factorization clearance. `A-RI-PA` is a coordinate list entry with its own fraction, not a nested header truncation.

The previous PA audit remains important: `KA-KU ~ KA-KU-PA` was Tier B, while `A-RI ~ A-RI-PA` was only Tier C/comparison-only because lexical identity is weak. However, the referee's mandatory rule set a two-sign minimum stem length and vetoed promotion only when a higher-priority epigraphic explanation accounts for the evidence. No such common explanation is known for both PA families.

**Stage 5D status:** `PROMOTED_LOCAL_MORPHOTACTIC_EDGE_RULE_LIMITED`.

This is deliberately narrower than saying “productive PA morphology.” The older conclusion that productive final PA was not established is not erased; Stage 5D says only that PA satisfies the newly frozen formal-network promotion rule.

### RO — FAILS EPIGRAPHIC GATE; LEVEL 1

Witness families:

- `A-DA ~ A-DA-RO`
- `SA-MA ~ SA-MA-RO`

ARKH 5 clears factorization: `A-DA-RO` is a coordinate statement associated with `GRA 40`.

But the epigraphic/lexical veto fires. `SA-MA-RO` is independently name-like, and the ARKH 5 commentary describes its relevant A-forms as names. An onomastic/lexical explanation can therefore account for both RO extended witnesses without requiring a recurrent morphological transition.

**Stage 5D status:** `LEVEL_1_EXPLORATORY`.

## 6. Historical network hypotheses after unblinding

Historical paths were not consulted until the blind topology and hashes were frozen.

### `U -> TI -> NU`

**DIES as a Stage 5D morphotactic chain.**

- There are zero complete three-state ladders anywhere in clean-v2.1.
- `U-TI-NU` has zero clean-v2.1 occurrences.
- standalone `U-TI` survives once, on HT 10b.
- `TI-NU` occurs once only as the beginning of the unrelated clean word `TI-NU-JA` on HT 115b.

The historically attractive ritual/internal sequence may remain a formulaic observation in damaged or excluded material, but it is not a validated lexical-state chain under Stage 5D.

### `WA -> JA/E`

**Not recovered as a lexical-state edge.**

`WA-JA` survives only as an internal sequence in `A-TA-I-*301-WA-JA` on the nonprimary libation table SY Za 4. There is no clean-v2.1 complete-base extension path establishing `...-WA -> ...-WA-JA`, and `WA-E` is absent.

### `U -> JA`

**Not recovered.** No `U-JA` adjacency occurs in clean-v2.1 and no exact lexical-state edge encodes it.

### `KU-PA3` extension family

No `KU-PA3` / `KU-PA₃` token is represented in clean-v2.1's frozen normalized token layer. Stage 5D therefore makes no linguistic claim about the family; it simply cannot support the repaired network.

## 7. Scientific verdict

Stage 5D does **not** recover an agglutinative chain network.

The repaired corpus supports a much shallower topology:

- three promoted **local one-stage formal extension edges**: `JA`, `TI`, and rule-limited `PA`;
- one dual-independent but epigraphically rejected edge: `RO`;
- two sibling/fan-out motifs;
- **zero complete multi-stage ladders**;
- **zero validated second-stage transitions**.

This materially revises the pre-Phase-1B picture. The strongest historical chained sequence, `U -> TI -> NU`, does not survive the referee's complete-ladder requirement.

The appropriate structural interpretation is therefore:

> **Linear A clean-v2.1 contains replicated local terminal-extension relations, but Stage 5D finds no evidence for a recoverable multi-stage suffix-transition network.**

## 8. Roadmap consequence

- Phase 1B: COMPLETE
- Stage 5C global TI/JA productivity: COMPLETE — NEGATIVE
- Stage 5D one-stage morphotactic network: COMPLETE
- Stage 5D multi-stage chaining: COMPLETE — **ZERO VALIDATED CHAINS**
- historical `U -> TI -> NU`: **DIED AS A STAGE 5D CHAIN**
- Phase 6 grammatical inference: **NOT OPEN**

The next justified work is not to assign meanings to JA/TI/PA. It is to test whether the three promoted local edges predict independent structural/contextual contrasts across their surviving stem families. That is the gate required before any grammatical inference.
