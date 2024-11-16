// src/pages/CarCreatePage.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../store/actions/carActions';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom'; // Replacing `useHistory` with `useNavigate`

function CarCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate is the new hook in react-router-dom v6
  const { loading, error } = useSelector((state) => state.cars);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('You can upload up to 10 images.');
      return;
    }
    setFormData({ ...formData, images: files });

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.images.length) {
      alert('Please fill all the fields and upload images.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('tags', formData.tags);

    formData.images.forEach((image) => {
      data.append('images', image);
    });

    try {
      await dispatch(addCar(data, navigate));
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center">
          Add New Car
        </Typography>
      </Box>

      {/* Display error if any */}
      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* Title Field */}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        {/* Description Field */}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* Tags Field */}
        <TextField
          margin="normal"
          fullWidth
          label="Tags (comma separated)"
          name="tags"
          value={formData.tags}
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value })
          }
        />

        {/* Image Upload Button */}
        <Button
          variant="contained"
          component="label"
          startIcon={<AddPhotoAlternateIcon />}
          sx={{ mt: 2, mb: 2 }}
        >
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {imagePreviews.map((src, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Box
                  component="img"
                  src={src}
                  alt={`Preview ${index + 1}`}
                  sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Car'}
        </Button>
      </Box>
    </Container>
  );
}

export default CarCreatePage;