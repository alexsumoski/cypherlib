import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const WebGLBackground: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SEPARATION = 120,
      AMOUNTX = 300,
      AMOUNTY = 70;
    let camera: THREE.Camera,
      scene: THREE.Object3D<THREE.Object3DEventMap>,
      renderer: THREE.WebGLRenderer;
    let particles: any[],
      count = 0;

    const init = () => {
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 10000;

      scene = new THREE.Scene();

      particles = [];

      const canvas = document.createElement("canvas");
      canvas.width = 16; // Size of the canvas
      canvas.height = 16;
      const context = canvas.getContext("2d");

      if (context) {
        context.beginPath();
        context.arc(8, 8, 8, 0, Math.PI * 2, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
      }

      const particleTexture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: particleTexture });

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = (particles[i++] = new THREE.Sprite(material));
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scene.add(particle);
        }
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      ref.current?.appendChild(renderer.domElement);

      window.addEventListener("resize", onWindowResize, false);
    };

    const onWindowResize = () => {
      //@ts-ignore
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      camera.position.set(0, 355, 122);

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 4 +
            (Math.sin((iy + count) * 0.5) + 1) * 4;
        }
      }
      renderer.render(scene, camera);
      count += 0.035;
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={ref} />;
};

export default WebGLBackground;
