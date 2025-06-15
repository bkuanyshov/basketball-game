import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Play, 
  User, 
  Trophy, 
  ShoppingCart, 
  Settings, 
  Users, 
  Target,
  LogIn,
  LogOut
} from 'lucide-react';
import { User as UserType } from '../types';

interface NavigationProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogin, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/play', icon: Play, label: 'Play' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/league', icon: Trophy, label: 'League' },
    { path: '/shop', icon: ShoppingCart, label: 'Shop' },
    { path: '/friends', icon: Users, label: 'Friends' },
    { path: '/training', icon: Target, label: 'Training' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-court-orange rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full border-2 border-court-orange"></div>
            </div>
            <span className="text-xl font-bold text-white">Basketball Arena</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-court-orange text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-1">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-900">$</span>
                  </div>
                  <span className="text-white font-medium">{user.coins}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                  />
                  <span className="text-white font-medium">{user.username}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 bg-court-orange hover:bg-court-orange/90 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white/5 border-t border-white/10">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-court-orange'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;