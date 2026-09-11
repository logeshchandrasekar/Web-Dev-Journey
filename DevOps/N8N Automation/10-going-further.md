# Chapter 10: Going Further

## Scaling self-hosted n8n (for later, not now)

Your current npm setup uses the default settings — fine for learning and personal automations. If you eventually run many workflows or need reliability guarantees, n8n supports:

- **A real database** (Postgres instead of the default SQLite) for better performance and concurrent access.
- **Queue mode**: separates the "editor" process from "worker" processes that actually execute workflows, so heavy workflows don't slow down the UI, and you can run multiple workers for throughput.
- **Docker / Docker Compose**: the more common way to run a "serious" self-hosted instance long-term, since it's easier to back up, update, and move than a bare npm install.

None of this matters yet — just know it exists so it's not a surprise later.

## Backing up what you build

For your local instance, periodically back up the `~/.n8n` folder (contains your workflows, credentials, and encryption key if using default SQLite storage). This is the single most important habit to build early, before you have anything painful to lose.

## A suggested practice project

Once you've been through Chapters 1–9, build this end to end — it touches almost every concept in this guide:

**"Daily personal digest" workflow:**
1. **Schedule Trigger** — runs every morning at 8am.
2. **HTTP Request** — pull today's weather for your city from a free weather API.
3. **HTTP Request** — pull a random quote or news headline from another free API.
4. **Set** node — combine both results into a clean, formatted message.
5. **If** node — branch on whether the weather call actually succeeded (practice error handling).
6. Send the result somewhere you'll actually see it (email to yourself, or a messaging app if you connect one).
7. Turn on Insights banner-watching as a habit — check it once a day to confirm it actually ran.

This single project exercises triggers, HTTP requests, data shaping, branching, and monitoring — the whole toolkit from this guide.

## Where to keep learning after this

- The **Templates** library, browsed with curiosity rather than a specific need — reading how other people structure workflows is one of the fastest ways to pick up patterns.
- n8n's official docs (docs.n8n.io) for any specific node's exact parameters.
- The n8n community forum, when you hit something genuinely confusing — it's active and specific error messages usually already have an answer there.

You now have the full map. The remaining skill is just repetition — build small, real automations for yourself, and the rest becomes second nature.
