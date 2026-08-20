#!/usr/bin/env python3
"""Build the Phase B candidate universe without revealing lexical identities.

Inputs:
  1. pinned mwenge/lineara.xyz LinearAInscriptions.js
  2. frozen 31-object frame CSV
  3. frozen formula-mask CSV

The default output contains counts and SHA-256 candidate hashes only. Raw sign-group
identities are emitted only with --unblind; the preregistered global-first firewall
forbids that option unless a positive global result authorizes contributor review.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

DAMAGE = "\U0001076B"  # 𐝫
DF_MIN = 2
DF_MAX = 6
MIN_SIGNS = 2
MAX_SIGNS = 8
SYLLABIC_COMPONENT = re.compile(r"(?:[A-Z]+[₀-₉]*|\*\d+)$")


def load_frame(path: Path) -> list[str]:
    with path.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    ids = [r["inscription"] for r in rows]
    if len(ids) != len(set(ids)):
        raise ValueError("Duplicate inscription IDs in frozen frame")
    return ids


def load_masks(path: Path) -> list[re.Pattern[str]]:
    with path.open(encoding="utf-8", newline="") as f:
        return [re.compile(r["regex"]) for r in csv.DictReader(f)]


def extract_object(source: str, inscription_id: str) -> dict:
    needle = f'["{inscription_id}",{{'
    start = source.find(needle)
    if start < 0:
        raise KeyError(f"Missing frozen-frame inscription: {inscription_id}")
    obj_start = start + len(needle) - 1
    obj, _ = json.JSONDecoder().raw_decode(source[obj_start:])
    return obj


def sign_count(token: str) -> int | None:
    parts = token.split("-")
    if not all(SYLLABIC_COMPONENT.fullmatch(p) for p in parts):
        return None
    return len(parts)


def masked(token: str, masks: list[re.Pattern[str]]) -> bool:
    return any(p.fullmatch(token) for p in masks)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("source_js", type=Path)
    ap.add_argument("frame_csv", type=Path)
    ap.add_argument("mask_csv", type=Path)
    ap.add_argument("--summary-csv", type=Path)
    ap.add_argument("--hash-manifest", type=Path)
    ap.add_argument("--unblind", action="store_true")
    args = ap.parse_args()

    source = args.source_js.read_text(encoding="utf-8")
    frame = load_frame(args.frame_csv)
    masks = load_masks(args.mask_csv)

    doc_types: dict[str, set[str]] = {}
    sites: dict[str, str] = {}
    per_doc_counts = []
    exclusion = Counter()

    for iid in frame:
        obj = extract_object(source, iid)
        tw = obj.get("transliteratedWords", [])
        gw = obj.get("words", [])
        if len(tw) != len(gw):
            raise ValueError(f"Unaligned transliteration/glyph arrays for {iid}: {len(tw)} != {len(gw)}")
        sites[iid] = obj.get("site", "")
        keep: set[str] = set()
        for token, glyph in zip(tw, gw):
            if not isinstance(token, str) or not isinstance(glyph, str):
                exclusion["non_string"] += 1
                continue
            n = sign_count(token)
            if n is None:
                exclusion["non_syllabic_or_separator"] += 1
                continue
            if not (MIN_SIGNS <= n <= MAX_SIGNS):
                exclusion["length"] += 1
                continue
            if DAMAGE in glyph:
                exclusion["damage"] += 1
                continue
            if masked(token, masks):
                exclusion["formula_mask"] += 1
                continue
            keep.add(token)
        doc_types[iid] = keep
        per_doc_counts.append((iid, sites[iid], len(keep)))

    df = Counter()
    site_sets: dict[str, set[str]] = defaultdict(set)
    doc_sets: dict[str, set[str]] = defaultdict(set)
    for iid, types in doc_types.items():
        for token in types:
            df[token] += 1
            site_sets[token].add(sites[iid])
            doc_sets[token].add(iid)

    all_eligible = sorted(df)
    rare = sorted(t for t, n in df.items() if DF_MIN <= n <= DF_MAX)
    recurrent = sorted(t for t in rare if len(site_sets[t]) >= 2)

    print(f"documents={len(frame)}")
    print(f"sites={len(set(sites.values()))}")
    print(f"eligible_noncore_types={len(all_eligible)}")
    print(f"singleton_types={sum(1 for n in df.values() if n == 1)}")
    print(f"df_2_6_types={len(rare)}")
    print(f"sf_ge_2_types={len(recurrent)}")
    print(f"observed_T={len(recurrent)}")
    for k in sorted(exclusion):
        print(f"excluded_{k}={exclusion[k]}")

    if args.summary_csv:
        args.summary_csv.parent.mkdir(parents=True, exist_ok=True)
        with args.summary_csv.open("w", encoding="utf-8", newline="") as f:
            w = csv.writer(f)
            w.writerow(["inscription", "site", "eligible_noncore_type_count"])
            w.writerows(per_doc_counts)

    if args.hash_manifest:
        args.hash_manifest.parent.mkdir(parents=True, exist_ok=True)
        with args.hash_manifest.open("w", encoding="utf-8", newline="") as f:
            w = csv.writer(f)
            w.writerow(["candidate_sha256", "df", "sf", "in_df_2_6_band"])
            for token in all_eligible:
                digest = hashlib.sha256(token.encode()).hexdigest()
                w.writerow([digest, df[token], len(site_sets[token]), int(token in rare)])

    if args.unblind:
        print("\nUNBLINDED IDENTITIES")
        for token in all_eligible:
            print(token, df[token], len(site_sets[token]), sorted(doc_sets[token]))


if __name__ == "__main__":
    main()
