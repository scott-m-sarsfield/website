import React from 'react';
import * as THREE from 'three';

const AxisPlanes = () => {
  return (
    <>
      {/* ground */}
      <mesh position={[1, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshPhongMaterial
          color="red"
          opacity={0.7}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* side wall */}
      <mesh position={[0, 1, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshPhongMaterial
          color="green"
          opacity={0.7}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* back wall */}
      <mesh position={[1, 1, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
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

export default AxisPlanes;
