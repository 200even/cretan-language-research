#!/usr/bin/env python3
from pathlib import Path
import importlib.util, pandas as pd
P=Path('/mnt/data/build_sigla_tokens_clean_v2_1.py')
spec=importlib.util.spec_from_file_location('b',P); b=importlib.util.module_from_spec(spec); spec.loader.exec_module(b)
# Positive alias: SigLA lowercase face suffix may map to exact unsuffixed diplomatic key.
dip_exact={'KNWB33':['KNWb33'], 'HT41A':['HT41a']}
dip_base={}
doc,status=b.resolve_doc('KN Wb 33a',dip_exact,dip_base)
assert (doc,status)==('KNWb33','LATIN_SIDE_TO_UNSUFFIXED_DOC'),(doc,status)
# Negative alias: do not strip the Latin suffix off a diplomatic key / do not map HT41b to HT41a.
doc,status=b.resolve_doc('HT 41b',dip_exact,dip_base)
assert doc is None and status=='NO_DIPLOMATIC_DOC',(doc,status)
# Actual rebuilt audit positively recovers QA-KI's damaged right edge.
a=pd.read_csv('/mnt/data/sigla_tokens_boundary_audit_v2_1.csv')
r=a[(a.document_id=='KN Wb 33a') & (a.token_text=='QA-KI')]
assert len(r)==1
r=r.iloc[0]
assert r.boundary_coverage_v2=='POSITIVE' and int(r.right_open_v2)==1 and int(r.is_clean_v2)==0
print('PASS: v2.1 Latin-side alias is one-way, exact-target-only, and KN Wb 33a QA-KI positively recovers OPEN_RIGHT')
