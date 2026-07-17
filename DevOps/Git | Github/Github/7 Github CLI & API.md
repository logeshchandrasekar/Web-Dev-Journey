# GitHub 07 — GitHub CLI & Beyond

> Doing GitHub things without leaving the terminal, plus a map of smaller features worth knowing about.

## The `gh` CLI

Install from [cli.github.com](https://cli.github.com), then authenticate once:

```bash
gh auth login
```

From here, most things you'd otherwise click through on the website become one command:

```bash
gh repo create my-new-project --public --clone     # create a repo AND clone it, in one step
gh repo clone loki/portfolio

gh pr create --title "Add contact form" --body "Closes #12"
gh pr list
gh pr view 8 --web             # open PR #8 in the browser
gh pr checkout 8                # check out someone else's PR branch locally, to test it

gh issue create --title "Bug: footer overlaps on mobile"
gh issue list --label bug

gh workflow list                # see your Actions workflows
gh run list                      # see recent workflow runs
```

For anyone who prefers staying in the terminal, `gh` removes most of the remaining reasons to open the browser at all.

## Gists

A **Gist** is a single-purpose, shareable snippet -- its own tiny Git repo, without needing a full project set up. Useful for a quick code sample in a forum post, a config file you want to reference across machines, or sharing a script with someone without spinning up a whole repo for it.

## Wikis

**Settings -> Features -> Wikis** enables a separate, freeform documentation space attached to a repo -- its own lightweight Git repo under the hood, editable straight from the browser. Good fit for documentation that changes independently of the code itself and doesn't need PR review.

## The GitHub API (a pointer, not a full chapter)

Everything you've done by hand in this course -- creating issues, opening PRs, checking workflow runs -- is also available as a REST API (and a GraphQL API) at `api.github.com`, authenticated with a Personal Access Token. Worth reaching for once you want to *automate* GitHub itself (a bot that files issues, a dashboard aggregating PR stats, etc.) rather than just use it by hand.

## Where to go from here

You now have the full toolkit -- from `git init` through CI/CD and Pages. A few natural next steps, entirely optional:
- Contribute a small fix to a real open-source project (the fork -> branch -> PR flow from chapter 2, for real).
- Explore [GitHub Skills](https://skills.github.com) -- GitHub's own interactive courses, which drop you into real repos with real PRs to complete.
- Revisit `git/11-advanced-git` once you hit a situation that needs `bisect`, submodules, or history rewriting for real -- those tools make a lot more sense with a real problem in front of you.

## Try it yourself

```bash
gh auth login
gh repo view --web         # opens your practice repo in the browser, straight from the CLI
gh issue create --title "Try the gh CLI for a whole workflow" --body "Just practicing"
gh issue list
```

## Recap

- `gh` brings repo/PR/issue/workflow actions into the terminal -- `gh auth login` once, then `gh pr create`, `gh issue create`, `gh repo clone`, etc.
- Gists are single-file/snippet repos; Wikis are freeform docs attached to a repo, both lighter-weight than a full project.
- The GitHub API is there once you want to automate GitHub itself, not just use it by hand.

**That's the full course.** Keep `cheatsheets/` open for quick lookups, and go build something real with it.

---
[← Previous: Security & Best Practices](../06-security-and-best-practices/README.md) | [Back to course home](../../README.md)
