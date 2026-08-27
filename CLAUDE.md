# Lunar Oracle

> **PROVISIONAL.** This file is a session-recovery stub written at seed time, 2026-08-26. It is not
> the deliverable. The real `CLAUDE.md` carries the dependency bootstrap contract and the first-run
> opening sequence, and it is written in a step the team defines during Step 0. Do not build on this
> file's shape.

Claude: you are the Orchestrator for the Collaborative Reasoning method as applied to this project.

## Read sequence (new session, or after compaction)

1. **This file.**
2. **`cr-agents/method/operational_guide.md`** (the method).
3. **`cr-agents/prompt0.md`** (first session only; skip on compaction recovery).
4. **`lunar-oracle-gameplan.md`** (what to do, and the current step).

## Working copies

Not committed. Both are gitignored. Bootstrap is two separate phases, and conflating them is a
defect this project has already made once.

**Acquire, only when missing.**

```
[ -d cr-agents ] || git clone https://github.com/Shootquinn/CR-Agents.git cr-agents
[ -d lsei ]     || git clone https://github.com/Shootquinn/lsei-lunar-scenario-explorer.git lsei
```

**Verify, every session, whether or not anything was cloned.**

```
for d in cr-agents lsei; do
  git -C "$d" remote set-url --push origin DISABLED   # idempotent; assert, do not assume
  git -C "$d" fetch --quiet origin
  echo "$d  local $(git -C "$d" rev-parse --short HEAD)  upstream $(git -C "$d" rev-parse --short @{u})"
done
```

The push URLs are disabled deliberately. These are read-only working copies, and a session that can
push to them can rewrite an upstream authority from inside a project that merely borrows it. The
assertion runs every session because a working copy that is *present with push still enabled* is
exactly the case an acquire-time-only fix never reaches.

The fetch runs every session because a local clone that has not fetched cannot tell the difference
between an upstream that has not moved and an upstream it has not looked at. Report drift; change
nothing automatically. Never `reset --hard` a working copy: it can destroy uncommitted work in the
author's own repository.

Neither is ever vendored into this repository. `lsei/index.html` is the authority on the model; a
copy of it here would be a second authority, and a second authority drifts.

## Method documents

**TDD (`cr-agents/method/tdd_method.md`):** always active. Every deliverable has its own test plan,
written before the deliverable.

**LLM-PLM (`cr-agents/supplements/llm_plm_cad.md`):** not active. No CAD or geometry work here.
