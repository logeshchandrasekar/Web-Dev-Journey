# Git 12 — Config, Aliases & .gitignore

> Closing out the Git track by making Git faster and quieter to use day-to-day.

## Configuration levels

Git config exists at three levels, each overriding the one before it:

```bash
git config --system    # every user on this machine (rarely used directly)
git config --global    # every repo for YOU on this machine (~/.gitconfig)
git config --local      # just THIS repo (.git/config) -- this is the default if you omit the flag
```

Handy for a repo that needs a different identity (e.g., a work email instead of your personal one):

```bash
cd work-project
git config user.email "loki@company.com"   # local -- only affects this repo
```

See where a setting is actually coming from:

```bash
git config --list --show-origin
```

## Aliases — shortcuts for commands you type constantly

```bash
git config --global alias.co switch
git config --global alias.br branch
git config --global alias.st status
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --all --decorate"
```

Now `git lg` gives you the pretty graph from chapter 3 without typing the whole thing. Aliases live in `~/.gitconfig`:

```
[alias]
    co = switch
    br = branch
    st = status
    cm = commit -m
    lg = log --oneline --graph --all --decorate
```

## `.gitignore` patterns, in more depth

Chapter 2 introduced the basics. A few more patterns worth knowing:

```
*.log                # any file ending in .log, anywhere in the repo
/build                # ONLY a top-level "build" folder (leading slash = anchor to repo root)
temp/                 # any folder named "temp", at any depth
!important.log        # negation -- un-ignore this one specific file
docs/**/*.pdf          # ** matches any number of nested directories
```

## A global `.gitignore`, for things you never want tracked *anywhere*

Editor/OS clutter (`.DS_Store`, `.vscode/`, `*.swp`) doesn't belong in every project's own `.gitignore` -- set it once, globally:

```bash
git config --global core.excludesFile ~/.gitignore_global
```

Then add your personal never-track patterns to `~/.gitignore_global` directly.

## Credential helpers (a preview of the GitHub track)

So you're not typing a Personal Access Token on every single push over HTTPS:

```bash
git config --global credential.helper cache        # remember in memory temporarily
git config --global credential.helper store        # remember on disk (less secure, more convenient)
```

GitHub chapter 1 covers SSH keys as the more common alternative to this entirely.

## Try it yourself

```bash
git config --global alias.lg "log --oneline --graph --all --decorate"
cd practice-sandbox
git lg                              # confirm the alias works
git config --list --show-origin | grep alias
```

## Recap

- Config has three levels (system/global/local); local overrides global overrides system.
- Aliases turn long, frequent commands into short ones -- `git config --global alias.<name> "<command>"`.
- `.gitignore` supports negation (`!`), directory anchoring (`/`), and recursive globs (`**`); a global gitignore handles editor/OS clutter once instead of per-project.

**That's the full Git track.** Everything from here on is GitHub -- the platform built on top of everything you just learned.

---
[← Previous: Advanced Git](../11-advanced-git/README.md) | [Next → Getting Started with GitHub](../../github/01-getting-started-with-github/README.md)
