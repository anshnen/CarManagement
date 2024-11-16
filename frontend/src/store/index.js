import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';  // Optional: for logging actions

import authReducer from './reducers/authReducer';
import carReducer from './reducers/carReducer';
import notificationReducer from './reducers/notificationReducer';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cars: carReducer,
  notification: notificationReducer,
});

// Optional: Load persisted auth state from localStorage (if needed)
const persistedAuthState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : { user: null, loading: false, error: null };

const store = createStore(
  rootReducer,
  { auth: persistedAuthState }, // Preload persisted state for auth
  composeWithDevTools(
    applyMiddleware(
      thunk,
      logger // Optional: enables logging actions in the console
    )
  )
);

// Optional: Save auth state to localStorage on changes
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('auth', JSON.stringify(state.auth));
});

export default store;