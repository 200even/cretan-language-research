# Cretan Language Research

**Exploratory, reproducible research on Linear A morphology, Minoan-to-Mycenaean linguistic continuity, and Pre-Greek survivals.**

> **Status:** Research notebook, not a decipherment.
>
> **Current strongest formal result:** final `-JA` behaves as productive morphology in at least two independent administrative stem pairs (`PA-SE/PA-SE-JA`, `KU-PA/KU-PA-JA`).
>
> **Current highest-priority paradigm candidate:** the administrative `SI-DA-*` family, especially same-tablet `SI-DA-TE` ~ `A-SI-DA-TO-I`, with `SI-DA-RE` and `SI-DA-RO` as wider comparison forms. Unified lexical identity remains unproven.

## Author's note

I am **not formally trained in Aegean epigraphy, historical linguistics, Mycenaean philology, or Bronze Age archaeology**. My professional background is in software engineering and technical product work. I am publishing these notes because the computational and methodological parts of the problem are unusually amenable to transparent, reproducible analysis.

That lack of formal disciplinary training is a reason to apply **more methodological restraint, not less**. The working rules of this project are therefore:

- prefer inscription-internal and corpus-wide evidence over attractive etymological resemblance;
- trace every claimed form back to a securely segmented inscriptional word;
- record site, object, scribe, neighboring words, quantities, and logograms where available;
- require cross-scribe evidence whenever a proposed alternation could instead be a scribal habit;
- distinguish **orthographic**, **morphological**, **syntactic**, **phonological**, and **semantic** claims;
- publish negative results and rejected hypotheses alongside surviving leads;
- treat derived database classifications as hypotheses and check them against raw sign-by-sign transcriptions;
- use Linear B or later Greek only as external controls after an internal Linear A pattern has been established;
- avoid assigning translations when the evidence supports only a structural relationship;
- state uncertainty explicitly and invite correction from specialists.

This repository is best read as **open research infrastructure and a falsifiable lead log**.

## Morphology checkpoint — 2026-08-16

A corpus-wide extension of the earlier libation-formula work produced three important changes in direction.

### 1. Productive final `-JA`

Two administrative bare/extended pairs survive the strict morphology filter:

- `PA-SE` (HT 18.1; HT 27b.5) ~ `PA-SE-JA` (HT Wc 3001-3002)
- `KU-PA` (HT 110a.2; HT We 1020a; ZA 11a.5/b.3) ~ `KU-PA-JA` (HT 116a.1-2)

The same sign is added to two independent complete bases in ordinary administrative texts. That is stronger evidence for productive morphology than raw final-sign frequency.

**Current assessment:** **Tier A formal morphology; function unknown.**

See [`leads/JA.md`](leads/JA.md).

### 2. `SI-DA-*` as a Kober-style paradigm candidate

The administrative corpus contains:

- `SI-DA-TE` — ARKH 2.1
- `A-SI-DA-TO-I` — ARKH 2.2-3
- `SI-DA-RE` — HT 17.3; HT 122a.5
- `SI-DA-RO` — GO 2

The ARKH 2 pair is especially valuable because the two forms occur on the same tablet. Across the corpus, the stable `SI-DA` sequence appears with several different margins.

However, the family is **not** treated as proven inflection. `SI-DA-RE` may be onomastic and has been compared with Linear B `si-ta-ro`; `SI-DA-RO` has been cautiously compared with Cape Sidero/Sidaro. The family may therefore split into personal-name, place-name, and/or lexical material.

**Current assessment:** Tier A formal same-tablet contrast; Tier B unified paradigm hypothesis.

See [`leads/SI-DA.md`](leads/SI-DA.md).

### 3. External-language matching moved downstream

A deliberately permissive pilot tested whether Linear A contains an obvious Mitanni-style Old Indo-Aryan package. Ten Indo-Aryan-shaped targets produced **3/10** whole-word hits versus **2/10** matched shuffled controls (one-sided Fisher exact **p = 0.50**). A more permissive variant still failed to show meaningful enrichment.

Short matches such as `MI-TA`, `E-KA`, and `PA-ZA` therefore behave like expected chance resemblances in a large CV-syllabic corpus rather than a coherent contact-language signal.

**Current assessment:** no detectable Mitanni-style Indo-Aryan lexical package in this pilot.

See [`experiments/mitanni-indo-aryan-pilot.md`](experiments/mitanni-indo-aryan-pilot.md).

## Current research leads

### 1. Productive final `-JA`

**Assessment:** strongest current evidence for a productive suffix/final morphological element; semantic function unknown.

See [`leads/JA.md`](leads/JA.md).

### 2. The `SI-DA-*` family

**Assessment:** strongest current Kober-style paradigm candidate; must survive onomastic/toponymic controls.

See [`leads/SI-DA.md`](leads/SI-DA.md).

### 3. The `DA-KU-` family and possible `-TI`

**Assessment:** strong formal lead, but `-TI` should not be generalized to a language-wide `-SI/-TI` opposition.

On HT 103, Scribe 3 writes in closely parallel numerical positions:

- `DA-KU-NA`
- `DA-KU-SE-NE`
- `DA-KU-SE-NE`

A bare `DA-KU` is independently attested on the Selakanos bronze double axe, although that object is too different in genre to establish an administrative paradigm by itself.

On HT 104, Scribe 5 writes:

- `DA-KU-SE-NE-TI 45 1/2`

alongside two other parallel entries ending in `-TI`:

- `I-DU-TI 20 1/2`
- `PA-DA-SU-TI 29`

The three amounts sum to the tablet total `KU-RO 95`.

The cross-scribe alternation `DA-KU-SE-NE` ~ `DA-KU-SE-NE-TI` remains valuable. What failed was the broader claim that final `SI` and `TI` constitute a general Linear A paradigm.

See [`leads/DA-KU.md`](leads/DA-KU.md).

### 4. `*21F-TU` ~ `*21F-TU-NE`

**Assessment:** strong evidence for a real formal relationship; grammatical function unknown.

At Haghia Triada, Scribe 9 writes both the bare and extended forms in separate administrative tablets:

- HT 94b: `*21F-TU`
- HT 87: `*21F-TU-NE`

A second scribe independently writes the extended form:

- HT 7b, Scribe 11: `*21F-TU-NE`

See [`leads/21F-TU.md`](leads/21F-TU.md).

### 5. The `KU-PA3-` family

**Assessment:** strong lexical/onomastic family; weak evidence that `-NU` is ordinary nominal inflection.

Secure forms include:

- `KU-PA3`
- `KU-PA3-NU`
- `KU-PA3-PA3`
- `KU-PA3-NA-TU`
- `KU-PA3-RI-JA`

Published comparisons connect Linear A `ku-pa3-nu` with Linear B `ka-pa3-no`, and `ku-pa3-na-tu` with `ka-pa3-na-to`. That favors Minoan personal-name formation / onomastics over a universal `-NU` case suffix.

See [`leads/KU-PA3.md`](leads/KU-PA3.md).

## Important negative results

This project deliberately records hypotheses that failed stronger controls:

- **No simple Linear A `ELUT-/E-RE-U-` precursor** was found for Mycenaean `e-re-u-ti-ja` / Eileithyia under conservative Linear A -> Linear B correspondence assumptions.
- `U-TI / U-TI-NU` is **not** a secure minimal pair; IO Za 11 does not supply an intact free-standing `U-TI-NU`.
- The apparent `NA/NE/NI/NU` mega-paradigm largely collapses when derived graph nodes, fragmentary words, genre differences, and scribal habits are filtered out.
- `KU-PA3-NU` is better treated as part of an onomastic family than as evidence for a generic `-NU` suffix.
- A general **`-SI/-TI` inflectional opposition** did not replicate in administrative same-stem pairs.
- A permissive **Mitanni Indo-Aryan pilot** produced no enrichment over matched controls.
- The attractive `SI-DA-*` grid is **not yet permitted to count as proven inflection** until personal-name/place-name alternatives are tested.

See [`REJECTED_HYPOTHESES.md`](REJECTED_HYPOTHESES.md).

## Next experiment: geographic Kober grid

The next step was pre-registered before inspecting the full geographic outcome set.

Primary anchors:

- `SU-KI-RI-TA` / `SU-KI-RI-TE-I-JA`, anchored through Sybrita;
- `PA-I-TO`, anchored through Linear B Phaistos.

The test asks whether productive endings such as `-JA` are enriched in forms expressing origin, association, possession, ethnicity, or another relational role, while using matched non-toponymic controls.

No Sanskrit, Greek, Hurrian, Luwian, Semitic, Etruscan, or other lexical matching is allowed while building the internal geographic grid.

Pre-registration: [`experiments/toponym-kober-grid.md`](experiments/toponym-kober-grid.md).

## Method

The workflow is modeled on the conservative side of combinatorial decipherment:

1. **Start with securely segmented inscriptional words**, not substrings generated by analytical graphs.
2. Require a proposed stem to contain at least two syllabograms when testing suffix alternation.
3. Record tablet/vessel, site, scribe, preceding/following words, and numerical/logographic context.
4. Compare forms only in plausibly equivalent syntactic or administrative positions.
5. Reject a proposed alternation when it is restricted to one scribe and can plausibly be orthographic.
6. Prefer same-tablet and same-scribe contrasts; next prefer cross-scribe replication at the same site.
7. Require at least two independent stems before calling an affix productive unless an externally anchored paradigm supplies equivalent evidence.
8. Only after an internal pattern survives do we compare Linear B, first-millennium Greek, or proposed substrate/contact vocabulary.
9. Assign no lexical meaning unless independent contextual evidence supports it.
10. Pre-register high-risk semantic/cross-language tests where practical.

Full protocol: [`METHODOLOGY.md`](METHODOLOGY.md).

## Data provenance and connected projects

The main searchable corpus used during this exploratory work is Michael Wengler's **Linear A Explorer / lineara.xyz** repository:

- [`mwenge/lineara.xyz`](https://github.com/mwenge/lineara.xyz)
- initial analyses were checked against upstream commit [`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`](https://github.com/mwenge/lineara.xyz/commit/43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a) (2026-08-03)

That project in turn draws principally on published GORILA transcription/image material and other scholarly tabulations. It is an extremely useful exploration layer, but this repository **does not treat its derived transaction or relation graphs as primary evidence** when they disagree with the underlying inscription transcription.

Other resources connected to the research include:

- [SigLA](https://sigla.phis.me/) — systematic paleographic database for Linear A
- [Mnamon](https://mnamon.sns.it/) — script resources and selected Linear A examples
- [DAMOS](https://damos.hf.uio.no/) — searchable Linear B / Mycenaean database
- scholarly work by Ester Salgarella, Brent Davis, Miguel Valerio, Rose Thomas, Anna P. Judson, Jose Miguel Jimenez Delgado, Robert Beekes, and others listed in [`SOURCES.md`](SOURCES.md)

See [`UPSTREAM.md`](UPSTREAM.md) for provenance rules and external-project links.

## Repository structure

```text
README.md
METHODOLOGY.md
REJECTED_HYPOTHESES.md
SOURCES.md
UPSTREAM.md
leads/
  21F-TU.md
  JA.md
  SI-DA.md
  KU-PA3.md
  DA-KU.md
experiments/
  mitanni-indo-aryan-pilot.md
  toponym-kober-grid.md
data/
  validated-leads.csv
```

## What would count as progress?

The goal is **not** to announce a translation of Linear A from isolated resemblances. Useful progress would be narrower:

- demonstrate a suffix across independent stems and scribes;
- show that the suffix predicts a recurring syntactic role;
- distinguish an inflection from a derivational or onomastic ending;
- identify an orthographic rule that survives regional/scribal controls;
- reproduce a known Linear A -> Linear B continuity using rules learned without targeting it;
- use independently anchored place names to recover a grammatical relation;
- falsify an appealing hypothesis before it becomes a decipherment claim.

## Corrections and specialist review

Corrections are welcome, especially concerning sign readings, scribal attribution, GORILA segmentation, administrative syntax, Linear B parallels, and existing scholarship that anticipates a lead recorded here.

If a proposed lead is already established in the literature, the correct outcome is to **credit that work and reclassify the item from "lead" to "replication."**

## AI use

AI tools have been used to assist with corpus searching, alignment, hypothesis generation, source discovery, and drafting. They are **not treated as authorities**. Every serious claim is intended to remain traceable to inscriptional data or cited scholarship, and AI-generated pattern matches are subjected to the same rejection criteria as human-generated ones.

## License and reuse

The analysis and original prose in this research notebook may be reused with attribution. Source corpora, inscription images, transcriptions, and scholarly publications remain subject to their respective copyrights and licenses. This repository links to upstream materials rather than republishing protected source content wholesale.
