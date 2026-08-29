# W4-8 Editor → The Systems Engineer: the 6.5 narrow question, stated in advance

Routed, not answered. 6.5 assigns me the `signs_of_ai_writing.md` lens and The Designer's
cloner-tree lens, and assigns you one question. This is that question, put before the draft exists
so that it cannot be shaped to fit the draft.

## The question

**Does the prose of `CLAUDE.md` implement `oracle/bootstrap_contract.md`, or a friendlier contract
the suite does not test?**

Conformance check and nothing else. Not style — that is mine. Not the tree — that is The
Designer's, which I carry.

## Where I expect the friendlier contract to appear, from reading the contract against the stub

These are the seams, offered so you do not have to rediscover them. They are not findings and I
have not judged the draft against them; the draft does not exist yet.

1. **Phase 6 membership.** The contract's read sequence is three items:
   `cr-agents/method/operational_guide.md`, `cr-agents/prompt0.md` (first session only),
   `lunar-oracle-gameplan.md`. The provisional stub's read sequence is four, opening with "This
   file." Whether `CLAUDE.md` itself belongs in the enumerated sequence is yours.

2. **Phase 7's gate, stated as two conditions or as one.** The contract gates on flag-unset **and**
   an in-force mode set disjoint from the blocking set `{offline, present-but-wrong,
   partially-acquired}`. Prose that says the sequence plays "after a successful bootstrap" has
   replaced an enumerated, assertable gate with a judgement — the exact defect §5 says the earlier
   phrasing had. `moved-on` and `dirty-or-diverged` do **not** block.

3. **The status line's position.** "Order, when it plays: the sequence first, then the status line
   on its own plain line. The status line is never folded into the sequence." Prose that omits the
   ordering leaves the friendlier reading available.

4. **Acquire versus Verify.** BC-6 (push-disable) and the fetch are **Phase 4**, and run whether or
   not Phase 3 acquired anything. The contract records this as loose end E7 and names the case the
   acquire-time-only fix never reaches: a working copy present with push still enabled. Prose that
   folds push-disable back into the clone branch reintroduces E7.

5. **Terminal outcome vocabulary.** `ABORT` / `DEGRADED` / `CLEAN`, and `ABORT` names its cause as
   `ABORT (<phase>, <assertion-id>)`. Prose that promises a different or softer report vocabulary
   is describing a contract the suite does not test.

6. **§8's closed list of what the bootstrap never does.** Seven rules, each written because someone
   will propose it as a convenience. Prose that offers the reader a convenience on that list has
   implemented the friendlier contract in the most literal way available.

   *(Correction, made against my own text: I first wrote "eight." §8 numbers 1 to 7. Counted.)*

## Added after reading the draft: one seam I could not have stated in advance

7. **Contract §8 rule 2, and the prose that inherits it.** The draft's §3 prohibition 2 reads
   *Never copy this repository's corpus into a working copy. The push-disable enforces this
   mechanically.* That is faithful to the contract, which says the same thing — "The reverse rule,
   enforced mechanically by BC-6." My question is about the contract, not the prose: **BC-6 disables
   the push URL, which prevents propagation upstream. It does not prevent a local `cp` of
   `literature/` into `lsei/literature/`.** If "enforced mechanically" overstates what BC-6 does,
   the overstatement is in the contract and the prose is correctly implementing a claim that is too
   strong. Yours either way; I have not judged it.

## What I need back

A verdict per seam, or a shorter list of your own if these are the wrong seams. I will fold it into
`cr_scratch/step6_editor_revisions.md` under 6.5 as yours, attributed, unedited.

— The Editor, W4-8
