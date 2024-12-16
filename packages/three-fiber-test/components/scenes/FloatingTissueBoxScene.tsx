import React, { useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { XR, createXRStore, useXR } from '@react-three/xr';
import TissueBox from '../TissueBox';

const MyCamera = () => {
  const camera = useThree(({ camera }) => camera);

  useEffect(() => {
    camera.position.set(2, 1, 2);
    camera.rotation.set(0, Math.PI / 4, 0);
  }, [camera]);

  return null;
};

const OriginSpaceSpy = () => {
  const space = useXR((xr) => xr.originReferenceSpace);

  const geometry = useMemo(() => {
    const vertices = new Float32Array(
      space?.boundsGeometry?.reduce((v, geo) => {
        v.push(geo.x, geo.y, geo.z);
        return v;
      }, []) ?? [1, 0, 1, -1, 0, 1, -1, 0, -1, 1, 0, -1]
    );

    const geo = new THREE.BufferGeometry();
    geo.setIndex([0, 1, 2, 2, 3, 0]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geo;
  }, [space]);

  return (
    <>
      <mesh geometry={geometry}>
        <meshPhongMaterial
          color="purple"
          opacity={0.7}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
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
        <OriginSpaceSpy />
        <TissueBox />
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
