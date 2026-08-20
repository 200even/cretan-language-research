#!/usr/bin/env python3
"""
Preregistration v0.7b — candidate-blind synthetic calibration.

IMPORTANT:
- This program never names or queries any real candidate sign.
- Input is the already-clean SigLA word-token CSV from Step 2.
- Primary support stratum is frozen to Tablet/Nodule/Roundel, length 2..8.
- It calibrates a novel synthetic terminal sign and a boundary-independent null flag.
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import numpy as np
import pandas as pd
import scipy.sparse as sp
from scipy.stats import beta
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder

PRIMARY_TYPES = {"Tablet", "Nodule", "Roundel"}
MIN_LEN = 2
MAX_LEN = 8
DUMMY = "§DUMMY"
C = 1.0
MAX_ITER = 100
BOOT_B = 1500
N_REP = 20
RATES = (0.02, 0.05, 0.10, 0.20)
SEED0 = {0.02: 40000, 0.05: 50000, 0.10: 30000, 0.20: 60000}
NULL_SEED0 = 70000
NULL_POSITION_RATE = 0.035


def exact_binomial_ci(k: int, n: int, alpha: float = 0.05) -> tuple[float, float]:
    lo = 0.0 if k == 0 else float(beta.ppf(alpha / 2, k, n - k + 1))
    hi = 1.0 if k == n else float(beta.ppf(1 - alpha / 2, k + 1, n - k))
    return lo, hi


def prepare_tokens(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    df["signs"] = df["signs_json"].map(json.loads)
    df["n"] = df["signs"].map(len)
    df = df[
        df["typology"].isin(PRIMARY_TYPES)
        & df["n"].between(MIN_LEN, MAX_LEN)
    ].copy()
    df["site_norm"] = df["site"].astype(str).str.upper()

    # Frozen dependence cap: total effective weight <=2 per site+ORIGINAL word form.
    n_group = df.groupby(["site_norm", "token_text"])["token_text"].transform("size").astype(float)
    df["weight"] = np.minimum(1.0, 2.0 / n_group)
    return df


def positions(tokens: pd.DataFrame, injected: np.ndarray | None = None) -> pd.DataFrame:
    if injected is None:
        injected = np.zeros(len(tokens), dtype=bool)
    rows = []
    for inj, (_, r) in zip(injected, tokens.iterrows()):
        signs = list(r["signs"])
        if inj:
            signs.append(DUMMY)
        L = len(signs)
        for pos, current in enumerate(signs, start=1):
            prev = "<START>" if pos == 1 else signs[pos - 2]
            rows.append(
                (
                    str(r["document_id"]),
                    str(r["site_norm"]),
                    float(r["weight"]),
                    prev,
                    pos,
                    current,
                    int(pos == L),
                    int(current == DUMMY),
                )
            )
    return pd.DataFrame(
        rows,
        columns=["doc", "site", "weight", "prev", "pos", "current", "terminal", "cand"],
    )


def cv_delta(pos: pd.DataFrame) -> np.ndarray:
    """
    Leave-one-document-out held-out weighted ΔLL.

    Null: previous sign + position from word start.
    Alternative: null + candidate indicator.
    """
    enc = OneHotEncoder(handle_unknown="ignore", sparse_output=True)
    x0 = enc.fit_transform(pos[["prev", "pos"]].astype(str))
    cand = sp.csr_matrix(pos[["cand"]].to_numpy(dtype=float))
    x1 = sp.hstack([x0, cand], format="csr")

    y = pos["terminal"].to_numpy(dtype=int)
    w = pos["weight"].to_numpy(dtype=float)
    groups = pos["doc"].to_numpy()
    docs = np.unique(groups)
    out = np.empty(len(docs), dtype=float)
    eps = 1e-12

    for i, doc in enumerate(docs):
        test = np.flatnonzero(groups == doc)
        train = np.flatnonzero(groups != doc)

        m0 = LogisticRegression(C=C, solver="liblinear", max_iter=MAX_ITER)
        m1 = LogisticRegression(C=C, solver="liblinear", max_iter=MAX_ITER)
        m0.fit(x0[train], y[train], sample_weight=w[train])
        m1.fit(x1[train], y[train], sample_weight=w[train])

        p0 = np.clip(m0.predict_proba(x0[test])[:, 1], eps, 1 - eps)
        p1 = np.clip(m1.predict_proba(x1[test])[:, 1], eps, 1 - eps)
        yy, ww = y[test], w[test]

        ll0 = np.sum(ww * (yy * np.log(p0) + (1 - yy) * np.log(1 - p0)))
        ll1 = np.sum(ww * (yy * np.log(p1) + (1 - yy) * np.log(1 - p1)))
        out[i] = ll1 - ll0

    return out


def bootstrap_ci(deltas: np.ndarray, seed: int, b: int = BOOT_B) -> tuple[float, float]:
    rng = np.random.default_rng(seed)
    n = len(deltas)
    sums = np.empty(b)
    batch = 500
    for start in range(0, b, batch):
        m = min(batch, b - start)
        idx = rng.integers(0, n, size=(m, n))
        sums[start : start + m] = deltas[idx].sum(axis=1)
    return float(np.quantile(sums, 0.005)), float(np.quantile(sums, 0.995))


def one_suffix_run(tokens: pd.DataFrame, rate: float, seed: int) -> dict:
    rng = np.random.default_rng(seed)
    injected = rng.random(len(tokens)) < rate
    pos = positions(tokens, injected)
    deltas = cv_delta(pos)
    lo, hi = bootstrap_ci(deltas, seed + 10_000_000)
    return {
        "rate": rate,
        "seed": seed,
        "n_injected": int(injected.sum()),
        "delta_ll": float(deltas.sum()),
        "ci99_lo": lo,
        "ci99_hi": hi,
        "recovered": bool(lo > 0),
    }


def one_null_run(tokens: pd.DataFrame, seed: int) -> dict:
    pos = positions(tokens)
    rng = np.random.default_rng(seed)
    # Synthetic candidate flag is independent of boundary; strings remain unchanged.
    pos["cand"] = (rng.random(len(pos)) < NULL_POSITION_RATE).astype(int)
    deltas = cv_delta(pos)
    lo, hi = bootstrap_ci(deltas, seed + 10_000_000)
    return {
        "seed": seed,
        "n_flagged": int(pos["cand"].sum()),
        "delta_ll": float(deltas.sum()),
        "ci99_lo": lo,
        "ci99_hi": hi,
        "false_positive": bool(lo > 0),
    }


def classify_structural(relations: list[str]) -> str:
    factor = any(r in {"HEADER_PARENT", "SECTION_PARENT"} for r in relations)
    trunc = "FULL_THEN_SHORT_REPEAT_SAME_LEVEL" in relations
    if factor and trunc:
        return "MIXED"
    if factor:
        return "FACTORIZATION"
    if trunc:
        return "TRUNCATION"
    return "INDETERMINATE"


def structural_logic_control(seed: int = 88001, n: int = 1000) -> dict:
    rng = np.random.default_rng(seed)
    noise_labels = ["PARALLEL_ENTRY", "UNRELATED", "SHORT_THEN_FULL_SAME_LEVEL", "UNKNOWN"]
    results = {}
    for expected in ("FACTORIZATION", "TRUNCATION", "INDETERMINATE", "MIXED"):
        correct = 0
        for _ in range(n):
            noise = list(rng.choice(noise_labels, size=int(rng.integers(0, 4)), replace=True))
            if expected == "FACTORIZATION":
                rel = noise + [str(rng.choice(["HEADER_PARENT", "SECTION_PARENT"]))]
            elif expected == "TRUNCATION":
                rel = noise + ["FULL_THEN_SHORT_REPEAT_SAME_LEVEL"]
            elif expected == "MIXED":
                rel = noise + ["HEADER_PARENT", "FULL_THEN_SHORT_REPEAT_SAME_LEVEL"]
            else:
                rel = noise
            correct += classify_structural(rel) == expected
        results[expected] = {"correct": correct, "n": n, "accuracy": correct / n}
    return results


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("clean_csv", type=Path)
    ap.add_argument("--out-dir", type=Path, default=Path("data/calibration"))
    args = ap.parse_args()
    args.out_dir.mkdir(parents=True, exist_ok=True)

    tokens = prepare_tokens(args.clean_csv)

    positive = []
    for rate in RATES:
        for i in range(N_REP):
            positive.append(one_suffix_run(tokens, rate, SEED0[rate] + i))
    pos_df = pd.DataFrame(positive)
    pos_df.to_csv(args.out_dir / "synthetic_suffix_runs.csv", index=False)

    curve = []
    for rate, g in pos_df.groupby("rate"):
        k, n = int(g["recovered"].sum()), len(g)
        lo, hi = exact_binomial_ci(k, n)
        curve.append(
            {
                "rate": float(rate),
                "recovered": k,
                "replicates": n,
                "power_hat": k / n,
                "power_ci95_lo": lo,
                "power_ci95_hi": hi,
                "mean_injected": float(g["n_injected"].mean()),
                "mean_delta_ll": float(g["delta_ll"].mean()),
                "min_ci99_lo": float(g["ci99_lo"].min()),
            }
        )
    curve_df = pd.DataFrame(curve)
    curve_df.to_csv(args.out_dir / "power_curve_results.csv", index=False)

    null = [one_null_run(tokens, NULL_SEED0 + i) for i in range(N_REP)]
    null_df = pd.DataFrame(null)
    null_df.to_csv(args.out_dir / "negative_control_runs.csv", index=False)

    struct = structural_logic_control()

    ten = curve_df.loc[np.isclose(curve_df["rate"], 0.10)].iloc[0]
    hard_stop = bool(ten["power_hat"] >= 0.80 and ten["power_ci95_lo"] > 0.80)

    report = {
        "candidate_blind": True,
        "primary_types": sorted(PRIMARY_TYPES),
        "length_range": [MIN_LEN, MAX_LEN],
        "eligible_tokens": len(tokens),
        "documents": int(tokens["document_id"].nunique()),
        "distinct_types": int(tokens["token_text"].nunique()),
        "effective_token_weight": float(tokens["weight"].sum()),
        "power_curve": curve,
        "hard_stop_passed": hard_stop,
        "negative_false_positives": int(null_df["false_positive"].sum()),
        "negative_replicates": len(null_df),
        "structural_logic_control": struct,
    }
    (args.out_dir / "calibration_report.json").write_text(
        json.dumps(report, indent=2) + "\n", encoding="utf-8"
    )

    print(json.dumps(report, indent=2))
    return 0 if hard_stop else 2


if __name__ == "__main__":
    raise SystemExit(main())
