# Manuscript outline: Falsifiable computational morphology for Linear A

## Working title

**From Edge Statistics to Epigraphic Falsification: Reproducible Morphology Tests in Linear A**

Alternative:

**Testing Linear A Morphology Across Digital Corpora: Blind Affix Ranking, Source-Aware Controls, and SigLA Replication**

## Central contribution

The paper should not claim a decipherment. Its contribution is a reproducible framework that connects statistical candidate generation to epigraphic falsification and independent digital-encoding replication.

The paper's strongest novelty claim is methodological:

> A Linear A morphology hypothesis should survive not only distributional statistics but also explicit negative controls for damaged boundaries, continuation, complex signs, source disagreement, lexical-class confounds, and a separately encoded corpus.

## Proposed abstract skeleton

Linear A remains undeciphered, but recurrent variation at word edges permits structural investigation without assigning lexical meanings. We present a reproducible morphology pipeline designed to distinguish candidate generation from confirmation. A blind edge-ranking score was frozen before comparison with Brent Davis's independently derived 2026 inventory of two likely prefixes and four likely suffixes. The initial corpus recovered three of six within preregistered cutoffs. Subsequent inscription-level auditing showed that many apparent exact stem/extension pairs were artifacts of damaged boundaries, editorial continuation, complex-sign normalization, or lexical-class mismatch, motivating a labeled positive/negative morphology benchmark. Internal permutation tests and external-target nulls were then kept separate. Finally, the frozen claims were rerun against SigLA v4 as an independently encoded word-segmentation holdout. The full SigLA inventory produced 2/6 Davis-cutoff hits, while the pre-specified Davis main-grid view produced 3/6. In contrast, both Tier-A final-JA families and all three accepted final-TI families reproduced across SigLA's word encoding. The holdout also exposed consequential disagreements between digital corpora over fragment boundaries. We argue that source-aware falsification and cross-encoding replication can advance Linear A grammatical analysis without premature translation or language-family identification.

## Paper structure

### 1. Introduction

- Linear A morphology can be investigated structurally without lexical decipherment.
- Distinguish combinatorial/contextual analysis from etymological decipherment.
- Problem: normalized transliteration corpora make statistical work easy but may erase epigraphic uncertainty.
- Research question: which apparent edge alternations survive blinded validation, source audit, and independent encoding?

### 2. Related work

- Packard's statistical approach and Davis's 2026 refinement.
- Davis's six high-probability affix signs.
- Published morphological discussion of recurring Linear A alternations.
- SigLA as a palaeographic digital resource.
- Computational decipherment work as contrast: emphasize validation architecture rather than language-family fitting.

### 3. Frozen blind ranking experiment

- corpus snapshot and provenance;
- v0.2 mechanical eligibility;
- scoring formula;
- preregistered top-2 prefix / top-4 suffix evaluation;
- original 3/6 result;
- preserve all six ranks and failures.

### 4. Epigraphic benchmark construction

- complete-word relationship as unit of evidence;
- Tier A/B/C/rejected definitions;
- failure classes:
  - damaged left/right boundary;
  - cross-face continuation;
  - normalized sign-reading divergence;
  - complex-sign flattening;
  - source recency/coverage;
  - lexical/onomastic mismatch;
- regression gate and source-consistent v0.5.

### 5. Statistical calibration

- internal discovery nulls vs external-target nulls;
- why max-sign correction matters;
- internal A/I/JA/TI results are not conventionally significant after max-sign correction;
- Davis externally supplied target placement remains unexpectedly high;
- avoid treating post-hoc discoveries as preregistered predictions.

### 6. SigLA independent-encoding replication

- freeze v4 SHA;
- SigLA native word membership;
- pyaegean apparatus semantics;
- homophone preservation;
- full-inventory and Davis-grid results;
- exact-family replication for A/I/JA/TI;
- explicit non-replications.

### 7. Digital-edition disagreement as a substantive result

- case studies such as `KI-DA`, `DI-NA`, `KU-NI`, `JA-RE`, `QA-*118-SA`;
- demonstrate how editorial representation changes candidate morphology;
- propose source-hierarchy reporting standard for future computational work.

### 8. Discussion

Defensible structural conclusions:

- `A-`: strong initial morphology candidate, no function assigned;
- `JA`: productive final morphology in at least some administrative vocabulary, no gloss;
- `TI`: repeated exact-family evidence, no gloss;
- Davis-six: meaningful convergence but not uniform cross-corpus replication.

Explicit limits:

- no translation;
- no language-family inference;
- no claim that string inclusion alone establishes lexical identity;
- SigLA is an independent digital encoding, not an independent archaeological sample.

### 9. Conclusion

The main contribution is a falsifiable research architecture for Linear A morphology, not a new decipherment proposal.

## Core tables/figures

1. Flow diagram: discovery corpus -> Davis external targets -> source/damage benchmark -> statistical calibration -> SigLA holdout.
2. Davis-six ranks across original v0.2, universe-matched sensitivity, and SigLA holdout.
3. Benchmark attrition table: automatic exact pairs vs source-aware survivors by target sign.
4. JA and TI frozen-family replication matrix across corpus encodings.
5. Source-disagreement table showing normalized vs damage-preserving readings.

## Claims to avoid in title/abstract

Avoid “decipherment,” “translation,” “Minoan case system,” “genitive,” “ablative,” “article,” or any language-family label unless a later experiment independently establishes those claims.

## Immediate specialist-review questions

1. Are the source hierarchies used to reject damaged pairs epigraphically defensible?
2. Does the Davis v0.2 replication reproduce the assumptions of Davis's own candidate universe closely enough?
3. Is the distinction between independent digital encoding and independent archaeological evidence stated strongly enough?
4. Are `PA-SE ~ PA-SE-JA`, `KU-PA ~ KU-PA-JA`, and the three accepted TI families correctly segmented in the best editions?
5. Which apparent SigLA/GORILA disagreements reflect actual editorial disagreement versus decoder/normalization artifacts?
