import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
