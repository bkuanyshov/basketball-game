import React from 'react';
import { User as UserIcon, Trophy, Star, TrendingUp, Edit3, Award } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const winRate = user.stats.gamesPlayed > 0 
    ? ((user.stats.wins / user.stats.gamesPlayed) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-court-orange shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-court-orange rounded-full p-2">
                <Edit3 size={16} className="text-white" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-white/70 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-court-orange/20 border border-court-orange rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Star className="text-court-orange" size={20} />
                    <span className="text-white font-medium">Level {user.level}</span>
                  </div>
                </div>
                
                <div className="bg-yellow-400/20 border border-yellow-400 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                    <span className="text-white font-medium">{user.coins} Coins</span>
                  </div>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-blue-400" size={20} />
                    <span className="text-white font-medium">{user.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="mr-2 text-court-orange" />
                Game Statistics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-court-orange mb-1">
                    {user.stats.gamesPlayed}
                  </div>
                  <div className="text-white/70 text-sm">Games Played</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-court-green mb-1">
                    {user.stats.wins}
                  </div>
                  <div className="text-white/70 text-sm">Wins</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-court-red mb-1">
                    {user.stats.losses}
                  </div>
                  <div className="text-white/70 text-sm">Losses</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {winRate}%
                  </div>
                  <div className="text-white/70 text-sm">Win Rate</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-court-orange mb-1">
                      {user.stats.totalPoints}
                    </div>
                    <div className="text-white/70 text-sm">Total Points</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-court-orange mb-1">
                      {user.stats.averagePoints.toFixed(1)}
                    </div>
                    <div className="text-white/70 text-sm">Average Points</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Match History */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Matches</h2>
              
              <div className="space-y-4">
                {[1, 2, 3].map((match) => (
                  <div key={match} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-white">1v1 Ranked</div>
                      <div className="text-sm text-white/70">vs Player{match}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-court-green">WIN</div>
                      <div className="text-sm text-white/70">21-18</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customization & Achievements */}
          <div className="space-y-8">
            {/* Player Customization */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <UserIcon className="mr-2 text-court-orange" />
                Player Setup
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Position</label>
                  <div className="bg-white/5 rounded-lg p-3 text-white">
                    {user.customization.position}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Height</label>
                  <div className="bg-white/5 rounded-lg p-3 text-white">
                    {user.customization.height} cm
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Jersey Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: user.customization.jerseyColor }}
                    ></div>
                    <span className="text-white">{user.customization.jerseyColor}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Shoe Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: user.customization.shoeColor }}
                    ></div>
                    <span className="text-white">{user.customization.shoeColor}</span>
                  </div>
                </div>
                
                <button className="w-full bg-court-orange hover:bg-court-orange/90 text-white py-2 rounded-lg font-medium transition-colors">
                  Customize Player
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Award className="mr-2 text-court-orange" />
                Achievements
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Trophy size={16} className="text-yellow-900" />
                  </div>
                  <div>
                    <div className="text-white font-medium">First Win</div>
                    <div className="text-xs text-white/70">Win your first match</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <Star size={16} className="text-gray-700" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Rookie</div>
                    <div className="text-xs text-white/70">Play 10 matches</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <Award size={16} className="text-gray-700" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Sharpshooter</div>
                    <div className="text-xs text-white/70">Score 100 points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;