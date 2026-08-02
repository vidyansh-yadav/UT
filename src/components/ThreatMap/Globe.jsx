import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Clouds from "./Clouds";
import CountryLabels from "./CountryLabels";
import GlobeRings from "./GlobeRings";
import OrbitParticles from "./OrbitParticles";
import ScanWave from "./ScanWave";
export default function Globe() {

    const globe = useRef();

    useFrame(() => {
        if (globe.current) {
            globe.current.rotation.y += 0.0018;
        }
    });

    return (
        <group ref={globe}>
            <Earth />
            <Clouds />
            <CountryLabels />
            <GlobeRings />
            <ScanWave />
            <OrbitParticles />
        </group>
    );
}