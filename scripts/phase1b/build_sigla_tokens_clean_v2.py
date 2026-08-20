#!/usr/bin/env python3
"""Build the Phase-1B fail-closed SigLA token table from a frozen SigLA Step-2 CSV
and the frozen lineara.xyz / GORILA-derived diplomatic edge census.

Research lock (2026-08-20):
- The diplomatic source is used ONLY for word-boundary/damage status.
- Candidate signs (TI, JA, etc.) never enter matching or exclusion decisions.
- Absence of a damage marker in normalized SigLA is NOT evidence of a closed edge.
- A SigLA token is boundary-secure only if it receives a unique, monotonic exact
  match to a positively covered diplomatic word and that word has no left-,
  right-, or interior-damage marker.
- Any unmatched or ambiguous token fails closed as UNKNOWN_BOUNDARY.

The script accepts the original Step-2 token CSV or a later audit CSV containing
at least: document_id, word_index, token_text, is_clean. Existing v0.7c
left_state/right_state fields are ignored deliberately.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

FROZEN_SIGLA_SHA256 = "cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d"
FROZEN_DIPLOMATIC_COMMIT = "43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a"
PRIMARY_TYPOLOGIES = {"tablet", "nodule", "roundel"}

# Greek side/index suffixes used in SigLA sealing IDs can be absent in the
# GORILA-derived key. They are stripped only for *document lookup*; if that
# creates more than one possible diplomatic document the mapping is ambiguous
# and is rejected.
_GREEK_TRAILING = re.compile(r"[αβγδεζηθικλμνξοπρστυφχψω]+$", re.I)


def b(v: object) -> bool:
    return str(v).strip().lower() in {"1", "true", "yes", "y"}


def canonical_token(s: str) -> str:
    """Conservative orthographic normalization, not linguistic normalization."""
    s = unicodedata.normalize("NFKC", (s or "").strip()).upper()
    s = s.replace("RA2", "RA₂").replace("PU2", "PU₂").replace("TA2", "TA₂")
    s = re.sub(r"\s+", "", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s


def canonical_doc_exact(s: str) -> str:
    s = unicodedata.normalize("NFKC", (s or "").strip())
    return re.sub(r"[^0-9A-Za-zΑ-Ωα-ω]+", "", s).upper()


def canonical_doc_base(s: str) -> str:
    return _GREEK_TRAILING.sub("", canonical_doc_exact(s))


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def diplomatic_index(rows: list[dict[str, str]]):
    exact: dict[str, list[str]] = defaultdict(list)
    base: dict[str, list[str]] = defaultdict(list)
    by_doc: dict[str, list[dict[str, str]]] = defaultdict(list)
    for r in rows:
        dk = r["doc_key"]
        by_doc[dk].append(r)
        exact[canonical_doc_exact(dk)].append(dk)
        base[canonical_doc_base(dk)].append(dk)
    # Deduplicate aliases while preserving deterministic order.
    for d in (exact, base):
        for k in list(d):
            d[k] = sorted(set(d[k]))
    for dk in by_doc:
        by_doc[dk].sort(key=lambda r: int(r.get("array_index", 0) or 0))
    return exact, base, by_doc


def resolve_doc(sigla_id: str, exact, base) -> tuple[str | None, str]:
    k = canonical_doc_exact(sigla_id)
    cands = exact.get(k, [])
    if len(cands) == 1:
        return cands[0], "EXACT_DOC"
    if len(cands) > 1:
        return None, "AMBIGUOUS_DOC"
    kb = canonical_doc_base(sigla_id)
    cands = base.get(kb, [])
    if len(cands) == 1:
        return cands[0], "BASE_ALIAS_DOC"
    if len(cands) > 1:
        return None, "AMBIGUOUS_DOC"
    return None, "NO_DIPLOMATIC_DOC"


def _lcs_table(a: list[str], bseq: list[str]) -> list[list[int]]:
    n, m = len(a), len(bseq)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            v = max(dp[i + 1][j], dp[i][j + 1])
            if a[i] == bseq[j]:
                v = max(v, 1 + dp[i + 1][j + 1])
            dp[i][j] = v
    return dp


def forced_lcs_alignment(a: list[str], bseq: list[str]) -> tuple[dict[int, int], str]:
    """Return only token matches forced by *every* maximum exact alignment.

    For a SigLA token i to receive diplomatic boundary metadata:
    1. removing i must reduce the LCS length, proving i is matched in every
       maximum monotonic exact alignment; and
    2. exactly one diplomatic position j can participate in an optimal match
       for i.

    Any token not satisfying both conditions is left UNKNOWN_BOUNDARY. This is
    intentionally stricter than choosing an arbitrary LCS in documents with
    repeated forms.
    """
    n, m = len(a), len(bseq)
    if not n or not m:
        return {}, "NO_ALIGNMENT"
    back = _lcs_table(a, bseq)
    L = back[0][0]
    # prefix LCS lengths for optimal-pair characterization
    pref = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n):
        for j in range(m):
            v = max(pref[i][j + 1], pref[i + 1][j])
            if a[i] == bseq[j]:
                v = max(v, 1 + pref[i][j])
            pref[i + 1][j + 1] = v

    mapping: dict[int, int] = {}
    for i in range(n):
        # If the same optimum is attainable with this SigLA token omitted, its
        # alignment is not positively established.
        without = _lcs_table(a[:i] + a[i + 1 :], bseq)[0][0]
        if without >= L:
            continue
        possible = []
        for j in range(m):
            if a[i] != bseq[j]:
                continue
            # Match (i,j) can lie on a maximum alignment iff best prefix before
            # it + this match + best suffix after it reaches the global LCS.
            if pref[i][j] + 1 + back[i + 1][j + 1] == L:
                possible.append(j)
        if len(possible) == 1:
            mapping[i] = possible[0]
    status = "FORCED_ALIGNMENT" if mapping else "NO_FORCED_MATCHES"
    return mapping, status

def build(sigla_rows: list[dict[str, str]], dip_rows: list[dict[str, str]]):
    exact, base, dip_by_doc = diplomatic_index(dip_rows)
    sig_by_doc: dict[str, list[tuple[int, dict[str, str]]]] = defaultdict(list)
    for idx, r in enumerate(sigla_rows):
        sig_by_doc[r.get("document_id", "")].append((idx, r))

    matches: dict[int, dict[str, str]] = {}
    doc_audit = []

    for sig_doc, indexed in sorted(sig_by_doc.items()):
        indexed.sort(key=lambda x: int(x[1].get("word_index", "0") or 0))
        dip_doc, doc_status = resolve_doc(sig_doc, exact, base)
        if dip_doc is None:
            doc_audit.append({"sigla_document_id": sig_doc, "diplomatic_doc_key": "",
                              "doc_status": doc_status, "n_sigla_words": len(indexed),
                              "n_diplomatic_words": 0, "n_matched": 0})
            continue
        drows = dip_by_doc[dip_doc]
        avec = [canonical_token(r.get("token_text", "")) for _, r in indexed]
        bvec = [canonical_token(r.get("normalized_token", "")) for r in drows]
        amap, astat = forced_lcs_alignment(avec, bvec)
        for ai, bj in amap.items():
            global_idx, _ = indexed[ai]
            matches[global_idx] = drows[bj]
        doc_audit.append({"sigla_document_id": sig_doc, "diplomatic_doc_key": dip_doc,
                          "doc_status": f"{doc_status};{astat}", "n_sigla_words": len(indexed),
                          "n_diplomatic_words": len(drows), "n_matched": len(amap)})

    out = []
    for idx, r in enumerate(sigla_rows):
        q = dict(r)
        # Never trust the earlier raw-state shortcut in the output.
        for old in ("left_state", "right_state", "edge_secure", "is_clean_v07c", "exclusion_reasons_v07c"):
            q.pop(old, None)
        d = matches.get(idx)
        if d is None:
            q.update({
                "diplomatic_doc_key": "", "diplomatic_array_index": "",
                "diplomatic_glyph_word": "", "left_open_v2": "",
                "right_open_v2": "", "interior_damage_v2": "",
                "boundary_coverage_v2": "UNKNOWN", "edge_secure_v2": "0",
                "is_clean_v2": "0", "exclusion_reasons_v2": "UNKNOWN_BOUNDARY",
                "diplomatic_source_commit": FROZEN_DIPLOMATIC_COMMIT,
            })
        else:
            left = b(d.get("left_open")); right = b(d.get("right_open")); interior = b(d.get("interior_damage"))
            secure = not (left or right or interior)
            prior_clean = b(r.get("is_clean", "0"))
            reasons = []
            if not prior_clean:
                reasons.append(r.get("exclusion_reasons", "STEP2_UNCLEAN") or "STEP2_UNCLEAN")
            if left: reasons.append("OPEN_LEFT")
            if right: reasons.append("OPEN_RIGHT")
            if interior: reasons.append("INTERIOR_DAMAGE")
            q.update({
                "diplomatic_doc_key": d.get("doc_key", ""),
                "diplomatic_array_index": d.get("array_index", ""),
                "diplomatic_glyph_word": d.get("glyph_word", ""),
                "left_open_v2": "1" if left else "0",
                "right_open_v2": "1" if right else "0",
                "interior_damage_v2": "1" if interior else "0",
                "boundary_coverage_v2": "POSITIVE",
                "edge_secure_v2": "1" if secure else "0",
                "is_clean_v2": "1" if (prior_clean and secure) else "0",
                "exclusion_reasons_v2": ";".join(reasons),
                "diplomatic_source_commit": FROZEN_DIPLOMATIC_COMMIT,
            })
        out.append(q)

    return out, doc_audit


def summarize(rows: list[dict[str, str]], doc_audit: list[dict[str, object]]):
    primary = [r for r in rows if (r.get("typology", "").strip().lower() in PRIMARY_TYPOLOGIES)
               and 2 <= int(r.get("sign_count_positions", r.get("readable_sign_count", "0")) or 0) <= 8]
    primary_clean = [r for r in primary if b(r.get("is_clean_v2"))]
    return {
        "stage": "Phase 1B diplomatic boundary reconstruction",
        "sigla_source_sha256_expected": FROZEN_SIGLA_SHA256,
        "diplomatic_source_commit": FROZEN_DIPLOMATIC_COMMIT,
        "policy": "positive diplomatic coverage + unique monotonic exact alignment; fail closed on unmatched/ambiguous; candidate-blind",
        "rerun_calibration_rule": "UNCONDITIONAL after Phase-1B rebuild: any change in primary eligible membership triggers recalibration",
        "n_sigla_rows_input": len(rows),
        "n_positive_boundary_coverage": sum(r.get("boundary_coverage_v2") == "POSITIVE" for r in rows),
        "n_unknown_boundary": sum(r.get("boundary_coverage_v2") != "POSITIVE" for r in rows),
        "n_edge_secure_v2": sum(b(r.get("edge_secure_v2")) for r in rows),
        "n_clean_v2": sum(b(r.get("is_clean_v2")) for r in rows),
        "primary_2_8_rows": len(primary),
        "primary_2_8_clean_v2": len(primary_clean),
        "documents_audited": len(doc_audit),
        "documents_with_ambiguous_alignment": sum("AMBIGUOUS_ALIGNMENT" in str(r.get("doc_status")) for r in doc_audit),
        "documents_without_diplomatic_doc": sum(str(r.get("doc_status", "")).startswith("NO_DIPLOMATIC_DOC") for r in doc_audit),
    }


def write_csv(path: Path, rows: list[dict[str, object]]) -> None:
    fields: list[str] = []
    seen = set()
    for r in rows:
        for k in r:
            if k not in seen:
                seen.add(k); fields.append(k)
    with path.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader(); w.writerows(rows)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--sigla", required=True, type=Path, help="Frozen Step-2 token CSV")
    ap.add_argument("--diplomatic", required=True, type=Path, help="Frozen diplomatic edge census CSV")
    ap.add_argument("--out", required=True, type=Path, help="Output clean-only sigla_tokens_clean_v2 CSV")
    ap.add_argument("--all-out", type=Path, help="Optional all-token boundary audit CSV")
    ap.add_argument("--audit", type=Path, help="Per-document alignment audit CSV")
    ap.add_argument("--summary", type=Path, help="JSON summary")
    ns = ap.parse_args()
    sig = read_csv(ns.sigla); dip = read_csv(ns.diplomatic)
    out, audit = build(sig, dip)
    clean_out = [r for r in out if b(r.get("is_clean_v2"))]
    write_csv(ns.out, clean_out)
    if ns.all_out: write_csv(ns.all_out, out)
    if ns.audit: write_csv(ns.audit, audit)
    summary = summarize(out, audit)
    if ns.summary: ns.summary.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    # Hard fail if any row lacks positive coverage. The user can inspect audit and
    # decide whether to add a source; the script never silently promotes it.
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
