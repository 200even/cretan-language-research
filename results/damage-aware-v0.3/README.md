# Damage-aware morphology v0.3

Corpus: `LinearAInscriptions.js`

Boundary mask: `boundary-mask.csv`

Candidate syllabic occurrences before boundary masking: **1285**.

Complete occurrences retained: **991**; excluded as boundary-insecure: **294**.

Unique cleaned forms: **931**; unique complete forms: **723**.

v0.3 deliberately reports **boundary enrichment** and **damage-aware paradigmatic evidence** as separate rankings. No composite morphology score is used.

## prefix: boundary enrichment

| rank | sign | edge count | internal count | log2 enrichment |
|---:|---|---:|---:|---:|
| 1 | *306 | 8 | 0 | 4.171 |
| 2 | *86 | 7 | 0 | 3.990 |
| 3 | *188 | 5 | 0 | 3.543 |
| 4 | A | 112 | 12 | 3.253 |
| 5 | *28B | 4 | 0 | 3.253 |
| 6 | *309 | 4 | 0 | 3.253 |
| 7 | *309B | 3 | 0 | 2.891 |
| 8 | *312 | 3 | 0 | 2.891 |
| 9 | *324 | 3 | 0 | 2.891 |
| 10 | *333 | 3 | 0 | 2.891 |
| 11 | *815 | 3 | 0 | 2.891 |
| 12 | WI | 8 | 1 | 2.586 |
| 13 | *309C | 2 | 0 | 2.405 |
| 14 | JE | 5 | 1 | 1.958 |
| 15 | *317 | 1 | 0 | 1.668 |

## prefix: secure exact paradigms

| rank | sign | secure pairs | damage-excluded pairs | examples |
|---:|---|---:|---:|---|
| 1 | A | 5 | 6 | SA-RA2 ~ A-SA-RA2 / PA-RA-NE ~ A-PA-RA-NE / SI-KI-RA ~ A-SI-KI-RA / TA-NA-TE ~ A-TA-NA-TE / KI-RO ~ A-KI-RO |
| 2 | KA | 4 | 1 | SA-RU ~ KA-SA-RU / KU-PA ~ KA-KU-PA / NU-TI ~ KA-NU-TI / RE-RO ~ KA-RE-RO |
| 3 | SI | 4 | 2 | KI-RA ~ SI-KI-RA / DA-RE ~ SI-DA-RE / *805-MI ~ SI-*805-MI / TE-TU ~ SI-TE-TU |
| 4 | I | 4 | 5 | RU-JA ~ I-RU-JA / TA-JA ~ I-TA-JA / QA-*118 ~ I-QA-*118 / DA-MA-TE ~ I-DA-MA-TE |
| 5 | PI | 3 | 0 | TA-JA ~ PI-TA-JA / TA-RA ~ PI-TA-RA / TE-RI ~ PI-TE-RI |
| 6 | KI | 3 | 1 | MA-RU ~ KI-MA-RU / RE-TA2 ~ KI-RE-TA2 / RE-ZA ~ KI-RE-ZA |
| 7 | KE | 2 | 0 | KI-RU ~ KE-KI-RU / SI-TE ~ KE-SI-TE |
| 8 | NA | 2 | 0 | DA-RE ~ NA-DA-RE / A-PA3 ~ NA-A-PA3 |
| 9 | TU | 2 | 0 | SU-PU2 ~ TU-SU-PU2 / RU-SA ~ TU-RU-SA |
| 10 | DA | 2 | 1 | TA-RA ~ DA-TA-RA / U-*49 ~ DA-U-*49 |
| 11 | KU | 2 | 1 | MA-JU ~ KU-MA-JU / PA-JA ~ KU-PA-JA |
| 12 | JA | 1 | 0 | SA-SA-RA-ME ~ JA-SA-SA-RA-ME |
| 13 | RE | 1 | 0 | A-JA ~ RE-A-JA |
| 14 | TA | 1 | 0 | NA-TI ~ TA-NA-TI |
| 15 | TE | 1 | 0 | JA-RE ~ TE-JA-RE |

## suffix: boundary enrichment

| rank | sign | edge count | internal count | log2 enrichment |
|---:|---|---:|---:|---:|
| 1 | RO | 57 | 7 | 3.022 |
| 2 | TA2 | 10 | 1 | 2.891 |
| 3 | *306 | 3 | 0 | 2.891 |
| 4 | RA2 | 39 | 7 | 2.480 |
| 5 | JE | 7 | 1 | 2.405 |
| 6 | *188 | 2 | 0 | 2.405 |
| 7 | *308 | 2 | 0 | 2.405 |
| 8 | *321 | 2 | 0 | 2.405 |
| 9 | *331 | 2 | 0 | 2.405 |
| 10 | *86 | 2 | 0 | 2.405 |
| 11 | *118 | 16 | 3 | 2.320 |
| 12 | WI | 6 | 1 | 2.199 |
| 13 | ME | 24 | 6 | 1.998 |
| 14 | *305 | 5 | 1 | 1.958 |
| 15 | PU | 7 | 2 | 1.668 |

## suffix: secure exact paradigms

| rank | sign | secure pairs | damage-excluded pairs | examples |
|---:|---|---:|---:|---|
| 1 | JA | 7 | 1 | PA-SE ~ PA-SE-JA / A-SE ~ A-SE-JA / *306-TU ~ *306-TU-JA / KU-PA ~ KU-PA-JA / A-MA ~ A-MA-JA / JA-SA ~ JA-SA-JA / PU2-RE ~ PU2-RE-JA |
| 2 | ME | 4 | 2 | MA-RU ~ MA-RU-ME / A-RA-TU ~ A-RA-TU-ME / JA-SA-SA-RA ~ JA-SA-SA-RA-ME / SA-RA ~ SA-RA-ME |
| 3 | TE | 4 | 2 | DU-RI ~ DU-RI-TE / SI-RU ~ SI-RU-TE / KU-NI ~ KU-NI-TE / I-JA ~ I-JA-TE |
| 4 | RO | 3 | 1 | SA-MA ~ SA-MA-RO / DI-NA ~ DI-NA-RO / A-DA ~ A-DA-RO |
| 5 | I | 2 | 0 | KI-TA ~ KI-TA-I / TU-ME ~ TU-ME-I |
| 6 | MU | 2 | 0 | KU-RA ~ KU-RA-MU / JA-SA ~ JA-SA-MU |
| 7 | QE | 2 | 0 | KA-PA ~ KA-PA-QE / SA-RO ~ SA-RO-QE |
| 8 | SU | 2 | 0 | KU-NI ~ KU-NI-SU / A-RI ~ A-RI-SU |
| 9 | WI | 2 | 0 | JA-DI ~ JA-DI-WI / PA3-NI ~ PA3-NI-WI |
| 10 | MI | 2 | 1 | JA-RE ~ JA-RE-MI / I-DA ~ I-DA-MI |
| 11 | PA | 2 | 1 | KA-KU ~ KA-KU-PA / A-RI ~ A-RI-PA |
| 12 | SA | 2 | 1 | QA-*118 ~ QA-*118-SA / A-JE ~ A-JE-SA |
| 13 | NE | 2 | 2 | *21F-TU ~ *21F-TU-NE / PA-RA ~ PA-RA-NE |
| 14 | SE | 2 | 3 | TU-ME ~ TU-ME-SE / RU-MA-TA ~ RU-MA-TA-SE |
| 15 | TI | 2 | 3 | JA-KU ~ JA-KU-TI / RI-RU-MA ~ RI-RU-MA-TI |

## Interpretation

A high boundary rank and a high paradigm rank are different observations. Boundary concentration can arise in restricted lexical classes such as names or formulae, while a secure exact-pair signal can be strong even for a comparatively uncommon affix. Every surviving pair still requires contextual and onomastic audit before grammatical promotion.
