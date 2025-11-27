// @ts-nocheck

"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { easing } from "maath";

export const FlipBook = () => (
  <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
    <ambientLight intensity={1.6} />
    <directionalLight position={[5, 30, 5]} intensity={1.8} />
    <directionalLight position={[5, 20, 20]} intensity={1.8} />
    <directionalLight position={[5, 15, 30]} intensity={1.8} />
    <Rig>
      <Carousel />
    </Rig>
  </Canvas>
);

function Rig(props: any) {
  const ref = useRef<any>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [dragRotation, setDragRotation] = useState([0, 0]); // [xRotation, yRotation]
  const isDragging = useRef(false);
  const prevMouse = useRef([0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollOffset(scrollTop / docHeight); // normalized 0 → 1
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMouse.current = [e.clientX, e.clientY];
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current[0];
      const dy = e.clientY - prevMouse.current[1];
      prevMouse.current = [e.clientX, e.clientY];

      // scale drag speed
      setDragRotation(([x, y]) => [x + dy * 0.01, y + dx * 0.01]);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Scroll-based rotation
    easing.damp(
      ref.current.rotation,
      "x",
      -scrollOffset * Math.PI * 2 * 0.1 + dragRotation[0],
      0.3,
      delta,
    );

    // Camera movement
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 5 + 3, state.pointer.y + 3, 10],
      0.3,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref} {...props} />;
}

function Carousel({ count = 10 }) {
  const groupRefs = useRef([]);

  useFrame((state, delta) => {
    groupRefs.current.forEach((ref, i) => {
      if (ref) {
        const targetRotation = Math.PI + (i / count) * Math.PI * 2;
        easing.damp(ref.rotation, "x", targetRotation, 1.5, delta);
      }
    });
    state.events.update();
  });

  return Array.from({ length: count }, (_, i) => (
    <group
      key={i}
      ref={(el) => (groupRefs.current[i] = el)}
      rotation={[0, 0, 0]}
    >
      <Card
        key={i}
        url={`/images/carbon_${(i % 3) + 1}.png`}
        position={[0, 0.6, 0]}
      />
    </group>
  ));
}

function Card({ url, ...props }: { url: string; any }) {
  const texture = useTexture(url);

  const geometry = useMemo(() => {
    const shape = createRoundedShape(1, 1, 0.05);
    const geo = new THREE.ShapeGeometry(shape, 32);

    const positions = geo.attributes.position;
    const uvs = new Float32Array(positions.count * 2);

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      uvs[i * 2] = x + 0.5; // u
      uvs[i * 2 + 1] = y + 0.5; // v
    }

    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return geo;
  }, []);

  useEffect(() => {
    if (texture?.image) {
      const imageAspect = texture.image.width / texture.image.height;
      const planeAspect = 1;

      if (imageAspect > planeAspect) {
        // Wider image
        const scale = planeAspect / imageAspect;
        texture.repeat.set(scale, 1);
        texture.offset.set((1 - scale) / 2, 0);
      } else {
        // Taller image
        const scale = imageAspect / planeAspect;
        texture.repeat.set(1, scale);
        texture.offset.set(0, (1 - scale) / 2);
      }
    }
  }, [texture]);

  return (
    <group {...props}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          side={THREE.BackSide}
          transparent
          metalness={0.3}
          roughness={0.4}
          envMapIntensity={0.6}
        />
      </mesh>

      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#151718"
          side={THREE.FrontSide}
          transparent
          metalness={0.3}
          roughness={0.4}
          envMapIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function createRoundedShape(width, height, radius) {
  const w = width;
  const h = height;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();

  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

  return shape;
}
