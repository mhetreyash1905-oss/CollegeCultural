'use client';

import { useState, useRef, MouseEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SocietyCardProps {
  society: any;
  index: number;
}

export default function SocietyCard({ society, index }: SocietyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Stable random rotation based on index (-2deg to 2deg)
  // E.g., index 0 -> -1.5, index 1 -> 2.0, index 2 -> -0.5, etc.
  const baseRotation = ([( -1.5 ), 2.0, ( -0.5 ), 1.2, ( -2.0 ), 0.8][index % 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Max tilt ~6deg
    const multiplier = 6;
    const xTilt = (y / (rect.height / 2)) * -multiplier; // invert Y for natural feel
    const yTilt = (x / (rect.width / 2)) * multiplier;

    setTilt({ x: xTilt, y: yTilt });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setTilt({ x: 0, y: 0 });
  };

  // Vary tag treatment based on index
  const tagStyles = [
    { clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }, // slanted
    { clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }, // trapezoid
    { borderRadius: '8px 0 8px 0' }, // leaf
  ];
  const tagStyle = tagStyles[index % tagStyles.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full transform-gpu transition-all duration-200 ease-out"
      style={{
        perspective: '1000px',
        transform: prefersReducedMotion 
          ? 'none' 
          : `rotateZ(${baseRotation}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div 
        className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col h-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/10 transition-all duration-300"
      >
        <div className="relative h-56 w-full">
          <img 
            src={society.imageUrl || '/placeholder.jpg'} 
            alt={society.name}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-base via-indigo-base/40 to-transparent pointer-events-none" />
        </div>
        <div className="p-8 flex-1 flex flex-col pointer-events-none -mt-16 relative z-10">
          <div className="flex items-start mb-2">
            <span 
              className="px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-md rounded-full"
              style={{ 
                backgroundColor: `${society.accentColor || '#ffffff'}40`,
                border: `1px solid ${society.accentColor || '#ffffff'}60`
              }}
            >
              {society.tag || 'Society'}
            </span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mt-4">{society.name}</h3>
          <p className="text-white/60 text-sm mt-3 font-light leading-relaxed">{society.description}</p>
        </div>
      </div>
    </div>
  );
}
