// src/components/Messaging/MessageInput.tsx
import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  onSend: (messageText: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        onKeyPress={handleKeyPress}
      />
      <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
