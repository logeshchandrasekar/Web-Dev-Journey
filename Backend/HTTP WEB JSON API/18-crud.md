# Chapter 18 — CRUD

## What You Must Understand

Create, Read, Update, Delete mapped to HTTP methods.

## The Core Idea

This chapter doesn't introduce new concepts — it's where Chapters 4 through 17 get combined
into one working thing. **CRUD** is the umbrella term for the four operations almost every
resource needs, and you now know every ingredient required to build all four for real.

## The complete mapping, assembled from everything so far

| Operation | Method (Ch. 4) | Path shape (Ch. 15/16) | Body? (Ch. 7) | Success status (Ch. 5) |
|-----------|------------------|----------------------------|------------------|----------------------------|
| **Create** | POST | `/tasks` (collection) | Yes | 201 Created |
| **Read (all)** | GET | `/tasks` (collection, + query params from Ch. 17 for filter/sort/page) | No | 200 OK |
| **Read (one)** | GET | `/tasks/{id}` (path param, Ch. 16) | No | 200 OK (or 404 if missing) |
| **Update** | PUT or PATCH | `/tasks/{id}` | Yes | 200 OK |
| **Delete** | DELETE | `/tasks/{id}` | No | 204 No Content |

If any single cell in that table feels unfamiliar, that's the exact chapter to revisit
before building the practice project below — this table *is* the destination all of Phase 4
has been walking toward.

## A complete Todo CRUD frontend, tying every chapter together

```javascript
const BASE = "https://api.example.com/tasks";

// READ (all) — with query parameters, Ch. 17
async function listTasks(filters = {}) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// CREATE — Ch. 13
async function createTask(task) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // 201 Created, includes server-assigned id
}

// READ (one) — path parameter, Ch. 16
async function getTask(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// UPDATE — Ch. 13
async function updateTask(id, changes) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// DELETE — Ch. 13
async function deleteTask(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status; // 204, no body to parse
}
```

Every function follows the identical shape: build the request (method + path + maybe
body), await the response, check `.ok`, parse if there's a body. Once that shape is
automatic, building CRUD against *any* new API is just filling in the resource name.

## Why building this yourself matters more than reading it

The roadmap's own completion criteria for this row is "Can implement all four CRUD
operations" — not "can read an example of all four." The muscle memory of writing
`if (!res.ok) throw ...` for the tenth time, or remembering PATCH needs a body but DELETE
doesn't, is what this project is actually training.

## Hands-on Practice

**Build a complete Todo CRUD frontend.**

1. Use a free mock/practice REST API (the same kind used in Chapter 13's exercise).
2. Write all four functions above (or your own version) against it.
3. Build a minimal UI — even plain HTML + vanilla JS is enough — with a form to create a
   task, a list showing all tasks (calling `listTasks` on load), an edit action per task
   (calling `updateTask`), and a delete button (calling `deleteTask`).
4. After every action, re-fetch the list so the UI reflects the current server state —
   this "re-fetch after mutation" pattern is extremely common in real frontends.

## Completion Check

Without looking at the table above, can you write out all five CRUD rows (method, path
shape, body y/n, success status) from memory? Can you explain why `listTasks` doesn't need
a body but `createTask` does?

---
