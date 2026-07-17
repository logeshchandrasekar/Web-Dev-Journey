# GitHub 02 — The GitHub Flow & Pull Requests

> The actual day-to-day workflow almost every team using GitHub follows, and the mechanics of a Pull Request.

## The GitHub Flow

```
1. Create a branch off main
2. Commit your work on it
3. Push the branch to GitHub
4. Open a Pull Request
5. Discuss / review / push more commits if needed
6. Merge into main
7. Delete the branch
```

This is deliberately simpler than some older "Git Flow" models with permanent `develop`/`release` branches -- for most projects, especially solo or small-team ones, this lighter flow is exactly enough.

```bash
git switch -c feature/add-contact-form
# ...make changes, commit...
git push -u origin feature/add-contact-form
```

Then open the PR on GitHub (it'll usually even show you a banner suggesting it right after the push).

## Forking vs branching — which one applies to you

- **You have write access to the repo** (your own projects, or a team repo you're a member of) -> branch directly, as above.
- **You don't have write access** (contributing to someone else's open-source project) -> **fork** it first (your own copy under your account), branch and commit on *your* fork, then open a PR *from your fork back to the original repo*.

```bash
# after forking on the GitHub website:
git clone git@github.com:loki/their-project.git
cd their-project
git remote add upstream git@github.com:original-owner/their-project.git   # to pull their future updates
```

## Anatomy of a Pull Request

- **Base branch** -- where the changes should land (usually `main`).
- **Compare branch** -- your branch with the new commits.
- **Title & description** -- explain *what* and *why*, not just *what* (the diff already shows what).
- **Linking an issue** -- including `Closes #12` or `Fixes #12` in the description auto-closes that issue when the PR merges.
- **Draft PRs** -- open a PR marked "Draft" to get early feedback or run CI, without signaling it's ready for final review yet.

## Code review

Reviewers can leave inline comments on specific lines, general comments, or **suggested changes** (a specific replacement the author can accept with one click). A review is submitted as one of:
- **Comment** -- feedback, no verdict either way
- **Approve** -- good to merge
- **Request changes** -- blocks merging (if branch protection requires it, chapter 6) until addressed

## Merge strategies

When you click merge, GitHub offers three options (a repo can restrict which are allowed, in Settings):

| Strategy | Result |
|---|---|
| **Create a merge commit** | Same as `git merge` locally -- full history preserved, one merge commit added |
| **Squash and merge** | All of the branch's commits become **one** commit on `main` -- clean history, loses the branch's internal commit-by-commit story |
| **Rebase and merge** | Same as `git rebase` locally -- branch's commits are replayed individually onto `main`, no merge commit |

Squash-and-merge is a common default for feature branches with messy "wip" commits (chapter 7's interactive rebase problem, solved a different way); merge commits are more common when a branch's individual commit history is itself meaningful and worth preserving.

## Resolving conflicts on a PR

If `main` has moved on since your branch diverged, GitHub will flag the PR as unable to merge automatically. Fix it the same way you would locally:

```bash
git switch feature/add-contact-form
git fetch origin
git merge origin/main        # or: git rebase origin/main
# resolve conflicts, as in git chapter 6
git push
```

## Try it yourself

On the repo you pushed in chapter 1's exercise:

```bash
git switch -c docs/add-notes
echo "## My notes" >> NOTES.md
git add NOTES.md && git commit -m "docs: add a notes file"
git push -u origin docs/add-notes
```

Open a Pull Request on GitHub for this branch, write a real description, then merge it using whichever strategy you like -- and delete the branch afterward (GitHub offers a button right there).

## Recap

- The GitHub Flow: branch -> commit -> push -> PR -> review -> merge -> delete branch.
- Fork when you don't have write access; branch directly when you do.
- Merge commit / squash / rebase are three different ways a PR's commits land on the base branch -- pick based on whether the branch's internal history is worth keeping.

---
[← Previous: Getting Started with GitHub](../01-getting-started-with-github/README.md) | [Next → Issues, Projects & Collaboration](../03-issues-projects-and-collaboration/README.md)
