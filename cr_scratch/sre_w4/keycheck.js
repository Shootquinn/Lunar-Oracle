/* cr_scratch/sre_w4/keycheck.js -- K1/K2 for excluded-node match_keys. Scratch, not a deliverable. */
'use strict';
const fs=require('fs'), path=require('path');
const {tokenize}=require('../../oracle/retrieval/literature_search.js');
const gen=JSON.parse(fs.readFileSync('oracle/router/excluded_nodes.json','utf8'));
const tp=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
const tpById=new Map(tp.patches.map(p=>[p.id,p]));

// token sets per corpus file, cached
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.posix.join(d,e.name);
  if(e.isDirectory())walk(p); else if(e.name.endsWith('.md'))files.push(p);}})('literature');
const tokensOf=new Map();
for(const f of files) tokensOf.set(f,new Set(tokenize(fs.readFileSync(f,'utf8'))));
const shelf=new Set(); for(const s of tokensOf.values()) for(const t of s) shelf.add(t);

function evidenceSurface(node){
  const paths=new Set();
  for(const p of node.primaries) if(p.leaf) paths.add(p.leaf);
  for(const id of node.thin_patches){ const P=tpById.get(id); if(P) for(const e of P.nearest_evidence) paths.add(e.path); }
  return [...paths];
}
module.exports={tokenize,tokensOf,shelf,evidenceSurface,gen,files};

if(require.main===module){
  const KEYS=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  let k1f=0,k2f=0,floorf=0;
  const owner=new Map();
  for(const node of gen.nodes){
    const keys=KEYS[node.slug]||[];
    const surf=evidenceSurface(node);
    const surfTok=new Set(); for(const p of surf) for(const t of tokensOf.get(p)||[]) surfTok.add(t);
    const rows=[];
    for(const k of keys){
      const tk=tokenize(k);
      const k1 = tk.length===1 && tk[0]===k;
      const k2 = surfTok.has(k);
      const floor = shelf.has(k);
      if(!k1)k1f++; if(!k2)k2f++; if(!floor)floorf++;
      rows.push((k1?'  ':'K1')+(k2?'  ':'k2')+(floor?'  ':'FL')+' '+k);
      if(!owner.has(k))owner.set(k,[]); owner.get(k).push(node.slug);
    }
    console.log('### '+node.slug+'  ['+node.outcome+']  keys='+keys.length+'  evidence files='+surf.length);
    console.log('   '+rows.join('\n   '));
  }
  console.log('\nK1 failures '+k1f+' | K2 (node evidence surface) misses '+k2f+' | corpus-floor misses '+floorf);
  const coll=[...owner].filter(([k,v])=>v.length>1);
  console.log('cross-node duplicate keys: '+coll.length);
  coll.forEach(([k,v])=>console.log('   '+k+' -> '+v.join(', ')));
}
