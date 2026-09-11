# Chapter 3: Editor Interface Tour

Open your local instance (`n8n start`, then `localhost:5678`) and follow along.

## Left-side navigation panel

- **Overview** — your home screen: list of all workflows, plus the Insights summary banner at the top.
- **Personal / Projects** — where your workflows and credentials live by default. Projects let you group related workflows and credentials together (useful once you have more than a handful).
- **Templates** — a searchable library of pre-built workflows you can import as a starting point.
- **Variables** — named values you can reuse across workflows (e.g., a base URL or a constant). Full variable management is a paid-plan feature; a small number are usable for free.
- **Insights** — analytics on your workflow executions (see Chapter 9).
- **Admin Panel** — cloud only; billing, usage, instance settings.
- **Settings (gear icon)** — where you activate your license, manage users, set your timezone, configure community nodes, etc.
- **Help** — docs, community links, and the AI Assistant entry point.

## The canvas (main editing area)

- **Adding a node**: click the `+` button, or drag from the node panel that opens on the right.
- **Node panel search**: type an app or action name ("Gmail," "HTTP Request," "If") to find nodes fast.
- **Connections**: drag from the small dot on the right edge of one node to the left edge of another to link them.
- **Sticky notes**: a note-only "node" for documenting your workflow — use these liberally once workflows get complex.
- **Zoom / pan**: scroll to zoom, click-drag empty canvas space to pan.

## Node panel (when you click into a node)

- **Parameters tab**: the node's settings (which action, which fields, etc.).
- **Docs link**: every node has a small "Docs" link to its reference page — use this constantly when learning a new node.
- **Input/Output preview**: shows the actual data flowing in and out, in both table and JSON view. This is your main debugging tool.

## Top bar

- **Save**: workflows autosave in some setups, but get in the habit of manually saving (Ctrl/Cmd+S).
- **Active toggle**: switches the workflow between active (runs automatically on its trigger) and inactive (manual-only).
- **Test workflow / Execute workflow**: runs the workflow once, right now, so you can see what happens.
- **Three-dot menu**: duplicate, export/download (as JSON), import from file, version history.

## Check yourself

- Where would you go to activate your license key? (Settings → Usage and plan)
- Where would you go to see how a node transformed your data? (Click the node → Input/Output preview)
