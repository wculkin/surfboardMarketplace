// src/components/Surfboards/SurfboardList.tsx
import React, { useEffect, useState } from 'react';
import { getSurfboards } from '../../services/surfboardService';
import { Surfboard } from '../../types/Surfboard';
import SurfboardCard from './SurfboardCard';
import { Box, Grid } from '@mui/material';
import SearchBar from './SearchBar';

const SurfboardList: React.FC = () => {
  const [surfboards, setSurfboards] = useState<Surfboard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSurfboards = async () => {
      const data = await getSurfboards();
      setSurfboards(data);
    };
    fetchSurfboards();
  }, []);

  const filteredSurfboards = surfboards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredSurfboards.map((surfboard) => (
          <Grid xs={12} sm={6} md={4} key={surfboard.id}>
            <SurfboardCard surfboard={surfboard} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SurfboardList;
