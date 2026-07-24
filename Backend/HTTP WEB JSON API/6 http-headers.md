# Chapter 6 — HTTP Headers

**Phase:** HTTP · **Suggested time:** 1–2 days · **Status:** Not Started

## What You Must Understand

Content-Type, Accept, Authorization, caching-related headers, User-Agent.

## The Core Idea

Headers are **metadata about the message** — key-value pairs that describe the request or
response without being the actual content itself. If the body is "the letter," headers are
everything written on the envelope: who it's from, what language it's in, how urgent it is.

## Headers you'll use constantly

| Header | Direction | What it does |
|--------|-----------|----------------|
| **Content-Type** | Both | Says what format the *body* is in, e.g. `application/json`, `text/html`, `multipart/form-data`. The receiver uses this to know how to parse the body. |
| **Accept** | Request | The client saying what format(s) it's willing to receive back, e.g. `application/json`. The server can use this to decide the response format. |
| **Authorization** | Request | Carries credentials — commonly `Authorization: Bearer <token>` for token-based auth (you'll use this heavily in Phase 5). |
| **User-Agent** | Request | Identifies the client software making the request — which browser, or in an API context, which app/library. |
| **Content-Length** | Response (mostly) | Size of the body in bytes, so the receiver knows when the message ends. |
| **Cache-Control** | Response | Tells the client how long it can reuse this response without asking again, e.g. `Cache-Control: max-age=3600`. |
| **Set-Cookie** | Response | Server telling the browser to store a cookie, which the browser will then send back automatically on future requests to that domain. |

## Content-Type vs Accept — request and response mirror each other

This is the pairing that confuses beginners the most:

- When you **send** a request with a body, `Content-Type` describes *that body you're
  sending*. `Content-Type: application/json` on a POST means "the JSON I've attached is
  what I'm sending you."
- `Accept` describes what you'd *like back*, independent of what you sent.
- When the **server responds**, its `Content-Type` describes *its* body — the data coming
  back to you.

So in one POST request/response pair, you can have three separate Content-Type-related
signals: your request's `Content-Type` (what you sent), your request's `Accept` (what you
want), and the response's `Content-Type` (what you actually got).

## Why caching headers exist

Re-downloading a logo image on every single page view would be wasteful. `Cache-Control`
(and related headers like `ETag`, `Expires`) let a server say "this won't change for the
next hour — feel free to reuse your local copy instead of asking me again." This is a huge
part of why the web feels fast — most requests for unchanged assets never actually reach
the server at all.

## Why Authorization matters for everything downstream

Remember from Chapter 3: HTTP is stateless. The server has no memory of you between
requests. The `Authorization` header is how every *single* request re-proves who you are.
You'll see this pattern constantly starting in Phase 5 (Authentication) — every protected
API call carries this header.

## Hands-on Practice

**Inspect headers in DevTools.**

1. Open DevTools → Network tab, load any site that requires login (or any API-backed page).
2. Click a request, open the Headers panel.
3. Find and identify: `Content-Type`, `Accept`, `User-Agent` in the request; `Content-Type`,
   `Cache-Control` (or `ETag`) in the response.
4. If the site uses login, look for `Authorization` or `Cookie` in the request headers —
   note it's present on *every* request once you're logged in, not just the login request.

## Completion Check

Can you explain, in your own words, why a header like `Authorization` needs to be sent on
every request rather than just once at login? Can you explain the difference between what
`Content-Type` and `Accept` each describe?

---
Previous: [Chapter 5 — HTTP Status Codes](05-http-status-codes.md) · Next: **[Chapter 7 → Request & Response Bodies](07-request-response-bodies.md)**
