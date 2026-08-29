'use strict';
const fs=require('fs'), path=require('path');
const C=require('../oracle/router/classify.js'), LIT=require('../oracle/retrieval/literature_search.js');
const ctx=C.loadContext({K:0});
const Q=JSON.parse(fs.readFileSync(path.join(__dirname,'eng_w43_srq.json'),'utf8'));
const K=2.431;
// DEFENSIBLE domain additions only -- terms the axis's own subject implies, not the test question's phrasing.
const PROPOSED={ 'LCC-09':['pole','electrical'], 'LCC-07':['kilogram'] };

const mass=(axis,keys,q)=>{const qs=new Set(LIT.tokenize(q));let m=0;const h=[];
  for(const k of keys) if(qs.has(k)){m+=LIT.idfFor(ctx.litDir,axis.field,k);h.push(k);} return {m,h};};

console.log('PROPOSED match_keys ADDITIONS (domain terms only, no question phrasing)');
for(const [ax,adds] of Object.entries(PROPOSED)){
  const axis=ctx.axes.get(ax);
  const keys=axis.match_keys.concat(adds);
  console.log('  '+ax+'  + ['+adds.join(', ')+']');
  const id = ax==='LCC-09'?'SRQ-8':'SRQ-12';
  const b=mass(axis,axis.match_keys,Q[id]), a=mass(axis,keys,Q[id]);
  console.log('     '+id+': '+b.m.toFixed(3)+' -> '+a.m.toFixed(3)+
    (a.m>=K?'  FIRES (>= '+K+')':'  still short'));
}
console.log('');
console.log('SIDE EFFECT over ALL 66 register probes + the 6 acceptance constraints:');
let broke=0, checked=0;
for(const axis of ctx.axes.values()){
  const adds=PROPOSED[axis.axis_id]; if(!adds) continue;
  const keys=axis.match_keys.concat(adds);
  for(const [q,want] of [[axis.probe_pos,'fire'],[axis.probe_neg,'quiet']]){
    if(!q||q==='-') continue; checked++;
    const b=mass(axis,axis.match_keys,q).m, a=mass(axis,keys,q).m;
    const wasOk=want==='fire'?b>=K:b<K, nowOk=want==='fire'?a>=K:a<K;
    const flag=wasOk&&!nowOk?'  *** REGRESSION ***':(!wasOk&&nowOk?'  (repaired)':'');
    if(wasOk&&!nowOk) broke++;
    console.log('    '+axis.axis_id+' '+want.padEnd(6)+b.toFixed(3)+' -> '+a.toFixed(3)+flag+'   "'+q.slice(0,58)+'"');
  }
}
// the three K-marked quiet acceptance rows
for(const [id,ax] of [['SRQ-3','LCC-01'],['SRQ-7','LCC-07'],['SRQ-7','LCC-08'],['SRQ-13','LCC-15']]){
  const axis=ctx.axes.get(ax); const adds=PROPOSED[ax];
  if(!adds){console.log('    '+id+' '+ax+' quiet  unaffected (no additions to this axis)');continue;}
  const b=mass(axis,axis.match_keys,Q[id]).m, a=mass(axis,axis.match_keys.concat(adds),Q[id]).m;
  const flag=(b<K&&a>=K)?'  *** REGRESSION ***':'';
  if(b<K&&a>=K) broke++;
  console.log('    '+id+' '+ax+' quiet  '+b.toFixed(3)+' -> '+a.toFixed(3)+flag);
}
console.log('');
console.log('  '+checked+' probe rows on the touched axes re-scored; regressions: '+broke);
console.log('  K stays at '+K+'. The repair is in the register, not in the threshold.');
