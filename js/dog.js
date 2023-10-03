// Select the button element with the ID "get-dog"
const dogButton = document.getElementById('get-dog');

// Add a click event listener to the button
dogButton.addEventListener('click', function () {
  // When the button is clicked, execute the following code

  // Calls the getData() function to fetch a random dog image
  getData()
    .then((response) => {
      // If the request is successful, update the dog image on the page
      const dogImg = document.getElementById('dog');
      dogImg.src = response.message;
    })
    .catch((err) => {
      // If there is an error, log it to the console
      console.error(err);
    });
});

// Function to fetch data from the Dog API
function getData() {
  return new Promise(function (resolve, reject) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open a GET request to the Dog API endpoint
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random', true);

    // Send the request
    xhr.send();

    // Listen for changes in the request state
    xhr.onreadystatechange = function () {
      // When the request is complete
      if (xhr.readyState === 4) {
        // If the request is successful
        if (xhr.status === 200) {
          // Parse the response as JSON
          const respJSON = JSON.parse(xhr.responseText);

          // Resolve the promise with the parsed JSON response
          resolve(respJSON);
        } else {
          // If the request fails, reject the promise with the HTTP status code
          reject(xhr.status);
        }
      }
    };
  });
}