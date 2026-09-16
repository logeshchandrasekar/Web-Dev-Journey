# Chapter 28i — Child Processes, Worker Threads & Clustering

## What You Must Understand

The three ways Node.js escapes its single-thread limitation (Chapter 28d) for different
kinds of heavy work.

## The Core Idea

Chapter 28d established the core limitation: Node's JavaScript runs on **one thread**, so a
genuinely CPU-heavy task blocks everything else. This chapter covers Node's three distinct
answers to "then how do real apps handle heavy work?" — each solving a different version of
the problem.

## 1. Child Processes — running something else entirely

`child_process` lets Node start a completely separate program (a shell command, a Python
script, another Node script) and communicate with it:

```javascript
const { exec } = require("child_process");

exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }
  console.log("Output:", stdout);
});
```

```javascript
const { spawn } = require("child_process");

const child = spawn("node", ["some-other-script.js"]);

child.stdout.on("data", (data) => {
  console.log(`Child output: ${data}`); // notice this is a stream — Chapter 28f
});

child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});
```

`exec` is simpler and buffers the entire output before giving it to you (fine for short
commands); `spawn` streams output as it happens (better for long-running processes or large
output). Use this whenever you need to run something that **isn't JavaScript at all** — a
system command, an image-processing binary, a script in another language — or when you
want complete process-level isolation.

## 2. Worker Threads — true parallelism, within the same program

`worker_threads` lets you run actual JavaScript on a genuinely separate thread, specifically
for CPU-heavy *JavaScript* computation (not for I/O — you don't need this for database
calls or file reads, which are already non-blocking via the event loop from Chapter 28d):

```javascript
// worker.js
const { parentPort, workerData } = require("worker_threads");

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const count = workerData.numbers.filter(isPrime).length;
parentPort.postMessage(count);
```

```javascript
// main.js
const { Worker } = require("worker_threads");

function runInWorker(numbers) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData: { numbers } });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

console.log("Starting heavy calculation in a worker...");
const bigArray = Array.from({ length: 5_000_000 }, (_, i) => i);

runInWorker(bigArray).then((primeCount) => {
  console.log(`Found ${primeCount} primes`);
});

console.log("This logs immediately — the main thread was never blocked!");
```

Notice the last `console.log` in `main.js` runs right away, *before* the worker finishes —
the heavy prime-counting work is happening on a genuinely separate thread, leaving the main
thread (and its event loop, and any HTTP server running on it) completely free to keep
handling other things. This is the direct fix for Chapter 28d's blocking-loop problem, when
the heavy work truly is JavaScript computation you can't avoid doing.

## 3. The Cluster Module — using every CPU core for your server

A single Node process, no matter how well-written, only ever uses **one CPU core** — modern
servers commonly have 4, 8, or many more. The `cluster` module lets you run multiple copies
of your *entire server* (one per CPU core), sharing the same port, so incoming requests get
distributed across all of them:

```javascript
const cluster = require("cluster");
const os = require("os");
const http = require("http");

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Primary process starting ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // each fork is a full, independent copy of this same script
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died — starting a replacement`);
    cluster.fork(); // keep the pool at full strength automatically
  });
} else {
  // this code runs inside EACH worker process
  http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);
}
```

Each worker is a **completely separate process** (unlike worker threads, which share memory
within one process) — they don't share variables directly, only messages you explicitly
send between them. This is specifically for scaling a *server handling many requests*
across all available CPU cores — a very different goal from Worker Threads' "run one heavy
computation without blocking."

## Choosing between the three

| Tool | Use for | Isolation |
|------|-----------|-------------|
| `child_process` | Running a different program/language entirely, or needing full isolation | Completely separate process |
| `worker_threads` | Heavy **JavaScript** computation, without blocking the main thread | Separate thread, same process |
| `cluster` | Scaling an **entire server** across all CPU cores | Multiple separate processes, sharing one port |

In practice, as a beginner building your first Express APIs (your next tracker topic), you
likely won't need any of these immediately — most real-world slowness in a typical CRUD API
is I/O-bound (waiting on a database — already handled well by Chapter 28d's event loop) —
but recognizing these three tools by name, and knowing which kind of problem each one
solves, is exactly what separates "I can build a basic API" from "I understand how Node
actually scales."

## Hands-on Practice

**Use each of the three approaches at least once.**

1. Use `child_process.exec()` to run a simple shell command from a Node script and log its
   output.
2. Rebuild Chapter 28d's blocking prime-counting-style example using `worker_threads`
   instead, and confirm (the way you tested blocking behavior in Chapter 28d) that other
   work — a separate `console.log`, or a second HTTP route — is no longer frozen while the
   heavy computation runs.
3. Build the `cluster` example above, start it, and hit your server from a browser multiple
   times in a row — log `process.pid` in each response and confirm different requests are
   sometimes handled by different worker processes.
4. Kill one worker process manually (log its PID and use your OS's process-kill tool) and
   confirm the primary process detects it and forks a replacement automatically.

## Completion Check

What's the core difference between what `worker_threads` and `cluster` are each solving?
Why doesn't `child_process` share memory the way `worker_threads` does? If your API is slow
because of a slow database query, which of these three tools actually helps, and why do the
other two not apply to that specific problem?

---
Previous: [Chapter 28h — Error Handling, Signals & Graceful Shutdown](28h-error-handling-graceful-shutdown.md) · Next: **[Chapter 28j → Testing & Debugging Node.js Applications](28j-testing-debugging.md)**
