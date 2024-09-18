// src/components/Surfboards/SearchBar.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search Surfboards"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
