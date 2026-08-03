# Chapter 20 — Authentication & Authorization Basics

## What You Must Understand

Cookies, sessions, tokens, Bearer tokens, Authorization header.

## The Core Idea

Two words that sound similar but mean very different things — and this is a great chance to
connect the dot back to Chapter 5's 401 vs 403:

- **Authentication** = proving *who you are* (logging in). Failure here → **401 Unauthorized**.
- **Authorization** = determining *what you're allowed to do* once you're known. Failure
  here → **403 Forbidden**.

You can be authenticated (the server knows you're "Loki") but not authorized for a specific
action (you're not an admin) — that's precisely the 401-vs-403 distinction from Chapter 5,
now with the full picture behind it.

## Why this needs solving at all: HTTP is stateless (Chapter 3, again)

The server doesn't remember you between requests. So every mechanism in this chapter is
really just answering the same question in a different way: **"how do I re-identify myself
on every single request, given that the server forgets me instantly?"**

## Approach 1: Cookies & Sessions

1. You log in with a username/password (sent once, over HTTPS).
2. The server verifies it, creates a **session** (a record, usually stored server-side,
   saying "this session ID belongs to user Loki").
3. The server sends back a `Set-Cookie` header (Chapter 6) containing that session ID.
4. The browser **automatically** attaches that cookie to every subsequent request to that
   domain — you don't write any code for this part; it's built into how cookies work.
5. The server looks up the incoming session ID on each request to know who you are.

This is the traditional, "classic web app" approach — good default for a browser-based app
served by the same domain that also serves the API.

## Approach 2: Tokens (commonly JWT — JSON Web Tokens)

1. You log in the same way.
2. Instead of a server-side session, the server generates a **token** — a self-contained,
   signed piece of data — and sends it back in the response *body* (not a cookie).
3. Your client code stores it (commonly in memory or local storage) and must **manually**
   attach it to every subsequent request, in the `Authorization` header (Chapter 6):

```javascript
fetch("https://api.example.com/tasks", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

`Bearer` here just means "whoever bears (holds) this token is trusted" — it's the standard
prefix for token-based auth. Unlike cookies, **you must add this header yourself on every
request** — nothing attaches it automatically, which is exactly why you'll see this pattern
written explicitly in every API call once your app has a login.

## Cookies vs Tokens, side by side

| | Cookies + Sessions | Tokens (e.g. JWT) |
|---|----------------------|------------------------|
| Attached automatically by browser? | Yes | No — you attach it manually via `Authorization` header |
| Where server state lives | Server-side (session store) | Self-contained in the token itself — server can often verify without a lookup |
| Common use case | Traditional server-rendered web apps | APIs consumed by mobile apps, SPAs, or multiple different clients |
| CORS interaction (Chapter 19) | Needs extra config (`credentials: "include"`) to send cross-origin | Just another header — no special cross-origin cookie handling needed |

Neither is "more correct" — the choice depends on your architecture, and you'll encounter
both in real systems.

## Using a protected endpoint in practice

```javascript
async function getMyTasks(token) {
  const res = await fetch("https://api.example.com/my-tasks", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (res.status === 401) {
    throw new Error("Not logged in, or token expired");
  }
  if (res.status === 403) {
    throw new Error("Logged in, but not allowed to see this");
  }
  return res.json();
}
```

This function is a direct, working demonstration of the 401-vs-403 distinction from
Chapter 5 — now you can see exactly which real-world situation produces each one.

## Hands-on Practice

**Use a protected API with a token.**

1. Find a public API that issues a token/API key after a simple signup (many free-tier
   developer APIs work this way).
2. Make a request *without* the token/header first — confirm you get a 401.
3. Add the correct `Authorization` header with your token and confirm the same request now
   succeeds.
4. If the API has any endpoint reserved for a different permission level than yours, try it
   and confirm you get a 403 instead of a 401 — noting the difference in practice.

## Completion Check

Explain authentication vs authorization in one sentence each. Why does a cookie get
attached automatically but a token doesn't? Which status code pairs with which failure?

---
