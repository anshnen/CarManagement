import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '', // Fallback to an empty string if not set
});

// Interceptor to attach Authorization token to outgoing requests
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the Authorization header
      }
      return config;
    } catch (error) {
      console.error('Error attaching token to request:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request error:', error); // Log request errors
    return Promise.reject(error);
  }
);

// Interceptor for handling responses (optional)
API.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  (error) => {
    // Log the error for debugging
    console.error('API response error:', error);

    // Optional: Custom handling for specific status codes (e.g., unauthorized)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.warn('Unauthorized: Redirecting to login.');
      // Perform actions like clearing the token or redirecting to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }

    return Promise.reject(error); // Reject the promise with the error
  }
);

export default API;