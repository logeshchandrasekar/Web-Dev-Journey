  // NOTE:This lesson requires basic understanding of DOM in js.
// 1. Get request using fetch() :
  // Information to reach API
const url = 'https://api.datamuse.com/words?sl=';
  // Selects page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

  // Asynchronous function
    // Arrow function to fetch 'word suggestions' from the API
const getSuggestions = () => {
  const wordQuery = inputField.value; // Gets user input value
  const endpoint = `${url}${wordQuery}`; // Builds full API URL with query

  // Fetches data from API, bypassing cache
  fetch(endpoint, {cache: 'no-cache'}).then(response => {
    if (response.ok) {
      return response.json(); // Parses response as JSON if successful
    }
    throw new Error('Request failed!'); // Throws error if response not ok
  }, networkError => {
    console.log(networkError.message) // Logs any network/connection errors
  })
  .then((jsonResponse) => {
    console.log(jsonResponse);
  })
}

/* Notes :
  We called the fetch() function to make a GET request to the Datamuse API endpoint.
  Then, we chained a .then() method and passed two callback functions as arguments 
  - one to handle the promise if it resolves
  - one to handle network errors if the promise is rejected.
  - Then, a second .then() method logs the json response to console. */
