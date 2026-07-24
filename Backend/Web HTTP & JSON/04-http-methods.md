# Chapter 4 — HTTP Methods

**Phase:** HTTP · **Suggested time:** 1 day · **Status:** Not Started

## What You Must Understand

GET, POST, PUT, PATCH, DELETE and their purposes.

## The Core Idea

The **method** (also called the "verb") in the request line tells the server *what kind of
action* you want performed on a resource. This is the single most important concept for
everything from here through REST APIs — CRUD (Create, Read, Update, Delete) is just these
methods with a business name.

## The five methods you must know cold

| Method | Purpose | CRUD equivalent | Has a body? | Safe to repeat? |
|--------|---------|------------------|--------------|-------------------|
| **GET** | Retrieve a resource | Read | No | Yes — calling it twice changes nothing |
| **POST** | Create a new resource | Create | Yes | No — calling it twice creates two things |
| **PUT** | Replace a resource entirely | Update (full) | Yes | Yes — replacing with the same data twice = same end state |
| **PATCH** | Partially update a resource | Update (partial) | Yes | Depends — often not, if it's incrementing something |
| **DELETE** | Remove a resource | Delete | Usually no | Yes — deleting an already-deleted thing changes nothing further |

The "safe to repeat" column is called **idempotency** — a fancy word for "doing it twice
has the same effect as doing it once." GET, PUT, and DELETE are idempotent by design; POST
is not. This matters in real systems: browsers will happily retry a failed GET
automatically, but they'll warn you before resubmitting a POST (you've seen "confirm form
resubmission" — that's why).

## PUT vs PATCH — the distinction that actually confuses people

Say a user resource is `{ "name": "Loki", "email": "loki@example.com", "age": 24 }`.

- **PUT** expects the *entire* object. Send `{ "name": "Loki", "age": 25 }` (forgetting
  email) via PUT, and a strict implementation will wipe out the email field, because PUT
  means "here is the complete new version of this resource."
- **PATCH** expects only the *fields that changed*. Send `{ "age": 25 }` via PATCH, and
  everything else stays untouched.

In practice a lot of real-world APIs are loose about this distinction, but understanding it
correctly is what separates "I copy-pasted this" from "I understand REST."

## Mapping methods to a real scenario

Imagine a Task Manager app (spoiler: you'll build one in Phase 7):

| User action | Method | Example path |
|-------------|--------|---------------|
| See all tasks | GET | `/tasks` |
| See one task | GET | `/tasks/42` |
| Add a new task | POST | `/tasks` |
| Replace task 42 completely | PUT | `/tasks/42` |
| Mark task 42 as done (one field) | PATCH | `/tasks/42` |
| Remove task 42 | DELETE | `/tasks/42` |

Notice: the **path** identifies *which* resource; the **method** identifies *what to do* to
it. Keeping those two concerns separate is the whole idea behind REST (Phase 4).

## Hands-on Practice

**Map CRUD actions to HTTP methods.**

Pick an app idea (a notes app, a bookmark manager, a simple shop). For each of the four
CRUD actions, write down: the method, and a plausible path. Then do the same exercise for
a real public API's docs (e.g. skim any API reference and just note which method it uses
for "create X" vs "update X" vs "delete X" — you'll start recognizing the pattern
everywhere).

## Completion Check

Given a scenario ("update just the price of a product" / "add a brand-new comment" /
"remove a user's account"), can you immediately say which HTTP method fits, and explain why
PUT and PATCH aren't interchangeable?

---
Previous: [Chapter 3 — HTTP Request & Response Model](03-http-request-response-model.md) · Next: **[Chapter 5 → HTTP Status Codes](05-http-status-codes.md)**
