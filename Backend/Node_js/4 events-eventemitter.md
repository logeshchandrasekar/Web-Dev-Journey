# Chapter 28e — Events & EventEmitter

## What You Must Understand

Node's event-driven architecture, the `EventEmitter` class, and how much of Node's own API
is secretly built on top of it.

## The Core Idea

A huge amount of what "using Node.js" actually means is **listening for named events and
reacting to them** — rather than calling a function and immediately getting a return value.
You've technically already been doing this since Chapter 28a's `fs.readFile` callback and
you'll do it constantly once you build servers — this chapter names the pattern properly and
shows you the class underneath it, `EventEmitter`.

## Building your own EventEmitter

```javascript
const EventEmitter = require("events");

class OrderSystem extends EventEmitter {}

const orders = new OrderSystem();

// Register listeners — "when this event happens, run this"
orders.on("orderPlaced", (order) => {
  console.log(`New order received: #${order.id} for $${order.total}`);
});

orders.on("orderPlaced", (order) => {
  // multiple listeners for the SAME event are completely normal — both run, in order added
  console.log("Sending confirmation email...");
});

orders.on("orderShipped", (order) => {
  console.log(`Order #${order.id} has shipped!`);
});

// Trigger the event, with any data you want to pass along
orders.emit("orderPlaced", { id: 1, total: 49.99 });
orders.emit("orderShipped", { id: 1 });
```

Output:
```
New order received: #1 for $49.99
Sending confirmation email...
Order #1 has shipped!
```

- **`.on(eventName, callback)`** — register a listener for a named event. You can register
  as many listeners as you want for the same event; all of them run, in the order they were
  added.
- **`.emit(eventName, ...args)`** — fire the event, running every registered listener
  synchronously, passing along whatever arguments you give it.
- **`.once(eventName, callback)`** — like `.on()`, but automatically removes itself after
  firing exactly one time — useful for something that should only ever be handled once (a
  one-time setup confirmation, for example).

## Why this matters: much of Node's own API is EventEmitter underneath

This isn't just a pattern you might choose to use — it's the actual foundation of core
Node.js objects you'll use constantly:

```javascript
const http = require("http");

const server = http.createServer(); // this object IS an EventEmitter

server.on("request", (req, res) => {
  res.end("Hello!");
});

server.listen(3000);
```

That `server.on("request", ...)` is *exactly* the same `.on()` you just used on your own
`OrderSystem` — `http.Server` extends `EventEmitter` internally. The shorthand
`http.createServer((req, res) => {...})` you may see elsewhere is just Node quietly
registering that function as the `"request"` listener for you. Streams (Chapter 28f) work
the same way — a readable stream emits `"data"`, `"end"`, and `"error"` events; you'll
recognize every one of them now as ordinary `EventEmitter` usage, not a separate mechanism
to learn.

## The special "error" event — a convention worth knowing

```javascript
const emitter = new EventEmitter();
emitter.emit("error", new Error("Something broke")); // CRASHES the process if unhandled!
```

`EventEmitter` treats the `"error"` event as special: if you `.emit("error", ...)` and
**no listener is registered for `"error"`**, Node throws the error and crashes the entire
process — a deliberate design choice, since a silently-ignored error event is considered too
dangerous to allow by default. Always register an `"error"` listener on anything that might
emit one:

```javascript
emitter.on("error", (err) => {
  console.log("Handled gracefully:", err.message);
});
```

## Removing listeners — avoiding memory leaks

```javascript
function handler(order) {
  console.log("Handling order", order.id);
}

orders.on("orderPlaced", handler);

// later, when you no longer need it:
orders.off("orderPlaced", handler); // or removeListener — same thing
```

If you keep adding listeners (especially inside a function that runs repeatedly) without
ever removing ones you no longer need, they accumulate forever — a real, common source of
memory leaks in long-running Node servers. Node even prints a warning by default once a
single event exceeds 10 listeners, specifically to help you notice this class of bug early.

## Hands-on Practice

**Build a custom EventEmitter-based system.**

1. Build the `OrderSystem` example above, with at least two events and multiple listeners
   on one of them.
2. Add a listener using `.once()` and confirm it only fires the first time you `.emit()`
   that event, even if you emit it multiple times.
3. Deliberately `.emit("error", ...)` with no `"error"` listener registered, and observe the
   process crash — then add a listener and confirm it now handles gracefully instead.
4. Create the raw `http.createServer()` example above, and add a *second* listener to the
   same `"request"` event (in addition to your normal request-handling one) that just logs
   something to the console every time a request comes in — confirm both run for every
   request, proving to yourself that this is ordinary multi-listener `EventEmitter`
   behavior, not special "server" behavior.

## Completion Check

What's the difference between `.on()` and `.once()`? Why does an unhandled `"error"` event
specifically crash the process, when other custom event names don't? Name two Node.js core
objects (besides your own custom one) that are actually `EventEmitter`s underneath, and
explain how you know.

---
