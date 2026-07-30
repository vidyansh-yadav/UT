import { useFrame,useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

export default function Earth(){

const mesh=useRef();

const texture=useLoader(

TextureLoader,

"/images/earth_day1.jpg"

);

useFrame(() => {
  if (mesh.current) {
    mesh.current.rotation.y += 0.002;
  }
});
return(

<mesh ref={mesh}>

<sphereGeometry args={[2,64,64]}/>

<meshStandardMaterial
    map={texture}
    metalness={0}
    roughness={1}
    emissive="#001122"
    emissiveIntensity={0.15}
/>

</mesh>

)

}