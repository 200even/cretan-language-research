#!/usr/bin/env python3
from __future__ import annotations
import argparse, csv, hashlib, json, secrets
from collections import Counter, defaultdict
from pathlib import Path
import pandas as pd

EXPECTED_CLEAN_SHA='83298a8c5b8f852edaf8d0f25bcc7affb07a71aa27561169f5152ad5bf28b3c9'
EXPECTED_DIP_SHA='7f116db2b32eeaf1c639e0c54f0c4755c6b4144e4ddf03c17af51e9121f0c8f5'
PRIMARY={'Tablet','Nodule','Roundel'}


def sha(path:Path)->str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def parse_signs(x):
    v=json.loads(x)
    return tuple(str(s) for s in v)

def h(salt:str, kind:str, obj)->str:
    payload=json.dumps(obj,ensure_ascii=False,separators=(',',':'),sort_keys=True)
    return hashlib.sha256(f'{salt}|{kind}|{payload}'.encode()).hexdigest()[:12]

def docs_join(xs): return ';'.join(sorted(set(xs)))

def sites_join(xs): return ';'.join(sorted(set(xs)))

def write_csv(path, rows, fields=None):
    rows=list(rows)
    if not rows and not fields:
        path.write_text('',encoding='utf-8'); return
    if fields is None:
        fields=list(rows[0].keys())
    with path.open('w',encoding='utf-8',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)

def load(clean_path:Path,dip_path:Path):
    if sha(clean_path)!=EXPECTED_CLEAN_SHA: raise SystemExit('clean-v2.1 SHA mismatch')
    if sha(dip_path)!=EXPECTED_DIP_SHA: raise SystemExit('diplomatic census SHA mismatch')
    df=pd.read_csv(clean_path)
    df['signs']=df.signs_json.map(parse_signs)
    df['len']=df.signs.map(len)
    dip=pd.read_csv(dip_path)
    lexical_per_doc=dip.groupby('doc_key').size().to_dict()
    return df,dip,lexical_per_doc

def strata(df):
    primary=df[df.typology.isin(PRIMARY) & df['len'].between(2,8)].copy()
    nonprimary=df[~(df.index.isin(primary.index))].copy()
    full=df.copy()
    return {'primary':primary,'nonprimary':nonprimary,'full':full}

def type_index(df):
    out={}
    for signs,g in df.groupby('signs',sort=False):
        out[signs]={
            'n_tokens':len(g),
            'docs':tuple(sorted(set(g.document_id.astype(str)))),
            'dip_docs':tuple(sorted(set(g.diplomatic_doc_key.fillna('').astype(str)) - {''})),
            'sites':tuple(sorted(set(g.site.fillna('').astype(str)) - {''})),
            'typologies':tuple(sorted(set(g.typology.fillna('').astype(str)) - {''})),
            'rows':g,
        }
    return out

def primitive_edges(idx, lexical_per_doc):
    edges=[]
    for ext,eg in idx.items():
        if len(ext)<3: continue
        base=ext[:-1]
        if base not in idx: continue
        bg=idx[base]
        iso_ext_docs=sorted(d for d in eg['dip_docs'] if lexical_per_doc.get(d)==1)
        same_docs=sorted(set(bg['docs']) & set(eg['docs']))
        edges.append({
            'base':base,'extended':ext,'added_sign':ext[-1],'base_len':len(base),
            'base_tokens':bg['n_tokens'],'extended_tokens':eg['n_tokens'],
            'base_docs':bg['docs'],'extended_docs':eg['docs'],
            'base_sites':bg['sites'],'extended_sites':eg['sites'],
            'same_document_docs':tuple(same_docs),'isolated_extended_dip_docs':tuple(iso_ext_docs),
            'auto_factorization_clear':bool(iso_ext_docs),
        })
    edges.sort(key=lambda e:(e['added_sign'],e['base'],e['extended']))
    return edges

def simple_abstract(edges):
    by=defaultdict(list)
    for e in edges: by[e['added_sign']].append(e)
    out=[]
    for sign,es in by.items():
        bases={e['base'] for e in es}
        ext_docs=set(d for e in es for d in e['extended_docs'])
        all_docs=set(d for e in es for d in (e['base_docs']+e['extended_docs']))
        sites=set(s for e in es for s in (e['base_sites']+e['extended_sites']))
        auto=any(e['auto_factorization_clear'] for e in es)
        computational_pass=(len(bases)>=2 and len(ext_docs)>=2 and auto)
        out.append({
            'added_sign':sign,'n_base_stems':len(bases),'n_primitive_edges':len(es),
            'n_extended_documents':len(ext_docs),'n_all_support_documents':len(all_docs),
            'n_sites':len(sites),'factorization_auto_clear':auto,
            'stem_robustness_pass':all(len(b)>=2 for b in bases),
            'dual_independence_pass':len(bases)>=2 and len(ext_docs)>=2,
            'computational_promotion_gate_pass':computational_pass,
            'epigraphy_status':'REVIEW_REQUIRED' if computational_pass else 'NOT_REACHED',
            'promotion_status':'CANDIDATE_PENDING_EPIGRAPHY' if computational_pass else 'LEVEL_1_EXPLORATORY',
            'bases':tuple(sorted(bases)), 'extended_docs':tuple(sorted(ext_docs)),
            'sites':tuple(sorted(sites)),
        })
    out.sort(key=lambda x:(-x['n_base_stems'],-x['n_extended_documents'],x['added_sign']))
    return out

def ladders(idx, edges, lexical_per_doc):
    edge_map={(e['base'],e['extended']):e for e in edges}
    out=[]
    for xyz,topg in idx.items():
        if len(xyz)<4: continue
        xy=xyz[:-1]; x=xyz[:-2]
        if len(x)<2 or x not in idx or xy not in idx: continue
        if (x,xy) not in edge_map or (xy,xyz) not in edge_map: continue
        iso_top=sorted(d for d in topg['dip_docs'] if lexical_per_doc.get(d)==1)
        out.append({
            'base':x,'middle':xy,'top':xyz,'stage1_sign':xy[-1],'stage2_sign':xyz[-1],
            'base_docs':idx[x]['docs'],'middle_docs':idx[xy]['docs'],'top_docs':topg['docs'],
            'base_sites':idx[x]['sites'],'middle_sites':idx[xy]['sites'],'top_sites':topg['sites'],
            'isolated_top_dip_docs':tuple(iso_top),'auto_factorization_clear':bool(iso_top),
        })
    out.sort(key=lambda r:(r['stage1_sign'],r['stage2_sign'],r['base']))
    return out

def abstract_stage2(ladders):
    by=defaultdict(list)
    for r in ladders: by[(r['stage1_sign'],r['stage2_sign'])].append(r)
    out=[]
    for (y,z),ls in by.items():
        bases={r['base'] for r in ls}
        top_docs=set(d for r in ls for d in r['top_docs'])
        sites=set(s for r in ls for s in (r['base_sites']+r['middle_sites']+r['top_sites']))
        auto=any(r['auto_factorization_clear'] for r in ls)
        complete_ladder_replication=(len(bases)>=2 and len(top_docs)>=2)
        computational_pass=complete_ladder_replication and auto
        out.append({
            'stage1_sign':y,'stage2_sign':z,'n_complete_ladders':len(ls),'n_base_stems':len(bases),
            'n_top_documents':len(top_docs),'n_sites':len(sites),
            'two_complete_ladders_pass':complete_ladder_replication,
            'factorization_auto_clear':auto,
            'computational_promotion_gate_pass':computational_pass,
            'epigraphy_status':'REVIEW_REQUIRED' if computational_pass else 'NOT_REACHED',
            'promotion_status':'CANDIDATE_PENDING_EPIGRAPHY' if computational_pass else 'LEVEL_1_ORTHOGRAPHIC_CHAIN',
            'bases':tuple(sorted(bases)),'top_docs':tuple(sorted(top_docs)),'sites':tuple(sorted(sites)),
        })
    out.sort(key=lambda r:(-r['n_base_stems'],-r['n_top_documents'],r['stage1_sign'],r['stage2_sign']))
    return out

def sibling_motifs(edges):
    by=defaultdict(list)
    for e in edges: by[e['base']].append(e)
    out=[]
    for base,es in by.items():
        signs=sorted({e['added_sign'] for e in es})
        if len(signs)>=2:
            out.append({'base':base,'n_children':len(signs),'added_signs':tuple(signs),
                        'child_types':tuple(sorted(e['extended'] for e in es))})
    out.sort(key=lambda r:(-r['n_children'],r['base']))
    return out

def blind_rows(kind,rows,salt):
    ans=[]
    for r in rows:
        q={}
        for k,v in r.items():
            if k in {'added_sign','stage1_sign','stage2_sign'}:
                q[k+'_blind']='S_'+h(salt,'sign',v)
            elif k in {'base','middle','top','extended'}:
                q[k+'_blind']='W_'+h(salt,'word',v)
            elif k in {'bases','child_types'}:
                q[k+'_blind']=';'.join('W_'+h(salt,'word',x) for x in v)
            elif k=='added_signs':
                q[k+'_blind']=';'.join('S_'+h(salt,'sign',x) for x in v)
            elif k in {'base_docs','extended_docs','same_document_docs','isolated_extended_dip_docs','middle_docs','top_docs','isolated_top_dip_docs','sites','base_sites','extended_sites','middle_sites','top_sites'}:
                q[k]=docs_join(v)
            else:
                q[k]=v
        ans.append(q)
    return ans

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--clean',type=Path,required=True); ap.add_argument('--diplomatic',type=Path,required=True)
    ap.add_argument('--out-dir',type=Path,required=True); ap.add_argument('--unblind',action='store_true')
    ns=ap.parse_args(); ns.out_dir.mkdir(parents=True,exist_ok=True)
    df,dip,lexical_per_doc=load(ns.clean,ns.diplomatic)
    salt_path=ns.out_dir/'stage5d_blind_salt.txt'
    if salt_path.exists(): salt=salt_path.read_text().strip()
    else:
        salt=secrets.token_hex(32); salt_path.write_text(salt+'\n')
    all_summary={
        'method':'Stage 5D blind lexical-state morphotactic network',
        'clean_sha256':sha(ns.clean),'diplomatic_sha256':sha(ns.diplomatic),
        'promotion_interpretation':'computational gate only; epigraphy review mandatory before validation',
        'strata':{}
    }
    unblind_key={'salt_sha256':hashlib.sha256(salt.encode()).hexdigest(),'signs':{},'words':{}}
    for stratum,sdf in strata(df).items():
        idx=type_index(sdf); edges=primitive_edges(idx,lexical_per_doc); simple=simple_abstract(edges)
        lads=ladders(idx,edges,lexical_per_doc); s2=abstract_stage2(lads); sib=sibling_motifs(edges)
        for signs in idx: unblind_key['words']['W_'+h(salt,'word',signs)]='-'.join(signs)
        signset={e['added_sign'] for e in edges}|{r['stage1_sign'] for r in lads}|{r['stage2_sign'] for r in lads}
        for s in signset: unblind_key['signs']['S_'+h(salt,'sign',s)]=s
        prefix=ns.out_dir/f'{stratum}'
        write_csv(Path(str(prefix)+'_primitive_edges_blind.csv'), blind_rows('edges',edges,salt))
        write_csv(Path(str(prefix)+'_simple_abstract_blind.csv'), blind_rows('simple',simple,salt))
        write_csv(Path(str(prefix)+'_complete_ladders_blind.csv'), blind_rows('ladders',lads,salt))
        write_csv(Path(str(prefix)+'_stage2_abstract_blind.csv'), blind_rows('stage2',s2,salt))
        write_csv(Path(str(prefix)+'_siblings_blind.csv'), blind_rows('siblings',sib,salt))
        if ns.unblind:
            def fmt(rows):
                out=[]
                for r in rows:
                    q={}
                    for k,v in r.items():
                        if isinstance(v,tuple):
                            if v and isinstance(v[0],tuple): q[k]=';'.join('-'.join(x) for x in v)
                            else: q[k]=';'.join(str(x) for x in v)
                        elif isinstance(v,bool): q[k]=int(v)
                        else: q[k]=v
                    for k in ('base','middle','top','extended'):
                        if k in q and isinstance(r[k],tuple): q[k]='-'.join(r[k])
                    if 'bases' in r: q['bases']=';'.join('-'.join(x) for x in r['bases'])
                    if 'child_types' in r: q['child_types']=';'.join('-'.join(x) for x in r['child_types'])
                    q.pop('added_signs',None)
                    out.append(q)
                return out
            write_csv(Path(str(prefix)+'_primitive_edges.csv'),fmt(edges))
            write_csv(Path(str(prefix)+'_simple_abstract.csv'),fmt(simple))
            write_csv(Path(str(prefix)+'_complete_ladders.csv'),fmt(lads))
            write_csv(Path(str(prefix)+'_stage2_abstract.csv'),fmt(s2))
            write_csv(Path(str(prefix)+'_siblings.csv'),fmt(sib))
        all_summary['strata'][stratum]={
            'tokens':len(sdf),'documents':int(sdf.document_id.nunique()),'types':len(idx),
            'primitive_edges':len(edges),'distinct_extension_signs':len(simple),
            'simple_dual_independence_pass':sum(r['dual_independence_pass'] for r in simple),
            'simple_factorization_auto_clear':sum(r['factorization_auto_clear'] for r in simple),
            'simple_computational_promotion_gate_pass':sum(r['computational_promotion_gate_pass'] for r in simple),
            'complete_three_state_ladders':len(lads),'distinct_stage2_transitions':len(s2),
            'stage2_two_complete_ladders_pass':sum(r['two_complete_ladders_pass'] for r in s2),
            'stage2_computational_promotion_gate_pass':sum(r['computational_promotion_gate_pass'] for r in s2),
            'sibling_parent_motifs':len(sib),
        }
    (ns.out_dir/'stage5d_blind_summary.json').write_text(json.dumps(all_summary,indent=2,ensure_ascii=False)+'\n')
    (ns.out_dir/'stage5d_unblind_key.json').write_text(json.dumps(unblind_key,indent=2,ensure_ascii=False)+'\n')
    print(json.dumps(all_summary,indent=2,ensure_ascii=False))

if __name__=='__main__': main()
