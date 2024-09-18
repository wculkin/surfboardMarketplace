// src/components/Auth/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextField, Typography, Container } from '@mui/material';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate('/');
    } catch (error) {
      alert('Failed to create an account');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          required
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Log In</Link>
      </Typography>
    </Container>
  );
};

export default SignUp;
