# Chapter 5 — HTTP Status Codes

**Phase:** HTTP · **Suggested time:** 1 day · **Status:** Not Started

## What You Must Understand

2xx, 3xx, 4xx, 5xx and common codes such as 200, 201, 204, 400, 401, 403, 404, 500.

## The Core Idea

Every HTTP response starts with a 3-digit **status code**. The first digit tells you the
*category* of what happened — you can often guess the meaning of a code you've never seen
just from its first digit.

## The five categories

| Range | Category | Meaning |
|-------|----------|---------|
| **1xx** | Informational | Request received, still processing (rare to deal with directly) |
| **2xx** | Success | The request worked |
| **3xx** | Redirection | You need to go somewhere else to complete this |
| **4xx** | Client error | *You* (the request) did something wrong |
| **5xx** | Server error | *The server* did something wrong |

That last distinction — 4xx vs 5xx — is one of the most useful debugging instincts you can
build. A 4xx means: fix your request. A 5xx means: the problem is on the server; there's
nothing you can do about it from the client side except maybe retry later.

## The codes you'll see constantly

| Code | Name | When you'll see it |
|------|------|---------------------|
| **200** | OK | Standard success for GET/PUT/PATCH — "here's your data / your update worked" |
| **201** | Created | Success specifically for POST — "your new resource was created" |
| **204** | No Content | Success, but there's nothing to send back (common for DELETE) |
| **400** | Bad Request | The request itself is malformed — bad JSON, missing required field |
| **401** | Unauthorized | You're not authenticated at all (no/invalid credentials) — really means "un-*identified*" |
| **403** | Forbidden | You *are* identified, but you don't have permission for this action |
| **404** | Not Found | The resource/path doesn't exist |
| **500** | Internal Server Error | Something broke inside the server's own code |

## 401 vs 403 — the one everyone mixes up

- **401 Unauthorized** = "I don't know who you are" (no token, expired token, wrong
  password). Fix: log in / send valid credentials.
- **403 Forbidden** = "I know exactly who you are, and you're not allowed to do this"
  (e.g. a regular user trying to access an admin endpoint). Fix: nothing you can do without
  different permissions — this is a wall, not a login form.

You'll lean on this distinction hard once you get to Phase 5 (Authentication & Authorization).

## Why 201 and 204 exist instead of just always using 200

REST APIs are expected to be *precise* about what happened:

- POST that creates something → **201 Created** (often with a `Location` header pointing to
  the new resource) rather than a generic 200 — it tells the client "yes, something new
  now exists."
- DELETE that succeeds → **204 No Content** — there's no meaningful body to return (the
  thing is gone), so instead of sending back `{}` or `null`, the server just says "success,
  nothing to show you."

Using the *right* status code, not just 200-for-everything or 500-for-everything, is a
concrete signal of REST maturity you'll be graded on informally by anyone reviewing your
API design later.

## Hands-on Practice

**Create a status-code cheat sheet and test APIs.**

1. Write your own cheat sheet table (like the one above) from memory, then check it.
2. Go to any free public API (e.g. a placeholder/test API) and deliberately trigger errors:
   request a nonexistent ID (expect 404), send malformed data if the API validates input
   (expect 400), hit an endpoint that requires auth without a token (expect 401).
3. Note the status code returned each time and confirm it matches what you'd expect.

## Completion Check

Without looking anything up: what's the difference between 401 and 403? Between 400 and
500? What status code should a successful POST return, and why not just 200?

---
Previous: [Chapter 4 — HTTP Methods](04-http-methods.md) · Next: **[Chapter 6 → HTTP Headers](06-http-headers.md)**
