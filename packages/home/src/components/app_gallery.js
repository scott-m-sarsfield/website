import React, { useState } from 'react';
import types from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppsIcon from '@material-ui/icons/Apps';
import isEmpty from 'lodash/isEmpty';
import Button from './library/button';
import Dialog from './library/dialog';
import Carousel from './library/carousel';

import './app_gallery.scss';

const ArchiveNotice = () => (
  <div className="archive-notice">
    <strong>Archived</strong><br />
    This app no longer serves any practical purpose.  Nonethless, I will grant access to the repository upon request.
  </div>
);

const AppGallery = ({ id, archived, name, description, logoSrc, screenshots, href }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 850px)');

  return (
    <React.Fragment>
      <Dialog onClose={() => setModalOpen(false)} open={modalOpen} scroll="body">
        <div className="carousel-wrapper">
          { isDesktop ? (
            <Carousel>
              {
                screenshots.map(({ src, alt }, i) => (
                  <img key={i}src={src} alt={alt}/>
                ))
              }
            </Carousel>
          ) : (
            <React.Fragment>
              {
                screenshots.map(({ src, alt }, i) => (
                  <React.Fragment key={i}>
                    <img src={src} alt={alt}/>
                    <hr />
                  </React.Fragment>
                ))
              }
            </React.Fragment>
          )}
        </div>
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

        {
          isEmpty(screenshots) ? null : (
            <div >
              <Button onClick={() => setModalOpen(true)} className="view-gallery-button">
                <img src={screenshots[0].src} alt="View Gallery"/>
                <div className="screen">
                  <div className="screen-label">
                    <AppsIcon fontSize="large" />
                    <span>View Gallery</span>
                  </div>
                </div>
              </Button>
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
