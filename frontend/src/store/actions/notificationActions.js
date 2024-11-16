// Action to display a notification
export const showNotification = (message, severity = 'success') => ({
  type: 'SHOW_NOTIFICATION',
  payload: { message, severity },
});

// Action to clear the notification
export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION',
});
