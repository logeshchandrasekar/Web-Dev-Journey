# Chapter 28d — The Event Loop & Asynchronous I/O

## What You Must Understand

Why Node.js is single-threaded yet handles thousands of concurrent connections, and the
actual order in which asynchronous code runs.

## The Core Idea

This is the single most important concept for genuinely understanding Node.js, rather than
just using it. **JavaScript itself runs on one thread — one call stack, doing one thing at a
time.** Yet a Node.js server can handle thousands of simultaneous connections without
freezing. The **event loop** is the mechanism that makes both of those things true at once.

## The call stack, and what happens when something "waits"

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

console.log("End");
```

Output:
```
Start
End
Timeout callback
```

Even with a `0` millisecond delay, "Timeout callback" runs *last*. Here's why:

1. `console.log("Start")` runs immediately — pushed onto the call stack, runs, pops off.
2. `setTimeout(...)` is handed off to a Node/browser API *outside* JavaScript's single
   thread entirely — it's not "waiting" on the call stack at all. Node registers the timer
   and immediately moves on.
3. `console.log("End")` runs immediately — the call stack was free the whole time.
4. Only once the call stack is completely empty does the event loop check whether any
   handed-off work has finished. The timer (even a 0ms one) has, so its callback is placed
   on a queue and finally executed.

This is the whole trick: anything that would otherwise force JavaScript to sit and wait
(timers, file reads, network requests, database queries) gets handed off to be done
elsewhere, and JavaScript's single thread keeps running other code in the meantime. The
event loop's job is to keep checking "has any handed-off work finished? If so, run its
callback now that the stack is free."

## Two separate queues, and why order isn't always "first scheduled, first run"

```javascript
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

Output:
```
Start
End
Promise
setTimeout
```

Promises and `setTimeout` don't share one queue — Promises (and `async`/`await`, since
Chapter 11 showed `async` functions are Promise-based underneath) go into the **microtask
queue**, while `setTimeout`/`setInterval` callbacks go into a **macrotask queue** (also
called the "callback queue" or, more precisely, split further into per-phase queues inside
Node). **The entire microtask queue is always fully drained before the event loop moves on
to the next macrotask** — which is why the Promise callback above wins, even though the
`setTimeout` was scheduled first, and even with a 0ms delay.

`process.nextTick()` (Node-specific, not available in browsers) jumps the queue even ahead
of regular microtasks — it runs before any Promise callback, every single time. You'll see
it in some library internals; you rarely need to reach for it yourself, but recognizing it
in code you read is worth having.

## Why this matters practically: I/O-bound vs CPU-bound work

Node.js is excellent at **I/O-bound** work — waiting on network requests, file reads,
database queries — precisely because "waiting" doesn't block the single thread; the actual
waiting happens outside JavaScript (in the OS, via a library called libuv), and the thread
is free to serve other requests in the meantime. This is *why* a single Node process can
comfortably handle thousands of concurrent HTTP requests that are each mostly just waiting
on a database.

Node is *not* naturally good at **CPU-bound** work — a genuinely heavy calculation (image
processing, complex math, sorting a huge array) occupies the one and only thread completely,
and nothing else — no other request, no timer, nothing — can run until it finishes:

```javascript
function blockEverything() {
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // deliberately burn 5 seconds doing nothing async at all
  }
}

console.log("Before");
blockEverything(); // the ENTIRE process freezes for 5 full seconds — every request, every timer
console.log("After");
```

If this ran inside a real server, **every single connected user** would be frozen for those
5 seconds, not just whoever triggered it — there's no "other thread" quietly handling
everyone else. This is exactly the problem Chapter 28i's Worker Threads and Cluster module
exist to solve — genuinely CPU-heavy work needs to be moved off Node's one main thread
entirely, not just wrapped in a Promise (wrapping synchronous, CPU-bound code in a Promise
does *not* make it non-blocking — it's still running on the same single thread underneath).

## Hands-on Practice

**Predict, then verify, execution order.**

1. Write a script mixing `console.log`, `setTimeout(..., 0)`, `Promise.resolve().then(...)`,
   and `process.nextTick(...)` — predict the exact output order on paper first, then run it
   and check yourself. Repeat with a different arrangement until your predictions are
   consistently correct.
2. Write the deliberately blocking `while` loop example above inside a tiny raw `http`
   server (a preview of Chapter 28g) that also has a completely separate, fast route. Hit
   the blocking route from one browser tab, and the fast route from another tab
   *immediately after* — confirm the fast route also hangs until the blocking one finishes,
   proving the single-thread claim concretely rather than just conceptually.
3. Replace the blocking `while` loop with an equivalent amount of work done via repeated
   `setTimeout`-chained steps instead, and confirm the *other* route now responds
   immediately — demonstrating that yielding back to the event loop periodically, even for
   "slow" work, keeps the server responsive.

## Completion Check

In your own words, why does a `setTimeout(..., 0)` callback never run immediately, even
though the delay is zero? What's the practical difference between the microtask queue and
the macrotask queue, and which one fully drains first? Why is Node.js well-suited to
I/O-bound work but poorly suited to heavy CPU-bound work on its own, and what does that
imply about wrapping a slow synchronous loop in a Promise?

---
