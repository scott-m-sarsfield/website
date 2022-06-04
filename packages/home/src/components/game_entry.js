import React from 'react';
import types from 'prop-types';
import siteFavicon from '../img/favicon.png';

import './game_entry.scss';

const GameEntry = (props) => {
  const { name, description, href, tags, buttonLabel, imgSrc } = props;

  return (
    <div className="game-entry">
      <div className="logo-etc-play">
        <div className="logo-title-tags">
          <div className="logo">
            <img src={imgSrc} alt={name} />
          </div>

          <div className="title-tags">
            <div className="title">{name}</div>
            <div className="tags">{tags.sort().join(', ')}</div>
          </div>
        </div>

        <a className="play-button desktop" href={href}>
          <button>{buttonLabel}</button>
        </a>
      </div>

      <div className="blurb description">{description}</div>

      <a className="play-button mobile" href={href}>
        <button>{buttonLabel}</button>
      </a>
    </div>
  );
};

GameEntry.propTypes = {
  name: types.string.isRequired,
  description: types.string,
  href: types.string.isRequired,
  tags: types.arrayOf(types.string),
  buttonLabel: types.string,
  imgSrc: types.string,
};

GameEntry.defaultProps = {
  tags: [],
  buttonLabel: 'Play',
  imgSrc: siteFavicon,
};

export default GameEntry;
