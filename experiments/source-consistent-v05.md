# Source-consistent morphology v0.5

**Status:** completed; frozen regression gate passed.  
**Upstream corpus:** `mwenge/lineara.xyz` pinned at `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**Predecessor:** frozen structural-aware v0.4.  
**Generated results:** [`../results/source-consistent-v0.5/`](../results/source-consistent-v0.5/).

## Research question

The hostile QE/SU/WI audit found three source-representation failures that survived v0.4:

1. a combined-fragment inscription ID failed to reconcile with the corpus ID, allowing terminal damage on `SA-RO-QE[` to disappear;
2. HT 79 commentary identifies the object as HT 79 [+] 83, but v0.4 keyed its damage mask only to the commentary filename, allowing normalized `KU-NI` to survive;
3. KN Zb 35 contains several separately damaged sign fragments, but normalized tokenization joined them into apparent `JA-DI-WI`.

v0.5 asked:

> Can a generic source-consistency layer reconcile inscription identities and detect segmented-fragment flattening before morphology generation, while retaining audited boundary-secure controls?

## Frozen acceptance gate

`data/v05-regression-set.csv` was frozen before the first v0.5 ranking.

It contains:

- **30 exclusion controls**, consisting of the valid v0.4 structural negatives plus the corrected `KU-NI ~ KU-NI-TE` case and the new QE/SU/WI source failures;
- **13 retention controls**, including established Tier-A morphology controls and audited structurally complete QE/SU/WI comparisons.

Success required **30/30 exclusions** and **13/13 retentions**.

## Development result

The first v0.5 run reached **29/30 exclusions** and **13/13 retentions**. The sole miss was `SA-RO ~ SA-RO-QE`.

The failure exposed a generic parser limitation rather than a bad regression label: HT 62 [+] 73 contains separate inscription tables for its fragments, and the inherited v0.4 boundary scanner examined only the first table. `SA-RO-QE[` occurs in the second inscription table.

The fix was therefore generic: v0.5 now scans every table explicitly structured as an inscription table, while continuing to ignore free-form explanatory prose.

## Final regression result

> **30/30 frozen structural/source negatives excluded; 13/13 secure controls retained. PASS.**

See [`../results/source-consistent-v0.5/REGRESSION.md`](../results/source-consistent-v0.5/REGRESSION.md).

## What changes from v0.4

Only source reconciliation/extraction changes. The ranking and scoring implementation remains the frozen v0.4 method and is invoked unchanged by `scripts/rank-affixes-v05.mjs`.

The v0.5 source mask adds three generic mechanisms:

1. **inscription alias reconciliation**: combined object identifiers embedded in commentary headings, such as `HT 79 [+] 83`, are normalized to the same ID convention as corpus records (`HT79+83`), instead of relying only on commentary filenames;
2. **segmented-fragment flattening detection**: when one statement cell contains multiple independently broken sign groups, contiguous combinations are registered as ineligible normalized words. This prevents material such as `]JA[ ]DI-[ ]WI[` from becoming an apparent `JA-DI-WI` token;
3. **multi-table inscription scanning**: all tables with explicit inscription structure are checked for physical boundaries, rather than assuming the first table contains the entire object.

Existing v0.4 controls for physical boundaries, editorial continuation, complex/logographic forms, cross-script contamination, and authoritative source overrides remain active.

## Corpus effect

The unchanged candidate layer begins with **1,285** syllabic occurrences and **931** unique cleaned forms.

After v0.5 source/type masking:

- **938** occurrences remain;
- **347** are excluded;
- **672** unique retained forms remain.

For comparison, v0.4 retained 951 occurrences and 681 unique forms. v0.5 therefore removes **13 additional occurrences and 9 additional normalized forms** without changing the ranking formulas.

Exclusion counts in the final run include 327 physical-boundary occurrences, 9 editorial continuations, 8 complex/logographic occurrences, 2 cross-script occurrences, 2 authoritative-source occurrences, and 1 segmented-fragment flattening occurrence. Evidence classes can overlap on one attestation.

## Paradigm consequences

The strongest audited signals remain stable:

- prefix `A`: **6** structural exact pairs, rank #1;
- prefix `I`: **4**, rank #3;
- suffix `JA`: **5**, rank #1;
- suffix `TI`: **3**, rank #2.

The source corrections materially reduce several weaker candidates:

- `RA`: **3 → 2** structural pairs because the apparent bare `SA-RA` source is not securely bounded in the reconciled source layer;
- `TE`: **3 → 2** because `KU-NI` is no longer a secure base;
- `QE`: **2 → 1**, leaving only Tier-A `KA-PA ~ KA-PA-QE`;
- `SU`: **2 → 1**, leaving comparison-only `A-RI ~ A-RI-SU`;
- `WI`: **2 → 1**, leaving Tier-B `PA3-NI ~ PA3-NI-WI`.

Thus the revised source layer increases the separation between the strongest productive `JA` signal and the lower-support suffix candidates.

## Interpretation rule

A v0.5 retained exact pair is still only a structural candidate. Lexical identity, onomastics, scribe/context, and grammatical function remain promotion-stage questions.

Frozen v0.3 and v0.4 outputs remain historical and are not rewritten.
