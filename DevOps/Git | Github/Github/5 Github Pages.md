# GitHub 05 — GitHub Pages

> Free static site hosting, served directly from a repository. If you've deployed a portfolio to `<username>.github.io`, you've already used this -- this chapter is the "how it actually works" underneath that.

## What GitHub Pages is

A static file host (HTML/CSS/JS, and anything a static site generator produces) built directly into every GitHub repo, with no separate hosting account or billing needed for public repos.

## Two kinds of Pages site

| Type | Repo name | URL |
|---|---|---|
| **User/Org page** | must be exactly `<username>.github.io` | `https://<username>.github.io` |
| **Project page** | any repo name | `https://<username>.github.io/<repo-name>` |

You get **one** user page (tied to that exact repo name), but as many project pages as you have repos.

## Enabling Pages

**Settings -> Pages**, then choose a source:
- **Deploy from a branch** -- pick a branch (usually `main`) and a folder (`/ (root)` or `/docs`). GitHub rebuilds the live site automatically on every push to that branch/folder.
- **GitHub Actions** -- for anything that needs a build step first (a React app, a static site generator like Jekyll/Hugo/Astro) -- a workflow builds the output, then a dedicated action deploys it.

A minimal Actions-based deploy step, for a project that builds into a `dist/` folder:

```yaml
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

(`secrets.GITHUB_TOKEN` is provided automatically by GitHub for every workflow run -- no setup needed, unlike custom secrets from chapter 4.)

## Custom domains

**Settings -> Pages -> Custom domain** lets you point your own domain at the Pages site instead of the `github.io` URL -- requires adding a `CNAME` DNS record (or `A` records, for an apex domain) at your domain registrar, which GitHub's Pages settings will walk you through once you enter the domain.

## Try it yourself

If `practice-sandbox/starter-files/index.html` is sitting in a repo you've already pushed:

1. **Settings -> Pages -> Source: Deploy from a branch -> main -> / (root)** (or move `index.html` to the repo root first if it's nested).
2. Wait about a minute, then visit the URL GitHub shows you.
3. Make a small edit to `index.html`, commit, push -- refresh the live URL after the deployment finishes and confirm the change appears.

## Recap

- GitHub Pages serves static files straight from a repo -- one user/org page per account, unlimited project pages.
- "Deploy from a branch" is enough for plain HTML/CSS/JS; a build step (React, Jekyll, etc.) needs the GitHub Actions source instead.
- Custom domains attach via a DNS record plus the Pages settings.

---
[← Previous: GitHub Actions (CI/CD)](../04-github-actions-ci-cd/README.md) | [Next → Security & Best Practices](../06-security-and-best-practices/README.md)
