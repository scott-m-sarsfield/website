import React from 'react';
import types from 'prop-types';
import Carousel from 'nuka-carousel';
import isEmpty from 'lodash/isEmpty';

import './app_gallery.scss';

const ArchiveNotice = () => (
  <div className="archive-notice">
    <strong>Archived</strong><br />
    This app no longer provides any practical purpose.  Nonethless, I will grant access to the repository upon request.
  </div>
);

const AppGallery = ({ archived, name, description, logoSrc, screenshots, href }) => (
  <div className="app-gallery">

    <div className="gallery-header">
      <div className="logo-name">
        <img className="logo" src={logoSrc} alt={name}/>
        <h2 className="name"> {name} </h2>
      </div>
      {
        !archived ? (
          <a href={href} className="launch-button"><button>Launch</button></a>
        ) : null
      }
    </div>

    {
      archived ? (
        <ArchiveNotice />
      ) : null
    }

    <div className="description">
      {description}
    </div>

    {
      isEmpty(screenshots) ? null : (
        <div className="carousel-wrapper">
          <Carousel >
            {
              screenshots.map(({ src, alt }, i) => (
                <img key={i}src={src} alt={alt}/>
              ))
            }
          </Carousel>
        </div>
      )
    }
  </div>
);

AppGallery.propTypes = {
  archived: types.bool.isRequired,
  name: types.string.isRequired,
  description: types.string.isRequired,
  href: types.string,
  logoSrc: types.string.isRequired,
  screenshots: types.arrayOf(
    types.shape({
      src: types.string.isRequired,
      alt: types.string.isRequired
    }).isRequired
  ).isRequired
};

export default AppGallery;
