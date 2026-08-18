# Structural-aware morphology v0.4

**Status:** completed; frozen regression gate passed.  
**Registered:** before the first v0.4 corpus ranking.  
**Upstream corpus:** `mwenge/lineara.xyz` pinned at `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.  
**Predecessor:** [`damage-aware-v03.md`](damage-aware-v03.md).  
**Generated results:** [`../results/structural-aware-v0.4/`](../results/structural-aware-v0.4/).

## Post-v0.4 source-consistency erratum (2026-08-18)

v0.4 **passed the regression gate that was frozen before its ranking**, and that historical PASS is preserved. Later hostile audit of the tied `QE`, `SU`, and `WI` candidates nevertheless found source representations not covered by that gate:

- HT 73 preserves `SA-RO-QE[`, not a securely final `SA-RO-QE`;
- KN Zb 35 preserves separated damaged segments `]JA[ ]DI-[ ]WI[`, not one complete `JA-DI-WI` word;
- the damage-preserving HT 79 [+] 83 commentary gives `]KU-NI[`, contradicting normalized tokenization that had made `KU-NI` a v0.4 retention control.

Thus the statement “26/26 negatives excluded; 11/11 retention controls retained” remains true **of the frozen benchmark/run**, but one of those retention labels is no longer considered epigraphically correct and the benchmark was incomplete. The new failures are frozen forward in `data/v05-regression-backlog.csv`. v0.4 is therefore the latest historical discovery run, not the final source-consistent extractor.

## Research question

v0.3 demonstrated that physical damage must be restored before exact morphology pairs are generated. Subsequent manual audits exposed additional false-positive classes that v0.3 could not represent:

1. **editorial / cross-line / cross-face continuation** mistaken for a free word;
2. **complex-sign or logogram flattening** converted into a hyphenated syllabic-looking string;
3. **authoritative-source corrections** absent from the pinned exploratory corpus;
4. **cross-script/type contamination**, such as a Hieroglyphic seal impression entering the Linear A word pool;
5. **lexical-class / onomastic confounds** that do not invalidate the signs but weaken common-lexeme inference.

v0.4 asked:

> Can those structural/source failure classes be represented before paradigm generation while retaining known secure morphology controls?

The primary goal was corpus/type control. v0.4 does **not** attempt to infer the meaning of an affix.

## Frozen acceptance gate

Before looking at v0.4 rankings, the regression set was frozen in [`../data/v04-regression-set.csv`](../data/v04-regression-set.csv).

It includes:

- all v0.3 damage negatives;
- all v0.3 strong secure positives;
- new cross-face continuation controls from the `JA` and `ME` audits;
- the `HT 24a` complex/logographic `MA+RU ME {*561}` control;
- authoritative-source correction for the `PU2-RE ~ PU2-RE-JA` false pair;
- additional `NE` damaged-base controls;
- then-adjudicated `JA`, `NE`, `KU-NI`, and `ME` retention controls to detect over-filtering (the `KU-NI` label was later withdrawn; see erratum above).

**Success criterion:** every frozen exclusion must cease to be an accepted exact pair, and every frozen retention control must remain accepted.

No candidate ranking was used to change this gate after the first run.

## Result: PASS

The first validated run passes the expanded gate:

> **26/26 frozen structural/source negatives excluded; 11/11 secure controls retained.**

See [`../results/structural-aware-v0.4/REGRESSION.md`](../results/structural-aware-v0.4/REGRESSION.md).

The frozen run retained all then-registered positive controls. Later audit withdrew the `KU-NI ~ KU-NI-TE` control because the damage-preserving source gives `]KU-NI[`; the other frozen results remain historical outputs.

## Data layers

v0.4 keeps four evidence layers distinct.

### 1. Normalized corpus index

The upstream `LinearAInscriptions.js` word list remains a convenient search/index layer. It is never treated as authoritative for word completeness or sign type by itself.

### 2. Structural exclusion mask

[`../scripts/build-structural-mask-v04.mjs`](../scripts/build-structural-mask-v04.mjs) scans the GORILA-derived commentary/transcription layer for:

- physical fragment boundaries;
- trailing/leading hyphens that explicitly continue one lexical item across a line, face, or editorial block;
- entries in a table column explicitly labeled `logogram`, especially complex `+` forms that a normalized corpus may flatten into syllabic-looking strings;
- statement rows explicitly typed as Hieroglyphic (`H:`), which are excluded from the Linear A free-word pool.

The extractor records exclusion **counts by inscription/form**, not global spelling bans.

### 3. Authoritative source overrides

[`../data/v04-source-overrides.csv`](../data/v04-source-overrides.csv) records corrections that cannot be inferred from the pinned upstream source because the necessary reading is absent or superseded there.

Overrides are epigraphic/source corrections only. They are not semantic guesses.

### 4. Lexical warnings

[`../data/v04-lexical-warnings.csv`](../data/v04-lexical-warnings.csv) records known onomastic/designation or lexical-identity risks.

Warnings are reported separately and **do not remove a structurally secure pair from the automatic ranking**. This prevents a manually curated semantic judgment from being smuggled into extraction.

## Corpus effect

v0.4 starts from the same **1,285** candidate syllabic occurrences as v0.3.

After structural/type/source masking:

- **951** occurrences are retained;
- **334** are excluded;
- **681** unique retained forms remain.

v0.3 retained 970 occurrences and 696 unique forms, so v0.4 removes **19 additional occurrences and 15 additional normalized forms** after adding the new structural/type controls.

The generated exclusion evidence includes:

| evidence class | flagged occurrences |
|---|---:|
| physical boundary | 315 |
| editorial continuation | 9 |
| complex logogram/type | 8 |
| non-Linear-A / cross-script | 2 |
| authoritative source boundary | 2 |

These evidence counts can overlap on one attestation; the actual number of excluded corpus occurrences is 334.

## Exact-paradigm consequences

The most important validation is that v0.4 automatically reproduces several conclusions that previously required manual audit.

### `JA`

v0.3 generated seven damage-secure apparent pairs. v0.4 retains **five** structural pairs:

- `PA-SE ~ PA-SE-JA`
- `A-SE ~ A-SE-JA`
- `*306-TU ~ *306-TU-JA` — lexical warning
- `KU-PA ~ KU-PA-JA`
- `A-MA ~ A-MA-JA`

The two manually rejected false pairs are now removed automatically:

- `JA-SA ~ JA-SA-JA` — cross-face continuation plus Hieroglyphic/cross-script contamination;
- `PU2-RE ~ PU2-RE-JA` — authoritative-source boundary correction.

Thus the automatic substrate now agrees much more closely with the completed manual `JA` audit. `A-MA ~ A-MA-JA` still requires manual downgrade to comparison-only because structural extraction cannot by itself establish common lexical identity.

### `ME`

v0.3 retained four apparent pairs. v0.4 retains only:

- `A-RA-TU ~ A-RA-TU-ME`.

It automatically removes:

- `JA-SA-SA-RA ~ JA-SA-SA-RA-ME` — cross-face continuation;
- `SA-RA ~ SA-RA-ME` — cross-face/cross-script contamination;
- `MA-RU ~ MA-RU-ME` — complex/logogram flattening.

This matches the completed manual `ME` audit exactly at the structural level.

### `NE`

v0.4 retains two structurally secure strings:

- `*21F-TU ~ *21F-TU-NE`;
- `PA-RA ~ PA-RA-NE` — explicitly flagged with an onomastic warning.

The two damaged-base candidates remain excluded:

- `QE-TU ~ QE-TU-NE`;
- `PA-TA ~ PA-TA-NE`.

This separation is intentional: extraction can establish structural security, while the lexical-warning layer records why `PA-RA ~ PA-RA-NE` is not promoted as evidence for productive `NE`.

## v0.4 ranking snapshot

The top suffixes by **structurally secure exact pairs** are:

| rank | sign | secure exact pairs | warned pairs | structurally excluded |
|---:|---|---:|---:|---:|
| 1 | `JA` | **5** | 1 | 3 |
| 2 | `TI` | **3** | 0 | 2 |
| 3 | `RA` | **3** | 0 | 3 |
| 4 | `TE` | **3** | 0 | 3 |
| 5 | `QE` | 2 | 0 | 0 |
| 6 | `SU` | 2 | 0 | 0 |
| 7 | `WI` | 2 | 0 | 0 |
| 11 | `NE` | 2 | 1 | 2 |
| 12 | `RO` | 2 | 1 | 2 |
| 30 | `ME` | 1 | 0 | 5 |
| 31 | `RE` | 1 | 1 | 5 |

This is a candidate-generation ranking, not a probability of affixhood.

The Davis prefixes remain highly visible paradigmatically:

- `A-`: **#1**, six secure pairs;
- `I-`: **#3**, four secure pairs.

## Boundary enrichment remains separate

To isolate extraction changes, v0.4 preserves the frozen v0.3 raw enrichment statistic.

`RO` remains #1 by suffix boundary enrichment, while `JA` does not appear among the top raw-enrichment signs despite leading the structural exact-paradigm ranking. This reinforces the established conclusion that edge concentration and paradigmatic alternation are distinct dimensions.

The known low-frequency instability of the raw enrichment ranking remains a documented limitation rather than being retuned after inspection.

## New type-control result: Hieroglyphic contamination

During implementation, before the first v0.4 ranking, the `JA-SA` regression case exposed another generic source-type problem. SAM Wa 1 is explicitly a **Hieroglyphic seal impression** (`H:` in the source table), but its sign groups had entered the normalized Linear A word pool.

v0.4 therefore excludes table statement rows explicitly marked `H:` from Linear A free-word morphology. This is a type rule, not a `JA-SA` special case.

## Interpretation

v0.4 succeeds at its intended task:

> **The discovery substrate now removes known physical-damage, editorial-continuation, complex-logogram, cross-script, and authoritative-source false positives while preserving every frozen secure control.**

A surviving v0.4 exact pair remains only a **formal candidate**. Context, scribe, lexical identity, onomastics, and specialist editions remain promotion requirements.

## Next registered work

The highest-priority new non-Davis suffix candidate is now final `RA`, with three structurally secure automatic pairs and no current lexical warnings in the v0.4 layer:

- `SA-RA ~ SA-RA-RA`
- `A-DA ~ A-DA-RA`
- `MI-DA ~ MI-DA-RA`

These must be audited from the inscriptions before any productivity claim is made.

After `RA`, the clean two-pair candidates `QE`, `SU`, and `WI` are better comparative targets than returning to `ME` or further semantic drilling on `JA`.

A future statistical version should separately address the low-frequency instability of raw boundary enrichment; that is intentionally outside the frozen v0.4 extraction experiment.
