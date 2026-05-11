// if-else statements
let season = 'summer';
if (season === 'spring') {
  console.log('It\'s spring! The trees are budding!');
}
else if (season === 'winter') {
  console.log('It\'s winter! Everything is covered in snow.');
}
else if (season === 'fall') {
  console.log('It\'s fall! Leaves are falling!');
}
else if (season === 'summer') {
  console.log('It\'s sunny and warm because it\'s summer!');
}
else {
  console.log('Invalid season.');
}
// Output = It\'s sunny and warm because it\'s summer!

// Comparison operators
let hungerLevel = 7;
if(hungerLevel >= 7){
  console.log('Time to eat!');
}
else{
  console.log('We can eat later!');
}
// Output = Time to eat!
// Common comparison operators are [ < > <= >= === !== ] 

// Logical operators
let mood = 'sleepy';
let tirednessLevel = 6;
if (mood === 'sleepy' && tirednessLevel > 8){
  console.log('time to sleep');
}
else{
  console.log('not bedtime yet');
}
// Output = not bedtime yet
// Logical operators are &&(and), ||(or), !(not)

// Truth and False
let wordCount = 8;
if (wordCount) {
  console.log("it's a number");
} else {
  console.log('No number');
}

let favoritePhrase = '';
if (favoritePhrase) {
  console.log("String is there");
} else {
  console.log('String is empty.');
}

// Truth and False assignment
let tool = 'marker';
// Using short-circuit evaluation to assign  writingUtensil variable below:
let writingUtensil = tool || 'pen';
console.log(`The ${writingUtensil} is mightier than the sword.`);
// Output = marker is mightier than the sword.

// Switch statement
let athleteFinalPosition = 'first place';
switch (athleteFinalPosition){
  case'first place':
  console.log('You get the gold medal!');
  break;
  case'second place':
  console.log('You get the silver medal!');
  break;
  case'third place':
  console.log('You get the bronze medal!');
  break;
  default:
  console.log('No medal awarded.');
  break;
}
// Output = You get the gold medal!

/*
- An if statement checks a condition and will execute a task if that condition evaluates to true.
- if...else statements make binary decisions and execute different code blocks based on a provided condition.
- We can add more conditions using else if statements.
- Comparison operators, including <, >, <=, >=, ===, and !== can compare two values.
- The logical and operator, &&, checks if both provided expressions are truthy.
- The logical or operator, ||, checks if either provided expression is truthy.
- The bang operator, !, switches the truthiness and falsiness of a value.
- The ternary operator, ? :, is shorthand to simplify concise if...else statements.
- A switch statement can be used to simplify the process of writing multiple else if statements.
  The break keyword stops the remaining cases from being checked and executed in a switch statement.
*/
