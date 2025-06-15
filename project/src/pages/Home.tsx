import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Trophy, Users, Target, Star, Clock, TrendingUp } from 'lucide-react';
import { User } from '../types';

interface HomeProps {
  user: User | null;
  onLogin: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogin }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-court-orange/20 to-blue-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block animate-bounce-ball">
              <div className="w-24 h-24 bg-court-orange rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-court-orange flex items-center justify-center">
                  <div className="w-2 h-8 bg-court-orange rounded"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
              Basketball <span className="text-court-orange">Arena</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Experience the ultimate online basketball game. Play 1v1, 3v3, join tournaments, 
              and compete with players from around the world!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link
                to="/play"
                className="bg-court-orange hover:bg-court-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Play className="inline-block mr-2" size={24} />
                Play Now
              </Link>
            ) : (
              <button
                onClick={onLogin}
                className="bg-court-orange hover:bg-court-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Play className="inline-block mr-2" size={24} />
                Start Playing
              </button>
            )}
            
            <Link
              to="/training"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              <Target className="inline-block mr-2" size={24} />
              Training Mode
            </Link>
          </div>

          {/* Game Preview */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Game Preview</h3>
            <div className="aspect-video bg-gradient-to-br from-wood-light to-wood-dark rounded-lg flex items-center justify-center">
              <div className="text-white/60 text-lg">
                Interactive Game Canvas Loading...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Game Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-court-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Multiplayer Modes</h3>
              <p className="text-white/70">
                Play 1v1, 3v3, or team matches with players worldwide. Real-time multiplayer action!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-court-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tournaments</h3>
              <p className="text-white/70">
                Join daily and weekly tournaments. Climb the leaderboards and win prizes!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Skill Training</h3>
              <p className="text-white/70">
                Perfect your shots, passes, and defense with our comprehensive training modes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="text-3xl font-bold text-court-orange mb-2">50K+</div>
              <div className="text-white/70">Active Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="text-3xl font-bold text-court-orange mb-2">1M+</div>
              <div className="text-white/70">Games Played</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="text-3xl font-bold text-court-orange mb-2">24/7</div>
              <div className="text-white/70">Online Matches</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="text-3xl font-bold text-court-orange mb-2">500+</div>
              <div className="text-white/70">Daily Tournaments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Latest Updates
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-court-orange rounded-full flex items-center justify-center flex-shrink-0">
                <Star size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">New Tournament System</h3>
                <p className="text-white/70 mb-2">
                  Enhanced tournament brackets with better matchmaking and prize distribution.
                </p>
                <div className="flex items-center text-sm text-white/50">
                  <Clock size={16} className="mr-1" />
                  2 days ago
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-court-green rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Improved Physics Engine</h3>
                <p className="text-white/70 mb-2">
                  More realistic ball physics and player movements for better gameplay experience.
                </p>
                <div className="flex items-center text-sm text-white/50">
                  <Clock size={16} className="mr-1" />
                  1 week ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;