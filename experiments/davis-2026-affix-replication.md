# Blinded replication: Davis 2026 Linear A affix analysis

**Status:** blind v0.1 completed and frozen; v0.2 logogram-sensitivity run completed; exact Davis-six overlap not yet scored because their identities have not been verified from an authoritative accessible source.  
**Registered:** 2026-08-16.  
**Target:** Brent Davis, *The Undeciphered Aegean Scripts* (Cambridge University Press, 2026), Chapter 4, “Linear A Morphology,” pp. 171–204.

## Published target claim

The public Cambridge summary states that Davis refines a statistical method devised by David W. Packard and isolates **six Linear A signs** as especially likely to indicate morphology:

- **two** highly frequent at word beginnings, interpreted as likely prefixes;
- **four** highly frequent at word endings, interpreted as likely suffixes;
- one of the suffixes is argued to be particularly compatible with genitive / ablative / toponymic-adjectival function.

The Cambridge book description also states that the book includes the data underlying its analyses.

The publicly accessible chapter summary used for pre-registration does **not** enumerate the six sign identities. This repository will not infer Davis's target set from its own ranking. Exact overlap is deferred until the six can be verified from Chapter 4, its underlying data, or another authoritative source.

## Replication question

Can an independently specified, sign-level analysis of a frozen Linear A corpus recover a small set of boundary-enriched signs, and how much does that set overlap Davis’s six reported affix candidates?

The first pass is an **independent conceptual replication**, not a line-by-line reimplementation of Davis's refined Packard calculation.

## Frozen corpus

Primary exploratory corpus:

- `mwenge/lineara.xyz`
- commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`
- file `LinearAInscriptions.js`

A later SigLA-derived rerun will be treated as a separate corpus-version replication rather than silently mixed with this one.

## Frozen v0.1 inclusion rule

The initial automatic pass used a mechanical approximation to complete syllabic words:

- token contains at least two hyphen-separated sign labels;
- excludes obvious numerical tokens;
- excludes tokens with `+` ligature/logogram notation;
- excludes tokens containing brackets, question marks, ellipses, or the corpus’s unknown/damaged placeholder glyph **when those markers survive in the cleaned token field**;
- does not translate or phonetically normalize the sign sequence;
- unknown numbered syllabograms such as `*306` may remain because the test concerns sign position, not spoken value.

The emphasized qualification was learned from the first audit: some upstream `transliteratedWords` entries omit damage information visible in the raw sign record / damage-aware concordance. That can manufacture false exact `X ~ X-A` pairs.

## Independent scoring rule

For each sign `S`, calculate separately for word beginnings and word endings:

1. `boundary_count(S)` — number of retained word tokens with `S` at the relevant edge;
2. `internal_count(S)` — number of occurrences of `S` in non-edge positions;
3. `boundary_enrichment(S)` — log2 ratio of boundary occurrence rate to internal occurrence rate, using a 0.5 continuity correction;
4. `exact_extension_pairs(S)` — number of unique apparent whole-word pairs of the form:
   - prefix: `X ~ S-X`, where `X` itself is independently represented and contains at least two signs;
   - suffix: `X ~ X-S`, under the same mechanical rule.

The frozen composite ranking is:

`score = boundary_enrichment + 0.75 * log2(1 + exact_extension_pairs) + 0.25 * log2(1 + boundary_count)`

The scoring weights were not changed after the first output.

Implementation: [`scripts/rank-affixes.mjs`](../scripts/rank-affixes.mjs).

## Blinding rule

Before the first full-corpus output was generated:

- Davis’s six sign identities were not entered into code, benchmark data, or scoring rules;
- weights were not tuned toward a desired sign;
- semantic information such as place-name identity was not added to the score;
- external-language lexical comparisons were excluded.

The original GitHub Actions artifact is preserved by digest and its readable summary is committed under [`results/blind-affix-replication-v0.1/`](../results/blind-affix-replication-v0.1/).

## v0.1 result

Input retained by the mechanical filter:

- **1,347** tokens;
- **966** unique forms.

### Leading prefixes

1. `A` — score 7.820; 154 left-edge occurrences; 11 apparent exact prefix pairs.
2. `*411`
3. `*86`
4. `*306`
5. `I` — score 4.552; 9 apparent exact prefix pairs.

`A` therefore emerged as the strongest general prefix candidate without being manually targeted by the ranking.

### Leading suffixes

1. `RO` — score 6.424; 78 right-edge occurrences; 4 apparent exact pairs.
2. `JA` — score 4.961; 8 apparent exact pairs.
3. `TE`
4. `VIN`
5. `NE`
6. `ME`

The appearance of `VIN`, and lower-ranked `CYP` and `VS`, exposed a token-class contamination problem: named commodity/logogram labels could occur inside hyphenated upstream strings and pass the v0.1 typographic filter.

This failure was **preserved**, not retroactively cleaned from the first result.

## v0.2 obvious-logogram sensitivity analysis

A separately versioned sensitivity pass excluded tokens containing a short conservative list of obvious named logogram labels while keeping the scoring rule unchanged.

Input became:

- **1,284** tokens;
- **930** unique forms.

Core signals remained stable or strengthened:

### Prefixes

1. `A` — score **7.842**, 11 apparent exact pairs.
2. `*86`
3. `*306`
4. `I` — score **4.660**, 9 apparent exact pairs.

### Suffixes

1. `RO` — score **6.649**, 4 apparent exact pairs.
2. `JA` — score **4.977**, 8 apparent exact pairs.
3. `ME` — score **4.879**, 6 apparent exact pairs.
4. `TE` — score **4.869**, 6 apparent exact pairs.
5. `NE` — score **4.735**, 4 apparent exact pairs.
11. `TI` — score **3.699**, 5 apparent exact pairs.

The obvious commodity/logogram artifacts disappear while `A`, `RO`, `JA`, `ME`, `TE`, `NE`, and `TI` remain structurally interesting.

Full result: [`results/blind-affix-replication-v0.2/README.md`](../results/blind-affix-replication-v0.2/README.md).

## First blind-discovery audit: `RO`

Because `RO` ranked #1 among suffix candidates in both runs, all four automatically generated `X ~ X-RO` pairs were audited first.

Outcome:

| automatic pair | audit outcome |
|---|---|
| `KI-DA ~ KI-DA-RO` | **rejected**: supposed base is actually fragmentary `ki-da-[`; `KI-DA-RO` also has strong onomastic continuity |
| `DI-NA ~ DI-NA-RO` | **rejected**: supposed bare form is damaged/fragmentary |
| `SA-MA ~ SA-MA-RO` | **reclassified**: both forms real, but `SA-MA-RO` is strongly name/designation-like on HT 88; common lexical identity unproven |
| `A-DA ~ A-DA-RO` | **Tier B candidate**: both forms complete, cross-site, administrative; grammatical relationship unproven |

Thus the strongest raw blind suffix signal yielded **zero new Tier-A paradigms**, one Tier-B formal candidate, and three false-positive/reclassification examples.

This is not a failure of the project. It is a central benchmark result: high boundary enrichment can coexist with damage artifacts and onomastic clustering.

Full audit: [`audits/RO.md`](../audits/RO.md).

## Corpus-engineering result

The `RO` audit identifies a specific high-impact failure mode:

> **cleaned transliteration fields can flatten damage/boundary information and manufacture exact morphological pairs.**

The next pipeline version therefore should not merely add more string filters. It should attach an explicit **damage/boundary mask** from raw sign transcriptions or an independently encoded specialist corpus before any exact-pair score is computed.

That requirement is now part of the benchmark design.

## Benchmark behavior to date

The automatic ranking already demonstrates several useful classes:

- `JA`: independently recovers two existing Tier-A benchmark positives.
- `NE`: recovers a Tier-A positive (`*21F-TU ~ *21F-TU-NE`) and a known rejected/scribal-confounded pair (`PA-RA ~ PA-RA-NE`).
- `TI`: contains a Tier-A local exact extension despite only modest global boundary enrichment.
- `NU`: ranks low and its apparent exact pairs correspond to previously downgraded/reclassified cases.
- `RO`: ranks extremely high globally but mostly fails exact-pair audit.

These contrasts make [`data/morphology-benchmark.csv`](../data/morphology-benchmark.csv) useful for evaluating future discovery methods on more than raw recall.

## Exact Davis comparison remains locked

The blind ranking is already frozen, so target leakage is no longer a concern. However, an exact replication score still requires an authoritative enumeration of Davis’s two prefix and four suffix signs.

Until that is obtained, this repository records:

- the published **shape** of Davis's result;
- our already-frozen independent ranking;
- no guessed overlap score.

When the six target identities are verified, they can be compared directly with the frozen artifacts without changing the algorithm.

## Next analyses

1. audit the six newly generated `JA` pairs beyond the two existing Tier-A seeds;
2. audit the 11 `A-X` and 9 `I-X` pairs;
3. audit `ME` and `TE` families;
4. build a damage-aware candidate extractor from raw sign/boundary metadata;
5. rerun with site/scribe/genre stratification;
6. obtain and compare Davis's authoritative six sign identities;
7. repeat against an independently encoded SigLA-derived corpus.

The audit queue is machine-readable at [`data/morphology-audit-queue.csv`](../data/morphology-audit-queue.csv).

## Evaluation once Davis's identities are available

Record:

- overlap among our frozen top 2 prefix candidates and Davis’s 2 prefixes;
- overlap among our frozen top 4 suffix candidates and Davis’s 4 suffixes;
- Davis-candidate ranks outside those cutoffs;
- benchmark-positive relationships supporting each high-ranked sign;
- benchmark-negative/reclassified families that make a high rank misleading.

### Descriptive categories

**Strong conceptual replication:** at least 5/6 corresponding candidates recovered.  
**Partial replication:** 3–4/6.  
**Weak/non-replication:** 0–2/6.

These thresholds are descriptive labels, not inferential p-values.

## Publication standard

The first useful external product is not “a new decipherment.” It is:

> a versioned Linear A morphology benchmark plus an independently reproducible affix-ranking experiment, including false positives, damage controls, and failed hypotheses.

The first two runs support that framing. The automatic method can recover real-looking structural signals, but manual epigraphic adjudication materially changes what those signals mean.
