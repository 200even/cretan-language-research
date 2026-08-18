#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args=process.argv.slice(2);
const getArg=(name,fallback=null)=>{const i=args.indexOf(name);return i>=0&&i+1<args.length?args[i+1]:fallback;};
const occPath=getArg('--occurrences','results/source-consistent-v0.5/secure-word-occurrences.csv');
const benchmarkPath=getArg('--benchmark','data/morphology-benchmark.csv');
const exclusionsPath=getArg('--form-exclusions','data/v06-form-exclusions.csv');
const outDir=getArg('--out-dir','results/sibling-ending-grid-v0.2');

const parseCsv=text=>{const rows=[];let row=[],field='',quoted=false;for(let i=0;i<text.length;i++){const ch=text[i];if(quoted){if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}else if(ch==='"')quoted=false;else field+=ch;}else if(ch==='"')quoted=true;else if(ch===','){row.push(field);field='';}else if(ch==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';}else field+=ch;}if(field.length||row.length){row.push(field);rows.push(row);}const filtered=rows.filter(r=>r.some(v=>v!==''));const [headers,...body]=filtered;return body.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));};
const canonical=v=>String(v??'').normalize('NFKC').toUpperCase().replaceAll('–','-').replaceAll('—','-').replace(/\s*-\s*/g,'-').trim();
const parts=form=>canonical(form).split('-').filter(Boolean);
const cellKey=(stem,ending,variant)=>`${canonical(stem)}\t${canonical(ending)}\t${canonical(variant)}`;

const occs=parseCsv(fs.readFileSync(occPath,'utf8'));
const benchmark=parseCsv(fs.readFileSync(benchmarkPath,'utf8'));
const exclusions=new Map(parseCsv(fs.readFileSync(exclusionsPath,'utf8')).map(r=>[canonical(r.form),r]));
const benchMap=new Map();
for(const r of benchmark){if(canonical(r.operation)!=='SUFFIX')continue;benchMap.set(cellKey(r.base_form,r.added_material,r.variant_form),r);}

const grouped=new Map();
for(const o of occs){
  const form=canonical(o.form); if(exclusions.has(form))continue;
  const ps=parts(form); if(ps.length<3)continue;
  const stem=ps.slice(0,-1).join('-'); const ending=ps.at(-1);
  const k=cellKey(stem,ending,form);
  if(!grouped.has(k))grouped.set(k,{stem,ending,variant:form,occurrences:0,sites:new Set(),scribes:new Set(),supports:new Set(),warning_classes:new Set()});
  const g=grouped.get(k);g.occurrences++;if(o.site)g.sites.add(canonical(o.site));if(o.scribe)g.scribes.add(canonical(o.scribe));if(o.support)g.supports.add(canonical(o.support));for(const w of String(o.warning_classes||'').split('|').filter(Boolean))g.warning_classes.add(w);
}

const cells=[...grouped.values()].map(g=>{const b=benchMap.get(cellKey(g.stem,g.ending,g.variant));return {stem:g.stem,ending:g.ending,variant:g.variant,occurrences:g.occurrences,site_count:g.sites.size,sites:[...g.sites].sort().join('|'),scribe_count:g.scribes.size,scribes:[...g.scribes].sort().join('|'),supports:[...g.supports].sort().join('|'),warning_classes:[...g.warning_classes].sort().join('|'),manual_tier:b?.evidence_tier||'',manual_adjudication:b?.adjudication||'',manual_reason:b?.reason||''};});

const byStem=new Map();
for(const c of cells){if(!byStem.has(c.stem))byStem.set(c.stem,[]);byStem.get(c.stem).push(c);}
const families=[];
for(const [stem,rows] of byStem){const endings=[...new Set(rows.map(r=>r.ending))].sort();if(endings.length<2)continue;const sites=new Set(rows.flatMap(r=>r.sites.split('|').filter(Boolean)));const scribes=new Set(rows.flatMap(r=>r.scribes.split('|').filter(Boolean)));families.push({stem,ending_count:endings.length,endings:endings.join('|'),form_count:rows.length,total_occurrences:rows.reduce((s,r)=>s+r.occurrences,0),site_count:sites.size,scribe_count:scribes.size,manual_ab_cells:rows.filter(r=>['A','B'].includes(r.manual_tier)).length,manual_reviewed_cells:rows.filter(r=>r.manual_tier||r.manual_adjudication).length,forms:rows.sort((a,b)=>a.ending.localeCompare(b.ending)).map(r=>`${r.ending}:${r.variant}${r.manual_tier?`[${r.manual_tier}]`:''}`).join(' | ')});}
families.sort((a,b)=>b.ending_count-a.ending_count||b.site_count-a.site_count||b.total_occurrences-a.total_occurrences||a.stem.localeCompare(b.stem));

const grids=[];
for(let i=0;i<families.length;i++){
  const a=families[i],ae=new Set(a.endings.split('|'));
  for(let j=i+1;j<families.length;j++){
    const b=families[j];const shared=b.endings.split('|').filter(e=>ae.has(e)).sort();if(shared.length<2)continue;
    const core=cells.filter(c=>(c.stem===a.stem||c.stem===b.stem)&&shared.includes(c.ending));
    const sites=new Set(core.flatMap(c=>c.sites.split('|').filter(Boolean)));const scribes=new Set(core.flatMap(c=>c.scribes.split('|').filter(Boolean)));
    const manuallyStrong=core.filter(c=>['A','B'].includes(c.manual_tier)).length;
    const manuallyReviewed=core.filter(c=>c.manual_tier||c.manual_adjudication).length;
    grids.push({stem_1:a.stem,stem_2:b.stem,shared_ending_count:shared.length,shared_endings:shared.join('|'),core_cell_count:core.length,site_count:sites.size,scribe_count:scribes.size,manual_ab_cells:manuallyStrong,manual_reviewed_cells:manuallyReviewed,core_forms:core.sort((x,y)=>x.stem.localeCompare(y.stem)||x.ending.localeCompare(y.ending)).map(c=>`${c.stem}+${c.ending}=${c.variant}${c.manual_tier?`[${c.manual_tier}]`:''}`).join(' | ')});
  }
}
grids.sort((a,b)=>b.shared_ending_count-a.shared_ending_count||b.site_count-a.site_count||b.scribe_count-a.scribe_count||b.manual_ab_cells-a.manual_ab_cells||a.stem_1.localeCompare(b.stem_1));

const esc=v=>{const t=String(v??'');return /[",\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t;};
const writeCsv=(file,headers,rows)=>fs.writeFileSync(path.join(outDir,file),[headers.join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')+'\n');
fs.mkdirSync(outDir,{recursive:true});
writeCsv('cells.csv',['stem','ending','variant','occurrences','site_count','sites','scribe_count','scribes','supports','warning_classes','manual_tier','manual_adjudication','manual_reason'],cells.sort((a,b)=>a.stem.localeCompare(b.stem)||a.ending.localeCompare(b.ending)));
writeCsv('sibling-families.csv',['stem','ending_count','endings','form_count','total_occurrences','site_count','scribe_count','manual_ab_cells','manual_reviewed_cells','forms'],families);
writeCsv('shared-ending-grids.csv',['stem_1','stem_2','shared_ending_count','shared_endings','core_cell_count','site_count','scribe_count','manual_ab_cells','manual_reviewed_cells','core_forms'],grids);

let md='# Sibling-ending grid v0.2\n\n';
md+=`Input secure occurrences: **${occs.length}**. Explicit post-v0.5 normalized-form exclusions: **${exclusions.size}**. Candidate stem-ending cells: **${cells.length}**. Sibling families with 2+ endings: **${families.length}**. Formal two-stem grids sharing 2+ endings: **${grids.length}**.\n\n`;
md+='This search does not require an attested bare stem. Every final sign is provisional until epigraphic/morphological audit.\n\n';
md+='## Top sibling families\n\n| stem | endings | forms | occurrences | sites | scribes | audited A/B |\n|---|---|---:|---:|---:|---:|---:|\n';
for(const r of families.slice(0,30))md+=`| ${r.stem} | ${r.endings} | ${r.form_count} | ${r.total_occurrences} | ${r.site_count} | ${r.scribe_count} | ${r.manual_ab_cells} |\n`;
md+='\n## Formal grid candidates\n\n';
if(!grids.length)md+='No two sibling-family stems share two or more final signs after the registered exclusions.\n';
else{md+='| rank | stem 1 | stem 2 | shared endings | sites | scribes | audited A/B core cells | forms |\n|---:|---|---|---|---:|---:|---:|---|\n';grids.slice(0,30).forEach((r,i)=>{md+=`| ${i+1} | ${r.stem_1} | ${r.stem_2} | ${r.shared_endings} | ${r.site_count} | ${r.scribe_count} | ${r.manual_ab_cells} | ${r.core_forms.replaceAll('|','/')} |\n`;});}
md+='\n## Interpretation\n\nA rectangle is a formal candidate only. The preregistered promotion rule requires hostile audit of all four core cells and at least three Tier A/B cells before morphology is promoted. No grammatical function is inferred here.\n';
fs.writeFileSync(path.join(outDir,'README.md'),md);console.log(md);
