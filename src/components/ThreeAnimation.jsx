import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
// import "../styles/ThreeAnimation.css"; 

export default function MorphingSphereAnimation() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      shininess: 100,
      wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Morphing animation
    const morphSphere = () => {
      const vertices = sphere.geometry.attributes.position.array;
      const count = vertices.length / 3;

      for (let i = 0; i < count; i++) {
        gsap.to(vertices, {
          duration: 2 + Math.random() * 2,
          [i * 3]: vertices[i * 3] + (Math.random() - 0.5) * 2,
          [i * 3 + 1]: vertices[i * 3 + 1] + (Math.random() - 0.5) * 2,
          [i * 3 + 2]: vertices[i * 3 + 2] + (Math.random() - 0.5) * 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          onUpdate: () => {
            sphere.geometry.attributes.position.needsUpdate = true;
          }
        });
      }
    };

    morphSphere();

    // Color change animation
    gsap.to(sphere.material.color, {
      r: 1,
      g: 0,
      b: 1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
}


// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { gsap } from "gsap";
// // import "../styles/ThreeAnimation.css";

// const GlobeAnimation = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create globe geometry and material
//     const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
//     const globeMaterial = new THREE.MeshStandardMaterial({
//       map: new THREE.TextureLoader().load(
//         "https://tse1.mm.bing.net/th?id=OIP.eLVe8pdMHH-YqXTosos9FwHaHa&pid=Api&P=0&h=180"
//       ), // Earth texture
//       bumpMap: new THREE.TextureLoader().load(
//         "https://tse1.mm.bing.net/th?id=OIP.eLVe8pdMHH-YqXTosos9FwHaHa&pid=Api&P=0&h=180"
//       ), // Normal map for bumps
//       bumpScale: 2.9,
//     });
//     const globe = new THREE.Mesh(globeGeometry, globeMaterial);
//     scene.add(globe);

//     // Add lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(10, 10, 10);
//     scene.add(pointLight);

//     camera.position.z = 10;

//     // Animation function
//     const animate = () => {
//       requestAnimationFrame(animate);
//       globe.rotation.y += 0.01; // Rotate globe
//       renderer.render(scene, camera);
//     };

//     animate();

//     // GSAP for additional animations
//     gsap.to(globe.rotation, {
//       y: 2 * Math.PI, // Rotate 360 degrees
//       duration: 10,
//       repeat: -1, // Repeat infinitely
//       ease: "none",
//     });

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef}></div>;
// };

// export default GlobeAnimation;
