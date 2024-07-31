import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Element }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default AdminRoute;
