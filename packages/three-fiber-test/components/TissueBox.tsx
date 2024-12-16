import React, { useRef, useState } from 'react';
import * as THREE from 'three';

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
        onClick={() => {
          setRed(!red);
        }}
        position={[0.115, 0.06, 0.0475]}
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
      </mesh>
      <mesh
        pointerEventsType={{ deny: 'all' }}
        position={[0.115, 0.06, 0.0475]}
      >
        <lineSegments geometry={myEdgesGeometry}>
          <lineBasicMaterial color="white" />
        </lineSegments>
      </mesh>
    </>
  );
};

export default TissueBox;
