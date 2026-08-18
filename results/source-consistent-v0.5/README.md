# Source-consistent morphology v0.5

Candidate syllabic occurrences before masking: **1285**. Structurally retained occurrences: **938**; excluded: **347**.

Unique cleaned forms: **931**; unique retained forms: **672**.

v0.5 keeps the v0.4 ranking formulas unchanged; only the source-consistency mask is revised. Boundary enrichment and exact-paradigm evidence remain separate. Lexical warnings annotate but do not remove structurally secure pairs.

## Exclusion classes

| class | excluded occurrences |
|---|---:|
| physical_boundary | 327 |
| editorial_continuation | 9 |
| complex_logogram | 8 |
| non_linear_a_script | 2 |
| authoritative_source_boundary | 2 |
| segmented_fragment_flattening | 1 |

## prefix: boundary enrichment

| rank | sign | edge count | internal | log2 enrichment |
|---:|---|---:|---:|---:|
| 1 | *306 | 8 | 0 | 4.207 |
| 2 | *86 | 7 | 0 | 4.026 |
| 3 | *188 | 5 | 0 | 3.579 |
| 4 | *28B | 4 | 0 | 3.289 |
| 5 | *309 | 4 | 0 | 3.289 |
| 6 | A | 110 | 12 | 3.263 |
| 7 | *312 | 3 | 0 | 2.927 |
| 8 | *324 | 3 | 0 | 2.927 |
| 9 | *333 | 3 | 0 | 2.927 |
| 10 | *815 | 3 | 0 | 2.927 |
| 11 | WI | 7 | 1 | 2.441 |
| 12 | *309B | 2 | 0 | 2.441 |
| 13 | JE | 5 | 1 | 1.994 |
| 14 | U | 31 | 10 | 1.704 |
| 15 | *309C | 1 | 0 | 1.704 |

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
| 1 | RO | 60 | 6 | 3.338 |
| 2 | TA2 | 10 | 1 | 2.927 |
| 3 | *306 | 3 | 0 | 2.927 |
| 4 | RA2 | 39 | 7 | 2.516 |
| 5 | JE | 7 | 1 | 2.441 |
| 6 | *188 | 2 | 0 | 2.441 |
| 7 | *308 | 2 | 0 | 2.441 |
| 8 | *321 | 2 | 0 | 2.441 |
| 9 | *331 | 2 | 0 | 2.441 |
| 10 | *86 | 2 | 0 | 2.441 |
| 11 | *118 | 15 | 3 | 2.266 |
| 12 | ME | 19 | 4 | 2.235 |
| 13 | *305 | 5 | 1 | 1.994 |
| 14 | WI | 5 | 1 | 1.994 |
| 15 | *22M | 1 | 0 | 1.704 |

## suffix: structural exact paradigms

| rank | sign | secure pairs | warned | excluded | examples |
|---:|---|---:|---:|---:|---|
| 1 | JA | 5 | 1 | 3 | PA-SE ~ PA-SE-JA / A-SE ~ A-SE-JA / *306-TU ~ *306-TU-JA [warn] / KU-PA ~ KU-PA-JA / A-MA ~ A-MA-JA |
| 2 | TI | 3 | 0 | 2 | DA-KU-SE-NE ~ DA-KU-SE-NE-TI / JA-KU ~ JA-KU-TI / RI-RU-MA ~ RI-RU-MA-TI |
| 3 | MI | 2 | 0 | 1 | JA-RE ~ JA-RE-MI / I-DA ~ I-DA-MI |
| 4 | PA | 2 | 0 | 1 | KA-KU ~ KA-KU-PA / A-RI ~ A-RI-PA |
| 5 | SA | 2 | 0 | 1 | QA-*118 ~ QA-*118-SA / A-JE ~ A-JE-SA |
| 6 | NE | 2 | 1 | 2 | *21F-TU ~ *21F-TU-NE / PA-RA ~ PA-RA-NE [warn] |
| 7 | RO | 2 | 1 | 2 | SA-MA ~ SA-MA-RO [warn] / A-DA ~ A-DA-RO |
| 8 | NA | 2 | 0 | 4 | PA3-NI ~ PA3-NI-NA / DA-KU ~ DA-KU-NA |
| 9 | RA | 2 | 0 | 4 | A-DA ~ A-DA-RA / MI-DA ~ MI-DA-RA |
| 10 | TE | 2 | 0 | 4 | SI-RU ~ SI-RU-TE / I-JA ~ I-JA-TE |
| 11 | *188 | 1 | 0 | 0 | SU-PU2 ~ SU-PU2-*188 |
| 12 | E | 1 | 0 | 0 | JA-SI ~ JA-SI-E |
| 13 | NI | 1 | 0 | 0 | MI-DA ~ MI-DA-NI |
| 14 | PU2 | 1 | 0 | 0 | TU-SU ~ TU-SU-PU2 |
| 15 | ZA | 1 | 0 | 0 | A-DU ~ A-DU-ZA |

## Interpretation

A surviving pair is a structural candidate, not a grammatical conclusion. Onomastic/designation warnings are displayed separately and require manual adjudication.
