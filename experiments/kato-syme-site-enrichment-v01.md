# Kato Syme Linear A Site-Enrichment Experiment v0.1

**Status:** PREREGISTERED — exploratory distributional branch  
**Registered:** 2026-08-20  
**Target:** Linear A inscriptions securely attributed to Kato Syme Viannou, compared against matched Linear A ritual and administrative controls.  
**Semantic status:** No lexical meanings are tested or inferred.

## Research question

Does the Kato Syme Linear A micro-corpus contain one or more textual features that are enriched at Syme after controlling for formula position, object type, chronology, sanctuary context, geography, preservation, and proper-name-compatible behavior?

The maximum permitted positive interpretation is:

> Kato Syme possessed a locally distinctive component of Linear A textual practice whose linguistic function remains unknown.

This experiment does **not** test for youth initiation, hunting, communal dining, *agelai*, *andreia*, Hermes, Aphrodite, Zeus, kouros terminology, Spartan institutions, or Bronze-to-Iron-Age lexical continuity.

## Historical motivation — not an evidentiary input

Later Greek testimony, including Ephorus as preserved by Strabo, motivated scrutiny of long-lived Cretan sanctuaries. That historical material is excluded from candidate extraction, comparison-site selection, statistical success criteria, and semantic interpretation. Site continuity is treated as spatial continuity only.

## Semantic firewall

Any candidate isolated by the experiment is assigned an anonymous label (`SY-E1`, `SY-E2`, ...). It may not receive a semantic label from later archaeology, Greek historical testimony, phonetic resemblance, or modern cult interpretation.

Even a feature shared by Syme and Palaikastro cannot be called an institutional term. Allowed competing explanations include regional variation, scribal tradition, chronology, vessel terminology, formula variation, personal name, place name, divine name, title, cult-specific vocabulary, or another unknown lexical category.

## Corpus definition

Freeze all securely published Syme Linear A inscriptions with, where recoverable:

- inscription/object identifier;
- diplomatic transcription;
- sign-group segmentation;
- damage and edge security;
- object type and material;
- archaeological context;
- date range and confidence;
- formula position/class;
- bibliography/provenance.

MM III and LM I material must not be silently pooled. Objects with broad or uncertain dates remain explicitly marked.

## Orthogonal controls

Comparison sites are selected from Bronze Age epigraphic criteria, not later cult identity.

### A. Comparable sanctuary material

Include eligible inscriptions from Petsofas, Iouktas, Vrysinas, Kophinas, and other qualifying peak/rural sanctuary contexts.

### B. Non-Syme libation/formula corpus

Include all sufficiently preserved comparable inscriptions participating in the same broad formulaic tradition regardless of later site history.

### C. Settlement/palatial ritual contexts

Include comparable inscribed ritual vessels from settlement, domestic, or palatial contexts when object/formula matching is defensible.

### D. Administrative controls

Use Hagia Triada and other major administrative corpora only to test structural recurrence, especially proper-name-compatible behavior. Administrative texts are not assumed to be genre-equivalent to ritual inscriptions.

## Unit of analysis

The primary observation is the independent inscription/object, not token count. Repetition of a sequence on one object counts once for the primary enrichment test.

For candidate `f`:

- `SY_present(f)` = number of eligible Syme inscriptions containing `f`;
- `SY_absent(f)` = eligible Syme inscriptions not containing `f`;
- `CTRL_present(f)` = matched control inscriptions containing `f`;
- `CTRL_absent(f)` = matched controls not containing `f`.

## Primary enrichment test

For every eligible sign group, use a one-sided Fisher exact test on inscription-level presence/absence.

Report:

- raw `p`;
- odds ratio;
- exact confidence interval;
- Syme document prevalence;
- control document prevalence;
- Benjamini-Hochberg FDR-adjusted `q` across the frozen candidate universe.

A sequence qualifies as an `SY-E` enrichment candidate only if all of the following hold:

1. it occurs on at least **two independent Syme inscriptions**;
2. enrichment odds ratio is **>= 4.0**;
3. FDR-adjusted **q <= 0.05**;
4. it survives preservation screening;
5. it survives chronology matching;
6. it survives object/formula-class matching.

A Syme singleton is not a site-enrichment candidate.

## Stratified robustness / permutation

Where sample size permits, stratify eligible inscriptions by chronology x object type x formula/context class. Permute site labels only within compatible strata to generate the null distribution of apparent Syme enrichment.

The permutation analysis must preserve inscription-level structure. The primary aim is to determine whether an apparent Syme effect can be reproduced merely from the surviving mix of dates, supports, formula types, or preservation states.

## Formula-position control

For each candidate record:

- formula slot;
- preceding/following element;
- terminal/medial status;
- omission frequency;
- substitution pattern.

A Syme-enriched realization of a common formula slot is classified first as a **local formula variant**, not an independent lexical item.

## Proper-name compatibility screen

For every `SY-E` candidate, search the frozen administrative corpus for exact and near matches and classify positional behavior.

### PN scale

- **PN-0:** no administrative parallel.
- **PN-1:** lexical relative occurs administratively but in incompatible positions.
- **PN-2:** exact/near match occurs in a plausible entity/location/recipient slot.
- **PN-3:** repeated exact/near matches consistently occupy probable entity/location/recipient slots.

Any PN-2 or PN-3 candidate is labeled **proper-name-compatible**. This is not proof of a toponym, theonym, or anthroponym; it is a structural veto against treating site enrichment as specialized ritual vocabulary.

## Regional/dialect control

Geographic proximity is treated as a competing explanation. Test whether candidate sharing is better associated with region than with sanctuary class, object type, chronology, or formula position. Palaikastro receives no privileged status.

## Candidate-blind site-similarity analysis

Before later historical/cult labels are inspected, compute site-to-site similarity using only Linear A features, including where feasible:

- Jaccard similarity of sign-group inventories;
- cosine similarity of document-frequency vectors;
- formula-slot variant similarity.

Freeze the site relationships before revealing later cult identities. If Syme clusters naturally with ordinary peak/rural sanctuaries, that observation outranks later historical analogies.

## Synthetic power analysis

Before candidate identities are interpreted, inject artificial Syme-local signals into the observed inscription structure while preserving corpus size, fragmentation, and document classes. Measure recovery under the full preregistered pipeline.

If the detector cannot recover a preregistered target effect with at least **80% power**, a null empirical result cannot be labeled `NEGATIVE`; it must be labeled `INDETERMINATE_DUE_TO_SPARSITY`.

## Terminal states

- `SITE_ENRICHMENT_DETECTED`: at least one candidate passes all confirmatory gates.
- `NEGATIVE`: adequate synthetic power, but no candidate survives.
- `INDETERMINATE_DUE_TO_SPARSITY`: the corpus cannot support the preregistered recurrence/effect criteria or synthetic power is inadequate.

Failure by singleton sparsity does not relax thresholds and does not authorize post-hoc rescue of individual Syme sequences.

## Interpretive ceiling

A positive result establishes only that a textual feature is unusually associated with Kato Syme under the frozen controls. It does not identify the feature semantically and does not establish continuity with Iron Age institutions.

## Contingency

If this experiment terminates `INDETERMINATE_DUE_TO_SPARSITY`, the separately preregistered `pan-cretan-rare-ritual-register-v01.md` protocol may activate. No Phase A candidate identity may enter Phase B candidate selection.