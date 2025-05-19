import React from 'react';
import { Menu } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onMarketplace: () => void;
}

export function MainMenu({ onStartGame, onMarketplace }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-6">
      <Menu className="w-16 h-16 text-white mb-8" />
      <h1 className="text-4xl font-bold text-white mb-8">Text Adventure</h1>
      <button
        onClick={onStartGame}
        className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition-colors"
      >
        Start Game
      </button>
      <button
        onClick={onMarketplace}
        className="px-8 py-4 bg-purple-600 text-white rounded-lg text-xl hover:bg-purple-700 transition-colors"
      >
        Marketplace
      </button>
    </div>
  );
}