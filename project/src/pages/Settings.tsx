import React, { useState } from 'react';
import { Volume2, VolumeX, Monitor, Smartphone, Globe, Key, Shield, Bell } from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User | null;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [settings, setSettings] = useState({
    audio: {
      masterVolume: 80,
      sfxVolume: 70,
      musicVolume: 60,
      voiceChat: true,
      muteSounds: false
    },
    graphics: {
      quality: 'high',
      resolution: 'auto',
      shadows: true,
      particles: true,
      fps: 60
    },
    controls: {
      moveUp: 'W',
      moveDown: 'S',
      moveLeft: 'A',
      moveRight: 'D',
      shoot: 'Space',
      pass: 'Mouse Click'
    },
    gameplay: {
      difficulty: 'normal',
      autoSave: true,
      showTips: true,
      language: 'English'
    },
    privacy: {
      showOnlineStatus: true,
      allowFriendRequests: true,
      showStats: true,
      enableChat: true
    }
  });

  const [activeTab, setActiveTab] = useState<'audio' | 'graphics' | 'controls' | 'gameplay' | 'privacy'>('audio');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70">Please log in to access settings</p>
        </div>
      </div>
    );
  }

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'audio', name: 'Audio', icon: Volume2 },
    { id: 'graphics', name: 'Graphics', icon: Monitor },
    { id: 'controls', name: 'Controls', icon: Key },
    { id: 'gameplay', name: 'Gameplay', icon: Globe },
    { id: 'privacy', name: 'Privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
          <p className="text-white/70">Customize your gaming experience</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-court-orange text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              {/* Audio Settings */}
              {activeTab === 'audio' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Volume2 className="mr-2 text-court-orange" />
                    Audio Settings
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Master Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.audio.masterVolume}
                        onChange={(e) => updateSetting('audio', 'masterVolume', parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-white/70 text-sm mt-1">{settings.audio.masterVolume}%</div>
                    </div>

                    <div>
                      <label className="block text-white mb-2">Sound Effects</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.audio.sfxVolume}
                        onChange={(e) => updateSetting('audio', 'sfxVolume', parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-white/70 text-sm mt-1">{settings.audio.sfxVolume}%</div>
                    </div>

                    <div>
                      <label className="block text-white mb-2">Background Music</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.audio.musicVolume}
                        onChange={(e) => updateSetting('audio', 'musicVolume', parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-white/70 text-sm mt-1">{settings.audio.musicVolume}%</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">Voice Chat</span>
                      <button
                        onClick={() => updateSetting('audio', 'voiceChat', !settings.audio.voiceChat)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.audio.voiceChat ? 'bg-court-orange' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.audio.voiceChat ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">Mute All Sounds</span>
                      <button
                        onClick={() => updateSetting('audio', 'muteSounds', !settings.audio.muteSounds)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.audio.muteSounds ? 'bg-court-red' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.audio.muteSounds ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Graphics Settings */}
              {activeTab === 'graphics' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Monitor className="mr-2 text-court-orange" />
                    Graphics Settings
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Graphics Quality</label>
                      <select
                        value={settings.graphics.quality}
                        onChange={(e) => updateSetting('graphics', 'quality', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="ultra">Ultra</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white mb-2">Resolution</label>
                      <select
                        value={settings.graphics.resolution}
                        onChange={(e) => updateSetting('graphics', 'resolution', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                      >
                        <option value="auto">Auto</option>
                        <option value="720p">1280x720</option>
                        <option value="1080p">1920x1080</option>
                        <option value="1440p">2560x1440</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">Shadows</span>
                      <button
                        onClick={() => updateSetting('graphics', 'shadows', !settings.graphics.shadows)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.graphics.shadows ? 'bg-court-orange' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.graphics.shadows ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">Particle Effects</span>
                      <button
                        onClick={() => updateSetting('graphics', 'particles', !settings.graphics.particles)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.graphics.particles ? 'bg-court-orange' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.graphics.particles ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls Settings */}
              {activeTab === 'controls' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Key className="mr-2 text-court-orange" />
                    Control Settings
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.controls).map(([action, key]) => (
                      <div key={action} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <span className="text-white capitalize">{action.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white font-mono">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="bg-court-orange hover:bg-court-orange/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Reset to Defaults
                  </button>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <button className="bg-court-orange hover:bg-court-orange/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;