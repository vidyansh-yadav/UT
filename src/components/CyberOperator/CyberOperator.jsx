import "./CyberOperator.css";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import OperatorScene from "./OperatorScene";

export default function CyberOperator() {
  const sectionRef = useRef(null);

  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const replay = () => {
    setReplayKey((value) => value + 1);
    setActive(true);
    setPlaying(true);
  };

  const phaseText =
    phase === "walk"
      ? "MOVING TO WORKSTATION"
      : phase === "sit"
        ? "SECURING WORKSTATION"
        : phase === "type"
          ? "ACTIVE TERMINAL OPERATION"
          : "STANDBY";

  return (
    <section
      ref={sectionRef}
      className="cyber-operator"
      id="cyber-operator"
    >
      <div className="operator-heading">
        <span className="operator-kicker">
          DIGITAL OPERATIONS
        </span>

        <h2>
          Security doesn't sleep.
          <span> Neither do we.</span>
        </h2>

        <p>
          A cinematic cyber-operations sequence — secure
          workstation access, terminal operations and live
          network monitoring.
        </p>
      </div>

      <div className="operator-stage">
        <div className="operator-grid" />
        <div className="operator-room-glow glow-green" />
        <div className="operator-room-glow glow-red" />

        <div className="operator-status">
          <span className="status-dot" />
          <span>
            {active ? "OPERATOR ONLINE" : "OPERATOR STANDBY"}
          </span>
        </div>

        <div className="operator-terminal-card terminal-left">
          <span>SYS://SECURE</span>
          <strong>ACTIVE</strong>
          <small>ENCRYPTED SESSION</small>
        </div>

        <div className="operator-terminal-card terminal-right">
          <span>NETWORK</span>
          <strong>MONITORING</strong>
          <small>LIVE NODE UT-01</small>
        </div>

        <Canvas
          dpr={[1, 1.3]}
          camera={{
            position: [0, 1.3, 6.5],
            fov: 38,
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          shadows
          onCreated={({ gl }) => {
            gl.setPixelRatio(
              Math.min(window.devicePixelRatio, 1.3)
            );
          }}
        >
          <OperatorScene
            active={active}
            playing={playing}
            replayKey={replayKey}
            onPhaseChange={setPhase}
          />
        </Canvas>

        <div className="operator-hud">
          <span>{phaseText}</span>
          <b>UT-01 / SECURE</b>
        </div>

        <div className="operator-controls">
          <button
            type="button"
            className="control start"
            onClick={() => {
              setActive(true);
              setPlaying(true);
            }}
          >
            ▶ START
          </button>

          <button
            type="button"
            className="control pause"
            onClick={() =>
              setPlaying((value) => !value)
            }
          >
            {playing ? "Ⅱ PAUSE" : "▶ RESUME"}
          </button>

          <button
            type="button"
            className="control replay"
            onClick={replay}
          >
            ↻ REPLAY
          </button>
        </div>
      </div>

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
