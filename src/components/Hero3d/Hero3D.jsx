import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Earth from "./Earth";
import SpaceStars from "./Stars";

import "./Hero3D.css";

function Hero3D() {
  return (
    <div className="hero3d">

      <Canvas camera={{ position: [0, 0, 6.2], fov: 38 }}>

  <ambientLight intensity={1.2}/>

<directionalLight
position={[4,3,5]}
intensity={1.6}
/>

<pointLight
position={[0,3,3]}
intensity={0.8}
color="#ff003c"
/>

<pointLight
position={[3,-2,-4]}
intensity={1.2}
color="#00aaff"
/>
        <SpaceStars />

        <Earth />

      <OrbitControls
enableZoom={false}
autoRotate
autoRotateSpeed={0.20}
/>

      </Canvas>

    </div>
  );
}

export default Hero3D;