import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PHASES = {
  WALK: "walk",
  SIT: "sit",
  TYPING: "typing",
  STANDBY: "standby",
};

const WALK_DURATION = 4.2;
const SIT_DURATION = 2.25;

export default function OperatorController({
  scene,
  animations = [],
  active = false,
  running = false,
  replayKey = 0,
  sequenceRef,
}) {
  const mixer = useMemo(
    () => (scene ? new THREE.AnimationMixer(scene) : null),
    [scene]
  );

  const actions = useRef({});
  const currentAction = useRef(null);
  const elapsedRef = useRef(0);
  const lastPhase = useRef(PHASES.STANDBY);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mixer) return;

    const actionMap = {};

    animations.forEach((clip) => {
      const name = clip.name
        .toLowerCase()
        .replace(/[\s_-]+/g, "");

      let key = null;

      if (
        name.includes("walk") ||
        name.includes("walking") ||
        name.includes("locomotion")
      ) {
        key = "walk";
      } else if (
        name.includes("sit") ||
        name.includes("sitting") ||
        name.includes("seated")
      ) {
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
        action.clampWhenFinished = true;
        action.zeroSlopeAtStart = true;
        action.zeroSlopeAtEnd = true;

        actionMap[key] = action;
      }
    });

    actions.current = actionMap;

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      actions.current = {};
      currentAction.current = null;
    };
  }, [mixer, animations, scene]);

  const stopCurrent = () => {
    if (!currentAction.current) return;

    currentAction.current.fadeOut(0.22);
    currentAction.current = null;
  };

  const play = (name, fade = 0.28, loop = true) => {
    const next = actions.current[name];

    if (!next) return false;

    if (currentAction.current === next) return true;

    next.reset();
    next.enabled = true;
    next.setLoop(
      loop ? THREE.LoopRepeat : THREE.LoopOnce,
      loop ? Infinity : 1
    );
    next.fadeIn(fade);
    next.play();

    if (currentAction.current) {
      currentAction.current.fadeOut(fade);
    }

    currentAction.current = next;
    return true;
  };

  const setPhase = (phase) => {
    if (lastPhase.current === phase) return;

    lastPhase.current = phase;

    if (phase === PHASES.WALK) {
      play(actions.current.walk ? "walk" : "idle", 0.3, true);
    } else if (phase === PHASES.SIT) {
      play(actions.current.sit ? "sit" : "idle", 0.35, false);
    } else if (phase === PHASES.TYPING) {
      play(actions.current.type ? "type" : "idle", 0.4, true);
    } else {
      play(actions.current.idle || actions.current.walk ? "idle" : "walk");
    }
  };

  useEffect(() => {
    elapsedRef.current = 0;
    lastPhase.current = PHASES.STANDBY;
    initializedRef.current = false;

    if (!scene || !mixer) return;

    mixer.stopAllAction();
    currentAction.current = null;

    scene.position.set(-1.85, -1.25, 1.35);
    scene.rotation.set(0, Math.PI, 0);

    if (sequenceRef?.current) {
      sequenceRef.current.phase = PHASES.STANDBY;
      sequenceRef.current.progress = 0;
      sequenceRef.current.elapsed = 0;
    }
  }, [replayKey, scene, mixer, sequenceRef]);

  useFrame((_, delta) => {
    if (!mixer || !scene) return;

    const safeDelta = Math.min(delta, 0.033);

    if (active && running) {
      elapsedRef.current += safeDelta;
    }

    const elapsed = elapsedRef.current;

    let phase = PHASES.STANDBY;
    let progress = 0;

    if (active && elapsed > 0) {
      if (elapsed < WALK_DURATION) {
        phase = PHASES.WALK;
        progress = elapsed / WALK_DURATION;
      } else if (elapsed < WALK_DURATION + SIT_DURATION) {
        phase = PHASES.SIT;
        progress =
          (elapsed - WALK_DURATION) / SIT_DURATION;
      } else {
        phase = PHASES.TYPING;
        progress = Math.min(
          1,
          (elapsed - WALK_DURATION - SIT_DURATION) / 1.5
        );
      }
    }

    setPhase(phase);

    if (sequenceRef?.current) {
      sequenceRef.current.phase = phase;
      sequenceRef.current.progress = THREE.MathUtils.clamp(
        progress,
        0,
        1
      );
      sequenceRef.current.elapsed = elapsed;
    }

    // Keep the character on a controlled cinematic path.
    // This prevents root-motion clips from pushing the operator
    // through the desk/monitor.
    if (phase === PHASES.WALK) {
      const p = THREE.MathUtils.smoothstep(progress, 0, 1);

      scene.position.x = THREE.MathUtils.lerp(
        -1.85,
        0,
        p
      );

      scene.position.z = THREE.MathUtils.lerp(
        1.35,
        0.03,
        p
      );

      scene.position.y = -1.25;
      scene.rotation.y = Math.PI;
    } else if (phase === PHASES.SIT) {
      scene.position.x = THREE.MathUtils.lerp(
        scene.position.x,
        0,
        0.18
      );

      scene.position.z = THREE.MathUtils.lerp(
        scene.position.z,
        0.03,
        0.18
      );

      scene.position.y = -1.25;
      scene.rotation.y = Math.PI;
    } else if (phase === PHASES.TYPING) {
      scene.position.x = 0;
      scene.position.z = 0.03;
      scene.position.y = -1.25;
      scene.rotation.y = Math.PI;
    }

    if (running) {
      mixer.update(safeDelta);
    }
  });

  return null;
}
