# Final `JA`: broader list/frame test

**Status:** completed.  
**Input:** the four audited Tier-A/B `JA` families plus same-tablet `JA` controls.  
**Primary result:** **no general `JA`-specific list/frame relation recovered.**  
**Grammatical function:** unknown.

## Why move outward?

The preceding `JA` experiments found:

1. productive morphology survives inscription-level audit;
2. no repeated coarse sender/recipient/document-role shift;
3. no repeated immediate-neighbor micro-syntactic shift.

A remaining possibility was that `JA` might encode a **broader hierarchical relation** visible only at the level of an account section, list frame, sender/head construction, shared commodity scope, or document closure.

This experiment tests that possibility without assigning meanings to the lexical roots.

## Registered promotion rule

A list/frame hypothesis may be promoted only if:

1. the same base → `JA` hierarchy/frame contrast appears in at least two independent Tier-A/B families;
2. bare-form controls do not already occur in the proposed `JA` frame;
3. same-tablet `JA` controls do not occupy opposite hierarchical positions;
4. document support or account type does not explain the pattern more simply.

## Data

Machine-readable matrix: [`../data/ja-list-frame-matrix.csv`](../data/ja-list-frame-matrix.csv).  
Summary: [`../data/ja-list-frame-summary.csv`](../data/ja-list-frame-summary.csv).

The primary features are:

- explicit lexical frame/head before the target;
- target as higher-level head versus dependent list entry;
- inherited/shared commodity scope;
- standalone document statement versus embedded account entry;
- same-document `JA` controls.

Derived sender/recipient labels remain secondary.

## Hypothesis 1: `JA` marks dependence under an explicit lexical head

This initially looked promising.

Two `JA` forms occur in visibly headed administrative frames:

```text
HT 116a: U-TA-RO ... KU-PA-JA GRA 16
HT 115a: *301-U-RA ... A-SE-JA [quantity]
```

That gives two independent families in which a `JA` form is subordinate to a lexical account head.

But the bare controls defeat the hypothesis:

```text
ZA 11b: E-TO-RI ... KU-PA • GRA+PA 3
HT 9a: SA-RO ... *306-TU 10
HT 9b: KA-*305 ... *306-TU 8
HT 122a: ]RA-RI ... *306-TU 1
```

Bare forms can therefore occupy the same broader dependent-under-head relation.

**Result:** rejected as a general `JA` function.

## Hypothesis 2: `JA` marks subordinate list-entry status

This also fails internally.

`KU-PA-JA` and `A-SE-JA` are dependent/list entries, but final `JA` also occurs in higher-level roles:

- HT 115a `*47-NU-RA-JA` is modeled as a sender/head while `A-SE-JA` on the same tablet is a recipient/list entry;
- HT 115b `*306-TU-JA` is modeled as sender while `TI-NU-JA` on the same tablet is recipient;
- `PA-SE-JA` is the principal/sole lexical statement on roundels rather than a subordinate tablet entry.

**Result:** rejected.

## Hypothesis 3: `JA` marks sender/head status

The inverse hypothesis is equally incompatible with the controls:

- `KU-PA-JA` is recipient-like/dependent on HT 116a;
- `A-SE-JA` is recipient-like/dependent on HT 115a;
- `TI-NU-JA` is recipient-like on HT 115b.

**Result:** rejected.

## Hypothesis 4: `JA` marks participation in a shared commodity/account scope

Many `JA` tablet forms sit inside account frames where a commodity or transaction relation is inherited from a higher-level line.

But bare forms do too:

- `KU-PA` on HT 110a inherits `CYP+E` account context;
- bare `KU-PA` on ZA 11 participates in the same sort of framed disbursement structure;
- bare `*306-TU` occurs repeatedly inside VIN or people/personnel allocation lists;
- bare `A-SE` is an ordinary account entry.

**Result:** rejected.

## Hypothesis 5: `JA` marks receipt/closure/standalone-document form

`PA-SE ~ PA-SE-JA` remains visually striking:

```text
PA-SE     — ordinary tablet administration
PA-SE-JA  — principal statement on roundels
```

But this is not repeated by another family, and several secure `JA` forms occur on tablets.

**Result:** unreplicated family-specific clue, not a general function.

## Same-tablet controls

These remain the strongest protection against overinterpreting account hierarchy.

### HT 115a

Final `JA` occurs in both:

- a higher-level sender/head-like form: `*47-NU-RA-JA`;
- a dependent recipient/list entry: `A-SE-JA`.

### HT 115b

Final `JA` again occurs in opposite modeled roles:

- `TI-NU-JA` — recipient;
- `*306-TU-JA` — sender.

Thus even within one physical document, final `JA` does not uniquely encode one hierarchy level.

## Registered result

> **No broader list/frame relation is uniquely and repeatedly licensed by final `JA` across the four audited families.**

The test rejects simple generalizations of `JA` as:

- dependent-under-head marker;
- subordinate list-entry marker;
- sender/head marker;
- shared commodity-scope marker;
- receipt/closure marker.

## Interpretation

Three successive functional screens are now negative:

1. coarse documentary/transaction role;
2. immediate micro-syntax;
3. broader list/account hierarchy.

This pattern strengthens the case that the effect of `JA`, if it is one morpheme across these families, is **not directly recoverable from simple administrative layout**.

Possibilities still compatible with the evidence include:

- derivation that changes lexical class or reference rather than position;
- agreement with a category not transparently written next to the word;
- a relational/oblique category whose semantics cut across sender/recipient hierarchy;
- onomastic/designation morphology in part of the corpus;
- multiple homographic `JA` morphemes;
- discourse or non-local syntactic conditioning not captured by these small texts.

None is promoted.

## Stop rule for `JA`

At this point the project should **not continue inventing progressively subtler `JA` functions from the same four families**.

Further `JA` work should require genuinely new evidence, such as:

- an independently anchored lexical identity;
- a new same-tablet base/extended contrast;
- an external positive control with a secure function;
- a larger syntax corpus that provides multiple repeated clauses/frames rather than isolated account entries.

Until such evidence appears, the stable conclusion is:

> **productive final `JA` morphology is supported; grammatical function is unresolved.**

## Provenance

Primary computational/inscriptional source for this experiment is `mwenge/lineara.xyz` pinned at commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`, checked against the existing inscription-level `JA` audit and context matrices in this repository.
