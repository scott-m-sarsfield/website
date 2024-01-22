import React from 'react';
import types from 'prop-types';

import NukaCarousel from 'nuka-carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { styled } from 'styled-components';

const StyledButton = styled.button`
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: white;
  outline: none;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &[data-disabled] {
    display: none;
  }
`;

const Carousel = ({ children }: React.PropsWithChildren<{}>) => (
  // @ts-ignore
  <NukaCarousel
    heightMode="current"
    renderCenterLeftControls={() => null}
    renderCenterRightControls={() => null}
    renderTopLeftControls={({ previousSlide, currentSlide }) => (
      <StyledButton
        data-disabled={currentSlide === 0 ?? undefined}
        onClick={previousSlide}
      >
        <NavigateBeforeIcon fontSize="large" />
      </StyledButton>
    )}
    renderTopRightControls={({ nextSlide, currentSlide, slideCount }) => (
      <StyledButton
        data-disabled={currentSlide + 1 >= slideCount ?? undefined}
        onClick={nextSlide}
      >
        <NavigateNextIcon fontSize="large" />
      </StyledButton>
    )}
    getControlsContainerStyles={(key) => {
      switch (key) {
        case 'TopLeft':
        case 'TopRight':
          return {
            top: 0,
            bottom: 0,
          };
        default:
          return {};
      }
    }}
  >
    {children}
  </NukaCarousel>
);

Carousel.propTypes = {
  children: types.node,
};

export default Carousel;
