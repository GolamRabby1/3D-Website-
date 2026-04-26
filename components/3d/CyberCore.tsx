'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function EnergyRing({ radius, speed, color, tilt }: any) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += speed;
    ringRef.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function CyberCore() {
  const coreRef = useRef<THREE.Group>(null);
  const wireRef1 = useRef<THREE.Mesh>(null);
  const wireRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (wireRef1.current) {
      wireRef1.current.rotation.x = t * 0.2;
      wireRef1.current.rotation.y = t * 0.3;
    }
    if (wireRef2.current) {
      wireRef2.current.rotation.x = -t * 0.15;
      wireRef2.current.rotation.z = t * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={coreRef}>
        {/* Inner Energy Core */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <pointLight color="#00F0FF" intensity={8} distance={5} />

        {/* Wireframe Shells */}
        <mesh ref={wireRef1}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial
            color="#00F0FF"
            wireframe
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh ref={wireRef2}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial
            color="#7A00FF"
            wireframe
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Orbiting Rings */}
        <EnergyRing radius={2.5} speed={0.01} color="#00F0FF" tilt={Math.PI / 4} />
        <EnergyRing radius={2.2} speed={-0.015} color="#7A00FF" tilt={-Math.PI / 3} />
        <EnergyRing radius={2.8} speed={0.008} color="#ffffff" tilt={Math.PI / 2.5} />
      </group>
    </Float>
  );
}