'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface GalleryParallaxImageProps {
  src: string;
  alt: string;
}

export default function GalleryParallaxImage({ src, alt }: GalleryParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  if (prefersReducedMotion) {
    return <img src={src} alt={alt} className="w-full object-cover block" />;
  }

  return (
    <div ref={ref} className="overflow-hidden relative w-full h-full">
      {/* Invisible placeholder to give intrinsic height to the container based on the image's aspect ratio */}
      <img src={src} alt="" className="w-full object-cover invisible" />
      {/* Absolute motion image that scales up to allow panning without showing empty borders */}
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
      />
    </div>
  );
}
