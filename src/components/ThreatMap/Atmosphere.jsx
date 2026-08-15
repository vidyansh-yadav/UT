import { Sphere } from "@react-three/drei";

export default function Atmosphere(){

return(

<Sphere args={[1.66,128,128]}>

<meshBasicMaterial

color="#3fa9ff"

transparent

opacity={0.08}

side={2}

/>

</Sphere>

);

}