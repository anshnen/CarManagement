// Initial state for the auth reducer
const initialState = {
  user: null,      // Stores the authenticated user's details
  loading: false,  // Indicates if a request is in progress
  error: null,     // Holds any error messages from failed requests
};

// Reducer to handle authentication actions
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // Start of a login or registration request
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: true, // Set loading state
        error: null,   // Clear any previous errors
      };

    // Successful login
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        user: action.payload, // Store the authenticated user details
      };

    // Successful registration
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        // No user details to store in this case
      };

    // Failed login or registration
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        loading: false,  // Stop loading
        error: action.payload, // Store the error message
      };

    // Logout action
    case 'LOGOUT':
      return initialState; // Reset state to initial values

    // Default case: return the current state if no action matches
    default:
      return state;
  }
}