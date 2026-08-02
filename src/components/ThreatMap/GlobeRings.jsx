import { Torus } from "@react-three/drei";

export default function GlobeRings() {
  return (
    <>
      <Torus
        args={[2.05, 0.008, 24, 200]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#ff003c"
          transparent
          opacity={0.18}
        />
      </Torus>

      <Torus
        args={[2.18, 0.006, 24, 200]}
        rotation={[0.9, 0.4, 0]}
      >
        <meshBasicMaterial
          color="#00cfff"
          transparent
          opacity={0.12}
        />
      </Torus>
    </>
  );
}