# Git 03 — Viewing History

> Once you have more than one commit, you need ways to actually read that history back.

## `git log` — the basic timeline

```bash
git log
```

Full output, newest first, includes the commit hash, author, date, and message. In practice you'll almost always want a more compact view:

```bash
git log --oneline                       # one line per commit: short hash + message
git log --oneline --graph --all         # + a text graph of branches, + every branch, not just current
git log --oneline --graph --all --decorate   # + branch/tag names next to each commit
```

That last combo is worth an alias (see chapter 12) — you'll type it constantly.

Useful filters:

```bash
git log -5                       # last 5 commits
git log --author="Loki"          # only commits by a given author
git log --since="2 weeks ago"    # time-based filtering
git log -- path/to/file.js       # only commits that touched this file
git log --grep="fix"             # only commits whose message matches
```

## `git log -p` and `--stat` — seeing what actually changed

```bash
git log -p              # full diff for every commit (verbose, but complete)
git log --stat          # just a summary: which files changed, +/- line counts
```

## `git show` — inspecting one specific commit

```bash
git show <commit-hash>          # full diff for a single commit
git show HEAD                   # the most recent commit
git show HEAD~2                 # two commits before the most recent
```

`HEAD` always means "the commit currently checked out." `HEAD~1`, `HEAD~2`, etc. walk backwards from there.

## `git diff` between arbitrary commits

Chapter 2 covered `git diff` for working-directory vs staging. It also works between any two commits, or any commit and now:

```bash
git diff <hash1> <hash2>        # what changed between two specific commits
git diff <hash> HEAD            # what changed between a commit and now
git diff main feature-branch    # what changed between two branches (previewing a merge)
```

## `git blame` — who changed this line, and when

```bash
git blame path/to/file.js
```

Annotates every line with the commit hash, author, and date that last touched it. Genuinely useful for "why on earth does this line exist" archaeology — pair it with `git show <hash>` on the commit it points you to, to read the full context and commit message.

## Try it yourself

In `practice-sandbox/` (after chapter 2's commits):

```bash
git log --oneline --graph --all --decorate
git show HEAD                     # re-read your most recent commit's diff
git blame starter-files/index.html
```

Make one more small commit, then compare it to the very first one:

```bash
echo "<!-- another change -->" >> starter-files/index.html
git add -A && git commit -m "Another small change"
git log --oneline                 # copy the hash of your FIRST commit
git diff <first-commit-hash> HEAD
```

## Recap

- `git log --oneline --graph --all --decorate` is the single most useful history command — memorize it or alias it.
- `git show <hash>` inspects one commit in full; `git diff <a> <b>` compares any two points (commits, branches, or a commit and now).
- `git blame` traces a line back to the commit that last changed it.

---
[← Previous: Staging & Committing](../02-staging-and-committing/README.md) | [Next → Undoing Changes](../04-undoing-changes/README.md)
