'use client';

import { useState } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const images = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&q=80',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c090be5f524?w=1600&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86ce7?w=1600&q=80',
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const titleWords = ["Cultural", "Council"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-indigo-base group">
      
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Hero slide ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            className="w-full h-[120%] -top-[10%] absolute object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-base/40 via-indigo-base/60 to-indigo-base z-0" />

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4 md:px-12 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 pointer-events-auto focus-visible:opacity-100"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={nextSlide}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 pointer-events-auto focus-visible:opacity-100"
          aria-label="Next image"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-[#FF4D6D] scale-125' : 'bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="tracking-[0.3em] text-sm text-paper/80 uppercase font-sans mb-4"
        >
          IIIT ALLAHABAD
        </motion.span>
        
        <motion.h1 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-paper mb-6 flex flex-wrap justify-center gap-x-4"
        >
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={prefersReducedMotion ? {} : wordVariants} className="inline-block pointer-events-auto">
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-paper/70 mb-10 max-w-2xl font-light"
        >
          Where Creativity Meets Tradition
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pointer-events-auto">
          <Link
            href="/societies"
            className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-paper hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-lg font-medium"
          >
            Explore Societies
          </Link>
          <Link
            href="/events"
            className="px-8 py-3 rounded-full bg-transparent border border-white/20 text-paper hover:bg-white/10 transition-all duration-300 text-lg font-medium"
          >
            Upcoming Events
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <Link href="#fest" className="text-paper/50 hover:text-paper transition-colors flex flex-col items-center" aria-label="Scroll down">
          <svg 
            className={`w-8 h-8 ${prefersReducedMotion ? '' : 'animate-bounce'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
