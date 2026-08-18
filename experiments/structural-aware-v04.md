# Structural-aware morphology v0.4

**Status:** registered before first v0.4 corpus ranking.  
**Upstream corpus:** `mwenge/lineara.xyz` pinned at `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**Predecessor:** [`damage-aware-v03.md`](damage-aware-v03.md).

## Research question

v0.3 demonstrated that physical damage must be restored before exact morphology pairs are generated. Subsequent manual audits exposed additional false-positive classes that v0.3 cannot represent:

1. **editorial / cross-line / cross-face continuation** mistaken for a free word;
2. **complex-sign or logogram flattening** converted into a hyphenated syllabic-looking string;
3. **authoritative-source corrections** absent from the pinned exploratory corpus;
4. **lexical-class / onomastic confounds** that do not invalidate the signs but weaken common-lexeme inference.

v0.4 asks:

> Can those structural/source failure classes be represented before paradigm generation while retaining known secure morphology controls?

The primary goal is corpus/type control. v0.4 does **not** attempt to infer the meaning of an affix.

## Frozen acceptance gate

Before looking at v0.4 rankings, the regression set is frozen in [`../data/v04-regression-set.csv`](../data/v04-regression-set.csv).

It includes:

- all v0.3 damage negatives;
- all v0.3 strong secure positives;
- new cross-face continuation controls from the `JA` and `ME` audits;
- the `HT 24a` complex/logographic `MA+RU ME {*561}` control;
- authoritative-source correction for the `PU2-RE ~ PU2-RE-JA` false pair;
- additional `NE` damaged-base controls;
- secure `JA`, `NE`, `KU-NI`, and `ME` formal controls to detect over-filtering.

**Success criterion:** every frozen exclusion must cease to be an accepted exact pair, and every frozen retention control must remain accepted.

No candidate ranking may be used to change this gate after the first run.

## Data layers

v0.4 keeps four evidence layers distinct.

### 1. Normalized corpus index

The upstream `LinearAInscriptions.js` word list remains a convenient search/index layer. It is never treated as authoritative for word completeness or sign type by itself.

### 2. Structural exclusion mask

A new extractor scans the GORILA-derived commentary/transcription layer for:

- physical fragment boundaries;
- trailing/leading hyphens that explicitly continue one lexical item across a line, face, or editorial block;
- entries in a table column explicitly labeled `logogram`, especially complex `+` forms that a normalized corpus may flatten into syllabic-looking strings.

The extractor records exclusion **counts by inscription/form**, not global spelling bans.

### 3. Authoritative source overrides

[`../data/v04-source-overrides.csv`](../data/v04-source-overrides.csv) records corrections that cannot be inferred from the pinned upstream source because the necessary reading is absent or superseded there.

Overrides are epigraphic/source corrections only. They are not semantic guesses.

### 4. Lexical warnings

[`../data/v04-lexical-warnings.csv`](../data/v04-lexical-warnings.csv) records known onomastic/designation or lexical-identity risks.

Warnings are reported separately and **do not remove a structurally secure pair from the automatic ranking**. This prevents a manually curated semantic judgment from being smuggled into extraction.

## Frozen statistical dimensions

To isolate the effect of better extraction, v0.4 preserves the v0.3 distinction between:

1. raw boundary enrichment on retained complete syllabic words;
2. exact paradigmatic relationships after structural/source exclusion.

No new composite affix score is introduced in v0.4.

The known low-frequency instability of raw boundary enrichment remains documented rather than repaired post hoc in this experiment.

## Expected falsifiers

v0.4 fails if any of the following occurs:

- a frozen cross-face fragment remains an accepted free-word paradigm;
- `MA-RU ~ MA-RU-ME` remains accepted despite `MA+RU ME {*561}` being explicitly typed as a logogram/complex sign in the source table;
- the authoritative `PU2-RE` source correction does not suppress that false exact pair;
- any strong secure positive control is lost;
- an implementation hard-codes an affix identity or target ranking rather than applying generic structural rules plus the versioned source-override layer.

## Outputs

The workflow will persist:

- `structural-mask.csv`
- `secure-word-occurrences.csv`
- `excluded-word-occurrences.csv`
- `exact-pairs.csv`
- `boundary-ranking.csv`
- `paradigm-ranking.csv`
- `regression-results.csv`
- `REGRESSION.md`
- `README.md`
- `PROVENANCE.md`

under `results/structural-aware-v0.4/`.

## Interpretation rule

A surviving v0.4 exact pair is still only a **formal candidate**. Context, scribe, lexical identity, onomastics, and specialist editions remain promotion requirements.

The experiment is successful if it improves the candidate substrate without erasing known positives. It need not make any particular suffix rank first.
