# Chapter 17 — Query Parameters

## What You Must Understand

Filtering, searching, sorting, pagination.

## The Core Idea

Back in Chapter 2 you learned query parameters are the `?key=value&key2=value2` part of a
URL. This chapter is about *using* them deliberately in API design — they're the standard
tool for every "give me the collection, but modified somehow" request.

## The four things query parameters handle almost universally

```
GET /products?category=shoes                    → filtering
GET /products?search=running                    → searching
GET /products?sort=price&order=asc              → sorting
GET /products?page=2&limit=20                    → pagination
```

All four can combine on one request:

```
GET /products?category=shoes&search=trail&sort=price&order=asc&page=1&limit=10
```

Read that out loud: "give me the products collection, filtered to shoes, matching search
term 'trail', sorted by price ascending, page 1, 10 per page." Every clause maps to exactly
one `key=value` pair.

## Why pagination specifically matters

Imagine `/products` returns 50,000 rows with no pagination — every client would have to
download all 50,000 every time, even to show the first 10. `page`/`limit` (or sometimes
`offset`/`limit`) let the server return a manageable slice, and let the client ask for more
only when needed (e.g. clicking "next page" or infinite-scrolling). This becomes very
concrete once you hit SQL's `LIMIT`/`OFFSET` later in your roadmap — pagination query
parameters are usually passed almost directly into the database query.

## Building query strings safely in JavaScript

Concatenating strings by hand gets error-prone fast (missing `&`, unescaped special
characters). The built-in `URLSearchParams` handles it correctly:

```javascript
const params = new URLSearchParams({
  category: "shoes",
  sort: "price",
  order: "asc",
  page: 1
});

const url = `https://api.example.com/products?${params}`;
// https://api.example.com/products?category=shoes&sort=price&order=asc&page=1

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));
```

`URLSearchParams` also handles reading them back out — useful for parsing a URL a user
landed on:

```javascript
const url = new URL("https://example.com/search?q=shoes&page=2");
url.searchParams.get("q");     // "shoes"
url.searchParams.get("page");  // "2"
```

## Query parameters vs path parameters, revisited

Chapter 16 gave the quick test: does removing it break the request's meaning, or just make
it less specific? All four uses in this chapter — filter, search, sort, paginate — are
naturally *optional*. `GET /products` alone is completely valid; every parameter here just
narrows or reorders that same valid request. That's the query-parameter signature.

## Hands-on Practice

**Build search/filter/sort functionality.**

1. Find a public API that supports at least filtering or pagination via query parameters
   (many "list" endpoints do — check the docs for parameters like `page`, `limit`, `q`,
   `sort`).
2. Use `URLSearchParams` to build a request with 2-3 combined parameters, fetch it, and
   confirm the results reflect your filter/sort/page choice.
3. Change just the `page` (or offset) parameter and confirm you get a different slice of
   results back.
4. Write, from scratch, the query string for "search term 'laptop', sorted by price
   descending, page 3, 25 per page" without checking notes.

## Completion Check

Name the four common uses of query parameters. Why is pagination necessary for large
collections? What does `URLSearchParams` buy you over building the string by hand?

---
