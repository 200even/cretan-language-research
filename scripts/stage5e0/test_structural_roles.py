#!/usr/bin/env python3
"""Synthetic tests for Stage 5E0 role definitions.

These examples contain no real Mycenaean tablet content. They verify that roles arise
from token classes and geometry, not word/logogram semantics.
"""

from extract_structural_roles import parse_rows, role_flags


def word_flags(text: str):
    rows = parse_rows(text)
    flags = role_flags(rows)
    return rows, flags


def test_direct_numeric():
    rows, f = word_flags(".1      a-ko-ro   3")
    assert f[(0, 0)]["SR01"] == 1
    assert f[(0, 0)]["SR03"] == 0


def test_generic_logogram_numeric():
    # Changing the uppercase logogram spelling must not change the role vector.
    r1, f1 = word_flags(".1      a-ko-ro   OLE   3")
    r2, f2 = word_flags(".1      a-ko-ro   TELA   3")
    assert r1[0].masked_signature() == r2[0].masked_signature() == ("W", "L", "N")
    assert f1[(0, 0)]["SR02"] == f2[(0, 0)]["SR02"] == 1
    assert f1[(0, 0)]["SR03"] == f2[(0, 0)]["SR03"] == 1


def test_parallel_quantified_rows():
    text = """.1        a-ko   1
.2        e-re   2
"""
    rows, f = word_flags(text)
    assert rows[0].masked_signature() == rows[1].masked_signature() == ("W", "N")
    assert f[(0, 0)]["SR05"] == 1 and f[(1, 0)]["SR05"] == 1
    assert f[(0, 0)]["SR06"] == 1 and f[(1, 0)]["SR06"] == 1


def test_parent_child_geometry():
    text = """.1    a-ko
.2        e-re   1
.3        o-no   2
"""
    rows, f = word_flags(text)
    assert f[(0, 0)]["SR08"] == 1
    assert f[(1, 0)]["SR07"] == 1
    assert f[(2, 0)]["SR07"] == 1


def test_no_false_parent_without_indent():
    text = """.1        a-ko
.2        e-re   1
.3        o-no   2
"""
    rows, f = word_flags(text)
    assert f[(0, 0)]["SR08"] == 0


def test_word_identity_does_not_change_roles():
    a, fa = word_flags(".1        a-ko   1\n.2        e-re   2")
    b, fb = word_flags(".1        po-ro   1\n.2        mi-ti   2")
    assert [r.masked_signature() for r in a] == [r.masked_signature() for r in b]
    assert [fa[(i, 0)] for i in range(2)] == [fb[(i, 0)] for i in range(2)]


if __name__ == "__main__":
    test_direct_numeric()
    test_generic_logogram_numeric()
    test_parallel_quantified_rows()
    test_parent_child_geometry()
    test_no_false_parent_without_indent()
    test_word_identity_does_not_change_roles()
    print("Stage 5E0 synthetic structural-role tests: PASS")
