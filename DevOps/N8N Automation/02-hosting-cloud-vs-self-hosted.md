# Chapter 2: Hosting — Cloud vs. Self-Hosted

## Two completely separate products, same software

- **n8n.cloud**: n8n's own servers run your instance for you. You get a URL like `yourname.app.n8n.cloud`. n8n handles uptime, backups, and upgrades. This is what your browser account is.
- **Self-hosted**: you run the n8n software yourself — on your laptop (via npm, like you did), a Docker container, or a server/VPS. You are responsible for keeping it running, backed up, and updated. This is your local instance.

They are entirely separate databases with separate workflows, credentials, and users. **No automatic sync exists between them.**

## Your cloud trial, specifically

- 14 days of Pro-plan features (global variables, Insights dashboard, execution search, 5-day workflow rollback), with reduced execution limits.
- If you don't upgrade to a paid plan, the trial **automatically expires and n8n deletes the workspace** — no charge happens, but no warning either.
- You have **90 days after expiry** to download your workflows as JSON (Overview → Manage → Export → Download Workflows) before they're gone permanently.
- Since it's a separate system, this expiry has no effect on your local instance.

## Your local self-host, specifically

- Free forever on the **Community edition** — no execution limits, no per-task fees.
- The license key you received by email registers your instance as a "Community Registered" instance. This is still the free tier — it unlocks a few extra conveniences (and lets n8n's licensing server track that a real activation happened) but doesn't cost anything or expire like the cloud trial does.
- You activate it once: **Settings → Usage and plan → Enter activation key**.
- Certain features (queue mode for scaling, advanced permissions, the full Insights dashboard, SSO) require paid self-hosted licenses (Business/Enterprise) — you likely won't need these for a while.

## Why this distinction matters for you

Because you're trying to learn and build without a countdown clock, **the local self-hosted instance should be your home base**. Use the cloud trial as a temporary window to look at Pro-only features you're curious about, and export anything worth keeping before day 14.

## Practical differences you'll notice day to day

| | Cloud | Self-hosted |
|---|---|---|
| Always running? | Yes, n8n's servers | Only while you run `n8n start` |
| Community nodes (3rd-party extensions) | Not supported | Fully supported |
| Data location | n8n's servers | Your machine |
| Cost at scale | Paid plans, execution caps | Free, hardware-limited |
| Setup effort | None | You manage it |

## Check yourself

- If you build a workflow in the cloud trial today, will it show up in your local instance tomorrow? (No — you'd have to manually export/import it.)
- What's the one thing you must remember to do before your cloud trial's 90-day download window closes?
