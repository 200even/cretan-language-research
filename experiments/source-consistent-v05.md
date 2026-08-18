# Source-consistent morphology v0.5

**Status:** registered before the first v0.5 full-corpus ranking.  
**Upstream corpus:** `mwenge/lineara.xyz` pinned at `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**Predecessor:** frozen structural-aware v0.4.

## Research question

The hostile QE/SU/WI audit found three source-representation failures that survived v0.4:

1. a combined-fragment inscription ID failed to reconcile with the corpus ID, allowing terminal damage on `SA-RO-QE[` to disappear;
2. HT 79 commentary identifies the object as HT 79 [+] 83, but v0.4 keyed its damage mask only to the commentary filename, allowing normalized `KU-NI` to survive;
3. KN Zb 35 contains several separately damaged sign fragments, but normalized tokenization joined them into apparent `JA-DI-WI`.

v0.5 asks:

> Can a generic source-consistency layer reconcile inscription identities and detect segmented-fragment flattening before morphology generation, while retaining audited boundary-secure controls?

## Frozen acceptance gate

`data/v05-regression-set.csv` was frozen before the first v0.5 ranking.

It contains:

- **30 exclusion controls**, consisting of the valid v0.4 structural negatives plus the corrected `KU-NI ~ KU-NI-TE` case and the new QE/SU/WI source failures;
- **13 retention controls**, including established Tier-A morphology controls and audited structurally complete QE/SU/WI comparisons.

Success requires **30/30 exclusions** and **13/13 retentions**.

## What changes from v0.4

Only source reconciliation/extraction changes. The ranking and scoring implementation remains the frozen v0.4 method and is invoked unchanged by `scripts/rank-affixes-v05.mjs`.

The v0.5 source mask adds two generic mechanisms:

1. **inscription alias reconciliation**: combined object identifiers embedded in commentary headings, such as `HT 79 [+] 83`, are normalized to the same ID convention as corpus records (`HT79+83`), instead of relying only on commentary filenames;
2. **segmented-fragment flattening detection**: when one statement cell contains multiple independently broken sign groups, contiguous combinations are registered as ineligible normalized words. This prevents material such as `]JA[ ]DI-[ ]WI[` from becoming an apparent `JA-DI-WI` token.

Existing v0.4 controls for physical boundaries, editorial continuation, complex/logographic forms, cross-script contamination, and authoritative source overrides remain active.

## Interpretation rule

A v0.5 retained exact pair is still only a structural candidate. Lexical identity, onomastics, scribe/context, and grammatical function remain promotion-stage questions.

Frozen v0.3 and v0.4 outputs remain historical and are not rewritten.
