# SigLA independent-corpus replication v1.0

**Status:** confirmatory holdout opened and replication ledger closed, 2026-08-18.  
**Purpose:** test frozen Linear A morphology claims against an independently encoded digital corpus before using that corpus for new candidate discovery.  
**Result:** mixed Davis-six distributional replication; strong cross-encoding replication for the project’s adjudicated `-JA` and `-TI` families; substantial source/segmentation disagreement on several previously rejected damage controls.

## Executive result

This experiment treats SigLA as an **independent digital encoding/segmentation holdout**, not as an independent archaeological corpus. The underlying inscriptions overlap heavily with GORILA and related editions, but SigLA supplies an independently constructed sign database and its own word grouping. That is sufficient to test whether project results survive a different digital representation of the same epigraphic evidence.

The frozen SigLA v4 asset is:

- release: `sigla-corpus-v4`
- documents: **802**
- SHA-256: `9a5e4783146144fc5ac54c5dc2b372b39cc0e0ea40ca15207243f8c539f03dd8`
- source: SigLA, Ester Salgarella and Simon Castellan
- dataset license: **CC BY-NC-SA 4.0**

The replication script verifies the SHA before analysis.

### Main results

1. **Davis-six primary full-inventory test:** **2/6**, which falls in the frozen **weak/non-replication** band.
2. **Pre-specified Davis main-grid sensitivity:** **3/6**, which falls in the frozen **partial-replication** band.
3. `A-` remains the strongest replicated prefix signal.
4. Both Tier-A `-JA` families replicate, as does one Tier-B `-JA` family; the two strongest frozen JA false-pair controls remain suppressed.
5. All three previously accepted Tier-A/B `-TI` families replicate as exact SigLA word pairs.
6. Several damage/source negatives for `A`, `I`, `RO`, `RE`, `TE`, and `TI` are represented by SigLA as complete words. This is an important **edition/encoding disagreement**, not grounds for silently overturning the existing source audits.

No grammatical gloss or language-family inference is introduced by this replication.

---

## 1. Frozen design

The replication was defined before inspecting SigLA morphology outcomes.

### 1.1 Frozen target corpus

Use the pyaegean-decoded SigLA v4 release asset only if its SHA-256 equals:

```text
9a5e4783146144fc5ac54c5dc2b372b39cc0e0ea40ca15207243f8c539f03dd8
```

Do not substitute a newer SigLA snapshot without versioning it as a later replication.

### 1.2 Word division and apparatus

SigLA word membership is authoritative for this replication. The script reconstructs words from SigLA's `word` indices and follows the pyaegean apparatus contract:

- an in-word unresolved blank is retained conceptually as `*?` and makes the token uncertain;
- `?`, `[` and `]` mark uncertain readings;
- a word with no preserved sign label is lost;
- complex-sign composition notation is not decomposed into syllables;
- homophones remain distinct (`RA₂` != `RA`, `PU₂` != `PU`, `TA₂` != `TA`).

The reconstructed token-status regression matches pyaegean's v4 corpus test exactly:

- **2,296 certain**
- **201 unclear**
- **119 lost**
- **2,616 total tokens**

### 1.3 v0.2 candidate eligibility

To reproduce the historical Davis benchmark as closely as possible, the SigLA run applies the v0.2 mechanical word criteria rather than the later v0.5 discovery model:

- certain SigLA word only;
- at least two syllabic sign positions;
- no unresolved/editorial apparatus;
- no complex sign;
- conservative obvious-logogram exclusion (`AROM`, `CAP`, `CYP`, `GAL`, `GRA`, `OLE`, `OLIV`, `VIN`, `VIR`, `VS`).

This leaves:

- **932 eligible word tokens**
- **680 unique forms**
- **101 ranked sign identities**

These counts supersede the provisional hand-calculated readout made immediately after opening the holdout.

### 1.4 Frozen scoring rule

The original Davis v0.2 score is reused without retuning:

```text
score = boundary_enrichment
      + 0.75 * log2(1 + exact_extension_pairs)
      + 0.25 * log2(1 + boundary_count)
```

with the original 0.5 continuity correction in the boundary/internal enrichment term.

The code is intentionally separate from the later source-aware v0.5 extraction model because the two experiments answer different questions:

- **v0.2:** can a frozen blind edge-ranking method recover independently specified Davis targets?
- **v0.5+:** which apparent exact pairs survive source, damage, continuation, and complex-sign adjudication?

### 1.5 Frozen targets

Davis 2026 targets, supplied after the original score was frozen and consistent with the published Chapter 4 description:

- prefixes: `A-`, `I-`
- suffixes: `-RE`, `-RO`, `-TE`, `-TI`

The project’s separately frozen structural targets include `-JA` and `-TI`, plus their adjudicated positive and negative controls.

---

## 2. Davis-six replication

### 2.1 Primary: full eligible SigLA sign inventory

| target | side | SigLA rank | frozen cutoff | hit? |
|---|---|---:|---:|---|
| `A` | prefix | **1 / 101** | top 2 | **yes** |
| `I` | prefix | 5 / 101 | top 2 | no |
| `RO` | suffix | **1 / 101** | top 4 | **yes** |
| `RE` | suffix | 6 / 101 | top 4 | no |
| `TI` | suffix | 8 / 101 | top 4 | no |
| `TE` | suffix | 10 / 101 | top 4 | no |

**Primary result: 2/6.**

Under the evaluation categories frozen in `experiments/davis-2026-affix-replication.md`, `0-2/6` is weak/non-replication. This result must be recorded as a failure to reproduce the original partial-replication band on the full SigLA inventory.

The fact that both recovered targets are one prefix and one suffix is not itself evidence of grammatical function.

### 2.2 Pre-specified secondary: Davis main-grid universe

The repository already contains the 50-sign Davis main-grid universe. SigLA contains **49/50** of those signs in the eligible ranking; `ZU` is absent.

| target | main-grid rank | frozen cutoff | hit? |
|---|---:|---:|---|
| `A` | **1 / 49** | top 2 | **yes** |
| `I` | 4 / 49 | top 2 | no |
| `RO` | **1 / 49** | top 4 | **yes** |
| `RE` | **4 / 49** | top 4 | **yes** |
| `TI` | 6 / 49 | top 4 | no |
| `TE` | 7 / 49 | top 4 | no |

**Secondary result: 3/6 = partial replication.**

Unlike the original post-unblinding 49-sign sensitivity analysis, this universe was known and recorded before the SigLA holdout was opened. It is therefore a legitimate pre-specified secondary replication view, but it does not replace the primary full-inventory result.

### 2.3 External-target combinatorial calibration

Using the same external-target logic as the completed statistical-calibration experiment:

- full 101-sign universe, observed side pattern `1/2` prefix and `1/4` suffix:
  - `P(total hits >= 2) = 0.0127975`
  - `P(prefix hits >= 1 and suffix hits >= 1) = 0.00596539`
- 49-sign main-grid universe, observed side pattern `1/2` prefix and `2/4` suffix:
  - `P(total hits >= 3) = 0.00334683`
  - `P(prefix hits >= 1 and suffix hits >= 2) = 0.00233376`

These probabilities answer a different question from the frozen descriptive replication band. The primary result is still **2/6 weak/non-replication**. The combinatorial result only says that the externally specified Davis targets still land unusually high relative to random target identities.

---

## 3. Frozen structural-target replication

This section tests only relationships already identified and adjudicated before SigLA was opened. It does not promote new SigLA-only pairs.

### 3.1 Initial `A-`

Strong previously frozen controls reproduced by SigLA:

| frozen relationship | prior status | SigLA |
|---|---|---|
| `KA-RU ~ A-KA-RU` | Tier A | **replicated** |
| `SI-KI-RA ~ A-SI-KI-RA` | Tier A | **replicated** |
| `TA-NA-TE ~ A-TA-NA-TE` | Tier A / published same-tablet control | **replicated** |
| `SA-RA₂ ~ A-SA-RA₂` | Tier B | replicated |
| `PA-RA-NE ~ A-PA-RA-NE` | Tier B | replicated |

This is strong cross-encoding support for a productive initial `A-` relation in at least some vocabulary.

However, two previously rejected damage controls also reappear as complete SigLA pairs:

- `RA-NA-RE ~ A-RA-NA-RE`
- `RI-JA ~ A-RI-JA`

The correct interpretation is **source disagreement**, not automatic rehabilitation. The GORILA/damage-aware audit and the SigLA word layer disagree about completeness.

### 3.2 Initial `I-`

Previously frozen relationships:

| frozen relationship | prior status | SigLA |
|---|---|---|
| `QA-*118 ~ I-QA-*118` | Tier A | **replicated** |
| `DA-MA-TE ~ I-DA-MA-TE` | Tier A | **not testable in this SigLA asset** |
| `RU-JA ~ I-RU-JA` | Tier B | **replicated** |
| `TA-JA ~ I-TA-JA` | lexical/context mismatch | exact strings reproduced, still not morphology evidence |

Several frozen damaged negatives are nevertheless represented by SigLA as complete exact pairs:

- `KI-RA ~ I-KI-RA`
- `KU-TA ~ I-KU-TA`
- `KU-PI ~ I-KU-PI`

Again this is an edition/encoding disagreement that should remain explicit.

### 3.3 Final `-JA`

The strongest `JA` result survives very well.

| frozen relationship | prior status | SigLA |
|---|---|---|
| `PA-SE ~ PA-SE-JA` | Tier A | **replicated** |
| `KU-PA ~ KU-PA-JA` | Tier A | **replicated** |
| `*306-TU ~ *306-TU-JA` | Tier B | **replicated** |
| `A-SE ~ A-SE-JA` | Tier B | **fails exact-word replication** |
| `A-MA ~ A-MA-JA` | Tier C | exact strings reproduced |
| `JA-SA ~ JA-SA-JA` | rejected segmentation false pair | **remains suppressed** |
| `PU₂-RE ~ PU₂-RE-JA` | rejected source/boundary false pair | **remains suppressed** |

The `A-SE` failure is useful rather than embarrassing. SigLA groups the relevant HT 115a sequence as `A-SE-JA-DDDD`, not a standalone `A-SE-JA`. A genuinely independent word segmentation therefore kills one previously accepted weaker exact pair.

The defensible conclusion after holdout replication is narrower but stronger:

> Both Tier-A `JA` families and one Tier-B family reproduce under SigLA's independent word grouping, while the two strongest frozen JA false-pair controls remain excluded. This supports productive final `JA` morphology in at least some vocabulary, with grammatical function still unknown.

### 3.4 Final `-TI`

All three previously accepted `TI` families reproduce:

| frozen relationship | prior status | SigLA |
|---|---|---|
| `DA-KU-SE-NE ~ DA-KU-SE-NE-TI` | Tier A, segmentation caveat | **replicated** |
| `JA-KU ~ JA-KU-TI` | Tier B | **replicated** |
| `RI-RU-MA ~ RI-RU-MA-TI` | Tier B | **replicated** |
| `SA-MA ~ SA-MA-TI` | rejected damaged variant | **negative fails: SigLA represents complete pair** |
| `QA-KI ~ QA-KI-TI` | rejected damaged forms | **remains suppressed** |

The HT 104 result is especially informative because SigLA independently groups `DA-KU-SE-NE-TI` as one word, supporting the full-word segmentation while the earlier `TI`-as-ideogram alternative remains a recorded caveat.

No locative, ablative, case, or other gloss follows from this result.

---

## 4. Source disagreement is itself a replication result

The most consequential negative result is that SigLA's word layer does **not** reproduce every damage/source adjudication made from the project’s GORILA-derived and edition-aware audits.

Examples:

| form/relationship | project source-aware status | SigLA v4 representation |
|---|---|---|
| `KI-DA ~ KI-DA-RO` | reject: base `KI-DA[` | exact complete pair available |
| `DI-NA ~ DI-NA-RO` | reject: base left-fragmentary | exact complete pair available |
| `KI-*310 ~ KI-*310-RE` | reject: base `]KI-*310` | exact complete pair available |
| `A-DU ~ A-DU-RE` | reject: variant `A-DU-RE[` | exact complete pair available |
| `DU-RA ~ DU-RA-RE` | reject: base `]DU-RA` | exact complete pair available |
| `KU-NI ~ KU-NI-TE` | reject: source control preserves `]KU-NI[` | exact complete pair available |
| `JA-RE` | v0.6 exclusion: ARKH1b source conflict with `]PA-RE` | SigLA has complete `JA-RE` |
| `QA-*118-SA` | v0.6 exclusion: HT70 preserves `]QA-*118-SA` | SigLA has complete `QA-*118-SA` |

This prevents a simplistic hierarchy in which SigLA automatically supersedes the earlier audits. Instead the project should maintain both readings and trace them to primary/editio-princeps evidence where possible.

A central methodological contribution is therefore:

> normalized digital word corpora are not interchangeable for Linear A morphology; editorial decisions about sign identification, break boundaries, continuation, and word grouping can directly manufacture or destroy apparent paradigms.

Future publication-stage claims should expose these disagreements explicitly rather than silently selecting the reading that best supports a morphological hypothesis.

---

## 5. What this replication supports

### Supported at the current evidentiary level

1. A frozen computational edge-ranking method shows non-random convergence with Davis's independently specified 2026 affix inventory, but the strength of descriptive replication varies by candidate universe and encoding.
2. `A-` has strong cross-encoding structural support as an initial morphological element in at least some vocabulary.
3. Final `JA` has strong cross-encoding productive-morphology evidence from multiple independently attested bases, including two Tier-A administrative families.
4. Final `TI` has strong cross-encoding exact-family evidence despite weaker global edge rank.
5. Source-aware epigraphy is necessary for computational morphology because digital editions disagree on forms that directly affect paradigm counts.

### Not supported / not claimed

- a decipherment of Linear A;
- a translation of any of these affixes;
- `A-` as an article;
- `JA` as genitive, ablative, adjective, ethnicon, or “from”;
- `TI` as locative, ablative, or any other case ending;
- a specific language-family identification;
- the assumption that every exact `X ~ X-affix` string is one lexeme in two grammatical forms.

---

## 6. Reproducibility

Run:

```bash
python scripts/rank-sigla-affixes.py /path/to/sigla-corpus.json \
  --out-dir data/generated/sigla-v1
```

The script aborts if the corpus SHA does not match the frozen v4 asset.

Committed frozen outputs:

- `data/sigla-replication-v1/summary.json`
- `data/sigla-replication-v1/davis-targets.csv`
- `data/sigla-replication-v1/target-pairs.csv`

The full ranking is generated by the script but should not be interpreted as a confirmatory discovery set. Any non-frozen candidate identified only after the SigLA holdout was opened is exploratory by definition.

---

## 7. Scholarly framing

The result should be presented as **methodological and structural progress toward decipherment**, not as decipherment itself.

Brent Davis's 2026 Chapter 4, “Linear A Morphology,” systematically applies a refinement of David W. Packard's statistical approach to identify two likely prefixes and four likely suffixes. The present project independently tests those targets with a different score and then subjects exact word-family evidence to damage/source auditing and cross-encoding replication.

The strongest potential contribution is therefore the combined chain:

1. frozen blind candidate ranking;
2. externally specified Davis target comparison;
3. inscription-level source/damage falsification benchmark;
4. statistical calibration separating internal discovery from external validation;
5. independent SigLA digital-encoding holdout.

That chain is more important than any single proposed suffix meaning.

## References / provenance

- Davis, Brent. 2026. “Linear A Morphology.” In *The Undeciphered Aegean Scripts: Linguistic Investigations into the Languages They Encode*, 171–204. Cambridge University Press. DOI: `10.1017/9781009562331.005`.
- Salgarella, Ester & Simon Castellan. 2020. “SigLA: The Signs of Linear A. A Palæographical Database.” *Grapholinguistics and Its Applications* 5: 945–962. DOI: `10.36824/2020-graf-salg`.
- Project frozen Davis protocol: `experiments/davis-2026-affix-replication.md`.
- Project source-consistent extraction: `experiments/source-consistent-v05.md`.
- Project statistical calibration: `experiments/statistical-calibration-v01.md`.
- Project audits: `audits/A.md`, `audits/I.md`, `audits/JA.md`, `audits/TI.md`, `audits/RO.md`, `audits/RE.md`, `audits/TE.md`.
- Registered forward source exclusions: `data/v06-form-exclusions.csv`.
