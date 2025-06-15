import React, { useState } from 'react';
import { Target, Zap, Shield, Users, Play, Star, Trophy, BarChart3 } from 'lucide-react';
import { User } from '../types';

interface TrainingProps {
  user: User | null;
}

const Training: React.FC<TrainingProps> = ({ user }) => {
  const [selectedDrill, setSelectedDrill] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const trainingDrills = [
    {
      id: 'shooting',
      name: 'Shooting Practice',
      icon: Target,
      description: 'Perfect your shooting technique with different scenarios',
      skills: ['Accuracy', 'Timing', 'Form'],
      difficulty: ['easy', 'medium', 'hard'],
      xpReward: { easy: 10, medium: 25, hard: 50 },
      color: 'bg-court-orange'
    },
    {
      id: 'dribbling',
      name: 'Dribbling Drills',
      icon: Zap,
      description: 'Master ball control and movement techniques',
      skills: ['Speed', 'Control', 'Agility'],
      difficulty: ['easy', 'medium', 'hard'],
      xpReward: { easy: 8, medium: 20, hard: 40 },
      color: 'bg-court-green'
    },
    {
      id: 'defense',
      name: 'Defensive Training',
      icon: Shield,
      description: 'Learn to read opponents and improve your defense',
      skills: ['Positioning', 'Reaction', 'Anticipation'],
      difficulty: ['easy', 'medium', 'hard'],
      xpReward: { easy: 12, medium: 30, hard: 60 },
      color: 'bg-blue-500'
    },
    {
      id: 'teamwork',
      name: 'Team Coordination',
      icon: Users,
      description: 'Practice passing and team play scenarios',
      skills: ['Passing', 'Communication', 'Strategy'],
      difficulty: ['easy', 'medium', 'hard'],
      xpReward: { easy: 15, medium: 35, hard: 70 },
      color: 'bg-purple-500'
    }
  ];

  const achievements = [
    { name: 'Sharp Shooter', description: 'Hit 100 consecutive shots', icon: Target, unlocked: true },
    { name: 'Ball Wizard', description: 'Complete advanced dribbling course', icon: Zap, unlocked: false },
    { name: 'Lockdown Defender', description: 'Master all defensive drills', icon: Shield, unlocked: false },
    { name: 'Team Player', description: 'Perfect team coordination exercises', icon: Users, unlocked: false },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70">Please log in to access training</p>
        </div>
      </div>
    );
  }

  const startTraining = (drillId: string) => {
    setSelectedDrill(drillId);
    alert(`Starting ${drillId} training on ${difficulty} difficulty!`);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Training Center</h1>
          <p className="text-white/70 text-lg">Improve your skills with structured practice sessions</p>
        </div>

        {/* Training Progress */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <BarChart3 className="mr-2 text-court-orange" />
            Your Progress
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-court-orange mb-1">47</div>
              <div className="text-white/70 text-sm">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-court-green mb-1">1,250</div>
              <div className="text-white/70 text-sm">XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">85%</div>
              <div className="text-white/70 text-sm">Avg Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">23</div>
              <div className="text-white/70 text-sm">Skills Mastered</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Training Drills */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Training Drills</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {trainingDrills.map((drill) => {
                  const Icon = drill.icon;
                  return (
                    <div key={drill.id} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 ${drill.color} rounded-full flex items-center justify-center`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{drill.name}</h3>
                        </div>
                      </div>
                      
                      <p className="text-white/70 text-sm mb-4">{drill.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {drill.skills.map((skill) => (
                          <span key={skill} className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white/70">
                          XP: {drill.xpReward[difficulty]}
                        </div>
                        <button
                          onClick={() => startTraining(drill.id)}
                          className="bg-court-orange hover:bg-court-orange/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <Play size={16} />
                          <span>Start</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Difficulty Level</h3>
              <div className="flex space-x-4">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors capitalize ${
                      difficulty === level
                        ? 'bg-court-orange text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <span className={getDifficultyColor(level)}>●</span> {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="mr-2 text-court-orange" />
                Achievements
              </h3>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.unlocked ? 'bg-yellow-400/20 border border-yellow-400/30' : 'bg-white/5'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.unlocked ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 text-white/50'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className={`font-medium ${achievement.unlocked ? 'text-yellow-400' : 'text-white/70'}`}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-white/50">{achievement.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-br from-court-orange/20 to-court-green/20 backdrop-blur-md rounded-2xl p-6 border border-court-orange/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="mr-2 text-court-orange" />
                Weekly Challenge
              </h3>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Perfect 50 Shots</div>
                <div className="text-white/70 text-sm mb-4">Progress: 32/50</div>
                
                <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                  <div className="bg-court-orange h-3 rounded-full" style={{ width: '64%' }}></div>
                </div>
                
                <div className="text-yellow-400 font-medium mb-2">Reward: 500 XP + Rare Item</div>
                <div className="text-white/50 text-sm">4 days remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;