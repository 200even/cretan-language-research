# v0.3 regression evaluation

Known damage-created/insecure pairs removed: **19/20**.

Strong secure positives retained: **6/6**.

| benchmark | expectation | pair | observed | pass |
|---|---|---|---|---|
| MB-RO-001 | exclude_damage | KI-DA ~ KI-DA-RO | excluded_insecure_base | yes |
| MB-RO-002 | exclude_damage | DI-NA ~ DI-NA-RO | excluded_insecure_base | yes |
| MB-TE-001 | exclude_damage | DU-RI ~ DU-RI-TE | excluded_insecure_both | yes |
| MB-TE-003 | exclude_damage | KU-NI ~ KU-NI-TE | accepted_secure | no |
| MB-TE-005 | exclude_damage | A-DI-KI-TE ~ A-DI-KI-TE-TE | excluded_insecure_both | yes |
| MB-TE-006 | exclude_damage | A-TA-NA ~ A-TA-NA-TE | excluded_insecure_base | yes |
| MB-RE-002 | exclude_damage | KI-*310 ~ KI-*310-RE | excluded_insecure_base | yes |
| MB-RE-003 | exclude_damage | TE-JA ~ TE-JA-RE | excluded_insecure_base | yes |
| MB-RE-004 | exclude_damage | A-DU ~ A-DU-RE | excluded_insecure_variant | yes |
| MB-RE-005 | exclude_damage | DU-RA ~ DU-RA-RE | excluded_insecure_base | yes |
| MB-RE-006 | exclude_damage | A-TA ~ A-TA-RE | excluded_insecure_base | yes |
| MB-A-001 | exclude_damage | RA-NA-RE ~ A-RA-NA-RE | excluded_insecure_base | yes |
| MB-A-007 | exclude_damage | DA-RA ~ A-DA-RA | excluded_insecure_base | yes |
| MB-A-008 | exclude_damage | RI-JA ~ A-RI-JA | excluded_insecure_both | yes |
| MB-I-002 | exclude_damage | KI-RA ~ I-KI-RA | excluded_insecure_variant | yes |
| MB-I-004 | exclude_damage | KU-TA ~ I-KU-TA | excluded_insecure_base | yes |
| MB-I-006 | exclude_damage | JA-PA ~ I-JA-PA | excluded_insecure_variant | yes |
| MB-I-007 | exclude_damage | KU-PI ~ I-KU-PI | excluded_insecure_variant | yes |
| MB-TI-002 | exclude_damage | SA-MA ~ SA-MA-TI | excluded_insecure_variant | yes |
| MB-TI-005 | exclude_damage | QA-KI ~ QA-KI-TI | excluded_insecure_base | yes |
| MB-A-002 | retain_secure | KA-RU ~ A-KA-RU | accepted_secure | yes |
| MB-A-006 | retain_secure | SI-KI-RA ~ A-SI-KI-RA | accepted_secure | yes |
| MB-A-009 | retain_secure | TA-NA-TE ~ A-TA-NA-TE | accepted_secure | yes |
| MB-I-005 | retain_secure | QA-*118 ~ I-QA-*118 | accepted_secure | yes |
| MB-I-008 | retain_secure | DA-MA-TE ~ I-DA-MA-TE | accepted_secure | yes |
| MB-TI-001 | retain_secure | DA-KU-SE-NE ~ DA-KU-SE-NE-TI | accepted_secure | yes |

**Regression status: FAIL (1 cases).**
