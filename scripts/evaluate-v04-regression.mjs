#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};
const benchmarkPath = getArg('--benchmark');
const regressionPath = getArg('--regression');
const pairsPath = getArg('--pairs');
const outDir = getArg('--out-dir', 'data/generated-v04');
if (!benchmarkPath || !regressionPath || !pairsPath) {
  console.error('Usage: node scripts/evaluate-v04-regression.mjs --benchmark morphology-benchmark.csv --regression v04-regression-set.csv --pairs exact-pairs.csv [--out-dir output]');
  process.exit(2);
}

const canonical = value => String(value).normalize('NFKC').toUpperCase().trim();
const parseCsv = text => {
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(quoted){
      if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}
      else if(ch==='"')quoted=false;
      else field+=ch;
    } else if(ch==='"')quoted=true;
    else if(ch===','){row.push(field);field='';}
    else if(ch==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';}
    else field+=ch;
  }
  if(field.length||row.length){row.push(field);rows.push(row);}
  const [headers,...body]=rows.filter(r=>r.some(v=>v!==''));
  return body.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
};

const benchmark=parseCsv(fs.readFileSync(benchmarkPath,'utf8'));
const regression=parseCsv(fs.readFileSync(regressionPath,'utf8'));
const pairs=parseCsv(fs.readFileSync(pairsPath,'utf8'));
const byBenchmarkId=new Map(benchmark.map(row=>[row.benchmark_id,row]));
const pairMap=new Map(pairs.map(row=>[
  `${canonical(row.side)}\t${canonical(row.sign)}\t${canonical(row.base)}\t${canonical(row.variant)}`,row,
]));

const results=[];
for(const test of regression){
  const row=byBenchmarkId.get(test.benchmark_id);
  if(!row)throw new Error(`Regression case ${test.benchmark_id} missing from benchmark`);
  if(!['prefix','suffix'].includes(row.operation))throw new Error(`Regression case ${test.benchmark_id} is not a simple prefix/suffix row`);
  const key=`${canonical(row.operation)}\t${canonical(row.added_material)}\t${canonical(row.base_form)}\t${canonical(row.variant_form)}`;
  const pair=pairMap.get(key);
  const observed=pair?.status||'not_generated';
  let pass=false;
  if(test.expectation==='exclude_structural')pass=observed!=='accepted_secure';
  else if(test.expectation==='retain_secure')pass=observed==='accepted_secure';
  else throw new Error(`Unknown expectation ${test.expectation}`);
  results.push({
    benchmark_id:test.benchmark_id,expectation:test.expectation,side:row.operation,sign:row.added_material,
    base:row.base_form,variant:row.variant_form,observed_status:observed,
    exclusion_classes:pair?.exclusion_classes||'',warning_classes:pair?.warning_classes||'',
    pass:pass?'yes':'no',rationale:test.rationale,
  });
}

const exclusions=results.filter(r=>r.expectation==='exclude_structural');
const retained=results.filter(r=>r.expectation==='retain_secure');
const exclusionPass=exclusions.filter(r=>r.pass==='yes').length;
const retainedPass=retained.filter(r=>r.pass==='yes').length;
const failures=results.filter(r=>r.pass!=='yes');

const esc=v=>{const t=String(v??'');return /[",\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t;};
fs.mkdirSync(outDir,{recursive:true});
const headers=['benchmark_id','expectation','side','sign','base','variant','observed_status','exclusion_classes','warning_classes','pass','rationale'];
fs.writeFileSync(path.join(outDir,'regression-results.csv'),[headers.join(','),...results.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')+'\n');

let md='# v0.4 regression evaluation\n\n';
md+=`Frozen structural/source negatives excluded: **${exclusionPass}/${exclusions.length}**.\n\n`;
md+=`Frozen secure controls retained: **${retainedPass}/${retained.length}**.\n\n`;
md+='| benchmark | expectation | pair | observed | exclusion class | pass |\n|---|---|---|---|---|---|\n';
for(const r of results)md+=`| ${r.benchmark_id} | ${r.expectation} | ${r.base} ~ ${r.variant} | ${r.observed_status} | ${r.exclusion_classes||''} | ${r.pass} |\n`;
md+='\n';
md+=failures.length?`**Regression status: FAIL (${failures.length} cases).**\n`:'**Regression status: PASS.**\n';
fs.writeFileSync(path.join(outDir,'REGRESSION.md'),md);
console.log(md);
if(failures.length)process.exit(1);
