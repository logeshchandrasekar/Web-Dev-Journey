// 1. The Async keyword :
  // i - manually returning a new Promise :
const withConstructor = (num) => {
  return new Promise((resolve, reject) => {
    if (num === 0){
      resolve('zero');       // Resolves with 'zero' if num is 0
    } else {
      resolve('not zero');   // Resolves with 'not zero' for any other value
    }
  });
}
  
withConstructor(0)           // Calls withConstructor(0) and logs the resolved value using .then()
  .then((resolveValue) => {
  console.log(` withConstructor(0) returned a promise which resolved to: ${resolveValue}.`);
});
  // ii - async function automatically wraps return value in a Promise :
const withAsync = async (num) => {
  if (num === 0){
      return 'zero';        // Implicitly resolves the promise with 'zero'
    } else {
      return 'not zero';    // Implicitly resolves the promise with 'not zero'
    }
}
withAsync(100)              // Calls withAsync(100) and logs the resolved value using .then()
  .then((resolveValue) => {
  console.log(` withAsync(100) returned a promise which resolved to: ${resolveValue}.`);
});

/* Note : Both approaches produce the same result — a resolved Promise.
            The async keyword is simply a cleaner, shorthand way to return Promises without manually using the new Promise constructor. */

//-------------------------------------------------------------------------------------------------------------------------------------//

// 2. The Await operator :
    // Function that returns a Promise
const brainstormDinner = () => {
  return new Promise((resolve, reject) => {
    // Start the decision process
    console.log(`I have to decide what's for dinner...`);
    // Simulate delays using setTimeout (nested callbacks)
    setTimeout(() => {
      console.log('Should I make salad...?');
      setTimeout(() => {
        console.log('Should I make ramen...?');
        setTimeout(() => {
          console.log('Should I make eggs...?');
          setTimeout(() => {
            console.log('Should I make chicken...?');
            // Resolve the Promise with the final meal
            resolve('beans');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  });
};

// i - Native Promise version (then)
function nativePromiseDinner() {
  brainstormDinner().then((meal) => {
    // Log the resolved meal
    console.log(`I'm going to make ${meal} for dinner.`);
  });
}

// ii - async/await version
async function announceDinner() {
  // Await the Promise result (meal)
  let meal = await brainstormDinner();

  // Log after the Promise resolves
  console.log(`I'm going to make ${meal} for dinner.`);
}

// Run both examples
nativePromiseDinner();
announceDinner();

/* Note :
	* It defines brainstormDinner(), which returns a Promise and simulates a “decision” process with nested setTimeout calls.
    After the timed steps, it resolves with the string 'beans'.
	* It shows two ways to handle the resolved value:
		i. Native Promise (then): nativePromiseDinner() calls brainstormDinner().then(...) and logs the final dinner choice.
		ii. Async/Await: announceDinner() uses let meal = await brainstormDinner(); and then logs the same result after the Promise resolves.
	* Both approaches produce the same outcome, but async/await provides a cleaner, more readable flow.
*/

//-------------------------------------------------------------------------------------------------------------------------------------//
