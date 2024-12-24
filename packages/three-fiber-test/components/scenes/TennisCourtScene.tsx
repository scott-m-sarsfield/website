import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { styled } from 'styled-components';

import { XR, createXRStore } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import TissueBox from '../TissueBox';

const StyledCanvas = styled(Canvas)`
  &[data-clickable] {
    cursor: pointer;
  }
`;

const TennisCourtScene = ({
  store,
}: {
  store: ReturnType<typeof createXRStore>;
}) => {
  const [clickable, setClickable] = useState(false);
  return (
    <StyledCanvas data-clickable={clickable || undefined}>
      <XR store={store}>
        <TissueBox
          onPointerEnter={() => setClickable(true)}
          onPointerLeave={() => setClickable(false)}
        />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      </XR>
      <OrbitControls />
    </StyledCanvas>
  );
};

export default TennisCourtScene;
