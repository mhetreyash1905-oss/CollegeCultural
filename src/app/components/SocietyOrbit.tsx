'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

export interface Society {
  _id?: string;
  name: string;
  tag: string;
  description: string;
  accentColor?: string;
}

interface SocietyOrbitProps {
  societies?: Society[];
}

const mandalaSocieties = [
  { name: 'AMS', tag: 'Acoustics & Music', description: 'The heartbeat of campus culture — AMS brings together vocalists, instrumentalists, and beatboxers to create music that resonates across every fest and open mic night.', accentColor: '#FF4D6D' },
  { name: 'Nirmiti', tag: 'Fine Arts', description: 'From murals that transform bare walls into stories, to sketches captured in seconds — Nirmiti is where raw creativity meets disciplined craft.', accentColor: '#FFC93C' },
  { name: 'GeneticX', tag: 'Dance', description: 'Whether it\'s hip-hop, contemporary, classical or freestyle, GeneticX owns the stage with choreography that pushes boundaries and sets the energy on fire.', accentColor: '#00B4A6' },
  { name: 'Virtousi', tag: 'Dramatics', description: 'Street plays under the open sky, nuanced monologues on stage — Virtousi channels the power of theatre to provoke thought and stir emotion.', accentColor: '#7B2FF7' },
  { name: 'Rangtarangini', tag: 'Theatre', description: 'Celebrating the rich tradition of Indian theatre — from folk forms to experimental productions, Rangtarangini keeps the art of storytelling alive.', accentColor: '#FF4D6D' },
  { name: 'Saraswa', tag: 'Literature', description: 'Poetry slams, open mics, storytelling circles, and literary debates — Saraswa is the voice of expression on campus, one word at a time.', accentColor: '#FFC93C' }
];

/* SVG Mandala — custom procedural design */
function MandalaSVG() {
  const petalColors = ['#FF4D6D', '#FFC93C', '#00B4A6', '#7B2FF7', '#FF4D6D', '#FFC93C'];
  const layers = 3;
  const petalsPerLayer = [6, 12, 18];
  const radii = [60, 110, 160];

  return (
    <svg viewBox="-200 -200 400 400" className="w-full h-full drop-shadow-2xl">
      <defs>
        <radialGradient id="mandala-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#FF4D6D" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer decorative ring */}
      <circle cx="0" cy="0" r="190" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-black/20 dark:text-white/20" />
      <circle cx="0" cy="0" r="185" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-black/10 dark:text-white/10" />

      {/* Petal layers — outermost first */}
      {[2, 1, 0].map((layerIdx) => {
        const count = petalsPerLayer[layerIdx];
        const r = radii[layerIdx];
        const petalLength = layerIdx === 0 ? 35 : layerIdx === 1 ? 30 : 25;
        const petalWidth = layerIdx === 0 ? 18 : layerIdx === 1 ? 14 : 10;

        return Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * 360;
          const color = petalColors[i % petalColors.length];
          const opacity = layerIdx === 2 ? 0.7 : layerIdx === 1 ? 0.8 : 0.9;

          return (
            <g key={`${layerIdx}-${i}`} transform={`rotate(${angle})`}>
              <ellipse
                cx="0"
                cy={-r}
                rx={petalWidth}
                ry={petalLength}
                fill={color}
                opacity={opacity}
                stroke={color}
                strokeWidth="0.5"
                className="transition-all duration-500"
              />
              {/* Inner highlight */}
              <ellipse
                cx="0"
                cy={-r}
                rx={petalWidth * 0.5}
                ry={petalLength * 0.6}
                fill="white"
                opacity={0.25}
              />
            </g>
          );
        });
      })}

      {/* Inner decorative circles */}
      <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/15 dark:text-white/15" />
      <circle cx="0" cy="0" r="30" fill="url(#mandala-center)" filter="url(#glow)" />
      <circle cx="0" cy="0" r="15" fill="white" opacity="0.4" />

      {/* Small dots between layers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const x = 85 * Math.cos(angle);
        const y = 85 * Math.sin(angle);
        return <circle key={`dot-${i}`} cx={x} cy={y} r="2.5" fill="currentColor" className="text-black/20 dark:text-white/30" />;
      })}
    </svg>
  );
}

export default function SocietyOrbit({ societies }: SocietyOrbitProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const data = mandalaSocieties;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (data.length <= 1) return;
    const newIndex = Math.round(latest * (data.length - 1));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, -360 * ((data.length - 1) / data.length)]);
  const counterRotation = useTransform(wheelRotation, (r: number) => -r);

  const handleManualClick = (index: number) => {
    if (!containerRef.current || data.length <= 1) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = containerRef.current.getBoundingClientRect().top + scrollTop;
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + (scrollableHeight * (index / (data.length - 1)));
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const activeSociety = data[activeIndex];
  const ORBIT_SIZE = 600;
  const RADIUS = 260;
  const CENTER = ORBIT_SIZE / 2;

  return (
    <div
      ref={containerRef}
      style={{ height: `${data.length * 100}vh` }}
      className="relative w-full bg-[#FFF8EC] dark:bg-[#0F0B1E] transition-colors duration-300"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-center min-h-[600px] relative w-full">

          {/* MANDALA + ORBIT */}
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[580px] lg:h-[580px] flex items-center justify-center shrink-0 mt-8 mb-4 lg:mb-0 z-0">

            {/* Ambient glow */}
            <div className="absolute w-32 h-32 lg:w-72 lg:h-72 rounded-full blur-[60px] lg:blur-[80px] opacity-30 dark:opacity-50 bg-gradient-to-tr from-[#FF4D6D] to-[#7B2FF7] transition-opacity duration-300" />

            {/* Rotating wrapper */}
            <motion.div
              className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[580px] lg:h-[580px] origin-center"
              style={{ rotate: prefersReducedMotion ? 0 : wheelRotation }}
            >
              {/* Mandala at center */}
              <div className="absolute inset-[15%] text-[#0F0B1E] dark:text-[#FFF8EC]">
                <MandalaSVG />
              </div>

              {/* Orbit ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`}>
                <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 10" className="text-black/15 dark:text-white/15" />
              </svg>

              {/* Orb nodes */}
              {data.map((soc, i) => {
                const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
                const pctX = ((CENTER + RADIUS * Math.cos(angle)) / ORBIT_SIZE * 100).toFixed(4);
                const pctY = ((CENTER + RADIUS * Math.sin(angle)) / ORBIT_SIZE * 100).toFixed(4);
                const isActive = i === activeIndex;

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleManualClick(i)}
                    aria-label={`Show ${soc.name}`}
                    style={{
                      left: `${pctX}%`,
                      top: `${pctY}%`,
                      rotate: prefersReducedMotion ? 0 : counterRotation,
                      backgroundColor: isActive ? soc.accentColor : undefined,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 pointer-events-auto z-10 flex items-center justify-center px-4 py-2
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-2
                      ${isActive
                        ? 'scale-110 shadow-[0_0_25px_var(--tw-shadow-color)]'
                        : 'bg-white dark:bg-white/90 shadow-lg hover:scale-105 border-2 border-black/10 dark:border-white/20'
                      }`}
                    // @ts-ignore
                    style-tw-shadow-color={isActive ? soc.accentColor : undefined}
                  >
                    <span className={`text-[10px] lg:text-xs font-bold tracking-tight whitespace-nowrap ${isActive ? 'text-white' : 'text-[#0F0B1E]'}`}>
                      {soc.name}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* ACTIVE CONTENT */}
          <div className="flex-1 lg:pl-16 flex flex-col justify-center text-center lg:text-left z-10 w-full mb-8 lg:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center lg:items-start"
              >
                <span
                  className="inline-block px-3 py-1 mb-3 lg:px-4 lg:py-1.5 lg:mb-5 text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-white rounded-full shadow-md"
                  style={{ backgroundColor: activeSociety.accentColor }}
                >
                  {activeSociety.tag}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mb-3 lg:mb-5 transition-colors duration-300">
                  {activeSociety.name}
                </h2>
                <p className="text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 text-sm sm:text-lg md:text-xl max-w-xl font-light leading-relaxed transition-colors duration-300 px-4 sm:px-0">
                  {activeSociety.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {data.map((soc, i) => (
            <button
              key={i}
              onClick={() => handleManualClick(i)}
              aria-label={`Go to ${soc.name}`}
              className="w-3 h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D]"
              style={{
                backgroundColor: i === activeIndex ? soc.accentColor : undefined,
                transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
                boxShadow: i === activeIndex ? `0 0 12px ${soc.accentColor}` : 'none',
              }}
            >
              {i !== activeIndex && (
                <span className="block w-full h-full rounded-full bg-black/20 dark:bg-white/25" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
