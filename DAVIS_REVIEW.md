# Review brief for Brent Davis

## What I would most like challenged

This is a deliberately compact entry point into the project for specialist criticism. The central claim is **not** that Linear A has been deciphered. It is that a reproducible morphology pipeline now has enough independent checks to make several structural statements testable rather than impressionistic.

### The evidence chain

1. **Blind ranking.** Before learning the identities of Davis's 2026 affixes, the project froze an edge-ranking score based on boundary enrichment, exact whole-word extensions, and modest frequency support.
2. **External target test.** Davis subsequently supplied the two prefixes (`A-`, `I-`) and four suffixes (`-RE`, `-RO`, `-TE`, `-TI`). The original 116-sign experiment produced 3/6 inside its preregistered cutoffs and is preserved unchanged.
3. **Epigraphic falsification.** Manual/source-aware auditing showed that many attractive exact pairs were manufactured by damaged boundaries, continuation, complex signs, or lexical/onomastic mismatches. Those failures were retained as regression controls.
4. **Statistical calibration.** Internal candidate discovery and externally specified target validation were tested separately rather than treating post-hoc discoveries as predictions.
5. **SigLA holdout.** A frozen SigLA v4 asset (802 docs, SHA `9a5e4783...f03dd8`) was then opened only after the replication protocol was fixed.

## SigLA results worth inspecting first

### Davis-six

Primary full eligible SigLA inventory (101 ranked signs):

- `A-` #1
- `I-` #5
- `-RO` #1
- `-RE` #6
- `-TI` #8
- `-TE` #10

At the historical top-2-prefix/top-4-suffix cutoff this is **2/6**, formally weak/non-replication.

Pre-specified Davis 50-main-grid view (49 signs present):

- `A-` #1
- `I-` #4
- `-RO` #1
- `-RE` #4
- `-TI` #6
- `-TE` #7

This is **3/6**, partial replication.

The full-universe result is intentionally not repaired or reclassified upward.

### `-JA`

Previously adjudicated families that reproduce exactly in SigLA:

- Tier A `PA-SE ~ PA-SE-JA`
- Tier A `KU-PA ~ KU-PA-JA`
- Tier B `*306-TU ~ *306-TU-JA`

The weaker Tier-B `A-SE ~ A-SE-JA` **fails** because SigLA groups HT 115a as `A-SE-JA-DDDD` rather than a standalone `A-SE-JA` word.

The two strongest frozen JA false-pair controls (`JA-SA ~ JA-SA-JA` and `PU₂-RE ~ PU₂-RE-JA`) remain suppressed.

### `-TI`

All three accepted pre-holdout families reproduce:

- `DA-KU-SE-NE ~ DA-KU-SE-NE-TI`
- `JA-KU ~ JA-KU-TI`
- `RI-RU-MA ~ RI-RU-MA-TI`

SigLA also independently groups the HT 104 `...-TI` sequences as full words, though the alternative TI-as-ideogram interpretation remains recorded as a caveat.

## The result I think deserves the hardest epigraphic scrutiny

SigLA disagrees with several of the project's GORILA/source-aware boundary adjudications. For example, it supplies complete-word representations that recreate `KI-DA ~ KI-DA-RO`, `DI-NA ~ DI-NA-RO`, `KI-*310 ~ KI-*310-RE`, `A-DU ~ A-DU-RE`, `DU-RA ~ DU-RA-RE`, and `KU-NI ~ KU-NI-TE`, all of which have been downgraded or rejected in the project's source-aware audits.

The project therefore does **not** treat SigLA as automatically authoritative. I would particularly value specialist judgment on which source hierarchy should control each disagreement, ideally at the level of drawings/editio princeps/GORILA rather than normalized transliterations.

## Claims I am currently willing to defend

- Linear A contains recoverable word-edge structure consistent with genuine morphology.
- `A-` has strong structural evidence as an initial morphological element in some vocabulary, function unknown.
- final `JA` has replicated productive-morphology evidence across multiple bases, function unknown.
- final `TI` has replicated exact-family evidence across multiple bases, function unknown.
- normalized digital corpora can create or destroy apparent paradigms through editorial treatment of damage and segmentation.

## Claims I am not making

No language-family identification, continuous translation, or grammatical gloss for `A`, `I`, `JA`, `TI`, `RE`, `RO`, or `TE` follows from this work.

## Suggested review path

1. `experiments/sigla-independent-replication-v1.md`
2. `experiments/davis-2026-affix-replication.md`
3. `experiments/statistical-calibration-v01.md`
4. `experiments/source-consistent-v05.md`
5. `BENCHMARK.md`
6. `audits/JA.md` and `audits/TI.md`
7. `data/v05-regression-set.csv` and `data/v06-form-exclusions.csv`

The most useful response would be to identify any place where the source hierarchy, word segmentation, sign identity, or interpretation of Davis's methodology is wrong. A failed control is more valuable here than another attractive candidate.
