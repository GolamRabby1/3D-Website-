'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RING_COUNT = 80;
const TUNNEL_LENGTH = 150;

function WarpRing({ index, baseZ }: { index: number; baseZ: number }) {
  const ref = useRef<THREE.Group>(null);
  const speed = 0.6 + Math.random() * 0.4;

  // Alternate colors and sizes for depth
  const isBlue = index % 3 !== 0;
  const color = isBlue ? '#00F0FF' : '#7A00FF';
  const radius = 3 + Math.random() * 1.5;
  const thickness = 0.02 + Math.random() * 0.04;

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Move rings towards the camera
    ref.current.position.z += speed * delta * 60;

    // Reset ring to the end of the tunnel when it passes the camera
    if (ref.current.position.z > 10) {
      ref.current.position.z = -TUNNEL_LENGTH + Math.random() * 20;
    }
  });

  return (
    <group ref={ref} position={[0, 0, baseZ]}>
      <mesh>
        <torusGeometry args={[radius, thickness, 8, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function WarpTunnel() {
  const rings = useMemo(() => {
    return Array.from({ length: RING_COUNT }, (_, i) => ({
      id: i,
      z: -i * (TUNNEL_LENGTH / RING_COUNT) - Math.random() * 5,
    }));
  }, []);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Central glow */}
      <pointLight color="#00F0FF" intensity={5} distance={20} />
      <pointLight color="#7A00FF" intensity={3} distance={30} position={[0, 0, -10]} />

      {/* Speed lines (thin elongated meshes) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={`line-${i}`}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            -Math.random() * 100,
          ]}
          rotation={[0, Math.random() * Math.PI, 0]}
        >
          <boxGeometry args={[0.01, 0.01, 15 + Math.random() * 30]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00F0FF' : '#7A00FF'}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Warp Rings */}
      {rings.map((ring) => (
        <WarpRing key={ring.id} index={ring.id} baseZ={ring.z} />
      ))}
    </group>
  );
}