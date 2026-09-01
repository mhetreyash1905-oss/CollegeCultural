'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GalleryParallaxImage from './GalleryParallaxImage';

interface ImageItem {
  _id: string;
  imageUrl: string;
  caption: string;
}

interface DraggableFilmstripProps {
  images: ImageItem[];
}

export default function DraggableFilmstrip({ images }: DraggableFilmstripProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (carouselRef.current) {
      // Calculate max drag constraints: full scrollable width minus visible viewport width
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    // Recalculate on resize
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <div className="w-full overflow-hidden py-12" ref={carouselRef}>
      <motion.div
        drag={prefersReducedMotion ? false : "x"}
        dragConstraints={{ right: 0, left: -width }}
        dragElastic={0.1}
        className={`flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing w-max px-4 md:px-8 ${prefersReducedMotion ? 'overflow-x-auto snap-x' : ''}`}
      >
        {images.map((image) => (
          <motion.div
            key={image._id}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-[280px] md:w-[400px] h-[350px] md:h-[500px] flex-shrink-0 relative rounded-2xl overflow-hidden group shadow-lg"
            data-lightbox
            data-src={image.imageUrl}
            style={{ snapAlign: prefersReducedMotion ? 'center' : 'none' }}
          >
            <GalleryParallaxImage 
              src={image.imageUrl || '/placeholder.jpg'} 
              alt={image.caption || 'Gallery Image'}
            />
            {/* Caption overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
              <p className="text-paper text-lg font-serif font-semibold">
                {image.caption || 'Cultural Event Image'}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
