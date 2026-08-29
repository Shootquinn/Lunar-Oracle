/* tools/address.js -- the closed address grammar over the app's own registers.
 *
 * Sub-step 3.2, and a reimplementation of lsei/oracle/lib/address.js rather than a copy. An
 * address is a tuple naming a scenario by its full canonical label, a phase, an output, and for a
 * sweep, a knob. Resolving an address never types a number: every point value is what the app's
 * own function just returned for that call. A key an address names that PRESETS, ENVELOPE, DETENTS
 * or the output namespace does not carry is a thrown error, never a blank or a zero cell.
 *
 * TWO CHANGES FROM THE PROTOTYPE, AND BOTH ARE SUB-STEP 3.2.
 *
 * 1. resolveOutput resolves against the CLOSED OUTPUT NAMESPACE that app_surface.js derives from
 *    both model() and valueModel() -- 45 keys at the ref this landed against, where the prototype
 *    reached 26 and its lexicon reached 8. An output whose source is 'value' routes the call
 *    through valueModel().
 *
 * 2. landed_cost is a legal knob FOR VALUE OUTPUTS ONLY. The prototype's resolveKnob refuses it
 *    outright, on the stated ground that it is "a DETENTS rail that model() does not accept as an
 *    input". That is true of model() and false of valueModel(), which reads inp.landed_cost as its
 *    D. The refusal was correct for the namespace the prototype could see and wrong for the one
 *    the app actually has.
 *
 * WHAT THIS FILE WILL NOT DO. It will not pick a landed cost. valueModel() has no default D, and a
 * value address with no landed cost named leaves one dimension unbound -- which is the answer
 * contract section 1 FIGURE condition in its own words, "an app address resolved with one
 * dimension unbound, so more than one call into the model". So this file throws E_LANDED_COST_
 * UNBOUND with a machine-readable code and the classifier turns it into a sweep over the app's own
 * rail. A silently defaulted D would put a number in an answer that no part of the question asked
 * for, which is the failure class this project keeps meeting.
 *
 * Every thrown error carries err.code from the closed set below, because a classifier that has to
 * read an English message to decide between FIGURE and REFUSE is parsing prose to make a routing
 * decision.
 */
'use strict';

const ERR = {
  SCENARIO: 'E_SCENARIO',
  PHASE: 'E_PHASE',
  OUTPUT: 'E_OUTPUT',
  KNOB: 'E_KNOB',
  ENVELOPE: 'E_ENVELOPE',
  LANDED_COST_UNBOUND: 'E_LANDED_COST_UNBOUND',
  SLUG: 'E_SLUG',
};

function fail(code, message) {
  const e = new Error(message);
  e.code = code;
  return e;
}

function slugify(label) {
  return String(label).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function scenarioIndex(PRESETS) {
  const bySlug = {};
  for (const key of Object.keys(PRESETS)) {
    const s = slugify(PRESETS[key].label);
    if (bySlug[s]) {
      throw fail(ERR.SCENARIO, 'tools/address: two scenarios slugify to "' + s + '" (' +
        PRESETS[bySlug[s]].label + ' and ' + PRESETS[key].label + ') -- refusing, an address ' +
        'naming "' + s + '" could never be disambiguated by name.');
    }
    bySlug[s] = key;
  }
  return bySlug;
}

function resolveScenario(surface, nameOrLabel) {
  const PRESETS = surface.PRESETS || surface;
  const key = scenarioIndex(PRESETS)[slugify(nameOrLabel)];
  if (!key) {
    throw fail(ERR.SCENARIO, 'tools/address: "' + nameOrLabel + '" does not name a scenario ' +
      'PRESETS carries. PRESETS holds: ' + Object.keys(PRESETS).map(k => PRESETS[k].label).join(', ') +
      '. Full canonical names only -- refusing rather than guessing a nearest match.');
  }
  return key;
}

function resolvePhase(surface, phase) {
  const p = String(phase);
  if (!surface.phases.includes(p)) {
    throw fail(ERR.PHASE, 'tools/address: "' + phase + '" does not name a phase ENVELOPE carries (' +
      surface.phases.join(', ') + ').');
  }
  return p;
}

/* Resolve against the derived namespace. Returns the OutputSpec, never a bare string, because
   every caller downstream needs to know which function to call and whether a landed cost is
   required, and recovering that from the key name would be a second copy of the namespace. */
function resolveOutput(surface, output) {
  const spec = surface.outputs.get(output);
  if (!spec) {
    throw fail(ERR.OUTPUT, 'tools/address: "' + output + '" does not name a key the app computes. ' +
      'The output namespace holds ' + surface.outputs.size + ' keys, derived by calling model() ' +
      'and valueModel() and reading Object.keys() off what they return.');
  }
  return spec;
}

/* A knob must be a DETENTS rail AND an input the function being called actually reads. The second
   half is per-function, which is the whole of change 2 above. */
function resolveKnob(surface, knob, outputSpec) {
  const inDetents = Object.prototype.hasOwnProperty.call(surface.DETENTS, knob);
  const reads = outputSpec && outputSpec.source === 'value' ? surface.valueInputKeys : surface.modelInputKeys;
  const fnName = outputSpec && outputSpec.source === 'value' ? 'valueModel()' : 'model()';
  if (!inDetents || !reads.has(knob)) {
    throw fail(ERR.KNOB, 'tools/address: "' + knob + '" is not a knob this Oracle can sweep for an ' +
      'output ' + fnName + ' computes. It must be a key DETENTS carries AND a key ' + fnName +
      ' reads off its argument object. DETENTS holds: ' + Object.keys(surface.DETENTS).join(', ') +
      '. ' + fnName + ' reads: ' + [...reads].join(', ') + '.');
  }
  return knob;
}

function scenarioArgs(surface, scenarioKey, phase) {
  const preset = surface.PRESETS[scenarioKey];
  const env = surface.ENVELOPE[preset.funding][phase];
  if (!env) {
    throw fail(ERR.ENVELOPE, 'tools/address: scenario "' + preset.label + '" (funding ' +
      preset.funding + ') has no ENVELOPE row for phase "' + phase + '".');
  }
  return { ice: preset.ice, phi_c: preset.phi_c, funding: preset.funding, phase,
           power: env.P, mass: env.M, fission: env.fission };
}

/* The rail a knob sweeps. DETENTS is the authority; LANDED_COST.rail is the app's own alias for
   the same array and is used only when DETENTS somehow lacks the key. */
function railFor(surface, knob) {
  if (Array.isArray(surface.DETENTS[knob])) return surface.DETENTS[knob];
  if (knob === 'landed_cost' && surface.LANDED_COST && Array.isArray(surface.LANDED_COST.rail)) {
    return surface.LANDED_COST.rail;
  }
  throw fail(ERR.KNOB, 'tools/address: DETENTS carries no rail for "' + knob + '".');
}

/* --- slugs ------------------------------------------------------------------------------------
 *
 * <fn>:<scenarioKey>|<phase>(|<key>=<value>)*|<output>
 *
 * The prototype's grammar hard-coded "model:" and allowed exactly zero or one override. A value
 * address always carries at least one override (the landed cost) and may carry a swept knob as
 * well, so the grammar takes the function name as its prefix and any number of overrides. A slug
 * whose prefix is "value:" recomputes through valueModel(); a verifier reading the slug alone
 * knows which function produced the number, which the prototype's grammar could not express.
 */
function pointSlug(fn, scenarioKey, phase, overrides, output) {
  const parts = [fn + ':' + scenarioKey, phase];
  for (const k of Object.keys(overrides || {}).sort()) parts.push(k + '=' + overrides[k]);
  parts.push(output);
  return parts.join('|');
}

function parseSlug(slug) {
  const s = String(slug);
  const colon = s.indexOf(':');
  if (colon < 0) throw fail(ERR.SLUG, 'tools/address: "' + slug + '" carries no function prefix.');
  const fn = s.slice(0, colon);
  if (fn !== 'model' && fn !== 'value') {
    throw fail(ERR.SLUG, 'tools/address: "' + slug + '" names function "' + fn +
      '", which is not one this grammar produced (model, value).');
  }
  const parts = s.slice(colon + 1).split('|');
  if (parts.length < 3) throw fail(ERR.SLUG, 'tools/address: "' + slug + '" is not a slug this grammar produced.');
  const scenarioKey = parts[0];
  const phase = parts[1];
  const output = parts[parts.length - 1];
  const overrides = {};
  for (const p of parts.slice(2, -1)) {
    const eq = p.indexOf('=');
    if (eq < 0) throw fail(ERR.SLUG, 'tools/address: "' + slug + '" carries a segment "' + p + '" that is not key=value.');
    overrides[p.slice(0, eq)] = Number(p.slice(eq + 1));
  }
  return { fn, scenarioKey, phase, overrides, output };
}

/* --- the call ---------------------------------------------------------------------------------- */

/* One call into the app for one fully-bound address. Returns the point, never a formatted string. */
function callOnce(surface, spec, scenarioKey, phaseKey, overrides) {
  const args = Object.assign(scenarioArgs(surface, scenarioKey, phaseKey), overrides || {});
  if (spec.source === 'value') {
    if (args.landed_cost == null) {
      throw fail(ERR.LANDED_COST_UNBOUND, 'tools/address: output "' + spec.key + '" is computed by ' +
        'valueModel(), which reads a landed cost D off its argument object, and this address names ' +
        'none. This file will not pick one. The address has one unbound dimension and the app\'s ' +
        'own DETENTS.landed_cost rail is what it sweeps over.');
    }
    const out = surface.valueModel(args);
    return { result: out, args };
  }
  const out = surface.model(args);
  return { result: out, args };
}

function pointFrom(surface, spec, scenarioKey, phaseKey, overrides, label) {
  const { result } = callOnce(surface, spec, scenarioKey, phaseKey, overrides);
  return {
    slug: pointSlug(spec.source === 'value' ? 'value' : 'model', scenarioKey, phaseKey, overrides, spec.key),
    label: label != null ? label : (surface.eraNames[phaseKey] || phaseKey),
    value: result[spec.key],
    binding: (typeof result.binding === 'string') ? result.binding : null,
    feasible: (typeof result.feasible === 'boolean') ? result.feasible : null,
  };
}

/* --- the four forms ---------------------------------------------------------------------------
 * Each returns { points, slugsAddressed, resolvedAddress }. `landed_cost` is accepted by every
 * form and is required by every value output; it is ignored by model outputs, which do not read it.
 */

function overridesFor(spec, landed_cost, extra) {
  const o = Object.assign({}, extra || {});
  if (spec.source === 'value' && landed_cost != null) o.landed_cost = landed_cost;
  return o;
}

function singlePoint(surface, { scenario, phase, output, knob, knobValue, landed_cost }) {
  const scenarioKey = resolveScenario(surface, scenario);
  const phaseKey = resolvePhase(surface, phase);
  const spec = resolveOutput(surface, output);
  const extra = {};
  if (knob != null) { resolveKnob(surface, knob, spec); extra[knob] = knobValue; }
  const ov = overridesFor(spec, landed_cost, extra);
  const point = pointFrom(surface, spec, scenarioKey, phaseKey, ov);
  return {
    points: [point],
    slugsAddressed: ['scenario:' + scenarioKey, 'phase:' + phaseKey, 'output:' + spec.key]
      .concat(knob != null ? ['knob:' + knob] : []),
    resolvedAddress: { form: 'scalar', fn: spec.source, scenario: surface.PRESETS[scenarioKey].label,
      phase: phaseKey, output: spec.key, knob: knob != null ? knob : undefined,
      landed_cost: ov.landed_cost },
  };
}

function knobSweep(surface, { scenario, phase, output, knob, landed_cost }) {
  const scenarioKey = resolveScenario(surface, scenario);
  const phaseKey = resolvePhase(surface, phase);
  const spec = resolveOutput(surface, output);
  resolveKnob(surface, knob, spec);
  const rail = railFor(surface, knob);
  const points = rail.map((v) => {
    const extra = {}; extra[knob] = v;
    const ov = overridesFor(spec, landed_cost, extra);
    return pointFrom(surface, spec, scenarioKey, phaseKey, ov, String(v));
  });
  return {
    points,
    slugsAddressed: ['scenario:' + scenarioKey, 'phase:' + phaseKey, 'knob:' + knob, 'output:' + spec.key],
    resolvedAddress: { form: 'knob-sweep', fn: spec.source, scenario: surface.PRESETS[scenarioKey].label,
      phase: phaseKey, knob, output: spec.key, landed_cost },
  };
}

function eraSeries(surface, { scenario, output, landed_cost }) {
  const scenarioKey = resolveScenario(surface, scenario);
  const spec = resolveOutput(surface, output);
  const points = surface.phases.map((phase) =>
    pointFrom(surface, spec, scenarioKey, phase, overridesFor(spec, landed_cost),
      surface.eraNames[phase] || phase));
  return {
    points,
    slugsAddressed: ['scenario:' + scenarioKey, 'output:' + spec.key],
    resolvedAddress: { form: 'era-series', fn: spec.source, scenario: surface.PRESETS[scenarioKey].label,
      output: spec.key, landed_cost },
  };
}

function scenarioComparison(surface, { phase, output, landed_cost }) {
  const phaseKey = resolvePhase(surface, phase);
  const spec = resolveOutput(surface, output);
  const points = Object.keys(surface.PRESETS).map((scenarioKey) =>
    pointFrom(surface, spec, scenarioKey, phaseKey, overridesFor(spec, landed_cost),
      surface.PRESETS[scenarioKey].label));
  return {
    points,
    slugsAddressed: ['phase:' + phaseKey, 'output:' + spec.key],
    resolvedAddress: { form: 'scenario-comparison', fn: spec.source, phase: phaseKey,
      output: spec.key, landed_cost },
  };
}

module.exports = {
  ERR, slugify, scenarioIndex, resolveScenario, resolvePhase, resolveOutput, resolveKnob,
  scenarioArgs, railFor, pointSlug, parseSlug, callOnce,
  singlePoint, knobSweep, eraSeries, scenarioComparison,
};
