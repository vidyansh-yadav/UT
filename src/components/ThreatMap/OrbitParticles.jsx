import { Sparkles } from "@react-three/drei";

export default function OrbitParticles() {
  return (
    <Sparkles
      count={180}
      scale={12}
      size={2}
      speed={0.25}
      color="#ffffff"
    />
  );
}