import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function AttackPulse(){

const pulse=useRef();

useFrame(({clock})=>{

const s=0.08+Math.sin(clock.elapsedTime*3)*0.02;

pulse.current.scale.set(s,s,s);

});

return(

<Sphere
ref={pulse}
args={[1,16,16]}
position={[0.9,.45,1]}
>

<meshBasicMaterial

color="#ff003c"

/>

</Sphere>

)

}