import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Satellite({

radius=2.35,

speed=0.15,

offset=0

}){

const group=useRef();

useFrame(({clock})=>{

const t=clock.elapsedTime*speed+offset;

group.current.position.x=Math.cos(t)*radius;

group.current.position.z=Math.sin(t)*radius;

group.current.position.y=Math.sin(t*2)*0.25;

group.current.rotation.y=t;

});

return(

<group ref={group}>

<Sphere args={[0.03,16,16]}>

<meshBasicMaterial color="#00cfff"/>

</Sphere>

<pointLight

color="#00cfff"

distance={1}

intensity={1.8}

/>

</group>

);

}