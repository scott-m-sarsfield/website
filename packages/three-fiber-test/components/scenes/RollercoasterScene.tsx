import React, { useEffect, useMemo } from 'react';
import { Canvas, useFrame, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, OrbitControls } from '@react-three/drei';

import { XR, createXRStore, XROrigin } from '@react-three/xr';

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

const RollercoasterScene = ({
  store,
}: {
  store: ReturnType<typeof createXRStore>;
}) => {
  return (
    <Canvas>
      <directionalLight position={[1, 1, 1]} />
      <ambientLight intensity={4} />
      <OrbitControls />
      <XR store={store}>
        <RollerCoaster />
      </XR>
    </Canvas>
  );
};

export default RollercoasterScene;
