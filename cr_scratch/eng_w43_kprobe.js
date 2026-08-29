'use strict';
const fs=require('fs'), path=require('path');
const C = require('../oracle/router/classify.js');
const LIT = require('../oracle/retrieval/literature_search.js');
const ctx = C.loadContext({ K: 0 });
if (ctx.refuse) { console.error(ctx.refuse.missing.join('; ')); process.exit(1); }
const Q = JSON.parse(fs.readFileSync(path.join(__dirname,'eng_w43_srq.json'),'utf8'));

const CON = [
 ['SRQ-3','LCC-01','quiet'],
 ['SRQ-7','LCC-07','quiet'], ['SRQ-7','LCC-08','quiet'],
 ['SRQ-8','LCC-09','fire'],
 ['SRQ-12','LCC-07','fire'],
 ['SRQ-13','LCC-15','quiet'],
];
console.log('ACCEPTANCE-SET CONSTRAINTS ON K   (exact question text from oracle/acceptance/lunar_questions.md)');
console.log('  row      axis     want    mass   hits');
const masses=[];
for (const [id, ax, want] of CON) {
  const axis = ctx.axes.get(ax);
  if (!axis) { console.log('  '+id.padEnd(9)+ax+'  NOT IN REGISTER'); continue; }
  const r = C.axisMass(ctx, axis, LIT.tokenize(Q[id]));
  masses.push({id, ax, want, m:r.mass});
  console.log('  '+id.padEnd(9)+ax.padEnd(9)+want.padEnd(7)+r.mass.toFixed(3).padStart(6)+'   ['+r.hits.join(', ')+']');
}
console.log('');
for (const ax of ['LCC-01','LCC-07','LCC-08','LCC-09','LCC-15']) {
  const a=ctx.axes.get(ax);
  if(a) console.log('  '+ax+' field='+a.field+'  match_keys: '+a.match_keys.join(', '));
}
const fires = masses.filter(x=>x.want==='fire');
const quiets = masses.filter(x=>x.want==='quiet');
const minFire=Math.min(...fires.map(x=>x.m)), maxQuiet=Math.max(...quiets.map(x=>x.m));
console.log('');
console.log('  every `fire` row needs   K <= '+minFire.toFixed(3)+'   (binding: '+fires.find(x=>x.m===minFire).id+'/'+fires.find(x=>x.m===minFire).ax+')');
console.log('  every `quiet` row needs  K >  '+maxQuiet.toFixed(3)+'   (binding: '+quiets.find(x=>x.m===maxQuiet).id+'/'+quiets.find(x=>x.m===maxQuiet).ax+')');
console.log('  WINDOW: '+(maxQuiet < minFire ? 'exists' : 'EMPTY -- no K satisfies the acceptance set'));
console.log('');
// How many of the 6 constraints can any single K satisfy?
const cand=[...new Set(masses.map(x=>x.m).flatMap(m=>[m, m+1e-6]))].sort((a,b)=>a-b);
let bestK=null,bestN=-1;
for(const k of cand.concat([0])){
  const n=masses.filter(x=>x.want==='fire'?x.m>=k:x.m<k).length;
  if(n>bestN){bestN=n;bestK=k;}
}
console.log('  best achievable on these 6 constraints: '+bestN+'/6 at K = '+bestK.toFixed(3));
for(const x of masses){const ok=x.want==='fire'?x.m>=bestK:x.m<bestK;console.log('    '+(ok?'ok  ':'MISS')+' '+x.id.padEnd(8)+x.ax.padEnd(9)+x.want.padEnd(6)+x.m.toFixed(3));}
