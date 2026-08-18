# Final `JA`: micro-syntax test

**Status:** completed.  
**Input families:** Tier A `PA-SE ~ PA-SE-JA`, `KU-PA ~ KU-PA-JA`; Tier B `A-SE ~ A-SE-JA`, `*306-TU ~ *306-TU-JA`.  
**Primary result:** **no replicated `JA`-specific local construction recovered.**  
**Grammatical function:** unknown.

## Why this test exists

The preceding contextual-function experiment showed that adding final `JA` does not produce one repeatable coarse documentary or sender/recipient role shift. That result left open the possibility that the conditioning factor is visible at a finer level of the written syntax.

This experiment therefore asks:

> Does final `JA` predict a repeatable literal neighboring construction — divider, transaction sign, logogram/commodity, or numeral — across at least two independent morphological families?

The test is deliberately non-semantic. It does not assume that any root is a noun, name, place, recipient, sender, or transaction term.

## Frozen promotion criterion

A micro-syntactic function may be promoted only if:

1. the same base → `JA` literal-construction shift appears in at least **two independent Tier-A/B families**;
2. the shift is visible in the written sequence itself, not only in a derived sender/recipient classification;
3. same-document controls do not place other `JA`-ending words in the opposite proposed role;
4. support type, shared section headings, inherited commodity labels, and document layout do not provide a simpler explanation.

A one-family pattern is hypothesis generation only.

## Data

The full attestation matrix is [`../data/ja-micro-syntax-matrix.csv`](../data/ja-micro-syntax-matrix.csv). It includes 19 secure attestations or secure-form comparison rows across the four families.

The coding distinguishes:

- **literal pattern**: what is physically/transcriptionally adjacent to the target sign group;
- **section context**: commodity or account information inherited from a larger list/header;
- **derived role**: sender/recipient labels from the pinned upstream transaction-analysis layer.

Derived roles are secondary evidence. The primary test is the literal sequence.

## Family 1: `PA-SE ~ PA-SE-JA`

### Bare form

Two secure Haghia Triada tablet contexts differ even before `JA` is considered:

```text
HT 18:   PA-SE > GRA+QE > 20 ...
HT 27b:  PA-SE > divider > VIN+WA > divider > SA > 4 ...
```

Thus the base itself does not occupy one invariant local construction.

### `JA` form

The two complete `PA-SE-JA` forms occur on roundels:

```text
HT Wc 3001: PA-SE-JA as principal statement; separate-face J; 3 impressions
HT Wc 3002: PA-SE-JA as sole lexical statement; 2 impressions
```

This is a real support-type contrast but not a tablet micro-syntactic paradigm. A damaged tablet attestation `]PA-SE-JA` elsewhere already prevents treating the extended form as intrinsically roundel-only.

**Result:** family-specific documentary contrast; not replicated by another stem.

## Family 2: `KU-PA ~ KU-PA-JA`

Bare `KU-PA` occurs in several distinct constructions:

```text
HT 110a:   KU-PA > 1                 [commodity inherited from section]
ZA 11a:    KU-PA > divider > GRA+PA > 1
ZA 11b:    KU-PA > divider > GRA+PA > 3
HT We1020: *304+PA > KU-PA > end     [sealed document]
```

The `JA` form is:

```text
HT 116a: KU-PA-JA > GRA > 16
```

The broad administrative slot is preserved, but there is no unique literal construction associated with `JA`. Bare `KU-PA` itself appears with a directly inherited commodity, with an explicit commodity after a divider, and on a sealed document.

**Result:** no replicated `JA`-specific local shift.

## Family 3: `A-SE ~ A-SE-JA`

Bare `A-SE` also has heterogeneous local syntax:

```text
HT 81:   A-SE > *900 > MI+JA+RU > *900 > fraction
HT 93a:  A-SE > *900 > I+GRA+PA > 26 > 3/4
HT 132:  A-SE > *904 > 5
ZA Zb 3: ... > A-SE > end of first statement/list
```

The `JA` form on HT 115a is locally:

```text
A-SE-JA > quantity
```

with commodity and sender information inherited from the single-commodity account structure.

This superficially resembles some bare `LEX > NUM` constructions elsewhere in the corpus, but not a repeated **base → JA** shift shared with another family.

**Result:** broad role preservation; no unique local syntax licensed by `JA`.

## Family 4: `*306-TU ~ *306-TU-JA`

This family is the clearest literal control.

Every audited bare administrative occurrence has the same immediate shape:

```text
HT 9a:   *306-TU > 10
HT 9b:   *306-TU > 8
HT 119:  *306-TU > 2
HT 122a: *306-TU > 1
```

The extended form is:

```text
HT 115b: *306-TU-JA > 1
```

So the literal micro-syntax is **preserved**, not changed.

This is especially important because the upstream transaction model labels bare `*306-TU` occurrences as recipient-like while labeling `*306-TU-JA` on HT 115b as sender. The written local sequence does not reproduce that difference.

**Result:** exact local-pattern preservation is a counterexample to treating the derived sender/recipient contrast as direct evidence for the grammatical function of `JA`.

## Same-tablet `JA` controls

Two tablets supply strong internal controls against a universal participant-role gloss.

### HT 115a

The upstream transaction model assigns:

- `*47-NU-RA-JA` — sender;
- `A-SE-JA` — recipient.

Thus two words ending in `JA` on the same tablet occupy opposite derived transaction roles.

### HT 115b

The same model assigns:

- `TI-NU-JA` — recipient;
- `*306-TU-JA` — sender.

Again, final `JA` occurs in opposite roles on the same document.

These controls do not prove that every final `JA` is the same morpheme, but they strongly reject a simple universal equation such as `JA = recipient case` or `JA = sender/source case`.

## Results

Machine-readable summary: [`../data/ja-micro-syntax-summary.csv`](../data/ja-micro-syntax-summary.csv).

| test | result |
|---|---|
| same base→`JA` literal shift in ≥2 families | **fails** |
| one recurring right-neighbor construction unique to `JA` forms | **fails** |
| `JA` = recipient | **fails same-family and same-tablet controls** |
| `JA` = sender/source | **fails same-family and same-tablet controls** |
| `JA` = sealed-document/receipt marker | **fails** |
| derived sender/recipient contrast mirrored in literal syntax | **fails for `*306-TU`** |

Registered outcome:

> **0/4 Tier-A/B families show a replicated `JA`-specific micro-syntactic shift.**

## Interpretation

This result does **not** weaken the evidence that final `JA` is productive morphology. It places a stronger limit on what can currently be said about its function.

The present data do not support a simple locally visible function tied to:

- sender;
- recipient;
- source;
- receipt/roundel support;
- sealed administration;
- one fixed commodity/numeral construction.

Several possibilities remain compatible with the evidence:

1. **derivational morphology** whose effect is lexical rather than positional;
2. **agreement** with a category not recoverable from local written order;
3. an **oblique/relational inflection** whose syntactic role is not equivalent to the derived sender/recipient labels;
4. **onomastic/designation morphology** in some families;
5. **multiple functions or homographic `JA` elements**;
6. a non-local construction requiring broader clause/list structure rather than immediate neighbors.

None is promoted here.

## Methodological result

The experiment establishes a useful hierarchy of evidence for undeciphered-script morphology:

```text
exact string paradigm
    < damage/source audit
    < coarse contextual role
    < literal micro-syntax
    < replicated grammatical contrast
```

`JA` has passed the first two stages strongly. It has **not** yet passed the final functional stages.

The same-tablet controls are particularly valuable because they prevent a derived transaction model from silently becoming a grammatical analysis.

## Next step

The next `JA` experiment should move **outward**, not inward:

1. encode broader list/clause frames around each secure family, including headings and repeated section structure;
2. compare each `JA` form to matched non-`JA` designations on the same tablet and by the same scribe;
3. test whether `JA` correlates with lexical class — personal designation, place/institution, commodity-linked participant, or other category — rather than local word order;
4. use the independently anchored Sybrita derivative only as a positive control for relational/derivational morphology, not as a gloss for `JA` alone;
5. audit `ME` in parallel rather than repeatedly tuning a hypothesis around `JA`.

A semantic or grammatical label should still require a replicated contrast across at least two independent morphological families.

## Provenance

Primary data are the pinned `mwenge/lineara.xyz` corpus at commit:

`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`

Relevant source layers include:

- `network/transactions/final/HT18.js`
- `network/transactions/final/HT27b.js`
- `items/HTWc3001.html`
- `items/HTWc3002.html`
- `network/transactions/final/HT110a.js`
- `network/transactions/final/ZA11a.js`
- `network/transactions/final/ZA11b.js`
- `commentary/HTWe1020.html`
- `network/transactions/final/HT116a.js`
- `items/HT81.html`
- `items/HT93a.html`
- `network/transactions/final/HT132.js`
- `items/ZAZb3.html`
- `network/transactions/final/HT115a.js`
- `network/transactions/final/HT9a.js`
- `network/transactions/final/HT9b.js`
- `network/transactions/final/HT119.js`
- `network/transactions/final/HT122a.js`
- `network/transactions/final/HT115b.js`

No external-language comparison is used to score the result.
