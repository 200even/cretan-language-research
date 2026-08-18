#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args=process.argv.slice(2);
const getArg=(name,fallback=null)=>{const i=args.indexOf(name);return i>=0&&i+1<args.length?args[i+1]:fallback;};
const occPath=getArg('--occurrences','results/source-consistent-v0.5/secure-word-occurrences.csv');
const benchmarkPath=getArg('--benchmark','data/morphology-benchmark.csv');
const exclusionsPath=getArg('--form-exclusions','data/v06-form-exclusions.csv');
const outDir=getArg('--out-dir','results/nested-stem-grid-v0.3');

const parseCsv=text=>{const rows=[];let row=[],field='',quoted=false;for(let i=0;i<text.length;i++){const ch=text[i];if(quoted){if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}else if(ch==='"')quoted=false;else field+=ch;}else if(ch==='"')quoted=true;else if(ch===','){row.push(field);field='';}else if(ch==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';}else field+=ch;}if(field.length||row.length){row.push(field);rows.push(row);}const filtered=rows.filter(r=>r.some(v=>v!==''));const [headers,...body]=filtered;return body.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));};
const canonical=v=>String(v??'').normalize('NFKC').toUpperCase().replaceAll('–','-').replaceAll('—','-').replace(/\s*-\s*/g,'-').trim();
const parts=f=>canonical(f).split('-').filter(Boolean);
const occs=parseCsv(fs.readFileSync(occPath,'utf8'));
const exclusions=new Set(parseCsv(fs.readFileSync(exclusionsPath,'utf8')).map(r=>canonical(r.form)));
const benchmark=parseCsv(fs.readFileSync(benchmarkPath,'utf8'));
const benchMap=new Map();
for(const b of benchmark){if(canonical(b.operation)!=='SUFFIX')continue;benchMap.set(`${canonical(b.base_form)}\t1\t${canonical(b.added_material)}\t${canonical(b.variant_form)}`,b);}

const usable=occs.filter(o=>!exclusions.has(canonical(o.form)));
const uniqueForms=[...new Set(usable.map(o=>canonical(o.form)))];
const formParts=new Map(uniqueForms.map(f=>[f,parts(f)]));
const containment=new Map();
for(const f of uniqueForms){const fp=formParts.get(f);const hits=[];for(const g of uniqueForms){if(g===f)continue;const gp=formParts.get(g);if(gp.length<=fp.length)continue;for(let i=0;i<=gp.length-fp.length;i++){if(fp.every((s,j)=>gp[i+j]===s)){hits.push(g);break;}}}containment.set(f,hits);}

const cellMap=new Map();
for(const o of usable){const form=canonical(o.form),ps=parts(form);if(ps.length<3)continue;for(const depth of [1,2]){if(ps.length-depth<2)continue;const stem=ps.slice(0,-depth).join('-');const terminal=ps.slice(-depth).join('-');const k=`${stem}\t${depth}\t${terminal}\t${form}`;if(!cellMap.has(k))cellMap.set(k,{stem,depth,terminal,form,occurrences:0,sites:new Set(),scribes:new Set(),supports:new Set(),warnings:new Set()});const c=cellMap.get(k);c.occurrences++;if(o.site)c.sites.add(canonical(o.site));if(o.scribe)c.scribes.add(canonical(o.scribe));if(o.support)c.supports.add(canonical(o.support));for(const w of String(o.warning_classes||'').split('|').filter(Boolean))c.warnings.add(w);}}
const cells=[...cellMap.values()].map(c=>{const b=benchMap.get(`${c.stem}\t${c.depth}\t${c.terminal}\t${c.form}`);const longer=containment.get(c.form)||[];return {stem:c.stem,depth:c.depth,terminal:c.terminal,form:c.form,occurrences:c.occurrences,site_count:c.sites.size,sites:[...c.sites].sort().join('|'),scribe_count:c.scribes.size,scribes:[...c.scribes].sort().join('|'),supports:[...c.supports].sort().join('|'),warning_classes:[...c.warnings].sort().join('|'),manual_tier:b?.evidence_tier||'',manual_adjudication:b?.adjudication||'',containment_count:longer.length,containment_examples:longer.slice(0,6).join('|')};});

const familyMap=new Map();
for(const c of cells){const k=`${c.depth}\t${c.stem}`;if(!familyMap.has(k))familyMap.set(k,[]);familyMap.get(k).push(c);}
const families=[];
for(const [k,rows] of familyMap){const [d,stem]=k.split('\t');const terms=[...new Set(rows.map(r=>r.terminal))].sort();if(terms.length<2)continue;families.push({depth:Number(d),stem,terminal_count:terms.length,terminals:terms.join('|'),form_count:rows.length,site_count:new Set(rows.flatMap(r=>r.sites.split('|').filter(Boolean))).size,scribe_count:new Set(rows.flatMap(r=>r.scribes.split('|').filter(Boolean))).size,manual_ab_cells:rows.filter(r=>['A','B'].includes(r.manual_tier)).length,containment_flagged_cells:rows.filter(r=>r.containment_count>0).length,forms:rows.sort((a,b)=>a.terminal.localeCompare(b.terminal)).map(r=>`${r.terminal}:${r.form}${r.manual_tier?`[${r.manual_tier}]`:''}${r.containment_count?'[nested]':''}`).join(' | ')});}
families.sort((a,b)=>a.depth-b.depth||b.terminal_count-a.terminal_count||b.site_count-a.site_count||a.stem.localeCompare(b.stem));

const grids=[];
for(const depth of [1,2]){const fsAt=families.filter(f=>f.depth===depth);for(let i=0;i<fsAt.length;i++){const a=fsAt[i],as=new Set(a.terminals.split('|'));for(let j=i+1;j<fsAt.length;j++){const b=fsAt[j],shared=b.terminals.split('|').filter(t=>as.has(t)).sort();if(shared.length<2)continue;const core=cells.filter(c=>c.depth===depth&&(c.stem===a.stem||c.stem===b.stem)&&shared.includes(c.terminal));grids.push({depth,stem_1:a.stem,stem_2:b.stem,shared_terminal_count:shared.length,shared_terminals:shared.join('|'),core_cell_count:core.length,site_count:new Set(core.flatMap(c=>c.sites.split('|').filter(Boolean))).size,scribe_count:new Set(core.flatMap(c=>c.scribes.split('|').filter(Boolean))).size,manual_ab_cells:core.filter(c=>['A','B'].includes(c.manual_tier)).length,containment_flagged_cells:core.filter(c=>c.containment_count>0).length,core_forms:core.sort((x,y)=>x.stem.localeCompare(y.stem)||x.terminal.localeCompare(y.terminal)).map(c=>`${c.stem}+${c.terminal}=${c.form}${c.manual_tier?`[${c.manual_tier}]`:''}${c.containment_count?'[nested]':''}`).join(' | ')});}}}
grids.sort((a,b)=>b.shared_terminal_count-a.shared_terminal_count||a.depth-b.depth||a.containment_flagged_cells-b.containment_flagged_cells||b.site_count-a.site_count||b.manual_ab_cells-a.manual_ab_cells||a.stem_1.localeCompare(b.stem_1));

const esc=v=>{const t=String(v??'');return /[",\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t;};
const writeCsv=(file,headers,rows)=>fs.writeFileSync(path.join(outDir,file),[headers.join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')+'\n');
fs.mkdirSync(outDir,{recursive:true});
writeCsv('cells.csv',['stem','depth','terminal','form','occurrences','site_count','sites','scribe_count','scribes','supports','warning_classes','manual_tier','manual_adjudication','containment_count','containment_examples'],cells.sort((a,b)=>a.depth-b.depth||a.stem.localeCompare(b.stem)||a.terminal.localeCompare(b.terminal)));
writeCsv('families.csv',['depth','stem','terminal_count','terminals','form_count','site_count','scribe_count','manual_ab_cells','containment_flagged_cells','forms'],families);
writeCsv('grids.csv',['depth','stem_1','stem_2','shared_terminal_count','shared_terminals','core_cell_count','site_count','scribe_count','manual_ab_cells','containment_flagged_cells','core_forms'],grids);

let md='# Nested stem-depth grid v0.3\n\n';md+=`Usable secure occurrences after explicit form exclusions: **${usable.length}**. Candidate cells across depths 1-2: **${cells.length}**. Multi-terminal families: **${families.length}**. Two-stem grids: **${grids.length}**.\n\n`;
for(const d of [1,2]){md+=`## Depth ${d}: top families\n\n| stem | terminals | sites | scribes | A/B | nested-cell warnings |\n|---|---|---:|---:|---:|---:|\n`;for(const r of families.filter(f=>f.depth===d).slice(0,20))md+=`| ${r.stem} | ${r.terminals} | ${r.site_count} | ${r.scribe_count} | ${r.manual_ab_cells} | ${r.containment_flagged_cells} |\n`;md+='\n';}
md+='## Grid candidates\n\n';if(!grids.length)md+='No two-stem repeated terminal contrasts found at depths 1-2.\n';else{md+='| rank | depth | stem 1 | stem 2 | shared terminals | sites | A/B | nested warnings | forms |\n|---:|---:|---|---|---|---:|---:|---:|---|\n';grids.slice(0,40).forEach((r,i)=>{md+=`| ${i+1} | ${r.depth} | ${r.stem_1} | ${r.stem_2} | ${r.shared_terminals} | ${r.site_count} | ${r.manual_ab_cells} | ${r.containment_flagged_cells} | ${r.core_forms.replaceAll('|','/')} |\n`;});}
md+='\nA `[nested]` flag means the proposed cell occurs intact inside at least one longer source-retained word and therefore has an explicit competing stem-depth warning. Candidate grids require hostile audit before promotion.\n';fs.writeFileSync(path.join(outDir,'README.md'),md);console.log(md);
