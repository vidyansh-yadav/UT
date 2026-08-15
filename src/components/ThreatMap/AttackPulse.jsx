import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function AttackPulse({
  position = [0, 0, 0],
  color = "#ff003c",
}) {
  const pulse = useRef();

  useFrame(({ clock }) => {
    if (!pulse.current) return;

    const t = clock.elapsedTime;

    const scale =
      1 + Math.sin(t * 4) * 0.2;

    pulse.current.scale.set(scale, scale, scale);

    pulse.current.rotation.y += 0.02;

    if (pulse.current.material) {
      pulse.current.material.opacity =
        0.35 + Math.sin(t * 4) * 0.15;
    }
  });

  return (
    <Sphere
      ref={pulse}
      args={[0.03, 24, 24]}
      position={position}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
      />
    </Sphere>
  );
}