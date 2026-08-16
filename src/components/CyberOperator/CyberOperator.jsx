import "./CyberOperator.css";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import OperatorScene from "./OperatorScene";

export default function CyberOperator() {
  const sectionRef = useRef(null);
  const sequenceRef = useRef({ phase: "standby", progress: 0, elapsed: 0 });

  const [active, setActive] = useState(false);
  const [running, setRunning] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setRunning(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    setActive(true);
    setRunning(true);
  };

  const pauseAnimation = () => {
    setRunning(false);
  };

  const replayAnimation = () => {
    setActive(true);
    sequenceRef.current = {
      phase: "standby",
      progress: 0,
      elapsed: 0,
    };
    setReplayKey((value) => value + 1);
    setRunning(true);
  };

  const status =
    !active
      ? "STANDBY"
      : !running
        ? "PAUSED"
        : sequenceRef.current.phase === "typing"
          ? "ACTIVE TYPING"
          : "OPERATOR ONLINE";

  return (
    <section
      ref={sectionRef}
      className="cyber-operator"
      id="cyber-operator"
    >
      <div className="operator-bg-grid" />
      <div className="operator-vignette" />

      <div className="operator-heading">
        <span className="operator-kicker">DIGITAL OPERATIONS</span>

        <h2>
          Security doesn't sleep.
          <span> Neither do we.</span>
        </h2>

        <p>
          A live cyber-operations sequence — reconnaissance, movement,
          secure workstation access and active terminal operations.
        </p>
      </div>

      <div className="operator-stage">
        <div className="operator-room-glow operator-room-glow-left" />
        <div className="operator-room-glow operator-room-glow-right" />

        <div className="operator-status-card operator-status-left">
          <small>SYS://SECURE</small>
          <strong>ACTIVE</strong>
          <span>ENCRYPTED SESSION</span>
        </div>

        <div className="operator-status-card operator-status-right">
          <small>NETWORK</small>
          <strong>MONITORING</strong>
          <span>LIVE NODE UT-01</span>
        </div>

        <Canvas
          dpr={[1, 1.35]}
          camera={{
            position: [0, 1.35, 6.4],
            fov: 35,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          shadows
          frameloop="always"
        >
          <OperatorScene
            active={active}
            running={running}
            replayKey={replayKey}
            sequenceRef={sequenceRef}
          />
        </Canvas>

        <div className="operator-scan-line" />

        <div className="operator-controls">
          <button
            type="button"
            className="operator-control operator-control-start"
            onClick={startAnimation}
            aria-label="Start animation"
          >
            <span>▶</span>
            START ANIMATION
          </button>

          <button
            type="button"
            className="operator-control operator-control-pause"
            onClick={pauseAnimation}
            aria-label="Pause animation"
          >
            <span>Ⅱ</span>
            PAUSE
          </button>

          <button
            type="button"
            className="operator-control operator-control-replay"
            onClick={replayAnimation}
            aria-label="Replay animation"
          >
            <span>↻</span>
            REPLAY
          </button>
        </div>

        <div className="operator-live-status">
          <span className="live-dot" />
          <span>{status}</span>
        </div>
      </div>

      <div className="operator-footer">
        <div>
          <small>STATUS</small>
          <strong>{active ? "SYSTEM ACTIVE" : "WAITING"}</strong>
        </div>

        <div>
          <small>SECURITY</small>
          <strong>ENCRYPTED</strong>
        </div>

        <div>
          <small>NODE</small>
          <strong>UT-01</strong>
        </div>

        <div>
          <small>UPTIME</small>
          <strong>24:7:365</strong>
        </div>

        <div>
          <small>THREAT LEVEL</small>
          <strong>LOW</strong>
        </div>
      </div>
    </section>
  );
}
