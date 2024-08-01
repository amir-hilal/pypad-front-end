import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../slices/authSlice';
import axiosInstance from '../services/axiosInstance';

const AdminRoute = ({ element: Element }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get('/me');
        dispatch(login({ user: data.data.user, token: localStorage.getItem('token') }));
        if (data.data.user.role === 'admin' || data.data.user.role === 'superadmin') {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, isLoggedIn]);

  if (loading) {
    return <div className='min-h-75 flex flex-center'>Loading...</div>;
  }

  if (!isLoggedIn || !isAuthorized) {
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default AdminRoute;
