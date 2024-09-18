// src/components/Auth/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute: React.FC<{ component: React.ReactElement }> = ({ component }) => {
  const { currentUser } = useAuth();
  return currentUser ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
