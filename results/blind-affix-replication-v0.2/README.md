# Affix replication v0.2 — obvious-logogram sensitivity analysis

**Status:** completed successfully.  
**Run date:** 2026-08-16 (America/Chicago).  
**GitHub Actions run:** `31989509427`.  
**Research-repo commit:** `c8b2a672d6df9cc3b8ceb98eee3febc113541170`.  
**Upstream corpus commit:** `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**Artifact SHA-256:** `bef4dad8dbb3ef7cb1b78cd0e0d960d0033492ab618105705e8b20ae382d1f18`.

## What changed from v0.1

The scoring rule did **not** change.

The only intended sensitivity change was an explicit rejection of hyphenated tokens containing obvious named commodity/logographic labels:

`AROM`, `CAP`, `CYP`, `GAL`, `GRA`, `OLE`, `OLIV`, `VIN`, `VIR`, `VS`.

This list is conservative and is not claimed to be a complete linguistic classification of Linear A signs. Its purpose is to test whether the principal v0.1 signals depended on the most obvious mixed logographic sequences.

## Corpus effect

| measure | v0.1 | v0.2 |
|---|---:|---:|
| retained tokens | 1,347 | **1,284** |
| unique forms | 966 | **930** |

The sensitivity filter removes 63 retained tokens and 36 unique forms.

## Core result: the strongest signals are stable

### Prefixes

| v0.2 rank | sign | score | edge count | enrichment | exact pairs | v0.1 rank |
|---:|---|---:|---:|---:|---:|---:|
| 1 | `A` | **7.842** | 152 | 3.339 | 11 | 1 |
| 2 | `*86` | 5.351 | 7 | 3.851 | 1 | 3 |
| 3 | `*306` | 5.201 | 10 | 4.336 | 0 | 4 |
| 4 | `I` | **4.660** | 76 | 0.601 | 9 | 5 |
| 5 | `WI` | 4.529 | 11 | 2.883 | 1 | 6 |
| 6 | `KU` | 4.485 | 89 | 1.362 | 3 | 7 |

`A` remains the dominant prefix candidate and actually increases slightly in composite score. `I` rises one rank while retaining nine exact extension pairs.

### Suffixes

| v0.2 rank | sign | score | edge count | enrichment | exact pairs | v0.1 rank |
|---:|---|---:|---:|---:|---:|---:|
| 1 | `RO` | **6.649** | 78 | 3.332 | 4 | 1 |
| 2 | `JA` | **4.977** | 63 | 1.100 | 8 | 2 |
| 3 | `ME` | **4.879** | 26 | 1.584 | 6 | 6 |
| 4 | `TE` | **4.869** | 55 | 1.312 | 6 | 3 |
| 5 | `NE` | **4.735** | 35 | 1.701 | 4 | 5 |
| 6 | `WI` | 4.428 | 8 | 2.446 | 2 | 7 |
| 7 | `RE` | 4.241 | 58 | 0.665 | 6 | 8 |
| 10 | `SE` | 3.900 | 31 | 0.712 | 5 | 13 |
| 11 | `TI` | 3.699 | 47 | 0.364 | 5 | 16 |

The principal linguistic-looking suffix candidates are therefore **not products of the obvious commodity/logogram contamination detected in v0.1**.

## What the sensitivity analysis removed

The conspicuous v0.1 false positives `VIN`, `CYP`, and `VS` disappear from the candidate ranking under the explicit sensitivity rule. This confirms the diagnosis that their high edge enrichment reflected token-type contamination rather than a useful morphological signal.

## Priority interpretations

### `A-`: strongest general prefix candidate

The result is unusually robust because it combines:

- 152 left-edge occurrences;
- very strong edge enrichment;
- 11 exact `X ~ A-X` extension pairs;
- evidence spanning multiple sites and scribes in the upstream metadata.

The next task is not to call `A` an article, case marker, or verbal prefix. It is to **classify the administrative contexts of those 11 pairs** and determine whether `A-` predicts one recurring grammatical/discourse transformation.

### `RO`: strongest new audit target

`RO` remains #1 after the filter and its edge enrichment increases. Its four exact pairs are:

- `KI-DA ~ KI-DA-RO`
- `SA-MA ~ SA-MA-RO`
- `DI-NA ~ DI-NA-RO`
- `A-DA ~ A-DA-RO`

This is now the highest-priority false-positive-versus-morphology audit. The score alone cannot distinguish inflection from personal-name/place-name formation.

### `JA`: strongest benchmark-confirmed suffix candidate

`JA` remains #2 and retains all eight exact pairs, including the two Tier-A benchmark positives. This is important because it represents **independent computational recovery of a manually validated structural lead**.

### `ME`, `TE`, `NE`, `TI`: benchmark-testing cluster

These are particularly valuable because they illustrate different benchmark states:

- `NE` contains both the Tier-A `*21F-TU ~ *21F-TU-NE` relationship and the rejected/scribe-confounded `PA-RA ~ PA-RA-NE` relationship.
- `TI` contains the Tier-A `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` relationship but has only modest global edge enrichment.
- `ME` and `TE` have numerous exact pairs but require a systematic epigraphic audit before promotion.

This is precisely the distinction the benchmark is intended to capture: **automatic morphology candidates are not equivalent to validated grammatical paradigms.**

## Replication status relative to Davis 2026

The blind output is now safely frozen in two versions. The public Cambridge description of Davis's Chapter 4 confirms that his refined Packard analysis identifies two likely prefix signs and four likely suffix signs, but the public abstract does not enumerate their identities.

We therefore continue to withhold an overlap score rather than infer Davis's targets from our own ranking. Once the six identities are verified from the chapter/data, they can be compared directly against these already-frozen outputs without tuning.

## Next audit queue

1. `RO` exact pairs: determine whether all four are genuine lexical/morphological families.
2. six previously unaudited `JA` exact pairs.
3. all 11 `A-X` pairs and all 9 `I-X` pairs, with site/scribe/context annotation.
4. `ME` and `TE` exact-pair families.
5. use `NE` and `NU` as known mixed/negative controls while refining candidate scoring.

The queue is machine-readable in [`../../data/morphology-audit-queue.csv`](../../data/morphology-audit-queue.csv).
