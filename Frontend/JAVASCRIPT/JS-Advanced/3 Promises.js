// 1. general structure of an promise
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
