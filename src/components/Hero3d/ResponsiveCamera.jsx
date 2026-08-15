import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const updateCamera = () => {
      const width = window.innerWidth;

      if (width >= 1400) {
        camera.position.set(0, 0, 5.8);
        camera.fov = 38;
      } 
      else if (width >= 1100) {
        camera.position.set(0, 0, 6.2);
        camera.fov = 40;
      } 
      else if (width >= 768) {
        camera.position.set(0, 0, 6.8);
        camera.fov = 43;
      } 
      else if (width >= 480) {
        camera.position.set(0, 0, 7.4);
        camera.fov = 46;
      } 
      else {
        camera.position.set(0, 0, 7.8);
        camera.fov = 48;
      }

      camera.updateProjectionMatrix();
    };

    updateCamera();

    window.addEventListener(
      "resize",
      updateCamera
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateCamera
      );
    };
  }, [camera]);

  return null;
}