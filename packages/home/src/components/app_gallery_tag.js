import React from 'react';
import types from 'prop-types';

import './app_gallery_tag.scss';

const AppGalleryTag = ({ id, logoSrc, name }) => (
  <a href={`#${id}`} className="app-gallery-tag">
    <img src={logoSrc} alt={`Skip to ${name}`} />
    <span>{name}</span>
  </a>
);

AppGalleryTag.propTypes = {
  id: types.string.isRequired,
  logoSrc: types.string.isRequired,
  name: types.string.isRequired,
};

export default AppGalleryTag;
