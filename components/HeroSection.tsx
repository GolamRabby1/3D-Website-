'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import NeonButton from './ui/NeonButton';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      // Stagger animate title characters
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text
          .split('')
          .map(
            (char) =>
              `<span class="inline-block" style="opacity:0; transform:translateY(40px)">${char === ' ' ? '&nbsp;' : char}</span>`
          )
          .join('');

        tl.to(titleRef.current.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
        });
      }

      // Subtitle fade
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg noise-overlay scan-lines"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-purple/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/40 via-transparent to-cyber-black z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/60 via-transparent to-cyber-black/60 z-[3]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Overline */}
        <div className="mb-6 opacity-0" ref={subtitleRef}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-orbitron tracking-[0.3em] uppercase border border-cyber-blue/30 text-cyber-blue/80">
            Premium Racing Experience
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight animate-glow-pulse"
        >
          DRIVE THE FUTURE
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-gray-400 font-poppins max-w-2xl mx-auto leading-relaxed"
        >
          Where raw power meets cutting-edge technology. Experience hypercars
          and superbikes in immersive 3D like never before.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap justify-center gap-4">
          <NeonButton
            variant="primary"
            onClick={() =>
              document
                .getElementById('vehicles')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explore Vehicles
          </NeonButton>
          <NeonButton
            variant="purple"
            onClick={() =>
              document
                .getElementById('particles')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Experience Tech
          </NeonButton>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] font-orbitron tracking-[0.3em] text-gray-500 uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-cyber-blue animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}