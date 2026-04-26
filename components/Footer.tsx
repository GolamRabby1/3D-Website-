'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  {
    title: 'Vehicles',
    links: ['Hypercars', 'Superbikes', 'Concept', 'Configurator'],
  },
  {
    title: 'Experience',
    links: ['3D Showroom', 'Test Drive', 'Events', 'VR Mode'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Sustainability'],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative border-t border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
                <span className="font-orbitron font-black text-base text-black">
                  DF
                </span>
              </div>
              <span className="font-orbitron font-bold text-xl tracking-wider">
                DRIVE<span className="text-cyber-blue">FUTURE</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Redefining the automotive experience through immersive technology
              and cutting-edge 3D visualization. The future of driving starts
              here.
            </p>
            <div className="mt-6 flex gap-4">
              {['X', 'IG', 'YT', 'LI'].map((social) => (
                <button
                  key={social}
                  className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-xs font-orbitron text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/40 transition-all duration-300"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-orbitron text-xs tracking-[0.2em] uppercase text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-gray-500 hover:text-cyber-blue transition-colors duration-300">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2026 DriveFuture By Golam Rabby.All rights reserved. Built with Next.js,
            React Three Fiber, GSAP.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <button
                key={link}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}