import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/styles.css';

const Navbar = () => {
  return (
    <nav className="bg-dark h-10 text-light p-5 flex flex-space-between flex-center">
      <div className="logo">
        <Link to="/" className="nav-button">Pypad</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button m-2">Home</Link>
        <Link to="/workspace" className="nav-button m-2">My WorkSpace</Link>
        <Link to="/search" className="nav-button m-2">Search</Link>
        <Link to="/chats" className="nav-button m-2">Chats</Link>
        <Link to="/login" className="nav-button m-2">Login</Link>
        <Link to="/signup" className="nav-button m-2">Sign Up</Link>
        <Link to="/profile" className="nav-button m-2">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
