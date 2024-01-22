import React from 'react';
import GAMES from '../data/games';
import GamesList from './GamesList';

const GamesPageContent = () => (
  <div className="row">
    <GamesList
      {...{
        games: GAMES,
      }}
    />
  </div>
);

export default GamesPageContent;
