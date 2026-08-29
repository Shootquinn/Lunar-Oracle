'use strict';
const fs=require('fs');
const {tokenize,idfFor}=require('../../oracle/retrieval/literature_search.js');
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
const pr=JSON.parse(fs.readFileSync('cr_scratch/sre_w4/tp_probes.json','utf8'));
function mass(p,q){const qt=new Set(tokenize(q));const h=p.trigger_tokens.filter(t=>qt.has(t));
  let m=0;for(const x of h)m+=idfFor('literature','lunar',x);return {m,h};}
function best(q){let bi={id:'-',m:0,h:[]};for(const p of tp.patches){const r=mass(p,q);if(r.m>bi.m)bi={id:p.id,...r};}return bi;}
let minPos=Infinity,maxNeg=0;
for(const p of tp.patches){
  const [pos,neg]=pr[p.id];
  const rp=mass(p,pos), rn=mass(p,neg), bp=best(pos), bn=best(neg);
  if(rp.m<minPos)minPos=rp.m; if(rn.m>maxNeg)maxNeg=rn.m;
  console.log(p.id.padEnd(4)+'pos '+rp.m.toFixed(3).padStart(7)+' (top '+bp.id+' '+bp.m.toFixed(3)+')   neg '+rn.m.toFixed(3).padStart(7)+' (top '+bn.id+' '+bn.m.toFixed(3)+')');
}
console.log('\nmin probe_pos mass '+minPos.toFixed(3)+'   max probe_neg mass '+maxNeg.toFixed(3));
