//var
var myName = 'loki';
var myAge = 22;
console.log(myName);
console.log(myAge);

//let & const
let food = 'pizza';
console.log(food);
food = 'burger';
console.log(food);

const name = 'logesh';
console.log(name);

//math operators
let add = 10;
let sub = 9001;
let mul = 32;
let div = 1152;
let a = 10;
let b = 20;
add += 5;
sub -= 100;
mul *= 11;
div /= 4;
a++;
b--;
console.log('The value of add:', add); 
console.log('The value of sub:', sub); 
console.log('The value of mul:', mul); 
console.log('The value of div:', div);
console.log(a);
console.log(b);

//string concatenation
let favouriteAnimal = 'cat';
console.log('My favourite animal : '+ favouriteAnimal);

//string interpolation
let myName = 'loki';
let myCity = 'chennai';
console.log(`My name is ${myName}. My favourite city is ${myCity}`);

//typeof operator
let newVariable = 'loki.';
console.log(typeof newVariable);
newVariable = 1;
console.log(typeof newVariable);

/*
- The var keyword is used in pre-ES6 versions of JS.
- let is the preferred way to declare a variable when it can be reassigned, and const is the preferred way to declare a variable with a constant value.
- Variables that have not been initialized store the primitive data type undefined.
- Mathematical assignment operators make it easy to calculate a new value and assign it to the same variable.
- The + operator is used to concatenate strings, including string values held in variables.
- In ES6, template literals use backticks ` and ${} to interpolate values into a string.
- The typeof keyword returns the data type of a value (e.g., string).
*/
