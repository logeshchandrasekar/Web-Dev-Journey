// 1. GET request :
  // Used to RETRIEVE data from a server
fetch('https://api.example.com/data')
  // Step 1: Check if response is OK, then convert to JSON
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('GET Request Failed!');
  }, 
  // Step 2: Catch any network errors
  networkError => {
    console.log(networkError.message);
  })
  // Step 3: Use the data
  .then(jsonResponse => {
    console.log(jsonResponse); // Your data is here!
  });

/* Notes :
  We called the fetch() function to make a GET request to the API endpoint.
  Then, we chained a .then() method and passed two callback functions as arguments (response, networkError)
  - one to handle the promise if it resolves
  - one to handle network errors if the promise is rejected.
  - Then, a second .then() method logs the json response to console. */

//-------------------------------------------------------------------------------------------------------------------------------------//

// 2. POST request :
  // Used to SEND data to a server
fetch('https://api.example.com/data', {
  method: 'POST',                           // Specify POST method
  headers: {
    'Content-Type': 'application/json'      // Tell server we're sending JSON
  },
  body: JSON.stringify({                    // Convert JS object → JSON string
    name: 'Logesh',
    age: 22
  })
})
  // Step 1: Check if response is OK, then convert to JSON
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('POST Request Failed!');
  }, 
  // Step 2: Catch any network errors
  networkError => {
    console.log(networkError.message);
  })
  // Step 3: Use the response
  .then(jsonResponse => {
    console.log(jsonResponse); // Server's response is here!
  });

/* Notes :

i. Its syntax is same as 'GET request', the key differences are :
    * GET - has 'no body', just a URL.
	// fetch('https://api.example.com/users')
      
    * POST - has a body with {method, headers, and body}.
	// fetch('https://api.example.com/users', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ name: 'Logesh' })
	   }) 

ii. the .then() chain (Example):
    fetch(url, options)

    .then(response => response.json())  // Convert raw response → JSON

    .then(data => console.log(data))    // Now use the JSON data

    .catch(error => console.log(error)) // Catch any error in the chain

iii. Simple use case :
	  * Use GET when you want to read data.
	  * Use POST when you want to send/create data.
*/

//-------------------------------------------------------------------------------------------------------------------------------------//

// 3. GET request using async/await :
	const getData = async () => {
  // Step 1: Build the URL endpoint
	const userInput = inputField.value;
	const endpoint = `https://api.example.com/words?rel=${userInput}`;
  // Step 2: Try to fetch data from the API
	try {
    // Step 3: Await the fetch response
		const response = await fetch(endpoint, { cache: 'no-cache' });
    // Step 4: Check if the response was successful
    	if (response.ok) {
      // Step 5: Await and parse the JSON data
      		const jsonData = await response.json();
      // Step 6: Use the data (display it, process it, etc.)
			console.log(jsonData);
			}
			throw new Error('GET request failed');
  		} catch (error) {
    // Step 7: Handle any errors gracefully
    	console.log('Something went wrong:', error);
  	}
};

//-------------------------------------------------------------------------------------------------------------------------------------//

// 4. POST request using async/await :
const postData = async () => {
  // Step 1: Wrap the whole request logic in try/catch for error handling
  try {
	// Step 2: Send a POST request to the API endpoint
    const response = await fetch("https://api.example.com/words", {
      method: "POST",								     // - method: "POST" tells the server we are creating/sending new data
      headers: {									    // - headers: include content type and API key (if required)
        "Content-type": "application/json",
        apikey: apiKey
      },
      body: JSON.stringify({ word: inputField.value }) // - body: JSON.stringify converts the JS object into a JSON string
    });
    // Step 3: Check if the response status is in the success range (200-299)
    if (response.ok) {
      // Step 4: Await and parse the JSON response returned by the server
      const jsonResponse = await response.json();
      // Step 5: Use the response data (log it, render it, etc.)
      console.log(jsonResponse);
    }
    // Step 6: If the response was not ok, throw an error to be caught below
    throw new Error("POST request failed");
  } catch (error) {
    // Step 7: Handle any errors
    console.log(error);
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------//

/* General Notes :
	- GET and POST requests can be created in a variety of ways.
	- We can use fetch() and async/await to asynchronously request data from APIs.
	- Promises are a type of JavaScript object that represents data that will eventually be returned from a request.
	- The fetch() function can be used to create requests and will return promises.
	- We can chain .then() methods to handle promises returned by the fetch() function.
	- The async keyword is used to create asynchronous functions that will return promises.
	- The await keyword can only be used with functions declared with the async keyword.
	- The await keyword suspends the program while waiting for a promise to resolve. */
