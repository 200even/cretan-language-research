#!/usr/bin/env python3
from __future__ import annotations
import csv, hashlib, importlib.util, json
from pathlib import Path
import numpy as np

ROOT=Path('/mnt/data')
CLEAN=ROOT/'sigla_tokens_clean_v2_1.csv'
LOCKED=ROOT/'04_run_blind_calibration.py'
OUT_JSON=ROOT/'phase1b_ti_ja_confirmatory_results.json'
OUT_CSV=ROOT/'phase1b_ti_ja_confirmatory_results.csv'
SIGLA_SHA='cc624f148fd84c94fd2910b0adf92ecace25f52f9175664122bdf8384a8f1b9d'
CLEAN_SHA=hashlib.sha256(CLEAN.read_bytes()).hexdigest()
LOCK_SHA=hashlib.sha256(LOCKED.read_bytes()).hexdigest()
EXPECTED_LOCK='f19a24af71afd25091734638377f99570a3d370ef3022f1261850dc6a660e6be'
if LOCK_SHA != EXPECTED_LOCK:
    raise SystemExit(f'locked script hash mismatch {LOCK_SHA}')

spec=importlib.util.spec_from_file_location('locked_cal', LOCKED)
cal=importlib.util.module_from_spec(spec); spec.loader.exec_module(cal)
tokens=cal.prepare_tokens(CLEAN)

def deterministic_seed(candidate:str)->int:
    material=f'{SIGLA_SHA}|{CLEAN_SHA}|{candidate}'.encode()
    return int.from_bytes(hashlib.sha256(material).digest()[:8], 'big')

results=[]
for cand in ('TI','JA'):
    pos=cal.positions(tokens)
    pos['cand']=(pos['current']==cand).astype(int)
    deltas=cal.cv_delta(pos)
    seed=deterministic_seed(cand)
    lo,hi=cal.bootstrap_ci(deltas, seed)
    cp=pos[pos['current']==cand]
    cis=[]
    for i in range(100):
        s=int.from_bytes(hashlib.sha256(f'{SIGLA_SHA}|{CLEAN_SHA}|{cand}|ROBUST|{i}'.encode()).digest()[:8], 'big')
        cis.append(cal.bootstrap_ci(deltas,s))
    lows=np.array([x[0] for x in cis]); highs=np.array([x[1] for x in cis])
    results.append({'candidate':cand,'eligible_tokens':int(len(tokens)),'documents':int(tokens['document_id'].nunique()),'distinct_types':int(tokens['token_text'].nunique()),'effective_token_weight':float(tokens['weight'].sum()),'candidate_total_occurrences':int(len(cp)),'candidate_terminal_occurrences':int(cp['terminal'].sum()),'candidate_internal_occurrences':int(len(cp)-cp['terminal'].sum()),'candidate_documents':int(cp['doc'].nunique()),'delta_ll':float(deltas.sum()),'bootstrap_seed':int(seed),'ci99_lo':float(lo),'ci99_hi':float(hi),'confirmatory_recovered':bool(lo>0),'robustness_100_seed_ci99_lo_min':float(lows.min()),'robustness_100_seed_ci99_lo_max':float(lows.max()),'robustness_100_seed_ci99_hi_min':float(highs.min()),'robustness_100_seed_ci99_hi_max':float(highs.max()),'robustness_all_100_same_significance':bool(np.all(lows>0) if lo>0 else np.all(lows<=0))})

report={'analysis':'Phase 1B clean-v2.1 TI/JA confirmatory Test 2B','candidate_wrapper_seed_policy':'first 64 bits SHA256(frozen_sigla_sha256 | clean_v2_sha256 | candidate), frozen before clean-v2 TI/JA outcomes were computed; historical wrapper RNG seed was not recoverable','frozen_sigla_sha256':SIGLA_SHA,'clean_v2_sha256':CLEAN_SHA,'locked_calibration_script_sha256':LOCK_SHA,'bootstrap_replicates':cal.BOOT_B,'ci_quantiles':[0.005,0.995],'results':results}
OUT_JSON.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
with OUT_CSV.open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=list(results[0].keys())); w.writeheader(); w.writerows(results)
print(json.dumps(report,indent=2))
