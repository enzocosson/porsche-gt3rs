import { useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// import { GUI } from "dat.gui";

function CameraSettings() {
  const cameraRef = useRef();
  const controlsRef = useRef();

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.04}
        minDistance={0}
        maxDistance={1000}
        enableRotate={true}
        // minPolarAngle={Math.PI / 3}
        // maxPolarAngle={Math.PI / 1.8}
        // minAzimuthAngle={-Math.PI / 10}
        // maxAzimuthAngle={Math.PI / 10}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
        // autoRotate={true}
        autoRotateSpeed={1}
      />

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 8]}
        rotation={[0, 0, 0]}
        fov={60}
        near={1}
        far={500}
        shadows
      />
    </>
  );
}

export default CameraSettings;
