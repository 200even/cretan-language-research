# Kato Syme Distributional Data

This directory is reserved for the frozen input data used by the Kato Syme site-enrichment experiment and, if activated, the pan-Cretan rare ritual-register contingency.

## Required manifests before execution

The Phase A data freeze should include machine-readable tables for:

- Syme inscriptions and diplomatic transcriptions;
- comparison inscriptions;
- site metadata;
- chronology and chronological confidence;
- object/support class;
- archaeological context class;
- formula position/class;
- preservation and edge-security state;
- source/bibliographic provenance.

Recommended filenames:

- `syme-corpus.csv`
- `comparison-corpus.csv`
- `site-metadata.csv`
- `chronology.csv`
- `formula-mask.csv`
- `manifest.json`

## Discovery-data firewall

The frozen discovery dataset must not contain later interpretive labels such as:

- youth cult;
- initiation;
- kouros;
- later deity identity;
- Ephoran parallel;
- Sparta/Crete institutional correspondence.

These labels are prohibited because they could leak the historical target into comparison-site selection or clustering.

## Provenance requirements

Every inscription row must be traceable to a published or otherwise explicitly documented source. Damage, uncertain readings, restored signs, uncertain segmentation, and chronological uncertainty must remain machine-readable rather than being normalized away.

Before confirmatory execution, hash the complete frozen input manifest and record the hash in the experiment protocol/results README.