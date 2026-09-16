# Chapter 28a — Node.js Runtime & Modules

## What You Must Understand

What Node.js actually is, how it differs from JavaScript in the browser, and how to split
code across files using modules.

## The Core Idea

Every line of JavaScript you've written so far ran **inside a browser** —
which is why you had `document`, `window`, and `fetch()` available without importing
anything. **Node.js is a way to run the exact same JavaScript language outside a browser** —
on your own computer, or on a server — with a different set of built-in tools suited to
that environment instead.

Same language, same syntax, same `async`/`await`, same `JSON.parse()` — just a different
*environment* around it, with different things available by default.

## What's gone, and what's new, compared to browser JavaScript

| Browser gives you | Node.js gives you instead |
|----------------------|-------------------------------|
| `document`, `window`, DOM APIs | Nothing — there's no page to manipulate; Node has no browser at all |
| `fetch()` built in (Chapter 12) | Also built in, in modern Node versions — but now used for your *server* to call *other* APIs, not to talk to "the page's own server" |
| Can't read/write files on your computer (sandboxed for security) | Full file system access, via the built-in `fs` module |
| A single running page, tied to a browser tab | A long-running **process** — a program that keeps running continuously, the way a server needs to |
| No concept of environment variables | `process.env` — reads configuration from outside the code itself (Chapter 28c) |

The single biggest mental shift: browser JavaScript reacts to a user clicking around one
page. Node.js JavaScript is what actually *runs your server* — a program that starts once
and keeps running, handling request after request, for as long as it's kept alive.

## Running your first Node.js code

Once Node.js is installed (from nodejs.org), you don't need a browser at all — you run
files directly from a terminal:

```javascript
// hello.js
console.log("Hello from Node.js!");
const now = new Date();
console.log("The current time is:", now.toISOString());
```

```
node hello.js
```

`console.log` works identically to the browser console you've been using all along — that
part of JavaScript doesn't change at all between environments.

## Modules — splitting code across files

Real programs aren't one giant file. **Modules** let you split code into separate files and
explicitly choose what each file shares with others. Node.js supports two module systems —
knowing both, and recognizing which is which, matters because you'll see both in real
projects.

### CommonJS — Node's original, still extremely common system

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

```javascript
// app.js
const { add } = require("./math.js");
console.log(add(2, 3)); // 5
```

- `module.exports` — this file's way of saying "here's what I'm sharing with other files."
- `require(...)` — this file's way of saying "give me what that other file exported."

### ES Modules — the newer, standardized syntax (also usable in modern browsers)

```javascript
// math.js
export function add(a, b) {
  return a + b;
}
```

```javascript
// app.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

`export`/`import` is the same syntax you may already recognize from modern frontend
frameworks — Node.js supports it too, but requires a small config change to opt in (setting
`"type": "module"` in `package.json`, which Chapter 28b covers). **Don't mix the two systems
in one project** — pick CommonJS (`require`/`module.exports`) or ES Modules
(`import`/`export`) for a given project and stay consistent; the two are not directly
interchangeable within the same file.

## Why splitting into modules matters for what's coming next

Once you build an Express server (the next tracker topic), a real project is never one
giant file — you'll have separate files for routes, database logic, and configuration, each
exporting specific pieces the rest of the app imports. This chapter's `require`/`module.
exports` (or `import`/`export`) pattern is the exact mechanism that makes that separation
possible — it's not an abstract habit, it's the literal tool.

## Built-in (core) modules — no installation required

Node.js ships with modules already built in, ready to `require`/`import` with no setup:

```javascript
const fs = require("fs");        // file system — read/write files
const path = require("path");    // safely build file paths across operating systems
const http = require("http");    // Node's own raw HTTP server tools (Express, coming next, is built on top of this)
```

```javascript
// Reading a file synchronously (blocks until done — fine for small scripts/startup code)
const data = fs.readFileSync("notes.txt", "utf8");
console.log(data);

// Reading a file asynchronously (the pattern you'll actually use in a real server —
// doesn't block anything else while waiting, same async idea from Chapter 10/11)
fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Failed to read file:", err.message);
    return;
  }
  console.log(data);
});
```

Notice the async version uses an older **callback** style (`(err, data) => {...}`) rather
than a Promise — this is Node's original async pattern, predating the Promise-based style
you learned in Chapters 10–11. Many core modules also offer a Promise-based version now
(`require("fs/promises")`), which lets you use the `async`/`await` style you already know:

```javascript
const fs = require("fs/promises");

async function readNotes() {
  try {
    const data = await fs.readFile("notes.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log("Failed to read file:", error.message);
  }
}
```

## Hands-on Practice

**Write and run your first Node.js scripts, and split code into modules.**

1. Install Node.js and confirm it works by running `node --version` in a terminal.
2. Write and run a small script (like `hello.js` above) using `console.log`.
3. Split a small piece of logic (a couple of simple functions, like `add`/`subtract`) into
   a separate file, and `require()` (or `import`) them into a second file — confirm it runs
   correctly.
4. Use the built-in `fs` module to write a small text file to disk, then read it back and
   log its contents — try both the synchronous and the Promise-based (`fs/promises`) async
   version, and notice the difference in how you call each.

## Completion Check

In your own words, what's fundamentally different about the *environment* Node.js code
runs in, compared to browser code — even though the language is identical? What's the
difference between `require()`/`module.exports` and `import`/`export`, and why shouldn't you
mix them in one project? Why might a core module offer both a callback-style and a
Promise-based version of the same function?
