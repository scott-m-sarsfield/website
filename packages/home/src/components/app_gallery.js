import React, { useState } from 'react';
import types from 'prop-types';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash/isEmpty';
import Dialog from './library/dialog';
import Carousel from './library/carousel';

import './app_gallery.scss';

const ArchiveNotice = () => (
  <div className="archive-notice">
    <strong>Archived</strong><br />
    This app no longer provides any practical purpose.  Nonethless, I will grant access to the repository upon request.
  </div>
);

const AppGallery = ({ id, archived, name, description, logoSrc, screenshots, href }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <React.Fragment>
      <Dialog onClose={() => setModalOpen(false)} open={modalOpen}>
      Sample content.
      </Dialog>
      <div className="app-gallery" id={id}>

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

        <div>
          <Button onClick={() => setModalOpen(true)}>click me</Button>
        </div>

        {
          isEmpty(screenshots) ? null : (
            <div className="carousel-wrapper">
              <Carousel>
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
    </React.Fragment>
  );
};

AppGallery.propTypes = {
  id: types.string.isRequired,
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
