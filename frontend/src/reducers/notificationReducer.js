// Initial state for notifications
const initialState = {
  open: false,       // Whether the notification is visible
  message: '',       // Message to be displayed in the notification
  severity: 'success', // Notification type: 'error', 'warning', 'info', or 'success'
};

// Reducer function to handle notification-related actions
export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    // Display a notification
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        open: true, // Open the notification
        message: action.payload.message, // Set the message
        severity: action.payload.severity || 'info', // Set the severity or default to 'info'
      };

    // Clear or close the notification
    case 'CLEAR_NOTIFICATION':
      return {
        ...initialState, // Reset to the initial state
      };

    // Return the current state for unhandled action types
    default:
      return state;
  }
}