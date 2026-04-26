'use client';

import { useRef, useMemo } from 'react';
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  Center,
} from '@react-three/drei';
import * as THREE from 'three';

/* ───────────────────────────────────────────── */
/* 🚗 GLB CAR MODEL (FIXED) */

function CarModel() {
  const { scene } = useGLTF('/models/Car.glb');

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Center>
        <primitive
          object={scene}
          scale={0.005}   // ✅ FIX: smaller scale
        />
      </Center>
    </Float>
  );
}

// 🔥 preload
useGLTF.preload('/models/Car.glb');

/* ───────────────────────────────────────────── */
/* 🧱 FALLBACK */

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.08, 16, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 6]} />
        <meshPhysicalMaterial color="#333344" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ProceduralCar() {
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#080810',
        metalness: 1,
        roughness: 0.08,
        clearcoat: 1,
      }),
    []
  );

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group scale={0.9}>
        <mesh position={[0, 0.3, 0]} material={bodyMaterial}>
          <boxGeometry args={[2.2, 0.35, 1.0]} />
        </mesh>

        <Wheel position={[-0.7, 0.12, 0.56]} />
        <Wheel position={[-0.7, 0.12, -0.56]} />
        <Wheel position={[0.7, 0.12, 0.56]} />
        <Wheel position={[0.7, 0.12, -0.56]} />
      </group>
    </Float>
  );
}

/* ───────────────────────────────────────────── */
/* 🎯 MAIN */

export default function CarShowcase() {
  const controlsRef = useRef<any>(null);
  const useRealModel = true;

  return (
    <>
      {/* 💡 LIGHT */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <spotLight
        position={[-5, 8, 5]}
        angle={0.3}
        intensity={2}
        color="#00F0FF"
      />

      {/* 🌆 ENV */}
      <Environment preset="city" />

      {/* 🚗 MODEL */}
      {useRealModel ? <CarModel /> : <ProceduralCar />}

      {/* 🌑 SHADOW */}
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.5}
        scale={10}
        blur={3}
      />

      {/* 🪞 FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial color="#050510" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 🎮 CONTROLS (FIXED) */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={30}   // ✅ FIX: more zoom out
        autoRotate
        autoRotateSpeed={0.8}
      />
    </>
  );
}