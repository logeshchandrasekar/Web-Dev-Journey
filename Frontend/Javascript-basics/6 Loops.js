// For loop & reverse loop
for (let count = 5; count <= 10; count++){
  console.log(count);
};

for (let counter = 3; counter >= 0; counter--){
  console.log(counter);
}

// Looping in arrays
const vacationSpots = ["Bali", "Paris", "Tulum"];
for (let i = 0; i < vacationSpots.length; i++) {
  console.log("I would love to visit " + vacationSpots[i]);
}

// Nested loops
let myFollowers = ['a','b','c','d'];
let yourFollowers = ['b','d','e'];
let mutualFollowers = [];
for(let i=0; i<myFollowers.length; i++){
  for(let j=0; j<yourFollowers.length; j++){
    if (myFollowers[i] === yourFollowers[j]){
      mutualFollowers.push(myFollowers[i])
    }
  }
};
console.log(mutualFollowers);

// While loop
const cards = ['diamond', 'spade', 'heart', 'club'];
let currentCard;
while (currentCard !== 'spade') {
  currentCard = cards[Math.floor(Math.random() * 4)];
  console.log(currentCard);
  currentCard++;
}

// Do...While statement
let cupsOfSugarNeeded = 4;
let cupsAdded = 0;
do{
  console.log(cupsAdded + ' cups added');
  cupsAdded++;
} while (cupsAdded <= cupsOfSugarNeeded);

// Break keyword
const rapperArray = ["Lil' Kim", "Jay-Z", "Notorious B.I.G.", "Tupac"];
for(let i = 0; i < rapperArray.length; i++){
  console.log(rapperArray[i]);
  if(rapperArray[i] === "Notorious B.I.G."){
    break;
  }
}
console.log("And if you don't know, now you know.")

/* 
Topic definitions:

- Loops perform repetitive actions, so we don’t have to code that process manually every time.
- A nested for loop is a loop inside another loop
- while loops allow for different types of stopping conditions
- Stopping conditions are crucial for avoiding infinite loops.
- do...while loops run code at least once — only checking the stopping condition after the first execution
- The break keyword allows programs to leave a loop during the execution of its block
*/
