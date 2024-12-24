import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';

const BOX_WIDTH = 0.23;
const BOX_DEPTH = 0.12;
const BOX_HEIGHT = 0.095;

const TissueBox = ({
  onPointerEnter,
  onPointerLeave,
}: Partial<
  Pick<ThreeElements['mesh'], 'onPointerEnter' | 'onPointerLeave'>
>) => {
  const [red, setRed] = useState(false);

  const myBoxGeometry = useRef(
    new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH)
  ).current;

  const myEdgesGeometry = useRef(
    new THREE.EdgesGeometry(myBoxGeometry)
  ).current;

  return (
    <>
      {/* main box */}
      <group position={[BOX_WIDTH / 2, BOX_HEIGHT / 2, BOX_DEPTH / 2]}>
        <mesh
          pointerEventsType={{ deny: 'grab' }}
          onClick={() => {
            setRed(!red);
          }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
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
        {/* edges */}
        <mesh pointerEventsType={{ deny: 'all' }}>
          <lineSegments geometry={myEdgesGeometry}>
            <lineBasicMaterial color="white" />
          </lineSegments>
        </mesh>
      </group>
    </>
  );
};

export default TissueBox;
