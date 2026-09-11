# Chapter 1: Core Concepts

## What n8n actually is

n8n is a **workflow automation tool**. You connect apps and services together visually — instead of writing a script that calls the Gmail API, then the Slack API, then a database, you drag nodes onto a canvas and wire them together.

The name is short for "nodemation" (node-automation), pronounced "n-eight-n."

## The vocabulary

- **Workflow** — the whole automation you build. One canvas = one workflow. Saved as JSON under the hood.
- **Node** — a single step in a workflow. Each node does one thing: fetch data, transform it, send it somewhere, make a decision.
- **Connection** — the line between two nodes, showing data flows from one to the next.
- **Trigger node** — the node that starts a workflow (a schedule, a webhook, a manual click, a new row in a spreadsheet, etc.). Every workflow needs exactly one way to start.
- **Execution** — one run of a workflow, start to finish. Every time a workflow runs (manually or automatically), that's an execution, and n8n logs it.
- **Item** — a single unit of data flowing through a node (roughly: one "row"). A node can output many items at once.
- **Credential** — a saved set of login details / API keys a node uses to connect to an external service.
- **Active vs. inactive workflow** — a workflow only runs automatically (on schedule, on webhook, etc.) when it's toggled "Active." Inactive workflows can still be run manually for testing.

## The mental model

Think of a workflow left-to-right:

```
[Trigger] → [Node A] → [Node B] → [Node C]
```

Data enters at the trigger, and each node receives the output of the node before it, does something with it, and passes its own output to the next node. Some nodes can branch (send data down two different paths) or merge (combine two paths back into one).

## Why people use it

Common use cases: syncing data between two apps, sending automated notifications, scraping and processing data on a schedule, building simple internal tools, and — increasingly — orchestrating AI agents that call tools and APIs.

## Check yourself

Before moving to Chapter 2, make sure you can answer:
- What's the difference between a node and a workflow?
- Why does every workflow need a trigger?
- What does "activating" a workflow actually do?
