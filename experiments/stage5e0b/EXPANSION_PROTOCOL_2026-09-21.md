# Stage 5E0b candidate-blind expansion protocol — 2026-09-21

Status: REVIEWER-AUTHORIZED EXPANSION; GOLD NOT FROZEN; SCORING PROHIBITED.

## Selection, frozen before inspecting model output

Universe: common-word lexical entries in Piquero Rodríguez, *LGM* (2019). Exclude proper names, reconstructions, uncertain morphological alternatives, and entries whose evidence is solely restored. Never treat omission from LGM as a negative label.

For each lemma, build an LGM-only candidate inventory with page, lemma, diplomatic form, case/number or verbal morphology, explicitly named tablet, archive, uncertainty notation and attestation evidence. Do not infer occurrence counts from general discussion or form-level citations. Do not read the induction model's clusters, predictions, scores, error analyses or detector-derived rankings during selection.

A lemma qualifies for the first expansion tier only if LGM explicitly supports at least THREE distinct, securely analyzed syllabographic surface forms AND explicitly identifies at least ONE MY or TH occurrence. These are screening requirements, not proof of DĀMOS epigraphic security. A second, separately flagged tier consists of lemmas with >=3 secure forms but no explicit MY/TH reference, to prevent an empty first tier from inducing silent threshold relaxation. Screen the complete lexicon in printed entry order and retain all matches; do not cherry-pick examples or stop after favorable model behavior. Record the exact denominator of entries examined, failed criteria and reasons. Do not reinterpret LGM's archive references as proof of highest-confidence occurrence-level morphology.

For every retained form, export DĀMOS normalized-exact across all archives, retaining zero-result files and the search settings. Preserve diplomatic reading, normalized form, tablet, line, physical-token and lexical-token identifiers, source versions, and hashes. Reconcile each occurrence to LGM by tablet/line/token where possible. Apply frozen clitic rule v1.0.0 and the same epigraphic override as pilot v1. Do not silently normalize damaged/restored/uncertain readings, disputed contexts, segmentation differences or ambiguous morphology into gold. Require independent adjudication of decisive line damage.

Report per-lemma eligible forms, candidate/quarantine counts and reason codes, archive distributions, MY/TH primary-gold count, and duplicate/coverage reconciliation. Keep PY/KN development separate from MY/TH external holdout; no model tuning against MY/TH. Do not freeze or score unless the preregistered multi-lemma, externality, provenance, adjudication and holdout prerequisites are satisfied. Otherwise report INDETERMINATE_DUE_TO_SPARSITY.

This protocol is a project-side execution rule. Reviewer feedback was supplied in chat; no independent review of the expanded evidence or approval to score has occurred. Restricted LGM and source exports must not be committed to public GitHub.