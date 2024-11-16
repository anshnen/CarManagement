import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { CarRental, Logout } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import darkTheme from '../theme'; // Import the dark theme

const drawerWidth = 240;

function Layout({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: darkTheme.headerBackground, // Dark theme color
        }}
      >
        <Toolbar>
          <CarRental sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Car Management App
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                color: darkTheme.buttonText,
              },
            }}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: darkTheme.background, // Dark theme color
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: darkTheme.background, // Dark theme color
            color: darkTheme.color,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem
              button
              component={Link}
              to="/cars"
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: darkTheme.headerBackground,
                },
              }}
            >
              <ListItemIcon>
                <CarRental sx={{ color: darkTheme.color }} />
              </ListItemIcon>
              <ListItemText primary="My Cars" sx={{ color: darkTheme.color }} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cars/new"
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: darkTheme.headerBackground,
                },
              }}
            >
              <ListItemIcon>
                <CarRental sx={{ color: darkTheme.color }} />
              </ListItemIcon>
              <ListItemText primary="Add New Car" sx={{ color: darkTheme.color }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: darkTheme.background, // Dark theme color
          color: darkTheme.color, // Text color
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;