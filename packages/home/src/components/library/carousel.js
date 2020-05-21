import React from 'react';
import types from 'prop-types';

import NukaCarousel from 'nuka-carousel';

const Carousel = ({ children }) => (
  <NukaCarousel>
    {children}
  </NukaCarousel>
);

Carousel.propTypes = {
  children: types.node
};

export default Carousel;
