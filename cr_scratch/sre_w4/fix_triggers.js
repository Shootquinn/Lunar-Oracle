'use strict';
const fs=require('fs');
const {tokenize,idfFor}=require('../../oracle/retrieval/literature_search.js');
const REPAIR={
 T3:{drop:['MTBF'],add:['mtbf']},
 T5:{drop:['boil-off'],add:['boil','transferred','transfers','transferring','refueling','tanker']},
 T7:{drop:['he-3','helium-3','REE','KREEP','PGM'],add:['he3','ree','kreep','pgm']},
 T10:{drop:['TRL','as of'],add:['trl']},
};
let src=fs.readFileSync('oracle/thin_patches.json','utf8');
const tp=JSON.parse(src);
let n=0;
for(const p of tp.patches){
  const r=REPAIR[p.id]; if(!r) continue;
  const before=p.trigger_tokens.slice();
  const after=before.filter(t=>!r.drop.includes(t)).concat(r.add.filter(t=>!before.includes(t)));
  const oldLine='"trigger_tokens": '+JSON.stringify(before).replace(/","/g,'", "');
  const newLine='"trigger_tokens": '+JSON.stringify(after).replace(/","/g,'", "');
  if(!src.includes(oldLine)) throw new Error('no exact line for '+p.id);
  src=src.replace(oldLine,newLine); n++;
  console.log(p.id+'  -'+r.drop.join(',')+'  +'+r.add.join(','));
}
if(n!==4) throw new Error('patched '+n);
fs.writeFileSync('oracle/thin_patches.json',Buffer.from(src.replace(/\r\n/g,'\n'),'binary'));
// re-verify token form + corpus floor
const out=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
let bad=0,floor=0,total=0;
const shelfTok=new Set();
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const q=d+'/'+e.name;
 if(e.isDirectory())walk(q); else if(e.name.endsWith('.md')) for(const t of tokenize(fs.readFileSync(q,'utf8'))) shelfTok.add(t);}})('literature');
for(const p of out.patches) for(const t of p.trigger_tokens){
  total++; const tk=tokenize(t);
  if(!(tk.length===1&&tk[0]===t)){bad++;console.log('  K1 FAIL '+p.id+' '+t);}
  if(!shelfTok.has(t)){floor++;console.log('  FLOOR miss '+p.id+' '+t);}
}
console.log('\ntrigger tokens '+total+' | K1 failures '+bad+' | corpus-floor misses '+floor);
console.log('CR bytes '+fs.readFileSync('oracle/thin_patches.json').filter(b=>b===13).length);
