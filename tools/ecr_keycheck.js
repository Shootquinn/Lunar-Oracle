// K1/K2 checker for ECR match_keys, using literature_search.js's own tokenizer rules.
const fs = require('fs'), path = require('path');
const ROOT = process.argv[2];
const STOPWORDS = new Set([
  'the','a','an','and','or','but','of','in','on','at','to','for','with','by','from','as','is',
  'are','was','were','be','been','being','it','its','this','that','these','those','what','which',
  'who','how','why','when','where','did','does','do','not','no','so','than','then','if','into',
  'about','across','over','under','out','up','down','per','via','vs','and/or','their',"it's",
  'would','could','should','will','shall','can','may','might','also','only','one','two','three',
  'app','apps','model','models','modeled','modelled','modeling','modelling','assumes','assumed',
]);
function tokenize(text){
  const raw = String(text).toLowerCase().match(/[a-z0-9]+/g) || [];
  return raw.filter(t => t.length > 1 && !STOPWORDS.has(t));
}
const RAW = JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
// Accepts either a flat array of axes, or the two-pass shape [{pass,axes},...].
const AXES = Array.isArray(RAW) && RAW.length && RAW[0].axes ? RAW.flatMap(p=>p.axes) : RAW;
const cache = new Map();
function bodyTokens(leaf){
  if (cache.has(leaf)) return cache.get(leaf);
  const p = path.join(ROOT, leaf);
  if (!fs.existsSync(p)) { console.log('  !! MISSING LEAF ' + leaf); cache.set(leaf,new Set()); return cache.get(leaf); }
  const s = new Set(tokenize(fs.readFileSync(p,'utf8')).concat(tokenize(leaf.replace(/\.md$/,''))));
  cache.set(leaf,s); return s;
}
let dead = 0, total = 0;
for (const ax of AXES){
  const sets = ax.members.map(bodyTokens);
  const bad = [];
  for (const k of ax.keys){
    total++;
    const tk = tokenize(k);
    if (!(tk.length===1 && tk[0]===k)) { bad.push(k+'  K1-> ['+tk.join(',')+']'); dead++; continue; }
    if (!sets.some(s=>s.has(k))) { bad.push(k+'  K2-> occurs in no member'); dead++; }
  }
  console.log(ax.id + '  keys=' + ax.keys.length + (bad.length? '  FAIL '+bad.length : '  ok'));
  for (const b of bad) console.log('    ' + b);
}
console.log('TOTAL keys ' + total + '  dead ' + dead + '  live ' + (total-dead));
