// 1. The async keyword :
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

// 2. The await operator :
    // Function that returns a Promise
const brainstormDinner = () => {
  return new Promise((resolve, reject) => {
    // Start the decision process
    console.log(`I have to decide what's for dinner...`);
    // Simulating delays using setTimeout (nested callbacks)
    setTimeout(() => {
      console.log('Should I make salad...?');
      setTimeout(() => {
        console.log('Should I make ramen...?');
        setTimeout(() => {
          console.log('Should I make eggs...?');
          setTimeout(() => {
            console.log('Should I make chicken...?');
            // Resolve the Promise with the final meal
            resolve('biriyani');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  });
};

// i - Promise version (.then) :
const promiseDinner = () => {
  brainstormDinner().then((meal) => {
    // Log the resolved meal
    console.log(`I'm going to make ${meal} for dinner.`);
  });
}

// ii - async/await version :
const announceDinner = async () => {
  // Await the Promise result (meal)
  let meal = await brainstormDinner();
  // Log after the Promise resolves
  console.log(`I'm going to make ${meal} for dinner.`);
}

// Running both examples
promiseDinner();
announceDinner();

/* Note :
	* The brainstormDinner(), which returns a Promise and simulates a “decision” process with nested setTimeout calls.
    After the timed steps, it resolves with the string 'biriyani'.
	* There are two ways to handle the resolved value:
		i. Native Promise (then): nativePromiseDinner() calls brainstormDinner().then(...) and logs the final dinner choice.
		ii. Async/Await: announceDinner() uses let meal = await brainstormDinner(); and then logs the same result after the Promise resolves.
	* Both approaches produce the same outcome, but async/await provides a cleaner, more readable flow. */

//-------------------------------------------------------------------------------------------------------------------------------------//

// 3. The proper async/await function (example) :
const shopForFood = () => {
  return new Promise((resolve, reject) => {
	const foodTypes = ['Idly', 'Dosa', 'Fried Rice', 'Biriyani', 'Pizza'];
  setTimeout(()=>{
    let randomIndex = Math.floor(Math.random() * foodTypes.length);
    let foodType = foodTypes[randomIndex];
    console.log(`2. I bought ${foodType} because it is my favorite.`);
   resolve(foodType);
  }, 1000);
});
};

const getFood = async () => {
  console.log(`1. Heading to the store to buy food...`);
  let value = await shopForFood();
  console.log(`3. Great! I'm eating ${value} for dinner tonight!`);
}

getFood();

//-------------------------------------------------------------------------------------------------------------------------------------//

// 4. Handling dependent promises :
const shopForIngredients = () => {
  return new Promise((resolve, reject) => {
    const ingredients = [
      "idli rice",
      "urad dal",
      "Ragi",
      "Wheat"
    ];

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * ingredients.length);
      const ingredient = ingredients[randomIndex];
      console.log(`I bought ${ingredient} from the local market.`);
      resolve(ingredient);
    }, 1000);
  });
};

const prepareBatter = (ingredient) => {
  return new Promise((resolve, reject) => {
    console.log("Time to prepare the idli batter...");

    setTimeout(() => {
      console.log(`The batter is ready using ${ingredient}.`);
      resolve(true);
    }, 2000);
  });
};

const steamIdlis = (batterReady) => {
  return new Promise((resolve, reject) => {
    console.log("Steaming the idlis...");

    setTimeout(() => {
      if (batterReady) {
        console.log("The idlis are soft and fluffy!");
        resolve("\n Hot Idlis with Sambar and Coconut Chutney are ready!");
      } else {
        reject("The batter is not ready.");
      }
    }, 2000);
  });
};

	// The main function
async function makeIdli() {
    // Awaits a randomly resolved ingredient from the Promise
    const ingredient = await shopForIngredients();
    // Passes resolved ingredient — awaits batter preparation
    const batterReady = await prepareBatter(ingredient);
    // Resolves final meal string if batterReady is truthy, else rejects
    const meal = await steamIdlis(batterReady);
    // Logs the final resolved value
    console.log(meal);
}
	// Run the program
makeIdli();

//-------------------------------------------------------------------------------------------------------------------------------------//

// 5. Handling errors using try & catch :
let randomNum = () => {
 let num = Math.random();
 if (num < .5 ){
   return true;
 } else {
   return false;
 }
};

const cookBiriyani = () => {
 return new Promise((resolve, reject) => {
   console.log('Putting the biriyani in the cooker');
   setTimeout(()=>{
     let success = randomNum();
     if(success){
       resolve('Biriyani');
     } else {
       reject('Dinner is ruined!');
     }
   }, 1000);
 });
};

async function hostDinnerParty() {
  try {
    let dinner = await cookBiriyani();
    console.log(`${dinner} is served!`)
    }
  catch (error) {
    console.log(error);
    console.log('Ordering a pizza!');
  }
}

hostDinnerParty();
