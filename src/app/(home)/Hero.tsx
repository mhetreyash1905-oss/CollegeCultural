'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion, motion, useScroll, useTransform } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80'
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <motion.div style={{ y: prefersReducedMotion ? 0 : y1 }} className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt={`Hero background ${index + 1}`}
              className="w-full h-[120%] -top-[10%] absolute object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <span className="tracking-[0.3em] text-sm text-marigold uppercase font-sans mb-4">
          IIIT ALLAHABAD
        </span>
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-paper mb-6">
          Cultural Council
        </h1>
        <p className="text-xl md:text-2xl text-paper/80 mb-10 max-w-2xl">
          Where Creativity Meets Tradition
        </p>
        
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
