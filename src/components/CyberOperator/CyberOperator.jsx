import "./CyberOperator.css";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import OperatorScene from "./OperatorScene";

export default function CyberOperator() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);

          // Animation only once
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cyber-operator"
      id="cyber-operator"
    >

      {/* TOP STATUS */}

      <div className="operator-status">

        <span className="status-dot" />

        <span>
          {active
            ? "OPERATOR ONLINE"
            : "OPERATOR STANDBY"}
        </span>

      </div>

      {/* HEADING */}

      <div className="operator-heading">

        <span className="operator-kicker">
          DIGITAL OPERATIONS
        </span>

        <h2>
          Security doesn't sleep.
          <span> Neither do we.</span>
        </h2>

        <p>
          Observe how our cyber operator moves from
          reconnaissance to active digital operations.
        </p>

      </div>

      {/* 3D AREA */}

      <div className="operator-stage">

        <div className="operator-grid" />

        <div className="operator-glow operator-glow-left" />
        <div className="operator-glow operator-glow-right" />

        <div className="operator-terminal terminal-left">
          <span>SYS://SECURE</span>
          <strong>ACTIVE</strong>
        </div>

        <div className="operator-terminal terminal-right">
          <span>NETWORK</span>
          <strong>MONITORING</strong>
        </div>

        <Canvas
          dpr={[1, 1.5]}
          camera={{
            position: [0, 1.3, 6],
            fov: 36,
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          shadows
        >
          <OperatorScene active={active} />
        </Canvas>

        {/* SCAN LINE */}

        <div className="operator-scan-line" />

      </div>

      {/* BOTTOM INFO */}

      <div className="operator-footer">

        <div>
          <small>STATUS</small>
          <strong>
            {active ? "SYSTEM ACTIVE" : "WAITING"}
          </strong>
        </div>

        <div>
          <small>SECURITY</small>
          <strong>ENCRYPTED</strong>
        </div>

        <div>
          <small>NODE</small>
          <strong>UT-01</strong>
        </div>

      </div>

    </section>
  );
}