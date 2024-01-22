import React from 'react';
import GAMES from '../data/games';
import GamesList from './GamesList';

const GamesPageContent = () => (
  <GamesList
    {...{
      games: GAMES,
    }}
  />
);

export default GamesPageContent;
