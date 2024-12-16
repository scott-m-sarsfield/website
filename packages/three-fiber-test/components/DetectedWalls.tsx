import React from 'react';
import * as THREE from 'three';

import { useXRPlanes, XRSpace, XRPlaneModel } from '@react-three/xr';

function DetectedWalls() {
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

export default DetectedWalls;
