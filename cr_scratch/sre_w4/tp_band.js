'use strict';
const fs=require('fs');
const {tokenize,idfFor}=require('../../oracle/retrieval/literature_search.js');
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
function best(q){
  const qt=new Set(tokenize(q));
  let bi=null;
  for(const p of tp.patches){
    const hits=p.trigger_tokens.filter(t=>qt.has(t));
    if(!hits.length) continue;
    let m=0; for(const h of hits) m+=idfFor('literature','lunar',h);
    if(!bi||m>bi.mass) bi={id:p.id,mass:m,hits};
  }
  return bi||{id:'-',mass:0,hits:[]};
}
// controls: every question in the acceptance md, the labelled tsv, and the register probes
const rows=[];
const md=fs.readFileSync('oracle/acceptance/lunar_questions.md','utf8');
for(const line of md.split('\n')){
  const m=/^\| (SRQ-\d+) \|[^|]*\|([^|]*)\|\s*`?([A-Z]+)/.exec(line);
  if(m) rows.push({src:m[1],want:m[3],q:m[2].trim()});
}
if(fs.existsSync('oracle/acceptance/labelled_questions.tsv')){
  const t=fs.readFileSync('oracle/acceptance/labelled_questions.tsv','utf8').split('\n').slice(1);
  for(const l of t){const c=l.split('\t'); if(c.length>1&&c[0]) rows.push({src:'LBL',want:(c[2]||c[1]||'').trim(),q:c[1]&&c[1].includes(' ')?c[1]:c[0]});}
}
for(const l of fs.readFileSync('oracle/REGISTER.lunar.tsv','utf8').split('\n')){
  const c=l.split('\t'); if(c[0]!=='A') continue;
  if(c[8]) rows.push({src:c[1]+' pos',want:'CONTESTED',q:c[8]});
  if(c[9]) rows.push({src:c[1]+' neg',want:'LITERATURE',q:c[9]});
}
const THIN=new Set(['SRQ-13','SRQ-14']);
const fire=[],quiet=[];
for(const r of rows){
  if(!r.q||r.q.length<10) continue;
  const b=best(r.q);
  (THIN.has(r.src)?fire:quiet).push({...r,...b});
}
fire.sort((a,b)=>a.mass-b.mass); quiet.sort((a,b)=>b.mass-a.mass);
console.log('=== rows that MUST fire a thin patch ===');
fire.forEach(r=>console.log('  '+r.src.padEnd(12)+r.id.padEnd(5)+r.mass.toFixed(3).padStart(7)+'  ['+r.hits.join(',')+']'));
console.log('\n=== highest-scoring rows that must NOT fire  (top 10 of '+quiet.length+') ===');
quiet.slice(0,10).forEach(r=>console.log('  '+r.src.padEnd(12)+r.id.padEnd(5)+r.mass.toFixed(3).padStart(7)+'  ['+r.hits.join(',')+']  "'+r.q.slice(0,58)+'"'));
const lo=quiet.length?quiet[0].mass:0, hi=fire.length?fire[0].mass:0;
console.log('\ncontrols measured: '+quiet.length+'   max control mass '+lo.toFixed(3)+'   min must-fire mass '+hi.toFixed(3));
console.log(hi>lo ? 'SEPARATING BAND ('+lo.toFixed(3)+', '+hi.toFixed(3)+']' : 'NO SEPARATING BAND');
