# Linear A Morphology Benchmark

**A reproducible, epigraphically audited framework for testing morphological claims in Linear A.**

Linear A remains undeciphered. This repository does not propose a decipherment or identify the underlying Minoan language. It addresses a narrower prerequisite:

> **When two Linear A sign groups look morphologically related, how strong is the evidence that the relationship is real?**

The project combines candidate-blind computation with inscription-level audit. Positive results, false positives, damaged readings, onomastic families, scribal confounds, alternative segmentations, and failed hypotheses are preserved so that claims can be reproduced and challenged rather than selected retrospectively.

## Core rule

**Discovery is computational. Promotion is epigraphic.**

A candidate does not become evidence for morphology until its forms, boundaries, damage state, provenance, lexical identity, and context have been audited. Direct diplomatic evidence overrides normalized convenience data. Failure of a global productivity test does not erase a valid local formal relation, and an exact string relation does not by itself establish suffixhood or grammatical function.

## Current status: Phase 1B complete

The authoritative current state is [`CURRENT_STATUS.md`](CURRENT_STATUS.md). Older discovery reports and manual audits remain in the repository as historical records, but stronger wording in them is superseded where it conflicts with the clean-v2.1 confirmatory result.

### Candidate-blind diplomatic repair

The frozen SigLA source is pinned by SHA-256:

```text
cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d
```

The original Step-2 population was reconstructed against its frozen multidimensional fingerprint:

- **1,401** total SigLA word tokens
- **1,036** Step-2 clean
- original primary administrative stratum: **821 tokens / 310 documents / 589 types / effective weight 696**

A candidate-blind diplomatic overlay from `mwenge/lineara.xyz` commit
`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a` restores open-left, open-right, and interior-damage status from the glyph layer. The hostile control suite passes **6/6**.

The publication-grade clean-v2.1 primary stratum contains:

- **554** Tablet/Nodule/Roundel words of length 2–8
- **211** documents
- **374** distinct word types
- effective token weight **457**

Full report: [`results/phase1b-confirmatory-v2.1/PHASE1B_FINAL_CONFIRMATORY_REPORT.md`](results/phase1b-confirmatory-v2.1/PHASE1B_FINAL_CONFIRMATORY_REPORT.md)

### Locked Test 2B calibration

The exact preregistered detector is preserved at [`scripts/phase1b/04_run_blind_calibration.py`](scripts/phase1b/04_run_blind_calibration.py), SHA-256:

```text
f19a24af71afd25091734638377f99570a3d370ef3022f1261850dc6a660e6be
```

On clean-v2.1, the preregistered 10% synthetic-suffix gate passes **20/20**, with exact 95% lower power bound **0.8316** and weakest 99% ΔLL lower bound **+4.6245**. The boundary-independent negative control gives **0/20** false-positive recoveries.

### TI and JA: final global edge-productivity result

| Candidate | Occurrences | Terminal | Internal | Docs | Held-out ΔLL | 99% document-bootstrap CI | Result |
|---|---:|---:|---:|---:|---:|---:|---|
| `TI` | 38 | 20 | 18 | 27 | **-0.5697** | **[-3.6315, +2.0194]** | no global edge-productivity evidence |
| `JA` | 37 | 19 | 18 | 33 | **+0.9007** | **[-3.0357, +4.8210]** | no global edge-productivity evidence |

Neither candidate clears the locked 99% lower-bound > 0 criterion. The decision is stable across 100 independently hash-derived bootstrap seeds per candidate.

Therefore:

> **The repaired administrative corpus does not provide confirmatory evidence that TI or JA is a globally productive terminal suffix.**

This is a global-productivity result, not a claim that every local TI/JA relation is accidental.

### Local exact-pair evidence that survives

Across all **580** clean-v2.1 words, there are **24** exact one-sign `X ~ X-Y` extensions. Only one of all 24 has short/long co-occurrence on the same document: `KA-PA ~ KA-PA-QE` on HT 6a.

`JA` retains four exact extensions:

- `*306-TU ~ *306-TU-JA`
- `A-MA ~ A-MA-JA`
- `KU-PA ~ KU-PA-JA`
- `PA-SE ~ PA-SE-JA`

`TI` retains three:

- `DA-KU-SE-NE ~ DA-KU-SE-NE-TI`
- `JA-KU ~ JA-KU-TI`
- `RI-RU-MA ~ RI-RU-MA-TI`

The former `SA-MA ~ SA-MA-TI` relation is eliminated because HT 39 is diplomatically `]SA-MA-TI`.

No TI or JA short/long pair co-occurs on the same document. Under the frozen sparsity rule, suffixing versus truncation/factorization therefore remains **INDETERMINATE** for every TI/JA pair.

Current grades:

- **TI: C+/B−, Level 2A local candidate.** Global Test 2B negative; surviving exact relations retain strong alternative-segmentation/source caveats.
- **JA: B, replicated Level 2A structural candidate.** Global Test 2B negative; four exact cross-stem relations survive, but suffixhood and grammatical function are not established.

Candidate addenda:

- [`audits/JA-phase1b-v2.1-addendum.md`](audits/JA-phase1b-v2.1-addendum.md)
- [`audits/TI-phase1b-v2.1-addendum.md`](audits/TI-phase1b-v2.1-addendum.md)

## Earlier discovery and replication results

Historical discovery runs remain reproducible and useful as discovery substrates, not as substitutes for the final Phase 1B boundary repair.

### Davis 2026 blind replication

The first affix-ranking experiment was frozen before the identities of Brent Davis's six 2026 candidates were known to the project. The frozen v0.2 top-2-prefix/top-4-suffix comparison recovered **3/6** at the preregistered cutoff. A post-unblinding universe-matched sensitivity analysis, restricted to the directly comparable 50-sign Linear B main-series homomorph universe, yields **4/6 = 2/2 prefixes + 2/4 suffixes**. The latter is secondary and does not replace the frozen primary result.

The primary 3/6 cutoff overlap has exact `p = 0.0002606` under the registered external-target-placement null; the secondary universe-matched 4/6 result has `p = 0.0000972`.

Protocol: [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md)  
Audit synthesis: [`results/davis-six-audit-synthesis.md`](results/davis-six-audit-synthesis.md)

### Damage-aware / source-consistent discovery

The v0.3 damage-aware regression gate removed **19/19** registered damage-created or insecure relationships while retaining **6/6** strong controls. Later source audits showed that even this was not a complete diplomatic solution, motivating Phase 1B.

The v0.5 source-consistent discovery substrate passes **30/30** structural/source negatives and retains **13/13** audited structurally complete controls. It remains a discovery substrate rather than a source-complete edition.

Experiments:

- [`experiments/damage-aware-v03.md`](experiments/damage-aware-v03.md)
- [`experiments/source-consistent-v05.md`](experiments/source-consistent-v05.md)
- historical provisional global test: [`results/edge-productivity-v0.7b/`](results/edge-productivity-v0.7b/)

The v0.7b unblinding is now explicitly **superseded** by clean-v2.1.

### Prefixes A- and I-

Damage-aware discovery continues to support strong inscription-level formal relationships for initial `A-` and `I-`, including:

- `KA-RU ~ A-KA-RU`
- `SI-KI-RA ~ A-SI-KI-RA`
- `TA-NA-TE ~ A-TA-NA-TE`
- `QA-*118 ~ I-QA-*118`
- `DA-MA-TE ~ I-DA-MA-TE`

These remain structural observations. Their grammatical functions are unknown and are not upgraded by the TI/JA Phase 1B result.

## Evidence model

[`BENCHMARK.md`](BENCHMARK.md) defines the evidence tiers. The working hierarchy is:

1. **direct epigraphic/source evidence** for sign reading, damage, and word boundary;
2. **independently replicated formal relationships** under frozen procedures;
3. **candidate-blind statistical confirmation** after power calibration;
4. **local exact paradigms** after hostile audit;
5. structural/contextual covariation;
6. grammatical labels only after a form predicts an independent recurring structural role across multiple stems;
7. lexical anchoring and external language-family comparison only after internal structure is established.

Negative and reclassified examples are deliberately retained in [`REJECTED_HYPOTHESES.md`](REJECTED_HYPOTHESES.md) and the audit files.

## Research strategy

The project follows a grammar-first combinatorial approach:

1. identify recurring formal relationships without choosing a language family;
2. restore damage and boundary state before generating paradigms;
3. test candidates across scribes, sites, genres, and lexical classes;
4. preserve rejected cases as controls;
5. separate global productivity from local morphology;
6. distinguish suffixing from truncation, factorization, abbreviation, cliticization, and segmentation alternatives where the documents permit it;
7. infer grammatical function only when morphology correlates with independent structural context across multiple stems;
8. compare external languages only after an internal structural prediction exists.

Full protocol: [`METHODOLOGY.md`](METHODOLOGY.md)

## Next work

The Phase 1B blocker and Stage 5C global TI/JA test are now closed.

The next justified milestone is **Stage 5D: rebuild the suffix-transition network from scratch on clean-v2.1**. The old network cannot be carried forward unchanged because its corpus membership predates the diplomatic repair.

After that:

1. audit the rebuilt transition edges inscription by inscription;
2. re-run the truncation/factorization classifier on surviving relations;
3. seek independent structural contexts for any morphologically promoted contrast;
4. keep **Phase 6 grammatical inference closed** until the registered multi-stem structural gate is satisfied;
5. postpone lexical-family and language-family arguments until the internal grammar supports them.

## Reproducibility

Phase 1B scripts are in [`scripts/phase1b/`](scripts/phase1b/). The final machine-readable outputs, control summaries, calibration curve, exact-pair reassessment, and hash manifest are in [`results/phase1b-confirmatory-v2.1/`](results/phase1b-confirmatory-v2.1/).

The raw SigLA payload and full source-derived token/boundary tables are **not redistributed in this repository**. Their hashes and upstream provenance are recorded so the analysis can be reproduced from the licensed/published sources without turning this repository into another transcription authority.

See [`UPSTREAM.md`](UPSTREAM.md) and [`SOURCES.md`](SOURCES.md).

## Repository map

```text
CURRENT_STATUS.md              authoritative present conclusions
BENCHMARK.md                   evidence tiers
METHODOLOGY.md                 research protocol
REJECTED_HYPOTHESES.md         falsified/reclassified claims
UPSTREAM.md                    upstream-data policy

audits/
  JA.md                        historical manual JA audit
  JA-phase1b-v2.1-addendum.md  current JA confirmatory addendum
  TI-phase1b-v2.1-addendum.md  current TI confirmatory addendum
  ...

scripts/phase1b/
  reconstruct_sigla_step2_work.py
  extract_lineara_diplomatic_edges.js
  build_sigla_tokens_clean_v2.py
  build_sigla_tokens_clean_v2_1.py
  04_run_blind_calibration.py
  run_phase1b_ti_ja_confirmatory.py
  reassess_phase1b_exact_pairs.py
  test_phase1b_builder.py
  test_phase1b_builder_v2_1.py

results/
  phase1b-confirmatory-v2.1/   publication-grade current TI/JA record
  edge-productivity-v0.7b/    superseded provisional run
  damage-aware-v0.3/          historical discovery run
  source-consistent-v0.5/     historical discovery substrate
```

## Scope and non-claims

This repository does **not** claim a decipherment, a Minoan language-family identification, exact Minoan pronunciation from Linear B values, or a translation from formal morphology.

The intended contribution is narrower:

> **make Linear A morphology claims easier to reproduce, falsify, compare, and improve.**

## Author and AI-assisted research

This is an independent research project by Scott Ferguson, whose professional background is in software engineering and technical product work rather than Aegean epigraphy or historical linguistics. That is a reason to expose the evidence and invite specialist correction, not to lower the evidentiary standard.

AI tools have assisted corpus exploration, hypothesis generation, source discovery, coding, and drafting. AI output is not treated as evidence. Claims are promoted only through traceable inscriptional data, reproducible computation, and cited scholarship.
