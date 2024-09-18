// src/components/Messaging/Chat.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getMessages, sendMessage } from '../../services/messagingService';
import { Message } from '../../types/Message';
import { TextField, Button, List, ListItem, ListItemText, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const Chat: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (conversationId) {
      const unsubscribe = getMessages(conversationId, setMessages);
      return unsubscribe;
    }
  }, [conversationId]);

  const handleSend = async () => {
    if (text.trim()) {
      await sendMessage({
        conversationId: conversationId!,
        senderId: currentUser!.uid,
        text,
        timestamp: Date.now(),
      });
      setText('');
    }
  };

  return (
    <Container maxWidth="sm">
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText
              primary={msg.text}
              secondary={msg.senderId === currentUser!.uid ? 'You' : 'Them'}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        sx={{ mt: 2 }}
      />
      <Button onClick={handleSend} color="primary" variant="contained" sx={{ mt: 1 }}>
        Send
      </Button>
    </Container>
  );
};

export default Chat;
