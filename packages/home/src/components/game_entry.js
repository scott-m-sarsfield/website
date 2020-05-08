import React from 'react';
import types from 'prop-types';
import siteFavicon from '../img/favicon.png';

import './game_entry.scss';

const GameEntry = (props) => {
  const { name, description, directory, tags, onSelectTag, buttonLabel, imgSrc } = props;

  let _tags = tags.sort().map((v, i) => {
    return (
      <a style={{
        fontStyle: 'italic',
        marginRight: '0.25em',
        color: '#444',
        textDecoration: 'underline',
        cursor: 'pointer'
      }}
      onClick={onSelectTag.bind(null, v)}
      href="#"
      key={i}>
        {v}
      </a>
    );
  });

  return (
    <div className="game-entry">
      <div className="logo-etc-play">
        <div className="logo-title-tags">
          <div className="logo">
            <img
              src={imgSrc}
              alt={name}
            />
          </div>

          <div className="title-tags">
            <b className="title">{name}</b>
            <br />
            <span className="tags">
                        Tags: {_tags}
            </span>
          </div>

        </div>

        <a
          className="play-button desktop"
          href={'games/' + directory}>
          <button>{buttonLabel}</button>
        </a>
      </div>

      <div className="blurb description">
        {description}
      </div>

      <a
        className="play-button mobile"
        href={'games/' + directory}>
        <button>{buttonLabel}</button>
      </a>
    </div>
  );
};

GameEntry.propTypes = {
  name: types.string.isRequired,
  description: types.string,
  directory: types.string.isRequired,
  tags: types.arrayOf(types.string),
  onSelectTag: types.func.isRequired,
  buttonLabel: types.string,
  imgSrc: types.string
};

GameEntry.defaultProps = {
  tags: [],
  buttonLabel: 'Play',
  imgSrc: siteFavicon
};

export default GameEntry;
