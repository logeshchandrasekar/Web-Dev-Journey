# Chapter 8: AI Assistant & AI Nodes

These are two different things that both get called "AI" in n8n — worth separating clearly.

## 1. The AI Assistant (a help feature)

This is a chat panel inside the editor itself that you can ask for help — e.g., "why is this node erroring," or "help me build a workflow that does X." It's a coding/building aid, not something your workflows call at runtime.

- On self-hosted instances, this requires your license to be activated and an internet connection (it calls out to n8n's hosted AI service) — so if you activated your license key as covered in Chapter 2, this should be available to you.
- Good uses: pasting an error message and asking what it means; asking it to draft a starter workflow you then customize; asking "what node would do X."

## 2. AI nodes (building AI into your workflows)

These are regular nodes you drag onto the canvas like any other, but they let a workflow itself use a language model. The main ones:

- **AI Agent node**: the centerpiece. You give it a language model, a prompt/goal, and a set of "tools" (which can be other n8n nodes — an HTTP Request, a Google Sheets action, even another workflow) — and it decides which tools to call and in what order to accomplish the goal, similar to how an agent reasons through a task.
- **Chat Model nodes**: connect to a specific LLM provider (OpenAI, Anthropic, etc.) — you plug one of these into the AI Agent as its "brain."
- **Memory nodes**: give an agent conversation memory across multiple messages, so it doesn't forget earlier context in a back-and-forth chat.
- **Tool nodes**: turn things (an HTTP call, a Wikipedia lookup, a Code node, another n8n workflow) into something the AI Agent is allowed to invoke on its own.

## A simple AI workflow to try

1. **Chat Trigger** node (gives you a chat-style test interface) →
2. **AI Agent** node, with a Chat Model attached →
3. Attach one Tool (e.g., an HTTP Request tool hitting a weather API) →
4. Ask it something in the chat trigger's test panel that requires calling that tool, and watch it reason through the call.

This is genuinely one of n8n's more powerful areas once you're comfortable with the basics — it's essentially a visual way to build what people call "AI agents" without writing orchestration code by hand.

## Check yourself

- If you ask the AI Assistant to help you fix a broken node, does that count as "using AI in your workflow"? (No — that's a build-time helper. The AI Agent node is what makes AI part of the workflow's actual runtime logic.)
- What does a Tool node let an AI Agent do that it couldn't do on its own? (Take an action in the outside world — call an API, look something up, run code — rather than just generate text.)
