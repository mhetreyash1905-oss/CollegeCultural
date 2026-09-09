'use client';

import { useReducedMotion } from 'framer-motion';
import GalleryParallaxImage from './GalleryParallaxImage';
import { useMemo } from 'react';

interface ImageItem {
  _id: string;
  imageUrl: string;
  caption: string;
}

interface DraggableFilmstripProps {
  images: ImageItem[];
}

const GalleryLane = ({ images, reverse = false, reducedMotion = false }: { images: ImageItem[], reverse?: boolean, reducedMotion?: boolean }) => {
  return (
    <div className="w-full overflow-hidden flex group py-2">
      <div 
        className={`flex gap-4 pr-4 shrink-0 ${reducedMotion ? '' : (reverse ? 'animate-marquee-reverse' : 'animate-marquee')} group-hover:[animation-play-state:paused]`}
      >
        {images.map((image, i) => (
          <div
            key={`${image._id}-${i}`}
            className="w-[200px] md:w-[300px] lg:w-[350px] h-[140px] md:h-[200px] lg:h-[230px] flex-shrink-0 relative rounded-xl overflow-hidden group/card shadow-md transition-transform duration-300 hover:scale-[1.03] hover:z-10 hover:shadow-xl"
          >
            <GalleryParallaxImage 
              src={image.imageUrl || '/placeholder.jpg'} 
              alt={image.caption || 'Gallery Image'}
            />
          </div>
        ))}
      </div>
      
      {/* Duplicate for infinite loop */}
      {!reducedMotion && (
        <div 
          className={`flex gap-4 pr-4 shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
          aria-hidden="true"
        >
          {images.map((image, i) => (
            <div
              key={`dup-${image._id}-${i}`}
              className="w-[200px] md:w-[300px] lg:w-[350px] h-[140px] md:h-[200px] lg:h-[230px] flex-shrink-0 relative rounded-xl overflow-hidden group/card shadow-md transition-transform duration-300 hover:scale-[1.03] hover:z-10 hover:shadow-xl"
            >
              <GalleryParallaxImage 
                src={image.imageUrl || '/placeholder.jpg'} 
                alt={image.caption || 'Gallery Image'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                <p className="text-[#FFF8EC] text-sm md:text-base font-serif font-medium leading-tight drop-shadow-md">
                  {image.caption || 'Cultural Event'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function DraggableFilmstrip({ images }: DraggableFilmstripProps) {
  const prefersReducedMotion = useReducedMotion();

  // Create 3 different arrays for the lanes so they don't look exactly identical vertically
  const lane1 = useMemo(() => [...images].sort(() => Math.random() - 0.5), [images]);
  const lane2 = useMemo(() => [...images].sort(() => Math.random() - 0.5), [images]);
  const lane3 = useMemo(() => [...images].sort(() => Math.random() - 0.5), [images]);

  return (
    <div className="w-full flex flex-col gap-2 py-8">
      <GalleryLane images={lane1} reducedMotion={!!prefersReducedMotion} />
      <GalleryLane images={lane2} reverse={true} reducedMotion={!!prefersReducedMotion} />
      <GalleryLane images={lane3} reducedMotion={!!prefersReducedMotion} />
    </div>
  );
}
