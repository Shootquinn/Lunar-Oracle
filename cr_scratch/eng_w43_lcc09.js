'use strict';
const C=require('../oracle/router/classify.js'), LIT=require('../oracle/retrieval/literature_search.js');
const ctx=C.loadContext({K:0}); const K=2.431; const dir=ctx.litDir;
const ax7=ctx.axes.get('LCC-07'), ax9=ctx.axes.get('LCC-09');

console.log('IS LCC-09 THE SAME VOCABULARY SHAPE AS LCC-07?');
console.log('');
console.log('LCC-07 keys, lunar-scoped IDF (df out of 124):');
for(const k of ax7.match_keys) console.log('   '+k.padEnd(14)+LIT.idfFor(dir,'lunar',k).toFixed(3));
console.log('LCC-09 keys, lunar-scoped IDF:');
for(const k of ax9.match_keys) console.log('   '+k.padEnd(14)+LIT.idfFor(dir,'lunar',k).toFixed(3));

const m=(ax,q)=>{const r=C.axisMass(ctx,ax,LIT.tokenize(q));return r.mass.toFixed(3)+'  ['+r.hits.join(',')+']';};
console.log('');
console.log('TEST 1 -- does each axis fire when the question uses the axis\'s OWN key vocabulary?');
const t=[
 ['LCC-07 SRE probe (kwh/lox)', ax7,'How many kwh per kilogram of lox does carbothermal reduction need?'],
 ['LCC-07 router probe       ', ax7,'How many kilowatt hours does it take to produce a kilogram of oxygen?'],
 ['LCC-09 own-key phrasing   ', ax9,'What illumination and sunlight does Shackleton get, and how much solar power?'],
 ['LCC-09 register probe_pos ', ax9, ax9.probe_pos],
 ['LCC-09 SRQ-8              ', ax9,'How much electrical power is actually extractable at the lunar south pole?'],
 ['LCC-09 register probe_neg ', ax9, ax9.probe_neg],
];
for(const [lab,ax,q] of t){
  const r=C.axisMass(ctx,ax,LIT.tokenize(q));
  console.log('  '+lab+'  mass '+r.mass.toFixed(3).padStart(6)+(r.mass>=K?'  FIRES':'  quiet ')+'  ['+r.hits.join(',')+']');
  console.log('        "'+q+'"');
}
console.log('');
console.log('TEST 2 -- token-variant gap (the kwh / "kilowatt hours" shape)');
for(const [have,want] of [['polar','pole'],['illuminated','illumination'],['solar','sunlight']]){
  console.log('   key "'+have+'" idf '+LIT.idfFor(dir,'lunar',have).toFixed(3)+
              '   question word "'+want+'" idf '+LIT.idfFor(dir,'lunar',want).toFixed(3)+
              '   key present: '+ax9.match_keys.includes(want));
}
console.log('');
const top2=ax9.match_keys.map(k=>LIT.idfFor(dir,'lunar',k)).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a+b,0);
const top2_7=ax7.match_keys.map(k=>LIT.idfFor(dir,'lunar',k)).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a+b,0);
console.log('CEILING: sum of the TWO HEAVIEST keys on each axis (a 2-key question is typical)');
console.log('   LCC-07  '+top2_7.toFixed(3)+(top2_7>=K?'  can reach K':'  CANNOT reach K'));
console.log('   LCC-09  '+top2.toFixed(3)+(top2>=K?'  can reach K':'  CANNOT reach K'));
const need=ax9.match_keys.map(k=>LIT.idfFor(dir,'lunar',k)).sort((a,b)=>b-a);
let s=0,n=0; while(s<K&&n<need.length){s+=need[n++];}
console.log('   LCC-09 needs '+n+' of its heaviest keys hit at once to reach K = '+K);
