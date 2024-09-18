// src/types/User.ts
import { User as FirebaseUser } from 'firebase/auth';

export interface FirestoreUserData {
  displayName?: string;
  email: string;
  photoURL?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  bio?: string;
}

export interface AppUser extends FirebaseUser {
  firestoreData?: FirestoreUserData;
}
