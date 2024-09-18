// src/types/Surfboard.ts
export interface Surfboard {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  ownerId: string;
}
