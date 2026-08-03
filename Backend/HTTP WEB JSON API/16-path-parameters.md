# Chapter 16 — Path Parameters

## What You Must Understand

Dynamic resource identifiers such as `/users/42`.

## The Core Idea

A **path parameter** is a variable segment of a URL's path that identifies *which specific
resource* you mean — the `42` in `/users/42`. It's not optional metadata like a query
parameter (Chapter 17); it's a required part of specifying *what you're talking about at
all*.

## Recognizing a path parameter in documentation

API docs write path parameters with a placeholder syntax, commonly curly braces or a colon:

```
GET /users/{id}
GET /users/:id
```

Both mean the same thing: "this segment is a variable — substitute a real id here."
`GET /users/{id}` called with id `42` becomes the real request `GET /users/42`.

## Multiple path parameters

Nested resources (Chapter 15) often need more than one:

```
GET /projects/{projectId}/tasks/{taskId}
```

Called concretely: `GET /projects/3/tasks/17` — "task 17, which belongs to project 3."
Both values are required to identify exactly one thing; leaving either out doesn't make
sense (there's no such thing as "task 17 with no project" in this design).

## Path parameter vs query parameter — the distinction this chapter exists to teach

| | Path parameter | Query parameter (Chapter 17) |
|---|------------------|----------------------------------|
| **Syntax** | `/users/42` | `/users?role=admin` |
| **Purpose** | Identifies *which* resource | Filters/modifies *how* you want the collection returned |
| **Required?** | Yes — the request doesn't make sense without it | Usually optional — omitting it just means "no filter" |
| **Example question it answers** | "Which user?" | "Which users, filtered/sorted how?" |

A simple test: if removing it makes the request nonsensical rather than just "less
specific," it's a path parameter. `GET /users/` (with nothing after the slash) is broken —
you haven't said which user. `GET /users` (with no query string) is perfectly valid — it
just means "give me all users, no filter."

## Extracting path parameters (a server-side preview)

You won't build server code until Phase 7 (Node.js/Express), but here's what reading a path
parameter looks like there, so the concept isn't abstract:

```javascript
// Express.js route (Phase 7 preview)
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;   // "42" — extracted from the URL automatically
  // ...look up and return that user
});
```

The framework handles matching `:id` against whatever was actually in the URL and hands it
to you as a plain value.

## Hands-on Practice

**Fetch individual users/products/posts.**

1. Using any public API with individual-resource endpoints (`/posts/{id}` style), fetch 3-4
   different specific resources by id using `fetch()` (Chapter 12) and log the results.
2. Try fetching an id that doesn't exist — confirm you get a 404 (Chapter 5) rather than an
   empty success.
3. Write out, for a task-app idea, every endpoint that needs a path parameter, and name what
   each parameter represents.

## Completion Check

Given a URL like `/projects/3/tasks/17`, can you identify both path parameters and say what
each one means? What's the quick test for whether something should be a path parameter
versus a query parameter?

---
