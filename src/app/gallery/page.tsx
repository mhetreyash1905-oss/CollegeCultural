'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';

type CategoryType = 'All' | 'Dance' | 'Music' | 'Art' | 'Theatre' | 'Fest';

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'Dance' | 'Music' | 'Art' | 'Theatre' | 'Fest';
  society: string;
  event: string;
  imageUrl: string;
  aspectRatioClass: string;
}

const CATEGORIES: CategoryType[] = ['All', 'Dance', 'Music', 'Art', 'Theatre', 'Fest'];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Urban Synchronization',
    caption: 'GeneticX crew executing high-octane hip-hop choreography during the inter-college dance battle.',
    category: 'Dance',
    society: 'GeneticX Dance Crew',
    event: 'Alankar Fest 2026',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    aspectRatioClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-2',
    title: 'Midnight Rhapsody',
    caption: 'Electric guitar solo reverberating through the open-air amphitheatre during the monsoon acoustic night.',
    category: 'Music',
    society: 'AMS (Music Society)',
    event: 'Sangeet Sandhya 2026',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    aspectRatioClass: 'aspect-square',
  },
  {
    id: 'gal-3',
    title: 'Pigments of Expression',
    caption: 'Live canvas blending and expressive acrylic palettes crafted during Nirmiti’s annual fine arts showcase.',
    category: 'Art',
    society: 'Nirmiti Fine Arts',
    event: 'Canvas Exhibition 2026',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    aspectRatioClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-4',
    title: 'Sea of Euphoria',
    caption: 'Over three thousand students igniting the main festival grounds during the headline celebrity pro-night.',
    category: 'Fest',
    society: 'Cultural Council',
    event: 'Effervescence 2026',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    aspectRatioClass: 'aspect-[16/11]',
  },
  {
    id: 'gal-5',
    title: 'Voice of the Streets',
    caption: 'Rangtarangini street play actors commanding the SAC circle with thunderous dafli beats and social satire.',
    category: 'Theatre',
    society: 'Rangtarangini Theatre',
    event: 'Natya Utsav 2026',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
    aspectRatioClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-6',
    title: 'Grace in Motion',
    caption: 'A breathtaking classical Kathak and contemporary fusion choreography performed by GeneticX soloists.',
    category: 'Dance',
    society: 'GeneticX Dance Crew',
    event: 'Spring Cultural Gala',
    imageUrl: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80',
    aspectRatioClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-7',
    title: 'Percussion Thunder',
    caption: 'Dynamic drum set solo setting the tempo for the AMS rock ensemble during the Battle of the Bands.',
    category: 'Music',
    society: 'AMS (Music Society)',
    event: 'Rocktaves 2026',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80',
    aspectRatioClass: 'aspect-square',
  },
  {
    id: 'gal-8',
    title: 'The Proscenium Soliloquy',
    caption: 'Intense stage spotlighting and dramatic tension during Virtousi’s annual award-winning one-act production.',
    category: 'Theatre',
    society: 'Virtousi Dramatics',
    event: 'Natya Utsav 2026',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
    aspectRatioClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-9',
    title: 'Kaleidoscopic Palettes',
    caption: 'Close-up of vibrant gouache mixtures and delicate brushwork at Nirmiti’s open-air studio gallery.',
    category: 'Art',
    society: 'Nirmiti Fine Arts',
    event: 'Kala Mela 2026',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    aspectRatioClass: 'aspect-square',
  },
  {
    id: 'gal-10',
    title: 'Illuminated Boulevard',
    caption: 'The central campus walkway illuminated with glowing lanterns and fest kiosks as crowds gather for night events.',
    category: 'Fest',
    society: 'Cultural Council',
    event: 'Effervescence 2026',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    aspectRatioClass: 'aspect-[16/11]',
  },
  {
    id: 'gal-11',
    title: 'Poetry in Mid-Air',
    caption: 'GeneticX dancers defying gravity in an expressive lyrical contemporary jump against stage backlighting.',
    category: 'Dance',
    society: 'GeneticX Dance Crew',
    event: 'Nritya Tarang 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80',
    aspectRatioClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-12',
    title: 'Strings at Twilight',
    caption: 'Acoustic violin and keyboard duet serenading students at the library lawns under the golden Allahabad dusk.',
    category: 'Music',
    society: 'AMS (Music Society)',
    event: 'Unplugged Circle',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80',
    aspectRatioClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-13',
    title: 'Pyrotechnic Crescendo',
    caption: 'Golden sparklers and celebratory confetti showering the main amphitheatre during the festival grand finale.',
    category: 'Fest',
    society: 'Cultural Council',
    event: 'Effervescence Finale',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    aspectRatioClass: 'aspect-square',
  },
  {
    id: 'gal-14',
    title: 'Silhouettes & Shadows',
    caption: 'Experimental mime and expressive silhouette drama enacted by Virtousi and Rangtarangini actors.',
    category: 'Theatre',
    society: 'Virtousi & Rangtarangini',
    event: 'Mime Ensemble',
    imageUrl: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&q=80',
    aspectRatioClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-15',
    title: 'Heritage Campus Mural',
    caption: 'Collaborative 40-foot wall mural painted by student artists from Nirmiti celebrating Indian cultural motifs.',
    category: 'Art',
    society: 'Nirmiti Fine Arts',
    event: 'Campus Wall Project',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    aspectRatioClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-16',
    title: 'Starlit Amphitheatre Jam',
    caption: 'Acoustic guitars, cajón beats, and hundreds of flashlight beams lighting up the midnight open-mic stage.',
    category: 'Fest',
    society: 'AMS & Cultural Council',
    event: 'Campfire Harmonies',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    aspectRatioClass: 'aspect-[16/11]',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;

      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    },
    [activeLightboxIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, activeLightboxIndex]);

  const currentLightboxItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="py-12 md:py-16 text-center max-w-4xl mx-auto border-b border-black/10 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 text-[#FF4D6D] text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF4D6D]"></span>
            Visual Archive &amp; Memories
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F0B1E] dark:text-[#FFF8EC]">
            Gallery
          </h1>

          <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70 font-sans leading-relaxed">
            A visual anthology celebrating the raw energy, stagecraft, harmonies, and expressive soul of IIITA’s cultural events, flagship societies, and annual festival milestones.
          </p>

          {/* Stat pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70">
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              16 Curated Frames
            </span>
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              6 Societies Represented
            </span>
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              Effervescence &amp; Flagship Nights
            </span>
          </div>
        </section>

        {/* CATEGORY FILTER BUTTONS */}
        <section className="py-8 md:py-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveLightboxIndex(null);
                }}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#FF4D6D] text-white shadow-md shadow-[#FF4D6D]/25 scale-105'
                    : 'bg-black/5 dark:bg-white/5 text-[#0F0B1E]/80 dark:text-[#FFF8EC]/80 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-black/10 dark:bg-white/10 text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </section>

        {/* MASONRY-STYLE GRID */}
        <section className="py-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className={`relative w-full ${item.aspectRatioClass} overflow-hidden bg-black/10 dark:bg-white/10`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Badges on top (visible normally, stays on hover) */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md bg-black/60 text-white border border-white/15">
                      {item.category}
                    </span>
                  </div>

                  {/* Caption Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-white z-20">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#FFC93C] mb-1">
                        <span>{item.society}</span>
                        <span>•</span>
                        <span>{item.event}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold leading-tight mb-1.5 text-white">
                        {item.title}
                      </h3>

                      <p className="font-sans text-xs text-white/80 line-clamp-3 leading-relaxed mb-3">
                        {item.caption}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[11px] text-white/70">
                        <span className="inline-flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Click to expand
                        </span>
                        <span className="text-[#FF4D6D] font-bold">View Full →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state if filtered out */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 text-lg">
                No gallery moments found in this category.
              </p>
            </div>
          )}
        </section>

        {/* LIGHTBOX MODAL */}
        {currentLightboxItem && activeLightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 transition-opacity animate-in fade-in duration-200"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Modal Dialog Container */}
            <div
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#0F0B1E] text-[#FFF8EC] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#FF4D6D] text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Image container */}
              <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
                <img
                  src={currentLightboxItem.imageUrl}
                  alt={currentLightboxItem.title}
                  className="w-full h-full max-h-[75vh] object-contain"
                />

                {/* Left navigation arrow */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLightboxIndex(
                      (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#FF4D6D] text-white transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right navigation arrow */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLightboxIndex(
                      (activeLightboxIndex + 1) % filteredItems.length
                    );
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#FF4D6D] text-white transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Information Side */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF4D6D] text-white">
                      {currentLightboxItem.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80">
                      {currentLightboxItem.society}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3 leading-snug">
                    {currentLightboxItem.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#FFC93C] font-semibold mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{currentLightboxItem.event}</span>
                  </div>

                  <p className="font-sans text-sm text-white/75 leading-relaxed">
                    {currentLightboxItem.caption}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>
                    Frame {activeLightboxIndex + 1} of {filteredItems.length}
                  </span>
                  <span className="hidden sm:inline">Use ← → keys to navigate</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
