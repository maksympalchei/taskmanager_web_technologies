import React from 'react';
import propTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/signin" />;
}
ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};
export default ProtectedRoute;
