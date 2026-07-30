import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Earth() {

  const [
    day,
    normal,
    specular
  ] = useLoader(
    THREE.TextureLoader,
    [
      "/images/earth_day1.jpg",
      "/images/earth.png",
      "/images/earth_specular.jpg",
    ]
  );

  return (

    <mesh>

      <sphereGeometry args={[1.6,128,128]} />

      <meshStandardMaterial

        map={day}

        normalMap={normal}

        roughness={0.92}

        metalness={0.05}

        aoMapIntensity={1}

      />

    </mesh>

  );

}