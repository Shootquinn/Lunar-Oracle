// Runs the ratified schema's assertions L2 L3 L5 B1 B2 B3 B5 B6 B7 over an ECR sidecar fragment.
// Usage: node ecr_verify.js <tsv-or-deliverable.md> <corpusRoot>
const fs=require('fs'), path=require('path');
const STOPWORDS=new Set(['the','a','an','and','or','but','of','in','on','at','to','for','with','by','from','as','is','are','was','were','be','been','being','it','its','this','that','these','those','what','which','who','how','why','when','where','did','does','do','not','no','so','than','then','if','into','about','across','over','under','out','up','down','per','via','vs','and/or','their',"it's",'would','could','should','will','shall','can','may','might','also','only','one','two','three','app','apps','model','models','modeled','modelled','modeling','modelling','assumes','assumed']);
function tokenize(t){return (String(t).toLowerCase().match(/[a-z0-9]+/g)||[]).filter(x=>x.length>1&&!STOPWORDS.has(x));}
function loadRows(p){
  let s=fs.readFileSync(p,'utf8');
  if(/\.md$/i.test(p)){                 // accept the deliverable directly: lift the marked block
    const m=s.match(/^<!-- BEGIN oracle\/REGISTER\.tsv[^\n]*-->\n([\s\S]*?)\n<!-- END oracle\/REGISTER\.tsv/m);
    if(!m){console.error('no BEGIN/END oracle/REGISTER.tsv block in '+p);process.exit(2);}
    s=m[1];
  }
  return s.split(/\r?\n/).filter(l=>l.length&&!l.startsWith('#'));
}
const tsv=loadRows(process.argv[2]);
const ROOT=process.argv[3];
const fail=[];
let H=null; const axes=new Map(); const mems=[];
const ARITY={H:6,A:9,M:5};
for(const [i,line] of tsv.entries()){
  const f=line.split('\t'); const t=f[0];
  if(!ARITY[t]){fail.push('L3 row '+(i+1)+' unknown type '+t);continue;}
  if(f.length!==ARITY[t]) fail.push('L3 row '+(i+1)+' type '+t+' has '+f.length+' fields, needs '+ARITY[t]);
  if(f.some(x=>/[\t\n]/.test(x))) fail.push('L3 row '+(i+1)+' embedded tab or newline');
  if(t==='H') H=f;
  if(t==='A'){ if(axes.has(f[1])) fail.push('B1 duplicate axis '+f[1]); axes.set(f[1],f); }
  if(t==='M') mems.push(f);
}
// L2 self-declared size
if(!H) fail.push('L1 no H row');
else{
  if(Number(H[4])!==axes.size) fail.push('L2 axis_count '+H[4]+' != parsed '+axes.size);
  if(Number(H[5])!==mems.length) fail.push('L2 member_count '+H[5]+' != parsed '+mems.length);
}
// B1 id form; B2 closed sets; B5 mandatory fields
const CLASSES=new Set(['two_sided','false_pair','one_sided']);
for(const [id,a] of axes){
  if(!/^(LCC|ECR)-[0-9]{2}$/.test(id)) fail.push('B1 bad axis_id '+id);
  if(!CLASSES.has(a[2])) fail.push('B2 bad class on '+id+': '+a[2]);
  for(const [n,idx] of [['axis_statement',5],['probe_pos',7],['probe_neg',8]])
    if(!a[idx] || !a[idx].trim()) fail.push('B5 empty '+n+' on '+id);
  for(const [n,idx] of [['scope_token',4],['app_surface',6]])
    if(!a[idx] || !a[idx].trim()) fail.push('B5 empty '+n+' on '+id+' (use "-")');
  if(/,\s/.test(a[3])||/\s,/.test(a[3])) fail.push('B3 spaces around commas in match_keys on '+id);
}
// false_pair banned words anywhere on the row
const BANNED=/\b(disagree|disagrees|disagreed|disagreement|disagreements|contradict|contradicts|contradicted|contradiction|contradictions|contradictory|dispute|disputes|disputed|disputing)\b/i;
for(const [id,a] of axes) if(a[2]==='false_pair'){
  const hit=a.slice(3).filter(x=>BANNED.test(x));
  if(hit.length) fail.push('false_pair banned word on '+id+': '+hit.join(' | '));
}
for(const m of mems) { const a=axes.get(m[1]);
  if(a&&a[2]==='false_pair'&&BANNED.test(m[4])) fail.push('false_pair banned word in position on '+m[1]+' '+m[3]); }
// B1 orphan members; B2 side form; L5 side arity; B5 position
const bySide=new Map();
for(const m of mems){
  if(!axes.has(m[1])) fail.push('B1 member names unknown axis '+m[1]);
  if(!/^[A-Z]$/.test(m[2])) fail.push('B2 bad side "'+m[2]+'" on '+m[1]);
  if(!m[4]||!m[4].trim()) fail.push('B5 empty position on '+m[1]+' '+m[3]);
  if(!bySide.has(m[1])) bySide.set(m[1],new Set());
  bySide.get(m[1]).add(m[2]);
}
for(const [id,a] of axes){
  const n=(bySide.get(id)||new Set()).size;
  if((a[2]==='two_sided'||a[2]==='false_pair')&&n<2) fail.push('L5 '+id+' class '+a[2]+' has '+n+' side(s)');
  if(a[2]==='one_sided'&&n!==1) fail.push('L5 '+id+' class one_sided has '+n+' sides');
}
// L4 resolution + B3 K1/K2
const index=new Map();
(function walk(d,p){for(const e of fs.readdirSync(d,{withFileTypes:true})){const r=p?p+'/'+e.name:e.name;
  if(e.isDirectory())walk(path.join(d,e.name),r); else if(e.name.endsWith('.md'))index.set(e.name,r);}})(ROOT,'');
const bodyCache=new Map();
function memTokens(leaf){ if(bodyCache.has(leaf))return bodyCache.get(leaf);
  const rel=index.get(leaf); const s=new Set(tokenize(leaf.replace(/\.md$/,'')));
  if(rel) for(const t of tokenize(fs.readFileSync(path.join(ROOT,rel),'utf8'))) s.add(t);
  bodyCache.set(leaf,s); return s; }
for(const m of mems) if(!index.has(m[3])) fail.push('L4 leaf does not resolve: '+m[3]+' ('+m[1]+')');
let keysTotal=0,k1=0,k2=0;
for(const [id,a] of axes){
  const leaves=mems.filter(m=>m[1]===id).map(m=>m[3]);
  const sets=leaves.map(memTokens);
  for(const k of a[3].split(',')){
    keysTotal++;
    const tk=tokenize(k);
    if(!(tk.length===1&&tk[0]===k)){fail.push('B3/K1 '+id+' key "'+k+'" tokenizes to ['+tk.join(',')+']');k1++;continue;}
    if(!sets.some(s=>s.has(k))){fail.push('B3/K2 '+id+' key "'+k+'" occurs in no member');k2++;}
  }
}
// B6 near-duplicate leaf clusters among member leaves (same author-year prefix)
const pre=new Map();
for(const leaf of index.keys()){const mm=leaf.match(/^([a-z0-9-]+?-\d{4})-/); if(!mm)continue;
  if(!pre.has(mm[1]))pre.set(mm[1],[]); pre.get(mm[1]).push(leaf);}
const memLeaves=new Set(mems.map(m=>m[3]));
for(const [k,v] of pre) if(v.length>1){ const inReg=v.filter(x=>memLeaves.has(x));
  if(inReg.length&&inReg.length<v.length) fail.push('B6 cluster '+k+' partly registered: in='+inReg.join(',')+' missing='+v.filter(x=>!memLeaves.has(x)).join(','));}
// B7 shared-member report (reports only)
const share=[];
const ids=[...axes.keys()];
for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
  const a=new Set(mems.filter(m=>m[1]===ids[i]).map(m=>m[3]));
  const b=mems.filter(m=>m[1]===ids[j]).map(m=>m[3]).filter(x=>a.has(x));
  if(b.length>=2) share.push(ids[i]+' & '+ids[j]+' share '+b.length+': '+b.join(', '));
}
console.log('axes '+axes.size+'  members '+mems.length+'  distinct leaves '+new Set(mems.map(m=>m[3])).size);
console.log('match_keys total '+keysTotal+'  K1 failures '+k1+'  K2 failures '+k2);
const byClass={};for(const [,a] of axes)byClass[a[2]]=(byClass[a[2]]||0)+1;
console.log('classes '+JSON.stringify(byClass));
console.log('sides per axis: '+ids.map(i=>i+'='+(bySide.get(i)||new Set()).size).join(' '));
console.log('--- B7 SHARED-MEMBER REPORT (does not fail) ---');
if(!share.length)console.log('  none'); else share.forEach(s=>console.log('  '+s));
console.log('--- ASSERTIONS ---');
if(!fail.length)console.log('  ALL PASS');else fail.forEach(f=>console.log('  FAIL '+f));
process.exit(fail.length?1:0);
