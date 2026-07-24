# Chapter 9 — JSON.parse() & JSON.stringify()

**Phase:** Data Format · **Suggested time:** 1 day · **Status:** Not Started

## What You Must Understand

Convert between JavaScript objects and JSON strings.

## The Core Idea

Here's the detail that trips up almost everyone at first: **JSON, as it travels over HTTP,
is always just text** — a plain string. It is *not* a JavaScript object while it's in a
request/response body. Two functions convert between "JavaScript object in memory" and
"JSON text on the wire":

- **`JSON.stringify(obj)`** — JavaScript object → JSON string. Use this *before sending*.
- **`JSON.parse(str)`** — JSON string → JavaScript object. Use this *after receiving*.

## Why this conversion has to happen at all

HTTP bodies (Chapter 7) are bytes/text — a network connection has no concept of "a
JavaScript object," only a stream of characters. So:

1. You have a JS object in memory: `{ title: "Finish roadmap", done: false }`
2. To send it in a request body, you must first turn it into text:
   `JSON.stringify({ title: "Finish roadmap", done: false })` →
   `'{"title":"Finish roadmap","done":false}'`
3. That text travels over the network as the request body.
4. The server receives raw text, and — usually automatically via its framework — runs the
   equivalent of `JSON.parse()` on it to get a usable object back.
5. Same thing happens in reverse for the response: server stringifies its result, your
   client-side code parses the text it receives back into a JS object you can work with.

## A concrete example

```javascript
// You have this in memory:
const task = { title: "Finish roadmap", done: false, tags: ["urgent", "learning"] };

// Turn it into a string to send as a request body:
const jsonText = JSON.stringify(task);
console.log(jsonText);
// '{"title":"Finish roadmap","done":false,"tags":["urgent","learning"]}'
console.log(typeof jsonText); // "string" — not an object anymore!

// ...later, receiving a response body as text:
const responseText = '{"id":17,"title":"Finish roadmap","done":false}';

// Turn it back into something you can actually use:
const parsed = JSON.parse(responseText);
console.log(parsed.id);    // 17
console.log(typeof parsed); // "object"
```

Notice: before `JSON.parse()`, you can't do `responseText.id` — it's just a string, dots
don't mean anything on it. After parsing, `parsed.id` works, because now it's a real
object.

## Common mistakes at this stage

- **Trying to access properties on unparsed JSON.** If something behaves like a string
  instead of an object (`.length` gives you character count, not array length; dot access
  returns `undefined`), you likely forgot to `JSON.parse()` it.
- **Double-stringifying.** Calling `JSON.stringify()` on something that's already a JSON
  string produces an escaped mess like `'"{\\"title\\":...}"'`. Only stringify actual JS
  objects/arrays, never something that's already text.
- **`JSON.stringify()` silently dropping things.** Functions, `undefined` values, and
  Symbols are dropped entirely when you stringify an object containing them — they have no
  JSON equivalent (see Chapter 8's rules). This surprises people when a field mysteriously
  vanishes.

## Where you'll actually use this

Spoiler for Chapter 11 (Fetch API, just past this book's scope): when you call
`response.json()` on a Fetch response, it's doing `JSON.parse()` for you automatically.
When you configure a POST request's `body: JSON.stringify(data)`, you're doing this
conversion explicitly by hand. Understanding *why* that line is there — rather than just
copy-pasting it — is exactly what this chapter buys you.

## Hands-on Practice

**Convert objects to JSON and back.**

1. In your browser console (or Node), create a JS object with at least one nested object
   and one array.
2. Run `JSON.stringify()` on it, log the result, and confirm `typeof` is `"string"`.
3. Run `JSON.parse()` on that string, log the result, confirm `typeof` is `"object"`, and
   confirm you can access a nested property with dot notation.
4. Try `JSON.stringify()` on an object that includes a function as one of its values — see
   what happens to that key in the output.

## Completion Check

Can you explain, without looking it up, why you can't do `myResponseString.someProperty`
directly on raw response text before parsing it? Can you say which direction each function
goes (stringify: object→string, parse: string→object) without hesitating?

---
Previous: [Chapter 8 — JSON](08-json.md) · Next: **[Chapter 10 → Promises](10-promises.md)**
