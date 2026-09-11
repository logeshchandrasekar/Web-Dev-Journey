# Chapter 9: Templates, Insights & Community Nodes

## Templates

The **Templates** section (left sidebar) is a searchable library of ready-made workflows built by n8n and the community. You can search by app ("Slack templates") or use case ("lead generation," "invoice automation").

Importing one drops the whole workflow onto a new canvas, pre-wired — you then swap in your own credentials and tweak the logic. This is genuinely one of the fastest ways to learn: pick a template close to something you want to build, and study how it's put together node by node rather than building from a blank canvas every time.

## Insights

Insights tracks how your workflows actually perform once they're running for real (production executions — not manual test runs).

- **Summary banner**: appears at the top of your Overview page, shows the last 7 days at a glance — total executions, failures, failure rate, average run time. Available on every plan, including free self-hosted.
- **Insights dashboard**: a fuller page with per-workflow breakdowns and historical charts. This is a paid-tier feature (Pro+ on cloud, Business/Enterprise on self-hosted) — so on your free Community self-hosted instance, you'll see the summary banner but not the full dashboard.
- **Time Saved (Workflow ROI)**: you can manually set "this workflow saves me X minutes per run," and Insights will tally that up over time — a nice way to see the cumulative value of what you've automated.

Don't worry about not having the full dashboard yet — the summary banner is enough to sanity-check that your automations are actually running and not silently failing.

## Community nodes (self-hosted only)

Self-hosted n8n supports **community nodes** — third-party-built nodes for services n8n doesn't officially support yet. This is one of the real advantages of self-hosting over cloud (community nodes aren't available on n8n.cloud).

Install via **Settings → Community Nodes → Install**, or manually with `npm install <package-name>` inside your n8n directory followed by a restart. Only install from sources you trust, since a community node runs arbitrary code inside your instance.

## Check yourself

- Which feature tells you a scheduled workflow silently failed last night? (Insights summary banner, or checking the Executions tab directly.)
- Why might you specifically prefer self-hosting over cloud if you wanted to use a niche, unofficial integration? (Community nodes only work on self-hosted instances.)
