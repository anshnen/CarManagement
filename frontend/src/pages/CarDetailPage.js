// src/pages/CarDetailPage.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails, deleteCar } from '../store/actions/carActions';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  CardMedia,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CarDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedCar, loading, error } = useSelector((state) => state.cars);
  const currentUser = useSelector((state) => state.auth.user); // Get current user
  const [open, setOpen] = useState(false); // For delete confirmation

  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteCar(id, history));
    setOpen(false);
  };

  if (loading || !selectedCar) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  // Determine if the current user owns the car
  const isOwner = currentUser && selectedCar.userId._id === currentUser.id;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/cars"
          sx={{
            color: 'white', 
            borderColor: 'white', 
            '&:hover': { borderColor: 'white', backgroundColor: '#444' }
          }}
        >
          Back to List
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        {selectedCar.title}
      </Typography>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {selectedCar.images.length > 0 ? (
              selectedCar.images.map((img, index) => (
                <Grid item xs={6} key={index}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://car-system-backend-1.onrender.com/${img}`}
                    alt={`Car Image ${index + 1}`}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
              ))
            ) : (
              <Typography sx={{ color: 'white' }}>No images available.</Typography>
            )}
          </Grid>
        </Grid>

        {/* Car Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ color: 'white' }}>Description</Typography>
          <Typography paragraph sx={{ color: 'white' }}>{selectedCar.description}</Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>Tags</Typography>
          <Typography paragraph sx={{ color: 'white' }}>{selectedCar.tags.join(', ')}</Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>Owner</Typography>
          <Typography paragraph sx={{ color: 'white' }}>{selectedCar.userId.username}</Typography>

          {/* Conditionally render Edit and Delete buttons */}
          {isOwner && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                component={Link}
                to={`/cars/${id}/edit`}
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setOpen(true)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        sx={{ '& .MuiDialog-paper': { backgroundColor: '#333', color: 'white' } }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: 'white' }}>Delete Car</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description" sx={{ color: 'white' }}>
            Are you sure you want to delete this car? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: 'white' }}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CarDetailPage;