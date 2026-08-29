'use strict';
const fs=require('fs');
const {tokenize,idfFor}=require('../../oracle/retrieval/literature_search.js');
const C=require('../../oracle/router/classify.js');
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
const ctx=C.loadContext({});
function best(q){const qt=new Set(tokenize(q));let bi=null;
  for(const p of tp.patches){const h=p.trigger_tokens.filter(t=>qt.has(t)); if(!h.length)continue;
    let m=0;for(const x of h)m+=idfFor('literature','lunar',x);
    if(!bi||m>bi.mass)bi={id:p.id,mass:m,hits:h};}
  return bi||{id:'-',mass:0,hits:[]};}
const rows=[];
for(const line of fs.readFileSync('oracle/acceptance/lunar_questions.md','utf8').split('\n')){
  const m=/^\| (SRQ-\d+) \|[^|]*\|([^|]*)\|\s*`?([A-Z]+)/.exec(line);
  if(m) rows.push({src:m[1],q:m[2].trim()});
}
for(const l of fs.readFileSync('oracle/REGISTER.lunar.tsv','utf8').split('\n')){
  const c=l.split('\t'); if(c[0]!=='A')continue;
  if(c[8])rows.push({src:c[1]+'+',q:c[8]}); if(c[9])rows.push({src:c[1]+'-',q:c[9]});
}
const out=[];
for(const r of rows){
  if(!r.q||r.q.length<10)continue;
  const b=best(r.q);
  let v='?'; try{const res=C.classifyQuestion(ctx,r.q); v=res.verdict+(res.reason_code?'/'+res.reason_code:'');}catch(e){v='ERR';}
  out.push({...r,...b,verdict:v});
}
const answered=v=>['APP','FIGURE','BOTH','CONTESTED','LITERATURE'].includes(v.split('/')[0]);
const noRoute=out.filter(r=>!answered(r.verdict));
const withRoute=out.filter(r=>answered(r.verdict));
console.log('rows measured '+out.length+'  | with a competing route '+withRoute.length+'  | without '+noRoute.length);
console.log('\n=== rows with NO competing route (thin patch may GOVERN) ===');
noRoute.sort((a,b)=>b.mass-a.mass).forEach(r=>console.log('  '+r.src.padEnd(10)+r.verdict.padEnd(20)+r.id.padEnd(5)+r.mass.toFixed(3).padStart(7)+' ['+r.hits.join(',')+']'));
console.log('\n=== rows WITH a competing route, highest patch mass (must never govern) ===');
withRoute.sort((a,b)=>b.mass-a.mass).slice(0,8).forEach(r=>console.log('  '+r.src.padEnd(10)+r.verdict.padEnd(20)+r.id.padEnd(5)+r.mass.toFixed(3).padStart(7)+' ['+r.hits.join(',')+']'));
const fires=out.filter(r=>['SRQ-13','SRQ-14'].includes(r.src));
const falseCand=withRoute.filter(r=>r.mass>0);
console.log('\nmust-govern minimum   '+Math.min(...fires.map(r=>r.mass)).toFixed(3));
console.log('max mass among rows that already have a route '+Math.max(...falseCand.map(r=>r.mass)).toFixed(3));
