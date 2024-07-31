import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './assets/css/styles.css';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import Signup from './pages/Signup';
import VerifyEmailPage from './pages/VerifyEmailPage';
import WorkspacePage from './pages/WorkSpacePage';
import FriendsPage from './pages/FriendsPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // Import the Admin Dashboard Page
import PrivateRoute from './utils/PrivateRoute';
import EditCodePage from './pages/EditCodePage';
import GuestRoute from './utils/GuestRoute';
import AdminRoute from './utils/AdminRoute'; // Import the AdminRoute component

function App() {
  return (
    <Router>
      <div className="flex flex-column">
        <Navbar />
        <div className="flex-grow flex-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<GuestRoute element={LoginPage} />} />
            <Route path="/signup" element={<GuestRoute element={Signup} />} />
            <Route path="/verify" element={<GuestRoute element={VerifyEmailPage} />} />

            {/* Protected Routes */}
            <Route path="/code/:id" element={<PrivateRoute element={EditCodePage} />} />
            <Route path="/workspace" element={<PrivateRoute element={WorkspacePage} />} />
            <Route path="/code/:id" element={<PrivateRoute element={EditCodePage} />} />
            <Route path="/dashboard" element={<PrivateRoute element={AdminDashboardPage} />} />
            <Route path="/search" element={<PrivateRoute element={SearchPage} />} />
            <Route path="/chats" element={<PrivateRoute element={ChatPage} />} />
            <Route path="/friends" element={<PrivateRoute element={FriendsPage} />} />
            <Route path="/profile" element={<PrivateRoute element={ProfilePage} />} />
            <Route path="/workspace" element={<PrivateRoute element={WorkspacePage} />} />
            <Route path="/admin" element={<AdminRoute element={AdminDashboardPage} />} /> {/* Admin Route */}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
