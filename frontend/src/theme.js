import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for primary theme
    },
    secondary: {
      main: '#007aff', // Blue accent for secondary elements
    },
    background: {
      default: '#121212', // Dark background for dark theme
      paper: '#1e1e1e',   // Dark paper background for cards and elements
    },
    text: {
      primary: '#ffffff', // White text color for dark mode
      secondary: '#b0b0b0', // Light gray text color
    },
    error: {
      main: '#f44336', // Red for error notifications
    },
    warning: {
      main: '#ff9800', // Orange for warnings
    },
    info: {
      main: '#2196f3', // Blue for informational messages
    },
    success: {
      main: '#4caf50', // Green for success notifications
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' },
    h2: { fontSize: '2rem', fontWeight: 600, color: '#ffffff' },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#e0e0e0', // Light text for body in dark theme
    },
    button: {
      textTransform: 'none', // Keep buttons' text case as is
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          transition: 'all 0.3s ease-in-out',
          padding: '8px 16px',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#333', // Darker hover effect
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly stronger shadow
          backgroundColor: '#1e1e1e', // Dark card background
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#333', // Dark background for text fields
          borderRadius: 4,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#444', // Lighter border color for dark mode
            },
            '&:hover fieldset': {
              borderColor: '#007aff', // Highlighted border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007aff', // Focused field border color
            },
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#333', // Dark background for snackbar
          color: '#fff', // Light text for snackbar
        },
      },
    },
  },
});

export default theme;