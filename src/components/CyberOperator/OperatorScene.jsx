import { Html, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import OperatorController from "./OperatorController";

function TerminalScreen() {
  return (
    <Html
      transform
      position={[0, 1.0, -0.125]}
      rotation={[0, 0, 0]}
      distanceFactor={1.55}
      occlude={false}
      zIndexRange={[10, 20]}
    >
      <div className="operator-monitor-ui">
        <div className="monitor-ui-top">
          <span>TERMINAL://OPERATOR</span>
          <b>● SECURE</b>
        </div>

        <div className="monitor-ui-body">
          <div className="monitor-command">
            <p>&gt; initializing secure session...</p>
            <p>&gt; verifying encrypted channel...</p>
            <p>&gt; tracing network nodes...</p>
            <p>&gt; mapping active perimeter...</p>
            <p>&gt; endpoint handshake complete</p>
            <p>&gt; secure tunnel established</p>
            <p>&gt; monitoring packets...</p>
            <p className="cursor-line">
              operator@unseen:~$ <span>_</span>
            </p>
          </div>

          <div className="monitor-stats">
            <span>FIREWALL <b>ACTIVE</b></span>
            <span>ENCRYPTION <b>AES-256</b></span>
            <span>TRACE <b>LIVE</b></span>
            <span>NODES <b>17</b></span>
            <span>STATUS <b>SECURE</b></span>
          </div>
        </div>
      </div>
    </Html>
  );
}

function KeyboardKeys() {
  const keys = useMemo(() => {
    const items = [];
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 11; col += 1) {
        items.push(
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.66 + col * 0.13,
              0.19,
              0.08 + row * 0.085,
            ]}
          >
            <boxGeometry args={[0.095, 0.025, 0.055]} />
            <meshStandardMaterial
              color={row === 3 ? "#13382e" : "#0b1110"}
              roughness={0.35}
              metalness={0.55}
              emissive={row === 3 ? "#00ff9c" : "#003a29"}
              emissiveIntensity={row === 3 ? 0.45 : 0.16}
            />
          </mesh>
        );
      }
    }
    return items;
  }, []);

  return <group>{keys}</group>;
}

export default function OperatorScene({
  active = false,
  running = false,
  replayKey = 0,
  sequenceRef,
}) {
  const group = useRef();
  const roomGlow = useRef();
  const { camera } = useThree();

  const { scene, animations } = useGLTF(
    "/models/operator/operator.glb"
  );

  useEffect(() => {
    if (!scene) return;

    scene.traverse((object) => {
      if (!object.isMesh) return;

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.material) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];

        materials.forEach((material) => {
          material.roughness = Math.min(
            material.roughness ?? 0.72,
            0.72
          );
          material.metalness = Math.min(
            material.metalness ?? 0.05,
            0.35
          );
        });
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!scene) return;

    scene.scale.setScalar(1.42);
    scene.position.set(-1.85, -1.25, 1.35);
    scene.rotation.set(0, Math.PI, 0);
  }, [scene, replayKey]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const phase = sequenceRef?.current?.phase ?? "standby";
    const progress = sequenceRef?.current?.progress ?? 0;

    // Cinematic camera path follows the sequence.
    const target = new THREE.Vector3();
    const desired = new THREE.Vector3();

    if (phase === "walk") {
      const p = THREE.MathUtils.smoothstep(progress, 0, 1);

      desired.set(
        THREE.MathUtils.lerp(-1.2, 0.75, p),
        THREE.MathUtils.lerp(1.25, 1.05, p),
        THREE.MathUtils.lerp(5.8, 4.65, p)
      );

      target.set(
        THREE.MathUtils.lerp(-0.25, 0.1, p),
        0.15,
        -0.35
      );
    } else if (phase === "sit") {
      const p = THREE.MathUtils.smoothstep(progress, 0, 1);

      desired.set(
        THREE.MathUtils.lerp(0.75, 1.05, p),
        THREE.MathUtils.lerp(1.05, 1.18, p),
        THREE.MathUtils.lerp(4.65, 4.15, p)
      );

      target.set(0.05, 0.15, -0.45);
    } else if (phase === "typing") {
      desired.set(
        1.25 + Math.sin(t * 0.18) * 0.06,
        1.28 + Math.sin(t * 0.24) * 0.025,
        4.0
      );

      target.set(0, 0.38, -0.55);
    } else {
      desired.set(0, 1.35, 6.4);
      target.set(0, 0.15, -0.3);
    }

    const smooth = 1 - Math.exp(-5.5 * delta);

    camera.position.lerp(desired, smooth);
    camera.lookAt(target);

    if (roomGlow.current) {
      roomGlow.current.intensity =
        1.15 + Math.sin(t * 1.2) * 0.12;
    }

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t * 0.18) * 0.008,
        smooth
      );
    }
  });

  return (
    <group ref={group}>
      {/* ROOM FLOOR */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.27, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial
          color="#07100d"
          roughness={0.72}
          metalness={0.25}
        />
      </mesh>

      {/* BACK WALL */}
      <mesh position={[0, 1.25, -2.65]}>
        <boxGeometry args={[10, 5, 0.12]} />
        <meshStandardMaterial
          color="#06100c"
          roughness={0.86}
          metalness={0.12}
        />
      </mesh>

      {/* ROOM GRID */}
      {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
        <mesh key={`gx-${x}`} position={[x, 0.01, -1.9]}>
          <boxGeometry args={[0.012, 0.012, 5.8]} />
          <meshBasicMaterial color="#073f2c" />
        </mesh>
      ))}

      {[-3, -2, -1, 0, 1, 2].map((z) => (
        <mesh key={`gz-${z}`} position={[0, 0.012, z - 0.3]}>
          <boxGeometry args={[8, 0.012, 0.012]} />
          <meshBasicMaterial color="#073f2c" />
        </mesh>
      ))}

      {/* SERVER RACKS */}
      {[-3.65, 3.65].map((x) => (
        <group key={x} position={[x, 0.25, -1.85]}>
          <mesh>
            <boxGeometry args={[0.75, 3.0, 1.05]} />
            <meshStandardMaterial
              color="#080b0b"
              roughness={0.62}
              metalness={0.7}
            />
          </mesh>

          {[-0.95, -0.45, 0.05, 0.55, 1.05].map((y, i) => (
            <group key={i}>
              <mesh position={[0, y, 0.54]}>
                <boxGeometry args={[0.55, 0.025, 0.015]} />
                <meshBasicMaterial color="#00ff9c" />
              </mesh>
              <mesh position={[0.2, y + 0.08, 0.55]}>
                <sphereGeometry args={[0.018, 8, 8]} />
                <meshBasicMaterial color="#ff003c" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* CEILING LIGHTS */}
      {[-2.2, 0, 2.2].map((x) => (
        <mesh key={x} position={[x, 3.1, -1.2]}>
          <boxGeometry args={[0.06, 0.06, 3.6]} />
          <meshBasicMaterial color="#7affc7" />
        </mesh>
      ))}

      {/* DESK */}
      <group position={[0, -0.25, -1.15]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.55, 0.18, 1.28]} />
          <meshStandardMaterial
            color="#0a0d0d"
            roughness={0.48}
            metalness={0.58}
          />
        </mesh>

        <mesh position={[0, -0.02, 0.63]}>
          <boxGeometry args={[3.45, 0.045, 0.035]} />
          <meshBasicMaterial color="#ff003c" />
        </mesh>

        <mesh position={[0, -0.88, 0]}>
          <boxGeometry args={[0.18, 1.45, 0.18]} />
          <meshStandardMaterial
            color="#101414"
            metalness={0.75}
            roughness={0.3}
          />
        </mesh>

        {/* MONITOR BODY */}
        <mesh
          position={[0, 1.02, -0.31]}
          castShadow
        >
          <boxGeometry args={[2.15, 1.18, 0.14]} />
          <meshStandardMaterial
            color="#050707"
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* MONITOR BEZEL */}
        <mesh position={[0, 1.02, -0.235]}>
          <planeGeometry args={[1.91, 0.94]} />
          <meshBasicMaterial color="#00140d" />
        </mesh>

        <TerminalScreen />

        {/* MONITOR STAND */}
        <mesh position={[0, 0.42, -0.31]}>
          <boxGeometry args={[0.16, 0.5, 0.16]} />
          <meshStandardMaterial
            color="#242b2a"
            metalness={0.82}
            roughness={0.25}
          />
        </mesh>

        {/* KEYBOARD */}
        <mesh position={[0, 0.14, 0.22]}>
          <boxGeometry args={[1.65, 0.09, 0.55]} />
          <meshStandardMaterial
            color="#090d0d"
            roughness={0.38}
            metalness={0.65}
          />
        </mesh>

        <KeyboardKeys />

        {/* MOUSE */}
        <mesh position={[1.02, 0.17, 0.19]}>
          <boxGeometry args={[0.25, 0.06, 0.36]} />
          <meshStandardMaterial
            color="#0a1110"
            roughness={0.3}
            metalness={0.7}
            emissive="#003d29"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>

      {/* CHAIR */}
      <group position={[0, -0.35, 0.02]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.18, 1.05]} />
          <meshStandardMaterial
            color="#111616"
            roughness={0.55}
            metalness={0.35}
          />
        </mesh>

        <mesh position={[0, 0.78, -0.42]} castShadow>
          <boxGeometry args={[1.15, 1.45, 0.16]} />
          <meshStandardMaterial
            color="#0b1110"
            roughness={0.5}
            metalness={0.35}
          />
        </mesh>

        <mesh position={[0, -0.68, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 1.25, 12]} />
          <meshStandardMaterial
            color="#303938"
            metalness={0.85}
            roughness={0.24}
          />
        </mesh>

        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.28, 0]}
        >
          <cylinderGeometry args={[0.7, 0.7, 0.09, 18]} />
          <meshStandardMaterial
            color="#171d1c"
            metalness={0.78}
            roughness={0.28}
          />
        </mesh>
      </group>

      {/* OPERATOR */}
      <primitive object={scene} />

      {/* LIGHTING */}
      <ambientLight intensity={0.48} />

      <hemisphereLight
        skyColor="#0d5b43"
        groundColor="#020404"
        intensity={0.65}
      />

      <pointLight
        ref={roomGlow}
        position={[0, 2.2, -0.5]}
        color="#00ff9c"
        intensity={1.2}
        distance={8}
      />

      <pointLight
        position={[-3.3, 1.2, -1.5]}
        color="#00ff9c"
        intensity={3}
        distance={5}
      />

      <pointLight
        position={[3.3, 1.2, -1.5]}
        color="#00ff9c"
        intensity={3}
        distance={5}
      />

      <pointLight
        position={[0, 0.5, 0.4]}
        color="#ff003c"
        intensity={1.5}
        distance={4}
      />

      <directionalLight
        position={[2, 5, 4]}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <OperatorController
        scene={scene}
        animations={animations}
        active={active}
        running={running}
        replayKey={replayKey}
        sequenceRef={sequenceRef}
      />
    </group>
  );
}

useGLTF.preload("/models/operator/operator.glb");
