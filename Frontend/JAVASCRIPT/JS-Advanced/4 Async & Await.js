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
  // Calls withConstructor(0) and logs the resolved value using .then()
withConstructor(0)
  .then((resolveValue) => {
  console.log(` withConstructor(0) returned a promise which resolved to: ${resolveValue}.`);
});
  // ii - async function automatically wraps return value in a Promise :
const withAsync = async (num) => {
  if (num === 0){
      return 'zero';       // Implicitly resolves the promise with 'zero'
    } else {
      return 'not zero';   // Implicitly resolves the promise with 'not zero'
    }
}
  // Calls withAsync(100) and logs the resolved value using .then()
withAsync(100)
  .then((resolveValue) => {
  console.log(` withAsync(100) returned a promise which resolved to: ${resolveValue}.`);
});

  /* Note : Both approaches produce the same result — a resolved Promise.
            The async keyword is simply a cleaner, shorthand way to return Promises without manually using the new Promise constructor. */

//----------------------------------------------------------------------------------------------------------------------------------------------//
