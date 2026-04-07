import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = (userData) => {
    setUserProfile(userData);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className="sidebar-area">
        <Sidebar />
      </div>
      <div className="main-area">
        <MainContent />
      </div>
      <div className="player-area">
        <Player />
      </div>
    </div>
  );
}

export default App;
