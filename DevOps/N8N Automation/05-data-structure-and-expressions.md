# Chapter 5: Data Structure & Expressions

This is the chapter most beginners under-study, and it's the one that unlocks everything else. Take your time here.

## How data actually looks

Every node passes data as a **list of items**, and each item has a `json` field (and sometimes `binary` for files). Even a single result is technically "one item in a list."

Example — an HTTP Request node fetching one user might output:

```json
[
  {
    "json": {
      "name": "Asha",
      "email": "asha@example.com"
    }
  }
]
```

If it fetched 5 users, you'd get 5 items in that list, each shaped the same way. Nodes downstream typically run **once per item** automatically — you rarely need to write a manual loop for "do this for each row."

## Expressions: referencing other nodes' data

Any input field in n8n can be a **fixed value** or an **expression** — click the little expression icon (or type `=` in some fields) to switch a field into expression mode. Expressions are wrapped in `{{ }}`.

Common patterns:
- `{{ $json.email }}` — the `email` field of the current item.
- `{{ $node["HTTP Request"].json.name }}` — reach back into a specific earlier node's output by name.
- `{{ $now }}` — the current timestamp.
- `{{ $json.price * 1.18 }}` — you can do math and string operations directly inside expressions.

## Why this matters

Instead of hardcoding "send this email to asha@example.com," you write `{{ $json.email }}` so the same node dynamically sends to whoever's email came through in that item. This is what makes a workflow actually reusable instead of a one-off script.

## The Set node (your main data-shaping tool)

The **Set** node (also called "Edit Fields" in newer versions) lets you add, rename, or reshape fields — usually the first node you reach for once data looks slightly wrong. You'll use it to clean up messy API responses, add computed fields, or drop fields you don't need before sending data onward.

## The Code node (when expressions aren't enough)

For anything more complex than a simple expression, the **Code** node lets you write actual JavaScript (or Python, on self-hosted) against the incoming items. This is your escape hatch — but try to solve things with plain nodes first; Code nodes are harder to read back later.

## Check yourself

- If an HTTP Request node returns 3 users, how many items flow into the next node? (3)
- How would you insert the current item's `name` field into a Slack message text field? (`{{ $json.name }}`)
