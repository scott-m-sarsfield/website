import React from 'react';
import APPS from '../data/apps';
import GamesList from './games_list';

const GamesPageContent = () => (
  <div className="row">
    <GamesList
      {...{
        games: APPS,
        buttonLabel: 'Run'
      }}
    />
  </div>
);

export default GamesPageContent;
