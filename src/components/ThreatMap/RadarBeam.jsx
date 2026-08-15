import { Ring } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function RadarBeam() {

  const beam = useRef();

  useFrame(() => {
    if (beam.current) {
      beam.current.rotation.z += 0.01;
    }
  });

  return (
    <Ring
      ref={beam}
      args={[2.05, 2.08, 64]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial
        color="#00cfff"
        transparent
        opacity={0.35}
      />
    </Ring>
  );
}