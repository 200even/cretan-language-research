# Addendum: final `JA` after Phase 1B clean-v2.1

**Date:** 2026-08-20  
**Status:** supersedes the current-claim/productivity language in [`JA.md`](JA.md), while preserving that file as the historical v0.3 manual audit.

The earlier audit correctly identified several real `X ~ X-JA` string relationships and important segmentation/source failures. Phase 1B asks a different and stricter question: does `JA` improve out-of-document prediction of a terminal word edge after candidate-blind diplomatic boundary repair?

## Confirmatory Test 2B

Clean-v2.1 primary stratum: 554 tokens / 211 documents / 374 types / effective weight 457.

`JA`:

- total occurrences: 37
- terminal: 19
- internal: 18
- candidate documents: 33
- held-out ΔLL: **+0.900695**
- 99% document-bootstrap CI: **[-3.035656, +4.820958]**
- decision: **NO GLOBAL EDGE-PRODUCTIVITY EVIDENCE**

The 99% lower bound remains below zero under 100 independently hash-derived bootstrap seeds. The historical wrapper RNG integer was not recoverable, but this cannot change the significance decision.

## Exact relations that survive clean-v2.1

The repaired 580-word full clean-v2.1 corpus contains four exact one-sign `JA` extensions:

- `*306-TU ~ *306-TU-JA`
- `A-MA ~ A-MA-JA`
- `KU-PA ~ KU-PA-JA`
- `PA-SE ~ PA-SE-JA`

None has short/long co-occurrence on the same document, so the frozen structural discriminator classifies suffixing versus truncation/factorization as **INDETERMINATE**.

The earlier `A-SE ~ A-SE-JA` audit family is not present in the clean-v2.1 exact-pair output under the positive-coverage/fail-closed corpus. This addendum does not assign a new token-level reason for that absence without a separate inscription-level re-audit.

## Revised claim

> `JA` is a replicated **Level 2A structural candidate** with four surviving cross-stem exact extensions. The clean-v2.1 confirmatory test does **not** establish global terminal-edge productivity, suffixhood, or grammatical function.

**Current grade: B.**

This is narrower than the earlier phrase “productive final `JA` morphology.” The local patterns remain worth explaining; the global suffix claim does not currently pass the locked test.
