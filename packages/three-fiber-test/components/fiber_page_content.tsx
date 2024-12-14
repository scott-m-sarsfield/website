import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { styled } from 'styled-components';

/* eslint-disable react/no-unknown-property */

const BOX_SIZE = 1;

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

const StyledWrapper = styled.div`
  border: 1px solid black;
  height: calc(100vh - 100px);
`;

const FiberPageContent = () => (
  <div>
    <StyledWrapper>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </StyledWrapper>
  </div>
);

export default FiberPageContent;
