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