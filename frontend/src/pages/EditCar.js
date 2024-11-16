import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../services/api';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState({ car_type: '', company: '', dealer: '' });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCar = async () => {
    try {
      const res = await axios.get(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTitle(res.data.title);
      setDescription(res.data.description);
      setTags(res.data.tags);
    } catch (err) {
      setError('Failed to fetch car details');
    }
  };

  useEffect(() => {
    fetchCar();
    // eslint-disable-next-line
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files.length > 10) {
      setError('You can upload up to 10 images');
      return;
    }
    setError('');
    setImages(e.target.files);
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setTags((prevTags) => ({ ...prevTags, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      setIsLoading(true);
      await axios.put(`/api/cars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      navigate(`/cars/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update car');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-car-container">
      <h2>Edit Car</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            placeholder="Car Type"
            name="car_type"
            value={tags.car_type}
            onChange={handleTagChange}
          />
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={tags.company}
            onChange={handleTagChange}
          />
          <input
            type="text"
            placeholder="Dealer"
            name="dealer"
            value={tags.dealer}
            onChange={handleTagChange}
          />
        </div>
        <div>
          <label>Images (up to 10):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          {images.length > 0 && <p>{images.length} image(s) selected</p>}
        </div>
        <button type="submit" disabled={isLoading || images.length > 10}>
          {isLoading ? 'Updating...' : 'Update Car'}
        </button>
      </form>
    </div>
  );
};

export default EditCar;
