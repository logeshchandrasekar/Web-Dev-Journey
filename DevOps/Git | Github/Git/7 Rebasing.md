# Git 07 — Rebasing

> A second way to combine branches -- one that rewrites history to look like it happened in a straight line, instead of leaving a visible merge commit.

## Merge vs rebase, side by side

Starting position (same as chapter 6's example):

```
A---B---C---F  main
         \
          D---E  feature
```

**Merge** (chapter 6) preserves exactly what happened, including the two-parent merge commit:

```
A---B---C---F-------M  main
         \         /
          D-------E  feature
```

**Rebase** replays `feature`'s commits, one by one, as if they'd been written starting from `F` instead of `C`. The result is a straight line -- no merge commit, and `D`/`E` become brand new commits (`D'`/`E'`) with new hashes, even though the content matches:

```
A---B---C---F---D'---E'  feature (after rebase)
```

```bash
git switch feature
git rebase main
```

After rebasing, `feature` is now a straight, linear continuation of `main` -- merging it in afterward (`git switch main && git merge feature`) will be a clean fast-forward.

## Interactive rebase — rewriting your own commit history

The other major use of rebase has nothing to do with combining branches -- it's cleaning up your own messy commit history *before* sharing it:

```bash
git rebase -i HEAD~3      # interactively rewrite the last 3 commits
```

Git opens an editor with a list like:

```
pick a1b2c3 Add login form
pick c3d4e5 Fix typo
pick d4e5f6 Actually fix the typo this time

# Commands:
# p, pick = use commit as-is
# r, reword = use commit, but edit the message
# s, squash = combine with the commit above, keep both messages
# f, fixup = combine with the commit above, DISCARD this message
# d, drop = remove commit entirely
```

Changing the middle two lines to `fixup` combines those "fix the typo" noise commits into the one before them -- turning three messy commits into one clean one before anyone else ever sees them.

## Resolving conflicts during a rebase

Since rebase replays commits one at a time, a conflict pauses the *whole sequence* at whichever commit conflicts:

```bash
# ...resolve the conflict in the file...
git add <file>
git rebase --continue     # apply the fix and move to the next commit in the sequence

git rebase --skip         # or: skip this commit entirely
git rebase --abort        # or: bail out completely, back to how things were before
```

## The Golden Rule of Rebasing

> **Never rebase commits that have already been pushed to a shared branch others might have pulled.**

Rebasing creates new commits with new hashes to replace the old ones. If someone else already has the old commits, their history and yours diverge in a way that's genuinely painful to reconcile. Rebase freely on **your own local, not-yet-pushed** work; use merge (or `git revert`, chapter 4) once something is shared.

## Try it yourself

In `practice-sandbox/`, on a fresh branch:

```bash
git switch -c cleanup-demo main
echo "line one" >> starter-files/app.js
git add -A && git commit -m "wip"
echo "line two" >> starter-files/app.js
git add -A && git commit -m "wip again"
echo "line three" >> starter-files/app.js
git add -A && git commit -m "finally correct"

git rebase -i HEAD~3
```

In the editor, change the last two `pick`s to `fixup`, save, and close. Then:

```bash
git log --oneline     # confirm: one clean commit instead of three "wip"s
```

## Recap

- Rebase replays commits onto a new base, producing a straight-line history with no merge commit (but new commit hashes).
- Interactive rebase (`-i`) is also the standard tool for cleaning up your *own* commits before sharing them -- squashing, rewording, reordering, dropping.
- `--continue` / `--skip` / `--abort` are your controls mid-rebase, same shape as merge's.
- The golden rule: rebase local/unpushed work freely; never rebase what's already shared.

---
[← Previous: Merging & Conflicts](../06-merging-and-conflicts/README.md) | [Next → Working with Remotes](../08-working-with-remotes/README.md)
