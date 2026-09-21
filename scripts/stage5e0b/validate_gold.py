#!/usr/bin/env python3
"""Fail-closed pre-scoring validation of Stage 5E0b gold provenance.

This checks structural prerequisites, NOT linguistic correctness. Independent
manual epigraphic and morphological audit remains mandatory.
"""
import argparse
import csv
import hashlib
import json
from collections import defaultdict
from pathlib import Path

REQUIRED = {'occurrence_id', 'document_id', 'line_id', 'damos_reading',
            'normalized_form', 'lemma', 'morphology', 'confidence',
            'epigraphic_status', 'join_status', 'archive', 'lgm_reference'}


def validate(csv_path: Path, manifest_path: Path):
    errors = []
    if not csv_path.is_file() or not manifest_path.is_file():
        return ['Gold CSV and manifest must both exist.']
    payload = csv_path.read_bytes()
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    if manifest.get('state') != 'FROZEN' or manifest.get('audit_approved') is not True:
        errors.append('Manifest must explicitly attest FROZEN and audit_approved=true.')
    if manifest.get('sha256') != hashlib.sha256(payload).hexdigest():
        errors.append('Gold CSV SHA-256 does not match manifest.')
    for field in ('damos_source', 'lgm_source', 'schema_version', 'freeze_date', 'auditor'):
        if not manifest.get(field):
            errors.append(f'Missing manifest provenance: {field}')
    rows = list(csv.DictReader(payload.decode('utf-8-sig').splitlines()))
    if not rows:
        errors.append('Gold CSV must contain records.')
        return errors
    missing = REQUIRED - set(rows[0])
    if missing:
        errors.append('Missing columns: ' + ', '.join(sorted(missing)))
        return errors
    ids = set()
    lemma_forms = defaultdict(set)
    for n, row in enumerate(rows, start=2):
        oid = row['occurrence_id']
        if not oid or oid in ids:
            errors.append(f'Row {n}: blank/duplicate occurrence_id')
        ids.add(oid)
        if row['epigraphic_status'] != 'SECURE' or row['join_status'] != 'MATCHED':
            errors.append(f'Row {n}: insecure or unmatched occurrence in primary gold')
        if row['confidence'] != 'HIGHEST':
            errors.append(f'Row {n}: non-highest-confidence linguistic analysis')
        if not all(row[k].strip() for k in REQUIRED):
            errors.append(f'Row {n}: blank required value')
        lemma_forms[row['lemma']].add(row['damos_reading'])
    for lemma, forms in lemma_forms.items():
        if len(forms) < 2:
            errors.append(f'Lemma {lemma}: fewer than two distinct secure surface forms')
    if manifest.get('record_count') != len(rows):
        errors.append('Manifest record_count mismatch')
    return errors


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--gold', type=Path, required=True)
    p.add_argument('--manifest', type=Path, required=True)
    args = p.parse_args()
    errors = validate(args.gold, args.manifest)
    if errors:
        for error in errors:
            print('FAIL:', error)
        raise SystemExit(1)
    print('PASS: structural freeze checks only; manual audit attestation still required')


if __name__ == '__main__':
    main()
