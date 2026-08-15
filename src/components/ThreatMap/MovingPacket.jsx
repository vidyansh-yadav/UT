import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
const colors = [
  "#ff003c",
  "#ff3355",
  "#00cfff",
  "#ffffff",
  "#ff9500",
];

const randomColor =
  colors[Math.floor(Math.random() * colors.length)];

export default function MovingPacket({
  start = [0, 0, 0],
  mid = [0, 1, 0],
  end = [1, 0, 0],
  speed = 0.18,
  delay = 0,
  
}) {
  const packetRef = useRef();

  const curve = useMemo(() => {
    const startPoint = new THREE.Vector3(
      start[0],
      start[1],
      start[2]
    );

    const middlePoint = new THREE.Vector3(
      mid[0],
      mid[1],
      mid[2]
    );

    const endPoint = new THREE.Vector3(
      end[0],
      end[1],
      end[2]
    );

    return new THREE.QuadraticBezierCurve3(
      startPoint,
      middlePoint,
      endPoint
    );
  }, [start, mid, end]);

  useFrame((state) => {
    if (!packetRef.current) return;

    const elapsed = state.clock.getElapsedTime();

    const progress =
      (elapsed * speed + delay) % 1;

    const position = curve.getPoint(progress);

    packetRef.current.position.copy(position);
  });

  return (
    <mesh ref={packetRef}>
  <sphereGeometry args={[0.05, 16, 16]} />

  <meshBasicMaterial
      color={randomColor}
      toneMapped={false}
  />

  <pointLight
      color={randomColor}
      intensity={2}
      distance={1}
  />
</mesh>
  );}