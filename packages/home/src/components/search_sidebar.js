import React from 'react';
import types from 'prop-types';
import SearchTag from './search_tag';

const searchStyle = {
  lineHeight: '1.2em',
  fontFamily: '\'Roboto Condensed\', sans-serif',
  width: '100%',
  padding: '0.25em 0.5em',
  fontSize: '1.0em',
  boxSizing: 'border-box',
  paddingLeft: '2em'
};

const SearchSidebar = ({ onSearch, tags, activeTags, onSelectTag }) => {
  let _tags = tags.map((tag, i) => {
    return (
      <SearchTag key={i} {...{
        tag,
        active: activeTags[tag],
        onClick: () => onSelectTag(tag)
      }}/>
    );
  });

  return (
    <div className="sidebar">
      <div className="search-bar">
        <div>
          <input
            type="search"
            placeholder="Search"
            style={searchStyle}
            onChange={onSearch}
          />
        </div>
        <div style={{ paddingTop: '1em' }}>
          <div style={{
            fontFamily: '\'Roboto Condensed\',sans-serif'
          }}>
            <div
              style={{
                float: 'left',
                padding: '0.25em'
              }}>
                            Tags:
            </div>
            <div>
              {_tags}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchSidebar.propTypes = {
  onSearch: types.func.isRequired,
  tags: types.array,
  activeTags: types.object,
  onSelectTag: types.func.isRequired
};

export default SearchSidebar;
