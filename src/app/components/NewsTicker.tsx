'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function NewsTicker() {
  const prefersReducedMotion = useReducedMotion();
  const announcements = [
    "🎉 Rangotsav 2026 dates announced! Registrations open next week.",
    "🏆 Nritya wins 1st place at Inter-IIIT Dance Competition.",
    "📸 Pixel photography workshop this weekend at CC3.",
    "🎭 Auditions for the new semester play start tomorrow.",
  ];

  // Repeat to ensure seamless scrolling
  const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-coral text-paper py-2 overflow-hidden flex whitespace-nowrap absolute top-20 left-0 w-full z-40 border-y border-paper/20">
      {prefersReducedMotion ? (
        <div className="flex px-4 gap-8 overflow-x-auto text-sm font-semibold tracking-wider w-full">
          {announcements.map((text, i) => (
            <span key={i} className="shrink-0">{text}</span>
          ))}
        </div>
      ) : (
        <motion.div
          animate={{ x: [0, -1035] }} // Arbitrary pixel value, adjusted by css repeat
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
          className="flex gap-16 px-8 text-sm font-semibold tracking-wider shrink-0"
          style={{ width: 'fit-content' }}
        >
          {duplicatedAnnouncements.map((text, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>{text}</span>
              <span className="text-white/50">•</span>
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
