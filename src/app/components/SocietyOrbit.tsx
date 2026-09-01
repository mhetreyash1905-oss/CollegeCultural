'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface Society {
  _id?: string;
  name: string;
  tag: string;
  description: string;
  accentColor?: string;
}

interface SocietyOrbitProps {
  societies: Society[];
}

export default function SocietyOrbit({ societies }: SocietyOrbitProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fallback for placeholder testing
  const data = societies && societies.length > 0 ? societies : [
    { name: 'Placeholder Soc 1', tag: 'Tech', description: 'Description 1', accentColor: '#FF4D6D' },
    { name: 'Placeholder Soc 2', tag: 'Art', description: 'Description 2', accentColor: '#FFC93C' },
    { name: 'Placeholder Soc 3', tag: 'Dance', description: 'Description 3', accentColor: '#00B4A6' }
  ];

  const resetAutoplay = () => {
    if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
    if (!prefersReducedMotion && !isPaused) {
      autoAdvanceTimer.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % data.length);
      }, 4000);
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
    };
  }, [data.length, isPaused, prefersReducedMotion]);

  const handleManualClick = (index: number) => {
    setActiveIndex(index);
    resetAutoplay();
  };

  const activeSociety = data[activeIndex];

  // Orbit layout constants
  const ORBIT_SIZE = 600;
  const RADIUS = 250;
  const CENTER = ORBIT_SIZE / 2;

  return (
    <div 
      className="relative w-full overflow-hidden bg-[#0F0B1E] text-[#FFF8EC] py-16 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start min-h-[600px] relative">
        
        {/* ORBIT SPHERE SECTION */}
        <div className="relative w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] lg:absolute lg:-left-[200px] lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center shrink-0 mb-12 lg:mb-0 z-0">
          
          {/* Inner Glowing Sphere */}
          <div className="absolute w-24 h-24 lg:w-48 lg:h-48 bg-[#FF4D6D] rounded-full blur-[40px] opacity-30"></div>
          <div className="absolute w-16 h-16 lg:w-32 lg:h-32 bg-gradient-to-tr from-[#FF4D6D] to-[#7B2FF7] rounded-full shadow-[0_0_50px_#FF4D6D]"></div>

          {/* Wrapper for responsive scaling without messing up absolute trig coords */}
          <div className="absolute inset-0 origin-center scale-[0.5] lg:scale-100 flex items-center justify-center w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            
            {/* Rotating Dashed Ring */}
            <motion.svg
              width={ORBIT_SIZE}
              height={ORBIT_SIZE}
              className="absolute inset-0 pointer-events-none origin-center"
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <circle 
                cx={CENTER} 
                cy={CENTER} 
                r={RADIUS} 
                fill="none" 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth="2" 
                strokeDasharray="8 12" 
              />
            </motion.svg>

            {/* Orbit Nodes */}
            <div className="absolute inset-0 origin-center pointer-events-none">
              {data.map((soc, i) => {
                // Trigonometry positioning
                const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2; // start at top (-90deg)
                const x = CENTER + RADIUS * Math.cos(angle);
                const y = CENTER + RADIUS * Math.sin(angle);
                const isActive = i === activeIndex;

                return (
                  <button
                    key={i}
                    onClick={() => handleManualClick(i)}
                    aria-label={`Show ${soc.name}`}
                    className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full transition-all duration-300 pointer-events-auto focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F0B1E] ${
                      isActive 
                        ? 'bg-[#FF4D6D] scale-150 shadow-[0_0_20px_#FF4D6D]' 
                        : 'bg-[#FFF8EC]/30 hover:bg-[#FFF8EC]/60 hover:scale-110'
                    }`}
                    style={{ left: x, top: y }}
                  >
                    <span 
                      className={`absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap text-lg font-semibold transition-all duration-300 origin-left ${
                        isActive 
                          ? 'opacity-100 text-[#FF4D6D] scale-100' 
                          : 'opacity-0 text-[#FFF8EC] scale-75'
                      }`}
                    >
                      {soc.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTIVE CONTENT SECTION */}
        <div className="flex-1 lg:pl-[450px] flex flex-col justify-center text-center lg:text-left z-10 w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center lg:items-start"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold uppercase tracking-widest text-[#0F0B1E] bg-[#FF4D6D] rounded-full">
                {activeSociety.tag}
              </span>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#FFF8EC] mb-6">
                {activeSociety.name}
              </h2>
              <p className="text-[#FFF8EC]/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                {activeSociety.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PAGINATION DOTS */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex justify-center lg:justify-end gap-4 z-20 relative lg:pr-8">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManualClick(i)}
            aria-label={`Jump to society ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F0B1E] focus-visible:ring-[#FF4D6D] ${
              i === activeIndex 
                ? 'bg-[#FF4D6D] scale-125 shadow-[0_0_10px_#FF4D6D]' 
                : 'bg-[#FFF8EC]/20 hover:bg-[#FFF8EC]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
