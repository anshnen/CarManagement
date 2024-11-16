import API from '../../services/api';
import { showNotification } from './notificationActions';

// Utility function to handle errors
const handleError = (dispatch, error, failureType) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  dispatch({ type: failureType, payload: message });
  dispatch(showNotification(message, 'error'));
};

// Login Action
export const login = (formData, history) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await API.post('/users/login', formData);
    const { token, user } = response.data;

    // Save token to localStorage
    localStorage.setItem('token', token);

    // Dispatch success action
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    dispatch(showNotification('Logged in successfully!', 'success'));

    // Redirect to cars page
    history.push('/cars');
  } catch (error) {
    handleError(dispatch, error, 'LOGIN_FAILURE');
  }
};

// Register Action
export const register = (formData, history) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    await API.post('/users/register', formData);

    // Dispatch success action
    dispatch({ type: 'REGISTER_SUCCESS' });
    dispatch(showNotification('Registered successfully! Please log in.', 'success'));

    // Redirect to login page
    history.push('/login');
  } catch (error) {
    handleError(dispatch, error, 'REGISTER_FAILURE');
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  // Clear token from localStorage
  localStorage.removeItem('token');

  // Dispatch logout action
  dispatch({ type: 'LOGOUT' });
  dispatch(showNotification('Logged out successfully!', 'success'));
};

// Set User from Local Storage
export const setUserFromStorage = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});