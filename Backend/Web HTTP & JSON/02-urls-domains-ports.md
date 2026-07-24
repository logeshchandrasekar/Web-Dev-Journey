# Chapter 2 — URLs, URIs, Domains & Ports

**Phase:** Web Foundations · **Suggested time:** 1 day · **Status:** Not Started

## What You Must Understand

Protocol, domain, port, path, query parameters, fragments.

## The Core Idea

A URL (Uniform Resource Locator) is an address. Once you can name every piece of it, you
can read *any* URL you'll ever encounter — including ones with a dozen tracking parameters
that look scary but are just the same six pieces repeated.

## Anatomy of a URL

Take this URL apart:

```
https://api.example.com:8080/products/42?category=shoes&sort=price#reviews
└─┬──┘   └──────┬──────┘└┬─┘└──────┬───┘└─────────┬──────────────┘└──┬──┘
protocol      domain    port      path         query parameters   fragment
```

| Part | Example | What it means |
|------|---------|----------------|
| **Protocol / scheme** | `https://` | The rules of communication. `https` = HTTP encrypted with TLS. `http` = unencrypted. `ftp`, `mailto`, `ws` are other schemes you'll see. |
| **Domain** | `api.example.com` | The human-readable name that DNS translates into an IP address. `api.` here is a **subdomain** — a way of running a separate service (like an API) under the same root domain. |
| **Port** | `:8080` | Which "door" on the server to knock on. Every server can run multiple services, each listening on a different port number. **Default ports are hidden**: `https://` implies `:443`, `http://` implies `:80` — you only see a port explicitly when it's non-default (common in local development, e.g. `localhost:3000`). |
| **Path** | `/products/42` | Which specific resource on the server you want. Think of it like a file path, even though it usually doesn't map to an actual file anymore — it maps to a route the server code handles. |
| **Query parameters** | `?category=shoes&sort=price` | Extra instructions, as `key=value` pairs joined by `&`, starting after a `?`. Used for filtering, searching, sorting, pagination — you'll use these constantly once you build REST clients in Phase 4. |
| **Fragment** | `#reviews` | A pointer to a specific section *within* the page, handled entirely by the browser — it's never even sent to the server. |

## URI vs URL — the distinction that trips people up

- **URI (Uniform Resource *Identifier*)** is the umbrella term: anything that *identifies*
  a resource.
- **URL (Uniform Resource *Locator*)** is a URI that also tells you *how to get it* (i.e.
  it includes a protocol/location).

In practice, nearly every URI you'll deal with day to day is also a URL, so people use the
terms interchangeably. Just know URL is the more specific one.

## A worked example

`https://www.youtube.com/watch?v=abc123&t=90s`

- Protocol: `https`
- Domain: `www.youtube.com`
- Port: not shown → default `443`
- Path: `/watch`
- Query parameters: `v=abc123` (which video), `t=90s` (start at 90 seconds)
- Fragment: none

Notice the path here (`/watch`) doesn't tell you *which* video — the query parameter does
all the work. That's a very common REST-adjacent pattern you'll see again.

## Hands-on Practice

**Break down 10 real URLs into their components.**

Pick 10 URLs you actually use — your bank, a shopping site, YouTube, GitHub, a search
results page, a news article. For each one, write out:

```
URL: ...
Protocol:
Domain:
Port (default or explicit?):
Path:
Query parameters (list each key=value pair):
Fragment (if any):
```

Search result pages and e-commerce filter pages are the best ones to pick — they usually
have 3-5 query parameters, which is great practice for reading them at a glance.

## Completion Check

Given any URL, can you point at each piece and name it — protocol, domain, port (even if
implicit), path, query parameters, fragment — without hesitating?

---
Previous: [Chapter 1 — How the Web Works](01-how-the-web-works.md) · Next: **[Chapter 3 → HTTP Request & Response Model](03-http-request-response-model.md)**
