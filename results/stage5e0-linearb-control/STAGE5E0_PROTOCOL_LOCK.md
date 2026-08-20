# Stage 5E0 preregistration: Linear B context-conditioned morphology control

**Frozen:** 2026-08-20  
**Status:** LOCKED BEFORE EDGE-SIGN RESULTS  
**Purpose:** validate a site-portable, semantics-blind detector of morphosyntactic information in Linear B before any Stage 5E application to Linear A.

## Authorization hierarchy

1. **Level 1:** within-Pylos prediction on unseen lexical stems and unseen documents.
2. **Level 2:** within-Knossos prediction under the same architecture.
3. **Level 3:** mandatory bidirectional transfer, PY -> KN and KN -> PY, restricted to site-isomorphic structural roles.
4. **Level 4:** optional external replication on Mycenae/Thebes only after a blinded power analysis. An underpowered MY/TH failure is INDETERMINATE and cannot invalidate Level 3. No return to PY/KN tuning is permitted after Level 4 is opened.

**Linear A authorization gate:** Level 3 must pass. Level 4 is confirmatory only when adequately powered.

## Frozen source

Primary positive-control source: DĀMOS Linear B corpus, via the pyaegean `damos-corpus-v2` decoded release asset.

- DĀMOS license: CC BY-NC-SA 4.0.
- Release asset: `damos-corpus-v2/damos-corpus.json`.
- Frozen asset SHA-256: `eab9ccdfc4324b62f015bccd5e3f917f256cab8c058840842127eadecfbca2d2`.
- pyaegean source commit used to document decoding/token classes: `47c3f126afa9d1f09d836c38f8be437bd2868783`.
- DĀMOS linguistic annotations, translations, lemmas, case labels and syntactic analyses are sealed and may not be read during role construction, model fitting, threshold selection or cross-site transfer.

The raw DĀMOS transcription string is retained because its whitespace and line breaks are required for site-agnostic layout geometry. Token order reconstructed from a whitespace-collapsed representation is insufficient for the geometry layer.

## Semantic firewall

The structural parser may use only:

- physical/transcribed line breaks;
- character-column start/end positions in the raw transliteration;
- token order;
- token class: `WORD`, `NUMBER`, `LOGOGRAM`, `SEPARATOR`, `OTHER/EDITORIAL`;
- document size and line index;
- site, document and scribe identifiers **only for splitting, balancing, grouping and audit**, never as lexical/morphological features.

It may NOT use:

- word translation, lemma or Greek reading;
- grammatical annotation (case, number, gender, person, tense, etc.);
- commodity or object identity;
- logogram identity;
- tablet-series names or document-ID prefixes as features or role rules;
- known administrative labels such as land tenure, sheep, textile, bronze, chariot, ration, offering, recipient, worker, place-name or personal-name;
- known Mycenaean suffix analyses.

### Logogram collapse

Every token classified as an ideogram/logogram is immediately replaced with the same token: `[LOGOGRAM]`.

No downstream table may retain the original logogram label or commodity attribute. The parser may know only that a generic counted/object sign occupies a position.

## Geometry primitives

For each raw transcription line:

1. retain the original character columns;
2. identify token spans by non-whitespace runs;
3. ignore the leading line label for token classification but retain its layout offset;
4. classify each remaining run into the five permitted classes;
5. map every logogram to `[LOGOGRAM]` and every numeric/fraction token to `[NUMBER]`;
6. mark a lexical target `SECURE=FALSE` if its spelling contains explicit uncertainty, damage or unresolved editorial material. Confirmatory morphology models use only secure lexical targets.

For a document of maximum raw-line width `W`, a lexical token has normalized horizontal coordinate `x = start_column / max(W,1)`. Raw start columns are retained for exact/near-exact alignment tests.

No coordinate threshold may be site-specific.

## Primitive structural predicates

These predicates are deterministic and carry no administrative interpretation.

### P1: `DIRECT_NUMBER_RIGHT`
For lexical word `w`, after ignoring separators, the first non-separator token to its right on the same line is `[NUMBER]`.

### P2: `LOGOGRAM_NUMBER_RIGHT`
For `w`, after ignoring separators, the next two non-separator classes to its right are `[LOGOGRAM]`, `[NUMBER]`.

### P3: `PRE_GENERIC_LOGOGRAM`
For `w`, the first non-separator token to its right is `[LOGOGRAM]`.

### P4: `POST_GENERIC_LOGOGRAM`
For `w`, the first non-separator token to its left is `[LOGOGRAM]`.

### P5: `SOLE_LEXICAL_ON_LINE`
The line contains exactly one `WORD`, irrespective of the number of generic numeric/logographic tokens.

### P6: `LEFTMOST_LEXICAL_ON_LINE`
`w` is the lexical word with the smallest raw start column on its line.

### P7: `RIGHTMOST_LEXICAL_ON_LINE`
`w` is the lexical word with the largest raw start column on its line.

### P8: `PARALLEL_ROW_MEMBER`
The line containing `w` belongs to a run of at least two adjacent nonempty lines satisfying all of:

- the leftmost lexical start columns differ by at most one raw character column;
- each line has the same **masked class signature**, formed after replacing every lexical word by `W`, every logogram by `L`, every number/fraction by `N`, dropping separators and collapsing consecutive `N` tokens to one `N`;
- no word spelling, sign identity, number value or logogram identity contributes to the signature.

### P9: `INDENTED_CHILD_MEMBER`
`w` is the leftmost lexical item of a `PARALLEL_ROW_MEMBER` block and the median leftmost lexical start column of that block is at least two raw columns to the right of the leftmost lexical item on the nearest preceding nonempty lexical line.

### P10: `PARENT_OF_PARALLEL_BLOCK`
`w` occurs on the nearest preceding nonempty lexical line immediately before a block satisfying P9; `w` is the leftmost lexical item on its own line and its start column is at least two columns left of the child-block median. No intervening lexical line may begin at an equal or smaller column.

The one-column parallel tolerance and two-column indentation threshold are frozen globally and may not be altered by site or tablet series.

## Frozen structural outcome labels

Human-readable names below are descriptive aliases only. The model stores them as `SR01` through `SR09` so no semantic category is implied.

| ID | Mechanical definition | Descriptive alias |
|---|---|---|
| `SR01` | P1 | direct numeric attachment |
| `SR02` | P2 | generic logogram + numeric attachment |
| `SR03` | P3 | pre-generic-logogram position |
| `SR04` | P4 | post-generic-logogram position |
| `SR05` | P8 | parallel row member |
| `SR06` | P8 AND (P1 OR P2) AND P6 | quantified parallel entry |
| `SR07` | P9 | indented child-block member |
| `SR08` | P10 | parent of repeated indented block |
| `SR09` | P5 | sole lexical item on line |

The labels are multi-label outcomes. No label means "recipient", "genitive", "header", "landholder", "sheep entry" or any other semantic/grammatical category.

## Administrative-isomorphism gate

A structural role is eligible for Level-3 PY <-> KN transfer only if, **before edge identities are inspected**, it satisfies in BOTH sites:

1. at least 100 positive lexical targets;
2. at least 100 negative lexical targets;
3. positives span at least 30 independent documents;
4. no single document contributes more than 5% of positive targets, unless down-weighting to the 5% cap restores the condition;
5. a blinded synthetic-effect power analysis demonstrates adequate power at the preregistered target effect.

Roles failing any item remain valid within-site descriptive outcomes but are excluded from the bidirectional authorization gate. No site-unique economic role may be added manually.

### Synthetic power gate

For each role/direction, a synthetic edge category with 10% marginal prevalence is injected without changing word length, document membership or role labels. Assignment is sampled to impose an odds ratio of 2.0 with the role while preserving document blocks. One hundred Monte Carlo injections are evaluated with the frozen cross-validation scheme.

A role/direction is adequately powered when >=80/100 injections show positive held-out edge gain and the exact 95% binomial lower bound on recovery exceeds 0.70. This power analysis is performed using anonymous synthetic edge IDs only.

## Lexical-stem firewall

Confirmatory models are **edge-specific**, which is stricter than exposing both word edges simultaneously.

### Suffix model
Input lexical representation:

`[START] + [MASKED_STEM] + FINAL_SIGN + [END]`

All signs except the final sign are hidden from the predictor. The exact prefix string (word minus final sign) is retained only as a grouping key and is never a feature.

### Prefix model
Input lexical representation:

`[START] + INITIAL_SIGN + [MASKED_STEM] + [END]`

All signs except the initial sign are hidden. The exact remainder (word minus initial sign) is retained only as a grouping key.

No confirmatory model receives both edge signs simultaneously. This prevents two-sign words, or distinctive initial/final pairs, from reconstructing lexical identity.

## Leakage-proof folds

Within each site, folds must simultaneously prevent document leakage and stem leakage.

For each edge direction, construct a bipartite graph:

- one node class = masked stems;
- second node class = documents;
- an edge connects a stem to every document in which it occurs.

Connected components of this bipartite graph are indivisible grouping units. Cross-validation assigns whole components to folds, ensuring that no masked stem and no document appears in both train and test.

If component structure makes k-fold evaluation unstable, k may be reduced before edge identities are inspected, but the component rule itself may not be relaxed.

Cross-site Level 3 uses complete site holdout and therefore automatically satisfies stem/document separation across sites. Shared strings across sites are not exposed as stem features.

## Length confound and model architecture

Each structural role is a separate binary prediction task.

### Baseline M0
Regularized logistic regression using only frozen nonlexical confounds:

- one-hot word length in signs;
- normalized document length (lexical-token count);
- normalized line index within document;
- total line count.

No local feature used to DEFINE the outcome role (e.g. logogram proximity, numeric proximity, parallel-row membership) is included in M0. Otherwise the outcome would be leaked into the predictor.

### Edge model M1
`M1 = M0 + categorical edge-sign ID`

The edge sign is anonymously encoded during blind evaluation. Word/stem identity is absent.

Primary statistic:

`DeltaLL = held-out log-likelihood(M1) - held-out log-likelihood(M0)`

Thus the confirmatory question is exactly: **does the edge sign predict the independently defined structural role better than word length and frozen document-position controls alone?**

Secondary descriptive metrics may include Brier score and AUROC but may not override the primary decision.

Document-balanced weights cap any document's contribution to the effective sample at the median positive-document contribution for that role. Site-balanced weighting is used only in pooled descriptive analyses, not in site-holdout transfer.

## Decision thresholds

For a role/edge-direction test to count as a positive Stage 5E0 structural-morphology signal:

1. held-out `DeltaLL > 0`;
2. 99% document-block bootstrap lower bound on `DeltaLL` > 0;
3. the result remains positive under at least 95/100 deterministic hash-derived bootstrap seeds;
4. for Level 1/2, the edge gain must be obtained under the leakage-proof component folds;
5. for Level 3, the same frozen model family must show positive transfer gain in BOTH PY -> KN and KN -> PY for at least one isomorphism-cleared structural role.

Multiple structural-role tests are controlled as a preregistered family using Holm correction at alpha=0.01. Edge identities are not inspected until the family-level decisions are frozen.

## Greek positive-control unblinding

Only after Level 1-3 structural results and hashes are frozen may DĀMOS linguistic annotations be opened.

The unblinding asks whether anonymously discovered edge-role associations correspond disproportionately to established Greek morphosyntactic categories across unseen stems. This stage may interpret the control; it may not retroactively alter roles, parser geometry, folds, model features, thresholds or power rules.

Failure to recover a known category is informative. No post-unblinding tuning is allowed.

## Level-4 MY/TH holdout

Mycenae and Thebes remain sealed during PY/KN development.

Before Level 4 is scored, run the same anonymous structural-role census and synthetic power analysis. Only roles meeting the frozen power gate can falsify external replication. Underpowered roles are `INDETERMINATE_DUE_TO_SPARSITY`.

If an adequately powered Level-4 test fails, record the failure. Do not return to PY/KN to alter the role grammar or model.

## Linear A authorization

Stage 5E1 on clean-v2.1 may begin only if Level 3 passes under this frozen protocol.

Claim ladder remains:

- Claim A: reproducible structural association.
- Claim B: cross-lexeme contextual morphology.
- Claim C: cross-site contextual morphology.
- Claim D: functional category, QUARANTINED until Claim C passes.

No grammatical label is licensed by Stage 5E0 itself.