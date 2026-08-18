#!/usr/bin/env node
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};
const corpusPath = getArg('--corpus');
const boundaryMaskPath = getArg('--boundary-mask');
const outDir = getArg('--out-dir', 'data/generated-v03');
if (!corpusPath || !boundaryMaskPath) {
  console.error('Usage: node scripts/rank-affixes-v03.mjs --corpus LinearAInscriptions.js --boundary-mask boundary-mask.csv [--out-dir output]');
  process.exit(2);
}

const LOGOGRAMS = new Set(['AROM','CAP','CYP','GAL','GRA','OLE','OLIV','VIN','VIR','VS']);
const canonical = value => String(value).normalize('NFKC').toUpperCase()
  .replaceAll('–','-').replaceAll('—','-').replace(/\s*-\s*/g,'-').replace(/\s+/g,' ').trim();
const numeric = s => /^[-+]?\d+(?:\.\d+)?(?:\s+\d+\/\d+)?$/.test(s) || /^\d+\/\d+$/.test(s) || /^[¼½¾⅓⅔⅛⅜⅝⅞]+$/.test(s);
const syllabic = raw => {
  const s = canonical(raw);
  if (!s || s === '\n' || numeric(s) || !s.includes('-') || /[\[\]{}?…+]|𐝫/.test(s)) return false;
  const parts = s.split('-').filter(Boolean);
  if (parts.length < 2 || parts.some(p => LOGOGRAMS.has(p))) return false;
  return parts.every(p => /^(?:[A-Z]+[0-9]*|\*\d+[A-Z]?)$/.test(p));
};
const signs = form => canonical(form).split('-').filter(Boolean);

const parseCsv = text => {
  const rows=[]; let row=[], field='', quoted=false;
  for (let i=0;i<text.length;i++) {
    const ch=text[i];
    if (quoted) {
      if (ch==='"' && text[i+1]==='"') { field+='"'; i++; }
      else if (ch==='"') quoted=false;
      else field+=ch;
    } else if (ch==='"') quoted=true;
    else if (ch===',') { row.push(field); field=''; }
    else if (ch==='\n') { row.push(field.replace(/\r$/,'')); rows.push(row); row=[]; field=''; }
    else field+=ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const [headers,...body]=rows.filter(r=>r.some(v=>v!==''));
  return body.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
};

const mask = new Map();
for (const row of parseCsv(fs.readFileSync(boundaryMaskPath,'utf8'))) {
  mask.set(`${canonical(row.commentary_id)}\t${canonical(row.form)}`, {
    insecureCount: Number(row.any_insecure_occurrences || 0),
    tableCount: Number(row.table_occurrences || 0),
    evidence: row.evidence || '',
  });
}

const source=fs.readFileSync(corpusPath,'utf8');
const context={}; vm.createContext(context); vm.runInContext(source,context,{timeout:30000,filename:corpusPath});
const inscriptions=context.inscriptions;
if (!(inscriptions instanceof Map) && Object.prototype.toString.call(inscriptions)!=='[object Map]') throw new Error('Expected `inscriptions` Map');

const commentaryCandidates = id => {
  const n=canonical(id); const out=[n]; const stripped=n.replace(/(\d)[AB]$/,'$1');
  if (stripped!==n) out.push(stripped); return [...new Set(out)];
};
const resolveMaskKey = (id, form) => {
  for (const c of commentaryCandidates(id)) {
    const key=`${c}\t${canonical(form)}`;
    if (mask.has(key)) return key;
  }
  return '';
};

const all=[];
for (const [id,rec] of inscriptions.entries()) {
  const words=rec?.transliteratedWords||[];
  for (let tokenIndex=0;tokenIndex<words.length;tokenIndex++) {
    const form=canonical(words[tokenIndex]); if (!syllabic(form)) continue;
    all.push({id:canonical(id),form,signs:signs(form),site:canonical(rec?.site||''),scribe:canonical(rec?.scribe||''),support:canonical(rec?.support||''),tokenIndex,maskKey:resolveMaskKey(id,form),complete:true});
  }
}

// Apply the mask by occurrence count, not by globally blacklisting a form.
// This preserves cases such as HT103, which contains one damaged and one secure
// DA-KU-SE-NE attestation in the same inscription.
const groupedByMaskKey=new Map();
for (const occ of all) {
  if (!occ.maskKey) continue;
  if (!groupedByMaskKey.has(occ.maskKey)) groupedByMaskKey.set(occ.maskKey,[]);
  groupedByMaskKey.get(occ.maskKey).push(occ);
}
for (const [key,occs] of groupedByMaskKey.entries()) {
  occs.sort((a,b)=>a.id.localeCompare(b.id)||a.tokenIndex-b.tokenIndex);
  const n=Math.min(mask.get(key)?.insecureCount||0,occs.length);
  for (let i=0;i<n;i++) occs[i].complete=false;
}

const secure=all.filter(x=>x.complete);
const groupForms = occs => {
  const m=new Map();
  for (const o of occs) { if (!m.has(o.form)) m.set(o.form,[]); m.get(o.form).push(o); }
  return m;
};
const allForms=groupForms(all), secureForms=groupForms(secure);

// Dimension 1: pure edge enrichment on complete words only.
const stats=new Map(); let edgeSlots=secure.length, internalSlots=0;
const stat=s=>{if(!stats.has(s))stats.set(s,{sign:s,initial:0,final:0,internal:0});return stats.get(s);};
for (const o of secure) {
  internalSlots+=Math.max(0,o.signs.length-2);
  o.signs.forEach((s,i)=>{const r=stat(s);if(i===0)r.initial++;if(i===o.signs.length-1)r.final++;if(i>0&&i<o.signs.length-1)r.internal++;});
}
const log2=x=>Math.log(x)/Math.log(2);
const boundary=[];
for (const r of stats.values()) for (const side of ['prefix','suffix']) {
  const count=side==='prefix'?r.initial:r.final;
  const br=(count+.5)/(edgeSlots+1), ir=(r.internal+.5)/(internalSlots+1);
  boundary.push({side,sign:r.sign,boundary_count:count,internal_count:r.internal,boundary_enrichment_log2:log2(br/ir)});
}
const rankedBoundary=[];
for (const side of ['prefix','suffix']) {
  const rows=boundary.filter(r=>r.side===side).sort((a,b)=>b.boundary_enrichment_log2-a.boundary_enrichment_log2||b.boundary_count-a.boundary_count||a.sign.localeCompare(b.sign));
  rows.forEach((r,i)=>rankedBoundary.push({...r,rank:i+1}));
}

// Dimension 2: exact paradigms, classified by whether both forms retain at
// least one complete attestation after occurrence-level damage masking.
const pairs=[]; const seen=new Set();
for (const variant of allForms.keys()) {
  const ss=signs(variant); if (ss.length<3) continue;
  for (const side of ['prefix','suffix']) {
    const sign=side==='prefix'?ss[0]:ss.at(-1);
    const base=side==='prefix'?ss.slice(1).join('-'):ss.slice(0,-1).join('-');
    if(!allForms.has(base))continue;
    const key=`${side}\t${sign}\t${base}\t${variant}`; if(seen.has(key))continue; seen.add(key);
    const bs=secureForms.get(base)?.length||0, vs=secureForms.get(variant)?.length||0;
    let status='accepted_secure'; if(!bs&&!vs)status='excluded_insecure_both';else if(!bs)status='excluded_insecure_base';else if(!vs)status='excluded_insecure_variant';
    const secureOcc=[...(secureForms.get(base)||[]),...(secureForms.get(variant)||[])];
    pairs.push({side,sign,base,variant,status,base_total_attestations:allForms.get(base)?.length||0,base_secure_attestations:bs,variant_total_attestations:allForms.get(variant)?.length||0,variant_secure_attestations:vs,secure_sites:new Set(secureOcc.map(x=>x.site).filter(Boolean)).size,secure_scribes:new Set(secureOcc.map(x=>x.scribe).filter(Boolean)).size});
  }
}
const paradigms=[];
for (const side of ['prefix','suffix']) {
  const signSet=[...new Set(pairs.filter(p=>p.side===side).map(p=>p.sign))];
  for (const sign of signSet) {
    const rows=pairs.filter(p=>p.side===side&&p.sign===sign), accepted=rows.filter(p=>p.status==='accepted_secure');
    paradigms.push({side,sign,secure_exact_pairs:accepted.length,excluded_damage_pairs:rows.length-accepted.length,total_apparent_pairs:rows.length,secure_examples:accepted.slice(0,8).map(p=>`${p.base} ~ ${p.variant}`).join(' | ')});
  }
}
const rankedParadigms=[];
for (const side of ['prefix','suffix']) {
  const rows=paradigms.filter(r=>r.side===side).sort((a,b)=>b.secure_exact_pairs-a.secure_exact_pairs||a.excluded_damage_pairs-b.excluded_damage_pairs||a.sign.localeCompare(b.sign));
  rows.forEach((r,i)=>rankedParadigms.push({...r,rank:i+1}));
}

const esc=v=>{const t=String(v??'');return /[",\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t;};
const writeCsv=(file,headers,rows)=>fs.writeFileSync(path.join(outDir,file),[headers.join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')+'\n');
fs.mkdirSync(outDir,{recursive:true});
writeCsv('boundary-ranking.csv',['side','rank','sign','boundary_count','internal_count','boundary_enrichment_log2'],rankedBoundary.map(r=>({...r,boundary_enrichment_log2:r.boundary_enrichment_log2.toFixed(6)})));
writeCsv('paradigm-ranking.csv',['side','rank','sign','secure_exact_pairs','excluded_damage_pairs','total_apparent_pairs','secure_examples'],rankedParadigms);
writeCsv('exact-pairs.csv',['side','sign','base','variant','status','base_total_attestations','base_secure_attestations','variant_total_attestations','variant_secure_attestations','secure_sites','secure_scribes'],pairs.sort((a,b)=>a.side.localeCompare(b.side)||a.sign.localeCompare(b.sign)||a.base.localeCompare(b.base)));
writeCsv('secure-word-occurrences.csv',['id','form','site','scribe','support','tokenIndex'],secure);
writeCsv('excluded-word-occurrences.csv',['id','form','maskKey','site','scribe','support','tokenIndex'],all.filter(x=>!x.complete));

const top=(rows,side,n=15)=>rows.filter(r=>r.side===side).slice(0,n);
let md='# Damage-aware morphology v0.3\n\n';
md+=`Candidate syllabic occurrences before masking: **${all.length}**. Complete occurrences retained: **${secure.length}**; excluded: **${all.length-secure.length}**.\n\n`;
md+=`Unique cleaned forms: **${allForms.size}**; unique complete forms: **${secureForms.size}**.\n\n`;
md+='Boundary enrichment and exact-paradigm evidence are ranked separately; no composite morphology score is used.\n\n';
for(const side of ['prefix','suffix']){
  md+=`## ${side}: boundary enrichment\n\n| rank | sign | edge count | internal | log2 enrichment |\n|---:|---|---:|---:|---:|\n`;
  for(const r of top(rankedBoundary,side))md+=`| ${r.rank} | ${r.sign} | ${r.boundary_count} | ${r.internal_count} | ${r.boundary_enrichment_log2.toFixed(3)} |\n`;
  md+=`\n## ${side}: secure exact paradigms\n\n| rank | sign | secure pairs | damage-excluded | examples |\n|---:|---|---:|---:|---|\n`;
  for(const r of top(rankedParadigms,side))md+=`| ${r.rank} | ${r.sign} | ${r.secure_exact_pairs} | ${r.excluded_damage_pairs} | ${r.secure_examples.replaceAll('|','/')} |\n`;
  md+='\n';
}
md+='## Interpretation\n\nA high edge rank and a high paradigm rank are independent observations. Surviving pairs still require contextual, scribal, and onomastic audit before grammatical promotion.\n';
fs.writeFileSync(path.join(outDir,'README.md'),md); console.log(md);
