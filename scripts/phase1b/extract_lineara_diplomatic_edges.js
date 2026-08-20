const fs = require('fs');
const vm = require('vm');
const srcPath = process.argv[2] || '/mnt/data/LinearAInscriptions_43fe7cf.js';
const src = fs.readFileSync(srcPath,'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(src + '\nthis.__INSCRIPTIONS__ = inscriptions;', context);
const inscriptions = context.__INSCRIPTIONS__;
const DAMAGE='𐝫';
function isLexical(s){
  if(typeof s!=='string' || !s || s==='\n' || s===DAMAGE) return false;
  if(/^\d+(?:\.\d+)?$/.test(s)) return false;
  if([...s].some(ch => ch.codePointAt(0)>=0x10000 && ch.codePointAt(0)<=0x10ffff)) return false;
  return /[A-Z*]/.test(s);
}
function cleanParts(s){ return s.split('-').filter(Boolean); }
function isSyllableLabel(p){ return /^\*[0-9]+$/.test(p) || /^[A-Z]+[₀₁₂₃₄₅₆₇₈₉]*$/.test(p); }
let rows=[];
for(const [doc,v] of inscriptions){
  const tw=v.transliteratedWords||[], ww=v.words||[];
  const n=Math.min(tw.length,ww.length);
  for(let i=0;i<n;i++){
    const tok=tw[i], glyph=ww[i];
    if(!isLexical(tok) || typeof glyph!=='string') continue;
    const cps=[...glyph];
    const left_open=cps[0]===DAMAGE;
    const right_open=cps[cps.length-1]===DAMAGE;
    const interior=cps.slice(left_open?1:0,right_open?cps.length-1:cps.length).includes(DAMAGE);
    const parts=cleanParts(tok);
    const syllabic=parts.length>0 && parts.every(isSyllableLabel);
    const primary=['Tablet','Nodule','Roundel'].includes(v.support);
    const eligible=primary && syllabic && parts.length>=2 && parts.length<=8;
    rows.push({doc_key:doc,site:v.site||'',support:v.support||'',context:v.context||'',array_index:i,
      normalized_token:tok,glyph_word:glyph,left_open,right_open,interior_damage:interior,
      any_edge_damage:left_open||right_open,syllabic,sign_count:parts.length,primary,eligible,
      source_commit:'43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a'});
  }
}
function csvEscape(x){
  if(typeof x==='boolean') x=x?1:0;
  if(x===null||x===undefined) return '';
  let s=String(x);
  return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;
}
const cols=Object.keys(rows[0]);
let csv=cols.join(',')+'\n'+rows.map(r=>cols.map(c=>csvEscape(r[c])).join(',')).join('\n')+'\n';
fs.writeFileSync('/mnt/data/lineara_diplomatic_edge_census.csv',csv);
const summary={source_commit:'43fe7cf1abc8e6bb1ea3228c3a1bd5938709620a',source_file:srcPath,inscription_records:inscriptions.size,lexical_rows:rows.length,edge_damaged_rows:rows.filter(r=>r.any_edge_damage).length,primary_rows:rows.filter(r=>r.primary).length,primary_edge_damaged_rows:rows.filter(r=>r.primary&&r.any_edge_damage).length,eligible_rows:rows.filter(r=>r.eligible).length,eligible_edge_damaged_rows:rows.filter(r=>r.eligible&&r.any_edge_damage).length,eligible_interior_damage_rows:rows.filter(r=>r.eligible&&r.interior_damage).length};
fs.writeFileSync('/mnt/data/lineara_diplomatic_edge_census_summary.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
