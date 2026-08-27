#!/usr/bin/env node
/* probe_register_encoding.js -- measure what a contested-claims register encoding does to
 * retrieval, and whether its match_keys can ever fire.
 *
 * WHY THIS EXISTS. Three Wave 1 drafts proposed three encodings for one register: a sidecar TSV,
 * a YAML file under literature/_registers/, and machine-readable front matter on each member
 * summary. The choice between them was argued as a preference. It is not a preference: two of the
 * three write text into the bodies of the files retrieval reads, and literature_search.js builds
 * its document-frequency table and its full-text confirmation from exactly those bodies. An
 * encoding that writes the question's own words into a member file makes that file confirm
 * against the question, which is the shape confirmInText() exists to refuse.
 *
 * It also measures the register's load-bearing join. match_keys is the field a classifier tests a
 * sub-claim against BEFORE any retrieval runs. A key the tokenizer splits or drops, or that
 * occurs as a token nowhere in the corpus, is a key that never fires -- and every register test
 * still passes green while the invariant does nothing.
 *
 * WHAT IT IS NOT. Not a mechanism. It asserts nothing and gates nothing; it prints the numbers
 * sub-step 1.8's rulings rest on, so a successor can re-run them rather than trust them. The
 * register's real checks are specified in oracle/register_schema.md and land at 2.15.
 *
 * USAGE
 *   node tools/probe_register_encoding.js --resolve [corpusRoot]
 *   node tools/probe_register_encoding.js --keys    [corpusRoot]
 *   node tools/probe_register_encoding.js --blocks  [corpusRoot]
 *
 * corpusRoot defaults to lsei/literature. Axis data is read from oracle/REGISTER.tsv when that
 * file exists; otherwise from the embedded 15-axis fixture transcribed from
 * cr_scratch/step0_space_resources_engineer_question_surface.md section 5.4.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const LS = require(path.join(ROOT, 'lsei', 'oracle', 'lib', 'literature_search.js'));
const DEFAULT_CORPUS = path.join(ROOT, 'lsei', 'literature');

/* The fixture. Keys are transcribed VERBATIM from the trigger lists as the domain persona wrote
 * them -- punctuation, currency and multi-word phrases included -- because measuring them after
 * cleaning them would measure the cleaning rather than the field. */
const FIXTURE = [
  ['LCC-01', ['cabeus', 'ice', 'grade', 'concentration', 'wt%', 'water', 'lcross', 'psr', 'neutron'],
    ['colaprete-2010-lcross-water.md', 'colaprete-2010-lcross-ejecta-water-detection.md',
     'litvak-2024-lend-cabeus-water-ice.md', 'luchsinger-2021-lcross-water-modeling.md']],
  ['LCC-02', ['surface', 'exposed', 'ice', 'psr', 'shadowcam', 'm3', 'detect', 'reflectance'],
    ['li-2018-surface-exposed-water-ice.md', 'li-2026-shadowcam-psr-water-ice.md']],
  ['LCC-03', ['cold trap', 'distribution', 'buried', 'patchy', 'micro', 'prospect', 'deposit', 'mining scale'],
    ['hayne-2020-micro-cold-traps.md', 'cannon-2020-lunar-ice-geologic-model.md',
     'schorghofer-2026-current-theories-lunar-ice.md']],
  ['LCC-04', ['energy', 'kwh', 'specific', 'extract', 'water', 'sublimat', 'thermal mining', 'g/kwh', 'efficiency'],
    ['sowers-2019-thermal-mining-ice.md', 'kiewiet-2026-luwex-water-extraction.md',
     'wang-2025-microwave-water-production.md']],
  ['LCC-05', ['capture', 'efficiency', 'recovery', 'cold trap', 'yield', 'derate'],
    ['kiewiet-2026-luwex-water-extraction.md', 'sanders-2025-nasa-isru-progress-review.md',
     'linne-2020-lunar-water-pilot-plant.md']],
  ['LCC-06', ['aqua factorem', 'beneficiation', 'magnetic', 'electrostatic', 'separation', 'thermal mining', 'power reduction'],
    ['sowers-2019-thermal-mining-ice.md', 'metzger-2021-aqua-factorem.md',
     'metzger-2021-aqua-factorem-2.md', 'metzger-2020-aqua-factorem.md']],
  ['LCC-07', ['oxygen', 'o2', 'lox', 'energy', 'kwh', 'per kilogram', 'carbothermal', 'ilmenite', 'mre', 'reduction'],
    ['leger-2025-energy-oxygen-moon.md', 'colozza-2010-solar-lunar-oxygen.md',
     'nasa-2023-card-carbothermal-reduction.md', 'sanders-2025-nasa-isru-progress-review.md']],
  ['LCC-08', ['ilmenite', 'mare', 'highland', 'feedstock', 'beneficiation', 'polar', 'route', 'transfer'],
    ['sargeant-2020-hydrogen-reduction-ilmenite-static.md', 'leger-2025-energy-oxygen-moon.md',
     'schreiner-2016-molten-regolith-electrolysis-sizing.md', 'schreiner-2016-mre-sizing-model.md',
     'sibille-2012-joule-heated-mre.md', 'nasa-2023-card-carbothermal-reduction.md',
     'colozza-2010-solar-lunar-oxygen.md', 'sanders-2025-nasa-isru-progress-review.md']],
  ['LCC-09', ['illumination', 'lit', 'sunlight', 'peak', 'eternal', 'shackleton', 'connecting ridge', 'solar', 'power available'],
    ['speyerer-2013-persistently-illuminated-regions.md', 'glaser-2014-south-pole-illumination.md',
     'ross-2023-lunar-south-pole-solar-power.md']],
  ['LCC-10', ['fission', 'solar', 'power system', 'specific mass', 'kwe', 'storage', 'night', 'reactor', 'krusty'],
    ['poston-2020-krusty-reactor-design.md', 'oleson-2022-deployable-fsp.md',
     'nasa-2025-fission-surface-power-directive.md', 'ross-2023-lunar-south-pole-solar-power.md',
     'csank-2022-powering-the-moon.md', 'colozza-2020-lunar-base-power-comparison.md',
     'pappa-2021-relocatable-solar-array.md', 'belbin-2024-vsat-grd-demonstrator.md']],
  ['LCC-11', ['landed cost', '$/kg', 'per kilogram', 'launch', 'starship', 'falcon', 'clps', 'delivery price', 'leo'],
    ['payload-research-starship-cost.md', 'nasa-2023-card-carbothermal-reduction.md',
     'nasa-clps-delivery-timeline.md', 'nasa-clps-procurement-vignette.md',
     'metzger-autry-2023-lunar-landing-pads.md', 'adilov-2022-launch-cost-reductions.md',
     'jones-superheavylift-final20260614.md']],
  ['LCC-12', ['business case', 'breakeven', 'break even', 'close', 'propellant', '$500', 'npv', 'hurdle', 'viable'],
    ['kornuta-2019-commercial-lunar-propellant.md', 'kornuta-2019-commercial-lunar-propellant-architecture.md',
     'sowers-2019-thermal-mining-ice.md', 'jones-2020-lunar-propellant-breakeven.md',
     'jones-2019-cislunar-isru-breakeven.md', 'shishko-2019-lunar-thermal-mining-business-case.md',
     'mckeown-2024-space-resource-hurdle-rate.md']],
  ['LCC-13', ['helium-3', 'he-3', 'he3', 'fusion', 'd-3he', 'mark miner', 'regolith volatiles'],
    ['olson-2021-lunar-helium3-mining.md', 'wittenberg-1992-he3-resources-review.md',
     'gao-2011-neutron-detectors-helium3.md']],
  ['LCC-14', ['sinter', 'sintering', 'specific', 'energy', 'mj/kg', 'construction', 'pad', 'microwave sinter'],
    ['liu-2025-microwave-sintering-lunar-regolith-simulants.md', 'azami-2024-lunar-manufacturing-review.md',
     'just-2020-regolith-excavation-review.md', 'metzger-autry-2023-lunar-landing-pads.md']],
  ['LCC-15', ['excavation', 'excavator', 'dig', 'throughput', 'tonnes per year', 'kexc', 'bucket drum', 'regolith rate'],
    ['sanders-2025-nasa-isru-progress-review.md', 'just-2020-regolith-excavation-review.md',
     'rostami2018.md', 'kokkinis-2024-automated-drilling-mining-review.md']]
];

function loadAxes() {
  const tsv = path.join(ROOT, 'oracle', 'REGISTER.tsv');
  if (!fs.existsSync(tsv)) return FIXTURE.map(a => ({ id: a[0], keys: a[1], members: a[2] }));
  const axes = new Map();
  for (const line of fs.readFileSync(tsv, 'utf8').split(/\r?\n/)) {
    const c = line.split('\t');
    if (c[0] === 'A') axes.set(c[1], { id: c[1], keys: c[4].split(',').map(s => s.trim()), members: [] });
    if (c[0] === 'M' && axes.has(c[1])) axes.get(c[1]).members.push(c[3]);
  }
  return [...axes.values()];
}

function leafIndex(corpus) {
  const idx = new Map();
  for (const f of LS.listCorpusFiles(corpus)) idx.set(f.split('/').pop(), f);
  return idx;
}

function cmdResolve(corpus) {
  const axes = loadAxes(), idx = leafIndex(corpus);
  let total = 0, resolved = 0; const bad = [];
  for (const a of axes) for (const m of a.members) {
    total++;
    if (idx.has(m)) resolved++; else bad.push(a.id + '  ' + m);
  }
  console.log('corpus root         : ' + corpus);
  console.log('member references   : ' + total);
  console.log('resolve by leaf name: ' + resolved);
  console.log('do not resolve      : ' + (total - resolved));
  bad.forEach(b => console.log('   ' + b));
}

function cmdKeys(corpus) {
  const axes = loadAxes();
  const files = LS.listCorpusFiles(corpus);
  const bodyTok = new Set(), leafTok = new Set();
  for (const f of files) {
    const t = fs.readFileSync(path.join(corpus, f), 'utf8').toLowerCase();
    for (const w of (t.match(/[a-z0-9]+/g) || [])) if (w.length > 1) bodyTok.add(w);
    for (const w of LS.filenameTokens(f)) leafTok.add(w);
  }
  const keys = [...new Set([].concat(...axes.map(a => a.keys)))];
  const split = [], dead = [];
  for (const k of keys) {
    const t = LS.tokenize(k);
    if (!(t.length === 1 && t[0] === k)) { split.push(k + ' -> ' + JSON.stringify(t)); continue; }
    if (!bodyTok.has(k) && !leafTok.has(k)) dead.push(k);
  }
  console.log('distinct keys as written : ' + keys.length);
  console.log('FAIL K1 tokenize(k)==[k] : ' + split.length);
  split.forEach(s => console.log('   ' + s));
  console.log('FAIL K2 dead in corpus   : ' + dead.length + '   ' + JSON.stringify(dead));
  console.log('survive both             : ' + (keys.length - split.length - dead.length));
}

/* Block variants. FULL is the front-matter / rich-block proposal: axis prose, match_keys, and the
 * partner paths. MIN drops the prose and the keys and keeps the partner paths. ID keeps the axis
 * id and the side letter and nothing else. */
function blockFor(rows, variant) {
  let s = '\n## Contested\n';
  for (const r of rows) {
    if (variant === 'FULL') {
      s += '- **' + r.id + '** side ' + r.side + ' -- axis: ' + r.id + ' contested claim.\n';
      s += '  match_keys: ' + r.keys.join(', ') + '\n';
      s += '  paired with: ' + r.partners.join(', ') + '\n';
    } else if (variant === 'MIN') {
      s += '- **' + r.id + '** side ' + r.side + ' -- paired with ' + r.partners.join(', ') + '\n';
    } else {
      s += '- ' + r.id + ' ' + r.side + '\n';
    }
  }
  return s;
}

function cmdBlocks(corpus) {
  const axes = loadAxes(), idx = leafIndex(corpus);
  const files = LS.listCorpusFiles(corpus);
  const mem = new Map();
  for (const a of axes) {
    const present = a.members.filter(m => idx.has(m)).map(m => idx.get(m));
    present.forEach((f, i) => {
      if (!mem.has(f)) mem.set(f, []);
      mem.get(f).push({ id: a.id, side: String.fromCharCode(65 + i), keys: a.keys,
                        partners: present.filter((_, j) => j !== i) });
    });
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'regprobe-'));
  const dirs = {};
  for (const v of ['BASE', 'FULL', 'MIN', 'ID']) {
    const d = path.join(tmp, v); dirs[v] = d;
    for (const f of files) {
      const o = path.join(d, f);
      fs.mkdirSync(path.dirname(o), { recursive: true });
      let t = fs.readFileSync(path.join(corpus, f), 'utf8');
      if (v !== 'BASE' && mem.has(f)) t += blockFor(mem.get(f), v);
      fs.writeFileSync(o, t);
    }
  }
  console.log('probe dir: ' + tmp);
  console.log('files ' + files.length + '   files carrying a block ' + mem.size);

  const live = [...new Set([].concat(...axes.map(a => a.keys)))]
    .filter(k => { const t = LS.tokenize(k); return t.length === 1 && t[0] === k; });
  for (const v of ['FULL', 'MIN', 'ID']) {
    let loss = 0;
    for (const k of live) {
      const a = LS.idf(dirs.BASE, k), b = LS.idf(dirs[v], k);
      loss += (a - b) / a;
    }
    console.log(v.padEnd(6) + 'mean relative idf loss over ' + live.length + ' live keys: ' +
      (100 * loss / live.length).toFixed(2) + '%');
  }

  const res = { FULL: [0, 0, 0], MIN: [0, 0, 0], ID: [0, 0, 0] };
  for (const a of axes) {
    const q = a.keys.join(' ');
    const base = LS.searchLiterature(dirs.BASE, q, { limit: 10 });
    const bm = new Map(base.candidates.map(c => [c.filename, c]));
    for (const v of ['FULL', 'MIN', 'ID']) {
      const r = LS.searchLiterature(dirs[v], q, { limit: 10 });
      for (const c of r.candidates) {
        const b = bm.get(c.filename); if (!b) continue;
        if (c.confirmed && !b.confirmed) res[v][0]++;
        if (!c.confirmed && b.confirmed) res[v][1]++;
      }
      if ((base.best ? base.best.filename : '') !== (r.best ? r.best.filename : '')) res[v][2]++;
    }
  }
  for (const v of ['FULL', 'MIN', 'ID'])
    console.log(v.padEnd(6) + 'confirm gained ' + res[v][0] + '   confirm lost ' + res[v][1] +
      '   best changed ' + res[v][2] + ' of ' + axes.length);

  /* The heading itself leaks: "contested" is an English word a question can carry. */
  const q = 'what is contested about the ice grade at cabeus';
  for (const v of ['BASE', 'ID']) {
    const r = LS.searchLiterature(dirs[v], q, { limit: 5 });
    console.log('heading probe ' + v.padEnd(5) + ' best = ' + (r.best ? r.best.filename : '(none)') +
      '   idf("contested") = ' + LS.idf(dirs[v], 'contested').toFixed(4));
  }
}

const mode = process.argv[2] || '--blocks';
const corpus = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_CORPUS;
if (mode === '--resolve') cmdResolve(corpus);
else if (mode === '--keys') cmdKeys(corpus);
else if (mode === '--blocks') cmdBlocks(corpus);
else { console.error('usage: probe_register_encoding.js --resolve|--keys|--blocks [corpusRoot]'); process.exitCode = 2; }
