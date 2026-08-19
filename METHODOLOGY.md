# Methodology

This project treats Linear A as an undeciphered writing system for which structural claims can sometimes be tested even when lexical meanings cannot.

## Claim ladder

Claims are kept on separate evidential levels:

1. **Epigraphic:** a sign sequence is securely read and segmented on an inscription.
2. **Distributional:** the sequence recurs in a measurable context.
3. **Morphological:** two or more securely attested forms plausibly share a stem and differ by an affix or morphological extension.
4. **Syntactic:** the alternation correlates with a recurring grammatical/discourse position.
5. **Phonological:** a sign value or sound correspondence is supported independently, typically through Linear B continuity.
6. **Semantic:** a meaning can be proposed from converging contextual evidence.

A result at level 2 is not described as level 4; a result at level 3 is not presented as a translation.

## Strict morphology filter

For a candidate `X` ~ `X-SUFFIX` pair:

- both forms must be securely segmented inscriptional words;
- the proposed shared stem should contain at least two syllabograms;
- fragmentary initial/final forms are excluded unless the relevant boundary is secure;
- tablet/vessel, site, scribe, neighbors, numerical/logographic context, and genre are recorded;
- same-tablet / same-scribe contrasts receive highest weight;
- cross-scribe replication receives more weight than same-scribe-only variation;
- a variation restricted to a single scribe is provisionally treated as potentially orthographic;
- derived analytical databases are not allowed to create a form not present in the raw transcription;
- comparable administrative positions matter more than raw edit distance.

## Damage-aware extraction protocol

The v0.3 experiment established that damage state must be attached **before** exact morphology pairs are generated.

The current computational protocol therefore distinguishes:

1. a cleaned word/index layer used to locate candidate forms;
2. an independent damage/boundary layer derived from inscription-oriented transcription data;
3. a complete-form layer created only after the two are reconciled.

Rules:

- a cleaned spelling is not assumed complete merely because brackets are absent from the normalized field;
- damage is tracked per **attestation**, not globally per spelling;
- if the same spelling occurs once fragmentary and once complete, the complete occurrence remains eligible;
- explanatory commentary must not contaminate the inscription transcription mask;
- exact `X ~ X-A` / `X ~ A-X` relationships are generated only after boundary masking;
- support/type classification must distinguish ordinary syllabic words from logograms, ligatures, and complex signs before morphology generation;
- editorial line/face continuation must be reconciled before a segment is admitted as a free word;
- a surviving exact string relationship is still only a **formal candidate** until lexical identity, context, onomastics, and scribal factors are audited.

The validated v0.3 regression gate currently removes **19/19** known damage-created/insecure relationships while retaining **6/6** secure positive controls. See [`experiments/damage-aware-v03.md`](experiments/damage-aware-v03.md).

An important corollary is that the benchmark can be wrong in either direction. The `KU-NI` history demonstrates this twice: normalized HT 79+83 tokenization initially caused the project to promote `KU-NI ~ KU-NI-TE`, but a later comparison against the separate GORILA-derived damage-preserving commentary exposed `]KU-NI[`. The promotion was therefore withdrawn. Frozen experiment outputs remain historical facts; newly discovered source conflicts are registered as forward regression controls rather than silently rewriting past runs.

## Structural/type-aware extraction protocol (v0.4)

v0.4 extends damage awareness into **source and token type**. Before a normalized spelling can participate in a morphology pair, the pipeline now checks whether the attestation is actually eligible to be treated as a Linear A syllabic free word.

The structural mask recognizes:

- physical fragment boundaries;
- explicit cross-line / cross-face lexical continuation marked by leading or trailing hyphens;
- complex signs or ligatures typed in a source table's **logogram** column, including normalized flattenings such as `MA+RU ME {*561}` → apparent `MA-RU-ME`;
- rows explicitly typed as Hieroglyphic (for example `H:`) so cross-script seal material does not enter the Linear A free-word pool;
- versioned authoritative source corrections when the pinned exploratory source lacks a later or more precise reading.

Rules:

1. exclusions are counted per inscription/form attestation, never as global spelling bans;
2. overlapping structural reasons do not cause the same occurrence to be excluded twice;
3. authoritative overrides must be epigraphic/source corrections, not semantic interpretations;
4. lexical-class and onomastic concerns are stored as **warnings**, not hidden extraction exclusions;
5. a structurally retained pair remains only a formal candidate until common lexical identity and contextual equivalence are audited.

The frozen v0.4 run passed its **then-registered** gate: 26/26 exclusion controls removed and 11/11 retention controls retained. A later source-consistency audit showed that one retention control (`KU-NI`) had itself been mislabeled as secure and exposed three additional source failures outside the frozen gate. The historical PASS is preserved, but v0.4 is not treated as source-complete; the new controls are registered for v0.5. See [`experiments/structural-aware-v04.md`](experiments/structural-aware-v04.md).

A useful consequence is that corpus preprocessing is now itself benchmarked: the extractor must reproduce known failures such as cross-face `JA-SA`, complex/logographic `MA-RU-ME`, and authoritative-boundary `PU2-RE` without being told which affix is being tested.

### Source-representation precedence

Normalized item pages and flattened word indexes are discovery aids, not final authorities on physical word boundaries. When they conflict with an inscription-oriented transcription that preserves brackets, continuation marks, or separated fragments, the **damage-preserving representation controls boundary security**.

The QE/SU/WI screen exposed three v0.4 misses:

- HT 73 `SA-RO-QE[`: lost right-boundary damage;
- KN Zb 35 `]JA[ ]DI-[ ]WI[`: separated damaged segments flattened into one word;
- HT 79 [+] 83 `]KU-NI[`: normalized tokenization overstated a complete base.

These do not retroactively alter the frozen v0.4 ranking. They are preregistered in `data/v05-regression-backlog.csv` for the next source-consistency pipeline.

**Rule:** never repair a damaged boundary from normalized tokenization alone, and never join separated damaged segments into a lexical word unless the specialist edition explicitly licenses that segmentation.

## Source-consistent extraction protocol (v0.5)

v0.5 promotes **source representation consistency** to an explicit pre-ranking requirement while leaving v0.4 scoring unchanged. It adds three generic controls discovered by the QE/SU/WI hostile audit:

1. **combined-ID reconciliation:** inscription identifiers embedded in source headings such as `HT 79 [+] 83` are normalized to corpus-style IDs such as `HT79+83`;
2. **multi-table inscription scanning:** every table explicitly structured as inscription data is boundary-scanned, not only the first table on a commentary page;
3. **segmented-fragment flattening:** several independently broken sign groups in one source row cannot be concatenated into a normalized lexical word.

The first registered run failed one case (29/30 exclusions, 13/13 retentions) because `SA-RO-QE[` occurs in the second inscription table for HT 62 [+] 73. The parser was generalized to all explicit inscription tables; the final frozen gate passes **30/30 exclusions and 13/13 retentions**.

The corpus effect is 1,285 candidate syllabic occurrences → **938 retained / 347 excluded**, with 672 unique retained forms.

**Rule:** a complete normalized token cannot override a higher-fidelity source that preserves damage, object composition, or independent fragment segmentation. Source reconciliation happens before exact-pair generation.

See [`experiments/source-consistent-v05.md`](experiments/source-consistent-v05.md) and [`results/source-consistent-v0.5/REGRESSION.md`](results/source-consistent-v0.5/REGRESSION.md).

### Post-v0.5 hostile-audit source controls

The MI/PA/SA comparative audit exposed two further cases where normalized retained tokens disagree with the damage-preserving source:

- ARKH1b normalized `JA-RE` versus ARKH 1 commentary `]PA-RE`;
- HT70 normalized `QA-*118-SA` versus commentary `]QA-*118-SA`.

The first is stronger than a lost bracket: the normalized representation changes the first sign as well as the boundary state. These cases are registered in `data/v06-regression-backlog.csv`. Frozen v0.5 output remains historical; future extraction must treat source-level sign-reading divergence and fragment state as jointly authoritative over normalized word tokens.

### String-decomposition ambiguity

A structurally secure exact pair can still be a false morphological decomposition. The RA audit supplies the control: automatic `SA-RA ~ SA-RA-RA` is formally valid, but HT30 itself contains `SA-RA₂` and Younger's commentary proposes `SA-RA₂` and `SA-RA-RA` may be the same form. A stronger inscription-internal alternation therefore supersedes the mechanical `base + suffix` segmentation.

This is a **promotion-stage** control, not an automatic v0.4 exclusion. Competing decompositions must be adjudicated from the inscription, palaeography, editorial conventions, and context; the extractor should not guess which lexical analysis is correct.

## Statistical calibration after discovery

Statistical support is treated as a **separate evidence dimension**, not folded retroactively into frozen discovery scores. Statistical calibration v0.1 uses two edge-label permutation nulls after source masking and explicit forward exclusions:

- **N1:** type-level edge signs are permuted within word length while residual stems and the observed base lexicon remain fixed;
- **N2:** unique site/form records are permuted within site + word-length strata, again fixing residual stems and the observed base lexicon.

For each target the project reports both a target-specific empirical tail probability and a conservative **max-sign** probability based on the largest exact-pair count achieved by any sign in each permutation. This directly addresses the multiple-search problem inherent in computational discovery.

The first run finds no max-sign-significant internal target among `A-`, `I-`, `-JA`, and `-TI`. Consequently, internal pair counts are discovery evidence, not stand-alone confirmation. Manual epigraphic survival and independent replication remain distinct.

A separate exact combinatorial null is used for the Davis experiment because Davis's six targets were supplied independently after the project's v0.2 ranking was frozen. Under uniform target placement, the primary 3/6 cutoff overlap has `p ≈ 0.0002606`. The later universe-matched result remains explicitly post-unblinding.

**Rule:** never use an internally optimized null, target set, cutoff, or segmentation chosen after seeing the outcome as confirmatory evidence. Preserve preregistered and post-unblinding analyses as separate classes.

See [`experiments/statistical-calibration-v01.md`](experiments/statistical-calibration-v01.md) and [`results/statistical-calibration-v0.1/`](results/statistical-calibration-v0.1/).

## Separate morphology evidence dimensions

The v0.3 audit also showed that one composite “morphology score” obscures different kinds of evidence. The project therefore reports at least these dimensions separately:

### Boundary distribution

How strongly is a sign concentrated at a left or right word edge relative to internal positions?

A raw enrichment ratio is descriptive, not a calibrated probability. Very rare signs with zero internal attestations can rank artificially high; frequency/support should be modeled separately in later versions rather than silently folded into the frozen v0.3 statistic.

### Damage-aware paradigmatic evidence

How many complete `X ~ A-X` or `X ~ X-A` relationships survive boundary masking?

This dimension is especially informative for `A-`, `I-`, `-TI`, and the additional candidate `-JA`.

### Lexical-class concentration

Does the sign occur disproportionately in likely personal names, place names, ritual formulae, administrative headings, or commodity/transaction vocabulary?

This is essential for interpreting signals such as `-RE`, `-RO`, and `-TE`.

### Contextual role equivalence

Where a base and extended form both exist, do they occupy comparable administrative or syntactic positions?

A formal pair is stronger when its contexts independently support common lexical identity.

These dimensions may eventually support a calibrated model, but they are not collapsed into one score until their statistical behavior is better understood.

## Segmentation and source-coverage controls

The final `JA` audit exposed two false-positive classes beyond physical fragment brackets.

### Cross-face / editorial continuation

A normalized token is not automatically a word. An apparent form may be only one part of a sequence explicitly continued across faces, lines, or object surfaces.

Example: IO Za 12 exposes `JA-SA` in the cleaned word layer, but the inscription commentary states that the two faces divide one longer form `JA-SA-|SA-RA-ME`. Such a token cannot serve as a bare stem in an exact-pair test.

**Rule:** before promotion, check whether an apparent word is explicitly continued by the edition, repeated as part of a longer formula, or segmented editorially for layout rather than lexical reasons.

### Authoritative source-coverage gaps

A parser can only preserve damage information present in its input source. A newer editio princeps or specialist edition may contain fragment traces absent from an exploratory HTML corpus.

Example: the exploratory record allowed `PU2-RE` on PK Za 28, but the 2022 editio princeps reads `]-PU2-RE` and cites ZA Zb 34 as `]PU2-RE-JA`. The apparent exact pair is therefore invalid.

**Rule:** candidate promotion requires checking the most authoritative/recent available reading, especially for items whose exploratory transcription is placeholder, incomplete, or postdates the frozen upstream dataset.

These are separate from the v0.3 physical-boundary mask and should become dedicated v0.4 regression classes.

## Functional-assignment controls

Once a morphological element survives formal audit, its **function is a separate hypothesis** and must be tested across independent stems.

A grammatical/semantic function should not be promoted from one visually striking pair. The current minimum standard is:

1. predefine the observable contextual contrast being tested;
2. recover the same base→extended contrast in at least **two independent Tier-A/B families**;
3. require inscriptional/documentary evidence rather than an etymological gloss alone;
4. test explicit counterexamples where bare and extended forms occupy the same proposed role;
5. separate archaeological document function from linguistic word function;
6. treat computational labels such as sender/recipient as secondary analytical evidence unless independently justified epigraphically;
7. report a failed functional test without downgrading the underlying morphology unless the morphology itself is contradicted.

The completed `JA` contextual-function experiment is the current model. It recovered no repeated coarse role change across four families and therefore rejects simple `JA` assignments such as recipient, sender/source, receipt/roundel, sealed-document, or commodity-association marker. See [`experiments/ja-context-function-test.md`](experiments/ja-context-function-test.md).

## Kober-grid protocol

The current phase explicitly follows a Kober-style principle: **discover recurring internal structure before assigning language or meaning**.

For a proposed paradigm grid:

1. freeze the exact sign-level stem before semantic comparison;
2. list every complete attested form that contains the stem at a plausible word boundary;
3. record prefixes and suffixes without converting them into phonemes or grammatical labels;
4. prefer same-tablet contrasts, then same-scribe contrasts, then cross-scribe/site replication;
5. search for the same proposed affix on at least one independent stem;
6. construct matched controls of similar sign length/frequency;
7. only after the formal grid survives, test whether endings correlate with administrative role, geography, personnel, commodities, or other context;
8. only after that stage compare external languages.

A suffix is called **productive** only when the same sign-level extension is securely attached to at least two independent bases, unless an externally anchored paradigm supplies equivalent evidence.

Current example: `PA-SE/PA-SE-JA` plus `KU-PA/KU-PA-JA` is stronger evidence for productive `-JA` morphology than a raw frequency count of words ending in `JA`.

## Toponymic controls

Place names are especially valuable because a stem can sometimes be identified independently of the undeciphered language.

A toponym may enter the primary test only if its geographic identity is supported before the target morphology is scored, for example by secure Linear B continuity or strong specialist consensus.

The completed geographic experiment is recorded in [`experiments/toponym-kober-grid.md`](experiments/toponym-kober-grid.md). Its primary anchors include Sybrita (`SU-KI-RI-TA`) and Phaistos (`PA-I-TO`).

Toponymic endings known from Linear B are controls for what a real geographic paradigm looks like; they are **not** projected onto Linear A as Greek morphology.

## Evidence weighting

### Tier A — strong

- secure word boundaries;
- same stem attested in multiple forms;
- same-scribe contrast and/or cross-scribe replication;
- equivalent syntactic/administrative context;
- no undocumented sign substitutions required.

### Tier B — useful but incomplete

- secure forms and plausible stem relationship;
- contexts differ somewhat or scribe is unknown;
- external Linear B parallel strengthens identity but not grammatical function.

### Tier C — exploratory

- phonetic resemblance without a controlled paradigm;
- isolated or genre-mismatched forms;
- proposed relationship depends on reconstructed sound changes.

### Rejected

A lead is rejected when a stronger control provides a simpler explanation: scribal practice, substring contamination, word-boundary error, fragmentary reading, different lexical identity, or overfitted etymology.

## Corpus protocol

For every morphological candidate record:

| Field | Required |
|---|---|
| Inscription | yes |
| Site | yes |
| Object type | yes |
| Scribe | where available |
| Raw segmented word | yes |
| Boundary/damage state | yes |
| Preceding word/sign group | where preserved |
| Following word/sign group | where preserved |
| Following numeral | yes/no/value |
| Logogram/commodity context | where identifiable |
| Administrative role | only if explicitly marked as derived analysis |
| Source/version | yes |

## Linear B comparisons

Linear B is used primarily for:

- positive controls on sign-value continuity;
- known Minoan/pre-Greek names preserved in Mycenaean documents;
- testing whether internal Linear A stems survive into later onomastics;
- independently anchoring place names for controlled geographic morphology tests.

A Linear B resemblance does **not** establish a Linear A translation. Greek morphological adaptation must be separated from inherited stem material.

## External-language / contact-layer tests

A proposed relationship to Sanskrit/Old Indo-Aryan, Hurrian, Anatolian, Semitic, Greek, Etruscan/Tyrsenian, or any other external language must use the same anti-overfitting standard as internal morphology.

Minimum requirements for a sparse contact-layer claim:

- more than isolated two-sign/short phonetic resemblances;
- a coherent semantic cluster or recurrent morphology;
- a positive-control corpus where the method can recover a known contact layer;
- matched negative/null controls;
- predeclared matching rules;
- held-out or otherwise non-targeted confirmation where practical.

The completed Mitanni Indo-Aryan pilot is recorded in [`experiments/mitanni-indo-aryan-pilot.md`](experiments/mitanni-indo-aryan-pilot.md). Its failure to show enrichment is treated as a negative result, not as a reason to loosen the matching rules.

## Computational safeguards

String similarity and AI-generated matches are treated as candidate generators only. They cannot by themselves support a linguistic claim.

Particularly dangerous operations include:

- unrestricted Levenshtein matching against desired external words;
- allowing arbitrary internal sign substitutions;
- treating analytical subword nodes as inscriptional words;
- pooling scribes/sites without checking orthographic variation;
- selecting only positive matches after inspecting the target;
- counting a substring match as though it were an independently segmented word;
- using conventional Linear-B-derived readings as if they were exact Minoan phonetic transcriptions;
- generating morphology pairs from cleaned words before restoring damaged boundary information;
- globally blacklisting a spelling because one attestation of it is damaged.
- admitting explicitly cross-script (e.g. Hieroglyphic) sign groups into the Linear A free-word morphology pool;
- treating a complex/logographic source entry as an ordinary syllabic word because a normalized corpus flattened its notation;
- treating editorial continuation across a line or object face as an independent word boundary.
- flattening complex logograms or ligatures into hyphenated syllabic-looking strings and then treating them as ordinary words;
- treating a line or face break as a word boundary when the edition explicitly continues the same lexical item across the break.

Where practical, tests should include negative controls, predeclared scoring rules, a versioned regression set, and a written pre-registration or experiment record in `experiments/`.

## Versioning

The initial exploration used `mwenge/lineara.xyz` at commit:

`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`

The frozen v0.1/v0.2 analyses remain preserved as historical results. v0.3 is the frozen damage-aware pipeline; v0.4 is the separately versioned structural/type-aware discovery substrate. Neither later version retroactively alters the pre-registered Davis comparison score.

Any later rerun should record the upstream commit and note changed readings or classifications.

## Standard for changing a conclusion

A lead should be downgraded immediately if:

- a specialist publication already explains the pattern more parsimoniously;
- a raw transcription contradicts a derived data layer;
- scribal attribution accounts for the alternation;
- an apparent word is only a substring;
- additional attestations violate the proposed grammatical distribution;
- a matched null/control set produces the same signal;
- an apparent paradigm splits into personal-name, place-name, or unrelated lexical families under contextual checking.

A previous rejection should likewise be **withdrawn** if better epigraphic evidence demonstrates that the rejection was based on an incomplete or misgeneralized reading.

The desired outcome is not to preserve hypotheses. It is to preserve **auditability**.

## Grid-search stop rule

Three registered combinatorial searches now constrain paradigm claims. The bare-stem matrix found no repeated two-stem ending set; the sibling-ending search found one formal rectangle but hostile audit rejected it; allowing terminal depths of one and two signs produced no additional rectangle. Therefore increasingly permissive segmentation is not an acceptable way to manufacture a paradigm. Future grid work requires genuinely new evidence or an independently encoded corpus. Statistical calibration precedes any further semantic interpretation.
