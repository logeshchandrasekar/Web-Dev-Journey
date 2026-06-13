// 1) Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// 2) Calling a Function (using arguments)
console.log(greet("Logesh")); // Hello, Logesh!

// 3) Parameters and Arguments
// - name and punctuation are PARAMETERS inside the function
// - "Logesh" and "!" are ARGUMENTS passed during the call
function greetWithPunctuation(name, punctuation) {
  return `Hello, ${name}${punctuation}`;
}
console.log(greetWithPunctuation("Logesh", "!"));

// 4) Default Parameters
function greetWithDefault(name = "stranger") {
  return `Hi, ${name}! (with default)`;
}
console.log(greetWithDefault()); // uses default
console.log(greetWithDefault("Codecademy")); // uses provided argument

// 5) Return Statement
function add(a, b) {
  return a + b;
}
const sum = add(2, 3);
console.log(sum); // 5

// 6) Function Expression
const multiply = function (a, b) {
  return a * b;
};
console.log(multiply(4, 5)); // 20

// 7) Arrow Functions
const subtract = (a, b) => {
  return a - b;
};
console.log(subtract(10, 3)); // 7

// 8) Concise Body Arrow Function
// If there’s only a single expression, you can omit braces and 'return'
const square = x => x * x;
console.log(square(6)); // 36
