import React from 'react';
import { styled } from 'styled-components';

import { createXRStore } from '@react-three/xr';
import FloatingTissueBoxScene from './scenes/FloatingTissueBoxScene';

const store = createXRStore({ originReferenceSpace: 'local-floor' });

const StyledWrapper = styled.div`
  border: 1px solid black;
  height: calc(100vh - 100px);
`;

const FiberPageContent = () => {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <StyledWrapper>
        <FloatingTissueBoxScene store={store} />
      </StyledWrapper>
    </>
  );
};

export default FiberPageContent;
