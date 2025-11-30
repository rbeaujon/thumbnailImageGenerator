import React, { useState } from 'react';
import { ThumbnailCard } from './components/ThumbnailsCard';
import { games } from "./data/games";

const App = () => {
  return (
    <div className="main-container">
      <h1>Casino Thumbnail Generator</h1>
      <div className="games-container">
        {games.map((game) => (
          <ThumbnailCard key={game.label} game={game} />
        ))}
      </div>
    </div>
  );
};

export default App;