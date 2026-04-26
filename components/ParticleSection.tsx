'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

// ParticleField টিকে ক্যানভাসের ভেতরে ডাকতে হবে
const ParticleField = dynamic(() => import('./3d/ParticleField'), { ssr: false });

export default function ParticleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;
      gsap.fromTo(
        contentRef.current.querySelectorAll('.particle-reveal'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="particles" className="relative py-24 md:py-32 overflow-hidden bg-cyber-black">
      {/* 3D Particle Canvas - এখন এটি কাজ করবে কারণ আমরা Canvas যোগ করেছি */}
      <div className="absolute inset-0 hidden md:block">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* 2D fallback for mobile */}
      <div className="absolute inset-0 md:hidden opacity-30">
        <div className="absolute w-2 h-2 bg-cyber-blue/50 rounded-full top-[20%] left-[30%] animate-float" />
        <div className="absolute w-1 h-1 bg-cyber-purple/50 rounded-full top-[40%] left-[60%] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute w-1.5 h-1.5 bg-cyber-blue/40 rounded-full top-[60%] left-[20%] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/80 via-transparent to-cyber-black/80 z-[1]" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="particle-reveal font-orbitron text-xs tracking-[0.4em] uppercase text-cyber-blue/60 mb-4">
            AI Particle System
          </p>
          <h2 className="particle-reveal font-orbitron font-bold text-3xl md:text-5xl text-white leading-tight">
            Technology That <span className="text-cyber-blue">Breathes</span>
          </h2>
          <p className="particle-reveal mt-6 text-gray-400 font-poppins text-base md:text-lg leading-relaxed max-w-lg">
            Our interactive particle network responds to your presence in real-time. Each node connects, adapts, and evolves.
          </p>
          
          <div className="particle-reveal mt-8 flex gap-6">
            {[
              { value: '180+', label: 'Active Nodes' },
              { value: '60fps', label: 'Render Speed' },
              { value: 'Real-time', label: 'Interaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-orbitron font-bold text-xl text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="particle-reveal">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6">
            <h3 className="font-orbitron font-semibold text-lg text-white">System Architecture</h3>
            {[
              { label: 'Neural Mesh', desc: 'Self-organizing connections', progress: 92, color: '#00F0FF' },
              { label: 'Reactive Core', desc: 'Mouse-interactive force', progress: 87, color: '#7A00FF' },
              { label: 'Glow Renderer', desc: 'Custom shader rendering', progress: 95, color: '#00F0FF' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="font-orbitron text-sm text-cyber-blue">{item.progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${item.progress}%`, backgroundColor: item.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
