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
import PrivateRoute from './utils/PrivateRoute';
import EditCodePage from './pages/EditCodePage';

function App() {
  return (
    <Router>
      <div className="flex flex-column">
        <Navbar />
        <div className="flex-grow flex-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyEmailPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/code/:id" element={<EditCodePage />} />
            {/* Protected Routes */}
            <Route path="/search" element={<PrivateRoute element={SearchPage} />} />
            <Route path="/chats" element={<PrivateRoute element={ChatPage} />} />
            <Route path="/profile" element={< ProfilePage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
