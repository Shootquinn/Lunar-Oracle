'use strict';
const S=require('../oracle/retrieval/literature_search.js');
const T=require('../oracle/retrieval/tune_threshold.js');
const LIT='literature';
const fx=T.loadFixtures();
const tune=fx.filter(f=>f.split==='tune'), hold=fx.filter(f=>f.split==='holdout');

// Candidate: keep frac >= 0.28 AND require absolute IDF mass of confirmed hits >= M.
function runWithMass(f,M){
  const r=S.searchLiterature(LIT,f.question,{limit:10,threshold:0.28});
  const keep=r.confirmedSet.filter(c=>c.hits.reduce((s,t)=>s+S.idfFor(LIT,c.field,t),0)>=M);
  return {confirmedSet:keep,best:keep[0]||null};
}
function score(rows,M){
  let p=0,pos=0,neg=0,posP=0,negP=0;
  for(const f of rows){
    const r=runWithMass(f,M); const j=T.judge(f,r);
    if(f.expect==='none'||f.expect==='absent'){neg++; if(j.pass)negP++;} else {pos++; if(j.pass)posP++;}
    if(j.pass)p++;
  }
  return {p,total:rows.length,obj:(posP/pos+negP/neg)/2,posP,pos,negP,neg};
}
console.log('MASS FLOOR M added on top of the unchanged frac >= 0.28');
console.log('   M     tune            holdout        (obj = balanced)');
let last=null;
for(let M=0;M<=9;M+=0.25){
  const a=score(tune,M);
  const k=a.p+':'+a.obj.toFixed(3);
  if(k!==last){
    const h=score(hold,M);
    console.log('  '+M.toFixed(2).padStart(4)+'   '+a.p+'/'+a.total+' obj '+a.obj.toFixed(3)+
      '   '+h.p+'/'+h.total+' obj '+h.obj.toFixed(3));
    last=k;
  }
}
console.log('');
console.log('  M = 0 is the shipped behaviour (no mass floor).');
const a0=score(tune,0),h0=score(hold,0);
console.log('  shipped:  tune '+a0.p+'/'+a0.total+' obj '+a0.obj.toFixed(3)+'   holdout '+h0.p+'/'+h0.total+' obj '+h0.obj.toFixed(3));
// the adversarial + acceptance REFUSE rows
console.log('');
console.log('  effect on the three router-reported failures, by M:');
const extra=[['pineapple','How many pineapples are on the far side of the Moon?'],
             ['SRQ-13','What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature?'],
             ['SRQ-14','How often must lunar propellant be transferred to keep boil-off within limits?']];
for(const M of [0,2,3,4,5,6]){
  const out=extra.map(([id,q])=>{
    const r=S.searchLiterature(LIT,q,{limit:10,threshold:0.28});
    const keep=r.confirmedSet.filter(c=>c.hits.reduce((s,t)=>s+S.idfFor(LIT,c.field,t),0)>=M);
    return id+'='+keep.length;
  });
  console.log('    M='+M+'  '+out.join('  ')+'   (all three want 0)');
}
