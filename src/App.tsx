import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import SurfboardsPage from './pages/SurfboardsPage';
import AddSurfboardPage from './pages/AddSurfboardPage';
import React from "react";

const App: React.FC = () => {
  return (//<ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-surfboard" element={<PrivateRoute component={<AddSurfboardPage />} />} />
          <Route path="/" element={<SurfboardsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App