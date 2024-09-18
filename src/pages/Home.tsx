// src/pages/Home.tsx
import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Welcome to the Surf Marketplace
      </Typography>
      <Typography variant="h5" gutterBottom>
        Buy and sell surfboards with ease
      </Typography>
      <Button
        component={Link}
        to="/surfboards"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        View Surfboards
      </Button>
    </Container>
  );
};

export default Home;
