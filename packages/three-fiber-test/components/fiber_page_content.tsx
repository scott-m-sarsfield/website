import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { styled } from 'styled-components';
import * as THREE from 'three';

import { XR, createXRStore } from '@react-three/xr';

const store = createXRStore();

const StyledWrapper = styled.div`
  border: 1px solid black;
  height: calc(100vh - 100px);
`;

/* 

// wireframe
var geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial( { color: 0xffffff } );
var wireframe = new THREE.LineSegments( geo, mat );
mesh.add( wireframe );*/

const TissueBox = () => {
  const [red, setRed] = useState(false);

  const myBoxGeometry = useRef(
    new THREE.BoxGeometry(0.23, 0.12, 0.095)
  ).current;
  const myEdgesGeometry = useRef(
    new THREE.EdgesGeometry(myBoxGeometry)
  ).current;

  return (
    <>
      <mesh
        pointerEventsType={{ deny: 'grab' }}
        onClick={() => setRed(!red)}
        position={[0, 1, -1]}
        geometry={myBoxGeometry}
      >
        <meshPhongMaterial
          color={red ? 'red' : 'blue'}
          opacity={0.7}
          transparent
          polygonOffset={true}
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
        <lineSegments geometry={myEdgesGeometry}>
          <lineBasicMaterial color="lightblue" />
        </lineSegments>
      </mesh>
    </>
  );
};

const FiberPageContent = () => {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <StyledWrapper>
        <Canvas>
          <XR store={store}>
            <TissueBox />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
          </XR>
        </Canvas>
      </StyledWrapper>
    </>
  );
};

export default FiberPageContent;
