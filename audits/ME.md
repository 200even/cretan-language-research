# Audit: final `ME`

**Status:** completed first-pass exact-pair audit.  
**Trigger:** damage-aware v0.3 ranked final `ME` #2 among suffixes by accepted exact-pair count (4 accepted, 2 damage-excluded).  
**Result:** **1/4 automatic damage-secure pairs survives as a credible Tier-B formal morphology candidate.** Three collapse under source/layout/type audit.

## Question

Does final `ME` behave as a productive morphological element across multiple independent Linear A stems once the same controls applied to `JA` and the Davis-six candidates are enforced?

The audit distinguishes:

1. complete sign-level strings;
2. actual lexical segmentation across faces/lines;
3. syllabic words versus complex/logographic notation;
4. lexical/contextual comparability;
5. independent-stem productivity.

A clean string relationship is not enough if the supposed base is only one face of a continued word or the supposed extended word is actually a complex logogram.

## Automatic v0.3 candidates

The damage-aware screen retained four apparent exact pairs:

- `A-RA-TU ~ A-RA-TU-ME`
- `JA-SA-SA-RA ~ JA-SA-SA-RA-ME`
- `MA-RU ~ MA-RU-ME`
- `SA-RA ~ SA-RA-ME`

It independently excluded:

- `A-SA-SA-RA ~ A-SA-SA-RA-ME` — insecure boundaries;
- `I-JA-PA ~ I-JA-PA-ME` — insecure base.

The four retained strings are audited below.

---

## ME-1: `A-RA-TU ~ A-RA-TU-ME`

### Base

ZA 7a preserves complete `A-RA-TU` followed by numeral 4. Younger's inscription commentary describes ZA 7 as a page tablet in a LM IB palace context, although the generated item metadata currently labels the support incorrectly as a stone vessel. The transcription itself is clear:

```text
U-JU 5
A-RA-TU 4
A-RE-TU-MI[
```

### Extended form

HT Wc 3024 is a Haghia Triada roundel with complete `A-RA-TU-ME`. The roundel also carries an `OVISᶠ` logogram and six seal impressions.

### Assessment

The string relationship is secure, but contextual identity is not:

- different sites: Zakros vs Haghia Triada;
- different document supports: tablet vs roundel;
- different immediate administrative framing;
- no same-scribe or same-document contrast;
- lexical class remains unknown.

The pair is therefore useful formal evidence but cannot by itself demonstrate a productive `ME` suffix or a grammatical function.

**Adjudication:** **Tier B candidate.**

---

## ME-2: `JA-SA-SA-RA ~ JA-SA-SA-RA-ME`

### Automatic appearance

v0.3 treated IO Za 16 `JA-SA-SA-RA` as a complete base and compared it with the widely attested ritual form `JA-SA-SA-RA-ME`.

### Direct inscription audit

IO Za 16 explicitly breaks the sequence across two faces:

```text
.a: ... JA-SA-SA-RA-
.b: -ME • U-NA-RU-KA[-NA-SI
```

Younger's commentary reconstructs the two faces together as:

```text
JA-SA-SA-RA-ME
```

The apparent bare `JA-SA-SA-RA` is therefore not an independent lexical word on this object. It is the first face of the same longer form.

### Assessment

This is a **cross-face continuation artifact**, not a base/extended paradigm.

The recurrent ritual form `JA-SA-SA-RA-ME` remains linguistically important, and scholarship has discussed its internal structure, especially initial `A-/JA-` variation. But IO Za 16 cannot support deletion/addition of final `ME`.

**Adjudication:** **rejected as an exact `ME` pair.**

---

## ME-3: `MA-RU ~ MA-RU-ME`

### Base

HT 117a contains complete `MA-RU 1` among the repeated one-unit entries of a personnel/designation-style list. Published contextual study of HT 117 argues that the tablet's one-lists are plausibly populated by personal names or designations; the upstream transaction model likewise treats `MA-RU` as a recipient-like personnel entry.

### Supposed extended form

HT 24a contains three occurrences that the normalized corpus renders as `MA-RU-ME`.

However, direct inspection of Younger's tabulation places them in the **logogram column** as complex notation:

```text
MA+RU ME {*561}
MA+RU ME {*561}
MA+RU ME {*561}[
```

The source therefore does not present an ordinary syllabic word `MA-RU-ME` directly parallel to the syllabic personnel entry `MA-RU`.

The derived transaction layer also classifies the HT 24 forms as commodities rather than participant/name entries.

### Assessment

The normalized computational layer has flattened a complex/logographic notation into a hyphenated syllabic-looking string. Treating that output as `MA-RU + ME` would conflate two different inscriptional data types.

This is a new false-positive class for the morphology benchmark:

> **complex-sign/logogram flattening can manufacture an apparent syllabic affix paradigm.**

**Adjudication:** **rejected as an exact suffix pair / reclassified as a logographic-type control.**

---

## ME-4: `SA-RA ~ SA-RA-ME`

### Base

Complete `SA-RA` exists independently, including HT 62+73 and SAM Wa 1.

### Supposed extended form

The automatic `SA-RA-ME` variant comes from IO Za 12.

But IO Za 12 explicitly continues one word across two faces:

```text
.a: ... JA-SA-
.b: -SA-RA-ME ...
```

Younger's commentary states that the two sides break up the word `JA-SA- | -SA-RA-ME`.

Thus `SA-RA-ME` on IO Za 12 is not an independent free word and cannot be compared to free `SA-RA` as a suffix paradigm.

**Adjudication:** **rejected: cross-face continuation.**

---

## Final audit table

| pair | result | main reason |
|---|---|---|
| `A-RA-TU ~ A-RA-TU-ME` | **Tier B candidate** | complete formal pair, but cross-site/support and lexical identity unresolved |
| `JA-SA-SA-RA ~ ...-ME` | **rejected** | base is first face of the full `...-ME` word |
| `MA-RU ~ MA-RU-ME` | **rejected/reclassified** | supposed extended form is complex/logographic `*561` notation, not ordinary parallel syllabic word |
| `SA-RA ~ SA-RA-ME` | **rejected** | variant is continuation of `JA-SA-SA-RA-ME` across faces |

## Main result

> **The current exact-pair evidence does not establish productive final `ME` morphology across independent Linear A stems.**

Only one of four damage-secure automatic pairs survives direct audit, and that survivor is Tier B rather than a strong grammatical paradigm.

This sharply contrasts with final `JA`, for which two Tier-A and two Tier-B families survived equivalent scrutiny.

## What remains true about `ME`

This audit does **not** show that final `ME` is non-morphological.

Relevant observations remain:

- `ME` is strongly word-final in the corpus;
- the ritual sequence `(J)A-SA-SA-RA-ME` is recurrent and structurally important;
- `A-RA-TU-ME` has a secure shorter formal counterpart `A-RA-TU`;
- future evidence may reveal an onomastic, derivational, ritual, or other function.

But the present benchmark cannot call `ME` **productive** on exact paradigmatic evidence.

## Methodological consequence

v0.3 solved one major class of false positives: damaged word boundaries. The `ME` audit shows that at least two additional classes still require explicit modeling:

1. **cross-face/cross-line lexical continuation**;
2. **logogram/complex-sign flattening into syllabic-looking strings**.

These should become explicit v0.4 regression controls.

## Sources / provenance

- `mwenge/lineara.xyz` pinned at `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.
- GORILA-derived item/transcription pages for ZA 7a, HT Wc 3024, IO Za 12, IO Za 16, HT 24a, HT 117a.
- Rose Thomas, "Names and designations of people in Linear A: A contextual study of tablets HT 85 and 117" for the personnel/onomastic context of HT 117.
- Orazio Monti, "Some observations on the language of Linear A," *Kadmos* 61 (2022), for independent discussion of the structure of the `(J)A-SA-SA-RA-ME` ritual family.

## Evidence status

**Tier B:** `A-RA-TU/A-RA-TU-ME`.  
**Rejected exact pairs:** `JA-SA-SA-RA/...-ME`, `MA-RU/MA-RU-ME`, `SA-RA/SA-RA-ME`.  
**No grammatical or semantic function assigned to `ME`.**
