'use strict';
const fs=require('fs');
const {tokenize,idfFor}=require('../../oracle/retrieval/literature_search.js');
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
const DIR='literature', FIELD='lunar';

// 1. K1-style token-form check on every trigger token
let bad=0, total=0;
console.log('=== trigger tokens that tokenize() can never match ===');
for(const p of tp.patches){
  for(const t of p.trigger_tokens){
    total++;
    const tk=tokenize(t);
    const ok = tk.length===1 && tk[0]===t;
    if(!ok){ bad++; console.log('  '+p.id+'  "'+t+'"  -> tokenize gives ['+tk.join(',')+']'); }
  }
}
console.log('  '+bad+' of '+total+' trigger tokens are unmatchable');

// 2. mass + count of each patch against a question
function score(p,q){
  const qt=new Set(tokenize(q));
  const hits=p.trigger_tokens.filter(t=>qt.has(t));
  let mass=0; for(const h of hits) mass+=idfFor(DIR,FIELD,h);
  return {hits,mass};
}
const Q={
 'SRQ-13 (wants REFUSE, is T1)':'What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature?',
 'SRQ-14 (wants REFUSE, is T5)':'How often must lunar propellant be transferred to keep boil-off within limits?',
 'SRQ-7  (wants LITERATURE)':'What technology readiness level does this corpus record for molten regolith electrolysis, and as of when?',
 'SRQ-9  (wants LITERATURE)':'Does the Outer Space Treaty permit private ownership of water extracted from the Moon?',
 'SRQ-11 (wants LITERATURE)':'What water capture efficiency has actually been demonstrated?',
 'SRQ-1  (wants APP)':'What is water output under Agency Led Baseline at Pilot?',
 'SRQ-8  (wants CONTESTED)':'How much electrical power is actually extractable at the lunar south pole?',
 'SRQ-12 (wants CONTESTED)':'How much energy does it take to produce a kilogram of oxygen on the Moon?',
};
console.log('\n=== per-question patch scores (mass | count) ===');
for(const [label,q] of Object.entries(Q)){
  const rows=tp.patches.map(p=>({id:p.id,...score(p,q)})).filter(r=>r.hits.length)
    .sort((a,b)=>b.mass-a.mass);
  console.log(label);
  if(!rows.length){ console.log('   (no patch fires)'); continue; }
  for(const r of rows.slice(0,4))
    console.log('   '+r.id.padEnd(4)+' mass '+r.mass.toFixed(3).padStart(7)+'  count '+String(r.hits.length).padStart(2)+'  ['+r.hits.join(',')+']');
}
