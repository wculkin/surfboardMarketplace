// src/components/Messaging/MessageList.tsx
import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { Message } from '../../types/Message';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const { currentUser } = useAuth();

  return (
    <List sx={{ width: '100%', maxHeight: '60vh', overflow: 'auto' }}>
      {messages.map((msg) => {
        const isCurrentUser = msg.senderId === currentUser?.uid;
        return (
          <ListItem
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                bgcolor: isCurrentUser ? 'primary.main' : 'grey.300',
                color: isCurrentUser ? 'white' : 'black',
                borderRadius: 2,
                p: 1,
                maxWidth: '70%',
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                    {msg.text}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: 'inherit' }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                }
              />
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MessageList;
