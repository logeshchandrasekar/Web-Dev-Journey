/* MODULES :
  - Modules are reusable pieces of code in a file that can be exported and then imported for use in another file.
  A modular program is one whose components can be separated, used individually, and recombined to create a complex system.*/

// COMMON JS MODULES AND THEIR IMPLEMENTATION

/* 1. shape-area.js */
const { PI } = Math;

function circleArea(radiusLength) {
  return PI * radiusLength * radiusLength;
};

function squareArea(sideLength) {
  return sideLength * sideLength;
}

module.exports.circleArea = circleArea;
module.exports.squareArea = squareArea;

/* 2. app.js */ 
const radius = 5;
const sideLength = 10;

const areaFunctions = require('./shape-area.js');
const areaOfCircle = areaFunctions.circleArea(radius);
const areaOfSquare = areaFunctions.squareArea(sideLength);

/* General Notes :
- module.exports () 
  -- To create a module, you simply have to create a new file where the variables and functions can be declared.
     Then, to make these functions available to other files, add them as properties to the built-in module.exports object.
- require()
  -- The require() function accepts a string as an argument.
     That string provides the file path to the module you would like to import.
     generally using the relative path based on the file where require() is being called.
*/
