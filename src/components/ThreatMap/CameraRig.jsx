import { useFrame } from "@react-three/fiber";

export default function CameraRig(){

    useFrame(({camera,mouse})=>{

        camera.position.x+=(mouse.x*0.45-camera.position.x)*0.035;

        camera.position.y+=(-mouse.y*0.25-camera.position.y)*0.035;

        camera.lookAt(0,0,0);

    });

    return null;

}