'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger text words
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.cinema-word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Accent line expand
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cinematic"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated cinematic background */}
      <div className="absolute inset-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-cyber-black" />

        {/* Animated light streaks */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent top-[30%] -left-[50%]"
            style={{
              animation: 'streak 8s linear infinite',
              transform: 'rotate(-5deg)',
            }}
          />
          <div
            className="absolute w-[200%] h-0.5 bg-gradient-to-r from-transparent via-cyber-purple/15 to-transparent top-[60%] -left-[50%]"
            style={{
              animation: 'streak 12s linear infinite',
              animationDelay: '3s',
              transform: 'rotate(3deg)',
            }}
          />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/[0.03] rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyber-purple/[0.04] rounded-full blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Overline */}
        <p className="font-orbitron text-xs tracking-[0.4em] uppercase text-cyber-blue/60 mb-8">
          The Philosophy
        </p>

        {/* Main text */}
        <div ref={textRef} className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {['PRECISION.', 'POWER.', 'PRESTIGE.'].map((word) => (
            <span
              key={word}
              className="cinema-word font-orbitron font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          className="mt-10 mx-auto w-48 h-[2px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent origin-center"
        />

        {/* Description */}
        <p className="mt-10 text-gray-400 font-poppins text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Every curve is calculated. Every surface is purposeful. This is not
          transportation — this is engineering artistry at its most extreme.
        </p>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '440', unit: 'km/h', label: 'Top Speed' },
            { value: '1.81', unit: 'sec', label: '0-100' },
            { value: '1914', unit: 'HP', label: 'Max Power' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-orbitron font-bold text-2xl md:text-3xl text-white">
                {stat.value}
                <span className="text-cyber-blue text-sm ml-1">{stat.unit}</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes streak {
          0% { transform: translateX(-25%) rotate(-5deg); }
          100% { transform: translateX(25%) rotate(-5deg); }
        }
      `}</style>
    </section>
  );
}