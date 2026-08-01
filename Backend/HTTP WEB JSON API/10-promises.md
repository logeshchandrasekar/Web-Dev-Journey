# Chapter 10 — Promises

## What You Must Understand

Pending, fulfilled, rejected states and promise chaining.

## The Core Idea

Network requests take time — sometimes milliseconds, sometimes seconds. JavaScript can't
just *stop and wait* for a response (that would freeze the whole page). A **Promise** is an
object that represents "a value I don't have yet, but will have eventually (or it'll fail
trying)."

Think of it like a food delivery tracking number: you don't have the food yet, but you have
something (the tracking number) that represents the food's eventual arrival — or the order
getting cancelled.

## The three states

A Promise is always in exactly one of these states:

| State | Meaning |
|-------|---------|
| **Pending** | Still waiting — the operation hasn't finished yet |
| **Fulfilled** | Succeeded — the value is now available |
| **Rejected** | Failed — an error occurred instead |

Once a Promise moves to fulfilled or rejected, it's **settled** — it can never change state
again. This is exactly why it maps so cleanly onto HTTP requests: pending = request in
flight, fulfilled = response received successfully, rejected = network error / request
failed.

## Basic syntax

```javascript
const promise = fetch("https://api.example.com/products/42");
// `promise` is pending right now — fetch hasn't finished yet

promise
  .then(response => {
    // runs only if the promise is fulfilled
    console.log("Got a response!", response);
  })
  .catch(error => {
    // runs only if the promise is rejected
    console.log("Something went wrong:", error);
  });
```

- **`.then(callback)`** — runs `callback` when the Promise fulfills, with the resolved value.
- **`.catch(callback)`** — runs `callback` when the Promise rejects, with the error.

## Chaining — the part that looks confusing at first

`.then()` itself **returns a new Promise**, which is what lets you chain multiple async
steps in sequence, each waiting for the previous one:

```javascript
fetch("https://api.example.com/products/42")
  .then(response => response.json())   // parse the body (Chapter 9's JSON.parse, done for you)
  .then(data => {
    console.log("Product name:", data.name);
    return data.price;                  // whatever you return here becomes the next .then's input
  })
  .then(price => {
    console.log("Price was:", price);
  })
  .catch(error => {
    // catches an error from ANY step above — fetch failing, .json() failing, or your own code throwing
    console.log("Failed somewhere in the chain:", error);
  });
```

Read this top to bottom as a sequence of steps, each one waiting on the last: fetch → parse
JSON → use the data → use it again → (or, if anything failed anywhere above, jump straight
to catch).

## A common trap: forgetting `.json()` is also async

`response.json()` itself returns a Promise (parsing a large body takes a moment too) — it's
not instant. That's why it needs its own `.then()`, rather than just writing
`response.json().name` directly. This exact gotcha is one of the most common beginner bugs
with Fetch, which is coming up right after this book.

## Why Promises matter beyond just Fetch

Promises aren't only for HTTP — any operation that takes unpredictable time (reading a
file, waiting on a timer, a database query) tends to be represented as a Promise in modern
JavaScript. Once this "pending → fulfilled/rejected" mental model is solid, it applies
everywhere, not just to network calls.

## Hands-on Practice

**Write small promise-based exercises.**

1. Write a function using `new Promise((resolve, reject) => { ... })` that resolves with a
   value after a `setTimeout` of 1 second (simulating a slow network call).
2. Chain a `.then()` onto it to log the resolved value.
3. Modify it to `reject(...)` instead under some condition, and add a `.catch()` to handle
   it — confirm your `.then()` is skipped and `.catch()` runs instead.
4. Chain three `.then()` calls in a row, each depending on the previous one's return value,
   and trace through in your head (then verify) what order the logs print in.

## Completion Check

Can you name the three Promise states and what causes each transition? Can you explain,
without notes, why `.then()` chaining works — i.e. why you can attach another `.then()`
after the first one?

---

## Chapters 1–10 done 🎉

That's the entire **Web Foundations + HTTP + Data Format** section of your roadmap. Next:
**async/await**, then the **Fetch API** — where all ten of these chapters click together
into actual working code.
