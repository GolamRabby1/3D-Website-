'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hypercars, superbikes, Vehicle } from '@/data/vehicles';
import VehicleCard from './ui/VehicleCard';
import ShowcaseCanvas from './3d/ShowcaseCanvas';

gsap.registerPlugin(ScrollTrigger);

type Tab = 'cars' | 'bikes';

export default function VehicleShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('cars');
  const [showcaseVehicle, setShowcaseVehicle] = useState<Vehicle | null>(null);
  const [showcaseType, setShowcaseType] = useState<'car' | 'bike'>('car');

  const vehicles = activeTab === 'cars' ? hypercars : superbikes;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll('.reveal-up'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards reveal
      gsap.fromTo(
        '.vehicle-card-reveal',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.vehicle-cards-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const handleView3D = (vehicle: Vehicle) => {
    setShowcaseVehicle(vehicle);
    setShowcaseType(vehicle.type);
    const el = document.getElementById('showcase-3d');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="vehicles" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyber-purple/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="reveal-up font-orbitron text-xs tracking-[0.4em] uppercase text-cyber-blue/60 mb-4">
            The Collection
          </p>
          <h2 className="reveal-up font-orbitron font-bold text-3xl md:text-5xl lg:text-6xl text-white">
            Select Your <span className="gradient-text">Machine</span>
          </h2>
          <p className="reveal-up mt-4 text-gray-400 font-poppins max-w-xl mx-auto">
            From quad-turbo W16 monsters to supercharged hypersports — explore
            the pinnacle of automotive engineering.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-full p-1 flex gap-1">
            {[
              { key: 'cars' as Tab, label: 'Hypercars' },
              { key: 'bikes' as Tab, label: 'Superbikes' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-orbitron font-semibold tracking-wide transition-all duration-300
                  ${
                    activeTab === tab.key
                      ? 'bg-cyber-blue/15 text-cyber-blue shadow-neon border border-cyber-blue/40'
                      : 'text-gray-400 hover:text-white border border-transparent'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="vehicle-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, i) => (
            <div key={vehicle.id} className="vehicle-card-reveal">
              <VehicleCard
                vehicle={vehicle}
                index={i}
                onView3D={handleView3D}
              />
            </div>
          ))}
        </div>

        {/* 3D Showcase */}
        <div id="showcase-3d" className="mt-24">
          <div className="text-center mb-8">
            <p className="font-orbitron text-xs tracking-[0.4em] uppercase text-cyber-blue/60 mb-3">
              Interactive 3D
            </p>
            <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-white">
              {showcaseVehicle
                ? `${showcaseVehicle.brand} ${showcaseVehicle.name}`
                : `Select a ${showcaseType === 'car' ? 'Hypercar' : 'Superbike'}`}
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Drag to rotate. Scroll to zoom. Auto-rotation enabled.
            </p>
          </div>

          {/* Mobile fallback message */}
          <div className="md:hidden text-center py-8 glass rounded-2xl neon-border">
            <p className="text-gray-400 text-sm">
              For the best 3D experience, view on a desktop device.
            </p>
          </div>

          {/* Desktop 3D Canvas */}
          <div className="hidden md:block">
            <ShowcaseCanvas type={showcaseType} />
          </div>
        </div>
      </div>
    </section>
  );
}