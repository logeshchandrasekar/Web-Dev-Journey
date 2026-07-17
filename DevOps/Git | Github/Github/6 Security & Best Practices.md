# GitHub 06 — Security & Best Practices

> Habits that separate a repo that merely "works" from one that's safe to collaborate on and safe to leave public.

## Branch protection rules

**Settings -> Branches -> Add branch protection rule**, targeting `main` (or any branch). Common rules:
- **Require a pull request before merging** -- no one (including you) pushes directly to `main`.
- **Require status checks to pass** -- the CI workflow from chapter 4 must succeed first.
- **Require approvals** -- at least N reviewers must approve.
- **Do not allow force pushes / deletions** -- protects history on the branch everyone depends on.

For a solo project, "require PRs" might feel like overhead -- but it's also how you get the benefit of CI status checks actually blocking a broken merge, and it's good practice to have running before you're on a team where it matters more.

## Never commit secrets

API keys, database passwords, and tokens should never enter Git history at all -- not even briefly, since anyone who clones the repo (or looked at it before you deleted the line) has the full history, secret included.

```
# .gitignore
.env
*.pem
secrets.json
```

Store real secrets in environment variables locally, and in **Settings -> Secrets and variables -> Actions** for CI (chapter 4).

**If a secret already got committed:** rotate/revoke it immediately (assume it's compromised the moment it was pushed, public repo or not) -- then deal with removing it from history as a separate, secondary cleanup (`git filter-repo`, mentioned in git chapter 11), since simply deleting the line in a new commit leaves it fully recoverable in the old one.

GitHub's **secret scanning** automatically detects many common credential formats (AWS keys, common API token shapes) if they're accidentally pushed to a public repo, and alerts you.

## Dependabot

**Settings -> Code security and analysis** (or a `.github/dependabot.yml` file) enables:
- **Dependabot alerts** -- flags dependencies with known vulnerabilities.
- **Dependabot version updates** -- opens automatic PRs bumping dependencies to newer versions on a schedule.

## The "hygiene" files professional repos have

| File | Purpose |
|---|---|
| `README.md` | What the project is, how to run it -- the first (often only) thing anyone reads |
| `LICENSE` | Legal terms for reuse -- without one, default copyright law applies and technically no one else may reuse your code, even if it's public |
| `CONTRIBUTING.md` | How to propose changes, coding standards, PR expectations |
| `CODE_OF_CONDUCT.md` | Expected behavior in issues/PRs/discussions, especially for larger open-source projects |
| `.github/CODEOWNERS` | Auto-assigns reviewers by path (chapter 3) |

## Try it yourself

On your practice repo:
1. Add branch protection to `main` requiring PRs (skip "require approvals" if you're working solo).
2. Add a `LICENSE` file (GitHub can generate one for you: **Add file -> Create new file -> LICENSE**, it'll offer common templates like MIT).
3. Confirm `.env`-style files are in `.gitignore` *before* you ever create one with real values in it.

## Recap

- Branch protection turns "please open a PR" from a convention into an enforced rule, and can require CI to pass first.
- Secrets belong in environment variables / GitHub Secrets, never in committed files -- and a leaked secret must be rotated, not just deleted from a later commit.
- Dependabot automates vulnerability alerts and dependency updates.
- README, LICENSE, CONTRIBUTING, and CODEOWNERS are what a repo needs to look (and function) professionally.

---
[← Previous: GitHub Pages](../05-github-pages/README.md) | [Next → GitHub CLI & Beyond](../07-github-cli-and-beyond/README.md)
