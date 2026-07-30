import { useRef } from "react";
import { useLoader,useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Clouds(){

    const cloud=useRef();

    const texture=useLoader(
        THREE.TextureLoader,
        "/images/earth_clouds.png"
    );

    useFrame(()=>{

        cloud.current.rotation.y+=0.0006;

    });

    return(

        <mesh ref={cloud}>

            <sphereGeometry args={[1.615,128,128]}/>

            <meshStandardMaterial

                map={texture}

                transparent

                opacity={0.28}

                depthWrite={false}

            />

        </mesh>

    )

}