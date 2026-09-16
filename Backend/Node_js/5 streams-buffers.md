# Chapter 28f — Streams & Buffers

## What You Must Understand

Processing data in chunks instead of all at once, the four stream types, and what a
`Buffer` actually is.

## The Core Idea

Chapter 28a's `fs.readFile()` loads an **entire file into memory** before giving it to you.
That's fine for a small config file — but reading a 4GB video file that way would try to
hold all 4GB in memory at once, which is often simply impossible. **Streams** solve this by
processing data in small chunks, as it arrives, instead of waiting for the whole thing.

## Buffer — what raw binary data looks like in Node

Before streams make sense, you need to know what flows through them: a **`Buffer`** is
Node's representation of raw binary data — a fixed-length sequence of bytes, distinct from
a JavaScript string:

```javascript
const buf = Buffer.from("Hello");
console.log(buf);              // <Buffer 48 65 6c 6c 6f> — the raw byte values, in hex
console.log(buf.toString());   // "Hello" — converted back to a readable string
console.log(buf.length);       // 5 — byte length, not always the same as character count for non-English text
```

Every stream you read from a file, network socket, or process is a stream of `Buffer`
chunks by default — text is just one common way of interpreting those bytes.

## Reading a large file the memory-heavy way vs the streaming way

```javascript
const fs = require("fs");

// Loads the ENTIRE file into memory before you get anything back
const data = fs.readFileSync("huge-video.mp4");
console.log(data.length); // works, but the whole file sat in RAM to get here
```

```javascript
const fs = require("fs");

// Processes the file in small chunks, one at a time, as they become available
const readStream = fs.createReadStream("huge-video.mp4");

readStream.on("data", (chunk) => {
  console.log(`Received a chunk of ${chunk.length} bytes`);
});

readStream.on("end", () => {
  console.log("Finished reading the whole file");
});

readStream.on("error", (err) => {
  console.log("Something went wrong:", err.message); // Chapter 28e's error-event convention
});
```

Notice `.on("data", ...)` and `.on("end", ...)` — a readable stream **is an `EventEmitter`**
(Chapter 28e), emitting `"data"` for every chunk and `"end"` once there's no more. Only one
small chunk is ever in memory at a time, regardless of how large the whole file is.

## The four stream types

| Type | Direction | Example |
|------|------------|-----------|
| **Readable** | Data flows *out* of it, to you | `fs.createReadStream()`, an incoming HTTP request body |
| **Writable** | Data flows *into* it, from you | `fs.createWriteStream()`, an outgoing HTTP response |
| **Duplex** | Both directions, independently | A network socket — you can read and write on the same connection |
| **Transform** | Duplex, but output is a modified version of the input | A gzip compressor — data goes in uncompressed, comes out compressed |

## `.pipe()` — connecting a readable directly to a writable

```javascript
const fs = require("fs");

const readStream = fs.createReadStream("source.txt");
const writeStream = fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);
// that's it — copies the file, one chunk at a time, without ever loading it all into memory
```

`.pipe()` handles reading chunks from the source and writing them to the destination
automatically, including one crucial detail beginners rarely think about on their own:
**backpressure**.

## Backpressure — why `.pipe()` matters, not just convenience

Imagine the readable side (a fast local disk) produces data much faster than the writable
side (a slow network connection) can accept it. Without any coordination, chunks would pile
up in memory faster than they drain — potentially exhausting all available memory on a
large enough transfer. `.pipe()` automatically pauses the readable side whenever the
writable side signals it's overwhelmed, and resumes it once the writable side catches up.
Manually reading `"data"` events and writing them yourself (rather than using `.pipe()`)
means you'd have to implement this pausing/resuming logic correctly yourself — a genuinely
easy thing to get wrong, and exactly why `.pipe()` (or the `stream/promises` `pipeline()`
helper for more complex chains) is strongly preferred over manual chunk handling whenever
it's available.

## Why this matters for what's coming next

An incoming HTTP request body (Chapter 28g's raw `http` server, and later Express) **is a
readable stream** — this is precisely why reading a POST body in vanilla Node requires
listening for `"data"` and `"end"` events rather than just getting a value immediately, the
way `response.json()` in Chapter 12's browser-side Fetch API felt. An outgoing HTTP response
**is a writable stream** — which is why sending a large file as a response is done with
`.pipe()` directly into `res`, rather than reading the whole thing into memory first.

## Hands-on Practice

**Work with streams for file operations.**

1. Create a reasonably large text file (a few MB — repeat some text into it many times if
   needed) and read it with both `fs.readFileSync()` and `fs.createReadStream()`, logging
   memory usage (`process.memoryUsage().heapUsed`) around each to compare.
2. Copy a file using `.pipe()` from a read stream to a write stream, and confirm the copy is
   identical to the original.
3. Look up and use Node's built-in `zlib` module's `createGzip()` (a Transform stream) to
   pipe a file through compression on its way to a new `.gz` file:
   `readStream.pipe(zlib.createGzip()).pipe(writeStream)` — notice how streams chain
   together.
4. Manually listen for `"data"` and `"end"` events on a readable stream (instead of using
   `.pipe()`) and build up the full content yourself in a variable — this is the exact
   pattern you'll use to read a request body manually in Chapter 28g.

## Completion Check

Why does `fs.createReadStream()` use much less memory than `fs.readFileSync()` for a large
file? What is a `Buffer`, and how is it different from a JavaScript string? What problem
does `.pipe()`'s automatic backpressure handling solve, and what could go wrong if you
handled chunks manually without it? Why is an incoming HTTP request body a readable stream
rather than a value you get immediately?

---
Previous: [Chapter 28e — Events & EventEmitter](28e-events-eventemitter.md) · Next: **[Chapter 28g → Building an HTTP Server From Scratch](28g-http-server-from-scratch.md)**
