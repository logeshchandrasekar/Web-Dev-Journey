// Creating array
const hobbies =  ['learn','code','post'];
console.log(hobbies)

//access elements
const numbers = ['One', 'Two', 'Three'];
const listItem = (famousSayings[0]);
console.log(listItem);
console.log(numbers[2]);
console.log(numbers[3]);

// Updating elements in array
let groceryList = ['bread', 'tomatoes', 'milk'];
groceryList[1] = 'avocados';

// Arrays with let and const
let condiments = ['Ketchup', 'Mustard', 'Soy Sauce', 'Sriracha'];
const utensils = ['Fork', 'Knife', 'Chopsticks', 'Spork'];
condiments[0] = 'Mayo';
console.log(condiments);
condiments = ['Mayo'];
console.log(condiments);
utensils[3] = 'Spoon';
console.log(utensils);
utensils = ['Spoon'];
console.log(utensils);

// The .length property
const objectives = ['Learn a new language', 'Read 52 books', 'Run a marathon'];
console.log(objectives.length); // Output = 3

// The .push() method
const chores = ['wash dishes','do laundry','take out trash'];
chores.push('clean desk','arrange books');
console.log(chores);

// The .pop() method
const newItemTracker = ['item 0', 'item 1', 'item 2'];
const removed = newItemTracker.pop();
console.log(newItemTracker); // Output: [ 'item 0', 'item 1' ]
console.log(removed); // Output: item 2

// Few more methods - .shift(), .unshift(), .Slice(0, 4), .indexOf(' ') 
const groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];
groceryList.shift();
console.log(groceryList);
groceryList.unshift('popcorn');
console.log(groceryList);
console.log(groceryList.slice(1, 4));
console.log(groceryList);
const pastaIndex = groceryList.indexOf('pasta');
console.log(pastaIndex);

// Array in function
const concept = ['arrays', 'can', 'be', 'changed'];
function changeArr(arr){
  arr[3] = 'CHANGED';
}
changeArr(concept);
console.log(concept);
function removeElement(newArr){
  newArr.pop();
}
removeElement(concept);
console.log(concept);

// Nested arrays
let numberClusters = [[1,2],[3,4],[5,6]];
const target = numberClusters[2][1];
console.log(target);

/*  Summary of Definitions :

- Arrays are lists that store data.
- Arrays are created with brackets [].
- Each item within an array is located at a numbered position, or index, starting at 0.
- We can access one item in an array using its index, with syntax like: myArray[0].
- We can also change an item in an array using its index, with syntax like myArray[0] = 'new string';
- Arrays have a (.length) property, which allows you to see how many items are in an array.
    Arrays have their own methods like .push() and .pop(), which add and remove items from an array, respectively.
- Arrays also have many methods that perform different tasks, such as .slice() and .shift().
- variables that contain arrays can be declared with let or const.
    Even when declared with const, arrays are still mutable. However, a variable declared with const cannot be reassigned.
    Arrays mutated within a function will keep that change even outside the function.
- Arrays can be nested inside other arrays.
    To access elements in nested arrays, chain indices using bracket notation. */
