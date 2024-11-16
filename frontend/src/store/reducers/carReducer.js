// Initial state for the car reducer
const initialState = {
  cars: [],           // Array to store the list of cars
  selectedCar: null,  // Stores the details of a specific car
  loading: false,     // Indicates if a request is in progress
  error: null,        // Stores any error messages
  totalPages: 1,      // Total number of pages for paginated car data
  currentPage: 1,     // Current page number for paginated car data
};

// Reducer function to manage car-related state
export default function carReducer(state = initialState, action) {
  switch (action.type) {
    // Handle loading states for all requests
    case 'FETCH_CARS_REQUEST':
    case 'FETCH_CAR_DETAILS_REQUEST':
    case 'ADD_CAR_REQUEST':
    case 'UPDATE_CAR_REQUEST':
    case 'DELETE_CAR_REQUEST':
      return { ...state, loading: true, error: null };

    // Handle successful fetch of cars with pagination
    case 'FETCH_CARS_SUCCESS':
      return {
        ...state,
        loading: false,
        cars: action.payload.docs,           // Car data from response
        totalPages: action.payload.totalPages, // Total pages from response
        currentPage: action.payload.page,    // Current page from response
      };

    // Handle successful fetch of a single car's details
    case 'FETCH_CAR_DETAILS_SUCCESS':
      return { ...state, loading: false, selectedCar: action.payload };

    // Handle successful addition of a new car
    case 'ADD_CAR_SUCCESS':
      return { ...state, loading: false, cars: [...state.cars, action.payload] };

    // Handle successful update of an existing car
    case 'UPDATE_CAR_SUCCESS':
      return {
        ...state,
        loading: false,
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        ),
        selectedCar: action.payload,
      };

    // Handle successful deletion of a car
    case 'DELETE_CAR_SUCCESS':
      return {
        ...state,
        loading: false,
        cars: state.cars.filter((car) => car._id !== action.payload),
        selectedCar: null,
      };

    // Handle all failures (fetch, add, update, delete)
    case 'FETCH_CARS_FAILURE':
    case 'FETCH_CAR_DETAILS_FAILURE':
    case 'ADD_CAR_FAILURE':
    case 'UPDATE_CAR_FAILURE':
    case 'DELETE_CAR_FAILURE':
      return { ...state, loading: false, error: action.payload };

    // Default case to return the current state if action type is not recognized
    default:
      return state;
  }
}