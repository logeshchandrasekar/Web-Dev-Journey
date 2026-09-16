# Chapter 28j — Testing & Debugging Node.js Applications

## What You Must Understand

Writing automated tests instead of only checking things manually, and using real debugging
tools instead of only `console.log`.

## The Core Idea

Everything in this book so far has been verified by running code and reading the output
yourself. That works while learning, but doesn't scale to a real project — you can't
manually re-check every function every time you change something. **Automated tests** check
your code for you, every time, in seconds. This chapter also covers debugging *properly*
once `console.log` isn't enough to find a problem.

## Node's built-in test runner — no installation required

Modern Node.js ships with a test runner built in — genuinely useful for learning, since you
don't need to install anything to start:

```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };
```

```javascript
// math.test.js
const { test } = require("node:test");
const assert = require("node:assert");
const { add } = require("./math.js");

test("add() sums two positive numbers", () => {
  assert.strictEqual(add(2, 3), 5);
});

test("add() handles negative numbers", () => {
  assert.strictEqual(add(-1, -1), -2);
});
```

```
node --test
```

Node finds every `*.test.js` file, runs each `test(...)` block, and reports which passed
and failed — no framework, no configuration, built directly into the `node` command itself.

## Jest — the framework you'll see far more often in real jobs

Node's built-in runner is genuinely capable, but **Jest** (`npm install --save-dev jest` —
Chapter 28b) is overwhelmingly the most common testing tool in real-world Node/React
projects, and worth recognizing even if you start with the built-in runner:

```javascript
// math.test.js (Jest version — notice: no imports needed for test()/expect(), Jest provides them globally)
const { add } = require("./math.js");

test("add() sums two positive numbers", () => {
  expect(add(2, 3)).toBe(5);
});

describe("add()", () => {
  it("handles negative numbers", () => {
    expect(add(-1, -1)).toBe(-2);
  });
});
```

`describe`/`it` is purely organizational — grouping related tests together with a readable
label; a bare `test(...)` (as in the first example) works exactly the same way without the
grouping. `expect(...).toBe(...)` is Jest's assertion style, slightly more readable than
`assert.strictEqual`, and one of the biggest reasons Jest became the default choice.

## What to actually test — a starting rule of thumb

You don't need 100% coverage of every line to get real value. As a starting discipline:

- **Pure functions** (same input always gives the same output, no side effects) are the
  easiest and most valuable to test — Chapter 28a's `add()` example, any data
  transformation or validation logic.
- **Edge cases**, not just the happy path: what does your function do with `0`, a negative
  number, an empty array, `null`? These are exactly the inputs that break code silently in
  production and never get manually re-checked once a feature "seems to work."
- Once you build a real API (Express, next), you'll also test **routes themselves** —
  sending a fake request and checking the response's status code and body match what
  Chapter 5/18 say they should.

## Debugging beyond `console.log`

`console.log` is fine for quick checks, but two things scale much better once bugs get
subtle:

```javascript
console.table([{ id: 1, name: "Alex" }, { id: 2, name: "Sam" }]); // readable table output, instead of a wall of objects
console.error("Something specifically wrong happened"); // separates errors from normal logs, some tools color/filter these differently
```

For real step-by-step debugging — pausing execution, inspecting variables, stepping line by
line — Node has a built-in inspector:

```
node --inspect index.js
```

This opens a debugging port you can connect to from Chrome (visit `chrome://inspect`) or
directly from VS Code's built-in debugger (set breakpoints right in your editor, then run
"Start Debugging"). Both let you pause execution at a specific line, inspect every variable
in scope at that exact moment, and step forward one line at a time — dramatically faster
than guessing where to place the next `console.log` and re-running.

## Hands-on Practice

**Write tests and debug with real tools.**

1. Using Node's built-in `node:test` runner, write at least 4 tests for a small module you
   already built earlier in this book (Chapter 28a/28b's `add`/`subtract` functions are a
   fine choice) — include at least one edge case (zero, a negative number).
2. Install Jest and rewrite the same tests in Jest's style, comparing the two.
3. Deliberately introduce a bug into your function (e.g. an off-by-one error) and confirm
   your tests catch it — a test suite that never actually catches a real bug hasn't been
   verified to work correctly itself.
4. Run any of your Chapter 28g HTTP server code with `node --inspect`, connect via
   `chrome://inspect` or VS Code, set a breakpoint inside your route handler, and step
   through a request line by line, inspecting `req.method` and `req.url` at the breakpoint.

## Completion Check

Why are pure functions easier to test than functions with side effects? Why is testing only
the "happy path" not enough, and what kind of inputs should you deliberately test instead?
What can a real debugger (via `--inspect`) do that `console.log` alone cannot? Why is it
worth deliberately breaking your own code once, after writing tests for it?

---
Previous: [Chapter 28i — Child Processes, Worker Threads & Clustering](28i-child-processes-worker-threads-cluster.md) · **[Back to Index](00-index.md)**

## Node.js Deep Dive complete 🎉 (28a through 28j)

You've now gone well past your tracker's "Node.js Fundamentals" row — you understand *why*
Node behaves the way it does (the event loop), its core architectural pattern
(EventEmitter), how it handles data at scale (streams), what a framework is actually doing
for you (building a server by hand), how production apps stay resilient (error handling and
graceful shutdown), how to escape the single-thread limit when you truly need to, and how to
verify your own code automatically instead of only by eye. That's a genuinely confident,
full picture of Node.js itself.

Your tracker continues into **Express.js Fundamentals** next — and everything in this deep
dive (especially Chapter 28g's raw server and 28e's EventEmitter pattern) will make Express
feel like a shortcut for work you already understand, not new magic. Ask for "the next
chapters" whenever you're ready to continue.
