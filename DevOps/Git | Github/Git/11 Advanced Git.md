# Git 11 — Advanced Git

> A tour of tools you won't need daily, but that are worth knowing exist so you reach for them at the right moment instead of fighting the problem manually.

## `git cherry-pick` — apply one specific commit elsewhere

Useful when a fix landed on the wrong branch, or you need just *one* commit from a branch without merging the whole thing:

```bash
git switch main
git cherry-pick a1b2c3d
```

Applies the changes from that one commit onto your current branch, as a new commit (new hash, same content).

## `git reflog` — your safety net

Git quietly keeps a log of every place `HEAD` has pointed, including commits that are no longer reachable from any branch (after a `reset --hard`, a deleted branch, an amend, etc.):

```bash
git reflog
```

```
a1b2c3d HEAD@{0}: commit: Add feature
f6e5d4c HEAD@{1}: reset: moving to HEAD~1
9d8c7b6 HEAD@{2}: commit: Oops, wrong approach
```

If you reset too far, or deleted a branch you needed, this is almost always how you get it back:

```bash
git branch recovered-work 9d8c7b6      # create a new branch pointing at the "lost" commit
```

The reflog is local-only and expires after a while (default ~90 days for reachable, ~30 for unreachable entries) -- it's a safety net, not permanent storage.

## `git bisect` — binary-searching for the commit that broke something

When you know a bug exists now, and know a specific older commit where it didn't, `bisect` finds the exact commit that introduced it in O(log n) steps instead of checking every commit one by one:

```bash
git bisect start
git bisect bad                    # current commit has the bug
git bisect good v1.0.0             # this older tag/commit was fine
# Git checks out a commit halfway between -- you test it, then tell it:
git bisect good     # or
git bisect bad
# ...repeat until Git narrows it down to the exact culprit commit
git bisect reset     # done -- return to where you started
```

## A quick map of things worth knowing *exist*

You don't need to memorize these -- just recognize the name when you hit the situation:

| Tool | What it's for |
|---|---|
| `git submodule add <url>` | Embed another Git repo inside yours at a fixed commit (e.g. a shared library) |
| `git worktree add ../hotfix hotfix-branch` | Check out a second branch into a separate folder, without stashing your current work |
| `.git/hooks/` | Scripts Git runs automatically on events like `pre-commit` or `pre-push` (e.g., auto-running a linter) |
| `git filter-repo` (external tool) | Rewrite an entire repo's history (e.g., to remove a secret that was committed) -- powerful and genuinely dangerous, always work on a fresh clone |
| `.gitattributes` | Per-path rules, e.g. forcing consistent line endings, or marking a file as binary so Git stops trying to diff it |

## Try it yourself

In `practice-sandbox/`:

```bash
git log --oneline                  # find a commit hash from a few steps back
git reflog                          # compare -- notice it shows MORE than git log does
```

Simulate a rescue:

```bash
git switch -c will-delete
echo "important idea" >> starter-files/app.js
git add -A && git commit -m "Important idea"
git switch main
git branch -D will-delete           # force-delete the branch -- the commit LOOKS gone
git reflog                          # find the "Important idea" commit hash in the log
git branch rescued <that-hash>      # bring it back
```

## Recap

- `cherry-pick` copies a single commit onto another branch.
- `reflog` records every position `HEAD` has been at, including "deleted" commits -- your main recovery tool.
- `bisect` binary-searches history to find exactly which commit introduced a bug.
- Submodules, worktrees, hooks, and `.gitattributes` exist for real problems -- look them up in depth when you actually hit one.

---
[← Previous: Tags & Releases](../10-tags-and-releases/README.md) | [Next → Config, Aliases & .gitignore](../12-config-aliases-and-gitignore/README.md)
