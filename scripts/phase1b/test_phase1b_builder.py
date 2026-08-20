import csv, tempfile, sys
from pathlib import Path
import importlib.util

spec = importlib.util.spec_from_file_location('b', '/mnt/data/build_sigla_tokens_clean_v2.py')
b = importlib.util.module_from_spec(spec); sys.modules['b']=b; spec.loader.exec_module(b)

# Synthetic exact rows covering the six hostile controls. This tests the actual
# candidate-blind transfer rule, including both-open and non-primary supports.
sig=[]
controls=[
 ('PH 28a','Phaistos','Tablet','A-RI-JA',3),
 ('HT 39','Haghia Triada','Tablet','SA-MA-TI',3),
 ('ZA 19','Zakros','Tablet','RA-TE',2),
 ('HT 55b','Haghia Triada','Tablet','RI-JA',2),
 ('KN Wb 33','Knossos','Sealing','QA-KI',2),
 ('IO Za 11','Iouktas','Stone vessel','U-TI-NU',3),
]
for i,(doc,site,typ,tok,n) in enumerate(controls):
    sig.append({'document_id':doc,'site':site,'typology':typ,'period':'','word_index':'0','token_text':tok,
                'sign_count_positions':str(n),'readable_sign_count':str(n),'is_clean':'1','exclusion_reasons':''})

dip=[]
with open('/mnt/data/lineara_diplomatic_edge_census.csv', encoding='utf-8') as f:
    allrows=list(csv.DictReader(f))
for doc,tok in [('PH28a','A-RI-JA'),('HT39','SA-MA-TI'),('ZA19','RA-TE'),('HT55b','RI-JA'),('KNWb33','QA-KI'),('IOZa11','U-TI-NU')]:
    rows=[r for r in allrows if r['doc_key']==doc and b.canonical_token(r['normalized_token'])==b.canonical_token(tok)]
    assert len(rows)==1,(doc,tok,len(rows))
    dip.extend(rows)

out,audit=b.build(sig,dip)
assert len(out)==6
expect=[(0,1),(1,0),(1,1),(1,0),(0,1),(1,0)]
for r,(l,rr) in zip(out,expect):
    assert r['boundary_coverage_v2']=='POSITIVE'
    assert int(r['left_open_v2'])==l
    assert int(r['right_open_v2'])==rr
    assert r['edge_secure_v2']=='0'
    assert r['is_clean_v2']=='0'
print('PASS: 6/6 hostile controls rejected by generic builder rule')

# Repeated-form ambiguity: A-B against A-B, X, A-B cannot be assigned to one
# diplomatic occurrence, so boundary status must remain UNKNOWN rather than guessed.
sig2=[{'document_id':'T 1','site':'S','typology':'Tablet','period':'','word_index':'0','token_text':'A-B',
       'sign_count_positions':'2','readable_sign_count':'2','is_clean':'1','exclusion_reasons':''}]
dip2=[]
for j,tok in enumerate(['A-B','X','A-B']):
    dip2.append({'doc_key':'T1','array_index':str(j),'normalized_token':tok,'glyph_word':'g',
                 'left_open':'0','right_open':'0','interior_damage':'0'})
out2,_=b.build(sig2,dip2)
assert out2[0]['boundary_coverage_v2']=='UNKNOWN'
assert out2[0]['is_clean_v2']=='0'

# Unambiguous complete word survives.
sig3=[{'document_id':'T 2','site':'S','typology':'Tablet','period':'','word_index':'0','token_text':'A-B',
       'sign_count_positions':'2','readable_sign_count':'2','is_clean':'1','exclusion_reasons':''}]
dip3=[{'doc_key':'T2','array_index':'0','normalized_token':'A-B','glyph_word':'g',
       'left_open':'0','right_open':'0','interior_damage':'0'}]
out3,_=b.build(sig3,dip3)
assert out3[0]['boundary_coverage_v2']=='POSITIVE'
assert out3[0]['edge_secure_v2']=='1' and out3[0]['is_clean_v2']=='1'
print('PASS: ambiguity fails closed; unique complete word survives')
