# Audit: blind `-RO` suffix signal

**Audit date:** 2026-08-16.  
**Trigger:** `RO` ranked #1 among final signs in both blind affix-ranking v0.1 and the v0.2 obvious-logogram sensitivity run.  
**v0.2 score:** 6.649.  
**Exact pairs generated automatically:** 4.

## Executive result

The raw computational signal is **not sufficient evidence for a productive `-RO` suffix**.

Of the four automatically generated `X ~ X-RO` pairs:

1. `KI-DA ~ KI-DA-RO` — **rejected as an exact pair** because the supposed base is actually fragmentary (`ki-da-[`) in the damage-aware concordance; `KI-DA-RO` also has strong onomastic continuity into Linear B.
2. `DI-NA ~ DI-NA-RO` — **rejected as an exact pair** because the apparent bare `DI-NA` is damaged/fragmentary in the inscriptional evidence even though the upstream `transliteratedWords` layer presents it without brackets.
3. `SA-MA ~ SA-MA-RO` — **reclassified / not currently evidence for generic suffixation** because secure bare `SA-MA` exists, but `SA-MA-RO` occurs in HT 88 among six one-unit entries in a personnel/name-like list and is treated as a Minoan name in onomastic comparisons. Same-string inclusion does not establish one inflectional paradigm.
4. `A-DA ~ A-DA-RO` — **survives as a Tier-B formal candidate**. Both forms are complete and occur in ordinary administrative commodity contexts at different sites. Their common lexical identity and the grammatical function of `RO` remain unproven.

The appropriate conclusion is therefore:

> `RO` is strongly enriched at word endings in the computational corpus, but the four apparent exact extension pairs do **not** establish productive `-RO` morphology. The signal is currently best treated as a mixture of damage-flattening artifacts, likely onomastic material, and one secure formal candidate (`A-DA ~ A-DA-RO`).

This audit is a direct demonstration of why the benchmark layer is necessary: edge statistics can identify a real structural concentration while still overestimating the number of valid morphological paradigms.

## Pair 1: `KI-DA ~ KI-DA-RO`

### Automatic result

The upstream computational representation generated:

`KI-DA ~ KI-DA-RO`

### Epigraphic check

The damage-aware LinA concordance gives the purported base as:

`ki-da-[` — HT 27a.4

not a securely complete `KI-DA` word.

`KI-DA-RO` is securely attested at:

- HT 47a.4;
- HT 117a.9.

The raw upstream record for HT 27a flattens the damaged ending in its `transliteratedWords` field, explaining how the automatic exact-pair detector produced the false minimal pair.

### Onomastic control

Scholarly discussion of Minoan/Mycenaean names compares Linear A `ki-da-ro` with Linear B `ki-da-ro` / `ki-do-ro`. Salgarella also lists `ki-da-ro` among sequences attested in both Linear A and Linear B.

### Adjudication

**Rejected as an exact `X ~ X-RO` benchmark pair.**

Reason: damaged base plus strong onomastic alternative.

This does not imply that the signs `RO` cannot be morphological elsewhere.

## Pair 2: `DI-NA ~ DI-NA-RO`

### Automatic result

`DI-NA ~ DI-NA-RO`

### Epigraphic check

The damage-aware concordance lists the relevant short forms as:

- `] di-na`
- `] di-na [`

rather than a secure complete `DI-NA` word.

`DI-NA-RO` is securely listed at HT 108.2.

The upstream representation can therefore turn a damaged sequence into a false exact bare/extended pair when the bracket/unknown information is omitted from `transliteratedWords`.

### Adjudication

**Rejected as an exact `X ~ X-RO` benchmark pair.**

Reason: bare form is not securely bounded.

## Pair 3: `SA-MA ~ SA-MA-RO`

### Epigraphic status

Unlike the first two examples, the bare form is secure. The concordance lists `SA-MA` at multiple administrative inscriptions, including HT 6b, HT 10a, HT 52a and ZA 10b.

`SA-MA-RO` occurs on HT 88.

### Context control

HT 88 contains a self-balancing list of six one-unit entries followed by `KU-RO 6`. `SA-MA-RO 1` is one of those six entries, alongside forms such as `KU-PA3-PA3`, `KA-JU`, `KU-PA3-NU`, `PA-JA-RE`, and `DA-TA-RE`.

That is compatible with a personal-name/designation interpretation. Independent onomastic resources and published Linear A/Linear B comparisons also treat `SA-MA-RO` as name-like and compare it with later Mycenaean material.

The bare `SA-MA` occurs in broader administrative contexts and is not independently demonstrated to be the same lexeme as the HT 88 name/designation.

### Adjudication

**Reclassified / insufficient for generic `-RO` suffixation.**

Reason: both forms are real, but shared lexical identity is not established and the extended form is strongly compatible with onomastic material.

## Pair 4: `A-DA ~ A-DA-RO`

### Bare form

`A-DA` is securely represented on TY 3a at Tylissos. In the upstream raw record it is followed by `OLE+U 21`, placing it in an administrative oil context.

### Extended form

`A-DA-RO` is securely represented on ARKH 5 at Arkhanes. It precedes the grain logogram `GRA 40`; the same tablet also records another commodity quantity.

The raw sign group itself is complete: `A-DA-RO` is not generated by flattening a damaged boundary.

### Adjudication

**Tier B formal candidate.**

What is established:

- secure `A-DA`;
- secure `A-DA-RO`;
- exact final extension at sign level;
- independent sites;
- ordinary administrative commodity contexts.

What is not established:

- that `A-DA` and `A-DA-RO` are forms of one lexeme rather than independent words/names;
- that `RO` is an inflectional suffix;
- any semantic function for `RO`.

The next useful control is to search specialist onomastic/toponymic literature and Linear B continuity for `A-DA-RO`, then test whether any additional **secure** `X ~ X-RO` pairs survive direct damage-aware checking.

## Consequence for the automatic pipeline

The audit identifies a concrete corpus-engineering failure mode:

> **damage flattening in derived transliteration fields can manufacture exact morphological pairs.**

Future candidate extraction should therefore ingest an explicit boundary/damage mask from raw sign transcriptions or a specialist corpus rather than relying only on the cleaned `transliteratedWords` field.

This should be implemented as a new sensitivity/versioned pipeline. The v0.1/v0.2 results remain frozen and are not retroactively altered.

## Benchmark effect

Add four adjudicated rows:

- `KI-DA ~ KI-DA-RO`: rejected, damaged base / onomastic;
- `DI-NA ~ DI-NA-RO`: rejected, damaged base;
- `SA-MA ~ SA-MA-RO`: reclassified, likely lexical/onomastic mismatch;
- `A-DA ~ A-DA-RO`: Tier B candidate.

The fact that the highest-ranked blind suffix produces **one candidate but no new Tier-A positive after manual audit** is scientifically useful. It provides a hard false-positive challenge for future morphology-discovery methods.

## Sources / provenance

- pinned `mwenge/lineara.xyz` corpus, commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`;
- GORILA-linked raw records for TY 3a and ARKH 5 in the upstream corpus;
- LinA / Ancient Scripts Study damage-aware concordance for `ki-da-[`, `di-na` fragments, `sa-ma`, `sa-ma-ro`, and `a-da-ro`;
- Ester Salgarella, discussion of Linear A / Linear B shared sequences including `ki-da-ro`;
- published contextual/onomastic work on Haghia Triada personnel/name material.

## Current status of `RO`

**Global boundary signal:** strong.  
**Productive suffix status:** unproven.  
**Tier-A exact pairs:** 0 newly established by this audit.  
**Tier-B exact pairs:** 1 (`A-DA ~ A-DA-RO`).  
**Rejected/reclassified automatic exact pairs:** 3.
