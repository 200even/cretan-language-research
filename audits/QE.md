# Audit: final `QE`

**Status:** completed comparative audit.  
**Input:** two structurally accepted v0.4 exact pairs.  
**Result:** **one Tier-A local morphological family survives; productive final `QE` across independent stems is not established.**

## Registered pairs

1. `KA-PA ~ KA-PA-QE`
2. `SA-RO ~ SA-RO-QE`

## 1. `KA-PA ~ KA-PA-QE`

**Final adjudication: Tier A positive.**

HT 6a is unusually strong because the base and extended form occur on the **same tablet, under the same scribal production context**.

The GORILA-derived commentary gives:

```text
KA-PA •
...
KA-PA-QE 5 + fraction
```

The transcription preserves both as complete words. `KA-PA` is the opening/header-like form; later `KA-PA-QE` is a numbered entry. The secondary transaction model likewise distinguishes their coarse roles, treating `KA-PA` as the account recipient/frame and `KA-PA-QE` as an entry/sender-like designation.

Why this survives:

- both forms complete;
- same object, site, chronology, and scribal production;
- exact final addition only;
- repeated `KA-PA` elsewhere confirms that the base is a real independent word;
- no competing damage or complex-sign explanation.

The role difference is interesting but does **not** establish a function for `QE`. In particular, no Greek/Indo-European conjunction or case gloss is inferred from this pair.

## 2. `SA-RO ~ SA-RO-QE`

**Final adjudication: rejected as a secure exact suffix pair.**

The normalized v0.4 item layer represented `SA-RO-QE` as complete on HT 62+73. The higher-fidelity GORILA-derived commentary for the small HT 73 fragment instead gives:

```text
SA-RO-QE[
```

The right boundary is therefore insecure. Complete `SA-RO` is independently attested several times at Haghia Triada, but the damaged continuation cannot prove that `QE` is the final added material of the HT 73 form.

This is a **v0.4 source-mask false negative** and should become a regression control for the next structural extractor.

## Summary

| family | final result |
|---|---|
| `KA-PA ~ KA-PA-QE` | **Tier A positive** |
| `SA-RO ~ SA-RO-QE` | **rejected: variant right boundary insecure** |

### Productivity result

The registered productivity rule required both independent stem families to survive at Tier A/B. Only one does.

> **Final `QE` has one exceptionally strong same-tablet morphological relationship, but current evidence does not establish productive `QE` across multiple stems.**

## Function

No grammatical or semantic function is promoted. The `KA-PA` family motivates future function testing only after a second independent secure `QE` family appears.

## Sources / provenance

- HT 6a GORILA-derived transcription/commentary, pinned upstream corpus commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.
- HT 62 [+] 73 GORILA-derived commentary preserving `SA-RO-QE[`.
- v0.4 structural output: `results/structural-aware-v0.4/paradigm-ranking.csv`.

## Non-claim

This audit does not translate `QE`, equate it with Linear B/Greek `-qe`, or establish a conjunction, case ending, or clitic function. It establishes one strong formal addition and one structural false positive.
