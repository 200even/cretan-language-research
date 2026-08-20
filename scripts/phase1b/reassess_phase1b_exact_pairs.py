#!/usr/bin/env python3
from pathlib import Path
import pandas as pd, json
ROOT=Path('/mnt/data')
df=pd.read_csv(ROOT/'sigla_tokens_clean_v2_1.csv')
df['signs']=df.signs_json.map(json.loads).map(tuple)
by={}
for signs,g in df.groupby('signs'): by[signs]=g
rels=[]
for ext,gext in by.items():
    if len(ext)<3: continue
    base=ext[:-1]
    if len(base)<2 or base not in by: continue
    gb=by[base]; base_docs=sorted(set(gb.document_id.astype(str))); ext_docs=sorted(set(gext.document_id.astype(str))); same=sorted(set(base_docs)&set(ext_docs))
    rels.append({'candidate':ext[-1],'base':'-'.join(base),'extended':'-'.join(ext),'base_occurrences':len(gb),'extended_occurrences':len(gext),'base_documents':';'.join(base_docs),'extended_documents':';'.join(ext_docs),'same_document':bool(same),'same_documents':';'.join(same)})
rels=sorted(rels,key=lambda r:(r['candidate'],r['base'],r['extended']))
pd.DataFrame(rels).to_csv(ROOT/'phase1b_clean_v2_1_exact_one_sign_extensions.csv',index=False)
target=[r for r in rels if r['candidate'] in {'TI','JA'}]
pd.DataFrame(target).to_csv(ROOT/'phase1b_ti_ja_exact_pairs_v2_1.csv',index=False)
summary={'clean_tokens_full':len(df),'relations_total':len(rels),'relations_by_extension':pd.Series([r['candidate'] for r in rels]).value_counts().to_dict(),'same_document_relations':sum(r['same_document'] for r in rels),'target_relations':target}
(ROOT/'phase1b_exact_pair_reassessment_v2_1.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False)+'\n')
print(json.dumps(summary,indent=2,ensure_ascii=False))
