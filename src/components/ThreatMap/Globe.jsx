import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Clouds from "./Clouds";
import CountryLabels from "./CountryLabels";
import GlobeRings from "./GlobeRings";
import OrbitParticles from "./OrbitParticles";
import ScanWave from "./ScanWave";
import Satellite from "./Satellite";
import RadarBeam from "./RadarBeam";
import Atmosphere from "./Atmosphere";

export default function Globe() {

    const globe = useRef();

    useFrame(() => {
        if (globe.current) {
            globe.current.rotation.y += 0.0016;
        }
    });

    return (
        <group ref={globe}>
            <Earth />
            <Atmosphere />
            <Clouds />
            <CountryLabels />
            <GlobeRings />
            <RadarBeam/>
            <ScanWave />
            <OrbitParticles />
            <Satellite
    radius={2.25}
    speed={0.18}
/>

<Satellite
    radius={2.45}
    speed={0.12}
    offset={Math.PI}
/>
        </group>
    );
}