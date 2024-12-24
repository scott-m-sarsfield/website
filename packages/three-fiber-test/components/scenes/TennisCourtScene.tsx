import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { XR, createXRStore } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';

const MyCamera = () => {
  const camera = useThree(({ camera }) => camera);

  useEffect(() => {
    camera.position.set(0, 20, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

const BASELINE_THICKNESS = 0.05;
const OTHER_LINE_THICKNESS = 0.025;

const DOUBLES_ALLEY_WIDTH = 1.37;
const SERVICE_BOX_DEPTH = 6.4;
const CENTER_MARKER_LENGTH = 0.15;

const LineMaterial = () => (
  <meshBasicMaterial color="white" side={THREE.DoubleSide} />
);

const CourtLines = () => {
  return (
    <group>
      {/* baselines */}
      <mesh position={[-COURT_LENGTH / 2, 0, 0]}>
        <planeGeometry
          args={[BASELINE_THICKNESS, COURT_WIDTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh>
      <mesh position={[COURT_LENGTH / 2, 0, 0]}>
        <planeGeometry
          args={[BASELINE_THICKNESS, COURT_WIDTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh>
      {/* center line? */}
      {/* <mesh>
        <planeGeometry
          args={[BASELINE_THICKNESS, COURT_WIDTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh> */}
      {/* sidelines */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, COURT_WIDTH / 2, 0]}>
        <planeGeometry
          args={[OTHER_LINE_THICKNESS, COURT_LENGTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -COURT_WIDTH / 2, 0]}>
        <planeGeometry
          args={[OTHER_LINE_THICKNESS, COURT_LENGTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh>
      {/* alley lines */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[0, COURT_WIDTH / 2 - DOUBLES_ALLEY_WIDTH, 0]}
      >
        <planeGeometry
          args={[OTHER_LINE_THICKNESS, COURT_LENGTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[0, -COURT_WIDTH / 2 + DOUBLES_ALLEY_WIDTH, 0]}
      >
        <planeGeometry
          args={[OTHER_LINE_THICKNESS, COURT_LENGTH + OTHER_LINE_THICKNESS]}
        />
        <LineMaterial />
      </mesh>
      {/* service lines */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[OTHER_LINE_THICKNESS, SERVICE_BOX_DEPTH * 2]} />
        <LineMaterial />
      </mesh>
      <mesh position={[SERVICE_BOX_DEPTH, 0, 0]}>
        <planeGeometry
          args={[OTHER_LINE_THICKNESS, COURT_WIDTH - 2 * DOUBLES_ALLEY_WIDTH]}
        />
        <LineMaterial />
      </mesh>
      <mesh position={[-SERVICE_BOX_DEPTH, 0, 0]}>
        <planeGeometry
          args={[OTHER_LINE_THICKNESS, COURT_WIDTH - 2 * DOUBLES_ALLEY_WIDTH]}
        />
        <LineMaterial />
      </mesh>
      {/* center marker */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[-COURT_LENGTH / 2 + CENTER_MARKER_LENGTH / 2, 0, 0]}
      >
        <planeGeometry args={[BASELINE_THICKNESS, CENTER_MARKER_LENGTH]} />
        <LineMaterial />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[COURT_LENGTH / 2 - CENTER_MARKER_LENGTH / 2, 0, 0]}
      >
        <planeGeometry args={[BASELINE_THICKNESS, CENTER_MARKER_LENGTH]} />
        <LineMaterial />
      </mesh>
    </group>
  );
};

const NET_POST_MARGIN = 0.91;
const NET_HEIGHT = 0.914; // at center;
const NET_POST_HEIGHT = 1.07;
const TOP_STRIPE_WIDTH = 0.03;
const NET_WIDTH = 0.02;
const NET_POST_RADIUS = 0.05;

const Net = () => (
  <group>
    {/* main net */}
    <mesh position={[0, NET_HEIGHT / 2, 0]}>
      <boxGeometry
        args={[
          NET_WIDTH - 0.001,
          NET_HEIGHT - 0.001,
          COURT_WIDTH + 2 * NET_POST_MARGIN - 0.001,
        ]}
      />
      <meshBasicMaterial
        color="rgb(80,80,80)"
        opacity={0.4}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
    {/* top of net */}
    <mesh position={[0, NET_HEIGHT - TOP_STRIPE_WIDTH / 2, 0]}>
      <boxGeometry
        args={[NET_WIDTH, TOP_STRIPE_WIDTH, COURT_WIDTH + 2 * NET_POST_MARGIN]}
      />
      <meshBasicMaterial color="white" transparent side={THREE.DoubleSide} />
    </mesh>
    {/* posts */}
    <mesh
      position={[0, NET_POST_HEIGHT / 2, COURT_WIDTH / 2 + NET_POST_MARGIN]}
    >
      <cylinderGeometry
        args={[NET_POST_RADIUS, NET_POST_RADIUS, NET_POST_HEIGHT, 5, 5]}
      />
      <meshBasicMaterial color="black" side={THREE.DoubleSide} />
    </mesh>
    <mesh
      position={[0, NET_POST_HEIGHT / 2, -COURT_WIDTH / 2 - NET_POST_MARGIN]}
    >
      <cylinderGeometry
        args={[NET_POST_RADIUS, NET_POST_RADIUS, NET_POST_HEIGHT, 5, 5]}
      />
      <meshBasicMaterial color="black" side={THREE.DoubleSide} />
    </mesh>
  </group>
);

// meters
const COURT_LENGTH = 23.77;
const COURT_WIDTH = 10.97;
const BASELINE_CLEARANCE = 6.4;
const SIDELINE_CLEARANCE = 3.65;

const TennisCourtScene = ({
  store,
}: {
  store: ReturnType<typeof createXRStore>;
}) => {
  return (
    <Canvas>
      <XR store={store}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <planeGeometry
              args={[
                COURT_LENGTH + 2 * BASELINE_CLEARANCE,
                COURT_WIDTH + 2 * SIDELINE_CLEARANCE,
              ]}
            />
            <meshPhongMaterial
              color="rgb(169, 190,148)"
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, -0.001]}>
            <planeGeometry args={[23.77, 10.97]} />
            <meshPhongMaterial
              color="rgb(127,145,176)"
              side={THREE.DoubleSide}
            />
          </mesh>
          <group position={[0, 0, -0.002]}>
            <CourtLines />
          </group>
        </group>
        <Net />
        <ambientLight intensity={1} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={1} />
      </XR>
      <OrbitControls />
      <MyCamera />
    </Canvas>
  );
};

export default TennisCourtScene;
