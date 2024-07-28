import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import WorkspacePage from './pages/WorkSpacePage';
import './assets/css/styles.css';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import Signup from './pages/Signup';
function App() {
  return (
    <Router>
      <div className="flex flex-column">
        <Navbar  />
        <div className="flex-grow flex-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

