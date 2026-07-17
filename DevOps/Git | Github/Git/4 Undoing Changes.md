# Git 04 — Undoing Changes

> Git has an "undo" for almost every stage of the commit process. Picking the *right* one matters — some rewrite history, some don't.

## The undo toolbox at a glance

| I want to... | Command |
|---|---|
| Discard uncommitted edits in a file | `git restore <file>` |
| Unstage a file (keep the edits) | `git restore --staged <file>` |
| Fix the message/contents of the last commit | `git commit --amend` |
| Undo a commit that's already been pushed/shared | `git revert <commit>` |
| Move the branch pointer backward (local, unshared work) | `git reset` |

## `git restore` — discarding or unstaging (modern syntax)

```bash
git restore file.js              # discard uncommitted changes in the working directory
git restore --staged file.js     # unstage a file, but KEEP the edits in the working directory
```

(Older tutorials use `git checkout -- file.js` for the first one — `restore` was split out specifically to stop `checkout` from doing three unrelated jobs at once. Prefer `restore` going forward.)

`git restore <file>` is destructive to uncommitted work — there's no "undo the undo" for it. If you're not sure, `git stash` (chapter 9) is a safer way to set changes aside temporarily instead of discarding them outright.

## `git commit --amend` — fixing the last commit

```bash
git commit --amend -m "Corrected message"      # just fix the message
git add forgotten-file.js
git commit --amend --no-edit                    # add a forgotten file, keep the same message
```

`--amend` doesn't edit the old commit in place — it creates a *brand new* commit that replaces the old one. This is safe as long as the original commit hasn't been pushed anywhere yet. Amending a commit others have already pulled rewrites history out from under them (see the golden rule in chapter 7 — it applies here too).

## `git reset` — moving the branch pointer, with three intensities

`git reset` moves your current branch to point at a different commit. What happens to the staging area and working directory depends on which mode you use:

| Mode | HEAD (branch pointer) | Staging area | Working directory |
|---|---|---|---|
| `--soft` | moves | **unchanged** (stays as before the reset) | unchanged |
| `--mixed` (default) | moves | **reset to match new HEAD** | unchanged |
| `--hard` | moves | reset to match new HEAD | **reset to match new HEAD -- deletes uncommitted work** |

```bash
git reset --soft HEAD~1     # "undo" the last commit, keep everything staged, ready to re-commit
git reset HEAD~1            # same, but also unstage everything (mixed is the default)
git reset --hard HEAD~1     # DESTRUCTIVE: throw away the last commit AND any uncommitted changes
```

`--hard` is the one command in this whole course that can silently delete work with no confirmation prompt. Get in the habit of running `git status` before it, and remember `git reflog` (chapter 11) can often rescue you even after a bad `--hard` reset -- but don't rely on that as a plan.

## `git revert` — the safe undo for shared history

Instead of moving the branch pointer backward (which rewrites history), `revert` adds a **new commit** that undoes the changes from an earlier one. History moves forward, nothing is rewritten, so it's safe on commits that have already been pushed and possibly pulled by others.

```bash
git revert <commit-hash>
```

## Reset vs Revert: the rule that actually matters

> **Has this commit been pushed / shared with anyone else?**
> - **No** -> `git reset` is fine, it's still just your local, private history.
> - **Yes** -> use `git revert`. Rewriting shared history with `reset` (or `--amend`, or rebase) forces everyone else to reconcile their copy with yours, which ranges from "mildly annoying" to "actively breaks their repo."

## Try it yourself

In `practice-sandbox/`:

```bash
echo "oops" >> starter-files/app.js
git status                          # see it as an unstaged change
git restore starter-files/app.js    # discard it
git status                          # gone

git add -A && git commit -m "Commit to undo as a test"
git reset --soft HEAD~1             # "undo" it, but the change is still staged
git status                          # confirm it's back in the staging area
git commit -m "Re-committed with a better message"
```

## Recap

- `restore` = undo in the working directory / staging area, before a commit exists.
- `--amend` = replace the *last* commit (message and/or contents).
- `reset` (soft/mixed/hard) = move the branch pointer backward, with increasing destructiveness -- local/unshared history only.
- `revert` = the safe undo once history is shared: adds a new commit rather than rewriting.

---
[← Previous: Viewing History](../03-viewing-history/README.md) | [Next → Branching](../05-branching/README.md)
