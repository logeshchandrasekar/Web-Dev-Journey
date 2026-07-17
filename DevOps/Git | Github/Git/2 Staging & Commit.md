# Git 02 — Staging & Committing

> Turning working-directory changes into staged changes into permanent commits — the core loop you'll repeat all day, every day.

## The core loop

```
edit files  ->  git add  ->  git commit  ->  repeat
```

Everything else in Git is built around this loop. Let's go through each piece.

## `git add` — staging changes

```bash
git add path/to/file.js       # stage one file
git add path/to/folder/       # stage everything in a folder
git add .                     # stage everything in and below the current directory
git add -A                    # stage everything in the whole repo, including deletions elsewhere
```

Staging is not "saving." It just marks "this is what I want in my *next* commit." You can stage, then keep editing the same file, and the working-directory changes made *after* you staged won't be in the staged snapshot until you `git add` again.

### Staging *part* of a file: `git add -p`

Sometimes a file has two unrelated changes and you only want to commit one of them. `git add -p` (patch mode) walks through each chunk of changes and asks `y/n/s/...` per chunk:

```bash
git add -p file.js
```

This is one of the most underused, most useful Git commands once you're past the basics — it lets your commits be *logical units*, not just "whatever happened to be in the file when you remembered to commit."

## `git status` — reading the fuller picture

```bash
git status
```

```
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   index.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
	modified:   style.css

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	notes.txt
```

Three separate buckets, matching the three areas from chapter 1:
- **Changes to be committed** — staged, will be in the next commit.
- **Changes not staged** — Git already knows this file (it's tracked), but the latest edits haven't been staged.
- **Untracked** — Git has never seen this file before at all.

## `git diff` — seeing the actual changes

```bash
git diff              # working directory vs staging area (unstaged changes)
git diff --staged     # staging area vs the last commit (what you're about to commit)
git diff HEAD         # working directory vs the last commit (everything, staged or not)
```

Mixing these two up is a classic beginner trap: if you edit a file *after* staging it, plain `git diff` only shows the newer, unstaged edits — not the ones you already staged.

## `git commit` — making it permanent

```bash
git commit -m "Add hero section to homepage"
```

Without `-m`, Git opens your configured editor so you can write a longer message. `git commit -am "message"` is a shortcut that stages and commits *tracked* files in one step — but it will never pick up brand-new untracked files, which is the most common reason people get confused by it.

Fixing the message of the commit you *just* made (before pushing it anywhere):

```bash
git commit --amend -m "Corrected message"
```

(More on `--amend`, including adding forgotten files to the last commit, in chapter 4.)

## Writing commit messages that don't embarrass future-you

- **Imperative mood**: "Add validation," not "Added validation" or "Adds validation." Think of it completing the sentence "If applied, this commit will ___."
- **Short summary line (about 50 chars), blank line, then details if needed** (the "50/72 rule"):
  ```
  Fix off-by-one error in pagination

  The last page was being dropped because the total-pages
  calculation used floor() instead of ceil().
  ```
- Many teams follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`...) — worth adopting even solo, since it makes `git log --oneline` genuinely scannable.

## `.gitignore` — telling Git what to never track

Some files should never be committed: build output, dependency folders, secrets, OS clutter.

```
# .gitignore
node_modules/
__pycache__/
*.pyc
.env
.DS_Store
dist/
```

- One pattern per line. `/` at the end means "only match a directory."
- `.gitignore` only affects files Git *doesn't already track*. If a file was committed before you ignored it, you have to explicitly remove it too:
  ```bash
  git rm --cached accidentally-committed-secret.env
  ```
- [gitignore.io](https://www.toptal.com/developers/gitignore) generates a solid starter `.gitignore` for any language/framework/OS combination.

## Try it yourself

In `practice-sandbox/`:

```bash
cd practice-sandbox
echo "*.log" >> .gitignore
git add .gitignore starter-files/
git status                     # confirm everything shows as "Changes to be committed"
git commit -m "Initial commit: add starter files and gitignore"
```

Then make a real edit and practice the diff distinction:

```bash
echo "<!-- test comment -->" >> starter-files/index.html
git diff                        # shows the change (unstaged)
git add starter-files/index.html
git diff                        # shows NOTHING -- it's staged now
git diff --staged               # shows the change here instead
git commit -m "Add a test comment to index.html"
```

## Recap

- `git add` moves changes from working directory to staging area. `git commit` moves staged changes to permanent history.
- `git status` and `git diff` (plain vs `--staged`) tell you exactly what's about to happen before you commit.
- `.gitignore` stops files from ever being tracked in the first place; `git rm --cached` removes something already tracked.
- Good commit messages are short, imperative, and describe *why*, not just *what*.

---
[← Previous: Introduction & Setup](../01-introduction-and-setup/README.md) | [Next → Viewing History](../03-viewing-history/README.md)
