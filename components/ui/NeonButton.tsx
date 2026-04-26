'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'purple';
  children: ReactNode;
}

const variants = {
  primary:
    'border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/15 hover:shadow-neon hover:border-cyber-blue',
  secondary:
    'border-gray-500/40 text-gray-300 hover:bg-white/5 hover:border-gray-400/60',
  purple:
    'border-cyber-purple/50 text-cyber-purple hover:bg-cyber-purple/15 hover:shadow-neon-purple hover:border-cyber-purple',
};

export default function NeonButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: NeonButtonProps) {
  return (
    <button
      className={`
        px-8 py-3 rounded-full font-semibold text-sm tracking-wide
        border backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}