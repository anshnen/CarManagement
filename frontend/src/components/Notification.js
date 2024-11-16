import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../store/actions/notificationActions';
import darkTheme from '../theme'; // Import dark theme

function Notification() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.notification);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearNotification());
  };

  // Define alert color mapping based on severity
  const alertColorMapping = {
    success: darkTheme.success,
    error: darkTheme.error,
    info: darkTheme.info,
    warning: darkTheme.warning,
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{ backgroundColor: darkTheme.background }} // Snackbar background color for dark mode
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: '100%',
          backgroundColor: alertColorMapping[severity], // Alert background color based on severity
          color: darkTheme.alertTextColor, // Text color for Alert
          borderRadius: '4px',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
