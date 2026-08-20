# Stage 5D Preregistration Lock — clean-v2.1 Morphotactic Network

Date frozen: 2026-08-20
Status: PRE-UNBLINDING METHOD LOCK

## Question
Do recurrent ordered terminal-extension relationships survive the Phase 1B diplomatic repair strongly enough to support a candidate-blind morphotactic network?

This experiment does not test semantic or grammatical functions and does not attempt to rescue any previously interesting sign.

## Frozen corpus
- Source: `sigla_tokens_clean_v2_1.csv`
- Expected SHA-256: `83298a8c5b8f852edaf8d0f25bcc7affb07a71aa27561169f5152ad5bf28b3c9`
- Full clean-v2.1 corpus: 580 tokens.
- Primary promotion stratum: Tablet/Nodule/Roundel, word length 2–8.
- Non-primary material is analyzed separately and is never pooled with the primary stratum for promotion.

Diplomatic structural source:
- `lineara_diplomatic_edge_census.csv`
- Expected SHA-256: `7f116db2b32eeaf1c639e0c54f0c4755c6b4144e4ddf03c17af51e9121f0c8f5`
- Upstream commit: `43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a`

## Primitive lexical-state graph
A node is a complete, boundary-secure word type in one frozen stratum.

A primitive directed edge A -> B exists iff:
1. A and B are independently attested complete word types in the same stratum;
2. B is exactly A plus ONE terminal sign;
3. len(A) >= 2 signs.

No skipped-state inference is permitted.

## Topology
- CHAIN witness: X, X-Y, X-Y-Z all independently attested, yielding X -> X-Y -> X-Y-Z.
- SIBLING witness: one parent X has two or more immediate terminal extensions X-Y, X-W, ... .
- MIXED motif: both path and fan-out relations occur.

An abstract second-stage transition Y -> Z may be proposed only from complete attested ladders X -> X-Y -> X-Y-Z. It is never inferred from X and X-Y-Z alone, from terminal co-occurrence, or from separate one-stage edges on different stems.

## Referee-mandated promotion rule for a simple terminal extension sign
All conditions are mandatory:
1. Stem Robustness: every promoted witness base has length >= 2 signs.
2. Dual Independence: the same terminal extension occurs on >= 2 distinct base stems and across >= 2 distinct documents.
3. Factorization Clearance: at least one independent witness must be demonstrably free of hierarchical factorization/truncation. Automatic clearance is allowed only when the EXTENDED form has an attestation on a diplomatic document containing exactly one lexical word. Otherwise this criterion remains REVIEW_REQUIRED until a targeted coordinate/parallel/isolated structural audit clears it.
4. No Superseding Epigraphy: no higher-priority epigraphic explanation accounts for all witnesses. This is NEVER assumed automatically; candidate edges that pass the computational gates remain EPIGRAPHY_REVIEW_REQUIRED until audited.

Anything failing any condition is Level 1 exploratory orthographic pattern.

## Additional promotion rule for an abstract multi-stage transition Y -> Z
In addition to all rules above, promotion requires >= 2 distinct robust base stems X1 != X2 each independently instantiating the COMPLETE ladder:
- X1 -> X1-Y -> X1-Y-Z
- X2 -> X2-Y -> X2-Y-Z

The top forms X-Y-Z must span >= 2 distinct documents. At least one ladder must clear factorization, and no superseding epigraphic explanation may account for all ladders.

One complete ladder is ORTHOGRAPHIC_CHAIN / Level 1. Evidence assembled from incomplete ladders is PARTIAL_CHAIN_EVIDENCE / Level 1.

## Blinding
The blind-generation code contains no historical candidate names or candidate-specific thresholds. Sign identities are replaced by opaque blind IDs in the pre-unblinding abstract outputs. The sign-key file is written separately and is not inspected until:
- the script is frozen and hashed;
- blind outputs are generated and hashed;
- aggregate topology counts are recorded.

Only then may historical hypotheses be unblinded and compared with the new network.

## Dependence and documents
Token multiplicity is reported, but promotion is based on distinct base types and distinct documents, not raw repetition counts. Site support is reported as a separate robustness dimension and is not substituted for the mandatory document criterion.

## Interpretation ceiling
A validated edge establishes a replicated formal morphotactic relation only. It does not license labels such as suffix, plural, case, tense, agreement, derivation, clitic, or compound without a later independent structural/grammatical gate.

Phase 6 remains CLOSED regardless of Stage 5D outcome.
