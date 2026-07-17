# GitHub 04 — GitHub Actions (CI/CD)

> Running things automatically -- tests, linters, deployments -- whenever something happens in your repo.

## What CI/CD actually means

- **Continuous Integration (CI)** -- automatically build/test every change, so broken code gets caught by a machine within minutes, not discovered by a teammate (or a user) later.
- **Continuous Deployment/Delivery (CD)** -- automatically ship a change once it passes CI, instead of a manual deploy step.

**GitHub Actions** is GitHub's built-in automation system for both.

## Where workflows live

```
.github/workflows/<any-name>.yml
```

Any `.yml` file in that folder is a workflow. A repo can have several, each for a different purpose (tests, linting, deployment...).

## Anatomy of a workflow file

```yaml
name: Run Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest
```

Breaking that down:
- **`name`** -- shows up in the Actions tab.
- **`on`** -- the trigger(s): here, every push to `main` and every PR targeting `main`. Other common triggers: `schedule` (cron), `workflow_dispatch` (a manual "Run workflow" button), `release`.
- **`jobs`** -- one or more independent units of work (can run in parallel); each runs on a fresh virtual machine (`runs-on`).
- **`steps`** -- run in order, top to bottom, within a job.
  - **`uses`** -- run a pre-built action from the Marketplace (or another repo). `actions/checkout` is in almost every workflow -- it's what actually pulls your repo's code onto the runner.
  - **`run`** -- run a raw shell command.

## A Node.js equivalent, for comparison

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm test
```

Same shape, different setup action and package manager.

## Secrets

Never put API keys, database URLs, or tokens directly in a workflow file (it's just as public as the rest of your repo). Store them under **Settings -> Secrets and variables -> Actions**, then reference them:

```yaml
      - name: Deploy
        run: ./deploy.sh
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

## Status checks & badges

Once a workflow exists, its pass/fail result shows directly on PRs, and can be **required** before merging is even allowed (branch protection, chapter 6). A badge for your README:

```markdown
![tests](https://github.com/<user>/<repo>/actions/workflows/tests.yml/badge.svg)
```

## Try it yourself

Add a minimal workflow to your practice repo that just proves the plumbing works, no real project needed yet:

```yaml
# .github/workflows/hello.yml
name: Hello Actions
on: [push]
jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello from GitHub Actions, this ran automatically on push!"
```

Commit and push it, then check the **Actions** tab on GitHub -- you should see it run within seconds.

## Recap

- Workflows are YAML files in `.github/workflows/`, triggered by events (`on:`) like push/PR/schedule/manual.
- Jobs contain steps; steps either `uses` a prebuilt action or `run` a shell command.
- Secrets go in repo settings, never hardcoded in the YAML; referenced as `${{ secrets.NAME }}`.
- Passing/failing checks show on PRs directly and can be made mandatory via branch protection.

---
[← Previous: Issues, Projects & Collaboration](../03-issues-projects-and-collaboration/README.md) | [Next → GitHub Pages](../05-github-pages/README.md)
