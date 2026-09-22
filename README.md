# Cretan Language Research: Linear A Morphology Benchmark

**An independent, reproducible research project testing what can—and cannot—be inferred about Linear A from inscriptional structure.**

Linear A remains undeciphered. I am not claiming to have deciphered it, identified the language spoken by its writers, recovered exact pronunciation from Linear B sign values, or translated inscriptions. My goal is to make a narrower but useful contribution: develop an auditable procedure that can distinguish recurring morphological structure from chance resemblance, damage, editorial normalization, names, formulae, and scribal or documentary effects. I want both positive findings and failures to survive scrutiny, and to make it straightforward for specialists to correct the record.

The central research question is:

> **When Linear A sign groups appear to share stems and alternate at their margins, what evidence would justify treating those relationships as morphology—and what observations would falsify that interpretation?**

The longer-term aim is to test whether reproducible formal patterns predict independently observable contextual contrasts. Grammatical functions, phonological reconstructions, language-family hypotheses, and meanings are separate, higher-evidence questions, not automatic consequences of finding similar strings.

This is an independent computational research effort led by **Scott Ferguson**, not an authoritative edition of the inscriptions or a substitute for specialist epigraphy and historical linguistics. I welcome corrections, counterexamples, source improvements, and prior-work citations; see [CONTRIBUTING.md](CONTRIBUTING.md).

## Research principles

**Discovery is computational. Promotion is epigraphic. Interpretation comes last.**

1. **Start with physical evidence.** Preserve exact inscription identifiers, sign readings, segmentation, word boundaries, damage, object type, site, and (where available) scribal attribution. A higher-fidelity diplomatic or epigraphic reading overrides a convenient normalized database token. Apply damage rules to individual occurrences, not to every instance of the same spelling.
2. **Keep evidence layers separate.** Formal correspondence and edit distance are not proof of shared lexical identity; a repeated extension is not automatically an inflectional suffix; a formal paradigm is not a grammatical function or translation. Preserve alternative analyses, including derivation, compounding, homography, onomastics, and orthographic variation.
3. **Discover without target leakage.** Freeze corpora, candidate sets, selection criteria, code, random seeds, statistical thresholds, and evaluation rules before examining held-out identities or interpretations. Never turn a post-unblinding adjustment into a confirmatory result.
4. **Require independent support.** Test across complete attested words, distinct stems and documents, and, where feasible, scribes, sites, and genres. Distinguish sibling extensions from attested multi-step chains; never infer a missing intermediate form.
5. **Calibrate and try to falsify.** Use length/frequency-matched controls, null models, held-out evaluation, synthetic power gates, uncertainty estimates, and explicit negative cases. Report failures, insufficient power, and superseded hypotheses alongside surviving candidates.
6. **Validate the method before transferring it.** Linear B provides a deciphered positive-control environment for testing whether a semantics-blind method can recover genuine structure. The method must pass its preregistered control before an analogous result is treated as confirmatory evidence in Linear A.
7. **Do not let an interpretation repair an inscription.** When joining a physical token source such as DĀMOS with a linguistic analysis such as Piquero Rodríguez's *El léxico del griego micénico* (LGM), the epigraphic reading and damage state control token eligibility. Linguistic labels cannot silently override a conflicting physical reading. Respect source access and redistribution restrictions.

The [methodology](METHODOLOGY.md), [benchmark](BENCHMARK.md), [upstream-source provenance](UPSTREAM.md), [bibliography](SOURCES.md), and [rejected-hypothesis register](REJECTED_HYPOTHESES.md) provide the detailed rules and historical record.

## Research program

### 1. Build an inscriptionally trustworthy Linear A corpus

Reconcile normalized search layers against diplomatic glyph/transcription evidence, including boundary damage, fragment separation, cross-line or cross-face continuation, ligatures, and source-reading discrepancies. Freeze source versions and record hashes. A normalized token cannot create a complete word that the physical evidence does not attest.

### 2. Induce and audit formal relationships

Generate candidate shared-stem, prefix, terminal-extension, and paradigm relationships without assigning sounds or meanings. Audit each candidate against competing segmentation, names, formulae, scribal habits, document context, and damaged or reconstructed forms. Keep local extension evidence distinct from claims of global productivity or multi-stage morphology.

### 3. Establish a genuinely independent Linear B positive control

Test the morphology-induction architecture against securely attested Linear B before transferring it to Linear A. The revised Stage 5E0b design uses a constrained Wagner–Fischer alignment and minimum-description-length (MDL) rule selection, with a separately frozen, high-confidence LGM/DĀMOS evaluation layer and a held-out cross-site component. Keep direct lexical correspondence, morphological membership, and semantic interpretation separate; score only after the evaluation standard is frozen. Disputed analyses belong in sensitivity analyses, not the primary gold set. An unsuccessful earlier control remains unsuccessful, regardless of later model revisions.

### 4. Transfer only validated structural tests to Linear A

If an independently preregistered Linear B control succeeds, apply its frozen procedure to Linear A with comparable corpus-size, source-quality, and null-model controls. Evaluate distributional structure before contextual or grammatical interpretation. Do not infer that Linear A is Greek or that Linear B orthographic conventions automatically carry over.

### 5. Make the research cumulative and falsifiable

Publish manifests, source/version identifiers, criteria, negative controls, competing explanations, and result status. Preserve failed experiments and historical outputs rather than retroactively altering them. A specialist correction is evidence of the process working, not a reason to hide an earlier error.

## Results and status: read the dates and gates

The repository's checked-in [CURRENT_STATUS.md](CURRENT_STATUS.md) is the detailed status record for the earlier experiments **as of 2026-08-21**. It has not yet been reconciled here with the subsequent Stage 5E0b acquisition, gold-standard freeze, or any later induction runs. The following are established results in the checked-in record, not a claim that the whole current research program has completed:

- **Phase 1B:** completed candidate-blind diplomatic repair. The clean-v2.1 primary administrative corpus contains 554 eligible tokens, 211 documents, and 374 types (effective token weight 457).
- **Stage 5C:** preregistered global edge-productivity tests did **not** establish `TI` or `JA` as globally productive terminal markers.
- **Stage 5D:** local formal terminal-extension relationships for `JA`, `TI` (caveated), and `PA` (rule-limited) survived adjudication. The primary corpus contained **zero complete three-state ladders** and **zero validated second-stage transitions**. These results authorize no grammatical labels.
- **Stage 5E0:** the frozen edge-sign-only Linear B contextual detector failed the mandatory bidirectional Pylos–Knossos transfer criterion. This specific model did **not** authorize confirmatory Linear A transfer. It must not be retrospectively retuned or re-described as a successful control.
- **Stage 5E0b:** a separate, revised induction-and-gold-standard pathway was subsequently developed. Its definitive artifacts, freeze hashes, and scored results must be consulted directly before asserting completion or performance; the August status file alone does not establish them. This README does not invent a paradigm F1 score or claim that a subsequent transfer gate passed.

See the [Phase 1B record](results/phase1b-confirmatory-v2.1/), [Stage 5D record](results/stage5d-clean-v2.1/), and [failed Stage 5E0 positive-control report](results/stage5e0-linearb-control/STAGE5E0_BLIND_RESULT.md). For the Davis comparison, see [the preregistered experiment](experiments/davis-2026-affix-replication.md) and [audit synthesis](results/davis-six-audit-synthesis.md): the frozen blind v0.2 ranking recovered 3 of 6 independently supplied signs at its cutoff; a later 4-of-6 universe-matched analysis was post-unblinding and is labeled accordingly.

**No decipherment, grammatical assignment, or authorized confirmatory Linear A application follows from these findings.**

## Scholarly assistance and acknowledgments

I am grateful to the researchers who have taken time to engage with this independent project. Personal correspondence, provision of research materials, and encouragement are acknowledged for what they are; none of these acknowledgments implies that the scholars have reviewed or endorsed this repository's methods, analyses, or conclusions.

- **Brent Davis** generously responded to my research inquiries, clarified the two prefix signs and four suffix signs reported in his 2026 work, and encouraged continued discussion. His independently identified signs supplied an external target for a frozen, blind replication exercise; his published scholarship and correspondence are his contributions, while the computational implementation, adjudications, and claims in this repository remain my responsibility. See the [replication protocol](experiments/davis-2026-affix-replication.md) and [source guide](SOURCES.md).
- **Juan Piquero Rodríguez**, author of *El léxico del griego micénico* (LGM), kindly provided a PDF of his lexicon and authorized its use for this research. He asked that the PDF **not be redistributed**; it is not included in this repository. The lexicon provides a scholarly linguistic reference for a restricted Linear B evaluation layer, not a substitute for checking epigraphic attestations. I appreciate his generosity and assistance.

The project also depends on the work of many scholars and corpus builders **without implying personal collaboration**: Alice Kober's paradigm-first methodological legacy; Louis Godart and Jean-Pierre Olivier's *GORILA* editions; Ester Salgarella and Simon Castellan's SigLA work; the DĀMOS corpus and its contributors; and the creators and maintainers of [Linear A Explorer](https://github.com/mwenge/lineara.xyz), among others cited in [SOURCES.md](SOURCES.md) and [UPSTREAM.md](UPSTREAM.md). Credit for editions, datasets, published hypotheses, and independently discovered patterns belongs to their original authors. The responsible attribution of any individual idea should follow the specific experiment or source record.

This project uses AI assistance for research organization, coding, drafting, and methodological critique. AI-generated suggestions and simulated or independently supplied reviewer feedback are **not** equivalent to external scholarly peer review. I take responsibility for checking sources, executing and auditing the analyses, distinguishing proposed from completed work, and correcting errors.

## Reproducibility and participation

Start with [CURRENT_STATUS.md](CURRENT_STATUS.md) for the last fully documented checked-in status, then the experiment-specific protocol, frozen artifact manifest, and report for the result you wish to reproduce. Key implementation directories include [`scripts/phase1b/`](scripts/phase1b/) and [`scripts/stage5d/`](scripts/stage5d/). Source datasets and protected scholarly PDFs are not redistributed merely because they are used in analysis; reproducibility materials retain provenance, source identifiers, hashes, and access constraints where available.

I particularly welcome corrections to readings, segmentation, source precedence, onomastic classifications, control-set independence, evaluation leakage, and prior-work attribution. Please open an issue following [CONTRIBUTING.md](CONTRIBUTING.md).

> **The intended contribution is not a compelling decipherment story. It is a research process in which a morphological claim can be reproduced, challenged, revised, or decisively rejected.**
