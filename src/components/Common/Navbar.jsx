import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlices';
import '../../assets/css/styles.css';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <><nav className="bg-dark h-10 text-light p-5 flex flex-space-between flex-center">
      <div className="logo">
        <Link to="/" className="nav-button">Pypad</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button m-2">Home</Link>
        {isLoggedIn ? (
          <>

            <Link to="/workspace" className="nav-button m-2">My Workspace</Link>
            <Link to="/search" className="nav-button m-2">Search</Link>
            <Link to="/chats" className="nav-button m-2">Chats</Link>
            <Link to="/profile" className="nav-button m-2">Profile</Link>
            <button onClick={handleLogout} className="nav-button m-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button m-2">Login</Link>
            <Link to="/signup" className="nav-button m-2">Sign Up</Link>
          </>
        )}
      </div>
    </nav></>
  );
};

export default Navbar;
