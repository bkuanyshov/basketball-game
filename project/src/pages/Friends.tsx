import React, { useState } from 'react';
import { Users, UserPlus, MessageCircle, Play, Search, UserCheck, UserX } from 'lucide-react';
import { User } from '../types';

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'in-game';
  level: number;
}

interface FriendsProps {
  user: User | null;
}

const Friends: React.FC<FriendsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'find'>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const friends: Friend[] = [
    {
      id: '1',
      username: 'CourtKing',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      status: 'online',
      level: 25
    },
    {
      id: '2',
      username: 'Hooper2024',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      status: 'in-game',
      level: 18
    },
    {
      id: '3',
      username: 'BallHandler',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      status: 'offline',
      level: 22
    }
  ];

  const friendRequests = [
    {
      id: '4',
      username: 'NewPlayer123',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      level: 5
    },
    {
      id: '5',
      username: 'ProShooter',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      level: 15
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70">Please log in to access friends</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'in-game': return 'bg-court-orange';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'in-game': return 'In Game';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const inviteToGame = (friend: Friend) => {
    alert(`Invited ${friend.username} to play!`);
  };

  const sendMessage = (friend: Friend) => {
    alert(`Opening chat with ${friend.username}...`);
  };

  const acceptFriendRequest = (friendId: string) => {
    alert('Friend request accepted!');
  };

  const declineFriendRequest = (friendId: string) => {
    alert('Friend request declined!');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Friends</h1>
          <p className="text-white/70">Connect with other players and build your community</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-1">
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'friends'
                  ? 'bg-court-orange text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Users className="inline-block mr-2" size={20} />
              Friends ({friends.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'bg-court-orange text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <UserPlus className="inline-block mr-2" size={20} />
              Requests ({friendRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('find')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'find'
                  ? 'bg-court-orange text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Search className="inline-block mr-2" size={20} />
              Find Players
            </button>
          </div>
        </div>

        {/* Friends List */}
        {activeTab === 'friends' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Friends</h2>
            
            {friends.length === 0 ? (
              <div className="text-center py-12">
                <Users size={64} className="text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-4">No friends yet</p>
                <button
                  onClick={() => setActiveTab('find')}
                  className="bg-court-orange hover:bg-court-orange/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Find Players
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={friend.avatar} 
                          alt={friend.username}
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}></div>
                      </div>
                      
                      <div>
                        <div className="text-white font-medium">{friend.username}</div>
                        <div className="text-white/70 text-sm">
                          Level {friend.level} • {getStatusText(friend.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => inviteToGame(friend)}
                        className="bg-court-orange hover:bg-court-orange/90 text-white p-2 rounded-lg transition-colors"
                        disabled={friend.status === 'offline'}
                      >
                        <Play size={16} />
                      </button>
                      <button
                        onClick={() => sendMessage(friend)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Friend Requests */}
        {activeTab === 'requests' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Friend Requests</h2>
            
            {friendRequests.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus size={64} className="text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No pending friend requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {friendRequests.map((request) => (
                  <div key={request.id} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={request.avatar} 
                        alt={request.username}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                      />
                      <div>
                        <div className="text-white font-medium">{request.username}</div>
                        <div className="text-white/70 text-sm">Level {request.level}</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => acceptFriendRequest(request.id)}
                        className="bg-court-green hover:bg-court-green/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <UserCheck size={16} />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => declineFriendRequest(request.id)}
                        className="bg-court-red hover:bg-court-red/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <UserX size={16} />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Find Players */}
        {activeTab === 'find' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Find Players</h2>
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  placeholder="Search for players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-court-orange focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="text-center py-12">
              <Search size={64} className="text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-4">
                {searchQuery ? `Searching for "${searchQuery}"...` : 'Enter a username to find players'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;