import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Billboard, Text } from '@react-three/drei';

import {
  XR,
  createXRStore,
  useXRPlanes,
  XRSpace,
  XRPlaneModel,
  useXR,
} from '@react-three/xr';

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

const Message = () => {
  return (
    <Billboard position={[0, 2, 0]}>
      <Text
        fontSize={0.1}
        letterSpacing={-0.05}
        lineHeight={1}
        color="black"
        maxWidth={1}
        textAlign="center"
      >
        We've been trying to reach you about your car's extended warranty. We've
        been trying to reach you about your car's extended warranty. We've been
        trying to reach you about your car's extended warranty. We've been
        trying to reach you about your car's extended warranty. We've been
        trying to reach you about your car's extended warranty. We've been
        trying to reach you about your car's extended warranty.
      </Text>
    </Billboard>
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
    camera.position.set(2, 1, 2);
    camera.rotation.set(0, Math.PI / 4, 0);
  }, [camera]);

  return null;
};

function RedWalls() {
  const floorPlanes = useXRPlanes('floor');
  const ceilingPlanes = useXRPlanes('ceiling');
  return (
    <>
      {floorPlanes.map((plane, i) => (
        <XRSpace space={plane.planeSpace} key={'floor' + i}>
          <XRPlaneModel plane={plane}>
            <meshPhongMaterial
              color="green"
              opacity={0.7}
              transparent
              side={THREE.DoubleSide}
            />
          </XRPlaneModel>
        </XRSpace>
      ))}
      {ceilingPlanes.map((plane, i) => (
        <XRSpace space={plane.planeSpace} key={'ceiling' + i}>
          <XRPlaneModel plane={plane}>
            <meshPhongMaterial
              color="blue"
              opacity={0.7}
              transparent
              side={THREE.DoubleSide}
            />
          </XRPlaneModel>
        </XRSpace>
      ))}
    </>
  );
}

/** const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere ); */

const OriginSpaceSpy = ({ setLog }: { setLog: (str: string) => void }) => {
  const space = useXR((xr) => xr.originReferenceSpace);
  // const session = useXR((xr) => xr.session);

  useEffect(() => {
    // console.log(space);
    setLog(
      JSON.stringify(
        {
          class: space?.constructor?.name,
          geometry: space?.boundsGeometry,
          geometryLength: space?.boundsGeometry?.length,
        },
        undefined,
        2
      )
    );
  }, [space]);

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
  setLog,
}: {
  store: ReturnType<typeof createXRStore>;
  setLog: (str: string) => void;
}) => {
  useEffect(() => {
    setLog('test');
  }, []);

  return (
    <Canvas>
      <MyCamera />
      <XR store={store}>
        <OriginSpaceSpy setLog={setLog} />
        <TissueBox />
        {/* <Ground />
        <SideWall />
        <BackWall /> */}
        {/* <RedWalls /> */}
        {/* <Message /> */}
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
