# Chapter 28g — Building an HTTP Server From Scratch

## What You Must Understand

How to build a working HTTP server using only Node's built-in `http` module — no
frameworks — so that Express (your next tracker topic) reads as a convenience layer over
something you already understand, not a black box.

## The Core Idea

Every concept from Chapters 1–20 (methods, paths, status codes, headers, bodies) has to be
handled by *something* on the server side. Frameworks like Express handle all of it for
you conveniently — but building it once with raw Node shows you exactly what's being
handled underneath, which makes every Express feature you learn next feel like "oh, that's
just doing the thing I already did by hand, but shorter."

## The absolute minimum server

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;                          // Chapter 5
  res.setHeader("Content-Type", "text/plain");    // Chapter 6
  res.end("Hello, world!");                       // Chapter 7 — the body
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

- `req` (the request) — an object representing the incoming request. It's also a
  **readable stream** (Chapter 28f) for reading the body, if any.
- `res` (the response) — an object you use to build and send the response back. It's also
  a **writable stream** — `res.end()` is how you finish sending it.
- `server.listen(port, callback)` — starts the server actually listening for incoming
  connections on that port (Chapter 2's ports, made concrete).

## Reading the method and path — manual routing

```javascript
const server = http.createServer((req, res) => {
  console.log(req.method, req.url); // e.g. "GET" "/tasks/17?foo=bar"

  if (req.method === "GET" && req.url === "/tasks") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify([{ id: 1, title: "Learn Node" }]));
  } else if (req.method === "POST" && req.url === "/tasks") {
    // handled below, once we can read the body
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});
```

Notice `req.url` gives you the raw path *and* query string together, unparsed — you'd use
Node's built-in `url` module (`new URL(req.url, "http://localhost")`) to split out the path
from query parameters properly (Chapter 17's `URLSearchParams`, on the server side this
time). There's no automatic routing at all here — every single path/method combination has
to be checked manually, which is exactly the tedious part Express exists to eliminate.

## Reading a request body — putting Chapter 28f's streams to work

This is the part that surprises people coming from the browser's `fetch()` (where
`response.json()` felt instant): **`req` is a stream, and its data arrives in chunks over
time**, so you must collect it yourself before you have anything usable:

```javascript
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // Buffer → string, chunk by chunk
    });
    req.on("end", () => {
      resolve(body); // all chunks collected — now it's a complete string
    });
    req.on("error", reject); // Chapter 28e's error-event convention
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/tasks") {
    const rawBody = await readBody(req);
    const task = JSON.parse(rawBody); // Chapter 9 — string → object

    res.statusCode = 201; // Chapter 5
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ id: 2, ...task }));
  }
});
```

Every framework that handles JSON bodies for you (Express, once you add its
`express.json()` middleware) is doing *exactly this* — collecting stream chunks, joining
them, and parsing the result — just hidden behind one line of setup.

## Sending proper error responses

```javascript
} else {
  res.statusCode = 404;                                    // Chapter 5
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Route not found" }));   // Chapter 8 — a real JSON error body
}
```

Nothing here is automatic — a raw Node server that isn't explicitly told to send a 404 for
an unmatched route will otherwise just hang (never calling `res.end()` at all leaves the
client waiting forever) or crash. Handling every possible path explicitly, including the
"nothing matched" fallback, is entirely your responsibility at this level.

## Why you're doing this manually, once

You are very unlikely to hand-write routing like this for a real project going forward —
Express (next) gives you `app.get("/tasks", handler)` and automatic JSON body parsing in a
couple of lines. The point of this chapter isn't "this is how you should build servers" —
it's that once you've felt the manual version, Express's shortcuts will make immediate
sense as *shortcuts*, rather than as new, separately-memorized magic.

## Hands-on Practice

**Build a small REST-style API with zero frameworks.**

1. Build the minimal server above and confirm you can hit it from a browser or `curl`.
2. Add manual routing for at least `GET /tasks`, `GET /tasks/:id`-style (you'll need to
   parse the id out of `req.url` yourself, since there's no automatic path-parameter
   support at this level), and `POST /tasks` using the `readBody` helper.
3. Add a `DELETE /tasks/:id` route returning `204` with no body (Chapter 5/7).
4. Add a catch-all `else` branch returning a proper JSON `404` for any unmatched
   method/path combination.
5. Test every route with a tool like `curl` or Postman, checking the status code, headers,
   and body against what you intended for each one.

## Completion Check

Why doesn't `req.body` just exist automatically the way it effectively does when you use
`fetch()`'s `response.json()` in the browser? What would happen if your server never called
`res.end()` for some unmatched route? After building this by hand, can you explain in one
sentence what a framework like Express is actually saving you from doing yourself?

---
Previous: [Chapter 28f — Streams & Buffers](28f-streams-buffers.md) · Next: **[Chapter 28h → Error Handling, Signals & Graceful Shutdown](28h-error-handling-graceful-shutdown.md)**
