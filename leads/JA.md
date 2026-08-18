# Lead: productive final `-JA`

**Status:** strong productive-morphology result; full seven-pair audit, contextual-function test, and literal micro-syntax test completed; grammatical/semantic function remains unknown.

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

## Contextual-function test

The completed experiment [`../experiments/ja-context-function-test.md`](../experiments/ja-context-function-test.md) tested whether adding `JA` predicts the **same observable documentary or transaction-role change across at least two independent Tier-A/B families**.

It does not.

| family | coarse contextual result |
|---|---|
| `PA-SE ~ PA-SE-JA` | apparent tablet → roundel/receipt-label shift, but not categorical |
| `KU-PA ~ KU-PA-JA` | **role preservation**: both behave as administrative participant/recipient-like entries |
| `A-SE ~ A-SE-JA` | **role preservation**: both behave as administrative recipient/designation-like entries |
| `*306-TU ~ *306-TU-JA` | possible model-dependent recipient → sender contrast, not replicated |

The test rejects simple assignments of `JA` as a marker for recipient, sender/source, roundel/receipt, sealed document, or commodity association.

Machine-readable context matrix: [`../data/ja-context-function-matrix.csv`](../data/ja-context-function-matrix.csv).

## Micro-syntax test

The next registered experiment, [`../experiments/ja-micro-syntax.md`](../experiments/ja-micro-syntax.md), moved below the coarse sender/recipient level and encoded the literal local sequence around 19 secure attestations:

- divider/separator;
- transaction/special sign;
- commodity/logogram;
- numeral/fraction;
- inherited list/section context.

The promotion criterion required the **same literal base → `JA` construction shift in at least two independent families**.

### Result

> **0/4 Tier-A/B families show a replicated `JA`-specific micro-syntactic shift.**

No single right-neighbor construction is unique to or repeatedly produced by `JA`.

The clearest literal control is `*306-TU`:

```text
HT 9a:   *306-TU    > 10
HT 9b:   *306-TU    > 8
HT 119:  *306-TU    > 2
HT 122a: *306-TU    > 1
HT 115b: *306-TU-JA > 1
```

The local written construction is preserved even though the upstream derived transaction model labels the bare forms recipient-like and the HT 115b `JA` form sender-like. That model-level contrast therefore cannot be treated as a visible grammatical consequence of `JA`.

Two same-tablet controls are also important:

- HT 115a: `*47-NU-RA-JA` is modeled as sender while `A-SE-JA` is modeled as recipient;
- HT 115b: `TI-NU-JA` is modeled as recipient while `*306-TU-JA` is modeled as sender.

Thus final `JA` is not consistently tied to one transaction role even on the same document.

Evidence matrix: [`../data/ja-micro-syntax-matrix.csv`](../data/ja-micro-syntax-matrix.csv).  
Summary: [`../data/ja-micro-syntax-summary.csv`](../data/ja-micro-syntax-summary.csv).

### Interpretation

This second negative functional result still does **not** weaken the productive-morphology claim. It shows that the function is not recoverable from the current coarse roles or immediate-neighbor features.

The surviving search space includes:

- derivational morphology whose effect is lexical rather than positional;
- agreement/inflection conditioned by a non-local relation;
- oblique/relational morphology not equivalent to the derived sender/recipient labels;
- onomastic/designation morphology in some families;
- multiple functions or homographic `JA` elements;
- a construction visible only in broader list/clause structure.

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

## Pre-registered geographic test

The experiment in [`../experiments/toponym-kober-grid.md`](../experiments/toponym-kober-grid.md) failed the narrow geographic-function promotion criterion.

Do **not** gloss final `JA` as:

- “from”;
- genitive;
- ablative;
- ethnic adjective;
- toponymic adjective.

What survives is productive final morphology, function unknown.

## Next test

The immediate-neighbor level is now exhausted without a replicated function. The next `JA` work should move outward to **broader structural frames** while auditing `ME` in parallel:

1. encode section headings and repeated list frames around each secure `JA` family;
2. match `JA` forms to non-`JA` designations on the same tablet and, where possible, same scribe;
3. test lexical-class concentration: place/institution, person/designation, transaction participant, or other category;
4. keep roundel syntax separate from tablet list syntax;
5. use Sybrita only as a positive control for relational/derivational formation, not as a gloss for `JA` alone;
6. audit the v0.3 `ME` families so the project does not overfit indefinitely around one suffix;
7. require replication across at least two independent families before any functional assignment.

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
