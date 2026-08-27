// For every axis: IDF-weighted match_keys mass that probe_pos and probe_neg put on their own axis,
// and the highest mass either probe puts on any other axis. K is unset (3.6 owns it); this reports
// the separation the probes give, which is the data 3.6 needs.
const fs=require('fs'), path=require('path');
const STOPWORDS=new Set(['the','a','an','and','or','but','of','in','on','at','to','for','with','by','from','as','is','are','was','were','be','been','being','it','its','this','that','these','those','what','which','who','how','why','when','where','did','does','do','not','no','so','than','then','if','into','about','across','over','under','out','up','down','per','via','vs','and/or','their',"it's",'would','could','should','will','shall','can','may','might','also','only','one','two','three','app','apps','model','models','modeled','modelled','modeling','modelling','assumes','assumed']);
function tok(t){return (String(t).toLowerCase().match(/[a-z0-9]+/g)||[]).filter(x=>x.length>1&&!STOPWORDS.has(x));}
const ROOT=process.argv[3];
const files=[];(function w(d,p){for(const e of fs.readdirSync(d,{withFileTypes:true})){const r=p?p+'/'+e.name:e.name;if(e.isDirectory())w(path.join(d,e.name),r);else if(e.name.endsWith('.md'))files.push(r);}})(ROOT,'');
const df=new Map();
for(const f of files){const s=new Set(tok(fs.readFileSync(path.join(ROOT,f),'utf8')).concat(tok(path.basename(f,'.md'))));for(const t of s)df.set(t,(df.get(t)||0)+1);}
const N=files.length; const idf=t=>Math.log(N/((df.get(t)||0)+1e-9));
function loadRows(p){
  let s=fs.readFileSync(p,'utf8');
  if(/\.md$/i.test(p)){                 // accept the deliverable directly: lift the marked block
    const m=s.match(/^<!-- BEGIN oracle\/REGISTER\.tsv[^\n]*-->\n([\s\S]*?)\n<!-- END oracle\/REGISTER\.tsv/m);
    if(!m){console.error('no BEGIN/END oracle/REGISTER.tsv block in '+p);process.exit(2);}
    s=m[1];
  }
  return s.split(/\r?\n/).filter(l=>l.length&&!l.startsWith('#'));
}
const rows=loadRows(process.argv[2]).filter(l=>l.startsWith('A\t')).map(l=>l.split('\t'));
function mass(q,keys){const qt=new Set(tok(q));let m=0;const hit=[];for(const k of keys)if(qt.has(k)){m+=idf(k);hit.push(k);}return [m,hit];}
console.log('axis      pos(own)  hits                          negOwn  worstOther');
for(const a of rows){
  const keys=a[3].split(',');
  const [pm,ph]=mass(a[7],keys);
  const [nm,nh]=mass(a[8],keys);
  let worst=0,worstId='-';
  for(const b of rows){ if(b[1]===a[1])continue;
    const [m2]=mass(a[7],b[3].split(','));
    if(m2>worst){worst=m2;worstId=b[1];} }
  console.log(a[1]+'  '+pm.toFixed(2).padStart(7)+'  '+ph.join(',').padEnd(28)+'  '+nm.toFixed(2).padStart(5)+(nh.length?' ['+nh.join(',')+']':'')+'   '+worst.toFixed(2)+' '+worstId);
}
