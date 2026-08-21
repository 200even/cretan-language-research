# Stage 5E0 diagnostic autopsy protocol

**Frozen:** 2026-08-21  
**Status:** LOCKED BEFORE GREEK EDGE-IDENTITY INSPECTION  
**Purpose:** diagnose why the Stage 5E0 single-edge Linear B positive control failed, without contaminating the future Stage 5E0b external test.

## Epistemic status

Stage 5E0 v1 remains a frozen historical result. A separately committed preregistration-compliance v2 runner (`run_stage5e0_blind_v2.py`, Git blob `dd457b11b9c36ef812f7f4f305da88aa688f62fc`) is being run as a pre-Greek-unblinding sensitivity because it implements two protocol clauses more literally: the 5% positive-document concentration rule and 100 independently hash-derived stability seeds. The v2 code was committed after the first computation existed but before the blind outputs were published and before Greek edge identities were inspected. It may therefore confirm or qualify, but may not erase, the v1 historical record.

No Stage 5E0 architecture, role definition, model family, effect threshold, alpha, or source is changed during this autopsy.

## Permanent corpus partition after autopsy authorization

- **Development/autopsy:** Pylos (PY) and Knossos (KN). Their Greek linguistic information may be inspected only under this protocol.
- **External test:** Mycenae (MY) and Thebes (TH). No lexical strings, edge inventories, role distributions, morphological annotations, or Greek analyses from MY/TH may be inspected before Stage 5E0b architecture, features, thresholds, power criteria, and code hashes are frozen.
- **Disclosure:** the original Stage 5E0 extractor already exposed aggregate corpus sizes for MY/TH (documents and total/secure word counts). This limited metadata contamination is recorded and cannot be undone. It does not license inspection of MY/TH outcome-bearing information.

If Stage 5E0b is attempted, MY/TH are the sole confirmatory external holdout. An inadequately powered MY/TH test is `INDETERMINATE_DUE_TO_SPARSITY`; an adequately powered failure blocks Linear A. No return to PY/KN tuning after MY/TH is opened.

## Ordered autopsy

### A. Structural-role to Greek-syntax mapping

Before inspecting which edge signs drove any Stage 5E0 score, interpret the already-frozen structural roles in terms of the *set* of Greek syntactic functions that can occupy each layout. Do not force a one-role/one-case equation.

Primary transfer-eligible roles:

- `SR01` = lexical word immediately followed by a number. Expected to be grammatically heterogeneous: possible nominative rubric/count label, dative recipient/beneficiary, genitive possessor/collector/association, locative/allative/toponymic expression, or a counted nominal/person depending document syntax.
- `SR02` = lexical word followed by generic logogram then number. Expected to be an inventory/allocation NP slot with possible dative, genitive, nominative-rubric, locative/allative, or modifier analyses.
- `SR03` = lexical word immediately before a generic logogram. Superset of SR02-like lexical-before-object contexts and therefore likewise not intrinsically case-specific.
- `SR05` = member of geometrically repeated parallel rows. Encodes syntactic repetition/administrative parallelism, not a specific argument or case.
- `SR09` = sole lexical word on a line. Potentially enriched for rubrics/headers or isolated recipients/places but not a grammatical category by definition.

Roles `SR04`, `SR06`, `SR07`, `SR08` may be described diagnostically but were not Level-3 eligible in v1 and cannot be retroactively promoted into the original test family.

The mapping must report ambiguity and mixtures. Evidence that the same administrative relation alternates among nominative rubric, dative, genitive, or local constructions counts as target heterogeneity, not annotator error.

### B. Orthographic mismatch analysis

Document, before failed edge identities are inspected, the known information loss caused by Linear B spelling that makes a single initial/final syllabogram an incomplete proxy for Greek morphology.

At minimum test these mechanisms against PY/KN examples after the theoretical inventory is frozen:

1. Omission of word-final consonants, collapsing distinctions such as endings in `-s` or `-n` onto the same final CV sign.
2. Vowel/diphthong collapse at word edges. A canonical first-declension singular paradigm can have nominative `-a:`, accusative `-a:n`, genitive `-a:s`, and dative `-a:i`, all written with final Linear B `-a`.
3. Multi-sign endings whose grammatical force depends on more than the final sign, e.g. dative plurals written `-(C)a-i`, `-(C)o-i`, or `-(C)si` by stem class.
4. Multi-sign case morphology such as thematic genitive patterns and endings whose interpretation requires the preceding syllabogram.
5. Stem-conditioned or paradigmatic alternation, where the informative unit is stem + ending or a contrast among related forms rather than the terminal syllabogram alone.
6. Syncretic visible endings such as `-pi`, which can cover multiple oblique functions rather than uniquely encoding one case.
7. Legitimate orthographic variation across writers/sites, including partial/plene spellings, which can split a single morphological category across surface n-grams.

### C. KN -> PY asymmetry diagnosis

Keep edge identities anonymous for the first asymmetry tests. Test the following competing explanations using PY/KN only:

1. **Role-distribution/domain-shift hypothesis:** compare role prevalence and document geometry across sites. A role whose base prevalence/layout differs greatly across sites may not support symmetric transfer.
2. **Training-diversity hypothesis (reviewer):** quantify document, scribe, format, and edge-distribution diversity. Test whether KN has broader support/entropy rather than assuming it from historical description.
3. **Vocabulary/edge-support hypothesis:** because the frozen model uses `OneHotEncoder(handle_unknown='ignore')`, measure directional edge OOV rates and test-mass coverage. If KN training covers a larger share of PY edge tokens than PY training covers KN, this is a direct mechanical explanation for asymmetric generalization.
4. **Frequency-concentration hypothesis:** measure whether the positive SR01 signal is driven by a small number of high-frequency edges/documents despite weighting.
5. **Boilerplate hypothesis:** quantify within-site repetition/entropy and evaluate whether PY has lower effective edge/context diversity than KN.

No explanation is accepted from historical narrative alone. Report each as supported, unsupported, or indeterminate.

### D. Stage 5E0b representation design

Only after A-C are complete may a new representation be proposed. It must be language-agnostic in the sense that it can be computed from sign strings without a Greek lexicon when eventually transferred to Linear A.

Permitted architecture families to evaluate on PY/KN development data include:

- terminal and initial sign n-grams of length 1-3 with explicit backoff/OOV handling;
- edge signatures combining the final two signs with word length while keeping lexical interiors masked;
- unsupervised paradigmatic-neighborhood features based on edit-distance/one-edge alternation families;
- distributional stem-family induction followed by masked paradigm-state features;
- character/sign-level regularized models whose receptive field is limited to a preregistered edge window rather than whole-word identity;
- hierarchical models with site as a random/domain effect during PY/KN development but no site-specific lexical parameters at external test.

Forbidden for Stage 5E0b:

- Greek lemma or translation as an input feature;
- known Greek case labels as a prediction feature;
- manually curated lists of Greek endings or vocabulary;
- tablet-series identity, commodity/logogram identity, or document semantics;
- any feature, threshold, or architecture choice informed by MY/TH strings/outcomes.

Known Greek morphology may be used only as the *development target/evaluation truth* for PY/KN to determine whether a script-only representation is capable of recovering morphology. The final feature extractor must operate from the same information classes available in an undeciphered script.

## Stage 5E0b authorization design

A future Stage 5E0b must be separately preregistered. PY/KN are development/validation only. Before opening MY/TH, freeze:

- sign representation and masking rules;
- structural targets or grammatical-target construction;
- cross-validation scheme that avoids the giant connected-component pathology without permitting lexical leakage;
- synthetic power model and target effect;
- external-test minimum sample requirements;
- all thresholds and multiple-testing family;
- code/source hashes.

Only an adequately powered, untouched MY/TH external replication can authorize transfer of the Stage 5E0b architecture to Linear A.
