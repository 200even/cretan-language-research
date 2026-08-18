# v0.5 regression evaluation

Frozen structural/source negatives excluded: **30/30**.

Frozen secure controls retained: **13/13**.

| benchmark | expectation | pair | observed | exclusion class | pass |
|---|---|---|---|---|---|
| MB-RO-001 | exclude_structural | KI-DA ~ KI-DA-RO | excluded_structural_base | physical_boundary | yes |
| MB-RO-002 | exclude_structural | DI-NA ~ DI-NA-RO | excluded_structural_base | physical_boundary | yes |
| MB-TE-001 | exclude_structural | DU-RI ~ DU-RI-TE | excluded_structural_both | physical_boundary | yes |
| MB-TE-003 | exclude_structural | KU-NI ~ KU-NI-TE | excluded_structural_base | physical_boundary | yes |
| MB-TE-005 | exclude_structural | A-DI-KI-TE ~ A-DI-KI-TE-TE | excluded_structural_both | physical_boundary | yes |
| MB-TE-006 | exclude_structural | A-TA-NA ~ A-TA-NA-TE | excluded_structural_base | physical_boundary | yes |
| MB-RE-002 | exclude_structural | KI-*310 ~ KI-*310-RE | excluded_structural_base | physical_boundary | yes |
| MB-RE-003 | exclude_structural | TE-JA ~ TE-JA-RE | excluded_structural_base | physical_boundary | yes |
| MB-RE-004 | exclude_structural | A-DU ~ A-DU-RE | excluded_structural_variant | physical_boundary | yes |
| MB-RE-005 | exclude_structural | DU-RA ~ DU-RA-RE | excluded_structural_base | physical_boundary | yes |
| MB-RE-006 | exclude_structural | A-TA ~ A-TA-RE | excluded_structural_base | physical_boundary | yes |
| MB-A-001 | exclude_structural | RA-NA-RE ~ A-RA-NA-RE | excluded_structural_base | physical_boundary | yes |
| MB-A-007 | exclude_structural | DA-RA ~ A-DA-RA | excluded_structural_base | physical_boundary | yes |
| MB-A-008 | exclude_structural | RI-JA ~ A-RI-JA | excluded_structural_both | physical_boundary | yes |
| MB-I-002 | exclude_structural | KI-RA ~ I-KI-RA | excluded_structural_variant | physical_boundary | yes |
| MB-I-004 | exclude_structural | KU-TA ~ I-KU-TA | excluded_structural_base | physical_boundary | yes |
| MB-I-006 | exclude_structural | JA-PA ~ I-JA-PA | excluded_structural_variant | physical_boundary | yes |
| MB-I-007 | exclude_structural | KU-PI ~ I-KU-PI | excluded_structural_variant | physical_boundary | yes |
| MB-TI-002 | exclude_structural | SA-MA ~ SA-MA-TI | excluded_structural_variant | physical_boundary | yes |
| MB-TI-005 | exclude_structural | QA-KI ~ QA-KI-TI | excluded_structural_base | physical_boundary | yes |
| MB-JA-006 | exclude_structural | JA-SA ~ JA-SA-JA | excluded_structural_base | editorial_continuation|non_linear_a_script|physical_boundary | yes |
| MB-JA-007 | exclude_structural | PU2-RE ~ PU2-RE-JA | excluded_structural_both | authoritative_source_boundary | yes |
| MB-ME-002 | exclude_structural | JA-SA-SA-RA ~ JA-SA-SA-RA-ME | excluded_structural_base | editorial_continuation | yes |
| MB-ME-003 | exclude_structural | MA-RU ~ MA-RU-ME | excluded_structural_variant | complex_logogram | yes |
| MB-ME-004 | exclude_structural | SA-RA ~ SA-RA-ME | excluded_structural_both | editorial_continuation|non_linear_a_script|physical_boundary | yes |
| MB-NE-002 | exclude_structural | QE-TU ~ QE-TU-NE | excluded_structural_base | physical_boundary | yes |
| MB-NE-003 | exclude_structural | PA-TA ~ PA-TA-NE | excluded_structural_base | physical_boundary | yes |
| MB-QE-002 | exclude_structural | SA-RO ~ SA-RO-QE | excluded_structural_variant | physical_boundary | yes |
| MB-SU-001 | exclude_structural | KU-NI ~ KU-NI-SU | excluded_structural_base | physical_boundary | yes |
| MB-WI-001 | exclude_structural | JA-DI ~ JA-DI-WI | excluded_structural_variant | segmented_fragment_flattening | yes |
| MB-A-002 | retain_secure | KA-RU ~ A-KA-RU | accepted_secure | physical_boundary | yes |
| MB-A-006 | retain_secure | SI-KI-RA ~ A-SI-KI-RA | accepted_secure |  | yes |
| MB-A-009 | retain_secure | TA-NA-TE ~ A-TA-NA-TE | accepted_secure |  | yes |
| MB-I-005 | retain_secure | QA-*118 ~ I-QA-*118 | accepted_secure |  | yes |
| MB-I-008 | retain_secure | DA-MA-TE ~ I-DA-MA-TE | accepted_secure | physical_boundary | yes |
| MB-TI-001 | retain_secure | DA-KU-SE-NE ~ DA-KU-SE-NE-TI | accepted_secure | physical_boundary | yes |
| MB-JA-001 | retain_secure | PA-SE ~ PA-SE-JA | accepted_secure | physical_boundary | yes |
| MB-JA-002 | retain_secure | KU-PA ~ KU-PA-JA | accepted_secure | physical_boundary | yes |
| MB-NE-001 | retain_secure | *21F-TU ~ *21F-TU-NE | accepted_secure |  | yes |
| MB-ME-001 | retain_secure | A-RA-TU ~ A-RA-TU-ME | accepted_secure |  | yes |
| MB-QE-001 | retain_secure | KA-PA ~ KA-PA-QE | accepted_secure | physical_boundary | yes |
| MB-SU-002 | retain_secure | A-RI ~ A-RI-SU | accepted_secure | physical_boundary | yes |
| MB-WI-002 | retain_secure | PA3-NI ~ PA3-NI-WI | accepted_secure |  | yes |

**Regression status: PASS.**
