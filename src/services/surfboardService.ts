// src/services/surfboardService.ts
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { Surfboard } from '../types/Surfboard';

const surfboardCollection = collection(db, 'surfboards');

export const getSurfboards = async (): Promise<Surfboard[]> => {
  const snapshot = await getDocs(surfboardCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Surfboard));
};

export const getSurfboardById = async (id: string): Promise<Surfboard | null> => {
  const docRef = doc(db, 'surfboards', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Surfboard;
  } else {
    return null;
  }
};

export const addSurfboard = async (surfboard: Omit<Surfboard, 'id'>) => {
  await addDoc(surfboardCollection, surfboard);
};
