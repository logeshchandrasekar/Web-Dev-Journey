// 1. GLOBAL SCOPE
const globalVar = "Im a global variable!";
console.log(globalVar); // Accessible everywhere

// 2. BLOCKS (Statements inside curly braces {})
const block = () =>
{
  let blockMessage = "I exist inside a block!";
  console.log(blockMessage); // Accessible inside the block
};
console.log(blockMessage); // ERROR! Not accessible outside the block

// 3. BLOCK SCOPE & LOCAL VARIABLES
const blockVar = () =>
if (true) {
  let localVariable = "I am a local variable inside an if-block!";
  const anotherLocal = "I am also local!";
  console.log(localVariable); // Accessible here
  console.log(anotherLocal); // Accessible here
}
 console.log(localVariable); // ERROR! Out of scope
 console.log(anotherLocal); // ERROR! Out of scope

// 4. BLOCK SCOPE IN FUNCTIONS
function myFunction() {
  let functionScoped = "I only exist inside this function!";
  console.log(functionScoped); // Accessible inside function
  console.log(globalVar); // Global variables ARE accessible here
}
myFunction();
console.log(functionScoped); // ERROR! Out of scope

// 5. SCOPE POLLUTION
// Overloading the global namespace
var pollution1 = "Polluting variable 1";
var pollution2 = "Polluting variable 2";
var pollution3 = "Polluting variable 3";
// Too many global variables = Scope Pollution!

// Reusing variable names
var reusedName = "First use";
console.log(reusedName);
var reusedName = "Reused the same name!"; // Scope pollution!
console.log(reusedName);

// solution for scope pollution = Keep variables block-scoped
function cleanCode() {
  let cleanVar1 = "I stay inside my function!";
  let cleanVar2 = "Me too!";
  console.log(cleanVar1);
  console.log(cleanVar2);
}
cleanCode();
// cleanVar1 and cleanVar2 don't pollute the global namespace!
