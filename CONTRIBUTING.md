# Contributing

Specialist correction is explicitly welcome. The project is now organized around a versioned **Linear A Morphology Benchmark**, so contributions that improve the quality of the evidence are at least as valuable as new hypotheses.

## Highest-value contributions

- corrected sign readings or word boundaries;
- GORILA page references or better primary-edition citations;
- scribal-attribution corrections;
- examples that falsify a proposed morphological distribution;
- prior scholarship that already identifies a lead recorded here;
- additional cross-scribe attestations of a candidate stem/ending;
- reproducible corpus queries and negative controls;
- Linear B parallels with precise tablet references;
- adjudication of rows in [`data/morphology-benchmark.csv`](data/morphology-benchmark.csv);
- newly identified **false positives** produced by the automatic affix-ranking pipeline.

## Benchmark contribution rule

A proposed benchmark row should provide enough information for another researcher to audit it without trusting the submitter's linguistic interpretation.

Please supply, where available:

- exact base and variant transliterations;
- inscription IDs;
- site and object type;
- scribe/hand;
- whether both word boundaries are secure;
- damage/restoration status;
- local neighboring sign groups;
- numeral/logogram/commodity context;
- primary-edition or specialist-corpus citation;
- proposed evidence tier;
- the strongest alternative explanation (onomastic family, scribal spelling, formulaic expression, coincidence, etc.).

A row may be useful even when its adjudication is **rejected**. Negative examples are deliberately retained so computational methods can be tested for false-positive resistance.

## Evidence standard

Please distinguish clearly between:

1. **inscriptional observation**;
2. **database/derived classification**;
3. **published interpretation**;
4. **new inference**.

A proposed translation based only on phonetic resemblance is not enough to promote a lead.

## Correcting the author

The author is not formally trained in Aegean epigraphy or historical linguistics. Corrections from specialists are therefore not edge cases; they are an intended part of the project design.

If a lead already exists in the literature, please provide the citation. The repository will reclassify it as a **replication** and credit the prior work.

## Suggested issue format

**Form / lead:**  
**Inscription(s):**  
**Primary source / edition:**  
**Exact segmented form(s):**  
**Scribe / site / genre:**  
**Damage or restoration:**  
**What is wrong or missing:**  
**Proposed correction/adjudication:**  
**Strongest alternative explanation:**  
**Does this strengthen, weaken, reclassify, or falsify the lead?**

## Computational reproducibility

When submitting computational results, record the source corpus and exact version/commit. The initial analyses in this repository used `mwenge/lineara.xyz` at commit `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`.

For changes to the affix-ranking method:

- do not overwrite a frozen result;
- assign a new sensitivity/version label;
- state which inclusion/exclusion rule changed;
- preserve the previous ranking;
- report benchmark positives and negatives affected by the change;
- do not tune weights to improve agreement with a desired external-language or published target after unblinding.

See [`BENCHMARK.md`](BENCHMARK.md) and [`experiments/davis-2026-affix-replication.md`](experiments/davis-2026-affix-replication.md).
