# Git 08 — Working with Remotes

> Everything so far has been 100% local. This is where a repository starts talking to a copy of itself somewhere else -- usually on GitHub.

## What a "remote" is

A remote is just a nickname for another repository's URL. When you clone a repo, Git automatically creates a remote called `origin` pointing at wherever you cloned it from:

```bash
git clone https://github.com/loki/portfolio.git
cd portfolio
git remote -v
```

```
origin  https://github.com/loki/portfolio.git (fetch)
origin  https://github.com/loki/portfolio.git (push)
```

If you started with `git init` locally instead of cloning, there's no remote yet -- you add one yourself:

```bash
git remote add origin https://github.com/loki/portfolio.git
```

`origin` is just a convention, not a keyword -- you could name it anything, but almost nobody does.

## `fetch` vs `pull` — the distinction that trips everyone up at first

```bash
git fetch origin
```

Downloads any new commits from the remote, and updates your local *remote-tracking* branches (`origin/main`) to match -- but does **not** touch your own local `main` or your working directory at all. It's purely informational: "here's what's changed on the remote, go look if you want."

```bash
git pull origin main
```

Is literally `git fetch` **followed by** `git merge origin/main` into your current branch. This is why a `git pull` can suddenly open a merge conflict -- it's doing a real merge, just automatically.

```bash
git pull --rebase origin main
```

Same idea, but rebases your local commits on top instead of merging -- keeps history linear. Many teams set this as the default:

```bash
git config --global pull.rebase true
```

## `git push` — sending your commits up

```bash
git push origin main
```

The first time you push a new local branch, tell Git to remember the link (so future pushes/pulls on this branch don't need the full arguments):

```bash
git push -u origin main       # -u = --set-upstream
git push                      # every push after this, from this branch, just needs this
```

## Tracking branches

Once a branch is linked with `-u`, `origin/main` becomes your **remote-tracking branch** -- a read-only local bookmark for "where the remote's `main` was, as of your last fetch." `git status` uses it to tell you things like `Your branch is 2 commits ahead of 'origin/main'`.

## Force-pushing (handle with care)

After a rebase or `--amend` on a branch you've *already* pushed, a normal push will be rejected (the remote history and yours have diverged). You can override this:

```bash
git push --force-with-lease origin my-branch
```

Prefer `--force-with-lease` over plain `--force`: it refuses to overwrite the remote if someone else has pushed something you haven't seen yet, whereas `--force` will happily stomp on it.

## HTTPS vs SSH

Cloning/pushing over `https://github.com/...` will prompt for a username + Personal Access Token (GitHub no longer accepts your account password here). Cloning/pushing over `git@github.com:...` (SSH) uses a key pair instead, and never prompts once it's set up. GitHub chapter 1 walks through generating and registering an SSH key.

## Try it yourself

This chapter's exercise is intentionally light -- the full round trip (creating a GitHub repo, connecting, pushing) is the hands-on centerpiece of **GitHub chapter 1**, right after this. For now, just confirm your remotes are readable:

```bash
cd practice-sandbox
git remote -v          # likely empty for now -- that's expected, we haven't connected it to anything yet
```

## Recap

- A remote is a named URL to another copy of the repo; `origin` is the default name after cloning.
- `fetch` downloads and updates remote-tracking branches only; `pull` = `fetch` + `merge` (or `+ rebase` with `--rebase`) into your current branch.
- `push -u origin <branch>` links a local branch to a remote one, once; plain `push` afterward.
- `--force-with-lease` is the safer version of `--force` for pushing rewritten history.

---
[← Previous: Rebasing](../07-rebasing/README.md) | [Next → Stashing & Cleaning](../09-stashing-and-cleaning/README.md)
