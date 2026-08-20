# Pan-Cretan Rare Ritual-Register Test v0.1

**Status:** PREREGISTERED CONTINGENCY — not active unless Phase A terminates `INDETERMINATE_DUE_TO_SPARSITY`  
**Registered:** 2026-08-20  
**Dependency:** `experiments/kato-syme-site-enrichment-v01.md`  
**Semantic status:** No lexical meanings are tested or inferred.

## Activation condition

This protocol is frozen **before inspection of Phase A candidate identities or results**. It may execute only if the Kato Syme Phase A experiment terminates `INDETERMINATE_DUE_TO_SPARSITY`.

No Phase A candidate identity enters Phase B candidate selection. Phase B is not a rescue analysis for interesting Syme singletons.

## Research question

Do low-frequency Linear A sign groups show more independent cross-site recurrence within a frozen ritual/formula-bearing corpus than expected under a null model that controls for chronology, formula position, object/support class, preservation, and document structure?

The target is a possible **rare recurrent textual stratum**, not a Syme-local vocabulary.

## Candidate universe

The eligible universe is generated mechanically from the complete frozen comparison corpus, independent of Syme provenance.

Provisional inclusion rules:

- syllabic/sign-group sequences only;
- diplomatically complete or edge-secure;
- length 2-8 signs unless a corpus-specific exclusion is preregistered before execution;
- numerals and logograms excluded from candidate identity;
- core ubiquitous formula elements identified in the frozen formula mask are excluded from the rare-stratum test;
- document frequency in a preregistered low-frequency band, provisionally **2-6 independent inscriptions corpus-wide**;
- no requirement that Syme contain the sequence.

The exact candidate-universe manifest and formula mask must be frozen before the primary statistic is computed.

## Units of evidence

For each eligible sequence `w` calculate:

- `DF(w)`: number of independent inscriptions containing `w`;
- `SF(w)`: number of independent sites containing `w`;
- `RF(w)`: number of eligible ritual/formula-bearing inscriptions containing `w`;
- formula-position profile;
- chronology profile;
- object/support profile;
- preservation profile.

Primary evidence is independent inscription and independent site recurrence, not raw token frequency.

## Primary global statistic

The confirmatory test operates on the rare stratum as a whole rather than individually testing many sparse words.

Primary statistic:

`T = sum_w I(SF(w) >= 2) * g(DF(w))`

where `g` is frozen before execution. The default implementation should use a simple bounded weight such as `g(DF)=1` for the primary count statistic, with frequency-weighted variants treated as sensitivity analyses.

Thus the primary question is:

> How many eligible low-frequency sequences recur independently across at least two sites?

## Null model and permutation

Generate the null distribution of `T` by stratified permutation while preserving, as far as the observed corpus permits:

- document word count;
- chronology band;
- formula position/class;
- object/support class;
- preservation class;
- corpus-wide frequency of each sequence.

Sequence assignment may be permuted only among structurally compatible inscription slots/documents. Site labels themselves must not be permuted in a way that destroys document-level dependence.

Use **100,000 permutations** for the final confirmatory run unless computational validation demonstrates an exact alternative.

Report:

- observed `T`;
- null mean/median;
- empirical p-value;
- null quantiles;
- effect size as excess cross-site recurrence over null expectation.

## Synthetic power gate

Inject artificial low-frequency sequences with known cross-site recurrence patterns into the observed corpus structure. The detector must recover a preregistered effect with >=80% power before a null result is labeled `NEGATIVE`.

If power is inadequate, terminal status is `INDETERMINATE_DUE_TO_SPARSITY`.

## Global-first firewall

Individual sequence contributors are not interpreted unless the **global primary test is positive** under the frozen threshold.

If the global test is negative or indeterminate:

- stop;
- do not rank visually interesting rare words;
- do not publish a hand-selected list of apparent cross-site matches as evidence;
- do not reintroduce Syme candidates post hoc.

If the global test is positive, contributor sequences may be unblinded and assigned anonymous identifiers (`RR-01`, `RR-02`, ...).

## Contributor characterization after a global positive

For each `RR` sequence, record:

- site dispersion;
- document dispersion;
- chronology;
- object/support classes;
- formula position;
- regional concentration;
- exact and near administrative parallels;
- PN-0 to PN-3 proper-name compatibility.

No contributor receives a semantic label from later Greek, archaeology, or phonetic resemblance.

## Proper-name compatibility

Use the same PN scale as Phase A:

- PN-0: no administrative parallel;
- PN-1: lexical relative in incompatible administrative positions;
- PN-2: exact/near match in a plausible entity/location/recipient slot;
- PN-3: repeated exact/near matches in probable entity/location/recipient slots.

PN-2/PN-3 sequences remain valid contributors to the global recurrence statistic but are classified as **proper-name-compatible** and cannot be promoted as evidence for specialized ritual lexicon.

## Site-level robustness

For a positive global result, rerun the analysis under leave-one-site-out deletion. Report whether the signal is dominated by one prolific or unusual site.

A pattern that collapses after removal of one site is classified as unstable and cannot support a claim of a pan-Cretan recurrent stratum.

## Regional and formula controls

Test whether excess recurrence is better explained by:

- geographic proximity;
- chronological concentration;
- formula-slot substitution;
- object/support type;
- sanctuary class.

Any one of these may explain the global signal without implying a specialized ritual lexicon.

## Terminal states

- `RARE_CROSS_SITE_STRATUM_DETECTED`: the preregistered global recurrence statistic exceeds the null threshold and survives robustness controls.
- `NEGATIVE`: adequate power and no excess cross-site recurrence.
- `INDETERMINATE_DUE_TO_SPARSITY`: inadequate power or insufficient eligible corpus.

## Interpretive ceiling

The strongest permitted conclusion is:

> Linear A ritual/formula-bearing inscriptions contain a statistically detectable stratum of low-frequency sign groups that recur across independent Cretan sites more often than expected under the frozen null.

This does **not** identify those sequences as divine names, donor names, titles, ritual objects, verbs, institutions, youth terminology, initiation terminology, or any other semantic class.

## Relationship to Kato Syme

A sequence may fail Phase A because it occurs only once at Syme and still contribute legitimately to Phase B if it independently recurs at other sites. This does not reverse the Phase A result: Phase A remains frozen and failed/indeterminate at the site-local level. Phase B answers a different, macro-corpus question.