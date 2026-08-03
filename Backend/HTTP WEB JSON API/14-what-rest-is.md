# Chapter 14 — What REST Is

## What You Must Understand

REST as an architectural style, resources, representations, HTTP-based communication.

## The Core Idea

This is the chapter where a lot of self-taught developers have a gap, so read it slowly:
**REST is not a technology, a library, or `fetch()` itself.** REST (REpresentational State
Transfer) is a set of *design conventions* for building APIs on top of HTTP. `fetch()` is
just how you *call* an API — REST is about how that API is *designed* in the first place.
You could build a REST API and call it with a totally different tool; you could also use
`fetch()` against an API that isn't RESTful at all.

## The core conventions REST is built on (all things you already know)

| REST idea | Chapter you already learned it in |
|-----------|-------------------------------------|
| Everything is a **resource**, identified by a URL | Chapter 2 (URLs) |
| Actions on resources use standard **HTTP methods** | Chapter 4 (GET/POST/PUT/PATCH/DELETE) |
| Responses use meaningful **status codes** | Chapter 5 |
| Data is exchanged as a **representation** (usually JSON) | Chapter 8 |
| Communication is **stateless** — each request stands alone | Chapter 3 |

REST didn't invent any of these — it's the discipline of using HTTP's own existing features
*as they're intended*, consistently, instead of inventing your own conventions on top.

## "Resource" and "representation" — the two words in the name that matter

- A **resource** is a *thing* your API manages — a user, a task, a product. It's a concept,
  not a data format.
- A **representation** is how that resource is *shown* over the wire — almost always JSON
  today (Chapter 8), though the same resource could theoretically be represented as XML or
  HTML too. "REST" literally comes from "REpresentational State Transfer" — transferring the
  *representation* of a resource's *state*.

So `GET /tasks/17` doesn't return "the task" — it returns *a JSON representation of the
current state of task 17*. That distinction matters once you deal with caching, content
negotiation (`Accept` headers — Chapter 6), and versioned APIs later.

## A non-RESTful API, for contrast

Imagine an API with endpoints like:

```
POST /getTask?id=17
POST /createNewTask
POST /removeTaskById
```

This *works*, and plenty of real systems look like this — but it's not RESTful: everything
is POST regardless of the actual action, the verb is smuggled into the URL/path name instead
of using the HTTP method, and there's no consistent resource-based structure. Contrast with
the RESTful version:

```
GET    /tasks/17
POST   /tasks
DELETE /tasks/17
```

Same capabilities, but the *method* carries the meaning, and the *path* only ever names the
resource. That consistency is the entire value proposition of REST: once you learn the
pattern once, you can predict how the rest of *any* well-designed REST API works without
reading its docs line by line.

## Hands-on Practice

**Identify resources in real APIs.**

1. Pick 2-3 public APIs (search "public API documentation" for a well-documented one, e.g.
   in the space/weather/open-data space).
2. For each, list out: what are the "resources" (nouns) the API manages? What HTTP methods
   does it expose for each? Do the paths stay noun-only, or do you spot verb-like paths
   (`/getUser`) that break the pattern?
3. Note any place the API *doesn't* strictly follow REST conventions — real-world APIs are
   rarely 100% pure, and learning to spot the deviations is as useful as learning the ideal.

## Completion Check

In your own words, what's the difference between REST and `fetch()`? What does
"representation" refer to in REST, and why does it matter that it's usually JSON?

---
