import { useFrame } from "@react-three/fiber";
import { Ring } from "@react-three/drei";
import { useRef } from "react";

export default function ScanWave() {
  const wave = useRef();

  useFrame(({ clock }) => {
    const s = 1.8 + Math.sin(clock.elapsedTime) * 0.05;

    wave.current.scale.set(s, s, s);
    wave.current.material.opacity =
      0.15 + Math.sin(clock.elapsedTime * 2) * 0.08;
  });

  return (
    <Ring
      ref={wave}
      args={[1.9, 2.0, 64]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial
        color="#00cfff"
        transparent
      />
    </Ring>
  );
}