'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

// WarpTunnel টিকে ক্যানভাসের ভেতরে ডাকতে হবে
const WarpTunnel = dynamic(() => import('./3d/WarpTunnel'), { ssr: false });

export default function HyperdriveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Speed counter animation
      if (speedRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 440,
          duration: 3,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            if (speedRef.current) {
              speedRef.current.innerText = Math.floor(obj.val).toString();
            }
          },
        });
      }

      // Content reveal
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.hyper-reveal') || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Tunnel Background - এখন এটি কাজ করবে কারণ Canvas যোগ করা হয়েছে */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <WarpTunnel />
        </Canvas>
      </div>

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black z-[1] opacity-70" />
      <div className="absolute inset-0 bg-cyber-black/40 z-[1]" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="hyper-reveal font-orbitron text-xs tracking-[0.5em] uppercase text-cyber-purple mb-6">
          Initializing Hyperdrive
        </p>
        <h2 className="hyper-reveal font-orbitron font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-white opacity-80">
          BEYOND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">LIMITS</span>
        </h2>
        <p className="hyper-reveal mt-6 text-gray-400 font-poppins text-base md:text-lg max-w-xl mx-auto">
          Where physics surrender. Experience acceleration that rewrites the rules of possibility.
        </p>

        {/* Speed HUD Element */}
        <div className="hyper-reveal mt-12 inline-flex items-center gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4">
          <div className="text-left">
            <p className="text-[10px] font-orbitron tracking-widest text-gray-500 uppercase">Current Velocity</p>
            <div className="flex items-baseline gap-2">
              <span ref={speedRef} className="font-orbitron font-bold text-4xl text-white">0</span>
              <span className="font-orbitron text-sm text-cyber-blue">KM/H</span>
            </div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyber-blue/40 to-transparent" />
          <div className="text-left">
            <p className="text-[10px] font-orbitron tracking-widest text-gray-500 uppercase">Status</p>
            <p className="font-orbitron text-sm text-cyber-blue animate-pulse">ENGAGED</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyber-black to-transparent z-[2]" />
    </section>
  );
}
