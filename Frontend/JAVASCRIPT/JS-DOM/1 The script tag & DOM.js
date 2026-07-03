// 1. The script tag :
<script>
  // The js logic code we write here with 'DOM' + html elements goes here.
  // It makes the static web page into a dynamic web page with interactivity.
  </script>

<script src = "./script.js">
  // writes the js logic code in a seperate file and links to the html file.
  </script>

// 2. What is DOM ?
// - The DOM (Document Object Model) is the bridge between your static HTML and your dynamic JavaScript.
/* - When a browser loads an HTML file, it doesn't just "display text.",
     It parses that HTML and builds a live, in-memory 'tree structure' out of it called the DOM.
  
The Tree Structure :
  - Given this HTML: */
    <html>
      <body>
        <h1>Hello</h1>
        <p>Welcome to my site</p>
      </body>
    </html>

/* - The browser builds a tree like this:
document
 └── html
      └── body
           ├── h1 ("Hello")
           └── p ("Welcome to my site") */
           
 /* Here, Every tag becomes a node.
    document is the root of everything — it's your entry point into this tree from JavaScript.*/

/* 3. Example : TO TRY THIS ON YOUR OWN AND GRASP THE CONCEPT :
- Create a simple index.html file with an h1, a p, and a button.
- Open it in your browser, open DevTools Console.
- Type document , and expand the tree in the console output — click through and find your h1 and p inside it.
- Type document.body.children , and see what it returns. */
