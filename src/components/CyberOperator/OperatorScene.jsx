import {
  useGLTF,
  OrbitControls,
  Environment,
  Html,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import OperatorController from "./OperatorController";
import TerminalScreen from "./TerminalScreen";

const FLOOR_Y = -1.27;
const DESK_Z = -1.25;
const CHAIR_Z = 0.38;

const OPERATOR_MODEL = "/models/operator/operator.glb";
const CHAIR_MODEL = "/models/operator/gaming-chair.glb";

/* -------------------------------------------------------
   TERMINAL SCREEN
------------------------------------------------------- */

function useTerminalTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 760;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#02110c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // soft screen glow
    const glow = ctx.createRadialGradient(
      580,
      360,
      30,
      580,
      360,
      620
    );
    glow.addColorStop(0, "rgba(0,255,157,.18)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#00ff9d";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "#00ffb0";
    ctx.font = "700 26px monospace";
    ctx.fillText("TERMINAL://OPERATOR", 55, 62);

    ctx.fillStyle = "#6a8d80";
    ctx.font = "18px monospace";
    ctx.fillText("SECURE SESSION  UT-01", 780, 62);

    const lines = [
      "> initializing secure session...",
      "> verifying encrypted channel...",
      "> mounting remote node...",
      "> scanning network perimeter...",
      "> inspecting packet stream...",
      "> firewall        ACTIVE",
      "> encryption      AES-256",
      "> threat-level    LOW",
      "> nodes           17",
      "> status          SECURE",
      "",
      "operator@ut-01:~$ _",
    ];

    lines.forEach((line, i) => {
      ctx.fillStyle =
        i === lines.length - 1 ? "#caffea" : "#4be3ab";
      ctx.font = i < 5 ? "18px monospace" : "17px monospace";
      ctx.fillText(line, 55, 120 + i * 45);
    });

    ctx.strokeStyle = "rgba(0,255,157,.35)";
    ctx.strokeRect(850, 115, 280, 400);

    const stats = [
      ["FIREWALL", "ACTIVE"],
      ["ENCRYPT", "AES-256"],
      ["THREAT", "LOW"],
      ["NODES", "17"],
      ["STATUS", "SECURE"],
    ];

    stats.forEach(([label, value], i) => {
      ctx.fillStyle = "#6aa494";
      ctx.font = "16px monospace";
      ctx.fillText(label, 880, 165 + i * 62);

      ctx.fillStyle = "#00ff9d";
      ctx.fillText(value, 1030, 165 + i * 62);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;

    return texture;
  }, []);
}

/* -------------------------------------------------------
   LIGHT
------------------------------------------------------- */

function RoomLight({
  position,
  color,
  intensity,
  distance,
}) {
  return (
    <pointLight
      position={position}
      color={color}
      intensity={intensity}
      distance={distance}
      decay={2}
    />
  );
}

/* -------------------------------------------------------
   FLOOR GRID
------------------------------------------------------- */

function FloorGrid() {
  const object = useMemo(() => {
    const group = new THREE.Group();

    const material = new THREE.LineBasicMaterial({
      color: "#08775b",
      transparent: true,
      opacity: 0.38,
    });

    for (let x = -5; x <= 5; x += 1) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, FLOOR_Y + 0.012, -4),
        new THREE.Vector3(x, FLOOR_Y + 0.012, 4),
      ]);

      group.add(new THREE.Line(geometry, material));
    }

    for (let z = -4; z <= 4; z += 1) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, FLOOR_Y + 0.012, z),
        new THREE.Vector3(5, FLOOR_Y + 0.012, z),
      ]);

      group.add(new THREE.Line(geometry, material));
    }

    return group;
  }, []);

  return <primitive object={object} />;
}

/* -------------------------------------------------------
   SERVER RACK
------------------------------------------------------- */

function ServerRack({ position }) {
  return (
    <group position={position}>
      <mesh
        position={[0, 1.05, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.78, 2.8, 0.72]} />
        <meshStandardMaterial
          color="#17262a"
          roughness={0.5}
          metalness={0.55}
        />
      </mesh>

      {[0.3, 0.72, 1.14, 1.56, 1.98].map(
        (y, index) => (
          <group key={y}>
            <mesh position={[0, y, 0.37]}>
              <boxGeometry
                args={[0.57, 0.21, 0.02]}
              />
              <meshStandardMaterial
                color="#0b1518"
                roughness={0.35}
                metalness={0.65}
              />
            </mesh>

            <mesh
              position={[-0.2, y, 0.395]}
            >
              <boxGeometry
                args={[0.025, 0.025, 0.025]}
              />
              <meshBasicMaterial
                color={
                  index % 2
                    ? "#ff174f"
                    : "#00ff9d"
                }
              />
            </mesh>

            <mesh
              position={[0.05, y, 0.395]}
            >
              <boxGeometry
                args={[0.24, 0.015, 0.015]}
              />
              <meshBasicMaterial
                color="#78eac4"
              />
              <Html
    transform
    occlude
    distanceFactor={1.15}
    position={[0, 0, 0.02]}
  >
    <div
      style={{
        width: "430px",
        height: "245px",
      }}
    >
      <TerminalScreen />
    </div>
  </Html>

            </mesh>
          </group>
        )
      )}
    </group>
  );
}

/* -------------------------------------------------------
   GAMING CHAIR
   Important: chair is a separate model.
------------------------------------------------------- */

function GamingChair() {
  const { scene } = useGLTF(CHAIR_MODEL);

  useEffect(() => {
    if (!scene) return;

    // Avoid repeatedly multiplying scale/position on HMR.
    scene.position.set(0.15, 0, CHAIR_Z);
    scene.rotation.set(0, 0, 0);
    scene.scale.setScalar(1.08);

    // Auto-seat the GLB on the real floor even if its exported origin
    // is above/below the mesh. This is what prevents the chair from
    // disappearing into the floor.
    scene.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(scene);
    if (Number.isFinite(bounds.min.y)) {
      scene.position.y += FLOOR_Y - bounds.min.y;
    }

    scene.traverse((object) => {
      if (!object.isMesh) return;

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.material) {
        object.material.roughness = 0.44;
        object.material.metalness = 0.14;
        if ("emissive" in object.material) {
          object.material.emissive = new THREE.Color("#0a1714");
          object.material.emissiveIntensity = 0.18;
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      dispose={null}
    />
  );
}

useGLTF.preload(CHAIR_MODEL);

/* -------------------------------------------------------
   WORKSTATION
------------------------------------------------------- */

function Workstation({ screenTexture }) {
  return (
    <group position={[0, -0.18, DESK_Z]}>
      {/* Main desktop */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.9, 0.18, 1.35]} />
        <meshStandardMaterial
          color="#26363a"
          roughness={0.45}
          metalness={0.38}
        />
      </mesh>

      {/* Front panel */}
      <mesh
        position={[0, -0.42, 0.54]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.55, 0.7, 0.12]} />
        <meshStandardMaterial
          color="#162327"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Desk legs */}
      {[-1.63, 1.63].map((x) => (
        <mesh
          key={x}
          position={[x, -1.02, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[0.16, 1.55, 1.04]}
          />
          <meshStandardMaterial
            color="#1b292d"
            roughness={0.5}
            metalness={0.48}
          />
        </mesh>
      ))}

      {/* Neon desk edge */}
      <mesh position={[0, -0.09, 0.69]}>
        <boxGeometry
          args={[3.56, 0.04, 0.028]}
        />
        <meshBasicMaterial color="#ff174f" />
      </mesh>

      {/* Monitor outer body */}
      <mesh
        position={[0, 1.04, -0.27]}
        castShadow
      >
        <boxGeometry
          args={[2.28, 1.38, 0.14]}
        />
        <meshStandardMaterial
          color="#101b1e"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Monitor screen */}
      <mesh position={[0, 1.04, -0.188]}>
        <planeGeometry args={[2.04, 1.14]} />
        <meshStandardMaterial
          map={screenTexture || undefined}
          emissive="#00ff9d"
          emissiveIntensity={0.32}
          roughness={0.25}
          metalness={0}
        />
      </mesh>

      {/* Monitor stand */}
      <mesh
        position={[0, 0.34, -0.27]}
        castShadow
      >
        <boxGeometry
          args={[0.16, 0.52, 0.18]}
        />
        <meshStandardMaterial
          color="#52656c"
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>

      {/* Monitor base */}
      <mesh
        position={[0, 0.08, -0.27]}
        castShadow
      >
        <boxGeometry
          args={[0.74, 0.08, 0.4]}
        />
        <meshStandardMaterial
          color="#2b3b40"
          metalness={0.62}
          roughness={0.3}
        />
      </mesh>

      {/* Keyboard */}
      <group position={[0, 0.14, 0.2]}>
        <mesh castShadow>
          <boxGeometry
            args={[1.58, 0.08, 0.5]}
          />
          <meshStandardMaterial
            color="#34484d"
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>

        {Array.from({ length: 5 }).map(
          (_, row) =>
            Array.from({ length: 10 }).map(
              (__, col) => (
                <mesh
                  key={`${row}-${col}`}
                  position={[
                    -0.63 + col * 0.14,
                    0.055,
                    -0.16 + row * 0.075,
                  ]}
                >
                  <boxGeometry
                    args={[0.09, 0.025, 0.055]}
                  />
                  <meshStandardMaterial
                    color="#b9ffe8"
                    emissive="#00ff9d"
                    emissiveIntensity={0.14}
                  />
                </mesh>
              )
            )
        )}
      </group>

      {/* Mouse */}
      <mesh
        position={[0.98, 0.16, 0.21]}
        castShadow
      >
        <sphereGeometry
          args={[0.15, 20, 12]}
        />
        <meshStandardMaterial
          color="#26373c"
          metalness={0.6}
          roughness={0.28}
        />
      </mesh>

      {/* CPU */}
      <group position={[1.42, 0.52, -0.2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry
            args={[0.5, 1.02, 0.6]}
          />
          <meshStandardMaterial
            color="#1a292d"
            roughness={0.42}
            metalness={0.6}
          />
        </mesh>

        <mesh position={[0, 0.22, 0.31]}>
          <boxGeometry
            args={[0.28, 0.014, 0.014]}
          />
          <meshBasicMaterial color="#00ff9d" />
        </mesh>

        <mesh position={[0, 0.05, 0.31]}>
          <boxGeometry
            args={[0.07, 0.07, 0.014]}
          />
          <meshBasicMaterial color="#ff174f" />
        </mesh>
      </group>

      {/* Local green desk light */}
      <RoomLight
        position={[0, 0.8, -0.05]}
        color="#00ff9d"
        intensity={1.0}
        distance={4}
      />
    </group>
  );
}

/* -------------------------------------------------------
   CINEMATIC CAMERA
------------------------------------------------------- */

function CameraCollisionGuard({ manualCamera }) {
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const safePosition = useMemo(() => new THREE.Vector3(), []);

  // Conservative room/workstation colliders. These are invisible and only
  // protect the camera from clipping through the main furniture/walls.
  const colliders = useMemo(() => {
    const boxes = [
      new THREE.Box3(
        new THREE.Vector3(-1.95, FLOOR_Y - 0.05, -1.95),
        new THREE.Vector3(1.95, 0.15, -0.55)
      ),
      new THREE.Box3(
        new THREE.Vector3(-2.05, FLOOR_Y, -0.65),
        new THREE.Vector3(-1.35, 2.5, -0.05)
      ),
      new THREE.Box3(
        new THREE.Vector3(1.35, FLOOR_Y, -0.65),
        new THREE.Vector3(2.05, 2.5, -0.05)
      ),
      new THREE.Box3(
        new THREE.Vector3(-5.45, FLOOR_Y, -3.9),
        new THREE.Vector3(-5.15, 4.5, 3.9)
      ),
      new THREE.Box3(
        new THREE.Vector3(5.15, FLOOR_Y, -3.9),
        new THREE.Vector3(5.45, 4.5, 3.9)
      ),
      new THREE.Box3(
        new THREE.Vector3(-5.45, FLOOR_Y, -3.85),
        new THREE.Vector3(5.45, 4.5, -3.5)
      ),
    ];
    return boxes;
  }, []);

  useFrame(() => {
    if (!manualCamera) return;

    const target = new THREE.Vector3(0, 0.1, -0.7);
    direction.subVectors(camera.position, target);
    const distance = direction.length();
    if (distance < 0.001) return;
    direction.normalize();

    raycaster.set(target, direction);
    raycaster.far = distance;

    // Ray-vs-box test is approximated with a short camera clearance sphere.
    // If the camera enters a collider, pull it back toward the target.
    for (const box of colliders) {
      if (box.distanceToPoint(camera.position) < 0.18) {
        const safeDistance = Math.max(3.0, distance - 0.35);
        safePosition.copy(target).addScaledVector(direction, safeDistance);
        camera.position.lerp(safePosition, 0.45);
        break;
      }
    }
  });

  return null;
}

function CameraRig({ phase, manualCamera = false }) {
  const { camera, size } = useThree();

  const desired = useRef(
    new THREE.Vector3()
  );

  const target = useRef(
    new THREE.Vector3()
  );

  const look = useRef(
    new THREE.Vector3()
  );

  useFrame((_, delta) => {
    if (manualCamera) return;

    const mobile = size.width < 700;

    // Stable damping: smooth but not floaty.
    const damping =
      1 - Math.exp(-4.2 * Math.min(delta, 0.05));

    if (phase === "walk") {
      if (mobile) {
        desired.current.set(2.9, 1.35, 4.7);
        target.current.set(0.1, -0.35, -0.15);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          43,
          damping
        );
      } else {
        desired.current.set(4.25, 1.9, 4.9);
        target.current.set(0.15, -0.45, -0.15);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          41,
          damping
        );
      }
    } else if (phase === "sit") {
      if (mobile) {
        desired.current.set(2.65, 1.3, 3.8);
        target.current.set(0, -0.1, -0.55);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          42,
          damping
        );
      } else {
        desired.current.set(3.35, 1.6, 4.2);
        target.current.set(0, -0.2, -0.55);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          38,
          damping
        );
      }
    } else if (phase === "type") {
      if (mobile) {
        desired.current.set(2.25, 1.25, 3.25);
        target.current.set(0, 0.25, -0.8);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          39,
          damping
        );
      } else {
        desired.current.set(3.05, 1.55, 4.0);
        target.current.set(0, 0.15, -0.85);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          36,
          damping
        );
      }
    } else {
      if (mobile) {
        desired.current.set(0, 1.25, 5.1);
        target.current.set(0, 0, -0.65);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          45,
          damping
        );
      } else {
        desired.current.set(0, 1.45, 6.3);
        target.current.set(0, 0, -0.7);
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          40,
          damping
        );
      }
    }

    camera.position.lerp(
      desired.current,
      damping
    );

    look.current.lerp(target.current, damping);

    camera.lookAt(look.current);
    camera.updateProjectionMatrix();
  });

  return null;
}

/* -------------------------------------------------------
   MAIN OPERATOR SCENE
------------------------------------------------------- */

export default function OperatorScene({
  active = false,
  playing = false,
  replayKey = 0,
  onPhaseChange,
}) {
  const { scene, animations } =
    useGLTF(OPERATOR_MODEL);

  const [phase, setPhase] = useState("idle");
  const [manualCamera, setManualCamera] = useState(false);

  const screenTexture =
    useTerminalTexture();

  // Replay/Start returns the camera to the cinematic position.
  useEffect(() => {
    if (playing) setManualCamera(false);
  }, [playing, replayKey]);

  const operatorRoot = useRef(null);

  useEffect(() => {
    if (!scene) return;

    // IMPORTANT: the controller moves the outer group.
    // Keep the GLTF itself at a fixed local origin so root-motion
    // inside the animation cannot push the character through props.
    scene.position.set(0, 0, 0);

    scene.rotation.set(0, 0, 0);

    scene.scale.setScalar(1.55);

    scene.traverse((object) => {
      if (!object.isMesh) return;

      object.castShadow = true;
      object.receiveShadow = true;

      if (object.material) {
        object.material.roughness = 0.58;
        object.material.metalness = 0.08;
      }
    });
  }, [scene]);

  const handlePhase = (next) => {
    setPhase(next);
    onPhaseChange?.(next);
  };

  return (
    <>
      {/* Room background */}
      <color
        attach="background"
        args={["#050a08"]}
      />

      <fog attach="fog" args={["#050a08", 7.5, 15]} />

      {/* Main fill */}
      <ambientLight
        intensity={1.15}
        color="#b9ffe9"
      />

      <hemisphereLight
        args={[
          "#07543d",
          "#07100d",
          1.15,
        ]}
      />

      {/* One main shadow light only */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.0}
        color="#e7fff6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Green key light */}
      <RoomLight
        position={[-3.8, 2.8, 0.2]}
        color="#00ff9d"
        intensity={4.0}
        distance={8}
      />

      {/* Red rim light */}
      <RoomLight
        position={[3.8, 2.5, -2.4]}
        color="#ff174f"
        intensity={2.3}
        distance={7}
      />

      {/* Ceiling green wash */}
      <RoomLight
        position={[0, 3.5, -2.7]}
        color="#00dca0"
        intensity={2.8}
        distance={7}
      />

      {/* Character fill */}
      <RoomLight
        position={[0, 0.2, 1.8]}
        color="#42ffd0"
        intensity={1.8}
        distance={5}
      />

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, FLOOR_Y, 0]}
        receiveShadow
      >
        <planeGeometry args={[11, 8]} />
        <meshStandardMaterial
          color="#101b1b"
          roughness={0.5}
          metalness={0.32}
        />
      </mesh>

      <FloorGrid />

      {/* REALISTIC FLOOR PANELS */}
      <group position={[0, FLOOR_Y + 0.008, 0]}>
        {[-4.5, -3, -1.5, 0, 1.5, 3, 4.5].map((x) => (
          <mesh key={`floor-x-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
            <planeGeometry args={[0.018, 7.8]} />
            <meshBasicMaterial color="#123d32" transparent opacity={0.5} />
          </mesh>
        ))}
        {[-3, -1.5, 0, 1.5, 3].map((z) => (
          <mesh key={`floor-z-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]}>
            <planeGeometry args={[10.8, 0.018]} />
            <meshBasicMaterial color="#123d32" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* BACK WALL */}
      <mesh
        position={[0, 1.5, -3.65]}
        receiveShadow
      >
        <boxGeometry
          args={[11, 5.5, 0.18]}
        />
        <meshStandardMaterial
          color="#111d1d"
          roughness={0.78}
          metalness={0.12}
        />
      </mesh>

      {/* Side walls */}
      <mesh
        position={[-5.35, 1.5, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[0.18, 5.5, 7.5]}
        />
        <meshStandardMaterial
          color="#0e1b1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh
        position={[5.35, 1.5, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[0.18, 5.5, 7.5]}
        />
        <meshStandardMaterial
          color="#0e1b1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* WALL ARCHITECTURE — makes the room feel like a real control room */}
      {[-2.7, -1.35, 0, 1.35, 2.7].map((x, i) => (
        <mesh key={`wall-panel-${x}`} position={[x, 1.7, -3.54]} receiveShadow>
          <boxGeometry args={[1.12, 3.55, 0.06]} />
          <meshStandardMaterial
            color={i === 2 ? "#142521" : "#0b1615"}
            roughness={0.72}
            metalness={0.22}
          />
        </mesh>
      ))}

      {/* Horizontal wall light rails */}
      <mesh position={[0, 3.25, -3.42]}>
        <boxGeometry args={[9.3, 0.025, 0.025]} />
        <meshBasicMaterial color="#00ff9d" />
      </mesh>
      <mesh position={[0, 0.28, -3.42]}>
        <boxGeometry args={[9.3, 0.018, 0.018]} />
        <meshBasicMaterial color="#ff174f" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4.05, 0]} receiveShadow>
        <boxGeometry args={[10.8, 0.12, 7.5]} />
        <meshStandardMaterial color="#091110" roughness={0.82} metalness={0.18} />
      </mesh>

      {/* Ceiling recessed panels */}
      {[-3.2, 0, 3.2].map((x) => (
        <mesh key={`ceiling-${x}`} position={[x, 3.98, -1.25]}>
          <boxGeometry args={[1.8, 0.025, 2.5]} />
          <meshStandardMaterial color="#101d1a" roughness={0.55} metalness={0.28} />
        </mesh>
      ))}

      {/* Ceiling neon strips */}
      {[-3.2, -1.1, 1.1, 3.2].map(
        (x, i) => (
          <mesh
            key={x}
            position={[x, 4.15, -1.5]}
          >
            <boxGeometry
              args={[0.045, 0.05, 4.4]}
            />
            <meshBasicMaterial
              color={
                i % 2
                  ? "#ff174f"
                  : "#94ffe0"
              }
            />
          </mesh>
        )
      )}

      {/* Server racks */}
      <ServerRack
        position={[
          -3.9,
          FLOOR_Y,
          -1.65,
        ]}
      />

      <ServerRack
        position={[
          3.9,
          FLOOR_Y,
          -1.65,
        ]}
      />

      {/* Workstation platform / cable shadow zone */}
      <mesh position={[0, FLOOR_Y + 0.025, -1.05]} receiveShadow>
        <boxGeometry args={[4.65, 0.06, 2.25]} />
        <meshStandardMaterial color="#0a1212" roughness={0.58} metalness={0.42} />
      </mesh>

      {/* Small power/cable boxes */}
      <mesh position={[-2.65, FLOOR_Y + 0.18, -1.45]} castShadow>
        <boxGeometry args={[0.55, 0.35, 0.48]} />
        <meshStandardMaterial color="#152423" roughness={0.48} metalness={0.5} />
      </mesh>
      <mesh position={[2.65, FLOOR_Y + 0.18, -1.45]} castShadow>
        <boxGeometry args={[0.55, 0.35, 0.48]} />
        <meshStandardMaterial color="#152423" roughness={0.48} metalness={0.5} />
      </mesh>

      {/* Workstation + chair */}
      <Workstation
        screenTexture={screenTexture}
      />

      <GamingChair />

      {/* Chair visibility + rim lights */}
      <RoomLight
        position={[0.15, 0.55, 0.65]}
        color="#39ffb0"
        intensity={1.35}
        distance={3.0}
      />
      <RoomLight
        position={[-1.5, 1.4, 0.9]}
        color="#ff174f"
        intensity={1.1}
        distance={3.5}
      />
      <RoomLight
        position={[1.8, 1.7, -1.8]}
        color="#00ff9d"
        intensity={1.2}
        distance={4}
      />

      {/* Operator: wrapper is the only object that is moved. */}
      <group ref={operatorRoot} position={[0, FLOOR_Y, 2.35]} rotation={[0, Math.PI, 0]}>
        <primitive
          object={scene}
          dispose={null}
        />
      </group>

      {/* Existing animation/movement controller */}
      <OperatorController
        scene={scene}
        animations={animations}
        active={active}
        playing={playing}
        replayKey={replayKey}
        root={operatorRoot}
        onPhaseChange={handlePhase}
      />

      {/* Earth-style interactive camera: drag to orbit 360°, wheel/pinch to zoom.
          Mounted BEFORE CameraRig so the cinematic camera wins until the user
          actually starts dragging/zooming. */}
      <OrbitControls
        makeDefault
        enabled
        enableDamping
        dampingFactor={0.065}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        enablePan={false}
        minDistance={3.0}
        maxDistance={8.0}
        minPolarAngle={THREE.MathUtils.degToRad(40)}
        maxPolarAngle={THREE.MathUtils.degToRad(82)}
        target={[0, 0.1, -0.7]}
        onStart={() => setManualCamera(true)}
      />

      {/* Keep the orbit camera outside the room geometry. */}
      <CameraCollisionGuard manualCamera={manualCamera} />

      {/* Camera runs after the controls so cinematic mode has priority. */}
      <CameraRig phase={phase} manualCamera={manualCamera} />
    </>
  );
}

useGLTF.preload(OPERATOR_MODEL);
