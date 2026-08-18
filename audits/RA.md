# Audit: final `RA`

**Status:** completed first-pass family audit against structural-aware v0.4.  
**Input:** three v0.4 structurally secure `X ~ X-RA` candidates.  
**Result:** **no Tier-A paradigm survives; productive final `RA` is not established.**

## Audit question

Does final `RA` behave as a productive suffix across securely attested lexical bases, or are the v0.4 exact pairs better explained by orthographic variation and lexical/onomastic coincidence?

The three v0.4 candidates are:

1. `SA-RA ~ SA-RA-RA`
2. `A-DA ~ A-DA-RA`
3. `MI-DA ~ MI-DA-RA`

All three pass v0.4's structural/type mask. This audit therefore tests the next promotion layer: common lexical identity and contextual comparability.

## 1. `SA-RA ~ SA-RA-RA`

**Final adjudication: rejected as evidence for a final `-RA` suffix; retain as an orthographic/lexical-identity control.**

### Automatic base

The structurally secure bare `SA-RA` used by v0.4 occurs on HT 62+73, Haghia Triada, as a complete two-sign group at the beginning of an administrative tablet.

### Apparent extended form

HT 30, Haghia Triada, HT Scribe 1, contains complete:

```text
SA-RA-RA
```

However, HT 30 itself also contains:

```text
SA-RA₂
```

John Younger's commentary on HT 30 explicitly notes that `SA-RA₂` and `SA-RA-RA` may be "one and the same." This is the decisive comparison because it is inscription-internal and therefore stronger than pairing `SA-RA-RA` with an unrelated bare `SA-RA` from HT 62+73.

The HT 30 derived transaction layer also treats the two spellings differently at a coarse level, but that secondary classification cannot override the direct same-tablet editorial observation.

### Why the suffix segmentation fails

The automatic algorithm sees the string equation:

```text
SA-RA + RA = SA-RA-RA
```

but the inscription gives a more economical competing relationship:

```text
SA-RA₂ ~ SA-RA-RA
```

This may reflect orthographic, palaeographic, phonological, or lexical variation; the present evidence does not decide which. What it does show is that `SA-RA-RA` cannot be used as clean evidence that final `RA` was productively appended to a free `SA-RA` base.

This becomes a useful benchmark control for **string-decomposition ambiguity**: an exact suffix segmentation can be structurally legal while a stronger inscription-internal analysis points elsewhere.

## 2. `A-DA ~ A-DA-RA`

**Final adjudication: Tier C / comparison-only.**

### Bare form

TY 3a at Tylissos contains complete `A-DA` in an administrative allocation account. The upstream derived transaction model places `A-DA` in a recipient-like slot governing oil commodities.

### Extended form

KN Zf 31 contains complete `A-DA-RA` as one of several sign groups separated by dividers on a silver hairpin. The object comes from the Mavrospilio funerary context at Knossos and belongs to the inscribed-jewellery corpus, not the administrative tablet register.

The form is epigraphically secure. The problem is lexical identity, not damage.

### Why it is not promoted

The comparison crosses:

- site: Tylissos → Knossos;
- support: tablet → silver hairpin;
- documentary function: administrative allocation → inscribed personal/high-status object;
- discourse environment: recipient-like account entry → isolated sign group in a long non-administrative inscription.

`A-DA` also participates in another secure formal comparison, `A-DA ~ A-DA-RO`, already retained as a Tier-B `RO` candidate. That makes the stem worth watching, but it does not prove that every longer `A-DA-X` form shares one lexeme or one inflectional paradigm.

The exact string relation therefore survives as a comparison-only lead. It is insufficient evidence for productive `-RA`.

## 3. `MI-DA ~ MI-DA-RA`

**Final adjudication: Tier B / reclassified as possible onomastic or derivational morphology.**

### Bare form

HT 27b, Haghia Triada, HT Scribe 11, begins with complete `MI-DA`. The tablet is administrative and the upstream derived transaction model treats `MI-DA` as a recipient-like designation governing commodities.

### Extended form

PK Zb 25 is a jar handle from Palaikastro carrying the complete three-sign inscription:

```text
MI-DA-RA
```

The editio princeps by Ilse Schoep and Jan Driessen identifies `MI-DA-RA` as a hapax whose meaning is unknown. They specifically state that it is not possible to determine whether it is an anthroponym or a toponym.

This matters because the administrative `MI-DA` base is itself compatible with a name/designation slot. Thus the formal relationship is plausible as onomastic or derivational morphology, but there is no independent evidence that the two strings are the same lexeme in a grammatical paradigm.

### Why Tier B rather than Tier A

Positive factors:

- both forms complete;
- exact final `RA` extension;
- no structural/type failure;
- the bare administrative form occupies a designation-like slot, which is at least compatible with the editors' anthroponym/toponym possibilities for `MI-DA-RA`.

Limiting factors:

- only one secure attestation of each form;
- different sites and supports;
- `MI-DA-RA` is a vessel inscription of unknown function;
- variant is a hapax;
- common lexical identity is not independently demonstrated.

The pair is retained as a real formal candidate, but it supports at most **possible onomastic/derivational `RA` morphology**, not a productive general suffix.

## Summary

| family | v0.4 structural status | final result |
|---|---|---|
| `SA-RA ~ SA-RA-RA` | secure | **rejected / stronger `SA-RA₂ ~ SA-RA-RA` analysis** |
| `A-DA ~ A-DA-RA` | secure | **Tier C / comparison-only** |
| `MI-DA ~ MI-DA-RA` | secure | **Tier B / reclassified onomastic-derivational candidate** |

### Survival profile

- v0.4 structural exact pairs: **3**
- Tier A: **0**
- Tier B: **1**
- Tier C / comparison-only: **1**
- rejected as suffix evidence: **1**

Therefore:

> **The v0.4 `RA` signal does not establish productive final `RA`. One formal family (`MI-DA ~ MI-DA-RA`) remains credible enough for Tier B, but its strongest interpretation is presently onomastic/derivational rather than generic inflection.**

This places `RA` much closer to `ME`/`NE` than to audited `JA` in terms of independent family survival.

## Methodological consequence

The `SA-RA` case adds a failure class that is distinct from damage and source typing:

> **string-decomposition ambiguity** — a computationally valid `X ~ X-A` relationship may be superseded by a stronger inscription-internal alternation involving a different sign value or spelling.

This should remain a manual promotion-stage control rather than an automatic v0.4 exclusion because deciding among competing lexical analyses requires epigraphic/contextual judgment.

## Sources / provenance

Primary exploratory source layer pinned to `mwenge/lineara.xyz` commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`, with GORILA-linked transcriptions.

Key records:

- HT 62+73 — complete `SA-RA`;
- HT 30 — complete `SA-RA₂` and `SA-RA-RA`, HT Scribe 1; Younger explicitly proposes they may be one and the same;
- TY 3a — complete administrative `A-DA`, recipient-like in the secondary transaction model;
- KN Zf 31 — complete `A-DA-RA` on a silver hairpin from the Mavrospilio funerary context;
- HT 27b — complete administrative `MI-DA`, HT Scribe 11, recipient-like in the secondary transaction model;
- PK Zb 25 — complete `MI-DA-RA` on a jar handle.

Specialist source for PK Zb 25: Ilse Schoep and Jan Driessen, "An Inscribed Handle from Palaikastro (PK Zb 25)," *Minos* 37–38 (2002–2003), 77–80. The editors call the group a hapax of unknown meaning and cannot determine whether it is an anthroponym or toponym.

Material-context caution for KN Zf 31 is consistent with Josephine Verduci and Brent Davis, "Adornment, Ritual and Identity: Inscribed Minoan Jewellery," *Annual of the British School at Athens* 110 (2015), which treats KN Zf 31 as a silver hairpin from Mavrospilio Tomb IXb.

## Non-claim

This audit does not translate `RA`, identify a Minoan case ending, or establish that `MI-DA-RA` is a name. It only adjudicates whether the three exact v0.4 string pairs are strong evidence for productive final `RA`.