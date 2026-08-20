#!/usr/bin/env python3
"""Stage 5E0 semantics-blind structural-role extractor.

Consumes the frozen DAMOS v2 JSON asset and emits ONLY anonymous morphology-edge IDs,
layout-derived structural outcomes, length/document controls, and grouping hashes.
It deliberately does not emit word spellings, logogram identities, number values,
translations, series labels, or Greek annotations.

Requires pyaegean for its Linear B diplomatic token classifier. The source behavior used
for preregistration is pinned in STAGE5E0_PROTOCOL_LOCK.md.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from aegean.core.model import ReadingStatus, TokenKind
from aegean.scripts.linearb.loader import classify

LINE_LABEL_RE = re.compile(r"^\.[A-Za-z0-9]+\.?$")
NONSPACE_RE = re.compile(r"\S+")
SEPARATORS = {",", "/"}
BLIND_SALT = "stage5e0-layout-v1-2026-08-20"
EXPECTED_DAMOS_SHA256 = "eab9ccdfc4324b62f015bccd5e3f917f256cab8c058840842127eadecfbca2d2"


@dataclass(frozen=True)
class Atom:
    cls: str  # W/N/L/S/X
    start: int
    end: int
    secure: bool
    signs: tuple[str, ...] = ()


@dataclass
class Row:
    raw_index: int
    atoms: list[Atom]

    @property
    def words(self) -> list[Atom]:
        return [a for a in self.atoms if a.cls == "W"]

    @property
    def left_word(self) -> Atom | None:
        return min(self.words, key=lambda a: a.start) if self.words else None

    def masked_signature(self) -> tuple[str, ...]:
        # Separators carry no identity. Consecutive numbers are one generic numeric run.
        out: list[str] = []
        for atom in self.atoms:
            if atom.cls == "S" or atom.cls == "X":
                continue
            c = atom.cls
            if c == "N" and out and out[-1] == "N":
                continue
            out.append(c)
        return tuple(out)


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def blind_id(prefix: str, value: str) -> str:
    digest = hashlib.sha256(f"{BLIND_SALT}|{prefix}|{value}".encode()).hexdigest()[:16]
    return f"{prefix}_{digest}"


def classify_run(text: str, line_no: int, position: int) -> tuple[str, bool, tuple[str, ...]]:
    if text in SEPARATORS:
        return "S", True, ()
    inner = text[1:-1] if len(text) >= 2 and text[0] == "'" and text[-1] == "'" else text
    tok = classify(inner, line_no, position)
    secure = tok.status is ReadingStatus.CERTAIN
    if tok.kind is TokenKind.WORD:
        return "W", secure, tuple(tok.signs)
    if tok.kind is TokenKind.NUMERAL:
        return "N", secure, ()
    if tok.kind is TokenKind.LOGOGRAM:
        # CRITICAL SEMANTIC FIREWALL: original label is discarded here.
        return "L", secure, ()
    if tok.kind is TokenKind.SEPARATOR:
        return "S", secure, ()
    return "X", False, ()


def parse_rows(content: str) -> list[Row]:
    rows: list[Row] = []
    pos = 0
    for line_no, raw in enumerate(content.splitlines()):
        if not raw.strip():
            continue
        matches = list(NONSPACE_RE.finditer(raw))
        if not matches:
            continue
        start_i = 1 if LINE_LABEL_RE.match(matches[0].group(0)) else 0
        atoms: list[Atom] = []
        for m in matches[start_i:]:
            cls, secure, signs = classify_run(m.group(0), line_no, pos)
            atoms.append(Atom(cls, m.start(), m.end(), secure, signs))
            pos += 1
        if atoms:
            rows.append(Row(line_no, atoms))
    return rows


def nonsep(row: Row) -> list[Atom]:
    return [a for a in row.atoms if a.cls != "S" and a.cls != "X"]


def neighbor_classes(row: Row, w: Atom) -> tuple[list[str], list[str]]:
    seq = nonsep(row)
    try:
        i = seq.index(w)
    except ValueError:
        return [], []
    left = [a.cls for a in reversed(seq[:i])]
    right = [a.cls for a in seq[i + 1 :]]
    return left, right


def parallel_members(rows: list[Row]) -> set[int]:
    members: set[int] = set()
    i = 0
    while i < len(rows):
        row = rows[i]
        lw = row.left_word
        if lw is None:
            i += 1
            continue
        sig = row.masked_signature()
        run = [i]
        j = i + 1
        while j < len(rows):
            nxt = rows[j]
            nlw = nxt.left_word
            if nlw is None:
                break
            if abs(nlw.start - lw.start) > 1:
                break
            if nxt.masked_signature() != sig:
                break
            run.append(j)
            j += 1
        if len(run) >= 2:
            members.update(run)
            i = j
        else:
            i += 1
    return members


def child_parent_rows(rows: list[Row], parallel: set[int]) -> tuple[set[int], set[int]]:
    child: set[int] = set()
    parent: set[int] = set()
    # Work on maximal contiguous parallel blocks.
    sorted_idx = sorted(parallel)
    if not sorted_idx:
        return child, parent
    blocks: list[list[int]] = []
    block = [sorted_idx[0]]
    for idx in sorted_idx[1:]:
        if idx == block[-1] + 1:
            block.append(idx)
        else:
            blocks.append(block)
            block = [idx]
    blocks.append(block)
    for b in blocks:
        starts = [rows[k].left_word.start for k in b if rows[k].left_word is not None]
        if len(starts) < 2:
            continue
        median_start = sorted(starts)[len(starts) // 2]
        prior = b[0] - 1
        while prior >= 0 and rows[prior].left_word is None:
            prior -= 1
        if prior < 0:
            continue
        plw = rows[prior].left_word
        assert plw is not None
        if median_start - plw.start < 2:
            continue
        # No intervening lexical row may begin at an equal/smaller column. With the
        # nearest lexical row this is normally vacuous; keep explicit for auditability.
        bad = False
        for k in range(prior + 1, b[0]):
            lw = rows[k].left_word
            if lw is not None and lw.start <= plw.start:
                bad = True
                break
        if bad:
            continue
        child.update(b)
        parent.add(prior)
    return child, parent


def role_flags(rows: list[Row]) -> dict[tuple[int, int], dict[str, int]]:
    parallel = parallel_members(rows)
    child, parent = child_parent_rows(rows, parallel)
    out: dict[tuple[int, int], dict[str, int]] = {}
    for r_i, row in enumerate(rows):
        words = row.words
        if not words:
            continue
        leftmost = min(w.start for w in words)
        rightmost = max(w.start for w in words)
        for w_i, w in enumerate(words):
            left, right = neighbor_classes(row, w)
            p1 = bool(right and right[0] == "N")
            p2 = len(right) >= 2 and right[0] == "L" and right[1] == "N"
            p3 = bool(right and right[0] == "L")
            p4 = bool(left and left[0] == "L")
            p5 = len(words) == 1
            p6 = w.start == leftmost
            p8 = r_i in parallel
            p9 = r_i in child and p6
            p10 = r_i in parent and p6
            out[(r_i, w_i)] = {
                "SR01": int(p1),
                "SR02": int(p2),
                "SR03": int(p3),
                "SR04": int(p4),
                "SR05": int(p8),
                "SR06": int(p8 and (p1 or p2) and p6),
                "SR07": int(p9),
                "SR08": int(p10),
                "SR09": int(p5),
                "is_leftmost": int(p6),
                "is_rightmost": int(w.start == rightmost),
            }
    return out


def iter_records(payload: dict) -> Iterable[dict]:
    for rec in payload.get("documents", []):
        if (rec.get("site") or "") in {"Knossos", "Pylos", "Mycenae", "Thebes"}:
            yield rec


def extract(input_json: Path, output_csv: Path) -> dict:
    observed = sha256_file(input_json)
    if observed != EXPECTED_DAMOS_SHA256:
        raise SystemExit(f"DAMOS SHA mismatch: expected {EXPECTED_DAMOS_SHA256}, got {observed}")
    payload = json.loads(input_json.read_text(encoding="utf-8"))
    fieldnames = [
        "site", "doc_group", "scribe_group", "line_index_norm", "document_word_count",
        "document_line_count", "word_length", "prefix_edge_id", "suffix_edge_id",
        "prefix_stem_group", "suffix_stem_group", "secure",
        "SR01", "SR02", "SR03", "SR04", "SR05", "SR06", "SR07", "SR08", "SR09",
    ]
    output_csv.parent.mkdir(parents=True, exist_ok=True)
    counts = {"documents": 0, "words": 0, "secure_words": 0, "by_site": {}}
    with output_csv.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        for rec in iter_records(payload):
            content = rec.get("content") or ""
            rows = parse_rows(content)
            if not rows:
                continue
            flags = role_flags(rows)
            all_words = [(ri, wi, w) for ri, row in enumerate(rows) for wi, w in enumerate(row.words)]
            if not all_words:
                continue
            counts["documents"] += 1
            site = rec.get("site") or ""
            counts["by_site"].setdefault(site, {"documents": 0, "words": 0, "secure_words": 0})
            counts["by_site"][site]["documents"] += 1
            doc_label = rec.get("heading") or str(rec.get("id") or "")
            doc_group = blind_id("DOC", doc_label)
            scribe_group = blind_id("SCR", rec.get("scribe") or "UNKNOWN")
            doc_word_count = len(all_words)
            nrows = len(rows)
            for ri, wi, w in all_words:
                if not w.signs:
                    continue
                counts["words"] += 1
                counts["by_site"][site]["words"] += 1
                secure = bool(w.secure and len(w.signs) >= 2)
                if secure:
                    counts["secure_words"] += 1
                    counts["by_site"][site]["secure_words"] += 1
                prefix = w.signs[0]
                suffix = w.signs[-1]
                prefix_stem = "-".join(w.signs[1:])
                suffix_stem = "-".join(w.signs[:-1])
                row = {
                    "site": site,
                    "doc_group": doc_group,
                    "scribe_group": scribe_group,
                    "line_index_norm": ri / max(nrows - 1, 1),
                    "document_word_count": doc_word_count,
                    "document_line_count": nrows,
                    "word_length": len(w.signs),
                    "prefix_edge_id": blind_id("PE", prefix),
                    "suffix_edge_id": blind_id("SE", suffix),
                    "prefix_stem_group": blind_id("PS", prefix_stem),
                    "suffix_stem_group": blind_id("SS", suffix_stem),
                    "secure": int(secure),
                }
                row.update({k: flags[(ri, wi)][k] for k in [f"SR{i:02d}" for i in range(1, 10)]})
                writer.writerow(row)
    return counts


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("input_json", type=Path)
    ap.add_argument("output_csv", type=Path)
    ap.add_argument("--summary", type=Path)
    args = ap.parse_args()
    summary = extract(args.input_json, args.output_csv)
    text = json.dumps(summary, indent=2, sort_keys=True)
    if args.summary:
        args.summary.parent.mkdir(parents=True, exist_ok=True)
        args.summary.write_text(text + "\n", encoding="utf-8")
    print(text)


if __name__ == "__main__":
    main()
