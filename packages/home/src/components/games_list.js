import React from 'react';
import types from 'prop-types';
import GameEntry from './game_entry';

const GamesList = ({ games, onSelectTag, searchText, mustHaveTags, buttonLabel }) => {
  const _games = games.filter((v) => {
    if (!v.name.match(new RegExp(searchText, 'i'))) {
      return false;
    }
    let i, l = mustHaveTags.length;
    for (i = 0;i < l;i++) {
      if (v.tags.indexOf(mustHaveTags[i]) === -1) {
        return false;
      }
    }

    return true;
  }).map(({ name, directory, tags, description, imgSrc }, i) => {
    return (
      <GameEntry key={i} {...{
        buttonLabel,
        name,
        directory,
        tags,
        description,
        onSelectTag,
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
  onSelectTag: types.func.isRequired,
  searchText: types.string,
  mustHaveTags: types.array,
  buttonLabel: types.string
};

export default GamesList;
