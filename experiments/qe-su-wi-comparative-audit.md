# Comparative audit: final `QE`, `SU`, and `WI`

**Status:** registered before inscription-level adjudication.  
**Input:** the three tied clean two-pair suffix candidates from structural-aware v0.4.  
**Purpose:** compare survival under one fixed hostile audit rather than selecting candidates sequentially after seeing results.

## Registered candidate set

### `QE`
- `KA-PA ~ KA-PA-QE`
- `SA-RO ~ SA-RO-QE`

### `SU`
- `KU-NI ~ KU-NI-SU`
- `A-RI ~ A-RI-SU`

### `WI`
- `JA-DI ~ JA-DI-WI`
- `PA3-NI ~ PA3-NI-WI`

All six are structurally secure and unwarned in frozen v0.4. That status means only that the source/type-aware extractor found complete compatible strings. It is not a morphological adjudication.

## Audit dimensions

Every pair is evaluated in the following order:

1. physical and editorial boundary security;
2. script/sign/type integrity;
3. support and document class;
4. site and chronology;
5. scribe distribution where available;
6. local inscriptional role and neighboring structure;
7. lexical-identity plausibility;
8. onomastic/toponymic/formulaic confounds;
9. competing decompositions or sign-value issues.

Derived transaction labels are secondary evidence only.

## Fixed adjudication scale

- **Tier A:** strong formal morphology: secure base and extension plus unusually strong contextual/scribal/independent replication support.
- **Tier B:** credible formal morphological candidate, but lexical class/function or contextual equivalence remains unresolved.
- **Tier C:** comparison-only: complete strings but common lexical identity is weakly supported.
- **Reclassified/rejected:** a stronger non-morphological, lexical, scribal, editorial, or source explanation prevents the pair from supporting the proposed suffix.

## Productivity rule

A suffix is promoted as **productive morphology** in this six-pair screen only if **both of its independent stem families survive at Tier A or B**, with at least one family at Tier A OR with unusually strong independent contextual/scribal convergence across both Tier-B families.

One surviving family is insufficient for productivity, regardless of how strong the other pair appears.

No semantic or case/function gloss is promoted from this experiment. Function would require a separately registered replicated contextual test.

## Comparative result rule

The primary comparison is pair survival:

- A/B survivors out of 2 for each suffix;
- Tier-A count separately;
- rejected/C comparisons retained as negative controls.

No suffix will be selected as "best" by changing thresholds after inspection.

## Frozen source substrate

- structural-aware v0.4 candidate output: `results/structural-aware-v0.4/paradigm-ranking.csv`;
- pinned exploratory source layer: `mwenge/lineara.xyz` commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`;
- specialist/primary editions override normalized corpus representations where available.

## Non-claims

This experiment does not decipher `QE`, `SU`, or `WI`, assign phonetic values beyond conventional sign labels, or infer grammatical case/function from string extensions alone.
