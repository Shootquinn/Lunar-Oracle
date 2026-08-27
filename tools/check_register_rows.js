'use strict';
const fs=require('fs'),path=require('path');
const ROOT='C:/Users/Quinn Morley/onedrive/projects/cc/lunar oracle';
const LIT=path.join(ROOT,'lsei/literature');
const LS=require(path.join(ROOT,'lsei/oracle/lib/literature_search.js'));
const tokenize=LS.tokenize||LS._tokenize;
if(!tokenize){console.error('no tokenize export; keys:',Object.keys(LS));process.exit(2);}
function listFiles(dir,pre){let out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const rel=pre?pre+'/'+e.name:e.name;if(e.isDirectory())out=out.concat(listFiles(path.join(dir,e.name),rel));else if(e.name.endsWith('.md'))out.push(rel);}return out;}
const files=listFiles(LIT,'');
const leafIndex=new Map();
for(const f of files){const leaf=f.split('/').pop();if(leafIndex.has(leaf))console.log('DUPLICATE LEAF',leaf);leafIndex.set(leaf,f);}
const bodyTokens=new Map();
for(const f of files){const leaf=f.split('/').pop();const txt=fs.readFileSync(path.join(LIT,f),'utf8');bodyTokens.set(leaf,new Set(tokenize(txt+' '+leaf.replace(/\.md$/,''))));}
const tsv=fs.readFileSync(process.argv[2],'utf8').split(/\r?\n/);
const axes=new Map();const members=[];let H=null;
for(const line of tsv){if(!line.trim()||line.startsWith('#'))continue;const c=line.split('\t');
 if(c[0]==='H'){H=c;continue;}
 if(c[0]==='A'){if(c.length!==9)console.log('ARITY A',c[1],c.length);axes.set(c[1],{id:c[1],cls:c[2],keys:c[3].split(','),scope:c[4],stmt:c[5],app:c[6],pos:c[7],neg:c[8]});continue;}
 if(c[0]==='M'){if(c.length!==5)console.log('ARITY M',c[1],c[3],c.length);members.push({axis:c[1],side:c[2],leaf:c[3],position:c[4]});continue;}
 console.log('UNKNOWN ROW TYPE',c[0]);}
console.log('parsed A rows',axes.size,'M rows',members.length,'| H says',H&&H[4],H&&H[5]);
// L4 resolution
for(const m of members) if(!leafIndex.has(m.leaf)) console.log('UNRESOLVED LEAF',m.axis,m.side,m.leaf);
// L5 side arity
for(const [id,a] of axes){const s=new Set(members.filter(m=>m.axis===id).map(m=>m.side));
 if((a.cls==='two_sided'||a.cls==='false_pair')&&s.size<2)console.log('SIDE ARITY',id,a.cls,[...s].join(''));
 if(a.cls==='one_sided'&&s.size!==1)console.log('SIDE ARITY',id,a.cls,[...s].join(''));}
// B2 closed sets
for(const [id,a] of axes){if(!['two_sided','false_pair','one_sided'].includes(a.cls))console.log('BAD CLASS',id,a.cls);if(!/^(LCC|ECR)-[0-9]{2}$/.test(id))console.log('BAD ID',id);}
for(const m of members) if(!/^[A-Z]$/.test(m.side)) console.log('BAD SIDE',m.axis,m.side);
// K1 + K2
let dead=0,total=0;const allkeys=new Set();
for(const [id,a] of axes){const seen=new Set();
 for(const k of a.keys){total++;allkeys.add(k);
  if(seen.has(k))console.log('DUP KEY',id,k);seen.add(k);
  const t=tokenize(k);
  if(!(t.length===1&&t[0]===k)){console.log('K1 FAIL',id,JSON.stringify(k),'->',JSON.stringify(t));dead++;continue;}
  const mem=members.filter(m=>m.axis===id);
  const hit=mem.some(m=>bodyTokens.has(m.leaf)&&bodyTokens.get(m.leaf).has(k));
  if(!hit){console.log('K2 FAIL',id,k,'(not a token in any member of this axis)');dead++;}
 }}
console.log('keys total',total,'distinct',allkeys.size,'failing',dead);
// probes: report overlap of probe tokens with own keys, and whether probe_neg touches a member
for(const [id,a] of axes){
 const pt=new Set(tokenize(a.pos)),nt=new Set(tokenize(a.neg));
 const povl=a.keys.filter(k=>pt.has(k)),novl=a.keys.filter(k=>nt.has(k));
 const mem=members.filter(m=>m.axis===id);
 const touched=mem.filter(m=>{const b=bodyTokens.get(m.leaf);return [...nt].filter(t=>b.has(t)).length>=Math.max(2,Math.ceil(nt.size*0.6));});
 console.log(id,a.cls,'| probe_pos keys hit',povl.length,JSON.stringify(povl),'| probe_neg keys hit',novl.length,JSON.stringify(novl),'| neg touches',touched.length,'members');
 if(povl.length===0)console.log('  !! probe_pos hits no key of its own axis');
 if(touched.length===0)console.log('  !! probe_neg touches no member');
}
// B6 cluster completeness: report near-duplicate filename clusters among members
function stem(l){return l.replace(/\.md$/,'').replace(/-\d+$/,'');}
const byPrefix=new Map();
for(const f of files){const leaf=f.split('/').pop();const k=leaf.split('-').slice(0,2).join('-');(byPrefix.get(k)||byPrefix.set(k,[]).get(k)).push(leaf);}
for(const [k,v] of byPrefix){if(v.length<2)continue;const used=members.filter(m=>v.includes(m.leaf));if(used.length===0)continue;
 const axesHit=[...new Set(used.map(m=>m.axis))];
 for(const ax of axesHit){const inAx=members.filter(m=>m.axis===ax&&v.includes(m.leaf)).map(m=>m.leaf);
  const missing=v.filter(x=>!inAx.includes(x));
  if(missing.length)console.log('B6 CLUSTER',ax,'has',inAx.join(','),'| cluster also holds',missing.join(','));}}
// B7 shared members
const ids=[...axes.keys()];
for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
 const a=new Set(members.filter(m=>m.axis===ids[i]).map(m=>m.leaf));
 const b=members.filter(m=>m.axis===ids[j]&&a.has(m.leaf)).map(m=>m.leaf);
 if(b.length>=2)console.log('B7 SHARED',ids[i],ids[j],b.join(','));}
