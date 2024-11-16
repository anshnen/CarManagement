import API from '../../services/api';
import { showNotification } from './notificationActions';

// Utility function for error handling
const handleError = (dispatch, error, failureType) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  dispatch({ type: failureType, payload: message });
  dispatch(showNotification(message, 'error'));
};

// Fetch Cars Action (with optional filters)
export const fetchCars = (searchTerm = '', page = 1, limit = 6, myCarsOnly = false) => async (dispatch) => {
  dispatch({ type: 'FETCH_CARS_REQUEST' });
  try {
    const response = await API.get('/cars', {
      params: { search: searchTerm, page, limit, myCars: myCarsOnly },
    });
    dispatch({ type: 'FETCH_CARS_SUCCESS', payload: response.data });
  } catch (error) {
    handleError(dispatch, error, 'FETCH_CARS_FAILURE');
  }
};

// Fetch Car Details Action
export const fetchCarDetails = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_CAR_DETAILS_REQUEST' });
  try {
    const response = await API.get(`/cars/${id}`);
    dispatch({ type: 'FETCH_CAR_DETAILS_SUCCESS', payload: response.data });
  } catch (error) {
    handleError(dispatch, error, 'FETCH_CAR_DETAILS_FAILURE');
  }
};

// Add Car Action
export const addCar = (formData, history) => async (dispatch) => {
  dispatch({ type: 'ADD_CAR_REQUEST' });
  try {
    const response = await API.post('/cars', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: 'ADD_CAR_SUCCESS', payload: response.data });
    dispatch(showNotification('Car added successfully!', 'success'));
    history.push('/cars'); // Redirect to cars list
  } catch (error) {
    handleError(dispatch, error, 'ADD_CAR_FAILURE');
  }
};

// Update Car Action
export const updateCar = (id, formData, history) => async (dispatch) => {
  dispatch({ type: 'UPDATE_CAR_REQUEST' });
  try {
    const response = await API.put(`/cars/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: 'UPDATE_CAR_SUCCESS', payload: response.data });
    dispatch(showNotification('Car updated successfully!', 'success'));
    history.push(`/cars/${id}`); // Redirect to car details page
  } catch (error) {
    handleError(dispatch, error, 'UPDATE_CAR_FAILURE');
  }
};

// Delete Car Action
export const deleteCar = (id, history) => async (dispatch) => {
  dispatch({ type: 'DELETE_CAR_REQUEST' });
  try {
    await API.delete(`/cars/${id}`);
    dispatch({ type: 'DELETE_CAR_SUCCESS', payload: id });
    dispatch(showNotification('Car deleted successfully!', 'success'));
    history.push('/cars'); // Redirect to cars list
  } catch (error) {
    handleError(dispatch, error, 'DELETE_CAR_FAILURE');
  }
};