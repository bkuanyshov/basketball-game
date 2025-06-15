import React, { useRef, useEffect, useState } from 'react';
import { Users, User as UserIcon, Clock, RotateCcw } from 'lucide-react';
import { User, GameState } from '../types';

interface PlayProps {
  user: User | null;
}

const Play: React.FC<PlayProps> = ({ user }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    player1: { x: 100, y: 300, score: 0 },
    player2: { x: 700, y: 300, score: 0 },
    ball: { x: 400, y: 300, vx: 0, vy: 0 },
    gameTime: 180, // 3 minutes
    gameStatus: 'waiting'
  });
  const [selectedMode, setSelectedMode] = useState<'1v1' | '3v3' | 'online'>('1v1');
  const [keys, setKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw court
      drawCourt(ctx, canvas.width, canvas.height);
      
      // Draw players
      drawPlayer(ctx, gameState.player1.x, gameState.player1.y, '#FF6B35');
      drawPlayer(ctx, gameState.player2.x, gameState.player2.y, '#1E3A8A');
      
      // Draw ball
      drawBall(ctx, gameState.ball.x, gameState.ball.y);
      
      // Draw UI
      drawUI(ctx, canvas.width, gameState);
      
      // Update game state
      if (gameState.gameStatus === 'playing') {
        updateGameState();
      }
    };

    const interval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [gameState]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const drawCourt = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Court outline
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, width - 100, height - 100);
    
    // Center line
    ctx.beginPath();
    ctx.moveTo(width / 2, 50);
    ctx.lineTo(width / 2, height - 50);
    ctx.stroke();
    
    // Center circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
    ctx.stroke();
    
    // Hoops
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(50, height / 2 - 30, 20, 60); // Left hoop
    ctx.fillRect(width - 70, height / 2 - 30, 20, 60); // Right hoop
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Player shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Ball
    ctx.fillStyle = '#FF6B35';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Ball lines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 8, y);
    ctx.lineTo(x + 8, y);
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x, y + 8);
    ctx.stroke();
    
    // Ball shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + 15, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawUI = (ctx: CanvasRenderingContext2D, width: number, gameState: GameState) => {
    // Score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${gameState.player1.score} - ${gameState.player2.score}`, width / 2, 30);
    
    // Timer
    const minutes = Math.floor(gameState.gameTime / 60);
    const seconds = gameState.gameTime % 60;
    ctx.fillText(`${minutes}:${seconds.toString().padStart(2, '0')}`, width / 2, 580);
    
    // Controls
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Controls: WASD - Move, Space - Shoot, Click - Pass', 10, 580);
  };

  const updateGameState = () => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Update player positions based on keys
      if (keys.has('w')) newState.player1.y = Math.max(65, newState.player1.y - 5);
      if (keys.has('s')) newState.player1.y = Math.min(535, newState.player1.y + 5);
      if (keys.has('a')) newState.player1.x = Math.max(65, newState.player1.x - 5);
      if (keys.has('d')) newState.player1.x = Math.min(735, newState.player1.x + 5);
      
      // Simple AI for player 2
      if (newState.ball.x > newState.player2.x) newState.player2.x += 2;
      if (newState.ball.x < newState.player2.x) newState.player2.x -= 2;
      if (newState.ball.y > newState.player2.y) newState.player2.y += 2;
      if (newState.ball.y < newState.player2.y) newState.player2.y -= 2;
      
      // Update ball physics
      newState.ball.x += newState.ball.vx;
      newState.ball.y += newState.ball.vy;
      
      // Ball boundaries
      if (newState.ball.x <= 58 || newState.ball.x >= 742) {
        newState.ball.vx = -newState.ball.vx * 0.8;
      }
      if (newState.ball.y <= 58 || newState.ball.y >= 542) {
        newState.ball.vy = -newState.ball.vy * 0.8;
      }
      
      // Friction
      newState.ball.vx *= 0.99;
      newState.ball.vy *= 0.99;
      
      // Shooting
      if (keys.has(' ')) {
        const dx = newState.ball.x - newState.player1.x;
        const dy = newState.ball.y - newState.player1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 30) {
          newState.ball.vx = dx * 0.3;
          newState.ball.vy = dy * 0.3;
        }
      }
      
      return newState;
    });
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      gameTime: 180
    }));
  };

  const resetGame = () => {
    setGameState({
      player1: { x: 100, y: 300, score: 0 },
      player2: { x: 700, y: 300, score: 0 },
      ball: { x: 400, y: 300, vx: 0, vy: 0 },
      gameTime: 180,
      gameStatus: 'waiting'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70 mb-8">Please log in to access the game</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Basketball Arena</h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setSelectedMode('1v1')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedMode === '1v1' 
                  ? 'bg-court-orange text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <UserIcon className="inline-block mr-2" size={20} />
              1v1
            </button>
            <button
              onClick={() => setSelectedMode('3v3')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedMode === '3v3' 
                  ? 'bg-court-orange text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Users className="inline-block mr-2" size={20} />
              3v3
            </button>
            <button
              onClick={() => setSelectedMode('online')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedMode === 'online' 
                  ? 'bg-court-orange text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Users className="inline-block mr-2" size={20} />
              Online Match
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-white" />
                <span className="text-white font-medium">
                  {Math.floor(gameState.gameTime / 60)}:
                  {(gameState.gameTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="text-white font-medium">
                Score: {gameState.player1.score} - {gameState.player2.score}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {gameState.gameStatus === 'waiting' ? (
                <button
                  onClick={startGame}
                  className="bg-court-green hover:bg-court-green/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Start Game
                </button>
              ) : (
                <button
                  onClick={resetGame}
                  className="bg-court-red hover:bg-court-red/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <RotateCcw size={16} className="inline-block mr-1" />
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="bg-black/20 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              className="border-2 border-white/20 rounded-lg mx-auto block"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <div className="mt-4 text-center">
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Controls</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/70">
                <div>
                  <strong className="text-white">W A S D</strong>
                  <br />Move Player
                </div>
                <div>
                  <strong className="text-white">Space</strong>
                  <br />Shoot/Dribble
                </div>
                <div>
                  <strong className="text-white">Click</strong>
                  <br />Pass Ball
                </div>
                <div>
                  <strong className="text-white">Mouse</strong>
                  <br />Aim Direction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;