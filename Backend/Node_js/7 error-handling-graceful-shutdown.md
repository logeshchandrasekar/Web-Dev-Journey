# Chapter 28h — Error Handling, Signals & Graceful Shutdown

## What You Must Understand

Handling errors that escape a local `try`/`catch`, and shutting a running server down
cleanly instead of abruptly.

## The Core Idea

Chapter 11 taught `try`/`catch` for errors you're actively expecting, right where they
happen. But a real, long-running server inevitably has errors that slip past every local
`try`/`catch` — a bug you didn't anticipate, a Promise rejection nobody attached a
`.catch()` to. This chapter covers what happens at the very edge of your program when that
occurs, and how to shut a server down properly rather than just killing it.

## The two process-level safety nets

```javascript
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  // log it somewhere durable, then shut down — see below for why
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  process.exit(1);
});
```

- **`uncaughtException`** — fires when a *synchronous* error is thrown and nothing, all the
  way up the call stack, caught it.
- **`unhandledRejection`** — fires when a Promise rejects (Chapter 10) and nothing ever
  attached a `.catch()` (or an `await` inside a `try`/`catch`) to handle it.

## Why the "correct" response is usually to log and exit, not to keep running

This surprises people at first: shouldn't you just catch it and continue? In most real
systems, the answer is **no** — once an error has reached this point, your program's
internal state might be in an unknown, corrupted condition (a half-finished operation, a
connection left in a bad state). Continuing to run risks silently corrupting data or
serving wrong responses to *future*, unrelated requests. The standard practice is: **log
the error somewhere durable, then exit the process deliberately** (`process.exit(1)` — a
non-zero exit code conventionally signals "this ended due to an error"), and let something
else — a process manager, discussed below — restart it fresh.

## Exit codes — a small detail worth knowing

```javascript
process.exit(0); // success
process.exit(1); // generic error
```

`0` conventionally means "ended successfully," and any non-zero number means "ended due to
some kind of error" — this matters because deployment tools, process managers, and CI/CD
pipelines (which you'll encounter later in your broader learning path) check this exact
number to decide whether to restart your app, mark a deployment as failed, or move on.

## Handling shutdown signals — SIGINT and SIGTERM

When you press Ctrl+C in a terminal, or when a hosting platform stops your app during a
deployment, Node.js receives a **signal** — a standardized way operating systems tell a
process "please stop." Listening for these lets you clean up before actually exiting,
instead of being cut off mid-operation:

```javascript
const server = http.createServer(/* ... */);
server.listen(3000);

function shutdown() {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("No longer accepting new connections. Existing requests finished.");
    // e.g. close a database connection pool here too, once you reach Postgres integration
    process.exit(0);
  });

  // safety net: force-exit if cleanup takes too long
  setTimeout(() => {
    console.log("Forcing shutdown after timeout");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGINT", shutdown);  // Ctrl+C
process.on("SIGTERM", shutdown); // sent by process managers / hosting platforms when stopping your app
```

`server.close()` stops accepting **new** connections immediately, but lets any
**in-progress** requests finish naturally before its callback runs — this is what
"graceful" means here: nobody's active request gets abruptly cut off just because you're
deploying a new version or restarting the process. Once you reach the PostgreSQL
integration phase of your roadmap, this exact shutdown hook is also where you'd properly
close your database connection pool, rather than leaving connections dangling.

## Why real deployments use a process manager, not raw `node app.js`

Given that a genuinely unexpected error should end the process (as discussed above), a real
running server needs *something* watching it to automatically restart it the moment it
exits unexpectedly — you don't want one uncaught bug taking your entire app offline
permanently until someone notices and manually restarts it. Tools like `pm2`, or the
restart policies built into most hosting platforms and container orchestrators, exist
specifically for this: they watch the process's exit code, and if it exited with an error
(non-zero), immediately start a fresh instance. You won't need to configure this yet, but
recognizing *why* production Node apps are essentially never run as a bare `node app.js`
long-term is worth understanding now.

## Hands-on Practice

**Handle process-level errors and shutdown signals.**

1. Register `uncaughtException` and `unhandledRejection` handlers that log the error and
   call `process.exit(1)`.
2. Deliberately throw an error with nothing catching it (outside any `try`/`catch`) and
   confirm your `uncaughtException` handler runs before the process exits.
3. Deliberately create a rejected Promise with no `.catch()` anywhere and confirm your
   `unhandledRejection` handler catches it instead.
4. Build the `server.close()`-based graceful shutdown handler above on a small HTTP server,
   start a slow request (add an artificial delay in one route), then press Ctrl+C
   immediately after starting that request — confirm the server finishes that one request
   before actually exiting, rather than cutting it off.

## Completion Check

Why is "log the error and exit" usually the *correct* response to an uncaught exception,
rather than trying to keep the process running? What's the practical difference between
`SIGINT` and `SIGTERM`, and why do you need to handle both? What does `server.close()`
actually do to in-progress requests versus new incoming ones? Why do real deployments run
Node behind a process manager instead of a bare `node app.js`?

---
