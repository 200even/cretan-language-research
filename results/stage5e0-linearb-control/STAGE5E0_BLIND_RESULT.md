# Stage 5E0 blind Linear B positive-control result

**Frozen result date:** 2026-08-21  
**Protocol:** `STAGE5E0_PROTOCOL_LOCK.md`  
**Status:** **LEVEL 3 NOT ESTABLISHED; LINEAR A NOT AUTHORIZED**

This report records the result of the preregistered, semantics-blind Linear B context-conditioned morphology control before any Greek linguistic annotation is opened.

## Frozen source and output integrity

Frozen DĀMOS v2 asset SHA-256:

`eab9ccdfc4324b62f015bccd5e3f917f256cab8c058840842127eadecfbca2d2`

Secure PY/KN lexical rows analyzed: **9,287**

- Pylos: **5,830**
- Knossos: **3,457**

Blind result hashes:

- `blind_real_tests.csv`: `c2f2617c8cc4b16afd722846e59f130ef57fb393c0cd7ddb1c58a9cc303ceeac`
- `blind_summary.json`: `1c19ce77fbc8fd882ac13361703bb1d7e825ab1af9e3a1b82796b91f10705068`
- `role_census.csv`: `57eff8ae0a55828986e2f7957d9cc5871e7a9132fe852af60c3da1299623e7d2`
- `synthetic_power.csv`: `3058db32199e05e3f859382823a1a60e5b38b50049defb79df2a77396e3710fc`
- anonymous structural-role table: `06c38f3cebd976f610f6efb62c20672f01067d89a9722a9c0bcdeb6ecede004b`

## Cross-site isomorphism census

Five anonymous structural roles passed the preregistered abundance criterion at both Pylos and Knossos:

- `SR01`
- `SR02`
- `SR03`
- `SR05`
- `SR09`

`SR04`, `SR06`, `SR07`, and `SR08` failed abundance/document-count requirements at one or both sites and were excluded from Level 3.

All ten eligible role/direction combinations (five roles × suffix/prefix) passed the blinded synthetic-effect **cross-site transfer power gate** at OR = 2.0. Thus the mandatory Level-3 test was not underpowered under the preregistered target effect.

## Level 1: Pylos within-site control

**Verdict: INDETERMINATE / NOT ESTABLISHED because the leakage-proof component split nearly collapsed.**

The stem-document bipartite grouping produced a largest connected component containing:

- suffix grouping: **5,740 / 5,830 rows = 98.46%**
- prefix grouping: **5,725 / 5,830 rows = 98.20%**

Consequently, no Pylos role/direction passed the preregistered within-site synthetic-power gate. The real Pylos morphology tests were therefore correctly recorded as `NOT_SCORED_POWER_GATE` rather than negative evidence.

This is a structural limitation of the frozen within-site fold architecture, not evidence against Linear B morphology.

## Level 2: Knossos within-site control

**Verdict: NO POSITIVE; partially testable.**

Knossos also showed a dominant connected component, though less extreme:

- suffix grouping: **3,126 / 3,457 rows = 90.43%**
- prefix grouping: **3,154 / 3,457 rows = 91.24%**

Only five Knossos role/direction combinations cleared the within-site synthetic-power gate:

- `SR02` suffix
- `SR02` prefix
- `SR03` suffix
- `SR03` prefix
- `SR05` suffix

None produced a positive held-out morphology result. Observed DeltaLL values were all negative:

- `SR02` suffix: **-13.1764**
- `SR02` prefix: **-24.7977**
- `SR03` suffix: **-26.8504**
- `SR03` prefix: **-14.0079**
- `SR05` suffix: **-6.8254**

No Level-2 positive was established.

## Level 3: mandatory bidirectional PY <-> KN transfer

**Verdict: FAILED.**

All ten eligible cross-site role/direction tests were adequately powered by the frozen synthetic-effect criterion and were scored in both directions.

Two one-direction results were positive after Holm correction:

- `SR01` suffix, **KN -> PY**: DeltaLL **+21.1920**, 99% CI **[+11.3633, +31.2671]**
- `SR01` prefix, **KN -> PY**: DeltaLL **+29.5819**, 99% CI **[+19.8763, +40.2702]**

But the required reverse transfers did not pass:

- `SR01` suffix, **PY -> KN**: DeltaLL **-0.5280**, 99% CI **[-18.8206, +18.1720]**
- `SR01` prefix, **PY -> KN**: DeltaLL **+8.9797**, 99% CI **[-10.9100, +28.8875]**

All other eligible role/direction transfers failed, with most showing negative DeltaLL in both directions.

Therefore **zero anonymous role/direction pairs satisfy the preregistered bidirectional Level-3 criterion**.

## Authorization consequence

`linear_a_authorized = false`

Stage 5E1 on Linear A remains **BLOCKED**. Phase 6 remains **NOT OPEN**.

The correct scientific statement is:

> **The frozen Stage 5E0 edge-sign detector did not validate as a site-portable morphosyntactic predictor on blinded Linear B. It therefore cannot be applied confirmatorily to Linear A.**

This does **not** show that Linear B lacks contextual morphology, nor that contextual morphology is impossible to recover computationally. It falsifies the specific frozen detector architecture as sufficient for the required positive control.

## Diagnostic implication

Two distinct issues must not be conflated:

1. **Within-site fold pathology:** exact stem-document connected-component separation creates giant components and makes Level 1/2 testing poorly powered. This is a design limitation of the frozen within-site CV scheme.
2. **Cross-site detector failure:** Level 3 does not depend on those within-site components, passed its synthetic transfer-power gate, and still failed mandatory bidirectional replication. This is a genuine failure of the current edge-sign-only architecture under its preregistered target effect.

Greek linguistic annotation may now be opened strictly for **diagnostic unblinding**, because the blind Level 1-3 outcomes and hashes are frozen. No role definition, threshold, model feature, fold rule, or decision criterion may be retroactively changed in Stage 5E0.

Any revised detector must be preregistered as a new experiment (e.g. Stage 5E0b) and must not be described as a rescue of the failed frozen Stage 5E0 test.
