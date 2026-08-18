# Blind affix-ranking output

Corpus file: `LinearAInscriptions.js`

Sensitivity mode: **v0.2 obvious-logogram exclusion**.

Secure syllabic word tokens analyzed: **1284**; unique forms: **930**.

Ranking combines sign enrichment at the relevant word edge with a modest bonus for exact whole-word extension pairs `X ~ A-X` or `X ~ X-A`. It does not use Davis's published affix identities.

## Top prefix candidates

| rank | sign | score | edge count | log2 edge enrichment | exact pairs | examples |
|---:|---|---:|---:|---:|---:|---|
| 1 | A | 7.842 | 152 | 3.339 | 11 | RA-NA-RE ~ A-RA-NA-RE / KA-RU ~ A-KA-RU / SA-RA₂ ~ A-SA-RA₂ / PA-RA-NE ~ A-PA-RA-NE / SA-SA-RA-ME ~ A-SA-SA-RA-ME / SI-KI-RA ~ A-SI-KI-RA / DA-RA ~ A-DA-RA / RI-JA ~ A-RI-JA |
| 2 | *86 | 5.351 | 7 | 3.851 | 1 | SI-NI ~ *86-SI-NI |
| 3 | *306 | 5.201 | 10 | 4.336 | 0 |  |
| 4 | I | 4.660 | 76 | 0.601 | 9 | RU-JA ~ I-RU-JA / KI-RA ~ I-KI-RA / TA-JA ~ I-TA-JA / KU-TA ~ I-KU-TA / QA-*118 ~ I-QA-*118 / JA-PA ~ I-JA-PA / KU-PI ~ I-KU-PI / DA-MA-TE ~ I-DA-MA-TE |
| 5 | WI | 4.529 | 11 | 2.883 | 1 | DI-NA ~ WI-DI-NA |
| 6 | KU | 4.485 | 89 | 1.362 | 3 | MA-JU ~ KU-MA-JU / RU-MA ~ KU-RU-MA / PA-JA ~ KU-PA-JA |
| 7 | *188 | 4.346 | 6 | 3.644 | 0 |  |
| 8 | *312 | 4.001 | 3 | 2.751 | 1 | TE-TE ~ *312-TE-TE |
| 9 | QA | 3.994 | 29 | 1.579 | 2 | QA-RU ~ QA-QA-RU / KU-RE ~ QA-KU-RE |
| 10 | KA | 3.833 | 46 | 0.506 | 5 | SA-RU ~ KA-SA-RU / KU-PA ~ KA-KU-PA / NU-TI ~ KA-NU-TI / RE-RO ~ KA-RE-RO / I-KA ~ KA-I-KA |
| 11 | *28B | 3.694 | 4 | 3.114 | 0 |  |
| 12 | *309 | 3.694 | 4 | 3.114 | 0 |  |
| 13 | SI | 3.669 | 44 | 0.191 | 6 | KI-RA ~ SI-KI-RA / DA-RE ~ SI-DA-RE / MI-TA ~ SI-MI-TA / I-SI ~ SI-I-SI / *805-MI ~ SI-*805-MI / TE-TU ~ SI-TE-TU |
| 14 | U | 3.527 | 38 | 1.456 | 1 | QE-TI ~ U-QE-TI |
| 15 | PA | 3.430 | 37 | 0.618 | 3 | JA-RE ~ PA-JA-RE / I-KI ~ PA-I-KI / TA-NE ~ PA-TA-NE |

## Top suffix candidates

| rank | sign | score | edge count | log2 edge enrichment | exact pairs | examples |
|---:|---|---:|---:|---:|---:|---|
| 1 | RO | 6.649 | 78 | 3.332 | 4 | KI-DA ~ KI-DA-RO / SA-MA ~ SA-MA-RO / DI-NA ~ DI-NA-RO / A-DA ~ A-DA-RO |
| 2 | JA | 4.977 | 63 | 1.100 | 8 | PA-SE ~ PA-SE-JA / A-SE ~ A-SE-JA / *306-TU ~ *306-TU-JA / KU-PA ~ KU-PA-JA / A-MA ~ A-MA-JA / JA-SA ~ JA-SA-JA / A-RI ~ A-RI-JA / PU₂-RE ~ PU₂-RE-JA |
| 3 | ME | 4.879 | 26 | 1.584 | 6 | MA-RU ~ MA-RU-ME / A-RA-TU ~ A-RA-TU-ME / JA-SA-SA-RA ~ JA-SA-SA-RA-ME / A-SA-SA-RA ~ A-SA-SA-RA-ME / SA-RA ~ SA-RA-ME / I-JA-PA ~ I-JA-PA-ME |
| 4 | TE | 4.869 | 55 | 1.312 | 6 | DU-RI ~ DU-RI-TE / SI-RU ~ SI-RU-TE / KU-NI ~ KU-NI-TE / I-JA ~ I-JA-TE / A-DI-KI-TE ~ A-DI-KI-TE-TE / A-TA-NA ~ A-TA-NA-TE |
| 5 | NE | 4.735 | 35 | 1.701 | 4 | *21F-TU ~ *21F-TU-NE / QE-TU ~ QE-TU-NE / PA-TA ~ PA-TA-NE / PA-RA ~ PA-RA-NE |
| 6 | WI | 4.428 | 8 | 2.446 | 2 | JA-DI ~ JA-DI-WI / PA₃-NI ~ PA₃-NI-WI |
| 7 | RE | 4.241 | 58 | 0.665 | 6 | PA-JA ~ PA-JA-RE / KI-*310 ~ KI-*310-RE / TE-JA ~ TE-JA-RE / A-DU ~ A-DU-RE / DU-RA ~ DU-RA-RE / A-TA ~ A-TA-RE |
| 8 | *118 | 4.058 | 17 | 2.266 | 1 | A-SI ~ A-SI-*118 |
| 9 | JE | 3.989 | 8 | 2.446 | 1 | A-TA-NA ~ A-TA-NA-JE |
| 10 | SE | 3.900 | 31 | 0.712 | 5 | DI-KI ~ DI-KI-SE / *188-DU ~ *188-DU-SE / TU-ME ~ TU-ME-SE / DU-RE-ZA ~ DU-RE-ZA-SE / RU-MA-TA ~ RU-MA-TA-SE |
| 11 | TI | 3.699 | 47 | 0.364 | 5 | SA-MA ~ SA-MA-TI / DA-KU-SE-NE ~ DA-KU-SE-NE-TI / JA-KU ~ JA-KU-TI / RI-RU-MA ~ RI-RU-MA-TI / QA-KI ~ QA-KI-TI |
| 12 | *321 | 3.694 | 4 | 3.114 | 0 |  |
| 13 | RA₂ | 3.671 | 39 | 2.341 | 0 |  |
| 14 | TA₂ | 3.616 | 10 | 2.751 | 0 |  |
| 15 | RA | 3.577 | 48 | 0.068 | 6 | A-RU ~ A-RU-RA / I-KI ~ I-KI-RA / SA-RA ~ SA-RA-RA / JA-SA-SA ~ JA-SA-SA-RA / A-DA ~ A-DA-RA / MI-DA ~ MI-DA-RA |

## Interpretation rule

This file is a **candidate ranking, not a grammatical analysis**. A high edge score can also arise from names, formulae, genre concentration, or orthographic conventions. Candidates must be audited against the benchmark before promotion.
