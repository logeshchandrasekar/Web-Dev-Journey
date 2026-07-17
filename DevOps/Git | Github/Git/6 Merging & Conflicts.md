# Git 06 — Merging & Conflicts

> Bringing two branches' histories back together -- and what to do when Git can't figure out how to do that automatically.

## Two kinds of merge

### Fast-forward merge

If the branch you're merging *in* is simply ahead of your current branch, with no new commits on your side since they diverged, Git doesn't need to combine anything -- it just moves your branch pointer forward to match:

```
Before:              After (fast-forward):
A---B---C  main       A---B---C---D---E  main, feature
         \
          D---E  feature
```

### True (3-way) merge

If *both* branches have new commits since they diverged, Git combines them with a new **merge commit** that has two parents:

```
Before:                        After:
A---B---C---F  main             A---B---C---F-------M  main
         \                                \         /
          D---E  feature                   D-------E  feature
```

```bash
git switch main
git merge feature-login
```

## Merge conflicts

A conflict happens when the *same lines* were changed differently on both branches, and Git genuinely cannot decide which version is correct. Git pauses the merge and marks the file:

```
<<<<<<< HEAD
<h1>Welcome to my site</h1>
=======
<h1>Welcome to Loki's site</h1>
>>>>>>> feature-login
```

- Everything between `<<<<<<< HEAD` and `=======` is **your current branch's** version.
- Everything between `=======` and `>>>>>>> feature-login` is the **incoming branch's** version.

### Resolving a conflict

1. Open the file, decide what the final content should be (keep one side, the other, or blend them).
2. **Delete the conflict markers themselves** (`<<<<<<<`, `=======`, `>>>>>>>`) -- a common beginner mistake is resolving the content but leaving the markers in.
3. Stage the resolved file and finish the merge:
   ```bash
   git add index.html
   git commit          # Git pre-fills a sensible merge commit message
   ```

### Backing out of a merge entirely

```bash
git merge --abort
```

Only works while conflict markers are still unresolved -- it puts you back exactly where you were before running `git merge`.

### A GUI can help

```bash
git mergetool
```

Opens whatever merge tool you've configured (VS Code works well as one) -- genuinely easier than reading raw conflict markers once files get long.

## Try it yourself

Deliberately create and resolve a conflict in `practice-sandbox/`:

```bash
git switch main
echo "<h1>Version from main</h1>" >> starter-files/index.html
git add -A && git commit -m "Edit heading on main"

git switch experiment                            # from chapter 5's exercise
echo "<h1>Version from experiment</h1>" >> starter-files/index.html
git add -A && git commit -m "Edit heading on experiment"

git switch main
git merge experiment                              # this WILL conflict
```

Open `starter-files/index.html`, resolve the conflict by hand, then:

```bash
git add starter-files/index.html
git commit
git log --oneline --graph --all --decorate       # see the merge commit with two parents
```

## Recap

- Fast-forward merges just move a pointer; true 3-way merges create a merge commit with two parents.
- Conflicts happen when both branches touch the same lines differently -- resolve by editing the file, removing the `<<<<<<<`/`=======`/`>>>>>>>` markers, then `git add` + `git commit`.
- `git merge --abort` bails out cleanly if a conflict looks worse than expected.

---
[← Previous: Branching](../05-branching/README.md) | [Next → Rebasing](../07-rebasing/README.md)
