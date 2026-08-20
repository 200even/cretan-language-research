# Stage 5D

`run_stage5d_blind_network.py` implements the candidate-blind clean-v2.1 lexical-state graph used for Stage 5D.

Method lock and final outputs are in [`results/stage5d-clean-v2.1/`](../../results/stage5d-clean-v2.1/).

The script contains no historical candidate names or candidate-specific thresholds. Primitive edges are exact one-sign terminal extensions with base length >=2; multi-stage transitions require complete attested three-state ladders and never use skipped-state inference.
