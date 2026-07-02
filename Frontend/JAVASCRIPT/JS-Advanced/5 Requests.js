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
    age: 25
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
  1. Its syntax is same as 'GET request', the key differences are :
  
    i. GET - has 'no body', just a URL.
      (i.e) fetch('https://api.example.com/users')
      
    ii. POST - has a body with {method, headers, and body}.
      (i.e) fetch('https://api.example.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Logesh' })
}) 

  2. the .then() chain :
  (i.e)
    fetch(url, options)

    .then(response => response.json())  // Convert raw response → JSON

    .then(data => console.log(data))    // Now use the JSON data

    .catch(error => console.log(error)) // Catch any error in the chain

  3. Simple use case :
	  * Use GET when you want to read data.
	  * Use POST when you want to send/create data.
*/

//-------------------------------------------------------------------------------------------------------------------------------------//
