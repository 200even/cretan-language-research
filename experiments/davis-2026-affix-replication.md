# Blinded replication: Davis 2026 Linear A affix analysis

**Status:** method frozen; automated corpus run pending/triggered by repository workflow.  
**Registered:** 2026-08-16.  
**Target:** Brent Davis, *The Undeciphered Aegean Scripts* (Cambridge University Press, 2026), Chapter 4, “Linear A Morphology,” pp. 171–204.

## Published target claim

The public Cambridge summary states that Davis refines a statistical method devised by David W. Packard and isolates **six Linear A signs** as especially likely to indicate morphology:

- **two** highly frequent at word beginnings, interpreted as likely prefixes;
- **four** highly frequent at word endings, interpreted as likely suffixes;
- one of the suffixes is argued to be particularly compatible with genitive / ablative / toponymic-adjectival function.

The Cambridge book description also states that the book includes the data underlying its analyses.

This repository does **not** encode the identities of Davis’s six signs before producing its first ranking.

## Replication question

Can an independently specified, sign-level analysis of a frozen Linear A corpus recover a small set of boundary-enriched signs, and how much does that set overlap Davis’s six reported affix candidates?

A successful replication does not require identical rank order or identical scoring because the public summary does not expose all details of Davis’s refined Packard calculation. The first pass is therefore an **independent conceptual replication**, not a line-by-line reimplementation.

## Frozen corpus

Primary exploratory corpus:

- `mwenge/lineara.xyz`
- commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`
- file `LinearAInscriptions.js`

The run must report this commit explicitly.

A later SigLA-derived rerun should be treated as a separate corpus-version replication rather than silently mixed with the first run.

## Inclusion rule

The automatic pass uses a conservative approximation to complete syllabic words:

- token contains at least two hyphen-separated sign labels;
- excludes obvious numerical tokens;
- excludes tokens with `+` ligature/logogram notation;
- excludes tokens containing brackets, question marks, ellipses, or the corpus’s unknown/damaged placeholder glyph;
- does not translate or phonetically normalize the sign sequence;
- unknown numbered syllabograms such as `*306` may remain because the test concerns sign position, not spoken value.

This is intentionally mechanical. Every high-ranking candidate must still undergo epigraphic audit.

## Independent scoring rule

For each sign `S`, calculate separately for word beginnings and word endings:

1. `boundary_count(S)` — number of complete-word tokens with `S` at the relevant edge;
2. `internal_count(S)` — number of occurrences of `S` in non-edge positions;
3. `boundary_enrichment(S)` — log2 ratio of boundary occurrence rate to internal occurrence rate, using a 0.5 continuity correction;
4. `exact_extension_pairs(S)` — number of unique complete-word pairs of the form:
   - prefix: `X ~ S-X`, where `X` itself is independently attested and contains at least two signs;
   - suffix: `X ~ X-S`, under the same rule.

The frozen composite ranking is:

`score = boundary_enrichment + 0.75 * log2(1 + exact_extension_pairs) + 0.25 * log2(1 + boundary_count)`

The exact-pair term is deliberately modest. It corroborates edge statistics without forcing the algorithm to rediscover already hand-curated minimal pairs.

Implementation: [`scripts/rank-affixes.mjs`](../scripts/rank-affixes.mjs).

## Blinding rule

Before the first full-corpus output is generated:

- do not enter Davis’s six sign identities into code, benchmark data, or scoring rules;
- do not change weights because a desired sign ranks poorly;
- do not add semantic information such as “this form is a place name” to the score;
- do not use Sanskrit, Greek, Hurrian, Anatolian, Semitic, Etruscan, or other lexical comparisons.

After the output artifact is timestamped by GitHub Actions, Davis’s published six may be unblinded and compared.

## Evaluation

Record:

- overlap among our top 2 prefix candidates and Davis’s 2 prefixes;
- overlap among our top 4 suffix candidates and Davis’s 4 suffixes;
- Davis-candidate ranks outside those cutoffs;
- benchmark-positive relationships supporting each high-ranked sign;
- benchmark-negative/reclassified families that would make a high rank misleading;
- sensitivity to removing ritual inscriptions, personal-name-heavy lists, or single-scribe concentrations.

### Interpretation categories

**Strong conceptual replication**  
At least 5/6 Davis candidates appear in our corresponding top-six boundary sets, with no major benchmark failure.

**Partial replication**  
3–4/6 overlap or similar boundary enrichment but notable differences in ordering/controls.

**Weak/non-replication**  
0–2/6 overlap under the frozen rules.

These thresholds are descriptive, not inferential p-values.

## Secondary analyses after unblinding

Only after the first ranking is frozen:

1. compare exact corpus inclusion rules with Davis’s printed data;
2. reproduce his numerical procedure as closely as the chapter permits;
3. rerun after excluding ritual/votive texts;
4. rerun with scribal/site stratification;
5. test candidates against [`data/morphology-benchmark.csv`](../data/morphology-benchmark.csv);
6. repeat from an independently encoded SigLA-derived corpus.

## Failure is informative

A non-replication could result from:

- different corpus versions;
- different treatment of fragments and restorations;
- names/formulae generating edge enrichment;
- Davis’s Packard refinement measuring a different structural property than our exact-pair-enhanced score;
- errors in the upstream computational corpus;
- shortcomings in our inclusion rule.

None of these outcomes should be repaired by post-hoc tuning. They should be documented and tested as explicit alternative explanations.

## Publication standard

The first useful external product is not “a new decipherment.” It is:

> a versioned Linear A morphology benchmark plus an independently reproducible affix-ranking experiment, including false positives and failed hypotheses.

That result remains useful even if it reproduces existing scholarship rather than discovering a new grammatical category.
