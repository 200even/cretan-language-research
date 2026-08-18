# Final `JA`: contextual-function test

**Status:** completed.  
**Input families:** Tier A `PA-SE ~ PA-SE-JA`, `KU-PA ~ KU-PA-JA`; Tier B `A-SE ~ A-SE-JA`, `*306-TU ~ *306-TU-JA`.  
**Result:** **no repeatable contextual role shift recovered.**  
**Semantic/grammatical function:** still unknown.

## Question

The preceding morphology audit established that final `JA` is productive in at least two independent Linear A administrative families. This experiment asks the next, harder question:

> Does adding `JA` predict the same observable change in documentary or administrative role across at least two independent stems?

The test deliberately avoids external etymology and does not assign meanings to the roots.

## Promotion criterion frozen for this test

A functional hypothesis may be promoted only if:

1. the same base → `JA` contextual contrast occurs in **at least two independent Tier-A/B families**;
2. the contrast is visible in inscriptional/documentary features rather than being supplied only by a translation guess;
3. there is no strong counterexample in which a base and its `JA` form occupy the supposedly contrastive role;
4. site, scribe, support type, and lexical-class differences do not provide a simpler explanation.

A one-family pattern is treated as hypothesis generation only.

## Observable features

The machine-readable evidence matrix is [`../data/ja-context-function-matrix.csv`](../data/ja-context-function-matrix.csv).

The primary coding uses features that can be observed without decipherment:

- support type: tablet, roundel, nodulus;
- document class where independently classified archaeologically: mixed commodities, single commodity, people/personnel-style, sealed administration;
- sign-group position: entry label, sole/primary roundel inscription, numbered list item;
- association with a commodity/logogram;
- association with a number/fraction/seal-impression count.

A secondary column records the `sender`/`recipient` labels in the pinned upstream transaction-analysis layer. Those labels are **derived interpretations**, not primary evidence. They are used only as a consistency check and never to establish a grammatical function by themselves.

## Family 1: `PA-SE ~ PA-SE-JA`

### Bare form

`PA-SE` is a strong administrative designation on at least two Haghia Triada tablets:

- HT 18: it controls multiple commodity/quantity entries, including `GRA+QE 20`, `OLE+KI 2`, and `*304 3`;
- HT 27b: it heads a second commodity/account section with `VIN+WA`, `SA`, `RE`, and associated quantities.

The pinned derived transaction layer classifies `PA-SE` as a recipient in both HT 18 and HT 27b.

### `JA` form

The two secure complete `PA-SE-JA` attestations are HT Wc 3001 and 3002, roundels with respectively three and two seal impressions. Hallager's administrative model, followed by later museum/reference summaries, treats Minoan roundels as receipts or end-stage transactional documents.

This creates a conspicuous documentary contrast:

```text
PA-SE      -> tablet administrative designation
PA-SE-JA   -> roundel inscription / receipt label
```

However, that contrast is not clean enough to define the suffix:

- damaged HT 93a preserves `]PA-SE-JA` on a tablet, showing that the extended sequence is not intrinsically limited to roundels;
- the lexical role of the sign-group written on a roundel is not independently known;
- the roundel itself, rather than the suffix, could condition the written form.

**Family result:** apparent role shift, but one-family only and not categorical.

## Family 2: `KU-PA ~ KU-PA-JA`

### Bare form

Bare `KU-PA` occurs in ordinary administration:

- HT 110a: complete `KU-PA 1` in a mixed-commodity tablet;
- ZA 11a/b: repeated `KU-PA` before `GRA+PA` and quantities in an outgoing/disbursement account.

Younger's ZA 11 commentary notes that Schoep had considered `KU-PA` possibly a transaction term. The pinned transaction-analysis layer instead places the ZA 11 `KU-PA` entries in the same recipient-like slot as neighboring designations. Either way, it is an administrative participant/transaction term rather than a commodity logogram.

The GORILA-derived concordance also records complete `KU-PA` on HT We 1020a, an inscribed sealed document. Thus the bare form itself is not restricted to tablets.

### `JA` form

HT 116a places `KU-PA-JA` immediately before `GRA 16` among comparable commodity-account entries. The derived transaction layer classifies `KU-PA-JA` as a recipient.

The coarse comparison is therefore:

```text
KU-PA      -> administrative participant/entry label
KU-PA-JA   -> administrative participant/entry label
```

**Family result:** role preservation, not role shift.

This is a direct counterexample to any simple hypothesis that `JA` means "recipient," because bare `KU-PA` can occupy the same recipient-like position. It also argues against `JA` as a marker of sealed documents or receipts, because bare `KU-PA` occurs on HT We 1020a while `KU-PA-JA` occurs on a tablet.

## Family 3: `A-SE ~ A-SE-JA`

Bare `A-SE` repeatedly occupies entry-label positions in Haghia Triada accounts:

- HT 93a: before transaction/commodity notation and quantity 26;
- HT 132: before `*319 5`;
- HT 81: a further complete base in a damaged account context.

The pinned transaction layer classifies the HT 132 `A-SE` as recipient-like.

HT 115a places `A-SE-JA` among a series of recipient/list entries in a single-commodity account, and the same derived model classifies it as a recipient.

Thus:

```text
A-SE      -> administrative recipient/designation-like entry
A-SE-JA   -> administrative recipient/designation-like entry
```

**Family result:** role preservation, not role shift.

This independently reproduces the `KU-PA` result.

## Family 4: `*306-TU ~ *306-TU-JA`

Bare `*306-TU` occurs as a numbered entry in HT 9 and in the personnel/people-style HT 119 list. The derived transaction layer classifies the HT 119 occurrence as a recipient and treats the implied commodity as people/men.

HT 115b has complete `*306-TU-JA 1`. The derived transaction model classifies this occurrence as a sender in a transaction involving sign `I`.

This produces a possible role contrast, but it is not safe to interpret as grammar:

- the raw contexts do not independently establish `recipient` versus `sender` as linguistic cases;
- HT 119 is already suspected to contain names/designations;
- the contrast does not match the `PA-SE` support-type contrast;
- `KU-PA` and `A-SE` show role preservation instead.

**Family result:** possible model-dependent role shift, not replicated.

## Results against simple functional hypotheses

| hypothesis | prediction | result |
|---|---|---|
| `JA` marks recipient | `JA` forms should occupy recipient role while bases do not | **fails**: bare `PA-SE`, `KU-PA`, and `A-SE` are recipient-like in the same derived model |
| `JA` marks sender/source | `JA` forms should consistently occupy sender/source role | **fails**: `KU-PA-JA` and `A-SE-JA` are recipient-like |
| `JA` marks roundel/receipt form | extended forms should be restricted to sealed/receipt documents | **fails**: `KU-PA-JA`, `A-SE-JA`, and `*306-TU-JA` are tablet forms; bare `KU-PA` also occurs on an inscribed sealed document |
| `JA` marks commodity association | extended forms should have a distinct relation to commodities/numbers | **fails**: both bare and extended forms occur as labels/designations associated with commodities and quantities |
| `JA` causes a single observable role shift | the same base→extended contrast should recur in ≥2 families | **fails the registered promotion criterion** |

## Main result

> **The contextual-function test is negative: adding final `JA` does not predict a single repeatable coarse documentary or transaction-role change across the four audited families.**

This does **not** weaken the morphological result. It narrows what kind of morphology is plausible.

The data are inconsistent with treating `JA` as a simple marker for:

- recipient;
- sender/source;
- roundel/receipt;
- sealed document;
- commodity association.

## What remains plausible

The surviving evidence is compatible with several possibilities that this test cannot distinguish:

1. **derivational morphology** that changes lexical subclass or relation while leaving the word in the same broad administrative slot;
2. **agreement/inflection** triggered by a syntactic relation not recoverable from coarse tablet layout;
3. **onomastic or designation morphology** in some lexical classes, especially `*306-TU`;
4. **multifunctional `JA`**, where formally identical final material has more than one grammatical use;
5. a clitic-like element whose conditioning factor is not represented by support type or simple word order.

The phrase "relational/derivational" may be used as a **working search hypothesis**, but not as an established gloss.

## Why the negative result matters

A tempting route after finding a productive ending is to infer its meaning from the most visually striking pair. Here that would have been `PA-SE` on tablets versus `PA-SE-JA` on roundels.

The independent `KU-PA` and `A-SE` controls prevent that overinterpretation. Both show the bare and `JA` forms occupying essentially the same administrative slot. The four-family design therefore does exactly what a Kober-style control is supposed to do: it blocks a semantic assignment that does not generalize.

## Archaeological control on roundels

Erik Hallager's *The Minoan Roundel and Other Sealed Documents in the Neopalatial Linear A Administration* (1996) argues that the roundel functioned as a receipt in local administration. Museum/reference summaries repeat that interpretation. This archaeological function is useful for coding HT Wc 3001-3002 as a distinct documentary context, but it does not establish the linguistic function of `PA-SE-JA`.

## Secondary transaction-model control

The pinned upstream transaction-analysis layer is useful because it applies one explicit model consistently across tablets:

- `PA-SE` (HT 18, HT 27b): recipient;
- `KU-PA` (ZA 11): recipient;
- `KU-PA-JA` (HT 116a): recipient;
- `A-SE` (HT 132): recipient;
- `A-SE-JA` (HT 115a): recipient;
- `*306-TU` (HT 119): recipient;
- `*306-TU-JA` (HT 115b): sender.

This secondary model therefore also fails to produce one `JA` role. Because the labels are analytical rather than epigraphic facts, the project does not use them to prove case or syntax.

## Next experiment

The next `JA` experiment should move **within**, rather than between, these broad roles.

The highest-value question is:

> Do `JA` forms differ from their bases in the local micro-syntax of transaction signs, commodity types, numerals, or neighboring words even when both are coarse recipient/designation entries?

A useful next design is a matched-context analysis:

1. encode the immediate left/right neighbors of every secure `PA-SE`, `KU-PA`, `A-SE`, `*306-TU` and `JA` form;
2. encode transaction signs separately from commodity logograms;
3. compare with matched non-`JA` recipient/designation words from the same tablets and scribes;
4. test whether `JA` predicts a specific neighboring sign class or transaction construction;
5. keep roundels as a separate documentary stratum rather than mixing them with tablet syntax.

Until such a micro-context pattern replicates, the grammatical function remains **unknown**.

## Sources / provenance

Primary corpus evidence is the pinned `mwenge/lineara.xyz` commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`, especially GORILA-derived records/commentary for HT 18, HT 27, HT 93, HT 110, HT 115, HT 116, HT 119, HT 132, HT Wc 3001-3002, and ZA 11.

Secondary analytical controls use the pinned `network/transactions/final/*.js` layer and are explicitly marked as derived.

Administrative-document control:

- Erik Hallager, *The Minoan Roundel and Other Sealed Documents in the Neopalatial Linear A Administration*, Aegaeum 14, 1996.
- Ilse Schoep, *The Administration of Neopalatial Crete: A Critical Assessment of the Linear A Tablets and Their Role in the Administrative Process*, 2002.
