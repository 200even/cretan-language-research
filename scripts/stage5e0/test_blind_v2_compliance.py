#!/usr/bin/env python3
"""Compliance tests for Stage 5E0 blind runner v2."""
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

HERE = Path(__file__).resolve().parent
SPEC = spec_from_file_location("blind_v2", HERE / "run_stage5e0_blind_v2.py")
MOD = module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MOD)


def test_concentration_raw_pass():
    q = MOD.concentration_audit([4] * 30)
    assert q["gate"]
    assert q["raw_share"] <= 0.05
    assert q["capped_share"] <= 0.05


def test_concentration_can_be_restored_by_preregistered_cap():
    # One dominant document plus 29 smaller positive documents. The deterministic
    # cap must restore the largest effective share to <=5%.
    q = MOD.concentration_audit([100] + [10] * 29)
    assert q["raw_share"] > 0.05
    assert q["gate"]
    assert q["capped_share"] <= 0.0500000001
    assert q["cap"] < 100
    assert q["effective_positive_weight"] > 0


def test_concentration_cannot_pass_with_too_few_positive_documents():
    q = MOD.concentration_audit([100] + [10] * 18)
    assert not q["gate"]


def test_stability_seeds_are_independent_and_deterministic():
    a = [MOD.seed("stability", "audit-tag", i) for i in range(MOD.STABILITY_N)]
    b = [MOD.seed("stability", "audit-tag", i) for i in range(MOD.STABILITY_N)]
    assert a == b
    assert len(a) == 100
    assert len(set(a)) == 100
