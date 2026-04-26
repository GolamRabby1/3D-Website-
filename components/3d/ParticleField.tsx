'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 1.8;
const MAX_CONNECTIONS = 600;

const vertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = smoothstep(15.0, 3.0, -mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);
    gl_FragColor = vec4(vColor, glow * vAlpha * 0.9);
  }
`;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector2(999, 999));
  const { viewport } = useThree();

  // Initialize particle positions and velocities
  const { positions, velocities, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const blue = new THREE.Color('#00F0FF');
    const purple = new THREE.Color('#7A00FF');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 14;
      pos[i3 + 1] = (Math.random() - 0.5) * 8;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      vel[i3] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003;

      siz[i] = Math.random() * 1.5 + 0.5;

      // Color mix: mostly blue/purple, some white
      const r = Math.random();
      const c = r < 0.45 ? blue : r < 0.85 ? purple : white;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { positions: pos, velocities: vel, sizes: siz, colors: col };
  }, []);

  // Line geometry buffer
  const linePositions = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    []
  );
  const lineColors = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    []
  );

  const lineGeom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );
    geom.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3)
    );
    geom.setDrawRange(0, 0);
    return geom;
  }, [linePositions, lineColors]);

  // Mouse move handler
  const onPointerMove = useCallback((e: any) => {
    mouseRef.current.set(
      (e.point.x / viewport.width) * 2,
      (e.point.y / viewport.height) * 2
    );
  }, [viewport]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const time = state.clock.elapsedTime;

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Apply velocity
      posArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.0005;
      posArray[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.5) * 0.0005;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Mouse repulsion
      const dx = posArray[i3] - mouseRef.current.x * 5;
      const dy = posArray[i3 + 1] - mouseRef.current.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2.5 && dist > 0.01) {
        const force = (2.5 - dist) * 0.002;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }

      // Boundary wrapping
      if (posArray[i3] > 7) posArray[i3] = -7;
      if (posArray[i3] < -7) posArray[i3] = 7;
      if (posArray[i3 + 1] > 4) posArray[i3 + 1] = -4;
      if (posArray[i3 + 1] < -4) posArray[i3 + 1] = 4;
      if (posArray[i3 + 2] > 5) posArray[i3 + 2] = -5;
      if (posArray[i3 + 2] < -5) posArray[i3 + 2] = 5;
    }
    posAttr.needsUpdate = true;

    // Compute connections (every 2 frames for performance)
    if (Math.floor(time * 60) % 2 === 0) {
      let lineIdx = 0;
      const lp = linePositions;
      const lc = lineColors;

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; i++) {
        for (
          let j = i + 1;
          j < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS;
          j++
        ) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < CONNECTION_DISTANCE) {
            const alpha = 1 - d / CONNECTION_DISTANCE;
            const li = lineIdx * 6;

            lp[li] = posArray[i3];
            lp[li + 1] = posArray[i3 + 1];
            lp[li + 2] = posArray[i3 + 2];
            lp[li + 3] = posArray[j3];
            lp[li + 4] = posArray[j3 + 1];
            lp[li + 5] = posArray[j3 + 2];

            // Neon blue/purple mix for lines
            const mix = alpha * 0.4;
            lc[li] = 0;
            lc[li + 1] = mix * 0.94;
            lc[li + 2] = mix;
            lc[li + 3] = mix * 0.48;
            lc[li + 4] = 0;
            lc[li + 5] = mix;

            lineIdx++;
          }
        }
      }

      linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
      (
        linesRef.current.geometry.attributes.position as THREE.BufferAttribute
      ).needsUpdate = true;
      (
        linesRef.current.geometry.attributes.color as THREE.BufferAttribute
      ).needsUpdate = true;
    }
  });

  return (
    <group onPointerMove={onPointerMove}>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={PARTICLE_COUNT}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={PARTICLE_COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}