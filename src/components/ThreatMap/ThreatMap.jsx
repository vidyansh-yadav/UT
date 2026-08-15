import "./ThreatMap.css";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Galaxy from "./Galaxy";
import Globe from "./Globe";
import CameraRig from "./CameraRig";
import BloomEffects from "./Bloom";
import AttackSystem from "./AttackSystem";

export default function ThreatMap() {
  return (
    <section className="threat-map" id="threat-map">

      {/* HEADER */}
      <div className="section-title">
        <span>GLOBAL THREAT INTELLIGENCE</span>

        <h2>Live Cyber Security Network</h2>

        <p>
          Monitoring cyber activity around the world.
        </p>
      </div>


      {/* MAIN AREA */}
      <div className="threat-content">

        {/* 3D GLOBE */}
        <div className="globe-wrapper">

          <Canvas
            camera={{
              position: [0, 0, 6],
              fov: 36,
            }}
          >

            <Galaxy />

            <ambientLight intensity={0.8} />

            <directionalLight
              position={[4, 4, 4]}
              intensity={1}
            />

            <pointLight
              position={[-3, 2, 2]}
              intensity={0.4}
            />
  
            <Globe />

            <AttackSystem />

            <CameraRig />

            <BloomEffects />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.25}
            />
            

          </Canvas>

        </div>


        {/* LIVE THREAT PANEL */}
        <div className="live-panel">

          <div className="panel-header">

            <div>
              <span className="live-dot"></span>
              LIVE
            </div>

            <span className="panel-status">
              MONITORING
            </span>

          </div>

          <h3>Live Threat Feed</h3>

          <div className="feed">
            <div>
              <span className="country">India</span>
              <small>Malware detected</small>
            </div>

            <strong>Critical</strong>
          </div>

          <div className="feed">
            <div>
              <span className="country">USA</span>
              <small>Network intrusion</small>
            </div>

            <strong>High</strong>
          </div>

          <div className="feed">
            <div>
              <span className="country">Germany</span>
              <small>Suspicious traffic</small>
            </div>

            <strong>Medium</strong>
          </div>

          <div className="feed">
            <div>
              <span className="country">Singapore</span>
              <small>Scanning activity</small>
            </div>

            <strong>Low</strong>
          </div>

          <div className="panel-footer">
            <span>Threats monitored</span>
            <strong>24/7</strong>
          </div>

        </div>

      </div>

    </section>
  );
}