import React from 'react';
import { styled } from 'styled-components';

import { createXRStore } from '@react-three/xr';
import FloatingTissueBoxScene from './scenes/FloatingTissueBoxScene';

const store = createXRStore({
  originReferenceSpace: 'bounded-floor',
  bounded: true,
});

const StyledWrapper = styled.div`
  border: 1px solid black;
`;

const StyledContent = styled.div`
  height: calc(100svh - 20px);
  position: relative;
`;

const StyledLayout = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-areas: 'button canvas' 'debug canvas';
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 50px 1fr;
  gap: 20px;

  & > :first-child {
    grid-area: button;
  }

  & > :nth-child(2) {
    grid-area: canvas;
  }

  & > :last-child {
    grid-area: debug;
  }
`;

const FiberPageContent = () => {
  return (
    <StyledContent>
      <StyledLayout>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <StyledWrapper>
          <FloatingTissueBoxScene store={store} />
        </StyledWrapper>
        <div />
      </StyledLayout>
    </StyledContent>
  );
};

export default FiberPageContent;
