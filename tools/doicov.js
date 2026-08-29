#!/usr/bin/env node
// doicov.js -- Step 2.1 companion. Seven candidate definitions of DOI coverage, all run over the
// same union of two corpora, so a coverage figure can never again be quoted without its rule.
// Usage: node doicov.js <lseiLitDir> <intakeLitDir>
// Reports its inputs and its read-digest before it reports a single count.
const fs=require('fs'),path=require('path');
function normalize(n){let s=path.basename(n).replace(/\.md$/i,'').toLowerCase().replace(/[_ ]+/g,'-').replace(/-{2,}/g,'-').replace(/^-+|-+$/g,'');return s+'.md';}
// W5-11: routed through tools/fswalk.js. `e.isDirectory()` is false for a reparse-pointed
// directory and this shape prunes the subtree silently, which for a COVERAGE figure means a
// smaller denominator and a cleaner-looking number.
const FSW=require('./fswalk.js');
function walk(d,o=[]){return FSW.walk(d,p=>/\.md$/i.test(p),o);}
if(!process.argv[2]||!process.argv[3]){console.error('usage: node doicov.js <lseiLitDir> <intakeLitDir>');process.exit(2);}
const A=walk(process.argv[2]),B=walk(process.argv[3]);
// ---- read-digest over every file this run opens ----
const RD=[...A,...B].map(p=>{const st=fs.statSync(p);return p.split(path.sep).join('/')+String.fromCharCode(9)+st.size+String.fromCharCode(9)+st.mtimeMs;}).sort();
console.log('# doicov.js inputs   '+process.argv[2]+'  '+process.argv[3]);
console.log('# files read         '+RD.length);
console.log('# read-digest        sha256 over sorted path/size/mtimeMs = '+require('crypto').createHash('sha256').update(Buffer.from(RD.join(String.fromCharCode(10)),'utf8')).digest('hex'));
const am=new Map(),bm=new Map();for(const f of A)am.set(normalize(f),f);for(const f of B)bm.set(normalize(f),f);
const keys=[...new Set([...am.keys(),...bm.keys()])].sort();
const BARE=/\b10\.\d{4,9}\/[^\s"'`<>\]}|]{3,}/;
const RESOLVER=/https?:\/\/(dx\.)?doi\.org\/10\.\d{4,9}\//i;
const LABEL=/^[\s>*|-]*\**\s*doi\b[^:]{0,20}:.*\b10\.\d{4,9}\/[^\s"'`<>\]}|]{3,}/im;
function blk(t){const L=t.split(/\r?\n/);const f={};for(let i=0;i<L.length;i++){const m=L[i].match(/^(#{2,3})\s*(Citation|Provenance|Metadata)\s*$/i);if(!m)continue;const k=m[2].toLowerCase();if(f[k]!==undefined)continue;const b=[];for(let j=i+1;j<L.length;j++){if(/^#{1,3}\s/.test(L[j])||/^-{3,}\s*$/.test(L[j]))break;b.push(L[j]);}f[k]=b.join('\n');}
for(const k of ['citation','provenance','metadata'])if(f[k]&&f[k].trim())return f[k];return '';}
const defs={
 'anywhere-in-file, either copy':(a,b)=>[a,b].filter(Boolean).some(f=>BARE.test(fs.readFileSync(f,'utf8'))),
 'anywhere-in-file, lsei copy preferred':(a,b)=>BARE.test(fs.readFileSync(a||b,'utf8')),
 'anywhere-in-file, resolver-URL form only, either':(a,b)=>[a,b].filter(Boolean).some(f=>RESOLVER.test(fs.readFileSync(f,'utf8'))),
 'in citation block, either copy':(a,b)=>[a,b].filter(Boolean).some(f=>BARE.test(blk(fs.readFileSync(f,'utf8')))),
 'in citation block, lsei copy preferred':(a,b)=>BARE.test(blk(fs.readFileSync(a||b,'utf8'))),
 'on a DOI-labelled line anywhere in file, either':(a,b)=>[a,b].filter(Boolean).some(f=>LABEL.test(fs.readFileSync(f,'utf8'))),
 'on a DOI-labelled line in citation block, either':(a,b)=>[a,b].filter(Boolean).some(f=>LABEL.test(blk(fs.readFileSync(f,'utf8')))),
};
for(const [name,fn] of Object.entries(defs)){let c=0;for(const k of keys){if(fn(am.get(k),bm.get(k)))c++;}console.log(String(c).padStart(4)+'  '+name);}
console.log('   n union keys '+keys.length);
