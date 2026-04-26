'use client';

import { useRef, useCallback, useState } from 'react';
import { Vehicle } from '@/data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  onView3D: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, index, onView3D }: VehicleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalized position (0 → 1)
    setMousePos({
      x: x / rect.width,
      y: y / rect.height,
    });

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    }
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* ── Animated border glow ── */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            conic-gradient(
              from ${mousePos.x * 360}deg at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              ${vehicle.color}88,
              transparent 40%,
              transparent 60%,
              ${vehicle.color}44
            )
          `,
          filter: 'blur(1px)',
        }}
      />

      {/* Static border when not hovered */}
      <div className="absolute -inset-[1px] rounded-2xl border border-white/[0.06] group-hover:border-transparent transition-colors duration-500" />

      {/* ── Card body ── */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0a0a14]/90 backdrop-blur-xl">
        {/* ── Image section ── */}
        <div className="relative h-56 overflow-hidden">
          {/* Image */}
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.name}`}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.12]"
            loading="lazy"
          />

          {/* Multi-layer overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/30 to-transparent" />

          {/* Hover color overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{ backgroundColor: vehicle.color }}
          />

          {/* Top line accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${vehicle.color}, transparent)`,
              opacity: isHovered ? 1 : 0.4,
            }}
          />

          {/* Type badge */}
          <span
            className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-orbitron font-semibold uppercase tracking-[0.2em] backdrop-blur-md border transition-all duration-300"
            style={{
              borderColor: `${vehicle.color}30`,
              color: vehicle.color,
              backgroundColor: `${vehicle.color}10`,
            }}
          >
            {vehicle.type === 'car' ? 'Hypercar' : 'Superbike'}
          </span>

          {/* Brand logo area */}
          <div className="absolute top-4 left-4">
            <span className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-white/40">
              {vehicle.brand}
            </span>
          </div>

          {/* Bottom: Name overlapping image */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3
              className="font-orbitron font-bold text-2xl text-white transition-all duration-300"
              style={{
                textShadow: isHovered
                  ? `0 0 20px ${vehicle.color}60, 0 0 40px ${vehicle.color}20`
                  : 'none',
              }}
            >
              {vehicle.name}
            </h3>
          </div>

          {/* Scan line on hover */}
          <div
            className="absolute left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              top: `${mousePos.y * 100}%`,
              background: `linear-gradient(90deg, transparent, ${vehicle.color}40, transparent)`,
            }}
          />
        </div>

        {/* ── Content section ── */}
        <div className="p-5 pt-3 space-y-4">
          {/* Description */}
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors duration-300">
            {vehicle.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                icon: '⚡',
                label: 'Top Speed',
                value: vehicle.topSpeed,
              },
              {
                icon: '🕐',
                label: '0-100',
                value: vehicle.acceleration,
              },
              {
                icon: '🔥',
                label: 'Power',
                value: vehicle.power,
              },
              {
                icon: '💎',
                label: 'Price',
                value: vehicle.price,
              },
            ].map((spec, i) => (
              <div
                key={spec.label}
                className="relative rounded-xl p-3 border border-white/[0.04] overflow-hidden group-hover:border-white/[0.08] transition-all duration-300"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${vehicle.color}08, transparent)`
                    : 'rgba(255,255,255,0.02)',
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                {/* Micro accent dot */}
                <div
                  className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: vehicle.color,
                    boxShadow: `0 0 6px ${vehicle.color}`,
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
                <p className="text-[9px] uppercase tracking-[0.15em] text-gray-600 flex items-center gap-1">
                  <span>{spec.icon}</span>
                  {spec.label}
                </p>
                <p
                  className="text-sm font-semibold text-white mt-1 font-orbitron"
                  style={{
                    color: isHovered ? vehicle.color : '#ffffff',
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onView3D(vehicle)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold font-orbitron tracking-wide transition-all duration-300 relative overflow-hidden group/btn"
              style={{
                border: `1px solid ${vehicle.color}40`,
                color: vehicle.color,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${vehicle.color}15`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${vehicle.color}30, 0 0 40px ${vehicle.color}10`;
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                View in 3D
              </span>
            </button>

            <button
              className="px-5 py-3 rounded-xl text-sm font-semibold border border-white/[0.08] text-gray-400 hover:bg-white/5 hover:border-white/[0.15] hover:text-white transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              Details
            </button>
          </div>
        </div>

        {/* ── Bottom accent bar ── */}
        <div className="relative h-[2px]">
          <div
            className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
            style={{
              background: `linear-gradient(90deg, ${vehicle.color}, ${vehicle.color}00)`,
            }}
          />
        </div>
      </div>

      {/* ── Card glow shadow (behind the card) ── */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${vehicle.color}15, transparent 70%)`,
        }}
      />
    </div>
  );
}