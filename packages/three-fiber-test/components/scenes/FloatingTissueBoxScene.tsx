import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { XR, createXRStore } from '@react-three/xr';

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

const Ground = () => {
  return (
    <mesh position={[1, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshPhongMaterial
        color="red"
        opacity={0.7}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const SideWall = () => {
  return (
    <mesh position={[0, 1, 1]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshPhongMaterial
        color="green"
        opacity={0.7}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const BackWall = () => {
  return (
    <mesh position={[1, 1, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshPhongMaterial
        color="purple"
        opacity={0.7}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const MyCamera = () => {
  const camera = useThree(({ camera }) => camera);

  useEffect(() => {
    // console.log({ camera });
    camera.position.set(2, 1, 2);
    camera.rotation.set(0, Math.PI / 4, 0);
  }, [camera]);

  return null;
};

const FloatingTissueBoxScene = ({
  store,
}: {
  store: ReturnType<typeof createXRStore>;
}) => {
  return (
    <Canvas>
      <MyCamera />
      <XR store={store}>
        <TissueBox />
        <Ground />
        <SideWall />
        <BackWall />
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
    </Canvas>
  );
};

export default FloatingTissueBoxScene;
