# Chapter 13 — POST, PUT, PATCH & DELETE with Fetch

**Phase:** JavaScript Networking · **Suggested time:** 2–3 days · **Status:** Not Started

## What You Must Understand

Sending data, headers, JSON.stringify(), request configuration.

## The Core Idea

Chapter 12's `fetch()` calls all defaulted to GET with no extra configuration. To send
data — POST, PUT, PATCH, DELETE (Chapter 4) — you pass a second argument: an **options
object** that lets you set the method, headers, and body explicitly.

## The full shape of a configured fetch call

```javascript
fetch("https://api.example.com/tasks", {
  method: "POST",                              // Chapter 4
  headers: {
    "Content-Type": "application/json"          // Chapter 6 — describes the body below
  },
  body: JSON.stringify({                        // Chapter 9 — object → string
    title: "Finish roadmap",
    priority: "high"
  })
})
  .then(response => response.json())
  .catch(error => console.log(error));
```

Every one of those three options ties directly back to an earlier chapter:

- **`method`** — which HTTP verb (Chapter 4).
- **`headers`** — here specifically telling the server "the body I'm sending is JSON"
  (Chapter 6). Without this, some servers won't parse your body correctly.
- **`body`** — must be a **string**, not a raw JS object — hence `JSON.stringify()`
  (Chapter 9). Forgetting to stringify is one of the single most common Fetch bugs; the
  server receives something like `"[object Object]"` instead of real data.

## A full CRUD client, one function per operation

```javascript
const BASE = "https://api.example.com/tasks";

// CREATE
async function createTask(task) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  return res.json();
}

// UPDATE (partial)
async function updateTask(id, changes) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes)
  });
  return res.json();
}

// DELETE
async function deleteTask(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  return res.status; // often 204 — Chapter 5 — no body to parse
}
```

Notice `deleteTask` has no `body` and doesn't call `.json()` — matching Chapter 7's rule
that DELETE typically has no body, and Chapter 5's note that a successful DELETE often
returns `204 No Content`.

## Why PUT/PATCH need the resource's `id` in the URL, but POST doesn't

- **POST** targets a *collection* — `/tasks` — because you're creating a new item and the
  server assigns its id.
- **PUT/PATCH/DELETE** target a *specific existing resource* — `/tasks/17` — because you're
  acting on something that already exists. This is Chapter 4's path-vs-method separation in
  action, and Chapter 16/17 (Path & Query Parameters) will formalize this further.

## Hands-on Practice

**Build a CRUD client using a mock/public API.**

1. Find a free mock REST API for practice (search "free mock REST API for testing" if you
   don't already use one).
2. Write four functions — create, read, update, delete — following the pattern above.
3. Call `createTask`, log the response (note the server-assigned `id` — same lesson as
   Chapter 7's worked example), then call `updateTask` using that id, then `deleteTask`.
4. Confirm in DevTools' Network tab that each request has the method and body you expect.

## Completion Check

Why must `body` be a string, and what happens if you forget `JSON.stringify()`? Why does a
DELETE request typically skip both `body` and `.json()`?

---
Previous: [Chapter 12 — Fetch API](12-fetch-api.md) · Next: **[Chapter 14 → What REST Is](14-what-rest-is.md)**
