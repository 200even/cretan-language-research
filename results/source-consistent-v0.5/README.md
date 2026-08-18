# Source-consistent morphology v0.5

Candidate syllabic occurrences before masking: **1285**. Structurally retained occurrences: **941**; excluded: **344**.

Unique cleaned forms: **931**; unique retained forms: **675**.

v0.5 keeps the v0.4 ranking formulas unchanged; only the source-consistency mask is revised. Boundary enrichment and exact-paradigm evidence remain separate. Lexical warnings annotate but do not remove structurally secure pairs.

## Exclusion classes

| class | excluded occurrences |
|---|---:|
| physical_boundary | 324 |
| editorial_continuation | 9 |
| complex_logogram | 8 |
| non_linear_a_script | 2 |
| authoritative_source_boundary | 2 |
| segmented_fragment_flattening | 1 |

## prefix: boundary enrichment

| rank | sign | edge count | internal | log2 enrichment |
|---:|---|---:|---:|---:|
| 1 | *306 | 8 | 0 | 4.205 |
| 2 | *86 | 7 | 0 | 4.024 |
| 3 | *188 | 5 | 0 | 3.577 |
| 4 | *28B | 4 | 0 | 3.288 |
| 5 | *309 | 4 | 0 | 3.288 |
| 6 | A | 110 | 12 | 3.262 |
| 7 | *312 | 3 | 0 | 2.925 |
| 8 | *324 | 3 | 0 | 2.925 |
| 9 | *333 | 3 | 0 | 2.925 |
| 10 | *815 | 3 | 0 | 2.925 |
| 11 | WI | 7 | 1 | 2.440 |
| 12 | *309B | 2 | 0 | 2.440 |
| 13 | JE | 5 | 1 | 1.992 |
| 14 | *309C | 1 | 0 | 1.703 |
| 15 | *317 | 1 | 0 | 1.703 |

## prefix: structural exact paradigms

| rank | sign | secure pairs | warned | excluded | examples |
|---:|---|---:|---:|---:|---|
| 1 | A | 6 | 2 | 5 | KA-RU ~ A-KA-RU / SA-RA2 ~ A-SA-RA2 / PA-RA-NE ~ A-PA-RA-NE [warn] / SI-KI-RA ~ A-SI-KI-RA [warn] / TA-NA-TE ~ A-TA-NA-TE / KI-RO ~ A-KI-RO |
| 2 | SI | 4 | 1 | 2 | KI-RA ~ SI-KI-RA [warn] / DA-RE ~ SI-DA-RE / *805-MI ~ SI-*805-MI / TE-TU ~ SI-TE-TU |
| 3 | I | 4 | 0 | 5 | RU-JA ~ I-RU-JA / TA-JA ~ I-TA-JA / QA-*118 ~ I-QA-*118 / DA-MA-TE ~ I-DA-MA-TE |
| 4 | PI | 3 | 0 | 0 | TA-JA ~ PI-TA-JA / TA-RA ~ PI-TA-RA / TE-RI ~ PI-TE-RI |
| 5 | KA | 3 | 0 | 2 | SA-RU ~ KA-SA-RU / KU-PA ~ KA-KU-PA / RE-RO ~ KA-RE-RO |
| 6 | KE | 2 | 0 | 0 | KI-RU ~ KE-KI-RU / SI-TE ~ KE-SI-TE |
| 7 | NA | 2 | 0 | 0 | DA-RE ~ NA-DA-RE / A-PA3 ~ NA-A-PA3 |
| 8 | TU | 2 | 0 | 0 | SU-PU2 ~ TU-SU-PU2 / RU-SA ~ TU-RU-SA |
| 9 | DA | 2 | 0 | 1 | TA-RA ~ DA-TA-RA / U-*49 ~ DA-U-*49 |
| 10 | KI | 2 | 0 | 2 | RE-TA2 ~ KI-RE-TA2 / RE-ZA ~ KI-RE-ZA |
| 11 | JA | 1 | 0 | 0 | SA-SA-RA-ME ~ JA-SA-SA-RA-ME |
| 12 | RE | 1 | 0 | 0 | A-JA ~ RE-A-JA |
| 13 | TA | 1 | 0 | 0 | NA-TI ~ TA-NA-TI |
| 14 | TE | 1 | 1 | 0 | JA-RE ~ TE-JA-RE [warn] |
| 15 | U | 1 | 0 | 0 | QE-TI ~ U-QE-TI |

## suffix: boundary enrichment

| rank | sign | edge count | internal | log2 enrichment |
|---:|---|---:|---:|---:|
| 1 | RO | 60 | 7 | 3.130 |
| 2 | TA2 | 10 | 1 | 2.925 |
| 3 | *306 | 3 | 0 | 2.925 |
| 4 | RA2 | 39 | 7 | 2.514 |
| 5 | JE | 7 | 1 | 2.440 |
| 6 | *188 | 2 | 0 | 2.440 |
| 7 | *308 | 2 | 0 | 2.440 |
| 8 | *321 | 2 | 0 | 2.440 |
| 9 | *331 | 2 | 0 | 2.440 |
| 10 | *86 | 2 | 0 | 2.440 |
| 11 | *118 | 15 | 3 | 2.264 |
| 12 | ME | 19 | 4 | 2.233 |
| 13 | *305 | 5 | 1 | 1.992 |
| 14 | WI | 5 | 1 | 1.992 |
| 15 | *22M | 1 | 0 | 1.703 |

## suffix: structural exact paradigms

| rank | sign | secure pairs | warned | excluded | examples |
|---:|---|---:|---:|---:|---|
| 1 | JA | 5 | 1 | 3 | PA-SE ~ PA-SE-JA / A-SE ~ A-SE-JA / *306-TU ~ *306-TU-JA [warn] / KU-PA ~ KU-PA-JA / A-MA ~ A-MA-JA |
| 2 | TI | 3 | 0 | 2 | DA-KU-SE-NE ~ DA-KU-SE-NE-TI / JA-KU ~ JA-KU-TI / RI-RU-MA ~ RI-RU-MA-TI |
| 3 | QE | 2 | 0 | 0 | KA-PA ~ KA-PA-QE / SA-RO ~ SA-RO-QE |
| 4 | MI | 2 | 0 | 1 | JA-RE ~ JA-RE-MI / I-DA ~ I-DA-MI |
| 5 | PA | 2 | 0 | 1 | KA-KU ~ KA-KU-PA / A-RI ~ A-RI-PA |
| 6 | SA | 2 | 0 | 1 | QA-*118 ~ QA-*118-SA / A-JE ~ A-JE-SA |
| 7 | NE | 2 | 1 | 2 | *21F-TU ~ *21F-TU-NE / PA-RA ~ PA-RA-NE [warn] |
| 8 | RO | 2 | 1 | 2 | SA-MA ~ SA-MA-RO [warn] / A-DA ~ A-DA-RO |
| 9 | NA | 2 | 0 | 4 | PA3-NI ~ PA3-NI-NA / DA-KU ~ DA-KU-NA |
| 10 | RA | 2 | 0 | 4 | A-DA ~ A-DA-RA / MI-DA ~ MI-DA-RA |
| 11 | TE | 2 | 0 | 4 | SI-RU ~ SI-RU-TE / I-JA ~ I-JA-TE |
| 12 | *188 | 1 | 0 | 0 | SU-PU2 ~ SU-PU2-*188 |
| 13 | E | 1 | 0 | 0 | JA-SI ~ JA-SI-E |
| 14 | NI | 1 | 0 | 0 | MI-DA ~ MI-DA-NI |
| 15 | PU2 | 1 | 0 | 0 | TU-SU ~ TU-SU-PU2 |

## Interpretation

A surviving pair is a structural candidate, not a grammatical conclusion. Onomastic/designation warnings are displayed separately and require manual adjudication.
