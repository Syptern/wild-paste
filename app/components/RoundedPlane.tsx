"use client";
import * as THREE from "three";
import { useMemo } from "react";
import { Shape } from "three";

export function RoundedPlane({
  width = 1,
  height = 1,
  radius = 0.1,
  color = "green",
  ...props
}) {
  const geometry = useMemo(() => {
    const w = width;
    const h = height;
    const r = Math.min(radius, width / 2, height / 2);
    const rounded = new Shape();

    rounded.moveTo(-w / 2 + r, -h / 2);
    rounded.lineTo(w / 2 - r, -h / 2);
    rounded.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    rounded.lineTo(w / 2, h / 2 - r);
    rounded.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    rounded.lineTo(-w / 2 + r, h / 2);
    rounded.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    rounded.lineTo(-w / 2, -h / 2 + r);
    rounded.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const geometry = new THREE.ShapeGeometry(rounded, 32);

    // Generate proper UVs for texture mapping
    const positions = geometry.attributes.position;
    const uvs = new Float32Array(positions.count * 2);

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      // Map x,y coordinates to UV space (0-1)
      uvs[i * 2] = (x + w / 2) / w;
      uvs[i * 2 + 1] = (y + h / 2) / h;
    }

    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.computeVertexNormals();

    return geometry;
  }, [width, height, radius]);

  return (
    <mesh {...props} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}
