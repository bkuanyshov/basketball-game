export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  stats: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    totalPoints: number;
    averagePoints: number;
  };
  customization: {
    jerseyColor: string;
    shoeColor: string;
    height: number;
    position: string;
  };
}

export interface GameState {
  player1: {
    x: number;
    y: number;
    score: number;
  };
  player2: {
    x: number;
    y: number;
    score: number;
  };
  ball: {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
  gameTime: number;
  gameStatus: 'waiting' | 'playing' | 'paused' | 'finished';
}

export interface Tournament {
  id: string;
  name: string;
  type: '1v1' | '3v3' | 'team';
  prize: number;
  entryFee: number;
  participants: number;
  maxParticipants: number;
  startTime: Date;
  status: 'upcoming' | 'active' | 'completed';
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'jersey' | 'shoes' | 'ball' | 'court' | 'boost';
  price: number;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}