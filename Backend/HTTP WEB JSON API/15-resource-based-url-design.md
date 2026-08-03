# Chapter 15 — Resource-Based URL Design

## What You Must Understand

Nouns/resources, endpoint naming, collections and individual resources.

## The Core Idea

Chapter 14 established that REST paths should name *resources* (nouns), never *actions*
(verbs) — the method already carries the action. This chapter is about doing that naming
well and consistently.

## The golden rule: nouns in the path, verbs in the method

| Bad (verb in path) | Good (noun path + correct method) |
|----------------------|--------------------------------------|
| `POST /createUser` | `POST /users` |
| `GET /getUserById?id=5` | `GET /users/5` |
| `POST /deleteUser?id=5` | `DELETE /users/5` |
| `POST /updateUserEmail` | `PATCH /users/5` |

Every "good" example reads as "[method] the [resource]" — the verb is spoken, never
written into the path.

## Collections vs individual resources

REST paths almost always come in a pair:

| Path pattern | Represents | Typical methods |
|---------------|--------------|--------------------|
| `/users` | The **collection** — all users | `GET` (list all), `POST` (create one) |
| `/users/5` | A **single resource** — one specific user | `GET` (read one), `PUT`/`PATCH` (update), `DELETE` (remove) |

Plural nouns (`/users`, not `/user`) are the near-universal convention, because the base
path represents the *collection* — it reads naturally as "users" (plural) even when you're
about to create just one.

## Nesting resources that belong to each other

When one resource logically lives inside another (a task belongs to a project, a comment
belongs to a post), nest the path:

```
GET  /projects/3/tasks        → all tasks belonging to project 3
POST /projects/3/tasks        → create a new task under project 3
GET  /projects/3/tasks/17     → task 17, specifically within project 3
```

This tells you, just from reading the URL, the relationship between resources — no
documentation required. Compare that to a flat, unclear alternative like
`/tasks?projectId=3`, which *works* (and is sometimes the right call — see Chapter 17 for
when query parameters are the better tool) but doesn't communicate the relationship as
directly in the path itself.

## When to nest vs when to use a flat path with a query parameter

- **Nest** when the child resource genuinely can't exist without its parent, and you're
  almost always accessing it *through* that parent (tasks always belong to exactly one
  project).
- **Flat + query parameter** when you want to filter/search a resource that can stand on
  its own (Chapter 17 covers this — e.g. `/tasks?projectId=3&status=done` for flexible
  filtering across multiple criteria).

Both are legitimate REST — this is a design judgment call, not a hard rule, and you'll
develop a feel for it as you build more APIs.

## Hands-on Practice

**Design endpoints for a blog or task app.**

Pick either a blog (posts, comments, authors) or a task app (projects, tasks, tags). Design
the full set of endpoints:

1. List every resource (nouns only).
2. For each, write the collection path and, where relevant, the nested-resource path.
3. For every path, list which HTTP methods it supports and what each one does.
4. Deliberately write one *bad* verb-based version of one endpoint, then correct it — the
   act of spotting your own mistake cements the rule better than only writing correct
   examples.

## Completion Check

Why are collection paths conventionally plural? Given a scenario ("comments belong to
posts"), can you design both the collection and single-resource nested paths without
looking anything up?

---
