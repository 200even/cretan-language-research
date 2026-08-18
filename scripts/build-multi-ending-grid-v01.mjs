#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const pairsPath = getArg('--pairs', 'results/source-consistent-v0.5/exact-pairs.csv');
const benchmarkPath = getArg('--benchmark', 'data/morphology-benchmark.csv');
const forwardPath = getArg('--forward-controls', 'data/v06-regression-backlog.csv');
const outDir = getArg('--out-dir', 'results/multi-ending-grid-v0.1');

const parseCsv = text => {
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(quoted){
      if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}
      else if(ch==='"')quoted=false;
      else field+=ch;
    } else if(ch==='"') quoted=true;
    else if(ch===','){row.push(field);field='';}
    else if(ch==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';}
    else field+=ch;
  }
  if(field.length||row.length){row.push(field);rows.push(row);}
  const filtered=rows.filter(r=>r.some(v=>v!==''));
  const [headers,...body]=filtered;
  return body.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
};
const canonical = value => String(value ?? '').normalize('NFKC').toUpperCase().trim();
const key = (sign,base,variant) => `${canonical(sign)}\t${canonical(base)}\t${canonical(variant)}`;

const pairs = parseCsv(fs.readFileSync(pairsPath,'utf8'));
const benchmark = parseCsv(fs.readFileSync(benchmarkPath,'utf8'));
const forward = fs.existsSync(forwardPath) ? parseCsv(fs.readFileSync(forwardPath,'utf8')) : [];

const benchMap = new Map();
for(const row of benchmark){
  if(canonical(row.operation)!=='SUFFIX') continue;
  benchMap.set(key(row.added_material,row.base_form,row.variant_form),row);
}
const forwardMap = new Map(forward.map(row=>[key(row.sign,row.base,row.variant),row]));

const cells=[];
for(const p of pairs){
  if(canonical(p.side)!=='SUFFIX' || p.status!=='accepted_secure') continue;
  const k=key(p.sign,p.base,p.variant);
  const b=benchMap.get(k);
  const f=forwardMap.get(k);
  cells.push({
    base:canonical(p.base),
    ending:canonical(p.sign),
    variant:canonical(p.variant),
    structural_status:p.status,
    forward_excluded:f?'yes':'no',
    forward_failure_class:f?.failure_class||'',
    manual_tier:b?.evidence_tier||'',
    manual_adjudication:b?.adjudication||'',
    manual_reason:b?.reason||'',
    warning_classes:p.warning_classes||'',
    secure_sites:p.secure_sites||'',
    secure_scribes:p.secure_scribes||'',
  });
}

const active = cells.filter(c=>c.forward_excluded!=='yes');
const byBase=new Map();
for(const c of active){
  if(!byBase.has(c.base))byBase.set(c.base,[]);
  byBase.get(c.base).push(c);
}

const tierStrength = t => t==='A'?3:t==='B'?2:t==='C'?1:0;
const stemRows=[];
for(const [base,rows] of byBase){
  const endings=[...new Set(rows.map(r=>r.ending))].sort();
  if(endings.length<2) continue;
  const strong=rows.filter(r=>['A','B'].includes(r.manual_tier)).length;
  const reviewed=rows.filter(r=>r.manual_tier||r.manual_adjudication).length;
  const rejectedManual=rows.filter(r=>['rejected','reclassified'].includes(r.manual_adjudication)&&!['A','B'].includes(r.manual_tier)).length;
  stemRows.push({
    base,
    ending_count:endings.length,
    endings:endings.join('|'),
    manually_strong_cells:strong,
    manually_reviewed_cells:reviewed,
    manual_nonpositive_cells:rejectedManual,
    cells:rows.sort((a,b)=>a.ending.localeCompare(b.ending)).map(r=>`${r.ending}:${r.variant}${r.manual_tier?`[${r.manual_tier}]`:''}`).join(' | '),
  });
}
stemRows.sort((a,b)=>b.ending_count-a.ending_count||b.manually_strong_cells-a.manually_strong_cells||a.base.localeCompare(b.base));

const overlapRows=[];
for(let i=0;i<stemRows.length;i++){
  const a=stemRows[i]; const aEnds=new Set(a.endings.split('|'));
  for(let j=i+1;j<stemRows.length;j++){
    const b=stemRows[j]; const shared=b.endings.split('|').filter(e=>aEnds.has(e)).sort();
    if(shared.length<2) continue;
    const relevant=active.filter(c=>(c.base===a.base||c.base===b.base)&&shared.includes(c.ending));
    const strong=relevant.filter(c=>['A','B'].includes(c.manual_tier)).length;
    const reviewed=relevant.filter(c=>c.manual_tier||c.manual_adjudication).length;
    overlapRows.push({base_1:a.base,base_2:b.base,shared_ending_count:shared.length,shared_endings:shared.join('|'),strong_cells:strong,reviewed_cells:reviewed,cell_count:relevant.length});
  }
}
overlapRows.sort((a,b)=>b.shared_ending_count-a.shared_ending_count||b.strong_cells-a.strong_cells||a.base_1.localeCompare(b.base_1));

const esc=v=>{const t=String(v??'');return /[",\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t;};
const writeCsv=(file,headers,rows)=>fs.writeFileSync(path.join(outDir,file),[headers.join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')+'\n');
fs.mkdirSync(outDir,{recursive:true});
writeCsv('cells.csv',['base','ending','variant','structural_status','forward_excluded','forward_failure_class','manual_tier','manual_adjudication','manual_reason','warning_classes','secure_sites','secure_scribes'],cells.sort((a,b)=>a.base.localeCompare(b.base)||a.ending.localeCompare(b.ending)));
writeCsv('multi-ending-stems.csv',['base','ending_count','endings','manually_strong_cells','manually_reviewed_cells','manual_nonpositive_cells','cells'],stemRows);
writeCsv('shared-ending-overlaps.csv',['base_1','base_2','shared_ending_count','shared_endings','strong_cells','reviewed_cells','cell_count'],overlapRows);

let md='# Multi-ending stem grid v0.1\n\n';
md+=`Source: frozen v0.5 accepted suffix pairs, with **${forwardMap.size}** post-v0.5 forward source controls masked.\n\n`;
md+=`Active source-consistent suffix cells after forward masking: **${active.length}**. Multi-ending stems (2+ endings): **${stemRows.length}**. Two-stem overlaps sharing 2+ endings: **${overlapRows.length}**.\n\n`;
md+='## Multi-ending stems\n\n| stem | endings | count | A/B audited cells | reviewed | cells |\n|---|---|---:|---:|---:|---|\n';
for(const r of stemRows) md+=`| ${r.base} | ${r.endings} | ${r.ending_count} | ${r.manually_strong_cells} | ${r.manually_reviewed_cells} | ${r.cells.replaceAll('|','/')} |\n`;
md+='\n## Shared-ending overlaps\n\n';
if(!overlapRows.length) md+='No pair of multi-ending stems shares two or more endings in the current structurally retained matrix.\n';
else {
  md+='| stem 1 | stem 2 | shared endings | strong cells | reviewed cells |\n|---|---|---|---:|---:|\n';
  for(const r of overlapRows) md+=`| ${r.base_1} | ${r.base_2} | ${r.shared_endings} | ${r.strong_cells} | ${r.reviewed_cells} |\n`;
}
md+='\n## Promotion rule\n\nA formal paradigm grid requires a second independent stem sharing at least two endings, with source-secure cells and the manual Tier A/B threshold registered in `experiments/multi-ending-grid-v01.md`. A single multi-ending stem is not promoted as a grammatical paradigm.\n';
fs.writeFileSync(path.join(outDir,'README.md'),md);
console.log(md);
