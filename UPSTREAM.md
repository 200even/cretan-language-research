# Upstream Projects and Data Provenance

This repository does not attempt to become another transcription authority. It is a research layer built on top of specialist corpora and published scholarship.

## Primary computational corpus

### Linear A Explorer / lineara.xyz

Repository: https://github.com/mwenge/lineara.xyz

Pinned exploratory version:

`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`

The project provides structured inscription pages, transcriptions, sign inventories, analytical relation graphs, and derived transaction models. It has been the main computational substrate used here.

**Use rule in this repository:**

- raw sign-by-sign / segmented inscription transcription outranks derived transaction or relation data;
- if a derived layer silently truncates or expands a word, the raw transcription is authoritative for our analysis;
- every future rerun should record the upstream commit hash.

## Corpus-validation work

### corpus-validation-for-undeciphered-scripts-linear-a

Repository: https://github.com/ChristosTsirkas/corpus-validation-for-undeciphered-scripts-linear-a

This project is linked as adjacent work on validating computational corpora for Linear A. It was **not** used as primary evidence for the initial leads in this repository, but it is relevant to the next phase because corpus integrity and segmentation errors can directly generate false morphological patterns.

## Specialist web databases

### SigLA

https://sigla.phis.me/

A systematic paleographic and inscription database associated with Ester Salgarella and Simon Castellan. Useful for checking sign forms, inscription inventory, and paleographic context.

### DĀMOS

https://damos.hf.uio.no/

Searchable Mycenaean / Linear B database. Used as an external comparison layer for known or proposed Minoan names and Linear B spellings. Linear B evidence is never allowed to create an internal Linear A morphological pattern by itself.

## Primary editions

The Linear A Explorer links extensively to **GORILA** (Louis Godart and Jean-Pierre Olivier, *Recueil des inscriptions en linéaire A*). GORILA page references should be preferred when preparing any claim for specialist scrutiny.

This repository links to upstream editions/databases rather than copying protected inscription images or large portions of copyrighted scholarly publications.

## Provenance hierarchy

For claims in this repository, evidence should be cited in roughly this order:

1. published inscription/facsimile edition (especially GORILA);
2. secure raw transcription in a specialist corpus;
3. specialist paleographic/epigraphic database;
4. published linguistic analysis;
5. derived computational classification;
6. our own computational inference.

Lower levels may generate leads, but should not override higher levels without explicit justification.

## How to add another upstream source

When connecting another corpus or repository, record:

- project/repository name;
- canonical URL;
- exact commit, release, or access date;
- what fields were actually used;
- known licensing/copyright constraints;
- whether the source is primary transcription, derivative analysis, or speculative interpretation.
