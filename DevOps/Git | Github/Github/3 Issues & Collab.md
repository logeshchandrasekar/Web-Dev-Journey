# GitHub 03 — Issues, Projects & Collaboration

> The tools GitHub gives teams for tracking work and talking about it, beyond just the code itself.

## Issues

An issue is a trackable unit of work or discussion -- a bug report, a feature request, a question. Create one from the **Issues** tab.

- **Labels** -- categorize (`bug`, `enhancement`, `documentation`, `good first issue`...). Repos can define custom labels beyond GitHub's defaults.
- **Assignees** -- who's responsible for it.
- **Milestones** -- group issues/PRs toward a shared deadline or release (e.g., "v2.0").

## Linking commits and PRs to issues

Using specific keywords in a commit message or PR description auto-closes the referenced issue on merge:

```
Fixes #42
Closes #42
Resolves #42
```

Plain `#42` (without a closing keyword) just creates a link, without auto-closing it -- useful for "related to, but doesn't fully fix."

## Issue and PR templates

Standardize what information contributors provide, so a bug report doesn't just say "it's broken":

```
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/pull_request_template.md
```

GitHub automatically detects and offers these templates when someone opens a new issue or PR on the repo.

## Projects (kanban boards)

A **Project** is a board (To Do / In Progress / Done, or any columns you define) that issues and PRs can be attached to -- a lightweight, built-in alternative to a separate tool like Trello or Jira, living right next to the code it tracks.

## Discussions

For things that aren't quite an "issue" -- Q&A, announcements, open-ended ideas -- **Discussions** is a separate, forum-like tab some repos enable, keeping the Issues tab focused strictly on trackable work.

## `CODEOWNERS`

A file (`.github/CODEOWNERS`) that automatically requests review from the right person/team whenever a PR touches specific paths:

```
# .github/CODEOWNERS
/api/          @backend-team
*.css           @loki
```

## Notifications & mentions

`@username` in any issue, PR, or comment notifies that person. Watching a repo (bell icon) controls how much you're notified about it -- "Participating" (only threads you're in) is usually the sane default once you're watching more than a couple of repos.

## Try it yourself

On your practice repo:

1. Open an **Issue**: "Add a footer to the homepage," with a label you create yourself (e.g. `enhancement`).
2. Create a branch, make the change, and reference the issue in your commit message: `git commit -m "Add footer to homepage, closes #1"`.
3. Push, open a PR, merge it, and confirm the issue auto-closed.

## Recap

- Issues track discrete units of work; labels/assignees/milestones organize them.
- `Closes #N` / `Fixes #N` in a commit or PR auto-closes the linked issue on merge.
- Templates standardize what info issues/PRs contain; Projects give you a kanban board; CODEOWNERS auto-requests the right reviewer.

---
[← Previous: The GitHub Flow & Pull Requests](../02-github-flow-and-pull-requests/README.md) | [Next → GitHub Actions (CI/CD)](../04-github-actions-ci-cd/README.md)
