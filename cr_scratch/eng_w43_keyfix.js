'use strict';
const fs=require('fs'), path=require('path');
const C=require('../oracle/router/classify.js'), LIT=require('../oracle/retrieval/literature_search.js');
const ctx=C.loadContext({K:0});
const Q=JSON.parse(fs.readFileSync(path.join(__dirname,'eng_w43_srq.json'),'utf8'));
const K=2.431;
const idf=t=>LIT.idfFor(ctx.litDir,'lunar',t);

for(const [id,ax] of [['SRQ-8','LCC-09'],['SRQ-12','LCC-07']]){
  const axis=ctx.axes.get(ax);
  const toks=[...new Set(LIT.tokenize(Q[id]))];
  const cur=C.axisMass(ctx,axis,toks);
  console.log('=== '+id+'  ->  '+ax+'   needs mass >= '+K);
  console.log('  question: '+Q[id]);
  console.log('  current keys hit: ['+cur.hits.join(', ')+']  mass '+cur.mass.toFixed(3)+
              '   SHORTFALL '+(K-cur.mass).toFixed(3));
  console.log('  question tokens NOT currently match_keys, with their lunar-scoped IDF:');
  const cand=toks.filter(t=>!axis.match_keys.includes(t)).map(t=>({t,i:idf(t)})).sort((a,b)=>b.i-a.i);
  for(const c of cand) console.log('      '+c.t.padEnd(14)+c.i.toFixed(3));
  // greedy: smallest set of candidate tokens that closes the gap
  let m=cur.mass, add=[];
  for(const c of cand){ if(m>=K) break; m+=c.i; add.push(c.t); }
  console.log('  smallest additions that close it: ['+add.join(', ')+'] -> mass '+m.toFixed(3)+
              (m>=K?'  FIRES':'  STILL SHORT even using every token'));
  console.log('');
}
// side effect check: would those additions break the quiet rows?
console.log('SIDE-EFFECT CHECK -- do the additions disturb the three K-marked negative rows?');
const quiet=[['SRQ-3','LCC-01'],['SRQ-7','LCC-07'],['SRQ-7','LCC-08'],['SRQ-13','LCC-15']];
for(const [id,ax] of quiet){
  const t=new Set(LIT.tokenize(Q[id]));
  const adds={'LCC-09':['pole','extractable','electrical'],'LCC-07':['kilogram','produce','moon']}[ax]||[];
  const overlap=adds.filter(a=>t.has(a));
  console.log('  '+id.padEnd(8)+ax.padEnd(9)+'proposed additions present in this question: '+
    (overlap.length?overlap.join(', ')+'  <-- WOULD RAISE ITS MASS':'none -- unaffected'));
}
