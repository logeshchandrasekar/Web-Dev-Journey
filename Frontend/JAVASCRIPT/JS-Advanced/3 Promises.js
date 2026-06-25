// 1. general structure of an promise :
  // declared a variable with objects
const inventory = {
  sunglasses: 1900,
  pants: 1088,
  shirts: 1344
};
  // executor function with two usual parameters
const myExecutor = (resolve, reject) => {
  if(inventory.sunglasses > 0) {
    resolve('Sunglasses order processed.');
  }
  else {
    reject('That item is sold out.');
  }
};
  // constructing a promise in a function
const orderSunglasses = () => {
  return new Promise(myExecutor);
}
  // assigning the promise function in a variable
const orderPromise = orderSunglasses();
  // logs the promise value based on condition
console.log(orderPromise);

//---------------------------------------------------------------//

// 2. the node setTimeout() function :
  // first print statement to run
console.log("This is the first line of code in app.js.");
  // declared a variable function
const usingSTO = () => {
  console.log('say my name !');
}
  // declared setTimeout() function
setTimeout(usingSTO, 100);
  // last print statement to run
console.log("This is the last line of code in app.js.");

/* output :
  This is the first line of code in app.js.
  This is the last line of code in app.js.
  say my name ! (timeout function triggered after delay) 
*/
