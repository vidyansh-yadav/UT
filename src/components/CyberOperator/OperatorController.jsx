import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function OperatorController({
  scene,
  animations = [],
  active = false,
}) {
  const mixer = useMemo(
    () => (scene ? new THREE.AnimationMixer(scene) : null),
    [scene]
  );

  const actions = useRef({});
  const currentAction = useRef(null);
  const started = useRef(false);

  // --------------------------------------------------
  // FIND ANIMATIONS
  // --------------------------------------------------
  useEffect(() => {
    if (!mixer || !animations.length) return;

    const actionMap = {};

    animations.forEach((clip) => {
      const name = clip.name.toLowerCase().replace(/[\s_-]+/g, "");

      let key = null;

      if (
        name.includes("walk") ||
        name.includes("walking") ||
        name.includes("locomotion")
      ) {
        key = "walk";
      }

      if (
        name.includes("sit") ||
        name.includes("sitting") ||
        name.includes("seated")
      ) {
        key = "sit";
      }

      if (
        name.includes("typing") ||
        name.includes("type") ||
        name.includes("computer") ||
        name.includes("laptop")
      ) {
        key = "type";
      }

      if (
        name.includes("idle") ||
        name.includes("standing") ||
        name === "stand"
      ) {
        key = "idle";
      }

      if (key && !actionMap[key]) {
        const action = mixer.clipAction(clip);

        action.enabled = true;
        action.clampWhenFinished = false;

        actionMap[key] = action;
      }
    });

    actions.current = actionMap;

    // DEBUG
    console.log(
      "Operator animations:",
      animations.map((clip) => clip.name)
    );

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      actions.current = {};
      currentAction.current = null;
    };
  }, [mixer, animations, scene]);

  // --------------------------------------------------
  // PLAY ACTION
  // --------------------------------------------------
  const play = (name, fade = 0.35, loop = true) => {
    const next = actions.current[name];

    if (!next) {
      console.warn(`Operator animation "${name}" not found.`);
      return false;
    }

    if (currentAction.current === next) {
      return true;
    }

    next.reset();

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

  // --------------------------------------------------
  // CINEMATIC SEQUENCE
  // --------------------------------------------------
  useEffect(() => {
    if (!active || started.current) return;
    if (!scene || !animations.length) return;

    started.current = true;

    const available = actions.current;

    // -----------------------------------------------
    // STEP 1 — WALK
    // -----------------------------------------------
    if (available.walk) {
      play("walk", 0.25, true);
    } else if (available.idle) {
      play("idle", 0.25, true);
    }

    // -----------------------------------------------
    // STEP 2 — SIT
    // -----------------------------------------------
    const sitTimer = setTimeout(() => {
      if (available.sit) {
        play("sit", 0.45, false);
      }
    }, 4200);

    // -----------------------------------------------
    // STEP 3 — TYPE
    // -----------------------------------------------
    const typeTimer = setTimeout(() => {
      if (available.type) {
        play("type", 0.45, true);
      } else if (available.idle) {
        // fallback
        play("idle", 0.45, true);

        console.warn(
          "No typing animation found inside operator.glb"
        );
      }
    }, 6500);

    return () => {
      clearTimeout(sitTimer);
      clearTimeout(typeTimer);
    };
  }, [active, scene, animations]);

  // --------------------------------------------------
  // UPDATE MIXER
  // --------------------------------------------------
  useFrame((_, delta) => {
    if (!mixer) return;

    mixer.update(Math.min(delta, 0.05));
  });

  return null;
}