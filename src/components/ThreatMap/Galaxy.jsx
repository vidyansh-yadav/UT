import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
export default function Galaxy(){

    const texture=useLoader(
        THREE.TextureLoader,
        "/images/space1.jpg"
    );

    return(

        <mesh>

            <sphereGeometry args={[80,64,64]}/>

            <meshBasicMaterial

                map={texture}

                side={THREE.BackSide}

            />

        </mesh>
        

    );
    <Stars

radius={90}

depth={60}

count={3500}

factor={6}

fade

speed={0.4}

/>

}