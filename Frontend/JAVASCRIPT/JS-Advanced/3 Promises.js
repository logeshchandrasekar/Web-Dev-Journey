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

//---------------------------------------------------------------//

// 3. Success and Failure Callback Functions :
  // promise function
let prom = new Promise((resolve, reject) => {
  let num = Math.random();
  if (num < .5 ){
    resolve('Yay!');
  } else {
    reject('Ohhh noo!');
  }
});

  // callback function for promise resolve
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

  //callback function for promise reject
const handleFailure = (rejectionReason) => {
  console.log(rejectionReason);
};

  //.then() method with two callback functions for both scenarios
prom.then(handleSuccess, handleFailure);

/*
output:
if resolve : Yay!
if reject : Ohh noo!
*/

//---------------------------------------------------------------//

// 4. using catch() for failure callback (seperation of concerns) :
prom
 .then(handleSuccess)
 .catch(handleFailure);

// Same output as previous code will be run with these method

//---------------------------------------------------------------//

// 5. Chaining multiple promises (composition) :
function checkInventory(order) {
  return Promise.resolve([order, 50]); // [order, totalCost]
}

function processPayment(resolvedValueArray) {
  const [order, totalCost] = resolvedValueArray;
  return Promise.resolve([order, "TRACK123"]); // [order, trackingNumber]
}

function shipOrder(resolvedValueArray) {
  const [order, trackingNumber] = resolvedValueArray;
  return Promise.resolve(`Shipped! Tracking: ${trackingNumber}`);
}

const order = {
  items: [["sunglasses", 1], ["bags", 2]],
  giftcardBalance: 79.82
};

checkInventory(order)
  .then((resolvedValueArray) => {
    return processPayment(resolvedValueArray);
  })
  .then((resolvedValueArray) => {
    return shipOrder(resolvedValueArray);
  })
  .then((successMessage) => {
    console.log(successMessage);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });

/* explanation :
	1. checkInventory(order) resolves to [order, totalCost].
	2. The first .then() returns processPayment(resolvedValueArray),
     so the chain waits and passes the next value.
	3. The next .then() returns shipOrder(resolvedValueArray) to keep the chain going.
	4. The final .then() logs the success message:
     Shipped! Tracking: TRACK123
	5. .catch() logs any error if one of the promises rejects.
*/

//---------------------------------------------------------------//
