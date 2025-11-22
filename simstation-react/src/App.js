import React, { useState } from 'react';
import HubView from './components/HubView';
import TinyCityGame from './components/TinyCityGame';
import Sidebar from './components/Sidebar';

export default function App() {
  const [activeGame, setActiveGame] = useState(null);

  const launchGame = (gameId) => {
    setActiveGame(gameId);
  };

  const exitGame = () => {
    setActiveGame(null);
  };

  return (
    <div className="flex">
      <Sidebar launchGame={launchGame} />
      <main className="flex-1">
        {activeGame === 'tiny-city' ? (
          <TinyCityGame onExit={exitGame} />
        ) : (
          <HubView launchGame={launchGame} />
        )}
      </main>
    </div>
  );
}