// src/services/messagingService.ts
import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { Message } from '../types/Message';

const messagesCollection = collection(db, 'messages');

export const sendMessage = async (message: {
    senderId: string;
    conversationId: string;
    text: string;
    timestamp: number
}) => {
  await addDoc(messagesCollection, {
    ...message,
    timestamp: Timestamp.now(),
  });
};

export const getMessages = (
  conversationId: string,
  callback: (messages: Message[]) => void
) => {
  const q = query(
    messagesCollection,
    where('conversationId', '==', conversationId),
    orderBy('timestamp', 'asc')
  );
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
    callback(msgs);
  });
};
