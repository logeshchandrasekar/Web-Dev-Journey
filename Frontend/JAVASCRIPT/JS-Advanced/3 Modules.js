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
