# Chapter 11 — async/await & try/catch

## What You Must Understand

Asynchronous flow, awaiting promises, handling errors.

## The Core Idea

`async`/`await` is not a *different* system from Promises (Chapter 10) — it's syntax sugar
that lets you write Promise-based code so it *reads* like ordinary top-to-bottom code,
instead of a chain of `.then()` calls. Everything you learned about pending/fulfilled/
rejected still applies underneath; only the way you write it changes.

## The rewrite, side by side

Recall the chained version from Chapter 10:

```javascript
fetch("https://api.example.com/products/42")
  .then(response => response.json())
  .then(data => {
    console.log("Product name:", data.name);
  })
  .catch(error => {
    console.log("Failed:", error);
  });
```

The exact same behavior, written with `async`/`await`:

```javascript
async function getProduct() {
  try {
    const response = await fetch("https://api.example.com/products/42");
    const data = await response.json();
    console.log("Product name:", data.name);
  } catch (error) {
    console.log("Failed:", error);
  }
}
```

Two rules make this work:

1. **`await` can only be used inside a function marked `async`.** It pauses execution of
   *that function* (not the whole program) until the Promise settles, then hands you the
   resolved value directly — no `.then()` needed.
2. **`try`/`catch` replaces `.catch()`.** Since `await` "unwraps" a Promise into a plain
   value, a rejected Promise now throws like a regular error — which is exactly what
   `try`/`catch` is built to catch.

## Why this isn't "blocking" the way it looks

Reading `await fetch(...)` might look like it freezes the whole page while waiting. It
doesn't — it only pauses *that async function*, and control goes back to the rest of your
program in the meantime (this is the same non-blocking behavior Promises always had;
`async`/`await` just hides the `.then()` machinery visually).

## Sequential vs parallel awaits — a real gotcha

```javascript
// Sequential — each waits for the previous to finish before starting the next
const user = await fetch("/users/1").then(r => r.json());
const posts = await fetch("/posts?user=1").then(r => r.json());
// Total time ≈ time(user) + time(posts)

// Parallel — both requests fire at the same time
const [user, posts] = await Promise.all([
  fetch("/users/1").then(r => r.json()),
  fetch("/posts?user=1").then(r => r.json())
]);
// Total time ≈ max(time(user), time(posts))
```

If the second request doesn't depend on the first one's result, awaiting them one after
another wastes time. `Promise.all()` runs independent requests concurrently — a detail that
separates "this works" code from "this is actually well-written" code.

## Error handling nuance

A `try`/`catch` around an `await` catches **both** a rejected Promise *and* a regular thrown
error in that block — which is why it's the natural pairing. Without it, an unhandled
rejection inside an `async` function silently produces a rejected Promise that nothing
deals with (visible in the console as an "Uncaught (in promise)" warning).

## Hands-on Practice

**Rewrite promise chains using async/await.**

1. Take the Chapter 10 exercise (your `setTimeout`-based Promise with `.then()`/`.catch()`)
   and rewrite it as an `async` function using `await` and `try`/`catch`.
2. Write a function that awaits two independent fake API calls (two separate
   `setTimeout`-based Promises) sequentially, and time how long it takes (console.time /
   console.timeEnd).
3. Rewrite it using `Promise.all()` and compare the timing.
4. Deliberately make one Promise reject and confirm your `catch` block runs instead of the
   rest of the function.

## Completion Check

Without notes: what does `await` actually do to a Promise? Why does `try`/`catch` replace
`.catch()` in this style? When would you reach for `Promise.all()` instead of awaiting
things one at a time?

---
