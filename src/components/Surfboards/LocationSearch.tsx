import React, { useState, useEffect } from 'react';
import { getSurfboards } from '../../services/surfboardService';
import { Surfboard } from '../../types/Surfboard';

const LocationSearch: React.FC = () => {
  const [surfboards, setSurfboards] = useState<Surfboard[]>([]);
  const [radius, setRadius] = useState<number>(10); // default radius in km

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const data = await getSurfboards(

      );
      setSurfboards(data);
    });
  }, [radius]);

  return (
    <div>
      {/* Radius input and surfboard list rendering */}
    </div>
  );
};

export default LocationSearch;
