# Chapter 19 — CORS

**Phase:** Web Security · **Suggested time:** 1–2 days · **Status:** Not Started

## What You Must Understand

Origins, same-origin policy, preflight requests, why browser requests can be blocked.

## The Core Idea

This is usually the first genuinely confusing error beginners hit with real APIs — code
that looks completely correct fails with a red console error mentioning "CORS." CORS isn't
a bug in your code; it's a **browser security feature** getting in the way on purpose, and
once you understand *why* it exists, the error stops being mysterious.

## What an "origin" is

An origin is the combination of **protocol + domain + port** (Chapter 2). Two URLs share an
origin only if all three match exactly:

| URL A | URL B | Same origin? |
|-------|-------|-----------------|
| `https://example.com` | `https://example.com/other-page` | ✅ Yes — path doesn't matter |
| `https://example.com` | `http://example.com` | ❌ No — different protocol |
| `https://example.com` | `https://api.example.com` | ❌ No — different subdomain |
| `https://example.com` | `https://example.com:8080` | ❌ No — different port |

## The Same-Origin Policy

Browsers enforce a rule: **JavaScript running on one origin cannot read responses from a
different origin**, unless that other origin explicitly allows it. This is a *browser*
rule, not an HTTP rule or a server rule — it exists to stop a malicious site you're
visiting from silently using your logged-in session to read data off, say, your bank's
site in the background.

This is exactly why local development often hits this error immediately: your frontend
running at `http://localhost:3000` and your API running at `http://localhost:5000` are, by
the origin definition above, *different origins* (different ports) — even though they're
both "on your own computer."

## How a server opts in: the Access-Control-Allow-Origin header

A server allows cross-origin access by sending back a response header:

```
Access-Control-Allow-Origin: https://your-frontend.com
```

or, more permissively (common for public APIs):

```
Access-Control-Allow-Origin: *
```

If this header is missing or doesn't match your frontend's origin, the browser blocks
your JavaScript from reading the response — even though the server *did* actually process
the request and send data back. This is the detail that confuses people most: **the request
often still reaches the server and even succeeds there** (you might see it complete in the
Network tab with a 200) — it's the browser refusing to hand the response *back to your
JavaScript* that produces the error.

## Preflight requests — the automatic OPTIONS check

For anything beyond a "simple" GET (e.g. a POST with `Content-Type: application/json`,
or any request using PUT/PATCH/DELETE), the browser automatically sends an extra request
*before* your real one — an `OPTIONS` request — asking the server "if I were to send this
real request, would you allow it?" This is the **preflight request**. The server responds
with which origins, methods, and headers it allows; only if that checks out does the
browser send your actual request. You'll see this as a second, automatic entry in DevTools'
Network tab that you never wrote code for.

## Why this is a browser-only restriction

CORS only applies to requests made *from a browser via JavaScript*. Tools like Postman, or
a server directly calling another server, aren't bound by CORS at all — there's no browser
enforcing it. This is a common "wait, why does it work in Postman but not my app" moment,
and now you know why: Postman isn't a browser executing your JS.

## Hands-on Practice

**Trigger and diagnose a CORS error.**

1. Use `fetch()` (Chapter 12) from a browser console (or a tiny local HTML file) to call an
   API that does *not* set permissive CORS headers for your origin — you should see a CORS
   error in the console.
2. Open the Network tab and find the actual request — confirm it may show as completed
   (e.g. status 200) even though your JavaScript never received the data, because the
   browser blocked it after the fact.
3. Find and call a public API that *does* allow CORS (many public APIs set
   `Access-Control-Allow-Origin: *` deliberately) and confirm the same code works fine.
4. Trigger a preflight: make a `fetch()` call with `method: "PUT"` and a JSON
   `Content-Type` header against any API, and look for the automatic `OPTIONS` request in
   the Network tab.

## Completion Check

In your own words: what problem is the Same-Origin Policy trying to prevent? Why can a
request "succeed" on the server but still fail in your browser console? What triggers a
preflight `OPTIONS` request?

---
Previous: [Chapter 18 — CRUD](18-crud.md) · Next: **[Chapter 20 → Authentication & Authorization Basics](20-authentication-authorization-basics.md)**
