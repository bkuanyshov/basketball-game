import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Play from './pages/Play';
import Profile from './pages/Profile';
import League from './pages/League';
import Shop from './pages/Shop';
import Settings from './pages/Settings';
import Friends from './pages/Friends';
import Training from './pages/Training';
import AuthModal from './components/AuthModal';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('basketballUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('basketballUser', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('basketballUser');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-court-blue to-blue-900">
        <Navigation 
          user={user} 
          onLogin={() => setShowAuthModal(true)}
          onLogout={handleLogout}
        />
        
        <Routes>
          <Route path="/" element={<Home user={user} onLogin={() => setShowAuthModal(true)} />} />
          <Route path="/play" element={<Play user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/league" element={<League user={user} />} />
          <Route path="/shop" element={<Shop user={user} />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route path="/friends" element={<Friends user={user} />} />
          <Route path="/training" element={<Training user={user} />} />
        </Routes>

        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;