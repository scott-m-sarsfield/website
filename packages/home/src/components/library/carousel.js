import React from 'react';
import types from 'prop-types';
import cx from 'classnames';

import NukaCarousel from 'nuka-carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import './carousel.scss';

const Carousel = ({ children }) => (
  <NukaCarousel
    heightMode="current"
    renderCenterLeftControls={() => null}
    renderCenterRightControls={() => null}
    renderTopLeftControls={({ previousSlide, currentSlide }) => (
      <button className={cx('carousel-navigation-button', { disabled: currentSlide === 0 })} onClick={previousSlide}><NavigateBeforeIcon fontSize="large"/></button>
    )}
    renderTopRightControls={({ nextSlide, currentSlide, slideCount }) => (
      <button className={cx('carousel-navigation-button', { disabled: currentSlide + 1 >= slideCount })} onClick={nextSlide}><NavigateNextIcon fontSize="large"/></button>
    )}
    getControlsContainerStyles={(key) => {
      switch (key) {
        case 'TopLeft':
        case 'TopRight':
          return {
            top: 0,
            bottom: 0
          };
        default:
          return {};
      }
    }}>
    {children}
  </NukaCarousel>
);

Carousel.propTypes = {
  children: types.node
};

export default Carousel;
