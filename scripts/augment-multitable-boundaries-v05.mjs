#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};
const commentaryDir = getArg('--commentary-dir');
const maskPath = getArg('--mask');
const outPath = getArg('--out', maskPath);
if (!commentaryDir || !maskPath) {
  console.error('Usage: node scripts/augment-multitable-boundaries-v05.mjs --commentary-dir DIR --mask source-mask.csv [--out source-mask.csv]');
  process.exit(2);
}

const canonical = value => String(value).normalize('NFKC').toUpperCase()
  .replaceAll('–','-').replaceAll('—','-').replace(/\s*-\s*/g,'-').replace(/\s+/g,' ').trim();
const canonicalId = value => canonical(value).replace(/\s+/g,'').replace(/\[\+\]/g,'+');
const decodeEntities = text => String(text)
  .replace(/&nbsp;/gi,' ').replace(/&bull;/gi,'•').replace(/&middot;/gi,'·').replace(/&amp;/gi,'&')
  .replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')
  .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(Number.parseInt(n,16)));
const stripHtml = html => canonical(decodeEntities(String(html)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ')));

const parseCsv = text => {
  const rows=[]; let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(quoted){ if(ch==='"'&&text[i+1]==='"'){field+='"';i++;} else if(ch==='"')quoted=false; else field+=ch; }
    else if(ch==='"')quoted=true;
    else if(ch===','){row.push(field);field='';}
    else if(ch==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';}
    else field+=ch;
  }
  if(field.length||row.length){row.push(field);rows.push(row);}
  const [headers,...body]=rows.filter(r=>r.some(v=>v!==''));
  return {headers, rows:body.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])))};
};
const esc=v=>{const t=String(v??'');return /[",\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t;};

const parsed=parseCsv(fs.readFileSync(maskPath,'utf8'));
const headers=parsed.headers;
const byKey=new Map(parsed.rows.map(r=>[`${canonicalId(r.commentary_id)}\t${canonical(r.form)}`,r]));
const getRow=(id,form)=>{
  const key=`${canonicalId(id)}\t${canonical(form)}`;
  if(!byKey.has(key)) byKey.set(key,{
    commentary_id:canonicalId(id),form:canonical(form),exclude_count:'0',boundary_insecure_count:'0',continuation_fragment_count:'0',segmented_fragment_count:'0',complex_logogram_count:'0',cross_script_count:'0',source_override_count:'0',reason_classes:'',evidence_text:''
  });
  return byKey.get(key);
};
const appendUnique=(oldValue,value,sep='|')=>[...new Set(String(oldValue||'').split(sep).filter(Boolean).concat(value?[value]:[]))].join(sep);

const SIGN=String.raw`(?:\*[0-9]+[A-Z]?|[A-Z]+[0-9]*)`;
const WORD=String.raw`${SIGN}(?:-${SIGN})+`;
const wordPattern=new RegExp(WORD,'g');

const aliases=(file,html)=>{
  const ids=new Set([canonicalId(path.basename(file,path.extname(file)))]);
  const prelude=stripHtml(html.slice(0,Math.min(html.length,12000)));
  const re=/\b([A-Z]{2,3})\s*(\d+[A-Z]?)\s*(?:\[\+\]|\+)\s*(\d+[A-Z]?)\b/g;
  for(const m of prelude.matchAll(re))ids.add(canonicalId(`${m[1]}${m[2]}+${m[3]}`));
  return [...ids];
};

let added=0;
for(const file of fs.readdirSync(commentaryDir).filter(f=>f.toLowerCase().endsWith('.html')).sort()){
  const html=fs.readFileSync(path.join(commentaryDir,file),'utf8');
  const ids=aliases(file,html);
  const tables=[...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)].map(m=>m[0]);
  // The base v0.5 builder already scans table 0. This pass covers additional
  // inscription tables on composite/multi-fragment commentary pages.
  for(const table of tables.slice(1)){
    const text=stripHtml(table);
    if(!/\b(?:STATEMENT|LOGOGRAM)\b/.test(text))continue;
    for(const match of text.matchAll(wordPattern)){
      const start=match.index,end=start+match[0].length;
      const before=text.slice(Math.max(0,start-8),start);
      const after=text.slice(end,Math.min(text.length,end+8));
      const left=/]\s*-?\s*$/.test(before)||/\[\[\s*$/.test(before);
      const right=/^\s*-?\s*\[/.test(after)||/^\s*]]/.test(after);
      if(!left&&!right)continue;
      for(const id of ids){
        const row=getRow(id,match[0]);
        row.boundary_insecure_count=String(Number(row.boundary_insecure_count||0)+1);
        row.reason_classes=appendUnique(row.reason_classes,'physical_boundary');
        const evidence=text.slice(Math.max(0,start-20),Math.min(text.length,end+20));
        const existing=String(row.evidence_text||'').split(' || ').filter(Boolean);
        if(!existing.includes(evidence)&&existing.length<5)existing.push(evidence);
        row.evidence_text=existing.join(' || ');
        row.exclude_count=String(Math.max(
          Number(row.boundary_insecure_count||0),Number(row.continuation_fragment_count||0),Number(row.segmented_fragment_count||0),
          Number(row.complex_logogram_count||0),Number(row.cross_script_count||0),Number(row.source_override_count||0)
        ));
      }
      added++;
    }
  }
}

const rows=[...byKey.values()].filter(r=>Number(r.exclude_count||0)>0)
  .sort((a,b)=>canonicalId(a.commentary_id).localeCompare(canonicalId(b.commentary_id))||canonical(a.form).localeCompare(canonical(b.form)));
fs.writeFileSync(outPath,[headers.join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')+'\n');
console.log(`Additional multi-table damaged occurrences registered: ${added}`);
console.log(`Wrote ${outPath}`);
