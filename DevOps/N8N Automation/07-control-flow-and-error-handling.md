# Chapter 7: Control Flow & Error Handling

## Branching logic

- **If node**: splits your workflow into two paths — "true" and "false" — based on a condition (e.g., "is `status` equal to `paid`?").
- **Switch node**: like an If node but with more than two possible paths, based on matching different values.
- **Filter node**: keeps only the items matching a condition, drops the rest (no branching — just filtering the same path).

## Combining paths

- **Merge node**: brings two separate branches back together — either by simply combining all items, or by matching items from each branch on a shared field (like a SQL join).

## Loops

Most of the time you don't need explicit loops — n8n runs downstream nodes once per item automatically. But when you genuinely need to process a large batch in smaller chunks, or loop over a paginated API, use the **Split In Batches** (Loop Over Items) node.

## What happens when a node fails

By default, if a node throws an error, the entire execution stops and gets logged as "failed." You can see exactly which node failed and why in the execution log (Overview → click into a past execution).

## Handling errors gracefully

- **On a specific node**: open its settings (the three dots on the node) → "On Error" → choose "Continue" or "Continue using error output" instead of "Stop workflow." This lets you route failures to a different path (e.g., log the error and carry on) instead of halting everything.
- **Workflow-level error handling**: you can assign a separate "Error Workflow" to any workflow (Workflow Settings) — it triggers automatically whenever that workflow fails, so you can send yourself a notification, log to a sheet, etc.
- **Retry on fail**: some nodes (especially HTTP Request) let you configure automatic retries with a delay — useful for flaky external APIs.

## Debugging a failed execution

1. Go to **Overview** → click the workflow → **Executions** tab.
2. Click the failed execution — it opens the canvas exactly as it ran, with a red mark on the node that failed.
3. Click that node to see the actual error message and the data it received.

## Check yourself

- Your workflow fails at 3am on a scheduled run. Where do you go first to find out why? (Executions tab of that workflow.)
- What's the difference between a Filter node and an If node? (Filter drops non-matching items on one path; If actively splits into two separate paths.)
