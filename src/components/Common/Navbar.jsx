import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../../slices/authSlice';
import '../../assets/css/styles.css';
import axiosInstance from '../../services/axiosInstance'; // Assuming you have an axios instance

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn && !user) {
        try {
          const response = await axiosInstance.get('/me');
          console.log(response)
          dispatch(setUser(response.data.data.user));
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn, user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-dark text-light p-5 flex flex-space-between flex-center align-center">
      <div className="logo flex align-center">
        <Link to="/" className="nav-button" onClick={closeMobileMenu}>Pypad</Link>
        {user && (
          <>
            <span className="flex align-center m-2">&#x2022;</span>
            <span className="m-2 flex align-center">{user.username}</span>
          </>
        )}
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-button m-2" onClick={closeMobileMenu}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/workspace" className="nav-button m-2" onClick={closeMobileMenu}>My Workspace</Link>
            <Link to="/search" className="nav-button m-2" onClick={closeMobileMenu}>Search</Link>
            <Link to="/chats" className="nav-button m-2" onClick={closeMobileMenu}>Chats</Link>
            <Link to="/friends" className="nav-button m-2" onClick={closeMobileMenu}>Friends</Link>
            <Link to="/profile" className="nav-button m-2" onClick={closeMobileMenu}>Profile</Link>
            {user && (user.role === 'admin' || user.role === 'superadmin') && (
              <Link to="/admin" className="nav-button m-2" onClick={closeMobileMenu}>Admin</Link>
            )}
            <button onClick={handleLogout} className="nav-button m-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button m-2" onClick={closeMobileMenu}>Login</Link>
            <Link to="/signup" className="nav-button m-2" onClick={closeMobileMenu}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
