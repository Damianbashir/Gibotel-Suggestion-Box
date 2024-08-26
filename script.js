function displayDate() {
  const suggestionBox = document.getElementById('suggestionBox');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  suggestionBox.textContent = formattedDate;
  suggestionBox.style.display = 'block';
}

function hideDate() {
  const suggestionBox = document.getElementById('suggestionBox');
  suggestionBox.style.display = 'none';
}

const displayDateButton = document.getElementById('displayDateButton');
const hideDateButton = document.getElementById('hideDateButton');

displayDateButton.addEventListener('click', displayDate);
hideDateButton.addEventListener('click', hideDate);

// Assuming you're using axios for making HTTP requests
const axios = require('axios');

// Base URL of your backend API
const baseURL = 'http://localhost:5000'; // Replace with your actual backend URL

// Function to submit a general suggestion to the backend
function submitGeneralSuggestion(suggestion) {
  axios.post(`${baseURL}/submit-general-suggestion`, {
    suggestion
  })
    .then(response => {
      // Handle the response (e.g., show a success message)
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to submit a food rating to the backend
function submitFoodRating(rating, feedback) {
  axios.post(`${baseURL}/submit-food-rating`, {
    rating,
    feedback
  })
    .then(response => {
      // Handle the response (e.g., show a success message)
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

// Event listeners for form submissions
document.getElementById('general-suggestion-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const suggestion = document.getElementById('general-suggestion').value;
  submitGeneralSuggestion(suggestion);
});

document.getElementById('food-rating-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const rating = document.getElementById('food-rating').value;
  const feedback = document.getElementById('food-feedback').value;
  submitFoodRating(rating, feedback);
});