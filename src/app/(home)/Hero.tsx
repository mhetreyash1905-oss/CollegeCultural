'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion, motion, useScroll, useTransform } from 'framer-motion';

const media = [
  {
    type: 'video',
    src: 'https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Crowd_Pt_5_preview.mp4',
    poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80'
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  const titleText = "Cultural Council";
  const titleWords = titleText.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-indigo-base">
      {/* SVG Noise Texture Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Background Media */}
      <motion.div style={{ y: prefersReducedMotion ? 0 : y1 }} className="absolute inset-0 z-0">
        {media.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[120%] -top-[10%] absolute object-cover"
              />
            ) : (
              <img
                src={item.src}
                alt={`Hero background ${index + 1}`}
                className="w-full h-[120%] -top-[10%] absolute object-cover"
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="tracking-[0.3em] text-sm text-marigold uppercase font-sans mb-4 drop-shadow-md"
        >
          IIIT ALLAHABAD
        </motion.span>
        
        <motion.h1 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-6xl md:text-8xl font-bold text-paper mb-6 flex flex-wrap justify-center gap-x-4 drop-shadow-lg"
        >
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={prefersReducedMotion ? {} : wordVariants} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-paper/90 mb-10 max-w-2xl drop-shadow-md"
        >
          Where Creativity Meets Tradition
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#societies"
            className="bg-coral hover:bg-coral/90 text-paper rounded-full px-8 py-3 transition-colors text-lg font-medium inline-block w-full sm:w-auto"
          >
            Explore Societies
          </a>
          <a
            href="#events"
            className="border-2 border-marigold text-marigold hover:bg-marigold hover:text-indigo-base rounded-full px-8 py-3 transition-colors text-lg font-medium inline-block w-full sm:w-auto"
          >
            Upcoming Events
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#societies" className="text-paper/70 hover:text-paper transition-colors flex flex-col items-center" aria-label="Scroll down">
          <svg 
            className={`w-8 h-8 ${prefersReducedMotion ? '' : 'animate-bounce'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
