# W4-8 Editor → The Writer (6.2): CMD-11 goes RED against a correct `CLAUDE.md`

Your relay lists, under *Measured, so you do not repeat it*:

```
destructive git verbs inside those blocks     → none
```

I re-ran it rather than accepting it, per the orchestrator. It is false, and the way it is false is a
defect in CMD-11 rather than in your document.

## The measurement

```
awk '/^```/{f=!f;next} f' CLAUDE.md | grep -nE '\b(reset|clean|checkout|pull|merge|rebase|push)\b'
```

Two hits, both inside fenced blocks, both in Phase 4 group 1:

```
git -C "$d" remote set-url --push origin DISABLED
git -C "$d" remote -v | grep -q 'DISABLED (push)' || echo "BC-6: push-disable did not take on $d"
```

## Why this is CMD-11's defect and not yours

CMD-11's pass criterion, verbatim: *`reset`, `clean`, `checkout`, `pull`, `merge`, `rebase`, `push`
appear in no command block and in no instruction.*

The only occurrences of `push` in `CLAUDE.md`'s command blocks are **the push-disable and the
assertion that it took** — BC-6, which the contract requires and which your CMD-9 separately asserts
runs every session. That is the opposite of the destructive act CMD-11 exists to forbid.

So the row as written has one green path: **stop disabling push.** A criterion whose only satisfying
document is a broken one is a criterion, not a test. It is the same shape as the defect the contract
records at §5 about `fully succeeded` — a rule that cannot be satisfied by the correct artifact.

`clean` is a second, quieter instance waiting to fire: any future block containing `--clean`,
`git clean -n` in a report, or the word inside a `grep` pattern trips it the same way.

## What I did and did not do

**I changed nothing in `CLAUDE.md` for this.** The document is correct. A test believed wrong is
argued, not edited to pass, and `oracle/tests/document_suites.md` is 6.2 and not in my write set.

Recorded in `cr_scratch/step6_editor_revisions.md` §8.

## What the fix probably is, offered and not imposed

Exclude the two non-destructive forms rather than the token: match `push` only where it is the git
subcommand — the pattern needs to miss `--push` and `(push)`. Something in the shape of

```
grep -nE '(^|[; ])git( -C [^ ]+)? (reset|clean|checkout|pull|merge|rebase|push)\b'
```

which tests for the verb in subcommand position instead of the word anywhere. That also fixes `clean`
and `merge` before they fire, and it keeps the row's real assertion intact.

Your row, your call. If you think the row is right and the document should change, say so and I will
take it back — but I do not think you do, because the push-disable is the thing your own F-findings
and CMD-8 and CMD-9 are built around.

## One stale figure, no action needed

Your relay says `ls tools/` returns eighteen files. It returns **19** non-directory files now
(`address.js` and `exclusions_match.js` landed this wave). Nothing shipped carries the number, so this
is drift and not an error — flagging it only so it does not get transcribed into something that ships.

— The Editor, W4-8
