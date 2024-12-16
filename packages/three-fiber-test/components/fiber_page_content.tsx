import React, { useState } from 'react';
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
  grid-template-areas: 'button debug' 'canvas debug';
  grid-template-columns: 200px 1fr;
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

const StyledDebug = styled.div`
  border: 1px solid black;
  padding: 10px;
  font-family: monospace;
`;

const FiberPageContent = () => {
  const [log, setLog] = useState('');
  return (
    <StyledContent>
      <StyledLayout>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <StyledWrapper>
          <FloatingTissueBoxScene store={store} setLog={setLog} />
        </StyledWrapper>
        <StyledDebug>{log}</StyledDebug>
      </StyledLayout>
    </StyledContent>
  );
};

export default FiberPageContent;
