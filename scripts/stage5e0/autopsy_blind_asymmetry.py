#!/usr/bin/env python3
"""Diagnostic-only Stage 5E0 cross-site asymmetry audit.

Consumes ONLY the anonymized structural-role CSV. It never decodes edge IDs or reads
Greek linguistic annotations. MY/TH are excluded at load time. This is an autopsy
of the already-frozen Stage 5E0 architecture, not a confirmatory test and not a
Stage 5E0b feature-selection run.
"""
from __future__ import annotations

import argparse
import json
import math
from collections import Counter
from pathlib import Path

import pandas as pd

SITES = ("Pylos", "Knossos")
DIRECTIONS = {"suffix": "suffix_edge_id", "prefix": "prefix_edge_id"}


def entropy(counts: Counter) -> float:
    n = sum(counts.values())
    if n <= 0:
        return 0.0
    return -sum((v / n) * math.log(v / n) for v in counts.values() if v)


def concentration(counts: Counter, k: int) -> float:
    n = sum(counts.values())
    if n <= 0:
        return 0.0
    return sum(sorted(counts.values(), reverse=True)[:k]) / n


def distribution_stats(s: pd.Series) -> dict:
    c = Counter(s.astype(str))
    h = entropy(c)
    return {
        "tokens": int(sum(c.values())),
        "types": int(len(c)),
        "entropy_nats": h,
        "effective_types_expH": math.exp(h) if h < 700 else float("inf"),
        "top1_token_share": concentration(c, 1),
        "top5_token_share": concentration(c, 5),
        "top10_token_share": concentration(c, 10),
    }


def directional_coverage(train: pd.DataFrame, test: pd.DataFrame, col: str, role: str | None = None) -> dict:
    tr = train if role is None else train[train[role] == 1]
    te = test if role is None else test[test[role] == 1]
    train_types = set(tr[col].astype(str))
    test_edges = te[col].astype(str)
    if len(test_edges) == 0:
        return {"test_tokens": 0, "test_types": 0, "oov_tokens": 0, "oov_token_rate": None,
                "covered_token_rate": None, "oov_types": 0, "oov_type_rate": None}
    oov_mask = ~test_edges.isin(train_types)
    test_types = set(test_edges)
    oov_types = test_types - train_types
    return {
        "test_tokens": int(len(test_edges)),
        "test_types": int(len(test_types)),
        "oov_tokens": int(oov_mask.sum()),
        "oov_token_rate": float(oov_mask.mean()),
        "covered_token_rate": float(1.0 - oov_mask.mean()),
        "oov_types": int(len(oov_types)),
        "oov_type_rate": float(len(oov_types) / len(test_types)) if test_types else None,
    }


def site_geometry(x: pd.DataFrame) -> dict:
    dc = x.groupby("doc_group").size()
    sc = x.groupby("scribe_group").size()
    return {
        "rows": int(len(x)),
        "documents": int(x.doc_group.nunique()),
        "scribes_or_unknown_groups": int(x.scribe_group.nunique()),
        "rows_per_document_mean": float(dc.mean()),
        "rows_per_document_median": float(dc.median()),
        "single_row_document_share": float((dc == 1).mean()),
        "top1_document_row_share": float(dc.max() / len(x)),
        "top10_document_row_share": float(dc.nlargest(min(10, len(dc))).sum() / len(x)),
        "top1_scribe_row_share": float(sc.max() / len(x)),
        "top10_scribe_row_share": float(sc.nlargest(min(10, len(sc))).sum() / len(x)),
        "role_prevalence": {f"SR{i:02d}": float(x[f"SR{i:02d}"].mean()) for i in range(1, 10)},
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("csv", type=Path)
    ap.add_argument("output", type=Path)
    args = ap.parse_args()

    d = pd.read_csv(args.csv)
    d = d[(d.secure == 1) & d.site.isin(SITES)].copy()
    for r in [f"SR{i:02d}" for i in range(1, 10)]:
        d[r] = pd.to_numeric(d[r], errors="coerce").fillna(0).astype(int)

    by_site = {s: d[d.site == s].reset_index(drop=True) for s in SITES}
    out = {
        "scope": "PY_KN_ONLY_ANONYMOUS_EDGES",
        "greek_edge_identity_opened": False,
        "my_th_inspected": False,
        "site_geometry": {s: site_geometry(by_site[s]) for s in SITES},
        "directions": {},
    }

    for direction, col in DIRECTIONS.items():
        py, kn = by_site["Pylos"], by_site["Knossos"]
        py_types = set(py[col].astype(str)); kn_types = set(kn[col].astype(str))
        q = {
            "Pylos_distribution": distribution_stats(py[col]),
            "Knossos_distribution": distribution_stats(kn[col]),
            "type_overlap": {
                "intersection": len(py_types & kn_types),
                "union": len(py_types | kn_types),
                "jaccard": len(py_types & kn_types) / len(py_types | kn_types) if (py_types | kn_types) else None,
            },
            "all_rows_transfer_coverage": {
                "Knossos_to_Pylos": directional_coverage(kn, py, col),
                "Pylos_to_Knossos": directional_coverage(py, kn, col),
            },
            "SR01_positive_transfer_coverage": {
                "Knossos_to_Pylos": directional_coverage(kn, py, col, "SR01"),
                "Pylos_to_Knossos": directional_coverage(py, kn, col, "SR01"),
            },
            "SR01_positive_distributions": {
                "Pylos": distribution_stats(py.loc[py.SR01 == 1, col]),
                "Knossos": distribution_stats(kn.loc[kn.SR01 == 1, col]),
            },
        }
        out["directions"][direction] = q

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(out, indent=2, sort_keys=True) + "\n")
    print(json.dumps(out, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
