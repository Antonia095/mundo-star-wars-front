import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/mundoStarWarsApi';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
