/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo } from 'react';
import { Canvas, useFrame, createPortal } from '@react-three/fiber';
import { styled } from 'styled-components';
import * as THREE from 'three';
import { useGLTF, OrbitControls } from '@react-three/drei';

import { XR, createXRStore, XROrigin } from '@react-three/xr';

const store = createXRStore({
  controller: false,
});

function RollerCoaster() {
  const gltf = useGLTF('/rollercoaster.glb', true, false);

  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), []);
  useEffect(() => {
    for (const animation of gltf.animations) {
      mixer.clipAction(animation).play();
    }
  }, [gltf, mixer]);
  useFrame((state, delta) => mixer.update(delta));
  return (
    <>
      <primitive object={gltf.scene} />
      {createPortal(
        <group rotation-y={-Math.PI / 2} rotation-x={Math.PI / 2}>
          <XROrigin scale={0.24} position-y={-0.1} />
        </group>,
        gltf.scene.getObjectByName('Sessel')!
      )}
    </>
  );
}

const StyledWrapper = styled.div`
  border: 1px solid black;
  height: calc(100vh - 100px);
`;

const FiberPageContent = () => {
  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <StyledWrapper>
        <Canvas>
          <directionalLight position={[1, 1, 1]} />
          <ambientLight intensity={4} />
          <OrbitControls />
          <XR store={store}>
            <RollerCoaster />
          </XR>
        </Canvas>
      </StyledWrapper>
    </>
  );
};

export default FiberPageContent;
