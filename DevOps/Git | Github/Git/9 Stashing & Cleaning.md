# Git 09 — Stashing & Cleaning

> Two small but frequently-used tools: temporarily shelving unfinished work, and wiping out untracked clutter.

## `git stash` — set aside, without committing

You're midway through editing, and you suddenly need a clean working directory (to switch branches, pull, or just check something on `main`). You don't want to commit half-finished work, but you also don't want to lose it:

```bash
git stash                       # shelve all tracked changes, working dir goes back to clean
git stash push -m "wip: navbar" # same, but with a descriptive name
git stash -u                    # also include untracked (new) files
```

Bring it back later:

```bash
git stash list                  # see everything you've shelved
git stash pop                   # re-apply the most recent stash AND remove it from the list
git stash apply                 # re-apply, but KEEP it in the list too (for applying to multiple branches)
git stash show -p stash@{0}     # preview the diff inside a stash without applying it
git stash drop stash@{0}        # delete a stash you no longer need
```

A stash is really just a couple of hidden commits Git makes for you -- which is why it can hold *any* amount of change, and why it survives a branch switch.

## `git clean` — deleting untracked files

`git reset --hard` (chapter 4) only affects files Git already tracks. Leftover **untracked** files -- build artifacts, scratch files, an experiment you abandoned -- need a different tool:

```bash
git clean -n              # DRY RUN -- lists what would be deleted, deletes nothing
git clean -f               # actually delete untracked files
git clean -fd               # also delete untracked DIRECTORIES
git clean -fX               # only delete untracked files that are ALSO in .gitignore (leave everything else)
```

Always run `-n` first. There's no undo for `git clean -f` -- deleted files did not go through Git at any point, so there's no commit, stash, or reflog to recover them from.

## Try it yourself

In `practice-sandbox/`:

```bash
echo "half-finished idea" >> starter-files/app.js
git stash push -m "wip: half-finished idea"
git status                          # clean again
git stash list

touch scratch-notes.txt             # an untracked file
git clean -n                        # preview -- should list scratch-notes.txt
git clean -f                        # actually remove it

git stash pop                       # bring the app.js change back
git status                          # confirm it's back as an unstaged change
```

## Recap

- `git stash` shelves in-progress changes without committing them; `pop` restores + removes, `apply` restores + keeps.
- `git clean -n` previews, `-f` deletes untracked files, `-fd` also deletes untracked directories -- there is no undo, always dry-run first.

---
[← Previous: Working with Remotes](../08-working-with-remotes/README.md) | [Next → Tags & Releases](../10-tags-and-releases/README.md)
