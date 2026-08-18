# Audit: final `-TE`

**Status:** completed, with a later source-hierarchy correction after the QE/SU/WI comparative screen.  
**Blind v0.2 rank:** suffix #4 / 116.  
**Davis 2026:** independently identifies `-TE` as one of four likely Linear A suffixes.  
**Current exact-pair result:** **0 Tier A + 1 Tier B + 1 Tier C + 4 rejected/source-insecure** among the six frozen automatic pairs.

## Why this file was corrected again

The project previously promoted `KU-NI ~ KU-NI-TE` after the normalized HT79+83 item page parsed `KU-NI` as a complete word. The later comparative audit checked that token against the separate GORILA-derived damage-preserving commentary for HT79 [+] 83, which gives:

```text
]KU-NI[
```

Under the project's source hierarchy, damage-preserving inscriptional boundary evidence outranks normalized word tokenization. The earlier Tier-B promotion is therefore withdrawn. This correction does **not** alter the frozen v0.2 ranking or the v0.3 regression PASS: `KU-NI` was never one of v0.3's six retained-positive regression controls.

## Pair-by-pair result

| pair | current adjudication |
|---|---|
| `DU-RI ~ DU-RI-TE` | rejected: insecure boundaries |
| `SI-RU ~ SI-RU-TE` | **Tier B / reclassified**; complete forms but administrative vs ritual-formula mismatch |
| `KU-NI ~ KU-NI-TE` | **rejected**: proposed base source-conflicted/insecure (`]KU-NI[`) |
| `I-JA ~ I-JA-TE` | **Tier C / comparison-only** |
| `A-DI-KI-TE ~ A-DI-KI-TE-TE` | rejected as mechanical exact pair; broader literature-based morphology question remains separate |
| `A-TA-NA ~ A-TA-NA-TE` | rejected: damaged base |

The exact-pair evidence is therefore narrower than previously reported. This does **not** refute Davis's distributional identification of final `TE`; boundary distribution and clean whole-word paradigms remain separate evidence dimensions.

## External lead

`AU-RE ~ AU-RE-TE` remains a literature-derived comparison outside the frozen automatic six and requires its own epigraphic audit before promotion.

## Methodological consequence

> When normalized tokenization conflicts with a damage-preserving inscription transcription, boundary security is determined by the damage-preserving layer.

The `KU-NI` conflict is registered in `data/v05-regression-backlog.csv` rather than rewriting frozen v0.4 outputs.

## Sources / provenance

- HT79 [+] 83 damage-preserving GORILA-derived commentary: `]KU-NI[`;
- normalized HT79+83 item page, retained explicitly as the conflicting representation;
- KH92 for complete `KU-NI-TE`;
- Valério and Thomas for broader published morphology discussions;
- pinned exploratory corpus commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.

## Non-claim

No function or translation is assigned to `TE`.
