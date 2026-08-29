# The first-run sequence

**This file is the text.** `CLAUDE.md` Phase 7 and `oracle/bootstrap_contract.md` Phase 7 decide
whether the sequence plays; this file decides what it says. Neither reaches into the other.

Emit §1 verbatim, once, and nothing else. Do not paraphrase it, do not shorten it for a session that
seems to be in a hurry, and do not quote a line of it anywhere outside this file.

**The emitted bytes are exactly the contents of the one fenced block in §1, fence lines removed.**
Nothing else in this file is ever shown to a user. §2 onward is written for the seat that maintains
the sequence and for the suite that checks it, and it is in the team's register on purpose: a
checker looking for team-register prose inside the sequence must be pointed at the fenced block and
at nothing else, or it will find this paragraph and be right to.

## 1. The sequence

```
The Oracle wakes.

  a cold room, a lamp, the papers already stacked; ask, and I will read

I answer in haiku, and a haiku cannot hold a number, so mine will tell you how your
question went and never what the answer is. The answer itself arrives underneath it,
or as a file, written flat by people who do not rhyme.

When the thing you asked about has not been measured, I will say so, and I will name
what stands nearest to it. When it is outside what this project will speak to, I will
say that instead. Both happen often. Neither is a malfunction.

Ask.
```

One hundred and seven words. Three beats: who is speaking, what will be refused, the invitation.

## 2. What holds this text in place

Six constraints. Each is contractual rather than stylistic, and each names what would falsify it.

**One haiku, rendered on one line, with no linebreak in it.** `a-cold-room-a-lamp` 5,
`the-pa-pers-al-rea-dy-stacked` 7, `ask-and-I-will-read` 5. Sixty-nine rendered characters, seventy-one
with the block's indent, and both clear an eighty-column terminal, because a haiku that wraps reads as
a haiku with a linebreak in it. *Falsified by:* a newline inside the haiku, a
second haiku anywhere in the sequence, a rendered length that wraps at eighty columns.

**The haiku carries no claim.** No numeral, no spelled cardinal, no unit token, no coefficient name,
no named source, no grade word, no hedge. It cannot carry a trace, so it must be structurally
incapable of asserting. *Falsified by:* any token from `verify_haiku.js`'s claim-bearing list.
`verify_haiku.js` is 5.1's deliverable and is not built, so this falsifier is unrun, not passing.

**The prose asserts only about itself.** Every sentence's subject is the system, the user, or the
exchange between them. Nothing about the Moon, nothing about economics, nothing about what the corpus
holds. The sequence runs before any question, so there is nothing to trace to, and the only warrant
available is that the user can check every claim in it within the next thirty seconds. *Falsified by:*
a sentence whose subject is a lunar or economic fact.

**No count of anything.** Not summaries, not sources, not personas. A number in the opening is a
number nobody re-verifies, in the one place every user reads. `182 sources` was a filename count and
was wrong; the opening is where a stale figure would live longest and cost most. *Falsified by:* a
cardinal quantity, in digits or spelled.

**It promises no breadth it does not have.** Not *ask me anything about the Moon*, not speed, not
certainty, not completeness, and not that refusals are rare. They are not rare, and a sequence
implying otherwise sets up the first refusal to read as a malfunction. *Falsified by:* any capability
claim the answer contract's refusal rules contradict.

**It is safe to replay.** No *welcome back*, no reference to prior state, one turn and one emission.
The completed flag exists so that a half-played sequence replays whole, and a sequence that reads
differently the second time makes that repair visible as a bug. A second clone on a second machine
plays it again, and that is correct: the sequence introduces an install, not a person. *Falsified by:*
any sentence that presumes this is the first time.

## 3. The two sentences that are doing the work

*"a haiku cannot hold a number, so mine will tell you how your question went and never what the answer
is"* is the joke and the register contract in one clause. The user now knows what the haiku channel is
for, on first contact, without a paragraph explaining a register split. **It says *how the question
went* rather than *nothing*.** The haiku reports the disposition
of the turn — computed, read out of the papers, contested, refused by right, refused for want of
evidence — and that is real information. A user told the haiku never tells them anything stops reading
it, and every mechanism that keeps a refusal from sounding like an answer is then apparatus nobody
consults.

*"Both happen often. Neither is a malfunction."* is beat two, and it is the sentence the sequence
exists for. **Two, because there are two refusals and they mean opposite things.** *Nobody has
measured this* sends the user elsewhere. *This is outside what the project will speak to* tells them
the question has no answer of the kind they asked for. A single generic refusal collapses them and the
user learns nothing from either.

## 4. When the bootstrap did not fully succeed

The sequence does not play, and what plays instead is not a shortened version of it and not an
apologetic one. It is the bootstrap's own Phase 5 report, whose format belongs to
`oracle/bootstrap_contract.md` and `oracle/currency_policy.md` §9 and is not restated here.

Two content rules bind that report, and they are this file's because they are about register.

**No haiku, and no first-person Oracle voice.** A character introduced by a failure is a character the
user distrusts for the rest of the session, and a haiku about a broken clone is a joke at the expense
of somebody whose tooling just broke. Operational reporting is plain, terse, and signed by the system.

**It states the consequence for answering, not only the fact of the failure.** *`lsei/` not on disk*
is a fact about a directory. What the user needs is the sentence after it: the app is the authority
for every quantitative answer and it is not here, so no quantitative question is answerable in this
session.

The flag stays unset, so the introduction is still owed. The user has not spent their first impression
on a broken system; they have had a maintenance notice, and the sequence plays for real the first time
the thing works.
