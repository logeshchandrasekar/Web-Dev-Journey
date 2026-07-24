# Chapter 8 — JSON

**Phase:** Data Format · **Suggested time:** 1–2 days · **Status:** Not Started

## What You Must Understand

Objects, arrays, strings, numbers, booleans, null, nesting.

## The Core Idea

JSON (JavaScript Object Notation) is the format almost every modern API uses for request
and response bodies. The good news: if you know JavaScript objects and arrays, you already
know JSON's shape — it has exactly six kinds of values, no more.

## The six JSON value types

| Type | Example | Notes |
|------|---------|-------|
| **String** | `"Loki"` | Always double quotes — single quotes are invalid JSON |
| **Number** | `42`, `3.14`, `-7` | No distinction between integer/float like some languages have |
| **Boolean** | `true`, `false` | Lowercase, no quotes |
| **null** | `null` | Represents "no value," lowercase, no quotes |
| **Object** | `{"key": "value"}` | Unordered key-value pairs, keys are always strings in double quotes |
| **Array** | `[1, 2, 3]` | Ordered list, items can be any JSON type, including mixed types |

That's the entire spec. Everything else is nesting these six types inside each other.

## A realistic nested example

```json
{
  "id": 42,
  "name": "Running Shoes",
  "price": 89.99,
  "inStock": true,
  "discount": null,
  "tags": ["footwear", "running", "sale"],
  "seller": {
    "id": 7,
    "name": "SportsCo",
    "verified": true
  },
  "reviews": [
    { "user": "alex", "rating": 5 },
    { "user": "sam", "rating": 4 }
  ]
}
```

Read this out loud, piece by piece: an object with 8 keys; `tags` is an array of strings;
`seller` is a nested object; `reviews` is an array of objects. Being able to narrate any
JSON blob like this — "this is an object, this key holds an array of objects" — is the
actual skill. Depth doesn't matter once you can do this at one level; it's the same pattern
repeated.

## The rules that trip people up

- **Keys must be double-quoted strings.** `{name: "Loki"}` is invalid JSON (that's actually
  JavaScript object shorthand) — it must be `{"name": "Loki"}`.
- **No trailing commas.** `{"a": 1, "b": 2,}` is invalid — that last comma before `}` breaks
  strict JSON parsers.
- **No comments.** JSON has no `//` or `/* */` syntax at all.
- **No functions, no `undefined`, no dates as a native type.** JSON only has the six types
  above. Dates are usually sent as ISO 8601 strings (`"2026-07-24T10:00:00Z"`) and it's up
  to your code to turn that string into a real date object if needed.

## Why JSON specifically (not XML, not plain text)

You don't need deep history here, just the practical reason: JSON maps almost 1:1 onto
JavaScript's own object/array literals, it's far less verbose than XML, and virtually every
language has a built-in or trivial JSON parser. That combination is why it became the
default for APIs.

## Hands-on Practice

**Write and read nested JSON manually.**

1. Without any tool, hand-write a JSON object describing yourself: name, age, an array of
   skills, and a nested object for "currentGoal" (with a title and a deadline string).
2. Paste it into a JSON validator/formatter (or your browser console using
   `JSON.parse('...')` — preview of Chapter 9) and confirm it's valid.
3. Deliberately break it three ways (single quotes, trailing comma, unquoted key) and note
   the error each time — knowing *what* invalid JSON looks like is as useful as knowing
   valid JSON.

## Completion Check

Can you list all six JSON value types from memory? Given a paragraph describing some data
("a user has a name, a list of three favorite colors, and an address with street/city"),
can you write valid JSON for it without needing to check syntax?

---
Previous: [Chapter 7 — Request & Response Bodies](07-request-response-bodies.md) · Next: **[Chapter 9 → JSON.parse() & JSON.stringify()](09-json-parse-stringify.md)**
