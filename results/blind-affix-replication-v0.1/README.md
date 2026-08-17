# Blind affix replication v0.1 — frozen first pass

**Status:** completed successfully; blind ranking frozen before target-sign comparison.  
**Run date:** 2026-08-16 (America/Chicago).  
**GitHub Actions run:** `31989295744`.  
**Research-repo commit analyzed:** `7373e25f8cd7404b1999168794bb78751b0953fd`.  
**Upstream corpus:** `mwenge/lineara.xyz`.  
**Upstream corpus commit:** `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**First artifact SHA-256:** `ac8dd9cb9931b2212229e1a14a401dbd010aee207ba2d71b3f7164ecb115ae56`.

This is the first frozen output of the scoring rule registered in [`experiments/davis-2026-affix-replication.md`](../../experiments/davis-2026-affix-replication.md). The scoring rule was not altered after seeing these ranks.

## Corpus retained by the mechanical v0.1 filter

- complete-looking syllabic tokens: **1,347**
- unique forms: **966**

These numbers describe the computational input after the v0.1 mechanical filter. They are **not** a claim that all 1,347 retained tokens are linguistically valid words. Indeed, the first run immediately exposed an important filter failure described below.

## Top prefix candidates

| rank | sign | score | edge count | log2 edge enrichment | exact extension pairs |
|---:|---|---:|---:|---:|---:|
| 1 | `A` | 7.820 | 154 | 3.313 | 11 |
| 2 | `*411` | 5.853 | 15 | 4.853 | 0 |
| 3 | `*86` | 5.306 | 7 | 3.806 | 1 |
| 4 | `*306` | 5.156 | 10 | 4.291 | 0 |
| 5 | `I` | 4.552 | 77 | 0.489 | 9 |
| 6 | `WI` | 4.484 | 11 | 2.838 | 1 |
| 7 | `KU` | 4.440 | 89 | 1.317 | 3 |

### Immediate benchmark observation

`A` is not merely common at the left edge. The algorithm finds **11 exact whole-word extension pairs** of the form `X ~ A-X`, including examples such as:

- `RA-NA-RE ~ A-RA-NA-RE`
- `KA-RU ~ A-KA-RU`
- `SA-RA₂ ~ A-SA-RA₂`
- `SI-KI-RA ~ A-SI-KI-RA`
- `DA-RA ~ A-DA-RA`

This makes initial `A` the strongest v0.1 candidate for productive prefixal behavior.

`I` is also structurally interesting despite its weaker edge-enrichment statistic because it participates in **9 exact extension pairs**.

## Top suffix candidates

| rank | sign | score | edge count | log2 edge enrichment | exact extension pairs |
|---:|---|---:|---:|---:|---:|
| 1 | `RO` | 6.424 | 78 | 3.106 | 4 |
| 2 | `JA` | 4.961 | 64 | 1.078 | 8 |
| 3 | `TE` | 4.857 | 56 | 1.293 | 6 |
| 4 | `VIN` | 4.779 | 8 | 3.987 | 0 |
| 5 | `NE` | 4.691 | 35 | 1.657 | 4 |
| 6 | `ME` | 4.673 | 26 | 1.379 | 6 |
| 7 | `WI` | 4.383 | 8 | 2.402 | 2 |
| 8 | `RE` | 4.196 | 58 | 0.620 | 6 |
| 13 | `SE` | 3.856 | 31 | 0.667 | 5 |
| 16 | `TI` | 3.614 | 47 | 0.279 | 5 |

### `JA` independently recovers the benchmark lead

The blind procedure ranks `JA` second among final signs and identifies **8 exact base/extended pairs**, including both pre-existing benchmark positives:

- `PA-SE ~ PA-SE-JA`
- `KU-PA ~ KU-PA-JA`

and six additional candidate pairs:

- `A-SE ~ A-SE-JA`
- `*306-TU ~ *306-TU-JA`
- `A-MA ~ A-MA-JA`
- `JA-SA ~ JA-SA-JA`
- `A-RI ~ A-RI-JA`
- `PU₂-RE ~ PU₂-RE-JA`

Those six are **candidate-generation output only** until inscriptional context, damage, scribal distribution, and lexical/onomastic alternatives are audited.

## A useful failure: logograms contaminated v0.1

`VIN` ranks fourth among apparent suffixes. `CYP` ranks tenth and `VS` twelfth in the full v0.1 ranking. These labels are commodity/logographic material rather than ordinary syllabic affixes.

This is not removed from the first result. It is recorded as a benchmark failure because it demonstrates that a purely typographic “hyphenated token” filter is insufficient to separate phonographic word material from mixed logographic sequences in the upstream representation.

The planned v0.2 sensitivity analysis therefore adds an explicit exclusion of obvious named logogram labels **without modifying this frozen v0.1 result**.

## `RO` is the highest-priority audit target

`RO` ranks first among final signs and participates in four exact pairs:

- `KI-DA ~ KI-DA-RO`
- `SA-MA ~ SA-MA-RO`
- `DI-NA ~ DI-NA-RO`
- `A-DA ~ A-DA-RO`

That is a strong computational signal but **not yet a grammatical result**. The benchmark must determine whether these pairs represent productive morphology, personal/place-name formation, lexical coincidence, or a scribal/genre concentration.

## Existing benchmark controls behave usefully

- `JA`: strong recovery of two Tier-A positive relationships.
- `NE`: recovers the Tier-A `*21F-TU ~ *21F-TU-NE` relation **and** the rejected/scribe-confounded `PA-RA ~ PA-RA-NE`. This is a concrete example of why raw ranking is not enough.
- `TI`: ranks only 16th despite five exact extension pairs, including the Tier-A `DA-KU-SE-NE ~ DA-KU-SE-NE-TI`. This illustrates the difference between a productive-looking local relation and global boundary enrichment.
- `NU`: ranks 39th and its two exact pairs are precisely the kinds of cases the benchmark has already downgraded (`KU-PA₃ ~ KU-PA₃-NU`, `U-TI ~ U-TI-NU`). This is a useful negative-control behavior.

## Davis 2026 comparison status

The public Cambridge summary establishes the target shape: Davis reports **two likely prefix signs and four likely suffix signs** from a refined Packard-style analysis. The publicly accessible chapter summary does not identify those six signs individually.

Accordingly, this repository will **not guess** Davis’s target set from our ranking. The v0.1 ranking is frozen first. Exact overlap will be scored only when the identities can be verified directly from Chapter 4 / its underlying data or another authoritative source.

This preserves the logic of the replication even if access to the target data is obtained later.

## Next actions frozen after v0.1

1. Preserve the complete v0.1 ranking and provenance in this directory.
2. Run v0.2 with explicit obvious-logogram exclusion as a sensitivity analysis, not a replacement.
3. Manually audit `RO`, the additional `JA` pairs, and the strongest `A-` / `I-` pairs against inscription-level context.
4. Expand [`data/morphology-benchmark.csv`](../../data/morphology-benchmark.csv) with audited positives and false positives.
5. Obtain/verifiably cite Davis’s six signs and score the blinded overlap without changing the v0.1 algorithm.
6. Repeat the analysis against an independently encoded SigLA-derived corpus.

## Interpretation

The first run already demonstrates why the benchmark approach is useful. It recovered strong known/independently identified morphology (`A-`, `-JA`), generated new testable families (`-RO`, additional `-JA` pairs), and produced obvious false positives (`VIN`, `CYP`, `VS`) in the same output. The scientific contribution is the adjudication of those classes under explicit rules, not the raw ranking by itself.
