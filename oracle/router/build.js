#!/usr/bin/env node
/* oracle/router/build.js -- regenerate the router's generated artifacts from the app.
 *
 * Sub-step 3.10. One generated artifact today: oracle/router/excluded_nodes.json, the ten excluded
 * nodes as first-class retrieval objects with their refusal records.
 *
 *   node oracle/router/build.js            regenerate and write
 *   node oracle/router/build.js --check    regenerate in memory and DIFF against the file on disk;
 *                                          exit 1 on any difference or any build finding
 *
 * --check is why this file exists as a separate entry point. A generated artifact whose generator
 * nothing runs is a transcription with an extra step: it was true the day it was written and is
 * unfalsifiable every day after. The app is a floating working copy (oracle/currency_policy.md),
 * so it moves, and --check is the assertion that the refusal prose in the file is still the prose
 * the app says today.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadAppSurface } = require('./app_surface.js');
const { buildExcludedNodes } = require('./excluded_nodes.js');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'oracle', 'router', 'excluded_nodes.json');
const APP = path.join(ROOT, 'lsei', 'index.html');

function generate(appPath) {
  const surface = loadAppSurface(appPath || APP);
  return buildExcludedNodes(surface, {
    indexPath: path.join(ROOT, 'literature', 'INDEX.tsv'),
    registerPaths: [path.join(ROOT, 'oracle', 'REGISTER.lunar.tsv'), path.join(ROOT, 'oracle', 'REGISTER.econ.tsv')],
    questionClassesPath: path.join(ROOT, 'oracle', 'question_classes.json'),
  });
}

/* Paths are written repository-relative with forward slashes, so the artifact is identical on
   every platform. A generated file that differs by separator makes --check fail on Windows for a
   reason that has nothing to do with the app. */
function normalize(gen) {
  const rel = (p) => p == null ? p : path.relative(ROOT, p).split(path.sep).join('/');
  const out = JSON.parse(JSON.stringify(gen));
  out.app_path = rel(gen.app_path);
  out.index_path = rel(gen.index_path);
  out.question_classes_path = rel(gen.question_classes_path);
  for (const n of out.nodes) {
    if (n.refusal && n.refusal.region_searched) n.refusal.region_searched.shelf = out.index_path;
  }
  return out;
}

function serialize(gen) {
  return JSON.stringify(normalize(gen), null, 2) + '\n';
}

function main() {
  const check = process.argv.includes('--check');
  const gen = generate();
  const text = serialize(gen);

  let bad = 0;
  for (const f of gen.findings) { console.error('FINDING  ' + f); bad++; }

  const counts = gen.outcome_counts;
  console.log('excluded nodes: ' + gen.node_count +
    '  CORPUS ' + counts['EXCLUDED-THEN-CORPUS'] +
    '  THIN ' + counts['EXCLUDED-THEN-THIN'] +
    '  ADJACENT ' + counts['EXCLUDED-BUT-ADJACENT'] +
    '  @ app md5 ' + gen.app_md5);

  if (check) {
    if (!fs.existsSync(OUT)) {
      console.error('FAIL  ' + path.relative(ROOT, OUT) + ' does not exist; run without --check.');
      process.exit(1);
    }
    const onDisk = fs.readFileSync(OUT, 'utf8');
    if (onDisk !== text) {
      console.error('FAIL  ' + path.relative(ROOT, OUT) + ' differs from what the app produces now. ' +
        'The refusal prose in that file is not what the app says today. Regenerate; do not edit it.');
      process.exit(1);
    }
    console.log(bad === 0 ? 'OK    generated artifact matches the app, 0 findings.'
                          : 'FAIL  artifact matches but the build returned ' + bad + ' finding(s).');
    process.exit(bad === 0 ? 0 : 1);
  }

  fs.writeFileSync(OUT, text, 'utf8');
  console.log('wrote ' + path.relative(ROOT, OUT) + ' (' + text.length + ' bytes)');
  process.exit(bad === 0 ? 0 : 1);
}

if (require.main === module) main();
module.exports = { generate, serialize, OUT, APP };
