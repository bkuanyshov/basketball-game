import React, { useState } from 'react';
import { Trophy, Users, Clock, Coins, Star, Calendar, Filter } from 'lucide-react';
import { User, Tournament } from '../types';

interface LeagueProps {
  user: User | null;
}

const League: React.FC<LeagueProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'tournaments' | 'leaderboard' | 'teams'>('tournaments');
  const [filterType, setFilterType] = useState<'all' | '1v1' | '3v3' | 'team'>('all');

  const tournaments: Tournament[] = [
    {
      id: '1',
      name: 'Friday Night Fever',
      type: '1v1',
      prize: 5000,
      entryFee: 100,
      participants: 128,
      maxParticipants: 128,
      startTime: new Date(Date.now() + 3600000),
      status: 'upcoming'
    },
    {
      id: '2',
      name: 'Weekend Warriors',
      type: '3v3',
      prize: 15000,
      entryFee: 300,
      participants: 45,
      maxParticipants: 64,
      startTime: new Date(Date.now() + 7200000),
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'Championship Series',
      type: 'team',
      prize: 50000,
      entryFee: 1000,
      participants: 8,
      maxParticipants: 16,
      startTime: new Date(Date.now() + 86400000),
      status: 'upcoming'
    }
  ];

  const leaderboard = [
    { rank: 1, username: 'CourtKing', points: 2850, wins: 145, losses: 23 },
    { rank: 2, username: 'Hooper2024', points: 2720, wins: 134, losses: 28 },
    { rank: 3, username: 'BallHandler', points: 2680, wins: 128, losses: 31 },
    { rank: 4, username: user?.username || 'YourName', points: 2450, wins: 98, losses: 25 },
    { rank: 5, username: 'SlamDunk', points: 2380, wins: 112, losses: 45 },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70">Please log in to access the league</p>
        </div>
      </div>
    );
  }

  const filteredTournaments = tournaments.filter(t => 
    filterType === 'all' || t.type === filterType
  );

  const joinTournament = (tournament: Tournament) => {
    if (user.coins >= tournament.entryFee) {
      alert(`Joined ${tournament.name}! Entry fee: ${tournament.entryFee} coins`);
    } else {
      alert('Insufficient coins to join this tournament');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">League Arena</h1>
          <p className="text-white/70 text-lg">Compete in tournaments and climb the leaderboards</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-1">
            <button
              onClick={() => setActiveTab('tournaments')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'tournaments'
                  ? 'bg-court-orange text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Trophy className="inline-block mr-2" size={20} />
              Tournaments
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-court-orange text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Star className="inline-block mr-2" size={20} />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'teams'
                  ? 'bg-court-orange text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Users className="inline-block mr-2" size={20} />
              Teams
            </button>
          </div>
        </div>

        {/* Tournaments Tab */}
        {activeTab === 'tournaments' && (
          <div>
            {/* Filter */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-1">
                {(['all', '1v1', '3v3', 'team'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      filterType === type
                        ? 'bg-court-orange text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <div key={tournament.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tournament.type === '1v1' ? 'bg-court-orange/20 text-court-orange' :
                      tournament.type === '3v3' ? 'bg-court-green/20 text-court-green' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {tournament.type}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Prize Pool</span>
                      <div className="flex items-center space-x-1">
                        <Coins size={16} className="text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{tournament.prize}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Entry Fee</span>
                      <div className="flex items-center space-x-1">
                        <Coins size={16} className="text-white" />
                        <span className="text-white font-medium">{tournament.entryFee}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Participants</span>
                      <span className="text-white font-medium">
                        {tournament.participants}/{tournament.maxParticipants}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Starts In</span>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} className="text-white" />
                        <span className="text-white font-medium">
                          {Math.floor((tournament.startTime.getTime() - Date.now()) / 60000)}m
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div 
                      className="bg-court-orange h-2 rounded-full"
                      style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  
                  <button
                    onClick={() => joinTournament(tournament)}
                    className="w-full bg-court-orange hover:bg-court-orange/90 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Join Tournament
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="mr-2 text-court-orange" />
              Global Leaderboard
            </h2>
            
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div 
                  key={player.rank}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    player.username === user.username 
                      ? 'bg-court-orange/20 border border-court-orange' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      player.rank === 2 ? 'bg-gray-300 text-gray-800' :
                      player.rank === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-white/20 text-white'
                    }`}>
                      {player.rank}
                    </div>
                    <div>
                      <div className="text-white font-medium">{player.username}</div>
                      <div className="text-white/70 text-sm">
                        {player.wins}W - {player.losses}L
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">{player.points}</div>
                    <div className="text-white/70 text-sm">Points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12">
              <Users size={64} className="text-white/50 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Team Features Coming Soon</h2>
              <p className="text-white/70 mb-6">
                Create and join teams, participate in team tournaments, and compete in organized leagues.
              </p>
              <button className="bg-court-orange hover:bg-court-orange/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default League;