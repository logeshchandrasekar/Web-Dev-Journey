# Chapter 28c — Environment Variables & Project Structure

## What You Must Understand

Configuration outside your code, keeping secrets out of version control, and how a real
Node.js project is typically organized.

## The Core Idea

Your code so far has had every value written directly into it — a database password, an API
key, which port to run on. That's fine for a learning script, but it creates a real problem
the moment code is shared, deployed, or version-controlled: **secrets baked into source code
end up visible to everyone who can read that code** — including anyone who ever sees your
GitHub repository. **Environment variables** solve this by keeping configuration values
*outside* the code entirely, supplied by whatever is running the program instead.

## Reading environment variables with `process.env`

```javascript
console.log(process.env.PORT);       // whatever the PORT variable is currently set to, or undefined
console.log(process.env.NODE_ENV);   // commonly "development" or "production"
```

`process` is a global object Node.js provides automatically (no `require` needed) — it's
part of the "different environment" story from Chapter 28a. `process.env` is just a plain
object holding whatever variables were set in the environment the process is running in.

## Setting them directly, and why that's inconvenient

```
PORT=3000 node index.js
```

This works, but typing environment variables by hand every time you start your app doesn't
scale — especially once you have five or six of them (database URL, API keys, secrets).

## The `.env` file pattern, with the `dotenv` package

```
# .env
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/mydb
JWT_SECRET=some-long-random-string
```

```javascript
// at the very top of your entry file
require("dotenv").config();

console.log(process.env.PORT);         // "3000"
console.log(process.env.DATABASE_URL); // the full connection string
```

`dotenv` (installed via `npm install dotenv` — Chapter 28b) reads your `.env` file and
copies its values into `process.env` automatically, so the rest of your code just reads
`process.env.WHATEVER` without caring whether the value came from a `.env` file or was set
some other way.

## The single most important rule in this chapter: `.env` never goes in Git

```
# .gitignore
node_modules/
.env
```

Your `.env` file contains real secrets — database passwords, API keys, tokens. Committing
it to a public (or even private) Git repository permanently exposes those secrets — anyone
with repository access (or, if the repo is ever made public, literally anyone) can read
them, and simply deleting the file in a later commit does **not** remove it from Git's
history. This is such a common and damaging mistake in real-world development that
essentially every Node.js project's `.gitignore` excludes `.env` from day one, before a
single secret is ever added to it.

## `.env.example` — sharing structure without sharing secrets

Since `.env` itself never gets committed, teams commonly commit a companion file instead:

```
# .env.example
PORT=3000
DATABASE_URL=
JWT_SECRET=
```

This shows anyone cloning the project *which* variables are needed, without revealing any
actual values — they copy it to their own local `.env` and fill in their own real secrets.

## Environment-specific behavior — why `NODE_ENV` matters

```javascript
if (process.env.NODE_ENV === "production") {
  // less verbose logging, stricter error messages shown to users
} else {
  // detailed error messages and debug logging, safe for local development
}
```

Many libraries (including Express, your next topic) automatically change behavior based on
`NODE_ENV` — for example, showing full error stack traces during development but hiding
those same internal details from real users once `NODE_ENV=production`, since exposing
internal error details publicly can itself be a security risk.

## A typical real-project folder structure — a preview for what's next

You don't need to build this yet, but recognizing it in advance will make Express (your
next tracker topic) click faster:

```
my-project/
├── node_modules/       (never committed — Chapter 28b)
├── .env                (never committed — this chapter)
├── .env.example        (committed — shows what's needed)
├── .gitignore
├── package.json
├── package-lock.json
└── src/
    ├── index.js         (entry point — starts the server)
    ├── routes/           (one file per resource's endpoints — Chapter 15's URL design, in code)
    ├── controllers/      (the actual logic behind each route)
    └── config/           (database connection setup, environment loading)
```

Every earlier chapter maps onto a piece of this: `routes/` is where Chapter 15's
resource-based paths and Chapter 4's HTTP methods become real code; `controllers/` is where
your CRUD logic (Chapter 18) actually lives; `config/` is where this chapter's environment
variables get loaded and organized.

## Hands-on Practice

**Set up environment-based configuration for a project.**

1. In a Node.js project (reuse the one from Chapter 28b), create a `.env` file with at
   least a `PORT` and one fake "secret" value.
2. Install `dotenv`, load it at the top of a script, and log `process.env.PORT` to confirm
   it's being read correctly.
3. Create a `.gitignore` file that excludes `node_modules/` and `.env`, and a companion
   `.env.example` listing the same variable *names* with empty values.
4. Write a small conditional using `process.env.NODE_ENV` that logs a different message
   depending on whether it's set to `"development"` or `"production"` — then actually test
   both by running your script with `NODE_ENV=production node yourscript.js` and without it.
5. Sketch out (folders and empty files are enough — no real code needed yet) a
   `routes/`/`controllers/`/`config/` structure for a small Task API, based on the CRUD
   endpoints you designed back in Chapter 18.

## Completion Check

Why is hardcoding a database password directly in your source code a real security problem,
even in a private repository? What does the `dotenv` package actually do? Why is `.env.
example` committed to Git while `.env` itself never is? What's the practical purpose of
`NODE_ENV`, and how might a real library change its behavior based on it?

## Node.js Fundamentals done

You now know how JavaScript runs outside the browser, how to bring in and manage
third-party packages, and how to configure an app safely without hardcoding secrets. That
covers your tracker's "Node.js Fundamentals" row completely — but you asked to go further
than the fundamentals, so next comes a deep dive (28d–28j) into the event loop, streams,
building a server by hand, error handling, concurrency beyond one thread, and testing —
everything needed to say you genuinely know Node.js, not just its basics.
