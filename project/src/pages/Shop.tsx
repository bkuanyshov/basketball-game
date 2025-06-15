import React, { useState } from 'react';
import { ShoppingCart, Coins, Star, Zap, Shirt, Footprints } from 'lucide-react';
import { User, ShopItem } from '../types';

interface ShopProps {
  user: User | null;
}

const Shop: React.FC<ShopProps> = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'jersey' | 'shoes' | 'ball' | 'court' | 'boost'>('all');

  const shopItems: ShopItem[] = [
    {
      id: '1',
      name: 'Fire Jersey',
      type: 'jersey',
      price: 500,
      description: 'Show your passion with this blazing red jersey',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rarity: 'rare'
    },
    {
      id: '2',
      name: 'Lightning Shoes',
      type: 'shoes',
      price: 800,
      description: 'Move like lightning with these high-performance shoes',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rarity: 'epic'
    },
    {
      id: '3',
      name: 'Golden Basketball',
      type: 'ball',
      price: 1200,
      description: 'A legendary golden basketball for champions',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rarity: 'legendary'
    },
    {
      id: '4',
      name: 'Street Court',
      type: 'court',
      price: 2000,
      description: 'Urban street court with authentic feel',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rarity: 'epic'
    },
    {
      id: '5',
      name: 'Speed Boost',
      type: 'boost',
      price: 300,
      description: 'Temporary speed increase for crucial moments',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rarity: 'common'
    },
    {
      id: '6',
      name: 'Accuracy Boost',
      type: 'boost',
      price: 400,
      description: 'Improve your shooting accuracy temporarily',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rarity: 'common'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingCart },
    { id: 'jersey', name: 'Jerseys', icon: Shirt },
    { id: 'shoes', name: 'Shoes', icon: Footprints },
    { id: 'ball', name: 'Balls', icon: Star },
    { id: 'boost', name: 'Boosts', icon: Zap },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70">Please log in to access the shop</p>
        </div>
      </div>
    );
  }

  const filteredItems = activeCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.type === activeCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 bg-gray-400/20';
      case 'rare': return 'text-blue-400 bg-blue-400/20';
      case 'epic': return 'text-purple-400 bg-purple-400/20';
      case 'legendary': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const purchaseItem = (item: ShopItem) => {
    if (user.coins >= item.price) {
      alert(`Purchased ${item.name} for ${item.price} coins!`);
    } else {
      alert('Insufficient coins!');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Shop</h1>
          <p className="text-white/70 text-lg mb-6">Customize your player and enhance your gameplay</p>
          
          <div className="flex justify-center items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 inline-flex">
            <Coins size={24} className="text-yellow-400" />
            <span className="text-white font-bold text-xl">{user.coins}</span>
            <span className="text-white/70">Coins</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-court-orange text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="relative mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium capitalize ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Coins size={16} className="text-yellow-400" />
                  <span className="text-white font-bold">{item.price}</span>
                </div>
                
                <button
                  onClick={() => purchaseItem(item)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    user.coins >= item.price
                      ? 'bg-court-orange hover:bg-court-orange/90 text-white'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={user.coins < item.price}
                >
                  {user.coins >= item.price ? 'Buy' : 'Not enough coins'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Deals */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Deals</h2>
          
          <div className="bg-gradient-to-r from-court-orange/20 to-court-green/20 backdrop-blur-md rounded-2xl p-8 border border-court-orange/30">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">Champion's Bundle</h3>
                <p className="text-white/70 mb-4">
                  Get the complete champion setup with jersey, shoes, and golden ball
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <span className="text-white/70 line-through">2500 Coins</span>
                  <span className="text-court-orange font-bold text-2xl">1999 Coins</span>
                  <span className="bg-court-green text-white px-2 py-1 rounded-full text-sm font-medium">
                    20% OFF
                  </span>
                </div>
              </div>
              
              <button className="bg-court-orange hover:bg-court-orange/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                Buy Bundle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;