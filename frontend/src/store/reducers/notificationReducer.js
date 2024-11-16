// Initial state of the notification
const initialState = {
  open: false,         // Flag to show/hide the notification
  message: '',         // Message to be displayed in the notification
  severity: 'success', // Severity level of the notification ('error', 'warning', 'info', 'success')
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    // Show notification action
    case 'SHOW_NOTIFICATION':
      return {
        open: true,                     // Show the notification
        message: action.payload.message, // Set the message from action payload
        severity: action.payload.severity, // Set the severity level
      };

    // Clear notification action
    case 'CLEAR_NOTIFICATION':
      return initialState;  // Reset the state to initial, closing the notification

    // Default case returns the current state
    default:
      return state;
  }
}