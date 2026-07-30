import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Galaxy(){

    const texture=useLoader(
        THREE.TextureLoader,
        "/images/space.jpg"
    );

    return(

        <mesh>

            <sphereGeometry args={[80,64,64]}/>

            <meshBasicMaterial

                map={texture}

                side={THREE.BackSide}

            />

        </mesh>

    )

}