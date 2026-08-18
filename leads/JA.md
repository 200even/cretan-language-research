# Lead: productive final `-JA`

**Status:** strong productive-morphology result; full seven-pair audit and four-family contextual-function test completed; grammatical/semantic function remains unknown.

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

## New Tier-B families

### `A-SE ~ A-SE-JA`

`A-SE` is complete on multiple Haghia Triada tablets and at Zakros; `A-SE-JA` is complete on HT 115a. The relationship is real at sign level, but `A-SE` is only two signs and its proposed place-name role is not independently anchored.

### `*306-TU ~ *306-TU-JA`

`*306-TU` recurs in Haghia Triada account/personnel-style lists; `*306-TU-JA` is complete on HT 115b. The family is strong formally but may belong to personal-name/designation morphology. No phonetic value is assigned to `*306`.

## Contextual-function test

The completed experiment [`../experiments/ja-context-function-test.md`](../experiments/ja-context-function-test.md) tested whether adding `JA` predicts the **same observable documentary or transaction-role change across at least two independent Tier-A/B families**.

It does not.

### Family outcomes

| family | coarse contextual result |
|---|---|
| `PA-SE ~ PA-SE-JA` | apparent tablet → roundel/receipt-label shift, but not categorical because damaged tablet `]PA-SE-JA` also exists |
| `KU-PA ~ KU-PA-JA` | **role preservation**: both behave as administrative participant/recipient-like entries |
| `A-SE ~ A-SE-JA` | **role preservation**: both behave as administrative recipient/designation-like entries |
| `*306-TU ~ *306-TU-JA` | possible model-dependent recipient → sender contrast, but not independently established and not replicated |

The registered promotion criterion therefore fails.

The test specifically rejects simple assignments of `JA` as a marker for:

- recipient;
- sender/source;
- roundel/receipt;
- sealed document;
- commodity association.

The key control is that both `KU-PA` and `A-SE` occur in essentially the same coarse administrative slot with and without final `JA`.

Machine-readable context matrix: [`../data/ja-context-function-matrix.csv`](../data/ja-context-function-matrix.csv).

### Interpretation

This negative result **does not weaken the productive-morphology claim**. It narrows the search space.

The current evidence is compatible with:

- derivational morphology that preserves the broad administrative slot;
- agreement/inflection conditioned by syntax not visible in coarse tablet layout;
- onomastic/designation morphology in some lexical classes;
- multifunctional `JA`;
- a clitic-like element whose trigger is not document type or simple transaction role.

“Relational/derivational” may be used as a working search hypothesis, but not as an established grammatical label.

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

The next informative `JA` experiment should move from coarse document roles to **micro-syntax**.

Priority design:

1. encode immediate left/right neighbors of every secure base and `JA` form;
2. distinguish transaction signs from commodity logograms and numerals;
3. match each `JA` form to non-`JA` recipient/designation entries from the same tablets/scribes where possible;
4. test whether `JA` predicts a recurring neighboring-sign construction even when the broad role is unchanged;
5. keep roundels separate from tablet syntax;
6. require replication across at least two independent families before assigning function.

This is now a much sharper question than asking what `JA` “means” globally.

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
