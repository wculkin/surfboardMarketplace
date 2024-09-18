// src/components/Surfboards/SurfboardDetails.tsx
import React, { useEffect, useState } from 'react';
import { getSurfboardById } from '../../services/surfboardService';
import { Surfboard } from '../../types/Surfboard';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SurfboardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [surfboard, setSurfboard] = useState<Surfboard | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurfboard = async () => {
      if (id) {
        const data = await getSurfboardById(id);
        setSurfboard(data);
      }
    };
    fetchSurfboard();
  }, [id]);

  if (!surfboard) {
    return <Typography>Loading...</Typography>;
  }

  const handleMessage = () => {
    // Logic to initiate messaging with the owner
    navigate(`/messages/${surfboard.ownerId}`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {surfboard.title}
      </Typography>
      {/* Display images using a carousel or any image slider */}
      {/* Assuming you have a Carousel component or use MUI's ImageList */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        ${surfboard.price}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {surfboard.description}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleMessage}>
        Message Owner
      </Button>
    </Container>
  );
};

export default SurfboardDetails;
