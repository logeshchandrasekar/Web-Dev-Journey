# Git 05 — Branching

> Branches are what make Git feel completely different from "just backing up files." Understanding what a branch *actually is* unlocks almost everything else.

## What a branch actually is

A branch is **not** a copy of your files. It's a small, movable pointer to a single commit. That's it -- a tiny file containing a commit hash. `main` is just a branch with no special powers beyond convention.

```
A---B---C   <- main
```

When you create a new branch, you're just adding a second pointer at the current commit:

```
A---B---C   <- main
         \
          <- feature-login (points at the same commit, for now)
```

As you commit on `feature-login`, only *that* pointer moves forward:

```
A---B---C        <- main
         \
          D---E   <- feature-login
```

`main` hasn't changed at all. This is why branching in Git is instant and cheap, unlike some older version control systems where branching meant copying the whole codebase.

## `HEAD` — "you are here"

`HEAD` is a pointer to whichever branch you currently have checked out (which itself points to a commit). `git log` showing `(HEAD -> feature-login)` next to a commit means: HEAD -> feature-login branch -> that commit.

## Creating, switching, and listing branches

```bash
git branch                         # list local branches (* marks the current one)
git branch new-feature             # create a branch (doesn't switch to it)
git switch new-feature             # switch to it
git switch -c new-feature          # create AND switch, in one step (most common)
```

(`git checkout -b new-feature` is the older equivalent of `switch -c` -- you'll see both in the wild; `switch` was introduced specifically to stop `checkout` from doing "switch branches" and "restore files" at once, similar to why `restore` exists.)

```bash
git branch -d old-feature          # delete a branch (safe -- refuses if it has unmerged work)
git branch -D old-feature          # force delete, even if unmerged
git branch -m old-name new-name    # rename a branch
```

## Naming conventions

Not enforced by Git, but near-universal in teams:

```
feature/user-authentication
bugfix/pagination-off-by-one
hotfix/prod-crash-on-login
chore/upgrade-dependencies
```

## Visualizing branches

```bash
git log --oneline --graph --all --decorate
```

```
* d4e5f6 (HEAD -> feature-login) Add password hashing
* c3d4e5 Add login form
| * b2c3d4 (main) Fix typo in README
|/
* a1b2c3 Initial commit
```

Reading this: `feature-login` branched off after the initial commit, and `main` has since moved forward independently with its own commit. This is the exact situation chapter 6 (merging) picks up from.

## Try it yourself

In `practice-sandbox/`:

```bash
git switch -c experiment
echo "/* experimental style */" >> starter-files/style.css
git add -A && git commit -m "Try an experimental style"
git log --oneline --graph --all --decorate    # see the two branches diverge

git switch main
cat starter-files/style.css                    # the experimental line is GONE here -- it only exists on the other branch
git switch experiment
cat starter-files/style.css                    # back again
```

## Recap

- A branch is a cheap, movable pointer to a commit -- not a copy of your files.
- `HEAD` tracks which branch (and therefore which commit) you currently have checked out.
- `git switch -c <name>` (or the older `git checkout -b <name>`) creates and switches in one step.
- `git log --oneline --graph --all --decorate` is how you actually *see* branches diverging and reconverging.

---
[← Previous: Undoing Changes](../04-undoing-changes/README.md) | [Next → Merging & Conflicts](../06-merging-and-conflicts/README.md)
