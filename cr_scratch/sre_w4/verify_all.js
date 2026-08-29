'use strict';
const fs=require('fs');
const {loadModelAPI}=require('../../lsei/oracle/lib/app_model.js');
const api=loadModelAPI('./lsei/index.html');
let fail=0; const F=m=>{console.log('FAIL '+m);fail++;};
const qc=JSON.parse(fs.readFileSync('oracle/question_classes.json','utf8'));
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
const probe=api.model({ice:5,phi_c:0.05,funding:'med',phase:'2030',power:10,mass:10,fission:false});
const OUT=new Set(Object.keys(probe)),CONFIGK=new Set(Object.keys(api.CONFIG)),SLUG=api.SLUGS;
const VERD=new Set(['APP','FIGURE','LITERATURE','BOTH','CONTESTED','REFUSE']);
const CODE=new Set(['excluded','not-found','unbuildable','axis-incomplete','misclassified','input-missing']);
const AX=new Set(fs.readFileSync('oracle/REGISTER.lunar.tsv','utf8').split(/\n/).filter(l=>l.startsWith('A\t')).map(l=>l.split('\t')[1]));
const EXC=new Set(Object.keys(api.EXCLUSIONS));
const VALUEK=new Set(['L','op_prop','op_const','f_op','decayRate','decayLife','landed_cost']);
const KNOB=new Set(Object.keys(api.DETENTS).filter(k=>api.inputKeys.has(k)));
const NOTES=new Set(Object.keys(api.DERIVATION.notes));
const {tokenize}=require('../../oracle/retrieval/literature_search.js');
qc.reachable.model_output_keys.forEach(k=>OUT.has(k)||F('out '+k));
if(qc.reachable.model_output_keys.length!==OUT.size)F('output count');
qc.reachable.sweepable_knobs.forEach(k=>KNOB.has(k)||F('knob '+k));
if(qc.classes.length!==10)F('class count');
for(const c of qc.classes){
  VERD.has(c.verdict)||F(c.id+' verdict');
  if(c.alt_verdict)VERD.has(c.alt_verdict)||F(c.id+' alt');
  VERD.has(c.fallback.verdict)||F(c.id+' fb');
  if(c.fallback.reason)CODE.has(c.fallback.reason)||F(c.id+' code');
  (c.app_surface||[]).forEach(s=>SLUG.has(s)||F(c.id+' slug '+s));
  (c.register_axes||[]).forEach(a=>AX.has(a)||F(c.id+' axis '+a));
  (c.thin_patches||[]).forEach(t=>tp.patches.some(p=>p.id===t)||F(c.id+' tp '+t));
  (c.literature_folders||[]).forEach(f=>fs.existsSync(f)||F(c.id+' folder '+f));
  if(c.trace_split)c.trace_split.note_keys.forEach(n=>NOTES.has(n)||F(c.id+' note '+n));
  if(c.test&&c.test.output_keys)c.test.output_keys.forEach(k=>OUT.has(k)||F(c.id+' tk '+k));
  if(c.test&&c.test.config_symbols)c.test.config_symbols.forEach(k=>CONFIGK.has(k)||F(c.id+' cfg '+k));
  if(c.ungoverned_rows)c.ungoverned_rows.symbols.forEach(k=>CONFIGK.has(k)||F(c.id+' ung '+k));
}
const A=qc.exclusion_outcomes.assignments;
if(A.length!==EXC.size)F('assignment count');
for(const a of A){
  EXC.has(a.slug)||F('exc '+a.slug);
  if(a.adjacent_to)SLUG.has(a.adjacent_to)||F('adj '+a.adjacent_to);
  (a.register_axes||[]).forEach(x=>AX.has(x)||F('axis '+x));
  if(!Array.isArray(a.match_keys)||!a.match_keys.length)F(a.slug+' has no match_keys');
  if(typeof a.probe_pos!=='string'||!a.probe_pos.length)F(a.slug+' has no probe_pos');
  const qt=new Set(tokenize(a.probe_pos));
  if(!a.match_keys.some(k=>qt.has(k)))F(a.slug+' probe_pos hits none of its own match_keys');
  a.match_keys.forEach(k=>{const t=tokenize(k); if(!(t.length===1&&t[0]===k))F(a.slug+' K1 '+k);});
}
qc.exclusion_outcomes.adjacency_pairs.forEach(p=>{EXC.has(p.excluded)||F('pair '+p.excluded);SLUG.has(p.modeled)||F('pair '+p.modeled);});
if(!qc.exclusion_outcomes.match_keys_contract)F('no match_keys_contract');
if(tp.patches.length!==10)F('patch count');
for(const p of tp.patches){
  p.nearest_evidence.forEach(e=>fs.existsSync(e.path)||F(p.id+' '+e.path));
  CODE.has(p.refusal_code)||F(p.id+' code');
  (p.register_axes||[]).forEach(a=>AX.has(a)||F(p.id+' axis '+a));
  (p.question_classes||[]).forEach(c=>qc.classes.some(x=>x.id===c)||F(p.id+' class '+c));
  (p.undermines.app_surface||[]).forEach(s=>SLUG.has(s)||F(p.id+' slug '+s));
  (p.undermines.coefficients||[]).forEach(k=>(CONFIGK.has(k)||VALUEK.has(k))||F(p.id+' coeff '+k));
  (p.undermines.downstream_outputs||[]).forEach(k=>OUT.has(k)||['r_prop','r_const','P_prop','P_const','margin_prop','margin_const','ranking'].includes(k)||F(p.id+' out '+k));
}
console.log(fail===0?'ALL RESOLUTION CHECKS PASS ('+qc.classes.length+' classes, '+A.length+' excluded nodes, '+A.reduce((n,a)=>n+a.match_keys.length,0)+' match_keys, '+tp.patches.length+' patches)':fail+' FAILURES');
process.exit(fail?1:0);
