'use strict';
const fs=require('fs');
const {tokenize,idfFor}=require('../../oracle/retrieval/literature_search.js');
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
const FIRE=tp.firing_rule.fire_threshold.value, GOV=tp.firing_rule.govern_threshold.value;
function mass(p,q){const qt=new Set(tokenize(q));const h=p.trigger_tokens.filter(t=>qt.has(t));
  let m=0;for(const x of h)m+=idfFor('literature','lunar',x);return m;}
function P(id){return tp.patches.find(p=>p.id===id);}
const Q={
 'SRQ-13':'What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature?',
 'SRQ-14':'How often must lunar propellant be transferred to keep boil-off within limits?',
 'SRQ-7' :'What technology readiness level does this corpus record for molten regolith electrolysis, and as of when?',
 'SRQ-10':'The app amortizes plant over a ten-year life using BEA depreciation rates for terrestrial mining machinery. Does that transfer to a lunar plant?',
 'SRQ-5' :'How much water ice is in the regolith at Cabeus crater?',
};
const A=[
 ['T5 GOVERNS on SRQ-14 (the repair)',           mass(P('T5'),Q['SRQ-14']), m=>m>GOV],
 ['T1 GOVERNS on SRQ-13',                        mass(P('T1'),Q['SRQ-13']), m=>m>GOV],
 ['T1 does NOT fire on SRQ-7',                   mass(P('T1'),Q['SRQ-7']),  m=>m<FIRE],
 ['T1 does NOT fire on SRQ-5',                   mass(P('T1'),Q['SRQ-5']),  m=>m<FIRE],
 ['T3 fires but does NOT govern on SRQ-10',      mass(P('T3'),Q['SRQ-10']), m=>m>=FIRE&&m<GOV],
 ['T10 fires but does NOT govern on SRQ-7',      mass(P('T10'),Q['SRQ-7']), m=>m>=FIRE&&m<GOV],
 ['T2 does NOT govern on SRQ-13',                mass(P('T2'),Q['SRQ-13']), m=>m<GOV],
];
let bad=0;
console.log('fire='+FIRE+'  govern='+GOV);
for(const [name,m,ok] of A){const p=ok(m);if(!p)bad++;console.log((p?'  PASS ':'  FAIL ')+name.padEnd(40)+'mass '+m.toFixed(3));}
for(const p of tp.patches){
  const mp=mass(p,p.probe_pos), mn=mass(p,p.probe_neg);
  if(!(mp>GOV)){bad++;console.log('  FAIL '+p.id+' probe_pos does not govern ('+mp.toFixed(3)+')');}
  if(!(mn<GOV)){bad++;console.log('  FAIL '+p.id+' probe_neg governs ('+mn.toFixed(3)+')');}
  for(const t of p.trigger_tokens){const tk=tokenize(t); if(!(tk.length===1&&tk[0]===t)){bad++;console.log('  FAIL K1 '+p.id+' '+t);}}
}
console.log(bad===0?'\nALL THIN-PATCH ASSERTIONS PASS (7 named + 20 probe rows + 123 token-form)':'\n'+bad+' FAILURES');
process.exit(bad?1:0);
