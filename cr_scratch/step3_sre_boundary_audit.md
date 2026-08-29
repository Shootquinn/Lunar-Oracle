# Step 3.1 — The app boundary, audited against the artifact

**Seat:** The Space Resources Engineer. **Chain:** W4-1, sub-step 3.1.
**Date:** 2026-08-28.

**What this is.** Sub-step 3.1 asks whether the boundary table in
`cr_scratch/step0_space_resources_engineer_question_surface.md` §2 — which was derived from
`lsei/lunar-scenario-explorer-map.md`, which is derived from the app — survives contact with the
app. It becomes a routing contract at 3.3, so it has to match the artifact rather than the map.
**Where they disagree, the artifact wins and this file says so.**

## 0. What was read, and how it was measured

`lsei/index.html`, data island only: `CONFIG` (line 1070), `VALUE` (1166), `VALUE_TRACE` (1239),
`LANDED_COST` (1267), `PRESETS` (6365), `ENVELOPE` (6643), `DETENTS` (6657), `model()` (6672),
`valueModel()` (7828). Not the whole 894 KB file.

Every count below was produced by evaluating the app's own islands through the app's own loader,
`lsei/oracle/lib/app_model.js`, rather than by reading a table:

```
node -e "const {loadModelAPI}=require('./lsei/oracle/lib/app_model.js'); ..."
```

**Read digest.** `lsei/index.html` md5 `16caa330ebae773684285c301a8e0a98`, 894,127 bytes,
data-island pin `e2989bf6` (FNV-1a over `{CONFIG, CLAIMS, VALUE, LANDED_COST}`, recomputed here
with the app's own `_pinHash` algorithm). Every figure in this file is at that digest.

---

## 1. The disagreements, artifact against map

Both values are stated. The artifact value is the one that ships into `question_classes.json`.

| item | `lunar-scenario-explorer-map.md` says | the artifact is | verdict |
|---|---|---|---|
| Artifact md5 | `a1acb7c4701b0989be2d739a7790cc79` | `16caa330ebae773684285c301a8e0a98` | **map stale** |
| Artifact bytes | 895,544 | 894,127 | **map stale** |
| Data-island pin | `ca689ef3` | `e2989bf6` | **map stale** |
| `REFERENCES` members | 63 | **60** | **map stale.** Three reference entries left the island since the map was generated. The map's References total, its "References at least one section cites" (57) and "References no section cites" (6) rows are all computed off 63 and none can be trusted. |
| Coefficient rows | 24 | **20 addressable symbols** (13 `CONFIG` + 6 `VALUE` + the `landed_cost` rail) | **map internally inconsistent.** The map's own "live coefficient values" table prints 20 rows. The 24 comes from its island table counting `LANDED_COST`'s five object members (`rail`, `eraDefault`, `claims`, `status`, `note`) as five rows. Both readings are defensible; they are not the same number, and a routing contract cannot carry both. **`question_classes.json` carries 20 symbols and names them.** |

**And the map cannot be regenerated from this clone.** The map's own Provenance table names its
generator as `tools/build_map.js`. `find lsei -name 'build_map*'` returns nothing, and `lsei/` has
no `tools/` directory at all. So the map is a stale derived artifact whose builder is absent, which
is why nothing has caught the four drifted numbers above. This is the concrete case for the
surface's §9 A3 note: **the boundary must be derived at build time from `index.html`, never typed
from the map.** `oracle/question_classes.json` carries the derived values and names the command
that produced them.

Everything else in the map's Totals that a router touches reproduces exactly: `SLUGS` 86,
`CLAIMS` 20, `SECTIONS` 66, `LEDGER` 50, `LEDGER_JOIN` 66, `COUNTER_JOIN` 66, `SECTION_REFS` 50,
`HANDLES` 63, `HANDLES_ADJUDICATED` 3, `HANDLES_UNRESOLVED` 1, `EXCLUSIONS` 10, `PRESETS` 3,
`BLURB_PENDING` 12, `BLURB` 5, `DERIVATION` 4, `FFIS_LANDMARKS` 4, `VALUE_TRACE` 7.

**A drift the artifact carries against itself, and it matters more than any of the above.**
`model()`'s own body comments state *"transDistKm defaults to 0, so transAdd is 0 at every default
call"* and *"phi_c0 defaults to 0, so massEff equals mass at every default call."* The code
immediately above them reads `const transDistKm = (a.transDistKm != null) ? a.transDistKm : 3;`
and `const phi_c0 = (a.phi_c0 != null) ? ... : 0.10;`. **The live defaults are 3 km and 0.10, not
0 and 0.** The comments are Step 33 text the Step 35 flip did not update, and the pin comment
several thousand lines away records the flip correctly. An Oracle answer that traced a value to
the app's own prose here would report a defaults regime the app abandoned. **The trace goes to the
executed line, never to the comment beside it.**

---

## 2. The reachable outputs — confirmed and corrected

`model()` returns **26 keys**, at this digest:

```
ice power mass fission phi_c | eEE rho Wpower Wthr cap mPwr mining Rcap
binding regime feasible | water construction constructionPotential Cfull regolith
envPowerFrac envMassFrac | transDistKm phi_c0 massEff
```

**The surface's count of 26 is CONFIRMED.** Its list of what the `OUTPUT_LEXICON` fails to name is
**incomplete**. The lexicon names eight — `water`, `binding`, `ice`, `constructionPotential`,
`construction`, `feasible`, `phi_c`, `regolith` — and all eight are real return keys. That leaves
**eighteen unnamed**, not the thirteen the surface listed: it omitted `power`, `mass`, `fission`,
`transDistKm` and `phi_c0`.

**The mechanism of the failure, stated exactly, because 3.3 encodes it.** `resolveOutput()` probes
`model()` once and tests `output in probe`. Every one of the 26 keys therefore *resolves*. The
lexicon is the only thing standing between a question and an address, and it is a hand-written
regex table. So the failure is not that the eighteen are unreachable in principle — they are
unreachable because no phrase maps to them, and a question that asks for one gets a **literature
search** rather than a refusal. That is the inherited rule (*a question the app can answer is
answered from the app*) being violated by the mechanism built to enforce it, silently, in the
direction nobody notices, because the answer comes back cited and plausible.

### The sweepable knobs, which are fewer than the map implies

`resolveKnob()` requires membership in `DETENTS` **and** in the keys `model()` reads off its
argument object. Measured:

- `DETENTS` keys: `ice, power, mass, phi_c, landed_cost` (5)
- `model()` input keys (derived from its own source text): `ice, power, mass, fission, funding, phase, phi_c, mix, fFisOvr, fSolOvr, transDistKm, phi_c0` (12)
- **Intersection, and therefore the complete sweepable set: `ice, power, mass, phi_c` (4).**

`landed_cost` fails by name and `address.js` says so in its own error text. **A new finding the
surface did not have:** the `KNOB_LEXICON` carries seven entries and **three of them can never
resolve** — `fFis` and `fSol` are not `DETENTS` rails, and `landed_cost` is not a model input.
Three of seven sweep phrases the router advertises are dead on arrival.

### The economics half, re-measured

The surface said `app_model.js` "extracts `{model, CONFIG, DETENTS, ENVELOPE, PRESETS}` and nothing
else." **Refuted.** It now returns eighteen fields, including `EXCLUSIONS`, `SECTION_REFS`,
`REFERENCES`, `LEDGER`, `SECTIONS`, `SLUGS` and `DERIVATION` with its three band selectors.

The substantive claim underneath it **holds unchanged**: `valueModel` appears nowhere in
`app_model.js` or `address.js`. `valueModel()` returns **27 keys** — `D, L, op_prop, op_const,
cap, Cfull, mass, water_tpy, construction_tpy, binding, feasible, r_prop, r_const, P_prop, P_const,
margin_prop, margin_const, value_prop, value_const, Dstar_prop, ranking, massBinds, annualFrac,
decayBasis, transDistKm, phi_c0, massEff` — and **not one of them is addressable.** Every question
the app's economic half computes routes to the corpus today.

One correction to the surface's phrasing while I am here: it called these "the seven value-trace
keys." `VALUE_TRACE`'s seven keys are claim-slug mappings (`plant_mass_attribution`, `L`,
`op_prop`, `op_const`, `landed_cost_rail`, `mass_payback_ranking`, `breakeven_calibration`), not
outputs. The two sets are different objects and the surface conflated them.

---

## 3. The coefficient rows and their stated units — verbatim from the artifact

**`CONFIG`, 13 rows.**

| symbol | value | unit (verbatim) | status (verbatim) |
|---|---|---|---|
| `kP` | 0.142 | `t·yr⁻¹·kWe⁻¹·wt%⁻¹` | `SOURCED (design target, ahead of demonstration)` |
| `E1` | 37000 | `kWh / t H₂O @ 1 wt%` | `SOURCED (derived)` |
| `H` | 8766 | `h / yr` | `CONSTANT` |
| `duty` | 0.6 | `fraction` | `ASSUMPTION` |
| `captureEff` | 1 | `fraction` | `ASSUMPTION (optimistic bound, no primary reports 100 percent)` |
| `fFis` | 0.16693 | `t / kWe` | `SOURCED (fitted, D03 ACCEPT)` |
| `fSol` | 0.05 | `t / kWe` | `ASSUMPTION (payload-allocation basis)` |
| `kExc` | 4 | `t regolith·yr⁻¹ / t plant` | `ASSUMPTION (calibrated-to-fit)` |
| `eSinter` | 3 | `MJ / kg product (= 833 kWh/t)` | `ASSUMPTION` |
| `ySinter` | 0.85 | `t product / t feed` | `ASSUMPTION` |
| `phiCRef` | 0.75 | `fraction` | `CONTROL (display ref)` |
| `transmission` | 10 | `kg/kWe/km` | `SOURCED` |
| `phiC0` | 0.1 | `fraction` | `CONTROL (design ruling, not a literature figure)` |

**`VALUE`, 6 rows.**

| symbol | value | unit | band | status (verbatim) |
|---|---|---|---|---|
| `L` | 10 | `yr` | 7–15 | `DESIGN` |
| `op_prop` | 5000 | `$/kg` | 2000–35300 | `PROJECTED, UNVERIFIED-pending` |
| `op_const` | 0 | `$/kg` | 0–50 | `ASSUMPTION (energy, wall-plug), PROJECTED (ops slice); negligible` |
| `f_op` | 0.15 | `fraction` | 0.06–1 | `PROJECTED, ASSUMPTION` |
| `decayRate` | 0.15 | `1/yr` | — | `SOURCED` |
| `decayLife` | 11 | `yr` | — | `SOURCED` |

**`LANDED_COST`**, one rail of 11 rungs, $1,000 → $1,000,000/kg, era defaults
`{2030: 100000, 2040: 35000, 2055: 2000}`, status `2030 contracted-but-unarchived forward price,
UNVERIFIED-pending on the ispace-SpaceX and CLPS primaries; 2040 PROJECTED; 2055
PROJECTED/ASSUMPTION`.

**Every unit and status string above is byte-identical to the map's coefficient table.** On the
values themselves the map is correct and current; only its digests, its reference count and its
row count have drifted.

### The six ungoverned rows, named

The map's Totals row "Coefficient rows carrying no governing section: 6" reproduces exactly, and
the artifact lets us name them. Six `CONFIG` rows carry no `[[slug]]` link to a governing section
in their `source` string:

**`E1`, `H`, `duty`, `kExc`, `ySinter`, `phiCRef`.**

Two of those six — `duty` and `kExc` — are load-bearing assumptions that set the entire
mass-bound regime, and the surface's §2 restatement of Open Question 5 rests on the app having
declared its own gaps. It has: this is the list.

`f_op` is a further quiet case. All six `VALUE` rows carry a `claims` list, `f_op`'s naming
`propellant-operating-floor` — but `f_op` **appears nowhere in `model()` or `valueModel()`**. It is
a declared coefficient the live arithmetic does not read. A router that treats "is it in `VALUE`"
as "is it on a computation path" will get this one wrong.

---

## 4. The boundary table, re-derived from the artifact

The surface's §2 verdict — **three of ten classes reach the app, seven do not** — **stands.** What
changes is the reason for two of the rows, and the reason is the part a router encodes.

| class | surface said | artifact says | change |
|---|---|---|---|
| L1 Scenario output | Yes, wholly | **Yes, for 8 of 26 outputs.** The other 18 have no lexicon phrase and fall through to a corpus search rather than refusing. | **narrowed** |
| L2 Binding regime | Label yes, prose partly | Confirmed. `binding`, `regime`, `feasible` all resolve; prose is `DERIVATION.notes`, 17 note keys, resolution-only. | unchanged |
| L3 Sensitivity and sweep | Yes, within the rails | **Yes, on 4 knobs.** `landed_cost` refuses by name; `fFis` and `fSol` are advertised by `KNOB_LEXICON` and cannot resolve. | **narrowed** |
| L4 Coefficient provenance | No | Confirmed, and the six ungoverned rows are now named. | sharpened |
| L5 Resource state | No; `ice` is an input | Confirmed **and worse than stated.** `resolveOutput('ice')` **succeeds**, because `model()` echoes `ice` back in its return object. The address builds, the recompute passes, and the number returned is the number the caller supplied. This is the one place in the app where an `APP` verdict can be produced for a question the app did not answer. | **sharpened, and it is the finding of this audit** |
| L6 Delivery cost | No; `landed_cost` is an input rail | Confirmed and stronger: `landed_cost` is not merely an input, it is not a `model()` input at all, so neither a sweep nor a scalar address builds. The rail exists and is wholly unreachable. | sharpened |
| L7 Process routes and TRL | No, and not partly | Confirmed. | unchanged |
| L8 Site, environment, operations | No | Confirmed. | unchanged |
| L9 Demand, market, law | No, and the app says so | Confirmed, 3 of 10 exclusions. | unchanged |
| L10 Cross-domain transfer | No | Confirmed. | unchanged |

### The L5 trap, because it is the one that ships as a guard

Seven of `model()`'s 26 return keys are echoes of its own inputs: `ice`, `power`, `mass`,
`fission`, `phi_c`, `transDistKm`, `phi_c0`. Each resolves through `resolveOutput()`. Each will
recompute-verify, because recomputing an echo reproduces the echo. **A question about how much ice
is in the regolith at a lunar pole can therefore return `APP`, cite a recompute-grade trace, and
report a control setting as a measurement.** The guard is one line and it is encoded in
`question_classes.json` at L5: *where a resolved output key is also a model input key, the router
must not issue `APP`.*

---

## 5. Close-condition statement

The audit states every disagreement between artifact and map with both values: six rows in §1, plus
the artifact's internal comment drift, plus the four surface premises refuted or sharpened in §2
and §4. Nothing was carried from the map that the artifact did not reproduce.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

## Not mine

- **The map's own staleness, and its missing generator.** `lsei/` is read-only. The map names `tools/build_map.js` as its builder and that file is not in this working copy, so the map cannot be regenerated here even in principle. Both are upstream's. **Relayed as drift, changed nothing** — per CLAUDE.md, report drift, change nothing automatically.
- **`OUTPUT_LEXICON` and `KNOB_LEXICON` extension** (SR-1b(a)), and **`valueModel()` extraction** (SR-1b(b)). The Software Engineer's, under `oracle/`, never by editing `lsei/`. This file names the eighteen unnamed keys, the three dead knob phrases and the 27 valueModel keys so that work needs no second read of the artifact.
- **Setting `K`, the axis firing threshold.** Sub-step 3.6.
- **The four standing suite failures.** Argued in `af7abec`; not mine to silence.
