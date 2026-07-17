# GitHub 01 — Getting Started with GitHub

> Git and GitHub are not the same thing. This chapter draws that line clearly, then gets your machine talking to a GitHub account.

## Git vs GitHub, one more time

- **Git** -- the version control tool. Runs on your machine. Works with zero internet connection, zero account, zero "GitHub."
- **GitHub** -- a website that hosts Git repositories, plus adds collaboration tooling on top: pull requests, issues, Actions (CI/CD), Pages (hosting), and more. GitLab and Bitbucket are direct competitors offering a similar layer over the same underlying Git.

Everything in the `git/` track works with no GitHub account at all. Everything from here on assumes you have one.

## Creating an account

Sign up at [github.com](https://github.com) if you haven't already. Pick a username you're comfortable having on a professional portfolio -- it becomes part of your profile URL and (as you'll see in chapter 5) potentially part of a live site's URL too.

## Authenticating: SSH keys (recommended)

GitHub no longer accepts your account password for Git operations over HTTPS, and repeatedly typing a token gets old fast -- SSH keys solve this once, permanently.

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

Press enter through the prompts (a passphrase is optional but recommended). This creates two files: a private key (never share this) and a public key (`~/.ssh/id_ed25519.pub`) -- this one is safe to hand out.

Copy the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Then on GitHub: **Settings -> SSH and GPG keys -> New SSH key**, paste it in.

Test the connection:

```bash
ssh -T git@github.com
```

```
Hi Loki! You've successfully authenticated, but GitHub does not provide shell access.
```

That message is success, not an error.

## Authenticating: HTTPS + Personal Access Token (the alternative)

If you'd rather not set up SSH, HTTPS remotes work too -- when Git prompts for a password, use a **Personal Access Token** instead (Settings -> Developer settings -> Personal access tokens), not your actual account password.

## Creating a repository on GitHub

**New repository** from the `+` menu. Decide upfront:
- **Public or private** -- public means anyone can see (not necessarily edit) the code.
- Whether to auto-generate a `README.md`, `.gitignore`, and `LICENSE` -- convenient for a brand-new project, but skip these if you're about to push an *existing* local repo (see below), to avoid an unrelated-histories conflict.

## Connecting local <-> remote: two directions

**You already have a local repo (e.g., from the Git track) and want to push it up:**

```bash
git remote add origin git@github.com:loki/git-github-mastery.git
git branch -M main                    # ensure your branch is named "main" if it isn't already
git push -u origin main
```

**You're starting fresh from a repo that already exists on GitHub:**

```bash
git clone git@github.com:loki/some-project.git
```

Cloning sets up the `origin` remote and the tracking branch automatically -- no `remote add` needed.

## A quick tour of a repository page

- **Code tab** -- file browser, README rendered automatically below it.
- **Commits** -- the full history, browsable in the browser.
- **Branches** -- every branch that exists on the remote.
- **Pull requests / Issues tabs** -- covered in chapters 2 and 3.
- **Actions tab** -- CI/CD runs, chapter 4.
- **Settings** -- visibility, branch protection (chapter 6), Pages (chapter 5), and more.

## Try it yourself

Take the `git-github-mastery` folder you're reading right now (or your `practice-sandbox/`), and actually push it:

```bash
cd practice-sandbox              # or wherever you've been following along
git remote add origin git@github.com:<your-username>/practice-sandbox.git
git branch -M main
git push -u origin main
```

Refresh the repo page on GitHub and confirm your commits and files are there.

## Recap

- Git is the tool; GitHub is a host + collaboration layer built on top of it -- distinct things.
- SSH keys (`ssh-keygen`, then add the public key to GitHub) are the standard, friction-free way to authenticate.
- `git remote add origin <url>` connects an existing local repo; `git clone <url>` starts from GitHub's copy instead.

---
[← Previous (Git track): Config, Aliases & .gitignore](../../git/12-config-aliases-and-gitignore/README.md) | [Next → The GitHub Flow & Pull Requests](../02-github-flow-and-pull-requests/README.md)
