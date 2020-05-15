import React from 'react';
import types from 'prop-types';
import GameEntry from './game_entry';

const GamesList = ({ games, buttonLabel }) => {
  const _games = games.map(({ name, href, tags, description, imgSrc }, i) => {
    return (
      <GameEntry key={i} {...{
        buttonLabel,
        name,
        href,
        tags,
        description,
        imgSrc
      }}/>
    );
  });
  return (
    <div className="main-list">
      {_games}
    </div>
  );
};

GamesList.propTypes = {
  games: types.array,
  searchText: types.string,
  mustHaveTags: types.array,
  buttonLabel: types.string
};

export default GamesList;
