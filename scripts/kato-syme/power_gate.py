#!/usr/bin/env python3
"""Exact upper-bound power calculation for Kato Syme Phase A.

This script uses no real candidate identities or frequencies. It evaluates the frozen
minimum qualifying effect (true odds ratio = 4) under inscription-level binomial
presence/absence, one-sided Fisher exact testing, recurrence >= 2 Syme inscriptions,
and observed OR >= 4.

Because this omits BH/FDR correction, preservation loss, chronology matching, and
object/formula stratification, it is deliberately optimistic: failure to reach 80%
here is sufficient to fail the preregistered power gate.
"""
from __future__ import annotations

import math
import numpy as np
from scipy.stats import binom, fisher_exact

N_SYME = 11
CONTROL_COUNTS = [29, 35, 50, 100]
TRUE_OR = 4.0
ALPHA = 0.05
MIN_SYME_RECURRENCE = 2
TARGET_POWER = 0.80
GRID = np.arange(0.001, 0.800, 0.001)


def rejection_matrix(n_syme: int, n_control: int) -> np.ndarray:
    out = np.zeros((n_syme + 1, n_control + 1), dtype=bool)
    for a in range(n_syme + 1):
        for c in range(n_control + 1):
            b, d = n_syme - a, n_control - c
            _, p = fisher_exact([[a, b], [c, d]], alternative="greater")
            if b * c == 0:
                observed_or = math.inf if a * d > 0 else 0.0
            else:
                observed_or = (a * d) / (b * c)
            out[a, c] = (
                a >= MIN_SYME_RECURRENCE
                and observed_or >= TRUE_OR
                and p <= ALPHA
            )
    return out


def max_exact_power(n_syme: int, n_control: int) -> tuple[float, float, float]:
    reject = rejection_matrix(n_syme, n_control)
    a_values = np.arange(n_syme + 1)
    c_values = np.arange(n_control + 1)
    best = (0.0, -1.0, 0.0)
    for p_control in GRID:
        p_syme = TRUE_OR * p_control / (1 - p_control + TRUE_OR * p_control)
        pa = binom.pmf(a_values, n_syme, p_syme)
        pc = binom.pmf(c_values, n_control, p_control)
        power = float((pa[:, None] * pc[None, :] * reject).sum())
        if power > best[1]:
            best = (float(p_control), power, float(p_syme))
    return best


if __name__ == "__main__":
    print("n_syme,n_control,true_or,max_power,p_control_at_max,p_syme_at_max,passes_80pct")
    for n_control in CONTROL_COUNTS:
        p_c, power, p_s = max_exact_power(N_SYME, n_control)
        print(
            f"{N_SYME},{n_control},{TRUE_OR:.1f},{power:.6f},"
            f"{p_c:.3f},{p_s:.6f},{str(power >= TARGET_POWER).lower()}"
        )
