'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  offset?: number;
}

export default function ParallaxImage({ src, alt, className = '', offset = 50 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {prefersReducedMotion ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover"
          // We need to make the image taller than the container to allow for the parallax movement
          // Scale it slightly so we don't see empty space at top/bottom
          initial={{ scale: 1.2 }}
        />
      )}
    </div>
  );
}
