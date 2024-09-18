// src/components/Surfboards/AddSurfboardForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { addSurfboard } from '../../services/surfboardService';
import { Surfboard } from '../../types/Surfboard';
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddSurfboardForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<FileList | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert('Could not get your location');
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrls: string[] = [];

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `surfboards/${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }
    }

    const newSurfboard: Omit<Surfboard, 'id'> = {
      title,
      description,
      price,
      images: imageUrls,
      location: {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        address: '', // Optional: Use a geocoding API to get address
      },
      ownerId: currentUser!.uid,
    };

    await addSurfboard(newSurfboard);
    alert('Surfboard added successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add a Surfboard
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          required
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Price"
          fullWidth
          required
          type="number"
          margin="normal"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          style={{ marginTop: '16px' }}
        />
        <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
          Add Surfboard
        </Button>
      </form>
    </Container>
  );
};

export default AddSurfboardForm;
