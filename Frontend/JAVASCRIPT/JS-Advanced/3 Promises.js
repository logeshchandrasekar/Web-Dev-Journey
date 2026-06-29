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

// 6. using promise.all() :

	/* Create a function that returns a promise for checking an item's availability.
	 - Resolves (success) 80% of the time
     - Rejects (failure) 20% of the time */
const checkAvailability = (item, distributor) => {
  return new Promise((resolve, reject) => {
    // Log when the "async" check starts
    console.log(`Checking availability of ${item} at ${distributor}...`);
    // Simulate an asynchronous delay (like a network request)
    setTimeout(() => {
    // Randomly decide whether the item is in stock
      const inStock = Math.random() < 0.8; // 80% chance to resolve
    // If in stock, resolve with a success message
      if (inStock) {
        resolve(`${item} are in stock at ${distributor}`);
      } else {
    // If not in stock, reject with an error message
        reject(`${item} is not available from ${distributor}`);
      }
    }, 300);
  });
};

	/* Define what to do when Promise.all() succeeds (all promises resolve).
	 - Promise.all returns an array of resolved values. */
const onFulfill = (items) => {
	// Log each resolved availability message on its own line
  console.log(items.join('\n'));

   // Confirm all items are available and proceed with placing an order
  console.log('Every item was available from the distributor. Placing order now.');
};

	/* Define what to do when Promise.all() fails (any promise rejects).
	 - Promise.all rejects with the first rejection reason it encounters. */
const onReject = (error) => {
   // Log the error message (e.g., which item was unavailable)
  console.log(error);
};

	/* Create three independent promises by calling checkAvailability()
	 - Each call starts immediately, so checks can run concurrently. */
const checkSunglasses = checkAvailability('sunglasses', 'Favorite Supply Co.');
const checkPants = checkAvailability('pants', 'Favorite Supply Co.');
const checkBags = checkAvailability('bags', 'Favorite Supply Co.');

	/* Run all three promises in parallel with Promise.all.
	 - If all resolve: .then(onFulfill) runs
	 - If any rejects: .catch(onReject) runs */
Promise.all([checkSunglasses, checkPants, checkBags])
  .then(onFulfill)   // Handle success case
  .catch(onReject);  // Handle failure case

//---------------------------------------------------------------//
 
/* General Notes : 
- Promises are JavaScript objects that represent the eventual result of an asynchronous operation.
- Promises can be in one of three states: pending, resolved, or rejected.
- A promise is settled if it is either resolved or rejected.
- We construct a promise by using the new keyword and passing an executor function to the Promise constructor method.
- setTimeout() is a Node function that delays the execution of a callback function using the event-loop.
- We use .then() with a success handler callback containing the logic for what should happen if a promise resolves.
- We use .catch() with a failure handler callback containing the logic for what should happen if a promise rejects.
- Promise composition enables us to write complex, asynchronous code that’s still readable. We do this by chaining multiple .then() and .catch() calls.
- To use promise composition correctly, we have to remember to return promises constructed within a .then().
- We should chain multiple promises rather than nesting them.
- To take advantage of concurrency, we can use Promise.all().
*/
