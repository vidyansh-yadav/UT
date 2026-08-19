import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FLOOR_Y = -1.27;

// Safe cinematic path: it approaches the workstation from the SIDE,
// never through the desk/monitor/CPU. The final point is the chair seat.
const START = new THREE.Vector3(0, FLOOR_Y, 2.35);
const APPROACH = new THREE.Vector3(1.55, FLOOR_Y, 1.25);
const CHAIR = new THREE.Vector3(0.15, FLOOR_Y, 0.38);

// Invisible gameplay colliders. The scripted route is intentionally kept
// outside these volumes, so the operator can never walk through furniture.
const DESK_COLLIDER = new THREE.Box3(
  new THREE.Vector3(-1.95, FLOOR_Y, -1.95),
  new THREE.Vector3(1.95, 0.2, -0.55)
);

function keepOutsideBox(position, radius = 0.34) {
  const closest = DESK_COLLIDER.clampPoint(position, new THREE.Vector3());
  const dx = position.x - closest.x;
  const dz = position.z - closest.z;
  const distance = Math.hypot(dx, dz);

  if (distance < radius) {
    // Push toward the front edge of the desk instead of letting the root
    // enter the furniture volume.
    position.z = Math.max(position.z, DESK_COLLIDER.max.z + radius);
  }

  return position;
}

export default function OperatorController({
  scene,
  animations = [],
  active = false,
  playing = false,
  replayKey = 0,
  root = null,
  onPhaseChange,
}) {
  const mixer = useMemo(
    () => (scene ? new THREE.AnimationMixer(scene) : null),
    [scene]
  );

  const actions = useRef({});
  const currentAction = useRef(null);
  const started = useRef(false);
  const phaseRef = useRef("idle");
  const pathRef = useRef({
    from: START.clone(),
    to: APPROACH.clone(),
    elapsed: 0,
    duration: 2.8,
    stage: 0,
  });

  const setPhase = (next) => {
    if (phaseRef.current === next) return;
    phaseRef.current = next;
    onPhaseChange?.(next);
  };

  useEffect(() => {
    if (!mixer || !animations.length) return;

    const actionMap = {};

    animations.forEach((clip) => {
      const name = clip.name.toLowerCase().replace(/[\s_-]+/g, "");
      let key = null;

      if (name.includes("walk") || name.includes("walking") || name.includes("locomotion")) {
        key = "walk";
      } else if (name.includes("sit") || name.includes("sitting") || name.includes("seated")) {
        key = "sit";
      } else if (
        name.includes("typing") ||
        name.includes("type") ||
        name.includes("computer") ||
        name.includes("laptop")
      ) {
        key = "type";
      } else if (
        name.includes("idle") ||
        name.includes("standing") ||
        name === "stand"
      ) {
        key = "idle";
      }

      if (key && !actionMap[key]) {
        const action = mixer.clipAction(clip);
        action.enabled = true;
        action.clampWhenFinished = key === "sit";
        action.setEffectiveWeight(1);
        actionMap[key] = action;
      }
    });

    actions.current = actionMap;
    console.log("Operator animations:", animations.map((clip) => clip.name));

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      actions.current = {};
      currentAction.current = null;
    };
  }, [mixer, animations, scene]);

  const play = (name, fade = 0.3, loop = true) => {
    const next = actions.current[name];
    if (!next) return false;
    if (currentAction.current === next) return true;

    next.reset();
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
    next.clampWhenFinished = !loop;
    next.fadeIn(fade).play();

    if (currentAction.current) {
      currentAction.current.fadeOut(fade);
    }

    currentAction.current = next;
    return true;
  };

  const resetSequence = () => {
    started.current = false;
    phaseRef.current = "idle";
    pathRef.current = {
      from: START.clone(),
      to: APPROACH.clone(),
      elapsed: 0,
      duration: 2.8,
      stage: 0,
    };

    if (root?.current) {
      root.current.position.copy(START);
      root.current.rotation.y = Math.PI;
    }

    mixer?.stopAllAction();
    currentAction.current = null;
  };

  useEffect(() => {
    if (replayKey > 0) resetSequence();
  }, [replayKey]);

  useEffect(() => {
    if (!active || !playing || started.current) return;
    if (!scene || !animations.length || !root?.current) return;

    started.current = true;
    resetSequence();
    started.current = true;

    setPhase("walk");
    play("walk", 0.25, true) || play("idle", 0.25, true);
  }, [active, playing, replayKey, scene, animations, root]);

  useEffect(() => {
    if (active && !playing && currentAction.current) {
      currentAction.current.paused = true;
    } else if (playing && currentAction.current) {
      currentAction.current.paused = false;
    }
  }, [playing, active]);

  useFrame((_, delta) => {
    if (!mixer || !root?.current) return;

    const dt = Math.min(delta, 0.033);

    if (playing && active) {
      const path = pathRef.current;
      path.elapsed += dt;

      if (path.stage === 0) {
        const t = THREE.MathUtils.clamp(path.elapsed / path.duration, 0, 1);
        const eased = t * t * (3 - 2 * t);
        root.current.position.lerpVectors(path.from, path.to, eased);
        keepOutsideBox(root.current.position);
        root.current.rotation.y = THREE.MathUtils.lerp(Math.PI, Math.PI * 0.5, eased);

        if (t >= 1) {
          path.stage = 1;
          path.from.copy(APPROACH);
          path.to.copy(CHAIR);
          path.elapsed = 0;
          path.duration = 1.9;
        }
      } else if (path.stage === 1) {
        const t = THREE.MathUtils.clamp(path.elapsed / path.duration, 0, 1);
        const eased = t * t * (3 - 2 * t);
        root.current.position.lerpVectors(path.from, path.to, eased);
        keepOutsideBox(root.current.position);
        root.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.5, Math.PI, eased);

        if (t >= 1) {
          path.stage = 2;
          path.elapsed = 0;
          setPhase("sit");
          play("sit", 0.4, false) || play("idle", 0.35, true);
        }
      } else if (path.stage === 2) {
        // Lock the character exactly on the chair. This prevents root-motion
        // from moving him through the chair or desk during the sit animation.
        root.current.position.copy(CHAIR);
        root.current.rotation.y = Math.PI;

        // Stay seated at the workstation. The terminal screen continues
        // its cyber-operation visual, while the character remains locked
        // to the chair instead of standing back up.
        if (path.elapsed >= 1.15) {
          path.stage = 3;
        }
      } else {
        // Final seated workstation state.
        root.current.position.copy(CHAIR);
        root.current.rotation.y = Math.PI;
      }
    }

    // Remove GLTF object-level root motion. The outer group is the only
    // object allowed to translate in the cinematic path.
    scene.position.set(0, 0, 0);

    mixer.update(dt);
  });

  return null;
}
