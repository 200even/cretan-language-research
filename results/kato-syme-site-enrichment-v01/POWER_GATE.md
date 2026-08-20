# Kato Syme Phase A Power Gate

**Terminal status:** `INDETERMINATE_DUE_TO_SPARSITY`  
**Date:** 2026-08-20  
**Protocol:** `experiments/kato-syme-site-enrichment-v01.md`

## Decision

Phase A terminates at the preregistered power gate **before any real candidate-enrichment test is run**.

The frozen lineara.xyz source at commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a` contains 12 Syme inscriptions in the local inventory, of which 11 are stone vessels and one (`SYZb7`) is a clay vessel. The broadest defensible matched stone-vessel Phase A frame therefore has at most **11 Syme observations**.

An independently published 2026 computational index of the cross-site stone-vessel/formula corpus contains 31 objects across 14 sites, including two Syme objects and **29 non-Syme controls**. This index is used here only to establish a realistic matched-control count for the power calculation; no candidate identities or frequencies are used.

## Exact optimistic upper-bound calculation

The preregistered minimum qualifying effect requires:

- true odds ratio = 4.0;
- at least 2 independent Syme inscriptions containing the injected feature;
- observed odds ratio >= 4.0;
- one-sided Fisher exact p <= 0.05.

For every possible control prevalence from 0.001 through 0.799, the exact binomial probability of landing in a qualifying 2x2 table was computed. This is deliberately **more permissive than the confirmatory pipeline** because it does **not** apply:

- Benjamini-Hochberg FDR correction;
- chronology matching;
- preservation/edge-security exclusions;
- formula-position controls;
- object/context stratification;
- regional controls.

Therefore this calculation is an optimistic upper bound on actual confirmatory power.

| Syme n | Control n | Max exact power at OR=4 | 80% gate |
|---:|---:|---:|---|
| 11 | 29 | 0.489239 | FAIL |
| 11 | 35 | 0.500013 | FAIL |
| 11 | 50 | 0.526245 | FAIL |
| 11 | 100 | 0.533504 | FAIL |

The realistic 29-control frame peaks at only **48.9% uncorrected power**. Adding substantially more controls does not repair the principal bottleneck because the Syme side remains capped at 11 inscriptions.

## Consequence

The protocol requires >=80% synthetic power before an empirical null may be called `NEGATIVE`. Because even the optimistic uncorrected exact model cannot approach that threshold, a full candidate-level Phase A run cannot produce a valid negative conclusion.

Accordingly:

- no Syme candidate identities are opened or ranked;
- no Fisher/BH enrichment table is generated from real sign groups;
- no thresholds are relaxed;
- no singleton is promoted;
- Phase A is frozen permanently as `INDETERMINATE_DUE_TO_SPARSITY`.

This is a power result only. It is **not evidence that Kato Syme lacks locally enriched Linear A vocabulary**.

## Contingency activation

The preregistered activation condition for `experiments/pan-cretan-rare-ritual-register-v01.md` is now satisfied. Phase B may proceed using a corpus-wide candidate universe that is independent of all Phase A candidate identities.

## Reproducibility

- code: `scripts/kato-syme/power_gate.py`
- output: `results/kato-syme-site-enrichment-v01/power-gate-output.csv`
- Syme inventory: `data/kato-syme/syme-inventory-v01.csv`
- external control index: `data/kato-syme/formula-control-index-v01.csv`

No semantic or Ephoran information entered the calculation.
