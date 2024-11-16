// Initial state for car management
const initialState = {
  cars: [],           // List of cars
  selectedCar: null,  // Details of the currently selected car
  loading: false,     // Loading state for ongoing requests
  error: null,        // Stores error messages for failed actions
};

// Reducer function to handle car-related actions
export default function carReducer(state = initialState, action) {
  switch (action.type) {
    // Start of any request (fetching, adding, updating, deleting cars)
    case 'FETCH_CARS_REQUEST':
    case 'FETCH_CAR_DETAILS_REQUEST':
    case 'ADD_CAR_REQUEST':
    case 'UPDATE_CAR_REQUEST':
    case 'DELETE_CAR_REQUEST':
      return {
        ...state,
        loading: true, // Indicate a request is in progress
        error: null,   // Clear any existing errors
      };

    // Successfully fetched the list of cars
    case 'FETCH_CARS_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        cars: action.payload, // Update the cars list
      };

    // Successfully fetched details of a specific car
    case 'FETCH_CAR_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        selectedCar: action.payload, // Update the selected car details
      };

    // Successfully added a new car
    case 'ADD_CAR_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        cars: [...state.cars, action.payload], // Add the new car to the list
      };

    // Successfully updated a car
    case 'UPDATE_CAR_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car // Replace the updated car
        ),
        selectedCar: action.payload, // Update the selected car if it matches
      };

    // Successfully deleted a car
    case 'DELETE_CAR_SUCCESS':
      return {
        ...state,
        loading: false, // Stop loading
        cars: state.cars.filter((car) => car._id !== action.payload), // Remove the car
        selectedCar: null, // Clear selected car if deleted
      };

    // Handle any failures (fetching, adding, updating, deleting)
    case 'FETCH_CARS_FAILURE':
    case 'FETCH_CAR_DETAILS_FAILURE':
    case 'ADD_CAR_FAILURE':
    case 'UPDATE_CAR_FAILURE':
    case 'DELETE_CAR_FAILURE':
      return {
        ...state,
        loading: false, // Stop loading
        error: action.payload, // Store the error message
      };

    // Default case: return the current state if no action matches
    default:
      return state;
  }
}