// src/components/Surfboards/SurfboardCard.tsx
import React from 'react';
import { Surfboard } from '../../types/Surfboard';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  surfboard: Surfboard;
}

const SurfboardCard: React.FC<Props> = ({ surfboard }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={surfboard.images[0]}
        alt={surfboard.title}
      />
      <CardContent>
        <Typography variant="h5">{surfboard.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {surfboard.description.substring(0, 100)}...
        </Typography>
        <Typography variant="h6">${surfboard.price}</Typography>
        <Button
          color="primary"
          onClick={() => navigate(`/surfboards/${surfboard.id}`)}
          sx={{ mt: 1 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SurfboardCard;
