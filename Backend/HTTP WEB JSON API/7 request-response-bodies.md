# Chapter 7 — Request & Response Bodies

**Phase:** HTTP · **Suggested time:** 1 day · **Status:** Not Started

## What You Must Understand

What data is sent in a request body and returned in a response body.

## The Core Idea

The **body** is the actual payload — the "letter inside the envelope" from Chapter 6's
metaphor. Not every request or response has one, and knowing when to expect a body (and
what shape it'll be) is what makes reading real API traffic feel obvious instead of
overwhelming.

## Which methods typically have a body?

| Method | Request body? | Response body? |
|--------|-----------------|-------------------|
| GET | No (by convention — a GET's job is only to specify *what* to retrieve via the path/query) | Yes — the data you asked for |
| POST | Yes — the new resource's data | Yes — usually the created resource, confirming what was saved |
| PUT | Yes — the full replacement data | Sometimes — often the updated resource |
| PATCH | Yes — just the changed fields | Sometimes — often the updated resource |
| DELETE | Usually no | Usually no (often 204 No Content — see Chapter 5) |

## What a body actually looks like

For a POST creating a task:

**Request body:**
```json
{
  "title": "Finish HTTP roadmap",
  "priority": "high"
}
```

**Response body** (assuming 201 Created):
```json
{
  "id": 17,
  "title": "Finish HTTP roadmap",
  "priority": "high",
  "completed": false,
  "createdAt": "2026-07-24T10:00:00Z"
}
```

Notice the response gave back *more* than what you sent — an `id` the server assigned, a
`completed` default, a timestamp. This is completely normal: the server is the authority
on the resource's final shape.

## Body format is decided by Content-Type

The body itself is just bytes — it could be JSON, plain text, HTML, an uploaded file, or
URL-encoded form data. The `Content-Type` header (Chapter 6) is what tells the receiving
side how to interpret those bytes. `application/json` is by far what you'll see most once
you're working with APIs, which is exactly why Chapter 8 goes deep on JSON specifically.

## Connecting the dots: a full request/response, annotated

```
POST /tasks HTTP/1.1                     ← start line: method + path
Host: api.example.com                    ← header
Content-Type: application/json           ← header: "my body is JSON"
Authorization: Bearer eyJhbGciOi...      ← header: who I am
                                          ← blank line: headers end
{"title":"Finish HTTP roadmap"}          ← body: the actual data
```

```
HTTP/1.1 201 Created                     ← status line: success, resource created
Content-Type: application/json           ← header: "my body is JSON"
Location: /tasks/17                      ← header: where to find the new resource
                                          ← blank line: headers end
{"id":17,"title":"Finish HTTP roadmap",  ← body: the created resource
 "completed":false}
```

If Chapters 3–7 feel like they're all describing pieces of the same picture — they are.
This *is* the whole picture. Everything from here (JSON, Fetch, REST) is refinement on top
of this exact structure.

## Hands-on Practice

**Inspect JSON request/response bodies.**

1. DevTools → Network tab, find any request where an app *sends* data (submitting a form,
   liking a post, adding to cart) — look for the **Payload/Request** body.
2. Look at that same request's **Response** body.
3. For at least 3 different actions, write down: what was in the request body, what came
   back in the response body, and how they differ (usually the response has extra
   server-assigned fields, same as the task example above).

## Completion Check

Given any request in DevTools, can you correctly separate: the URL, the headers, and the
body? Can you explain why a GET request usually has no body but a POST usually does?

---
Previous: [Chapter 6 — HTTP Headers](06-http-headers.md) · Next: **[Chapter 8 → JSON](08-json.md)**
