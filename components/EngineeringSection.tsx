'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

const CyberCore = dynamic(() => import('./3d/CyberCore'), { ssr: false });

const TECH_SPECS = [
  {
    label: 'QUANTUM DRIVE',
    value: '98.7%',
    description: 'Neural synchronization rate across all axles.',
    color: '#00F0FF',
  },
  {
    label: 'TITAN CHASSIS',
    value: '1.2t',
    description: 'Carbon-fiber reinforced titanium monocoque.',
    color: '#7A00FF',
  },
  {
    label: 'ZERO-LAG I/O',
    value: '0.01ms',
    description: 'Biometric-to-throttle response latency.',
    color: '#00F0FF',
  },
];

export default function EngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.eng-reveal') || [],
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Progress bar animation
      gsap.fromTo(
        cardsRef.current?.querySelectorAll('.spec-progress-bar') || [],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 🔥 Background Effects */}
      <div className="absolute inset-0 bg-cyber-black" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyber-purple/[0.04] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 🧠 3D Core (FIXED WITH CANVAS) */}
        <div className="hidden md:block h-[500px] lg:h-[600px]">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
            <CyberCore />
          </Canvas>
        </div>

        {/* 🎯 Right Content */}
        <div>
          <p className="eng-reveal font-orbitron text-xs tracking-[0.5em] uppercase text-cyber-purple/80 mb-4">
            System Analysis
          </p>

          <h2 className="eng-reveal font-orbitron font-bold text-3xl md:text-5xl text-white leading-tight">
            ENGINEERING <br />
            <span className="gradient-text">GENESIS</span>
          </h2>

          <p className="eng-reveal mt-6 text-gray-400 font-poppins text-base leading-relaxed max-w-md">
            Forged at the intersection of quantum computing and aerodynamic perfection.
            Every component is a masterpiece of cybernetic integration.
          </p>

          {/* 💳 Tech Cards */}
          <div ref={cardsRef} className="mt-10 space-y-5">
            {TECH_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="eng-reveal relative group p-5 rounded-xl border border-white/[0.06] bg-[#0a0a14]/60 backdrop-blur-sm hover:border-white/[0.15] transition-all duration-300 overflow-hidden"
              >
                {/* ✨ Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: spec.color }}
                />

                <div className="relative flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[10px] font-orbitron tracking-[0.3em] text-gray-500">
                      {spec.label}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 max-w-[250px]">
                      {spec.description}
                    </p>
                  </div>

                  <span
                    className="font-orbitron font-bold text-xl"
                    style={{ color: spec.color }}
                  >
                    {spec.value}
                  </span>
                </div>

                {/* 📊 Gradient Progress Bar */}
                <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden mt-2">
                  <div
                    className="spec-progress-bar h-full rounded-full origin-left"
                    style={{
                      width: '100%',
                      background: `linear-gradient(90deg, ${spec.color}20, ${spec.color})`,
                    }}
                  />
                </div>

                {/* 🔲 Corner Brackets */}
                <div
                  className="absolute top-2 left-2 w-3 h-3 border-t border-l"
                  style={{ borderColor: `${spec.color}30` }}
                />
                <div
                  className="absolute bottom-2 right-2 w-3 h-3 border-b border-r"
                  style={{ borderColor: `${spec.color}30` }}
                />
              </div>
            ))}
          </div>

          {/* 📱 Mobile Canvas */}
          <div className="md:hidden mt-10 h-[300px] rounded-2xl neon-border overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <CyberCore />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}