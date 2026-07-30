import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Clouds from "./Clouds";

export default function Globe(){

    const globe=useRef();

    useFrame(()=>{

        globe.current.rotation.y+=0.001;

    });

    return(

        <group ref={globe}>

            <Earth/>

            <Clouds/>

        </group>

    )

}