# Lead: productive final `-JA`

**Status:** strong productive-morphology result; full seven-pair audit plus three registered functional tests completed; grammatical/semantic function remains unknown.

## Current claim

Linear A contains at least two Tier-A and two Tier-B formal families in which final `JA` is added to an otherwise identical sign group:

| Base | Extended form | Current tier | Assessment |
|---|---|---:|---|
| `PA-SE` | `PA-SE-JA` | A | multiple complete base and extended attestations; tablet/roundel distribution |
| `KU-PA` | `KU-PA-JA` | A | strong administrative convergence; replicated base across sites |
| `A-SE` | `A-SE-JA` | B | multiple complete bases plus administrative extended form; lexical function unresolved |
| `*306-TU` | `*306-TU-JA` | B | repeated complete base and complete extended form; probable onomastic/derivational concentration |

The conservative structural conclusion is:

> **Final `JA` behaves as a productive morphological element in at least some Linear A vocabulary.**

This does not establish whether it is inflectional, derivational, clitic, onomastic, or multifunctional.

## Full v0.3 candidate audit

Damage-aware v0.3 automatically ranked `JA` #1 among suffixes by exact-paradigm count and generated seven apparently secure `X ~ X-JA` candidates. Direct audit resolves them as:

| pair | result |
|---|---|
| `PA-SE ~ PA-SE-JA` | Tier A |
| `KU-PA ~ KU-PA-JA` | Tier A |
| `A-SE ~ A-SE-JA` | Tier B |
| `*306-TU ~ *306-TU-JA` | Tier B / onomastic risk |
| `A-MA ~ A-MA-JA` | Tier C / comparison-only |
| `JA-SA ~ JA-SA-JA` | rejected: cross-face continuation / ritual abbreviation |
| `PU2-RE ~ PU2-RE-JA` | rejected: authoritative fragment boundaries |

Thus **4/7** survive as credible Tier-A/B morphology candidates, while only the original two controls currently meet the strongest benchmark standard.

Full audit: [`../audits/JA.md`](../audits/JA.md).  
Machine-readable summary: [`../data/ja-audit-summary.csv`](../data/ja-audit-summary.csv).

## Why the two Tier-A pairs matter

### `PA-SE ~ PA-SE-JA`

`PA-SE` is complete on Haghia Triada tablets HT 18 and HT 27b. `PA-SE-JA` is complete on roundels HT Wc 3001-3002, with an additional damaged tablet attestation on HT 93. The support-type difference prevents a grammatical gloss but makes simple string coincidence unlikely.

### `KU-PA ~ KU-PA-JA`

`KU-PA` is complete in Haghia Triada and Zakros administrative material. `KU-PA-JA` is complete on HT 116a immediately before grain notation in a commodity account. This is the best ordinary-administrative convergence in the family.

The `KU-PA` family here uses ordinary `PA` and must not be conflated with the distinct `KU-PA3-...` onomastic family.

## Tier-B families

### `A-SE ~ A-SE-JA`

`A-SE` is complete on multiple Haghia Triada tablets and at Zakros; `A-SE-JA` is complete on HT 115a. The relationship is real at sign level, but `A-SE` is only two signs and its proposed place-name role is not independently anchored.

### `*306-TU ~ *306-TU-JA`

`*306-TU` recurs in Haghia Triada account/personnel-style lists; `*306-TU-JA` is complete on HT 115b. The family is strong formally but may belong to personal-name/designation morphology. No phonetic value is assigned to `*306`.

## Functional tests

Three increasingly fine/broad registered tests have now failed to recover a repeatable grammatical function.

### 1. Coarse contextual-function test

[`../experiments/ja-context-function-test.md`](../experiments/ja-context-function-test.md) asked whether adding `JA` produces the same sender/recipient/document-role shift across at least two independent families.

It does not.

- `KU-PA/KU-PA-JA` preserves the same recipient/designation-like role.
- `A-SE/A-SE-JA` independently preserves the same role.
- the `PA-SE` tablet/roundel contrast is one-family only.
- the `*306-TU` modeled recipient→sender contrast is not replicated.

Simple assignments such as recipient, sender/source, receipt/roundel, sealed-document, or commodity-association marker are rejected.

### 2. Literal micro-syntax test

[`../experiments/ja-micro-syntax.md`](../experiments/ja-micro-syntax.md) encoded the immediate written neighborhood around 19 secure attestations.

Registered result:

> **0/4 Tier-A/B families show a replicated `JA`-specific local construction shift.**

The clearest control is `*306-TU`:

```text
HT 9a:   *306-TU    > 10
HT 9b:   *306-TU    > 8
HT 119:  *306-TU    > 2
HT 122a: *306-TU    > 1
HT 115b: *306-TU-JA > 1
```

The literal pattern is unchanged despite a different sender/recipient label in the secondary transaction model.

### 3. Broader list/frame test

[`../experiments/ja-list-frame-test.md`](../experiments/ja-list-frame-test.md) moved outward to account hierarchy, explicit lexical heads, inherited commodity scope, and standalone versus embedded statements.

One pattern initially looked promising:

```text
U-TA-RO ... KU-PA-JA
*301-U-RA ... A-SE-JA
```

Both `JA` forms occur in explicitly headed frames.

But bare-form controls defeat the idea that `JA` creates that relation:

```text
E-TO-RI ... KU-PA
SA-RO ... *306-TU
KA-*305 ... *306-TU
]RA-RI ... *306-TU
```

Bare forms can occupy the same dependent-under-head relation.

Same-tablet controls are even stronger:

- HT 115a contains `*47-NU-RA-JA` as sender/head-like and `A-SE-JA` as recipient/dependent;
- HT 115b contains `TI-NU-JA` as recipient and `*306-TU-JA` as sender.

Registered result:

> **No general `JA`-specific list/frame relation is recovered.**

Matrix: [`../data/ja-list-frame-matrix.csv`](../data/ja-list-frame-matrix.csv).  
Summary: [`../data/ja-list-frame-summary.csv`](../data/ja-list-frame-summary.csv).

## Interpretation after three negative functional tests

These negative results do **not** weaken the productive-morphology claim. They constrain what kind of function remains plausible.

Current evidence does not support a simple function tied directly to:

- sender;
- recipient;
- source;
- list-entry hierarchy;
- lexical-head dependency;
- commodity scope;
- receipt/roundel support;
- one fixed immediate-neighbor construction.

Possibilities still compatible with the evidence include:

- derivational morphology whose effect is lexical rather than positional;
- agreement/inflection conditioned by a category not recoverable from the surviving layout;
- relational/oblique morphology cutting across transaction roles;
- onomastic/designation morphology in some families;
- multiple functions or homographic `JA` elements;
- discourse or non-local syntax requiring a larger corpus than these short accounts provide.

None is established.

## Two false positives exposed by the audit

### `JA-SA ~ JA-SA-JA`

IO Za 12 explicitly breaks a single longer ritual form across two faces as `JA-SA- | -SA-RA-ME`. The apparent `JA-SA` token is therefore not a secure free word. KN Zg 55 `JA-SA-JA` has also been interpreted as an abbreviation of the same `JA-SA-SA-RA...` family.

This exposes a failure mode not addressed by physical-damage masking: **editorial/cross-face segmentation can create an apparent morphological base.**

### `PU2-RE ~ PU2-RE-JA`

The 2022 editio princeps of PK Za 28 reads the supposed base as `]-PU2-RE`, and cites ZA Zb 34 as `]PU2-RE-JA`. Both relevant left boundaries are therefore insecure for a whole-word paradigm.

This exposes a second failure mode: **a parser cannot restore damage information absent from its exploratory source layer.**

## Geographic positive control: Sybrita

The separately anchored comparison remains:

- `SU-KI-RI-TA` on PH Wa 32;
- `SU-KI-RI-TE-I-JA` on HT Zb 158b.

The longer form is widely treated as an adjectival/origin derivative of Sybrita, but the transformation is `-TA -> -TE-I-JA`, not simple addition of `JA`.

Therefore the Sybrita evidence does not license assigning “from/of” specifically to final `JA`.

## Stop rule

The current four-family dataset has now been tested at three functional resolutions without a replicated result. The project should **stop generating progressively subtler semantic hypotheses from the same evidence**.

Further `JA` functional work should require genuinely new information, such as:

1. a new same-tablet base/extended contrast;
2. an independently anchored lexical identity;
3. a larger repeated clause/list corpus;
4. an external positive control with secure grammatical function;
5. a specialist reanalysis that supplies a new testable structural prediction.

Until then, the stable conclusion is:

> **productive final `JA` morphology is supported; its grammatical function remains unresolved.**

## Comparative priority

The project should now compare `JA` against other endings under the same audit framework rather than continue overfitting one suffix. The completed `ME` audit is the first contrast and shows a very different profile: `ME` falls from four automatic v0.3 pairs to only one Tier-B survivor after source/layout/type audit.

See [`ME.md`](ME.md).

## Sources / provenance

- GORILA-derived upstream records for Haghia Triada, Zakros, Khania, Malia, Iouktas, Samothrace, and Knossos.
- Maurizio Del Freo, Julien Zurbach & Carl Knappett, “A Fragment of a Libation Table Inscribed in Linear A from Petsophas, Palaikastro (PK Za 28),” in *Megistos Kouros* (2022).
- Michael Wengler, `mwenge/lineara.xyz`, pinned exploratory corpus and explicitly secondary transaction-analysis layer.
- Erik Hallager, *The Minoan Roundel and Other Sealed Documents in the Neopalatial Linear A Administration* (1996), for the archaeological interpretation of roundels as receipts.
- Mnamon and Heraklion Archaeological Museum for the Sybrita geographic derivative.
- Brent Davis, *The Undeciphered Aegean Scripts* (2026), for the broader statistical morphology framework.

## Evidence tier

**Tier A:** `PA-SE/PA-SE-JA`, `KU-PA/KU-PA-JA`.  
**Tier B:** `A-SE/A-SE-JA`, `*306-TU/*306-TU-JA`.  
**No semantic tier assigned.**
