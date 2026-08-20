#!/usr/bin/env python3
from __future__ import annotations
import re, struct, hashlib, csv, json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

MAGIC=0x8495A6BE
PSB=0x80; PSI=0x40; PSS=0x20
C_INT8=0x00; C_INT16=0x01; C_INT32=0x02; C_INT64=0x03; C_SH8=0x04; C_SH16=0x05; C_SH32=0x06
C_DA32L=0x07; C_BLOCK32=0x08; C_STR8=0x09; C_STR32=0x0A; C_DBIG=0x0B; C_DLIT=0x0C
C_DA8B=0x0D; C_DA8L=0x0E; C_DA32B=0x0F; C_CUSTOM=0x12; C_BLOCK64=0x13; C_CUSTOM_LEN=0x18; C_CUSTOM_FIXED=0x19

@dataclass
class Block:
    tag:int
    fields:list[Any]

class R:
    def __init__(self,b): self.b=b; self.p=0; self.t=[]
    def take(self,n):
        x=self.b[self.p:self.p+n]
        if len(x)!=n: raise ValueError('truncated')
        self.p+=n; return x
    def u8(self): return self.take(1)[0]
    def u16(self): return struct.unpack('>H',self.take(2))[0]
    def u32(self): return struct.unpack('>I',self.take(4))[0]
    def reg(self,v): self.t.append(v); return v
    def shared(self,d):
        i=len(self.t)-d
        if not 0<=i<len(self.t): raise ValueError(('shared',d,len(self.t)))
        return self.t[i]
    def block(self,tag,n):
        if n==0: return Block(tag,[])
        z=Block(tag,[]); self.reg(z); z.fields=[self.val() for _ in range(n)]; return z
    def string(self,n): return self.reg(self.take(n).decode('utf-8',errors='replace'))
    def custom(self,code):
        a=bytearray()
        while True:
            c=self.u8()
            if c==0: break
            a.append(c)
        name=a.decode('ascii',errors='replace')
        if code==C_CUSTOM_LEN: self.take(16)
        sizes={'_j':8,'_i':4,'_n':8}
        if name not in sizes: raise ValueError(('custom',name))
        return self.reg(int.from_bytes(self.take(sizes[name]),'big',signed=True))
    def val(self):
        c=self.u8()
        if c>=PSB: return self.block(c&0x0f,(c>>4)&7)
        if c>=PSI: return c&0x3f
        if c>=PSS: return self.string(c&0x1f)
        if c==C_INT8: return struct.unpack('>b',self.take(1))[0]
        if c==C_INT16: return struct.unpack('>h',self.take(2))[0]
        if c==C_INT32: return struct.unpack('>i',self.take(4))[0]
        if c==C_INT64: return struct.unpack('>q',self.take(8))[0]
        if c==C_SH8: return self.shared(self.u8())
        if c==C_SH16: return self.shared(self.u16())
        if c==C_SH32: return self.shared(self.u32())
        if c==C_BLOCK32:
            h=self.u32(); return self.block(h&0xff,h>>10)
        if c==C_STR8: return self.string(self.u8())
        if c==C_STR32: return self.string(self.u32())
        if c==C_DLIT: return self.reg(struct.unpack('<d',self.take(8))[0])
        if c==C_DBIG: return self.reg(struct.unpack('>d',self.take(8))[0])
        if c in (C_DA8L,C_DA8B):
            n=self.u8(); fmt='<d' if c==C_DA8L else '>d'; return self.reg([struct.unpack(fmt,self.take(8))[0] for _ in range(n)])
        if c in (C_DA32L,C_DA32B):
            n=self.u32(); fmt='<d' if c==C_DA32L else '>d'; return self.reg([struct.unpack(fmt,self.take(8))[0] for _ in range(n)])
        if c in (C_CUSTOM,C_CUSTOM_LEN,C_CUSTOM_FIXED): return self.custom(c)
        if c==C_BLOCK64: raise ValueError('block64')
        raise ValueError(('opcode',hex(c),self.p-1))

def unmarshal(buf):
    magic,n,obj,_,_=struct.unpack('>IIIII',buf[:20])
    assert magic==MAGIC and n==len(buf)-20
    r=R(buf[20:]); v=r.val(); assert r.p==n and len(r.t)==obj,(r.p,n,len(r.t),obj); return v

VAR_RE=re.compile(r"var (\w+) = '(.*?)';",re.S)
def ocaml_bytes(lit):
    assert lit[0]=='"' and lit[-1]=='"'
    s=lit[1:-1]; out=bytearray(); i=0
    while i<len(s):
        if s[i]=='\\':
            n=s[i+1]
            if n.isdigit(): out.append(int(s[i+1:i+4])); i+=4
            elif n=='x': out.append(int(s[i+2:i+4],16)); i+=4
            elif n=='n': out.append(10); i+=2
            elif n=='t': out.append(9); i+=2
            else: out.append(ord(n)); i+=2
        else: out.append(ord(s[i])); i+=1
    return bytes(out)

def parse(text):
    return {name:unmarshal(ocaml_bytes(js.replace('\\\\','\\'))) for name,js in VAR_RE.findall(text)}

def map_items(node):
    if isinstance(node,int): return
    left,key,val,right,_=node.fields
    yield from map_items(left); yield key,val; yield from map_items(right)
def opt(v):
    if isinstance(v,Block) and v.tag==0 and len(v.fields)==1:return v.fields[0]
    return None if v==0 else v

def find_sign_record(v,depth=0):
    if isinstance(v,Block):
        if len(v.fields)==9 and isinstance(v.fields[0],str): return v
        if depth<5:
            for f in v.fields:
                x=find_sign_record(f,depth+1)
                if x is not None:return x
    return None

def first_string(v,depth=0):
    if isinstance(v,str):return v
    if isinstance(v,Block) and depth<5:
        for f in v.fields:
            s=first_string(f,depth+1)
            if s:return s
    return ''
SUB={str(d):chr(0x2080+d) for d in range(10)}
def subscript(s):return ''.join(SUB.get(c,c) for c in s)
def find_pair(v,depth=0):
    if isinstance(v,Block):
        if len(v.fields)>=2 and isinstance(v.fields[0],str):return v
        if depth<6:
            for f in v.fields:
                x=find_pair(f,depth+1)
                if x is not None:return x
    return None
def option_string(v):
    if isinstance(v,Block) and v.tag==0 and len(v.fields)==1:
        x=v.fields[0]; return x if isinstance(x,str) else first_string(x)
    return ''
def translit(f2):
    p=find_pair(f2)
    if p is None:return first_string(f2)
    b=p.fields[0]
    if not isinstance(b,str):return first_string(f2)
    o=option_string(p.fields[1]); return b+subscript(o) if o else b

def triple(rec):return str(rec.fields[0]),translit(rec.fields[2]),first_string(rec.fields[3])
def display(series,num,value):
    if value:return value.upper()
    if num is not None:return f'*{num}'
    return ''
def logogram(rec):
    for idx in (4,8):
        f=rec.fields[idx]
        if isinstance(f,Block) and f.tag==0 and len(f.fields)==1 and isinstance(f.fields[0],str):
            n=f.fields[0]
            if n and n!='num': return n
    return ''
def is_fraction(rec):
    f7=rec.fields[7]; return isinstance(f7,Block) and 'Fraction' in first_string(f7)
def word_index(att):
    if not (isinstance(att,Block) and len(att.fields)>3):return None
    f3=att.fields[3]
    if isinstance(f3,Block) and len(f3.fields)==2 and isinstance(f3.fields[0],Block):
        inn=f3.fields[0]
        if len(inn.fields)==2 and all(isinstance(x,int) for x in inn.fields):return int(inn.fields[1])
    return None

def main(src,out):
    text=Path(src).read_text(encoding='utf-8'); sha=hashlib.sha256(text.encode()).hexdigest(); db=parse(text)
    by_triple={}; by_number={}
    for number,rec in map_items(db['signs'].fields[0]):
        f=find_sign_record(rec)
        if f is None:continue
        series,value,ref=triple(f); by_triple[(series,value,ref)]=number
        logo=logogram(f)
        if value:kind,disp='syllable',value.upper()
        elif logo:kind,disp='logogram',logo
        elif is_fraction(f):kind,disp='fraction',''
        else:kind,disp=('syllable' if series=='A' else 'blank'),display(series,number,value)
        by_number[number]={'display':disp,'kind':kind,'series':series}
    rows=[]; idx=0
    for doc_id,wrapper in map_items(db['data'].fields[0]):
        doc=wrapper.fields[0]; meta=doc.fields[0]; atb=doc.fields[4]
        atts=[]
        if isinstance(atb,Block): atts=list(atb.fields)
        groups={}
        for att in atts:
            w=word_index(att)
            if w is not None: groups.setdefault(w,[]).append(att)
        for w in sorted(groups):
            comps=[]; all_syll=True; unresolved=False
            for att in groups[w]:
                rec=find_sign_record(att)
                if rec is None:
                    comps.append('*?'); all_syll=False; unresolved=True; continue
                series,value,ref=triple(rec)
                num=by_triple.get((series,value,ref))
                num2=rec.fields[1] if isinstance(rec.fields[1],int) else num
                # CRUCIAL ORIGINAL-STEP2 RULE: missing transliteration on the attestation copy remains unresolved;
                # do NOT resolve from signs-table transnumeration for cleanliness.
                logo = logogram(rec)
                if value:
                    sign=value.upper(); kind='syllable'
                elif logo:
                    # The original Step-2 word rendering retained named/composite
                    # sign labels even when the syllabographic transliteration field
                    # was empty (e.g. VIN, AROM, VIR, DDDD).
                    sign=logo.upper(); kind='syllable'
                elif series == 'A' and num2 is not None:
                    sign=f'*{num2}'; kind='syllable'
                else:
                    sign='*?'; kind='blank'; unresolved=True
                comps.append(sign)
                if kind!='syllable':all_syll=False
            token='-'.join(comps)
            reasons=[]
            if any(c in token for c in '?[]'): reasons.append('EDITORIAL_UNCERTAINTY_OR_BREAK')
            if not all_syll: reasons.append('NON_SYLLABIC_COMPONENT')
            if unresolved: reasons.append('UNRESOLVED_SIGN')
            if any(c in token for c in '()+{|}'): reasons.append('COMPLEX_OR_COMPOSITE_SIGN')
            # sign labels for clean tokens are exact components; unclean still retained for audit.
            signs=comps if all_syll else comps
            rows.append({
                'index':idx,'document_id':doc_id,'site':meta.fields[2], 'typology':meta.fields[0],
                'period':opt(meta.fields[7]) or '', 'word_index':w,'token_text':token,
                'sign_count_positions':len(comps),'readable_sign_count':sum(x!='*?' for x in comps),
                'signs_json':json.dumps(signs,ensure_ascii=False),'is_clean':int(not reasons),
                'exclusion_reasons':' + '.join(reasons),'source_sha256_raw':sha
            }); idx+=1
    with open(out,'w',encoding='utf-8',newline='') as f:
        cw=csv.DictWriter(f,fieldnames=list(rows[0]));cw.writeheader();cw.writerows(rows)
    from collections import Counter
    c=Counter()
    for r in rows:
        if r['is_clean']:c['CLEAN']+=1
        for x in r['exclusion_reasons'].split(' + '):
            if x:c[x]+=1
    print(json.dumps({'sha':sha,'rows':len(rows),'clean':sum(r['is_clean'] for r in rows),'docs':len(set(r['document_id'] for r in rows)),'counts':c},indent=2,default=dict))
if __name__=='__main__':
    import sys;main(sys.argv[1],sys.argv[2])
