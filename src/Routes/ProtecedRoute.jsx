import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticate }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      navigate('/');
    }
  }, [isAuthenticate, navigate]);

  return isAuthenticate ? children : null;
};

export default ProtectedRoute;
