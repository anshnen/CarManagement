// Initial state for the authentication reducer
const initialState = {
  user: null,       // Stores the authenticated user's details
  loading: false,   // Indicates if an authentication request is in progress
  error: null,      // Stores any error messages from authentication requests
};

// Reducer function to manage authentication-related state
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      // Set loading to true and clear any previous errors
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      // Save the user data and stop loading
      return { ...state, loading: false, user: action.payload };

    case 'REGISTER_SUCCESS':
      // Registration successful, stop loading (user login may follow separately)
      return { ...state, loading: false };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      // Save the error message and stop loading
      return { ...state, loading: false, error: action.payload };

    case 'LOGOUT':
      // Reset the state to initial values on logout
      return initialState;

    default:
      // Return the current state if no action matches
      return state;
  }
}
  