# Chapter 3 — HTTP Request & Response Model

**Phase:** HTTP · **Suggested time:** 1–2 days · **Status:** Not Started

## What You Must Understand

Request line, response line, headers, body, client/server communication.

## The Core Idea

HTTP (HyperText Transfer Protocol) is just a **text-based message format** that client and
server agree to speak. Every request and every response has the exact same shape:

```
[Start line]
[Headers]
(blank line)
[Body — optional]
```

That's it. Four pieces, always in that order. Everything in HTTP is a variation on this
one template.

## Anatomy of a raw HTTP request

```
GET /products/42 HTTP/1.1
Host: api.example.com
Accept: application/json
User-Agent: Mozilla/5.0

```

- **Request line:** `GET /products/42 HTTP/1.1` — method, path, HTTP version.
- **Headers:** `Host`, `Accept`, `User-Agent` — metadata about the request, one per line.
- **Blank line:** marks the end of headers.
- **Body:** empty here (GET requests usually don't have one — see Chapter 7).

## Anatomy of a raw HTTP response

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 58

{"id": 42, "name": "Running Shoes", "price": 89.99}
```

- **Status line (a.k.a. response line):** `HTTP/1.1 200 OK` — HTTP version, status code,
  status text (Chapter 5 goes deep on status codes).
- **Headers:** `Content-Type` tells the client *how to interpret* the body,
  `Content-Length` says how many bytes it is.
- **Blank line:** end of headers.
- **Body:** the actual data — here, JSON representing a product.

## Why "stateless" matters

HTTP is **stateless** — the server doesn't remember your last request when handling your
next one. Each request must carry everything the server needs to understand it (that's why
cookies/tokens get attached to *every* request in Chapter 6 and Phase 5's Auth chapter —
the server has no memory of you otherwise).

## Request/response is always paired

One request → exactly one response. There's no such thing as a server pushing data to you
out of nowhere over plain HTTP (that's what WebSockets are for, a different protocol). If
you don't see a response, either the request never arrived, or something is still pending.

## Hands-on Practice

**Inspect requests and responses in DevTools.**

1. Open DevTools → **Network** tab on any site.
2. Reload the page, click any request in the list.
3. Look at the **Headers** sub-tab: you'll see "Request Headers" and "Response Headers"
   sections — map them to the raw format above.
4. Look at the **Response** sub-tab: that's the body.
5. Look at the **Payload** or **Request** sub-tab (browser-dependent) for any request that
   has a body — you'll see this more once you hit POST requests in Chapter 4.
6. Note the status line info at the top (status code + text) — preview for Chapter 5.

## Completion Check

Given a raw HTTP request or response (just the text, no DevTools), can you point to the
start line, headers, and body, and say what each header is for?

---
Previous: [Chapter 2 — URLs, Domains & Ports](02-urls-domains-ports.md) · Next: **[Chapter 4 → HTTP Methods](04-http-methods.md)**
