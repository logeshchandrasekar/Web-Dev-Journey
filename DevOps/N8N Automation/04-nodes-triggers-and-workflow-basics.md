# Chapter 4: Nodes, Triggers & Workflow Basics

## Categories of nodes

- **Trigger nodes** (rounded left edge in the UI) — start a workflow. Examples: Manual Trigger, Schedule Trigger, Webhook, or an app-specific trigger like "New email in Gmail."
- **Regular/action nodes** — do the actual work: fetch data (HTTP Request), send data (Slack, Gmail), transform data (Set, Code), or make decisions (If, Switch).
- **Core nodes** — general-purpose utility nodes that aren't tied to a specific app (Set, Merge, Filter, Code, HTTP Request, Wait, etc.). You'll use these constantly regardless of what apps you're integrating.
- **App nodes** — nodes built specifically for a service (Gmail, Slack, Airtable, Notion, and hundreds more).

## Common trigger types

- **Manual Trigger**: you click "Test workflow" to run it. Good for building/testing.
- **Schedule Trigger**: runs on a timer (every hour, every day at 9am, etc.) — set your timezone first (Chapter 2 mentioned this).
- **Webhook**: gives you a URL; the workflow runs whenever something sends a request to that URL. This is how you'd receive data from an external system in real time.
- **App-specific triggers**: e.g., "When a new row is added" (Airtable/Google Sheets), "When a new email arrives" (Gmail).

## Building your first real workflow

A good first exercise: **"When I manually trigger it, fetch a joke from a public API and format it."**

1. Add a **Manual Trigger** node.
2. Add an **HTTP Request** node after it, pointing at a free public API (e.g., a joke API). Connect the trigger to it.
3. Click "Test workflow" — inspect the JSON that comes back in the Output panel.
4. Add a **Set** node after that to pull out just the fields you want, renaming them if needed.
5. Test again — watch the data change shape as it passes through each node.

This exercise alone teaches you triggers, HTTP requests, data inspection, and the Set node — the four things you'll use in almost every workflow you ever build.

## Activating a workflow

Once a workflow depends on a Schedule Trigger or a Webhook (not just Manual Trigger), you need to flip the **Active** toggle in the top bar for it to actually run on its own. Manual-trigger-only workflows don't need to be active — you just run them by hand.

## Check yourself

- Which trigger would you use for "run this every morning at 8am"? (Schedule Trigger)
- Which trigger would you use for "run this the instant a form is submitted on my website"? (Webhook)
- Why won't a workflow with only a Manual Trigger ever run automatically? (There's no timer/event for it to react to — it only runs when you click the button.)
