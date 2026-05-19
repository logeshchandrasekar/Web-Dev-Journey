// Function as data
const checkThatTwoPlusTwoEqualsFourHundredTimes = () => {
  for(let i = 1; i <= 100; i++) {
    if ( (2 + 2) != 4) {
      console.log('Something has gone very wrong :( ');
    }
  }
};
const isTwoPlusTwo = checkThatTwoPlusTwoEqualsFourHundredTimes;
isTwoPlusTwo();
console.log(isTwoPlusTwo.name);

// Function as parameter
const addTwo = num => {
  return num + 2;
}
const checkConsistentOutput = function (one, two) {
  const checkA = (two + 2);
  const checkB = one(two);
  if (checkA === checkB) {
    return checkB;
  }
    else{
      return ('No results');
    }
  }
console.log(checkConsistentOutput(addTwo, 10));

/*
Abstraction allows us to write complicated code in a way that’s easy to reuse, debug, and understand for human readers.
We can work with functions the same way we work with any other type of data, including reassigning them to new variables
JavaScript functions are first-class objects, so they have properties and methodslike any other object.
Functions can be passed into other functions as parameters.
A higher-order function is a function that either accepts functions as parameters, returns a function, or both.
*/
