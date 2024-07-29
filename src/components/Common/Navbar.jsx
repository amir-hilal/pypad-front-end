import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import '../../assets/css/styles.css';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false); // Close the menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-dark text-light p-5 flex flex-space-between flex-center">
      <div className="logo">
        <Link to="/" className="nav-button" onClick={closeMobileMenu}>Pypad</Link>
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
            <Link to="/profile" className="nav-button m-2" onClick={closeMobileMenu}>Profile</Link>
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
