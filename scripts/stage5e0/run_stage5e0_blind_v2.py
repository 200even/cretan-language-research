#!/usr/bin/env python3
"""Stage 5E0 blind structural-morphology calibration, preregistration-compliant v2.

Consumes only the anonymized structural-role CSV emitted by extract_structural_roles.py.
No word spellings, Greek analyses, logogram identities, number values, series names,
or semantic labels are available here.

V2 was created BEFORE inspection of any Stage 5E0 blind outcome. It changes only two
mechanics found by implementation QA to be weaker than the frozen protocol:
(1) the 5% positive-document concentration gate is now enforced, with a deterministic
    cap allowed exactly as preregistered; and
(2) stability is now evaluated with 100 independently hash-derived document-block
    bootstrap seeds rather than the first 100 draws of the 10,000-draw CI stream.
No roles, predictors, effect thresholds, model family, power target, or alpha changed.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.optimize import brentq
from scipy.stats import beta
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

ROLES = [f"SR{i:02d}" for i in range(1, 10)]
SITES = ["Pylos", "Knossos"]
DIRECTIONS = {
    "suffix": ("suffix_edge_id", "suffix_stem_group"),
    "prefix": ("prefix_edge_id", "prefix_stem_group"),
}
ALPHA = 0.01
BOOT_N = 10000
STABILITY_N = 100
CONCENTRATION_MAX = 0.05
SALT = "stage5e0-blind-model-v1-2026-08-20"


def seed(*x):
    return int(
        hashlib.sha256((SALT + "|" + "|".join(map(str, x))).encode()).hexdigest()[:16], 16
    ) % (2**32 - 1)


def load(path):
    d = pd.read_csv(path)
    d = d[(d.secure == 1) & d.site.isin(SITES)].copy()
    for c in ["word_length", "document_word_count", "document_line_count", "line_index_norm"] + ROLES:
        d[c] = pd.to_numeric(d[c], errors="coerce")
    return d.dropna().reset_index(drop=True)


def concentration_audit(counts):
    """Return raw and capped positive-document concentration.

    The frozen rule permits a role whose raw maximum exceeds 5% only if deterministic
    down-weighting can restore every document to <=5% of effective positive mass.
    We choose the largest common cap that satisfies the rule, preserving maximum mass.
    """
    v = np.asarray(list(counts), dtype=float)
    if len(v) == 0 or v.sum() <= 0:
        return dict(
            raw_share=1.0,
            cap=None,
            capped_share=1.0,
            effective_positive_weight=0.0,
            gate=False,
        )
    raw = float(v.max() / v.sum())
    if raw <= CONCENTRATION_MAX + 1e-12:
        return dict(
            raw_share=raw,
            cap=float(v.max()),
            capped_share=raw,
            effective_positive_weight=float(v.sum()),
            gate=True,
        )
    # Even equal weighting cannot reach <=5% if fewer than 20 positive documents.
    if 1.0 / len(v) > CONCENTRATION_MAX + 1e-12:
        return dict(
            raw_share=raw,
            cap=0.0,
            capped_share=1.0 / len(v),
            effective_positive_weight=0.0,
            gate=False,
        )
    lo, hi = 0.0, float(v.max())
    for _ in range(100):
        mid = (lo + hi) / 2.0
        w = np.minimum(v, mid)
        share = float(w.max() / w.sum()) if w.sum() else 1.0
        # Share is nondecreasing with the cap. Keep the largest passing cap.
        if share <= CONCENTRATION_MAX + 1e-12:
            lo = mid
        else:
            hi = mid
    cap = lo
    w = np.minimum(v, cap)
    capped = float(w.max() / w.sum()) if w.sum() else 1.0
    return dict(
        raw_share=raw,
        cap=float(cap),
        capped_share=capped,
        effective_positive_weight=float(w.sum()),
        gate=bool(capped <= CONCENTRATION_MAX + 1e-10 and w.sum() > 0),
    )


def census(d):
    out = []
    for s in SITES:
        x = d[d.site == s]
        for r in ROLES:
            p = x[x[r] == 1]
            n = x[x[r] == 0]
            b = p.groupby("doc_group").size()
            ca = concentration_audit(b.values)
            basic = bool(len(p) >= 100 and len(n) >= 100 and p.doc_group.nunique() >= 30)
            out.append(
                dict(
                    site=s,
                    role=r,
                    n=len(x),
                    positive=len(p),
                    negative=len(n),
                    positive_docs=p.doc_group.nunique(),
                    max_positive_doc_share=ca["raw_share"],
                    concentration_cap=ca["cap"],
                    capped_max_positive_doc_share=ca["capped_share"],
                    concentration_effective_positive_weight=ca["effective_positive_weight"],
                    concentration_gate=ca["gate"],
                    abundance_gate=bool(basic and ca["gate"]),
                )
            )
    return out


def weights(d, r):
    pc = d[d[r] == 1].groupby("doc_group").size()
    cap = max(float(np.median(pc.values)) if len(pc) else 1, 1)
    dc = d.groupby("doc_group").size().to_dict()
    return np.array([min(1.0, cap / max(float(dc[q]), 1)) for q in d.doc_group])


def components(d, stem):
    par, rank = {}, {}

    def add(x):
        if x not in par:
            par[x] = x
            rank[x] = 0

    def find(x):
        while par[x] != x:
            par[x] = par[par[x]]
            x = par[x]
        return x

    def uni(a, b):
        a, b = find(a), find(b)
        if a == b:
            return
        if rank[a] < rank[b]:
            a, b = b, a
        par[b] = a
        if rank[a] == rank[b]:
            rank[a] += 1

    for st, doc in zip(d[stem].astype(str), d.doc_group.astype(str)):
        a, b = "S:" + st, "D:" + doc
        add(a)
        add(b)
        uni(a, b)
    roots = [find("D:" + q) for q in d.doc_group.astype(str)]
    u = sorted(set(roots))
    ids = {r: i for i, r in enumerate(u)}
    g = np.array([ids[r] for r in roots])
    c = Counter(g.tolist())
    return g, dict(
        components=len(u),
        largest_component_rows=max(c.values()) if c else 0,
        largest_component_share=max(c.values()) / len(d) if c else 0,
    )


def folds(d, g, kmax=5):
    cc = defaultdict(list)
    for i, x in enumerate(g):
        cc[int(x)].append(i)
    if len(cc) < 2:
        return np.zeros(len(d), int), 1
    k = min(kmax, len(cc))
    fs = [0] * k
    f = np.empty(len(d), int)
    for q, idx in sorted(cc.items(), key=lambda z: (-len(z[1]), seed("fold", z[0]))):
        j = min(range(k), key=lambda z: (fs[z], z))
        for i in idx:
            f[i] = j
        fs[j] += len(idx)
    return f, k


def model(edge):
    cats = ["word_length"] + (["edge"] if edge else [])
    nums = ["document_word_count", "document_line_count", "line_index_norm"]
    prep = ColumnTransformer(
        [("cat", OneHotEncoder(handle_unknown="ignore"), cats), ("num", StandardScaler(), nums)]
    )
    clf = LogisticRegression(
        C=1.0, penalty="l2", solver="liblinear", max_iter=3000, random_state=0
    )
    return Pipeline([("prep", prep), ("clf", clf)])


def X(d, e):
    x = d[["word_length", "document_word_count", "document_line_count", "line_index_norm"]].copy()
    x["word_length"] = x.word_length.astype(int).astype(str)
    x["edge"] = d[e].astype(str).values
    return x


def predict(tr, te, r, e):
    y = tr[r].astype(int).to_numpy()
    yt = te[r].astype(int).to_numpy()
    if len(set(y)) < 2:
        raise ValueError("one class")
    m0, m1 = model(False), model(True)
    xx, xt = X(tr, e), X(te, e)
    w = weights(tr, r)
    m0.fit(xx, y, clf__sample_weight=w)
    m1.fit(xx, y, clf__sample_weight=w)
    p0 = np.clip(m0.predict_proba(xt)[:, 1], 1e-9, 1 - 1e-9)
    p1 = np.clip(m1.predict_proba(xt)[:, 1], 1e-9, 1 - 1e-9)
    wt = weights(te, r)
    l0 = (yt * np.log(p0) + (1 - yt) * np.log(1 - p0)) * wt
    l1 = (yt * np.log(p1) + (1 - yt) * np.log(1 - p1)) * wt
    return l0, l1


def infer(te, l0, l1, tag):
    z = pd.DataFrame({"doc": te.doc_group.values, "d": l1 - l0}).groupby("doc").d.sum().to_numpy()
    obs = float(z.sum())
    n = len(z)
    if n == 0:
        return dict(
            delta_ll=obs,
            ci99_lower=float("nan"),
            ci99_upper=float("nan"),
            positive_bootstrap_100=0,
            p_boot=float("nan"),
            n_test_docs=0,
        )
    rng = np.random.default_rng(seed("boot", tag))
    bs = np.empty(BOOT_N)
    for i in range(BOOT_N):
        bs[i] = z[rng.integers(0, n, size=n)].sum()
    lo, hi = np.quantile(bs, [0.005, 0.995])
    p = (1 + int((bs <= 0).sum())) / (BOOT_N + 1)

    # Frozen criterion 3: 100 independently hash-derived document-block seeds.
    stable = 0
    for i in range(STABILITY_N):
        srng = np.random.default_rng(seed("stability", tag, i))
        stable += int(z[srng.integers(0, n, size=n)].sum() > 0)

    return dict(
        delta_ll=obs,
        ci99_lower=float(lo),
        ci99_upper=float(hi),
        positive_bootstrap_100=int(stable),
        stability_hash_seed_count=STABILITY_N,
        p_boot=float(p),
        n_test_docs=n,
    )


def within(ds, r, direction, e, stem):
    g, diag = components(ds, stem)
    f, k = folds(ds, g)
    base = dict(mode="within", site=ds.site.iloc[0], role=r, direction=direction, folds=k, **diag)
    if k < 2:
        return {**base, "status": "INDETERMINATE_COMPONENT_COLLAPSE"}
    ii, a, b = [], [], []
    for q in range(k):
        te = np.where(f == q)[0]
        tr = np.where(f != q)[0]
        A, B = ds.iloc[tr], ds.iloc[te]
        if A[r].nunique() < 2 or B[r].nunique() < 2:
            return {**base, "status": "INDETERMINATE_CLASS_SPARSE_FOLD"}
        x, y = predict(A, B, r, e)
        ii += te.tolist()
        a += x.tolist()
        b += y.tolist()
    o = np.argsort(ii)
    T = ds.iloc[np.array(ii)[o]]
    return {
        **base,
        "status": "SCORED",
        **infer(T, np.array(a)[o], np.array(b)[o], f"within|{base['site']}|{r}|{direction}"),
        "n_test": len(T),
    }


def transfer(A, B, r, direction, e):
    base = dict(
        mode="transfer",
        train_site=A.site.iloc[0],
        test_site=B.site.iloc[0],
        role=r,
        direction=direction,
    )
    if A[r].nunique() < 2 or B[r].nunique() < 2:
        return {**base, "status": "INDETERMINATE_CLASS_SPARSE"}
    x, y = predict(A, B, r, e)
    return {
        **base,
        "status": "SCORED",
        **infer(B, x, y, f"transfer|{base['train_site']}|{base['test_site']}|{r}|{direction}"),
        "n_test": len(B),
    }


def probs(q, target=0.10, OR=2.0):
    p1 = lambda p: OR * p / (1 - p + OR * p)
    f = lambda p: (1 - q) * p + q * p1(p) - target
    p0 = brentq(f, 1e-9, 0.999999)
    return p0, p1(p0)


def synedge(ds, r, rep):
    out = np.zeros(len(ds), int)
    for ln, idx0 in ds.groupby("word_length").groups.items():
        idx = np.array(list(idx0), int)
        y = ds.loc[idx, r].astype(int).to_numpy()
        q = float(y.mean())
        if q <= 0 or q >= 1:
            p = np.full(len(idx), 0.10)
        else:
            p0, p1 = probs(q)
            p = np.where(y == 1, p1, p0)
        rng = np.random.default_rng(seed("syn", r, rep, int(ln), ds.site.iloc[0]))
        out[idx] = rng.binomial(1, p)
    return out


def power(A, B, r, mode, f=None, k=None):
    win, vals = 0, []
    for rep in range(100):
        if mode == "within":
            ds = A.copy()
            ds["_syn"] = synedge(ds, r, rep).astype(str)
            aa, bb, ii = [], [], []
            bad = False
            for q in range(k):
                te = np.where(f == q)[0]
                tr = np.where(f != q)[0]
                T, E = ds.iloc[tr], ds.iloc[te]
                if T[r].nunique() < 2 or E[r].nunique() < 2:
                    bad = True
                    break
                x, y = predict(T, E, r, "_syn")
                ii += te.tolist()
                aa += x.tolist()
                bb += y.tolist()
            if bad:
                continue
            o = np.argsort(ii)
            delta = float((np.array(bb)[o] - np.array(aa)[o]).sum())
        else:
            T, E = A.copy(), B.copy()
            T["_syn"] = synedge(T, r, rep).astype(str)
            E["_syn"] = synedge(E, r, rep).astype(str)
            x, y = predict(T, E, r, "_syn")
            delta = float((y - x).sum())
        vals.append(delta)
        win += delta > 0
    n = len(vals)
    lo = float(beta.ppf(0.025, win, n - win + 1)) if win else 0.0
    return dict(
        recoveries=int(win),
        reps_completed=n,
        exact95_lower=lo,
        power_pass=bool(n == 100 and win >= 80 and lo > 0.70),
        median_delta_ll=float(np.median(vals)) if vals else None,
    )


def holm(res):
    a = [r for r in res if r.get("status") == "SCORED" and math.isfinite(r.get("p_boot", float("nan")))]
    m = len(a)
    order = sorted(range(m), key=lambda i: a[i]["p_boot"])
    prev = 0.0
    for rank, i in enumerate(order, 1):
        raw = a[i]["p_boot"]
        adj = min(1.0, max(prev, (m - rank + 1) * raw))
        prev = adj
        a[i]["p_holm"] = adj
    for r in a:
        r["positive_raw"] = bool(
            r["delta_ll"] > 0
            and r["ci99_lower"] > 0
            and r["positive_bootstrap_100"] >= 95
        )
        r["positive_holm"] = bool(r["positive_raw"] and r["p_holm"] < ALPHA)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv", type=Path)
    ap.add_argument("outdir", type=Path)
    z = ap.parse_args()
    z.outdir.mkdir(parents=True, exist_ok=True)
    d = load(z.csv)

    c = census(d)
    pd.DataFrame(c).to_csv(z.outdir / "role_census.csv", index=False)
    by = {(x["site"], x["role"]): x for x in c}
    roles = [
        r
        for r in ROLES
        if by[("Pylos", r)]["abundance_gate"] and by[("Knossos", r)]["abundance_gate"]
    ]

    py = d[d.site == "Pylos"].reset_index(drop=True)
    kn = d[d.site == "Knossos"].reset_index(drop=True)
    pw, within_power, transfer_power = [], {}, {}

    for site, ds in [("Pylos", py), ("Knossos", kn)]:
        for r in ROLES:
            for dr, (e, st) in DIRECTIONS.items():
                g, diag = components(ds, st)
                f, k = folds(ds, g)
                if k < 2 or not by[(site, r)]["abundance_gate"]:
                    q = dict(power_pass=False, status="NOT_ELIGIBLE_ABUNDANCE_CONCENTRATION_OR_COMPONENT")
                else:
                    q = dict(status="SCORED", **power(ds, ds, r, "within", f, k), **diag, folds=k)
                within_power[(site, r, dr)] = q
                pw.append(dict(mode="within", site=site, role=r, direction=dr, **q))

    for r in roles:
        for dr in DIRECTIONS:
            q1 = power(py, kn, r, "transfer")
            q2 = power(kn, py, r, "transfer")
            transfer_power[(r, dr, "PK")] = q1
            transfer_power[(r, dr, "KP")] = q2
            pw += [
                dict(mode="transfer", train_site="Pylos", test_site="Knossos", role=r, direction=dr, status="SCORED", **q1),
                dict(mode="transfer", train_site="Knossos", test_site="Pylos", role=r, direction=dr, status="SCORED", **q2),
            ]
    pd.DataFrame(pw).to_csv(z.outdir / "synthetic_power.csv", index=False)

    eligible = [
        (r, dr)
        for r in roles
        for dr in DIRECTIONS
        if transfer_power[(r, dr, "PK")]["power_pass"]
        and transfer_power[(r, dr, "KP")]["power_pass"]
    ]

    real = []
    for site, ds in [("Pylos", py), ("Knossos", kn)]:
        for r in ROLES:
            for dr, (e, st) in DIRECTIONS.items():
                if not within_power[(site, r, dr)].get("power_pass"):
                    real.append(dict(mode="within", site=site, role=r, direction=dr, status="NOT_SCORED_POWER_GATE"))
                else:
                    real.append(within(ds, r, dr, e, st))

    for r, dr in eligible:
        e, _ = DIRECTIONS[dr]
        real += [transfer(py, kn, r, dr, e), transfer(kn, py, r, dr, e)]

    holm(real)
    pd.DataFrame(real).to_csv(z.outdir / "blind_real_tests.csv", index=False)

    l1 = sorted(
        (r["role"], r["direction"])
        for r in real
        if r.get("positive_holm") and r.get("mode") == "within" and r.get("site") == "Pylos"
    )
    l2 = sorted(
        (r["role"], r["direction"])
        for r in real
        if r.get("positive_holm") and r.get("mode") == "within" and r.get("site") == "Knossos"
    )
    l3 = []
    for rr, dr in eligible:
        a = [
            r for r in real
            if r.get("mode") == "transfer" and r.get("role") == rr and r.get("direction") == dr
            and r.get("train_site") == "Pylos"
        ]
        b = [
            r for r in real
            if r.get("mode") == "transfer" and r.get("role") == rr and r.get("direction") == dr
            and r.get("train_site") == "Knossos"
        ]
        if a and b and a[0].get("positive_holm") and b[0].get("positive_holm"):
            l3.append((rr, dr))

    s = dict(
        implementation="stage5e0-blind-v2-prereg-compliant",
        data_rows_secure_py_kn=len(d),
        site_rows={q: int((d.site == q).sum()) for q in SITES},
        isomorphism_abundance_roles=roles,
        level3_power_eligible_role_directions=[dict(role=r, direction=dr) for r, dr in eligible],
        level1_positive=[dict(role=r, direction=dr) for r, dr in l1],
        level2_positive=[dict(role=r, direction=dr) for r, dr in l2],
        level3_positive=[dict(role=r, direction=dr) for r, dr in l3],
        linear_a_authorized=bool(l3),
        holm_family_size=sum(x.get("status") == "SCORED" for x in real),
        status="LEVEL3_PASS" if l3 else "LEVEL3_NOT_ESTABLISHED",
    )
    (z.outdir / "blind_summary.json").write_text(json.dumps(s, indent=2, sort_keys=True) + "\n")
    m = {
        p.name: hashlib.sha256(p.read_bytes()).hexdigest()
        for p in sorted(z.outdir.iterdir())
        if p.is_file() and p.name != "BLIND_MANIFEST.json"
    }
    (z.outdir / "BLIND_MANIFEST.json").write_text(json.dumps(m, indent=2, sort_keys=True) + "\n")
    print(json.dumps(s, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
