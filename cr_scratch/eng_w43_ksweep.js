'use strict';
const fs=require('fs'), path=require('path');
const C = require('../oracle/router/classify.js');
const LIT = require('../oracle/retrieval/literature_search.js');
const ctx = C.loadContext({ K: 0 });
const Q = JSON.parse(fs.readFileSync(path.join(__dirname,'eng_w43_srq.json'),'utf8'));

// SET 1: the register's own probe_pos/probe_neg -- the calibration set (66 rows, 33 axes)
const reg=[];
for (const ax of ctx.axes.values()){
  if (ax.probe_pos && ax.probe_pos!=='-') reg.push({axis:ax, expect:'fire', q:ax.probe_pos});
  if (ax.probe_neg && ax.probe_neg!=='-') reg.push({axis:ax, expect:'quiet', q:ax.probe_neg});
}
const regM = reg.map(r=>({...r, m:C.axisMass(ctx,r.axis,LIT.tokenize(r.q)).mass}));

// SET 2: the acceptance constraints -- authored by another seat, for another purpose, AFTER K was calibrated
const CON=[['SRQ-3','LCC-01','quiet'],['SRQ-7','LCC-07','quiet'],['SRQ-7','LCC-08','quiet'],
           ['SRQ-8','LCC-09','fire'],['SRQ-12','LCC-07','fire'],['SRQ-13','LCC-15','quiet']];
const accM = CON.map(([id,ax,want])=>({id,ax,want,m:C.axisMass(ctx,ctx.axes.get(ax),LIT.tokenize(Q[id])).mass}));

const sc=(rows,k)=>rows.filter(r=>(r.expect||r.want)==='fire'?r.m>=k:r.m<k).length;
const all=[...regM.map(r=>r.m),...accM.map(r=>r.m)].sort((a,b)=>a-b);
const grid=[]; for(let k=0;k<=Math.max(...all)+0.2;k+=0.01) grid.push(Number(k.toFixed(3)));

console.log('K SWEEP -- two independently authored sets');
console.log('   K     register 66   acceptance 6   both');
let last=null;
for(const k of grid){
  const a=sc(regM,k), b=sc(accM,k);
  const key=a+':'+b;
  if(key!==last){console.log('  '+k.toFixed(2).padStart(5)+'     '+String(a).padStart(2)+'/66        '+b+'/6          '+(a+b)+'/72'); last=key;}
}
const cur=2.431;
console.log('');
console.log('  CURRENT K = 2.431 -> register '+sc(regM,cur)+'/66, acceptance '+sc(accM,cur)+'/6');
let bR=-1,kR=null,bB=-1,kB=null;
for(const k of grid){ if(sc(regM,k)>bR){bR=sc(regM,k);kR=k;} const t=sc(regM,k)+sc(accM,k); if(t>bB){bB=t;kB=k;} }
console.log('  best on register alone : '+bR+'/66 (first at K='+kR+')');
console.log('  best on both combined  : '+bB+'/72 (first at K='+kB+') -> register '+sc(regM,kB)+'/66, acceptance '+sc(accM,kB)+'/6');
console.log('');
console.log('  COST OF FORCING SRQ-8 (needs K <= 0.428):');
console.log('    at K = 0.428: register '+sc(regM,0.428)+'/66, acceptance '+sc(accM,0.428)+'/6');
console.log('    register probe_neg rows that would then wrongly fire: '+
  regM.filter(r=>r.expect==='quiet'&&r.m>=0.428).length+' of '+regM.filter(r=>r.expect==='quiet').length);
console.log('  COST OF FORCING SRQ-12 (needs K <= 1.540):');
console.log('    at K = 1.540: register '+sc(regM,1.540)+'/66, acceptance '+sc(accM,1.540)+'/6');
console.log('    register probe_neg rows that would then wrongly fire: '+
  regM.filter(r=>r.expect==='quiet'&&r.m>=1.540).length+' of '+regM.filter(r=>r.expect==='quiet').length);
