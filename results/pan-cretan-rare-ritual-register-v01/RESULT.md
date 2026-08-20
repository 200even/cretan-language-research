# Pan-Cretan Rare Ritual-Register Test v0.1 — Result

**Terminal status:** `INDETERMINATE_DUE_TO_SPARSITY`  
**Date:** 2026-08-20  
**Protocol:** `experiments/pan-cretan-rare-ritual-register-v01.md`

## Result

The preregistered Phase B candidate universe is empty at its decisive recurrence stage.

The frozen frame contains **31 inscriptions across 14 sites**. Candidate extraction used only the pinned `mwenge/lineara.xyz` diplomatic source at commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`, with these locked filters:

- exact syllabic/sign-group identity;
- 2-8 signs;
- aligned glyph word contains no U+1076B damage marker;
- numerals/logograms/separators excluded;
- frozen independent formula mask applied;
- document frequency band fixed at **2-6**.

After these filters there are **29 eligible non-core exact types** distributed across 13 of the 31 inscriptions.

**All 29 have document frequency 1.**

Therefore:

- singleton types: **29**;
- types with `DF=2..6`: **0**;
- types eligible for the primary recurrence statistic: **0**;
- observed `T = 0` only in the degenerate empty-set sense;
- no 100,000-permutation confirmatory run is warranted, because there are no eligible recurrent types whose site dispersion can be compared to the null.

## Interpretation

This is **not a negative result for a pan-Cretan rare ritual register**. The protocol explicitly reserves `NEGATIVE` for an adequately powered test. Here the surviving corpus never reaches the preregistered recurrence band, so the correct terminal state is `INDETERMINATE_DUE_TO_SPARSITY`.

The descriptive finding is narrower:

> Within the frozen 31-inscription frame, after diplomatic damage exclusion and removal of independently defined core formula material, no surviving non-core exact sign group recurs on two independent inscriptions.

That statement licenses no semantic inference.

## Global-first firewall

Because the global test cannot open:

- no individual candidate is promoted;
- no candidate is ranked as interesting;
- no RR identifiers are assigned;
- no proper-name screen is opened for contributors;
- no semantic comparison with Greek, Ephorus, later cult identity, youth initiation, hunting, or communal dining is permitted.

The machine-readable census reports only per-document counts, not lexical identities: `candidate-census-v01.csv`.

## Hostile sensitivities

Two non-confirmatory checks do not alter the terminal state:

1. **Damage-relaxed exact-match sensitivity:** allowing edge-damaged transliterations admits a very small number of DF>=2 exact types, but the observed recurrent types remain confined to single sites (`SF=1`), so cross-site `T` remains 0. This sensitivity cannot replace the diplomatic primary stratum.
2. **Broader formula-family masking:** masking an additional plausible formula-family variant reduces the singleton count by one but still leaves zero types in the DF 2-6 band.

These are robustness observations only. They do not convert the result to `NEGATIVE`.

## Reproducibility

- frozen frame: `data/kato-syme/formula-control-index-v01.csv`
- frozen formula mask: `data/kato-syme/formula-mask-v01.csv`
- extractor: `scripts/kato-syme/build_phaseb_universe.py`
- blind census: `results/pan-cretan-rare-ritual-register-v01/candidate-census-v01.csv`

The extractor defaults to blind/hash-only output and requires an explicit `--unblind` flag to reveal lexical identities. No such unblinded contributor list is part of this result.

## Branch disposition

Phase A and Phase B are now both terminally `INDETERMINATE_DUE_TO_SPARSITY` at their preregistered inferential scales.

Any future test based on near matches, stem families, phonological similarity, relaxed damage boundaries, expanded inscription frames, or a different low-frequency band constitutes a **new experiment** and must not be presented as a rescue or continuation of this confirmatory result.
