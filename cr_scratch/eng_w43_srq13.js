'use strict';
const S=require('../oracle/retrieval/literature_search.js');
const LIT='literature';
const cases=[
 ['SRQ-13','What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature?'],
 ['SRQ-14','How often must lunar propellant be transferred to keep boil-off within limits?'],
 ['adv-pineapple','How many pineapples are on the far side of the Moon?'],
];
for(const [id,q] of cases){
  const r=S.searchLiterature(LIT,q,{limit:10});
  console.log('=== '+id+'  "'+q.slice(0,64)+'"');
  console.log('    scored '+r.scoredCount+', confirmed '+r.confirmedSet.length+', best '+(r.best?r.best.filename.split('/')[1]:'NULL'));
  for(const c of r.confirmedSet){
    // weightHit is the absolute IDF mass of confirmed topic tokens
    const wh=c.hits.reduce((s,t)=>s+S.idfFor(LIT,c.field,t),0);
    const wt=c.checked.reduce((s,t)=>s+S.idfFor(LIT,c.field,t),0);
    console.log('      frac '+c.frac.toFixed(2)+'  massHit '+wh.toFixed(2)+'/'+wt.toFixed(2)+
      '  hits['+c.hits.join(',')+']  '+c.filename.split('/')[1].slice(0,42));
  }
  console.log('');
}
