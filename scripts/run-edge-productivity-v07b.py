#!/usr/bin/env python3
"""
Locked v0.7b real-candidate runner.

This program applies the same model architecture used in the candidate-blind
synthetic calibration. It does not repair or reinterpret the input corpus.
Any epigraphic cleaning must occur upstream and be separately versioned.

Primary stratum: Tablet/Nodule/Roundel, word length 2..8.
Weight cap: min(1, 2 / n(site + original word-form)).
Null: previous sign + position from word start.
Alternative: null + candidate-sign indicator.
Inference: leave-one-document-out held-out weighted ΔLL with 1,500
document-bootstrap resamples; 99% CI.
"""

from __future__ import annotations
import argparse, json
from pathlib import Path

import numpy as np
import pandas as pd
import scipy.sparse as sp
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder

PRIMARY_TYPES = {"Tablet", "Nodule", "Roundel"}
MIN_LEN, MAX_LEN = 2, 8
C = 1.0
MAX_ITER = 100
BOOT_B = 1500

def prepare(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    df["signs"] = df["signs_json"].map(json.loads)
    df["n"] = df["signs"].map(len)
    df = df[df["typology"].isin(PRIMARY_TYPES) & df["n"].between(MIN_LEN, MAX_LEN)].copy()
    df["site_norm"] = df["site"].astype(str).str.upper()
    n = df.groupby(["site_norm", "token_text"])["token_text"].transform("size").astype(float)
    df["weight"] = np.minimum(1.0, 2.0 / n)
    return df

def positions(tokens: pd.DataFrame, candidate: str) -> pd.DataFrame:
    rows = []
    for _, r in tokens.iterrows():
        signs = list(r["signs"])
        L = len(signs)
        for pos, current in enumerate(signs, start=1):
            prev = "<START>" if pos == 1 else signs[pos - 2]
            rows.append((str(r["document_id"]), float(r["weight"]), prev, pos,
                         current, int(pos == L), int(current == candidate)))
    return pd.DataFrame(rows, columns=["doc","weight","prev","pos","current","terminal","cand"])

def cv_delta(pos: pd.DataFrame) -> np.ndarray:
    enc = OneHotEncoder(handle_unknown="ignore", sparse_output=True)
    x0 = enc.fit_transform(pos[["prev","pos"]].astype(str))
    x1 = sp.hstack([x0, sp.csr_matrix(pos[["cand"]].to_numpy(dtype=float))], format="csr")
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
        p0 = np.clip(m0.predict_proba(x0[test])[:,1], eps, 1-eps)
        p1 = np.clip(m1.predict_proba(x1[test])[:,1], eps, 1-eps)
        yy, ww = y[test], w[test]
        ll0 = np.sum(ww * (yy*np.log(p0) + (1-yy)*np.log(1-p0)))
        ll1 = np.sum(ww * (yy*np.log(p1) + (1-yy)*np.log(1-p1)))
        out[i] = ll1 - ll0
    return out

def bootstrap_ci(deltas: np.ndarray, seed: int) -> tuple[float,float]:
    rng = np.random.default_rng(seed)
    n = len(deltas)
    sums = np.empty(BOOT_B)
    for i in range(BOOT_B):
        sums[i] = deltas[rng.integers(0, n, size=n)].sum()
    return float(np.quantile(sums, .005)), float(np.quantile(sums, .995))

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("clean_csv", type=Path)
    ap.add_argument("--candidate", required=True)
    ap.add_argument("--bootstrap-seed", type=int, required=True)
    args = ap.parse_args()

    tokens = prepare(args.clean_csv)
    pos = positions(tokens, args.candidate)
    deltas = cv_delta(pos)
    lo, hi = bootstrap_ci(deltas, args.bootstrap_seed)
    cand = pos[pos["cand"] == 1]
    result = {
        "candidate": args.candidate,
        "sign_occurrences": int(len(cand)),
        "terminal_occurrences": int(cand["terminal"].sum()),
        "delta_ll": float(deltas.sum()),
        "ci99": [lo, hi],
        "bootstrap_seed": args.bootstrap_seed,
        "recovered": bool(lo > 0),
        "status_note": "Interpret only on an independently validated epigraphically clean input corpus."
    }
    print(json.dumps(result, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
