# Davis 2026 affixes: audit synthesis

**Status:** completed first-pass audit and subsequent damage-aware v0.3 re-evaluation.  
**Davis target set:** prefixes `A-`, `I-`; suffixes `-RE`, `-RO`, `-TE`, `-TI`.  
**Frozen blind comparison:** **3/6, partial conceptual replication.** Nothing in the later audit changes that pre-registered score.

## Frozen v0.2 comparison

Before the six identities were known, the blind v0.2 rankings placed them at:

| element | side | v0.2 rank |
|---|---|---:|
| `A` | prefix | **1 / 116** |
| `I` | prefix | **4 / 116** |
| `RO` | suffix | **1 / 116** |
| `TE` | suffix | **4 / 116** |
| `RE` | suffix | **7 / 116** |
| `TI` | suffix | **11 / 116** |

The pre-registered top-2-prefix / top-4-suffix cutoff recovered `A`, `RO`, and `TE`: **3/6**.

## What the first audit added

The exact-pair audit asked a different question from the blind ranking:

> When a cleaned corpus appears to contain `X ~ A-X` or `X ~ X-A`, does that formal relationship survive direct checks for damage, lexical identity, genre, onomastics, and context?

The revised first-pass accounting is:

| element | automatic pairs | Tier A | Tier B | comparison/reclassified | damage/insecure failures | other |
|---|---:|---:|---:|---:|---:|---:|
| `A-` | 8 | 2 | 2 | 0 | 3 | 1 |
| `I-` | 8 | 2 | 1 | 1 | 4 | 0 |
| `-RO` | 4 | 0 | 1 | 1 | 2 | 0 |
| `-TE` | 6 | 0 | 2 | 1 | 3 | 0 |
| `-RE` | 6 | 0 | 1 | 0 | 5 | 0 |
| `-TI` | 5 | 1 | 2 | 0 | 2 | 0 |
| **Total** | **37** | **5** | **9** | **3** | **19** | **1** |

Thus **19/37 = 51.4%** of the original apparent exact pairs fail specifically because a relevant word boundary is damaged or insecure.

The earlier provisional count was 20/37. v0.3 exposed one erroneous human label: `KU-NI ~ KU-NI-TE` had been rejected because a fragmentary `KU-NI` attestation was generalized to the form as a whole. Direct inspection of HT 79+83 shows a complete `KU-NI`; the benchmark and `TE` audit were corrected.

That correction is methodologically important: the benchmark itself is falsifiable.

## Damage-aware v0.3

v0.3 builds a boundary mask before exact-pair generation and evaluates a frozen regression set.

Final regression result:

> **19/19 known damage/insecure relationships excluded; 6/6 strong secure controls retained.**

See [`damage-aware-v0.3/REGRESSION.md`](damage-aware-v0.3/REGRESSION.md) and [`../experiments/damage-aware-v03.md`](../experiments/damage-aware-v03.md).

v0.3 also separates **boundary enrichment** from **secure exact paradigms** rather than combining them in one score.

## Davis-six profiles under v0.3

### `A-`

`A-` is the strongest convergent result.

v0.3 ranks it **#1 among prefixes by secure exact paradigms**, with six complete `X ~ A-X` relationships surviving the automatic damage layer. The manually strongest examples remain:

- `KA-RU ~ A-KA-RU` — Tier A, useful administrative-context continuity;
- `SI-KI-RA ~ A-SI-KI-RA` — Tier A, recognized in published scholarship;
- `TA-NA-TE ~ A-TA-NA-TE` — same-tablet Tier-A replication/control.

The narrow conclusion is that Linear A has strong evidence for an initial morphological element `A-`. Its function is unknown.

### `I-`

`I-` ranks **#3 among prefixes by secure exact paradigms**, with four surviving formal pairs. Strong examples include:

- `QA-*118 ~ I-QA-*118` — Tier A;
- `DA-MA-TE ~ I-DA-MA-TE` — Tier A;
- `RU-JA ~ I-RU-JA` — Tier B.

Its raw boundary-enrichment rank is much weaker, demonstrating that corpus-wide positional frequency and paradigmatic evidence need not move together.

### `-RO`

`RO` remains **#1 among suffixes by raw boundary enrichment**, but ranks only #14 by secure exact paradigms, with two complete string pairs surviving v0.3.

This does not make Davis's `RO` signal spurious. It shows that strong edge concentration can exist without many clean bare/extended paradigms, perhaps because of lexical-class or onomastic concentration.

### `-TE`

After correcting the `KU-NI` benchmark error, v0.3 retains three complete formal comparisons:

- `SI-RU ~ SI-RU-TE`;
- `KU-NI ~ KU-NI-TE`;
- `I-JA ~ I-JA-TE`.

None is yet a Tier-A grammatical paradigm because lexical identity/context remains unresolved, but the formal support is stronger than the first audit reported.

### `-RE`

`RE` remains weak in ordinary exact-pair evidence: v0.3 retains one secure `X ~ X-RE` pair from the six generated candidates. Its distribution in probable personal names remains consistent with a derivational/onomastic interpretation, which could be real morphology that an ordinary bare/extended-pair method undercaptures.

### `-TI`

`TI` shows the inverse profile from `RO`: comparatively weak raw edge enrichment, but good exact-paradigm survival.

v0.3 retains three pairs:

- `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` — Tier A, with explicit segmentation caveat;
- `JA-KU ~ JA-KU-TI` — Tier B;
- `RI-RU-MA ~ RI-RU-MA-TI` — Tier B.

## Main methodological conclusion

The six Davis elements do not behave like one homogeneous class under independent testing.

At least four distinct evidence dimensions should remain separate:

1. **boundary distribution**;
2. **damage-aware exact paradigms**;
3. **lexical-class concentration**;
4. **contextual role equivalence**.

The earlier composite score obscured these differences.

A second result from v0.3 is that raw enrichment alone is also insufficient: rare signs with zero internal attestations can dominate that ranking despite very low support. A future version should add a separately registered support/significance measure rather than retune v0.3 after the fact.

## Additional candidate exposed by the same controls

The strongest non-Davis result is final `JA`.

In the validated v0.3 paradigm ranking:

- `JA`: **#1 suffix, 7 secure exact pairs**;
- `ME`: #2, 4 pairs;
- Davis `TI`: #3, 3 pairs;
- Davis `TE`: #5, 3 pairs;
- Davis `RO`: #14, 2 pairs;
- Davis `RE`: #33, 1 pair.

Two `JA` relationships were already Tier-A positives before v0.3 (`PA-SE ~ PA-SE-JA`, `KU-PA ~ KU-PA-JA`). The remaining five complete-form relationships still require context and lexical-class audit.

Therefore the current statement is deliberately limited:

> **Final `JA` is the strongest additional candidate generated by the validated damage-aware paradigmatic screen.**

It is not yet assigned a grammatical function.

## Next work

The immediate priority is a dedicated audit of all seven surviving `JA` pairs using the same standards applied to Davis's six. `ME` follows. `NE` remains useful as a mixed positive/negative control.

The full v0.3 method, development failures, benchmark correction, and rankings are documented in [`../experiments/damage-aware-v03.md`](../experiments/damage-aware-v03.md).

## Non-claim

Nothing here identifies the Minoan language or translates an affix. The contribution is a more precise empirical map of **where morphology-like structure is supported, what kind of evidence supports it, and where normalized corpus data can imitate it**.
