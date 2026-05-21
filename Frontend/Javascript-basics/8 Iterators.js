// The .forEach() method
const fruits = ['mango', 'papaya', 'pineapple', 'apple'];
fruits.forEach (fruitItems => {
  console.log('I want to eat a ' + fruitItems);
});

// The .map() method
const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];
const secretMessage = animals.map(animals => animals[0]);
console.log(secretMessage.join(''));

const bigNumbers = [100, 200, 300, 400, 500];
const smallNumbers = bigNumbers.map(bigNumbers => bigNumbers/100);
console.log(smallNumbers);

// The .filter() method
const randomNumbers = [375, 200, 3.14, 7, 13, 852];
const smallNumbers = randomNumbers.filter(smallNumbers => {
  return smallNumbers < 250;
});

const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];
const longFavoriteWords = favoriteWords.filter(longFavoriteWords => {
  return longFavoriteWords.length > 7;
});

const words = ['chair', 'music', 'pillow', 'brick', 'pen', 'door']; 
const shortWords = words.filter(word => {
  return word.length < 6;
});

console.log(smallNumbers);
console.log(longFavoriteWords);
console.log(shortWords);

// The .findIndex() method
const animals = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];
const foundAnimal = animals.findIndex(animal => {
  return animal === 'elephant';
});
const startsWithS = animals.findIndex(animal => {
  return animal[0] === 's';
})

// The .reduce() method
const newNumbers = [1, 3, 5, 7];
const newSum = newNumbers.reduce((accumulator,currentValue) => {
  console.log('The value of accumulator: ', accumulator);
  console.log('The value of currentValue: ', currentValue);
  return accumulator + currentValue;
},10)
console.log('Final value: ' + newSum);
