#!/usr/bin/env python3
"""Frozen SigLA v4 holdout replication for the Linear A morphology project.

This script deliberately reuses the Davis v0.2 scoring rule without retuning it.
It reconstructs SigLA word tokens from the v2 attestation stream, applies the
pyaegean/SigLA apparatus semantics, excludes uncertain/lost words, and ranks
signs at word edges.

Expected corpus asset SHA-256:
9a5e4783146144fc5ac54c5dc2b372b39cc0e0ea40ca15207243f8c539f03dd8
"""
from __future__ import annotations
import argparse, csv, hashlib, json, math, re
from collections import Counter, defaultdict
from pathlib import Path

EXPECTED_SHA256 = "9a5e4783146144fc5ac54c5dc2b372b39cc0e0ea40ca15207243f8c539f03dd8"
OBVIOUS_LOGOGRAM_LABELS = {"AROM","CAP","CYP","GAL","GRA","OLE","OLIV","VIN","VIR","VS"}
DAVIS_MAIN_GRID = "A DA JA KA MA NA PA QA RA SA TA WA ZA E DE JE KE ME NE QE RE SE TE I DI KI MI NI PI QI RI SI TI WI O KO PO RO TO U DU JU KU MU NU PU RU SU TU ZU".split()
DAVIS_TARGETS = {"prefix":["A","I"], "suffix":["RE","RO","TE","TI"]}
LABEL_RE = re.compile(r"^(?:[A-Z]+(?:[₀₁₂₃₄₅₆₇₈₉]+)?|\*\d+[A-Z]?)$")


def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for b in iter(lambda:f.read(1024*1024), b''): h.update(b)
    return h.hexdigest()


def reconstruct(payload: dict):
    """Return CERTAIN word tokens plus corpus token-status counts.

    Mirrors pyaegean's SigLA v2 semantics relevant to this test:
    - consecutive syllable/blank attestations sharing a word index form a word;
    - in-word blank is unresolved *? and makes the token UNCLEAR/LOST;
    - ?, [ or ] makes a token UNCLEAR;
    - standalone logograms are counted for status diagnostics but not candidate words.
    """
    words=[]; status=Counter()
    for doc in payload['documents']:
        emitted=[]; pending=[]; pending_word=None
        def flush():
            nonlocal pending,pending_word
            if not pending: return
            text='-'.join((a.get('sign') or '*?') for a in pending)
            signs=tuple(a.get('sign') or '' for a in pending if (a.get('sign') or ''))
            if not signs: st='LOST'
            elif any(c in text for c in '?[]') or any(not (a.get('sign') or '') for a in pending): st='UNCLEAR'
            else: st='CERTAIN'
            status[st]+=1
            if st=='CERTAIN':
                emitted.append({'id':str(doc['id']),'site':doc.get('site') or '',
                                'support':doc.get('typology') or '', 'signs':signs,
                                'form':'-'.join(signs)})
            pending=[]; pending_word=None
        for att in doc.get('attestations',[]):
            kind=att.get('kind'); word=att.get('word'); sign=att.get('sign') or ''
            if word is not None and kind in ('syllable','blank'):
                if pending_word is not None and word != pending_word: flush()
                pending_word=word; pending.append(att); continue
            flush()
            if kind=='logogram' and sign:
                status['UNCLEAR' if any(c in sign for c in '?[]') else 'CERTAIN'] += 1
            elif kind=='syllable' and sign:
                st='UNCLEAR' if any(c in sign for c in '?[]') else 'CERTAIN'; status[st]+=1
                if st=='CERTAIN':
                    emitted.append({'id':str(doc['id']),'site':doc.get('site') or '',
                                    'support':doc.get('typology') or '', 'signs':(sign,), 'form':sign})
        flush(); words.extend(emitted)
    return words,status


def eligible(words):
    out=[]
    for w in words:
        signs=w['signs']
        if len(signs)<2: continue
        if any(s in OBVIOUS_LOGOGRAM_LABELS for s in signs): continue
        if any(not LABEL_RE.fullmatch(s) for s in signs): continue
        out.append(w)
    return out


def rank(occurrences):
    forms=defaultdict(list)
    for o in occurrences: forms[o['form']].append(o)
    stats=defaultdict(lambda: Counter(initial=0,final=0,internal=0,tokens=0))
    initial_slots=final_slots=len(occurrences)
    internal_slots=sum(max(0,len(o['signs'])-2) for o in occurrences)
    for o in occurrences:
        signs=o['signs']
        for i,s in enumerate(signs):
            stats[s]['tokens']+=1
            if i==0: stats[s]['initial']+=1
            if i==len(signs)-1: stats[s]['final']+=1
            if 0<i<len(signs)-1: stats[s]['internal']+=1
    pp=defaultdict(dict); sp=defaultdict(dict)
    for variant in forms:
        signs=variant.split('-')
        if len(signs)<3: continue
        pb='-'.join(signs[1:]); sb='-'.join(signs[:-1])
        if pb in forms: pp[signs[0]][(pb,variant)] = 1
        if sb in forms: sp[signs[-1]][(sb,variant)] = 1
    rows=[]
    for sign,row in stats.items():
        for side in ('prefix','suffix'):
            bc=row['initial' if side=='prefix' else 'final']
            br=(bc+0.5)/((initial_slots if side=='prefix' else final_slots)+1)
            ir=(row['internal']+0.5)/(internal_slots+1)
            enrichment=math.log2(br/ir)
            pairs=pp[sign] if side=='prefix' else sp[sign]
            pc=len(pairs)
            score=enrichment + 0.75*math.log2(1+pc) + 0.25*math.log2(1+bc)
            rows.append({'side':side,'sign':sign,'score':score,'boundary_count':bc,
                         'internal_count':row['internal'],'boundary_enrichment_log2':enrichment,
                         'exact_extension_pairs':pc,
                         'examples':' | '.join(f'{a} ~ {b}' for a,b in sorted(pairs)[:8])})
    ranked=[]
    for side in ('prefix','suffix'):
        part=[r for r in rows if r['side']==side]
        part.sort(key=lambda r:(-r['score'],-r['exact_extension_pairs'],-r['boundary_count'],r['sign']))
        for i,r in enumerate(part,1): ranked.append({**r,'rank':i})
    return ranked, pp, sp, forms


def hypergeom(N,K,n,x):
    from math import comb
    return comb(K,x)*comb(N-K,n-x)/comb(N,n)


def external_p(N, obs_prefix, obs_suffix):
    d=[]
    for a in range(3):
        pa=hypergeom(N,2,2,a)
        for b in range(5): d.append((a,b,pa*hypergeom(N,4,4,b)))
    return (sum(p for a,b,p in d if a+b>=obs_prefix+obs_suffix),
            sum(p for a,b,p in d if a>=obs_prefix and b>=obs_suffix))


def main():
    ap=argparse.ArgumentParser(); ap.add_argument('corpus',type=Path); ap.add_argument('--out-dir',type=Path,default=Path('data/generated/sigla-v1'))
    args=ap.parse_args(); actual=sha256(args.corpus)
    if actual != EXPECTED_SHA256: raise SystemExit(f'SHA256 mismatch: expected {EXPECTED_SHA256}, got {actual}')
    payload=json.loads(args.corpus.read_text(encoding='utf-8'))
    words,status=reconstruct(payload); occ=eligible(words); ranked,pp,sp,forms=rank(occ)
    args.out_dir.mkdir(parents=True,exist_ok=True)
    headers=['side','rank','sign','score','boundary_count','internal_count','boundary_enrichment_log2','exact_extension_pairs','examples']
    with (args.out_dir/'affix-ranking.csv').open('w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=headers); w.writeheader()
        for r in ranked: w.writerow({k:(f"{r[k]:.6f}" if k in ('score','boundary_enrichment_log2') else r[k]) for k in headers})
    by={(r['side'],r['sign']):r for r in ranked}
    fullN=len({r['sign'] for r in ranked if r['side']=='prefix'})
    grid_present=[s for s in DAVIS_MAIN_GRID if ('prefix',s) in by]
    targets=[]
    for side,ss in DAVIS_TARGETS.items():
        grid_part=[r for r in ranked if r['side']==side and r['sign'] in DAVIS_MAIN_GRID]
        grid_part.sort(key=lambda r:r['rank'])
        for s in ss:
            r=by[(side,s)]; gr=next(i for i,x in enumerate(grid_part,1) if x['sign']==s)
            cutoff=2 if side=='prefix' else 4
            targets.append({'side':side,'sign':s,'full_rank':r['rank'],'full_hit':r['rank']<=cutoff,
                            'grid_rank':gr,'grid_hit':gr<=cutoff,'score':r['score'],'exact_extension_pairs':r['exact_extension_pairs']})
    with (args.out_dir/'davis-targets.csv').open('w',newline='',encoding='utf-8') as f:
        hs=['side','sign','full_rank','full_hit','grid_rank','grid_hit','score','exact_extension_pairs']; w=csv.DictWriter(f,fieldnames=hs);w.writeheader()
        for r in targets:w.writerow(r)
    pairrows=[]
    for side,sign in [('prefix','A'),('prefix','I'),('suffix','JA'),('suffix','TI')]:
        m=pp if side=='prefix' else sp
        for base,var in sorted(m[sign]):
            pairrows.append({'side':side,'sign':sign,'base':base,'variant':var,
                             'base_documents':'; '.join(o['id'] for o in forms[base]),
                             'variant_documents':'; '.join(o['id'] for o in forms[var])})
    with (args.out_dir/'target-pairs.csv').open('w',newline='',encoding='utf-8') as f:
        hs=['side','sign','base','variant','base_documents','variant_documents'];w=csv.DictWriter(f,fieldnames=hs);w.writeheader();w.writerows(pairrows)
    full_pref=sum(1 for r in targets if r['side']=='prefix' and r['full_hit']); full_suf=sum(1 for r in targets if r['side']=='suffix' and r['full_hit'])
    grid_pref=sum(1 for r in targets if r['side']=='prefix' and r['grid_hit']); grid_suf=sum(1 for r in targets if r['side']=='suffix' and r['grid_hit'])
    pfull=external_p(fullN,full_pref,full_suf); pgrid=external_p(len(grid_present),grid_pref,grid_suf)
    summary={
      'sha256':actual,'documents':len(payload['documents']),'token_status_counts':dict(status),
      'eligible_word_tokens':len(occ),'unique_forms':len(forms),'ranked_signs':fullN,
      'davis_main_grid_present':len(grid_present),'davis_main_grid_missing':[s for s in DAVIS_MAIN_GRID if s not in grid_present],
      'primary_hits':full_pref+full_suf,'primary_prefix_hits':full_pref,'primary_suffix_hits':full_suf,
      'primary_total_hits_p':pfull[0],'primary_side_pattern_p':pfull[1],
      'main_grid_hits':grid_pref+grid_suf,'main_grid_prefix_hits':grid_pref,'main_grid_suffix_hits':grid_suf,
      'main_grid_total_hits_p':pgrid[0],'main_grid_side_pattern_p':pgrid[1]
    }
    (args.out_dir/'summary.json').write_text(json.dumps(summary,indent=2)+"\n",encoding='utf-8')
    print(json.dumps(summary,indent=2))
    for t in targets: print(t)

if __name__=='__main__': main()
