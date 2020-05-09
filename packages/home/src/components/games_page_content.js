import React, { useState } from 'react';
import GAMES from '../data/games';
import GamesList from './games_list';
import SearchSidebar from './search_sidebar';
import { getUniqueTags } from './games_page_helper';

const GamesPageContent = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTags, setActiveTags] = useState({});

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleTagSelect = (tag) => {
    setActiveTags({
      ...activeTags,
      [tag]: !activeTags[tag]
    });
  };

  let mustHaveTags = Object.keys(activeTags).filter((v) => {
    return activeTags[v];
  });

  return (
    <div className="row">
      <SearchSidebar {...{
        onSearch: handleSearch,
        tags: getUniqueTags(GAMES),
        activeTags,
        onSelectTag: handleTagSelect
      }}/>
      <GamesList {...{
        games: GAMES,
        onSelectTag: handleTagSelect,
        searchText,
        mustHaveTags
      }}/>
    </div>
  );
};

export default GamesPageContent;
