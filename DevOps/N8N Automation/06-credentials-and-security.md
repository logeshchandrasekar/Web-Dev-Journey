# Chapter 6: Credentials & Security

## What credentials are

Any time a node needs to log into an external service (Gmail, Slack, a database, an API with a key), you create a **Credential** for it rather than typing the secret directly into the node's fields. Credentials are stored once and reused across any workflow.

## Creating one

Inside a node that needs authentication, click "Create New Credential." Depending on the service, you'll either:
- Paste in an **API key** (simple services), or
- Go through **OAuth** (sign in via a popup — common for Google, Slack, etc.)

## Where credentials live

- **Self-hosted**: encrypted at rest using an **encryption key** that's generated the first time you run n8n and stored in your `.n8n` folder. If you ever move your instance to a new machine, you need to carry that encryption key with you, or your existing credentials become unreadable.
- **Cloud**: n8n manages this for you.

## Good habits

- Never hardcode an API key directly into an HTTP Request node's URL or headers — use a Credential (or at minimum, a Variable) instead, so it's not sitting in plain text inside a workflow you might export or share.
- If you ever export a workflow as JSON to share or back up, credentials are **not** included in the export by default — you'll need to reconnect them on the receiving end.
- Back up your `.n8n` folder (which includes your encryption key and SQLite database, if you're using the default setup) periodically if you're relying on your local instance for anything real.

## Check yourself

- If you export a workflow and send the JSON to a friend, will your API keys go with it? (No — credentials aren't included; they'd need to add their own.)
- What's the one file/key you must not lose if you want your self-hosted credentials to keep working after moving machines? (The encryption key.)
