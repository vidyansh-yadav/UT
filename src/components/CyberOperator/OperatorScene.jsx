import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import OperatorController from "./OperatorController";

export default function OperatorScene({ active = false }) {
  const group = useRef();

  const { scene, animations } = useGLTF(
    "/models/operator/operator.glb"
  );

  // --------------------------------------------------
  // CHARACTER MATERIAL
  // --------------------------------------------------
  useEffect(() => {
    if (!scene) return;

    scene.traverse((object) => {
      if (!object.isMesh) return;

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.material) {
        object.material.roughness = 0.72;
        object.material.metalness = 0.05;
      }
    });

    scene.scale.setScalar(1.5);

    scene.position.set(
      0,
      -1.25,
      0
    );

    scene.rotation.y = Math.PI;
  }, [scene]);

  return (
    <group ref={group}>

      {/* =================================================
          CHARACTER
      ================================================= */}

      <primitive object={scene} />

      {/* =================================================
          FLOOR
      ================================================= */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.27, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 7]} />

        <meshStandardMaterial
          color="#09090b"
          roughness={0.82}
          metalness={0.18}
        />
      </mesh>

      {/* FLOOR RED LIGHT */}

      <pointLight
        position={[0, -0.7, 1]}
        color="#ff003c"
        intensity={1.6}
        distance={5}
      />

      {/* =================================================
          CHAIR
      ================================================= */}

      <group position={[0.45, -0.35, -0.35]}>

        {/* Seat */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.1, 0.16, 1.05]} />

          <meshStandardMaterial
            color="#151519"
            roughness={0.62}
            metalness={0.28}
          />
        </mesh>

        {/* Back */}
        <mesh
          position={[0, 0.75, -0.43]}
          castShadow
        >
          <boxGeometry args={[1.05, 1.35, 0.15]} />

          <meshStandardMaterial
            color="#101014"
            roughness={0.58}
            metalness={0.3}
          />
        </mesh>

        {/* Pole */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry
            args={[0.07, 0.07, 1.2, 12]}
          />

          <meshStandardMaterial
            color="#303035"
            metalness={0.8}
            roughness={0.28}
          />
        </mesh>

        {/* Base */}
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.25, 0]}
        >
          <cylinderGeometry
            args={[0.6, 0.6, 0.08, 16]}
          />

          <meshStandardMaterial
            color="#19191e"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

      </group>

      {/* =================================================
          COMPUTER DESK
      ================================================= */}

      <group position={[0, -0.25, -1.25]}>

        {/* Desk */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[3.2, 0.16, 1.15]} />

          <meshStandardMaterial
            color="#111116"
            roughness={0.58}
            metalness={0.4}
          />
        </mesh>

        {/* Desk RED EDGE */}
        <mesh position={[0, -0.015, 0.57]}>
          <boxGeometry args={[3.15, 0.035, 0.025]} />

          <meshBasicMaterial color="#ff003c" />
        </mesh>

        {/* =================================================
            MONITOR
        ================================================= */}

        <mesh
          position={[0, 1.0, -0.25]}
          castShadow
        >
          <boxGeometry args={[1.65, 1.0, 0.12]} />

          <meshStandardMaterial
            color="#08080b"
            roughness={0.3}
            metalness={0.75}
          />
        </mesh>

        {/* SCREEN */}
        <mesh position={[0, 1.0, -0.19]}>
          <planeGeometry args={[1.4, 0.75]} />

          <meshBasicMaterial
            color="#ff003c"
          />
        </mesh>

        {/* SCREEN GLOW */}
        <pointLight
          position={[0, 1, -0.05]}
          color="#ff003c"
          intensity={1.5}
          distance={3}
        />

        {/* Monitor stand */}
        <mesh position={[0, 0.48, -0.25]}>
          <boxGeometry args={[0.12, 0.45, 0.12]} />

          <meshStandardMaterial
            color="#29292e"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* =================================================
            KEYBOARD
        ================================================= */}

        <mesh position={[0, 0.14, 0.25]}>
          <boxGeometry args={[1.4, 0.08, 0.45]} />

          <meshStandardMaterial
            color="#17171c"
            roughness={0.4}
            metalness={0.45}
          />
        </mesh>

        {/* keyboard glow */}
        <mesh position={[0, 0.185, 0.25]}>
          <boxGeometry args={[1.25, 0.008, 0.34]} />

          <meshBasicMaterial
            color="#ff003c"
          />
        </mesh>

      </group>

      {/* =================================================
          BACKGROUND LIGHTS
      ================================================= */}

      <pointLight
        position={[-3, 2.5, -2]}
        color="#ff003c"
        intensity={2}
        distance={7}
      />

      <pointLight
        position={[3, 1.8, -1]}
        color="#5b0019"
        intensity={2.2}
        distance={6}
      />

      <ambientLight intensity={1.15} />

      <directionalLight
        position={[4, 5, 4]}
        intensity={1.8}
        castShadow
      />

      {/* =================================================
          CONTROLLER
      ================================================= */}

      <OperatorController
        scene={scene}
        animations={animations}
        active={active}
      />

    </group>
  );
}

useGLTF.preload(
  "/models/operator/operator.glb"
);