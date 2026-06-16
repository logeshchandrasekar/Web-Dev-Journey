const grocery = ['juice', 'banana', 'cocoa', 'coffee', 'sugar'];

console.log(grocery.length); //prints array length

grocery.shift();
console.log(grocery); //prints array by removing first element

grocery.unshift('apple');
console.log(grocery); //prints array by adding given string as first element

console.log(grocery.slice(0,4)); //prints a new array with given range

grocery.splice(1,0, 'mango')
console.log(grocery); //inserts a new element within the given range

console.log(grocery.indexOf('sugar')); //prints index value of given element

grocery.forEach((items) => console.log(items)); //executes the function for each element

const newArr = grocery.filter((items) => items.length > 5);
console.log(newArr); //prints new array of filtered elements with given condition

const found = grocery.find((items) => items == 'cocoa');
console.log(found + ' - found'); //prints the element if the string matches the array element

const map = grocery.map((items) => items + ' - 1');
console.log(map); //creates a new array with given condition satisfied