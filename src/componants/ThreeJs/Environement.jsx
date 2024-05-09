/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { SpotLight, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";
import {
  EffectComposer,
  Vignette,
  SSR,
  Bloom,
  LUT,
  HueSaturation,
  SMAA,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { useAppContext } from "../../Context";
import { gsap } from "gsap";
import { LUTCubeLoader } from "postprocessing";

function Environement() {
  const ambientRef = useRef();
  const sunRef = useRef();

  const ref = useRef();
  const refSpotlightHelicopter = useRef();
  useHelper(ref, PointLightHelper, 1);

  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");
  const { enabled, ...props } = useControls({
    enabled: true,
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    DITHERING: false,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.4, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.2, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    BLUR_EXPONENT: { value: 10, min: 0, max: 20 },
    rayStep: { value: 0.5, min: 0, max: 1 },
    intensity: { value: 2.5, min: 0, max: 5 },
    maxRoughness: { value: 1, min: 0, max: 1 },
    jitter: { value: 0.3, min: 0, max: 5 },
    jitterSpread: { value: 0.25, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 6, min: 0, max: 10 },
    maxDepthDifference: { value: 5, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 3, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 },
  });

  return (
    <>
      {/* <color attach="background" args={[0xffb200]} /> */}
      {/* <ambientLight ref={ambientRef} intensity={3} color={0xffffff} /> */}

      <spotLight
        ref={ref}
        color={0xf8f9e8}
        position={[0, 4, 0]}
        intensity={50}
        distance={100}
        angle={360}
        penumbra={1}
      />

      {/* <spotLight
        ref={ref}
        color={0xf8f9e8}
        position={[0, 2, 5]}
        intensity={100}
        distance={100}
        angle={360}
        penumbra={1}
      /> */}

      <EffectComposer disableNormalPass>
        <SSR {...props} />
        <Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          luminanceSmoothing={0}
          intensity={1.75}
        />
        <LUT lut={texture} />
      </EffectComposer>
    </>
  );
}

export default Environement;
