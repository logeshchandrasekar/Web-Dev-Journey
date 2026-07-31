# Chapter 12 — Fetch API

**Phase:** JavaScript Networking · **Suggested time:** 2–3 days · **Status:** Not Started

## What You Must Understand

GET requests, Response object, response.json(), response.ok, status.

## The Core Idea

`fetch()` is the browser's built-in function for making HTTP requests from JavaScript.
Everything from Chapters 1–11 — methods, headers, bodies, status codes, JSON parsing,
Promises — was building toward this one function, because `fetch()` is where all of it
shows up at once, in real code.

## The simplest possible request

```javascript
fetch("https://api.example.com/products/42")
  .then(response => response.json())
  .then(data => console.log(data));
```

Notice `fetch()` returns a Promise (Chapter 10) — a GET request with no second argument
defaults to the GET method, matching Chapter 4.

## The Response object — what you actually get back first

Here's the detail that surprises beginners: **the Promise from `fetch()` resolves as soon
as headers arrive** — not when the whole body is downloaded, and *not* automatically parsed
as JSON. What you get is a `Response` object, with properties that map directly onto
Chapter 3 and Chapter 5's concepts:

| Property/method | What it gives you |
|------------------|----------------------|
| `response.status` | The numeric status code (200, 404, etc. — Chapter 5) |
| `response.ok` | `true` if status is 200–299, `false` otherwise — a quick success check |
| `response.headers` | Access to response headers (Chapter 6) |
| `response.json()` | Reads and parses the body as JSON — returns *another* Promise (Chapter 9's `JSON.parse()`, done for you) |
| `response.text()` | Reads the body as a plain string, no parsing |

## The gotcha almost everyone hits first: fetch doesn't reject on 404/500

```javascript
async function getProduct(id) {
  const response = await fetch(`https://api.example.com/products/${id}`);

  if (!response.ok) {
    // fetch does NOT throw here automatically — you must check response.ok yourself
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

`fetch()`'s Promise only rejects on genuine network failure (no connection, DNS failure,
CORS block — Chapter 19). A `404 Not Found` or `500 Internal Server Error` is still a
*successful* HTTP exchange as far as `fetch()` is concerned — you got a real response, it
just wasn't the status you wanted. That's why checking `response.ok` (or `response.status`)
yourself, and throwing your own error when it's bad, is standard practice, not optional
boilerplate.

## Putting it together with everything so far

```javascript
async function getProduct(id) {
  try {
    const response = await fetch(`https://api.example.com/products/${id}`);
    // response.ok / response.status → Chapter 5 (status codes)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    // .json() → Chapter 9 (JSON.parse under the hood)
    return data;
  } catch (error) {
    // async/await + try/catch → Chapter 11
    console.log("Failed to fetch product:", error.message);
  }
}
```

Every chapter so far is a labeled line in this one function. If any single piece feels
shaky, that's the chapter to go re-read before continuing.

## Hands-on Practice

**Fetch a public API and display data.**

1. Pick any free public API that needs no authentication (search for "free public APIs no
   auth key" if you don't have one bookmarked).
2. Write an `async` function that fetches from it, checks `response.ok`, parses the JSON,
   and logs a few fields to the console.
3. Deliberately fetch a URL that returns 404 (a nonexistent ID/endpoint) and confirm your
   `if (!response.ok)` branch catches it correctly instead of silently returning bad data.
4. Render at least one field from the response into the DOM (even just
   `document.body.textContent = data.name` is enough) — the point is closing the loop from
   network response to something visible on screen.

## Completion Check

Can you explain why `fetch()` doesn't throw an error for a 404 response? What does
`response.json()` actually do, and why is it itself awaited separately from the `fetch()`
call?

---
Previous: [Chapter 11 — async/await & try/catch](11-async-await-try-catch.md) · Next: **[Chapter 13 → POST, PUT, PATCH & DELETE with Fetch](13-post-put-patch-delete-fetch.md)**
