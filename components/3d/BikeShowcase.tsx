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
/* 🏍️ GLB BIKE MODEL */

function BikeModel() {
  const { scene } = useGLTF('/models/Bike.glb');

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <Center>
        <primitive
          object={scene}
          scale={0.02}
          position={[0, 0.4, 0]}   // ✅ FIX: Raised bike to put wheels on ground
        />
      </Center>
    </Float>
  );
}

// 🔥 preload
useGLTF.preload('/models/Bike.glb');

/* ───────────────────────────────────────────── */
/* 🧱 FALLBACK PROCEDURAL BIKE */

function BikeWheel({ position, radius = 0.35 }: { position: [number, number, number]; radius?: number }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.04, 12, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.8, radius * 0.8, 0.02, 16]} />
        <meshPhysicalMaterial color="#222233" metalness={1} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
        <meshPhysicalMaterial color="#444455" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ProceduralBike() {
  const frameMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0a0a14',
        metalness: 1,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.5,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#7A00FF',
        emissive: '#7A00FF',
        emissiveIntensity: 3,
      }),
    []
  );

  const headlightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F0F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 4,
      }),
    []
  );

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group scale={1.1} position={[0, 0, 0]}>
        {/* Main frame tube — top */}
        <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0.05]} material={frameMat}>
          <cylinderGeometry args={[0.045, 0.045, 1.4, 8]} />
        </mesh>

        {/* Down tube */}
        <mesh position={[-0.15, 0.3, 0]} rotation={[0, 0, 0.7]} material={frameMat}>
          <cylinderGeometry args={[0.045, 0.045, 0.9, 8]} />
        </mesh>

        {/* Seat tube */}
        <mesh position={[0.25, 0.3, 0]} rotation={[0, 0, -0.15]} material={frameMat}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        </mesh>

        {/* Swingarm — rear */}
        <mesh position={[0.55, 0.25, 0]} rotation={[0, 0, 0.05]} material={frameMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.9, 8]} />
        </mesh>

        {/* Fork — front */}
        <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, -0.3]} material={frameMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.8, 8]} />
        </mesh>

        {/* Fuel tank / body */}
        <mesh position={[-0.05, 0.72, 0]} material={frameMat}>
          <boxGeometry args={[0.55, 0.18, 0.3]} />
        </mesh>

        {/* Seat */}
        <mesh position={[0.3, 0.68, 0]}>
          <boxGeometry args={[0.4, 0.08, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>

        {/* Engine block */}
        <mesh position={[0.05, 0.32, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.28]} />
          <meshPhysicalMaterial color="#181820" metalness={0.9} roughness={0.4} />
        </mesh>

        {/* Handlebars */}
        <mesh position={[-0.55, 0.78, 0]} material={frameMat}>
          <boxGeometry args={[0.04, 0.04, 0.55]} />
        </mesh>

        {/* Headlight */}
        <mesh position={[-0.72, 0.62, 0]} material={headlightMat}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>

        {/* Tail light */}
        <mesh position={[0.7, 0.55, 0]} material={accentMat}>
          <boxGeometry args={[0.03, 0.05, 0.2]} />
        </mesh>

        {/* Accent strip on body */}
        <mesh position={[-0.05, 0.63, 0.16]}>
          <boxGeometry args={[0.5, 0.01, 0.01]} />
          <meshStandardMaterial color="#7A00FF" emissive="#7A00FF" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.05, 0.63, -0.16]}>
          <boxGeometry args={[0.5, 0.01, 0.01]} />
          <meshStandardMaterial color="#7A00FF" emissive="#7A00FF" emissiveIntensity={2} />
        </mesh>

        {/* Exhaust */}
        <mesh position={[0.45, 0.2, 0.2]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.025, 0.03, 0.6, 8]} />
          <meshPhysicalMaterial color="#333340" metalness={1} roughness={0.3} />
        </mesh>

        {/* Exhaust right side */}
        <mesh position={[0.45, 0.2, -0.2]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.025, 0.03, 0.6, 8]} />
          <meshPhysicalMaterial color="#333340" metalness={1} roughness={0.3} />
        </mesh>

        {/* Wheels - Procedural bike wheels sit correctly at Y=0.35 */}
        <BikeWheel position={[-0.7, 0.35, 0]} radius={0.35} />
        <BikeWheel position={[0.7, 0.35, 0]} radius={0.35} />

        {/* Underglow */}
        <pointLight position={[0, 0.3, 0]} color="#7A00FF" intensity={1.5} distance={2.5} />
      </group>
    </Float>
  );
}

/* ───────────────────────────────────────────── */
/* 🎯 MAIN COMPONENT */

interface BikeShowcaseProps {
  useRealModel?: boolean;
}

export default function BikeShowcase({ useRealModel = true }: BikeShowcaseProps) {
  const controlsRef = useRef<any>(null);

  return (
    <>
      {/* 💡 LIGHTS */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      
      <spotLight
        position={[-5, 8, 0]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.5}
        color="#7A00FF"
        castShadow
      />
      <spotLight
        position={[5, 5, -5]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.8}
        color="#00F0FF"
      />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffffff" />

      {/* 🌆 ENVIRONMENT */}
      <Environment preset="night" />

      {/* 🏍️ MODEL */}
      {useRealModel ? <BikeModel /> : <ProceduralBike />}

      {/* 🌑 SHADOW - Adjusted to match raised bike */}
      <ContactShadows
        position={[0, -0.1, 0]}   // ✅ FIX: Raised shadow position
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#7A00FF"
      />

      {/* 🪞 FLOOR - Adjusted to match raised bike */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>  {/* ✅ FIX: Raised floor */}
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial color="#050510" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 🎮 CONTROLS */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
      />
    </>
  );
}