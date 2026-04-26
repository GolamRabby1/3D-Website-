'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// Lazy load heavy 3D components
const CarShowcase = dynamic(() => import('./CarShowcase'), { ssr: false });
const BikeShowcase = dynamic(() => import('./BikeShowcase'), { ssr: false });

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin" />
        <span className="text-cyber-blue text-xs font-orbitron tracking-widest">
          LOADING
        </span>
      </div>
    </Html>
  );
}

interface ShowcaseCanvasProps {
  type: 'car' | 'bike';
  modelPath?: string;
}

export default function ShowcaseCanvas({ type, modelPath }: ShowcaseCanvasProps) {
  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden neon-border">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          {type === 'car' ? (

         //   <CarShowcase modelPath={modelPath} />
         // ) : (
          //  <BikeShowcase modelPath={modelPath} />
         
          <CarShowcase />
          ) : (
           <BikeShowcase useRealModel={true} />

          )}


        </Suspense>
      </Canvas>
    </div>
  );
}