import React from 'react';
import types from 'prop-types';

const GameEntry = (props) => {
  const { name, description, directory, tags, onSelectTag, buttonLabel } = props;

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
    <div className="pic-and-blurb">
      <div style={{ overflow: 'hidden' }}>
        <div className="profile-image">
          <img
            src={'games/' + directory + '/img/favicon.png'}
            alt={name}
          />
        </div>

        <div className="blurb">
          <b className="title">{name}</b>
          <br />
          <span className="tags">
                        Tags: {_tags}
          </span>
        </div>
      </div>
      <div>
        <div className="blurb description">
          {description}
        </div>

        <a
          className="play-button"
          href={'games/' + directory}>
          <button>{buttonLabel}</button>
        </a>

      </div>
    </div>
  );
};

GameEntry.propTypes = {
  name: types.string.isRequired,
  description: types.string,
  directory: types.string.isRequired,
  tags: types.arrayOf(types.string),
  onSelectTag: types.func.isRequired,
  buttonLabel: types.string
};

GameEntry.defaultProps = {
  tags: [],
  buttonLabel: 'Play'
};

export default GameEntry;
