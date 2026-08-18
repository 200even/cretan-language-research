# Comparative audit result: final `QE`, `SU`, and `WI`

**Status:** completed against the rule registered in `experiments/qe-su-wi-comparative-audit.md`.  
**Primary result:** **none of the three suffixes meets the registered productivity criterion.**

## Result table

| suffix | pair 1 | pair 2 | A/B survivors | Tier A | productivity |
|---|---|---|---:|---:|---|
| `QE` | `KA-PA ~ KA-PA-QE` — **A** | `SA-RO ~ SA-RO-QE` — **rejected** | **1/2** | **1** | not established |
| `SU` | `KU-NI ~ KU-NI-SU` — **rejected** | `A-RI ~ A-RI-SU` — **C** | **0/2** | 0 | not established |
| `WI` | `JA-DI ~ JA-DI-WI` — **rejected** | `PA3-NI ~ PA3-NI-WI` — **B** | **1/2** | 0 | not established |

The registered rule required both independent stem families for a suffix to survive at Tier A/B. No candidate satisfies that rule.

## Strongest positive: `KA-PA ~ KA-PA-QE`

This is one of the cleaner local relationships in the benchmark because both complete forms occur on HT 6a under the same scribal production context:

```text
KA-PA •
...
KA-PA-QE 5 + fraction
```

It is promoted to Tier A **formal morphology**. The apparent role contrast is not a semantic gloss for `QE`, and no equation with Linear B/Greek `-qe` is made.

## Source-audit failures exposed by the screen

The experiment discovered that three v0.4 “structurally secure” pairs were not secure in the higher-fidelity damage-preserving source layer.

### `SA-RO-QE`

HT 73 preserves:

```text
SA-RO-QE[
```

The final boundary is broken. The normalized corpus lost the continuation marker.

### `JA-DI-WI`

KN Zb 35 preserves separated damaged material:

```text
]JA[   ]DI-[   ]WI[
```

The normalized corpus joined those segments into a syllabic-looking `JA-DI-WI` word. This adds a new failure class: **segmented-fragment flattening**.

### `KU-NI`

The normalized HT 79+83 item page parses `KU-NI` as a complete word, but the separate GORILA-derived damage-preserving commentary gives:

```text
]KU-NI[
```

Under the project's source hierarchy, the latter prevents promotion of `KU-NI` as a secure whole-word base. This reverses the project's earlier correction that had promoted `KU-NI ~ KU-NI-TE` to Tier B. The older v0.3 regression PASS is unaffected because `KU-NI` was never one of its six retained-positive regression controls.

## Comparative interpretation

The screen does not uncover a second productive suffix comparable to `JA`.

- `QE` has one unusually strong Tier-A family and should remain a high-priority local lead.
- `SU` has no current A/B exact-pair support.
- `WI` has one Tier-B family whose administrative-to-ritual and likely onomastic/relational profile prevents stronger promotion.

No grammatical function is assigned to any of the three.

## Pipeline consequence

The main result is now partly corpus-engineering rather than linguistic. v0.4 remains a frozen historical experiment, but the newly discovered source inconsistencies should be preregistered as negative controls for **v0.5**, including:

1. `SA-RO ~ SA-RO-QE` — lost right-boundary damage;
2. `JA-DI ~ JA-DI-WI` — segmented-fragment flattening;
3. `KU-NI ~ KU-NI-SU` — normalized/damage-preserving source conflict;
4. `KU-NI ~ KU-NI-TE` — same insecure-base correction affecting the Davis `TE` audit.

The next discovery run should therefore improve source consistency before descending farther through the v0.4 ranking.

## Non-claim

This experiment does not translate `QE`, `SU`, or `WI`; identify grammatical cases or conjunctions; or establish an etymological relationship to another language. It tests only whether exact stem-plus-final-sign families survive source and epigraphic audit.
