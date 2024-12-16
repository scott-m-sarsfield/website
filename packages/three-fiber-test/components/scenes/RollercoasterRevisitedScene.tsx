import React, { useEffect, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { XR, createXRStore, useXR } from '@react-three/xr';
import { useGLTF, OrbitControls } from '@react-three/drei';

type MyBounds = [number, number, number, number];

const MARGIN = 0.1; // 10 centimeters;

function RollerCoaster() {
  const gltf = useGLTF('/rollercoaster.glb', true, false);

  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), []);
  useEffect(() => {
    for (const animation of gltf.animations) {
      mixer.clipAction(animation).play();
    }
  }, [gltf, mixer]);
  useFrame((state, delta) => mixer.update(delta));

  const boundVertices = useBoundsGeometryVertices();

  const updatedScene = useMemo(() => {
    const group = new THREE.Group();
    group.add(gltf.scene);
    group.rotateX(-0.05);
    return group;
  }, [gltf]);

  const box = useMemo(() => {
    const box = new THREE.Box3();

    box.setFromObject(updatedScene);

    return box;
  }, [updatedScene]);

  const [position, scale] = useMemo(() => {
    const [minX, maxX, minZ, maxZ] = boundVertices?.reduce<MyBounds>(
      (bounds, value, i) => {
        switch (i % 3) {
          case 0: {
            // x
            if (value < bounds[0]) {
              const newBounds: MyBounds = [...bounds];
              newBounds[0] = value;
              return newBounds;
            }
            if (value > bounds[1]) {
              const newBounds: MyBounds = [...bounds];
              newBounds[1] = value;
              return newBounds;
            }
            break;
          }
          case 2: {
            // z
            if (value < bounds[2]) {
              const newBounds: MyBounds = [...bounds];
              newBounds[2] = value;
              return newBounds;
            }
            if (value > bounds[3]) {
              const newBounds: MyBounds = [...bounds];
              newBounds[3] = value;
              return newBounds;
            }
            break;
          }
          case 1: // y
          default:
            return bounds;
        }
        return bounds;
      },
      [boundVertices[0], boundVertices[0], boundVertices[2], boundVertices[2]]
    ) ?? [-0.1, 0.1, -0.1, 0.1];

    const scale = Math.min(
      (maxX - minX - MARGIN - MARGIN) / (box.max.x - box.min.x),
      (maxZ - minZ - MARGIN - MARGIN) / (box.max.z - box.min.z)
    );

    return [
      new THREE.Vector3(
        -(box.min.x + box.max.x) / 2,
        0.42,
        -(box.min.z + box.max.z) / 2 - 0.1
      ),
      scale,
    ];
  }, [gltf, boundVertices, box]);

  return (
    <>
      <group scale={scale}>
        <group position={position}>
          <primitive object={updatedScene} />
          <mesh
            position={[
              (box.min.x + box.max.x) / 2,
              (box.min.y + box.max.y) / 2,
              (box.min.z + box.max.z) / 2,
            ]}
            visible={false}
          >
            <boxGeometry
              args={[
                box.max.x - box.min.x,
                box.max.y - box.min.y,
                box.max.z - box.min.z,
              ]}
            />
            <meshPhongMaterial
              color="blue"
              opacity={0.7}
              transparent
              polygonOffset={true}
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

const MyCamera = () => {
  const camera = useThree(({ camera }) => camera);

  useEffect(() => {
    camera.position.set(2, 1, 2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

function useBoundsGeometryVertices() {
  const space = useXR((xr) => xr.originReferenceSpace);

  return useMemo(() => {
    return new Float32Array(
      space?.boundsGeometry?.reduce((v, geo) => {
        v.push(geo.x, geo.y, geo.z);
        return v;
      }, []) ?? [1, 0, 1, -1, 0, 1, -1, 0, -1, 1, 0, -1]
    );
  }, [space]);
}

const OriginSpaceSpy = () => {
  const vertices = useBoundsGeometryVertices();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setIndex([0, 1, 2, 2, 3, 0]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geo;
  }, [vertices]);

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

const RollercoasterRevisitedScene = ({
  store,
}: {
  store: ReturnType<typeof createXRStore>;
}) => {
  return (
    <Canvas>
      <directionalLight position={[1, 1, 1]} />
      <ambientLight intensity={4} />
      <OrbitControls />
      <MyCamera />
      <XR store={store}>
        <OriginSpaceSpy />
        <RollerCoaster />
      </XR>
    </Canvas>
  );
};

export default RollercoasterRevisitedScene;
