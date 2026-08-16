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
- testing whether internal Linear A stems survive into later onomastics.

A Linear B resemblance does **not** establish a Linear A translation. Greek morphological adaptation must be separated from inherited stem material.

## Computational safeguards

String similarity and AI-generated matches are treated as candidate generators only. They cannot by themselves support a linguistic claim.

Particularly dangerous operations include:

- unrestricted Levenshtein matching against desired Greek words;
- allowing arbitrary internal sign substitutions;
- treating analytical subword nodes as inscriptional words;
- pooling scribes/sites without checking orthographic variation;
- selecting only positive matches after inspecting the target.

Where practical, future tests should include negative controls and predeclared scoring rules.

## Versioning

The initial exploration used `mwenge/lineara.xyz` at commit:

`43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`

Any later rerun should record the upstream commit and note changed readings or classifications.

## Standard for changing a conclusion

A lead should be downgraded immediately if:

- a specialist publication already explains the pattern more parsimoniously;
- a raw transcription contradicts a derived data layer;
- scribal attribution accounts for the alternation;
- an apparent word is only a substring;
- additional attestations violate the proposed grammatical distribution.

The desired outcome is not to preserve hypotheses. It is to preserve **auditability**.