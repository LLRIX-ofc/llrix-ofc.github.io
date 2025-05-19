import React, { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { Game } from './components/Game';
import { Marketplace } from './components/Marketplace';

type View = 'menu' | 'game' | 'marketplace';

function App() {
  const [currentView, setCurrentView] = useState<View>('menu');
  const [gameJsonUrl, setGameJsonUrl] = useState<string>('');

  const handleGameSelect = (jsonUrl: string) => {
    setGameJsonUrl(jsonUrl);
    setCurrentView('game');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {currentView === 'menu' && (
        <MainMenu
          onStartGame={() => setCurrentView('game')}
          onMarketplace={() => setCurrentView('marketplace')}
        />
      )}
      {currentView === 'game' && (
        <Game onBack={() => setCurrentView('menu')} />
      )}
      {currentView === 'marketplace' && (
        <Marketplace
          onBack={() => setCurrentView('menu')}
          onSelectGame={handleGameSelect}
        />
      )}
    </div>
  );
}

export default App;