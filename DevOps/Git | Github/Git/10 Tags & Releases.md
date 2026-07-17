# Git 10 — Tags & Releases

> Marking a specific commit as meaningful and permanent -- usually "this is what we shipped as v1.0."

## Why tags exist

Branches move. A tag doesn't -- once created, it points at exactly one commit, forever (unless you deliberately delete/recreate it). That permanence is exactly what you want for marking releases.

## Lightweight vs annotated tags

```bash
git tag v1.0.0                                    # lightweight -- just a name pointing at a commit
git tag -a v1.0.0 -m "First stable release"        # annotated -- a full object: tagger, date, message
```

Annotated tags are generally preferred for anything you'll actually share or reference later -- they carry metadata (who tagged it, when, and why), the same way a commit does. Lightweight tags are more for quick, personal bookmarks.

## Listing and inspecting tags

```bash
git tag                          # list all tags
git tag -l "v1.*"                # filter with a pattern
git show v1.0.0                  # see the tag's message + the commit it points to
```

## Pushing tags (they don't go automatically!)

A plain `git push` does **not** send tags. You push them explicitly:

```bash
git push origin v1.0.0           # push one specific tag
git push origin --tags           # push everything you haven't pushed yet
```

## Checking out a tag

```bash
git checkout v1.0.0
```

This puts you in a **detached HEAD** state -- you're looking at exactly that commit, but not "on" any branch. It's fine for looking around or building that exact version; if you want to make new commits from there, create a branch first:

```bash
git switch -c hotfix-from-v1.0.0 v1.0.0
```

## Deleting a tag

```bash
git tag -d v1.0.0                          # delete locally
git push origin --delete v1.0.0             # delete on the remote too
```

## Semantic versioning, briefly

Most tagged releases follow `MAJOR.MINOR.PATCH` (e.g., `v2.4.1`):
- **MAJOR** -- breaking changes
- **MINOR** -- new features, backward-compatible
- **PATCH** -- bug fixes, backward-compatible

Tags are also exactly what GitHub Releases are built on top of -- see GitHub chapter 2 for turning a tag into a proper release page with notes and downloadable assets.

## Try it yourself

In `practice-sandbox/`:

```bash
git tag -a v0.1.0 -m "First checkpoint of the practice sandbox"
git tag
git show v0.1.0
```

## Recap

- Tags mark one specific commit permanently -- lightweight (just a name) or annotated (name + metadata + message, generally preferred).
- Tags don't push automatically -- use `git push origin <tag>` or `--tags`.
- Checking out a tag puts you in detached HEAD; branch off it if you intend to commit from there.

---
[← Previous: Stashing & Cleaning](../09-stashing-and-cleaning/README.md) | [Next → Advanced Git](../11-advanced-git/README.md)
