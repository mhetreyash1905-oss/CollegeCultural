import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Societies | IIITA Cultural Council',
  description:
    'Explore the six vibrant cultural societies of IIIT Allahabad — AMS, Nirmiti, GeneticX, Virtousi, Rangtarangini, and Saraswa.',
};

interface SocietyDetail {
  id: string;
  name: string;
  fullName: string;
  tag: string;
  accentColor: string;
  accentBorder: string;
  badgeBg: string;
  image: string;
  imageAlt: string;
  quote: string;
  paragraphs: string[];
  keyHighlights: string[];
}

const societies: SocietyDetail[] = [
  {
    id: 'ams',
    name: 'AMS',
    fullName: 'Acoustics and Media Society',
    tag: 'Acoustics & Media',
    accentColor: '#FFC93C',
    accentBorder: 'border-[#FFC93C]',
    badgeBg: 'bg-[#FFC93C]/15 text-[#FFC93C] border-[#FFC93C]/30',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    imageAlt: 'Acoustics and Media',
    quote: 'Capturing moments and managing the technical pulse of the campus.',
    paragraphs: [
      'The Acoustics and Media Society (AMS) serves as the technical and media backbone of IIIT Allahabad. We handle professional photography, cinematic videography, and full auditorium console management for all major campus events.',
      'Our team is responsible for ensuring perfect sound design, lighting control, and multimedia coverage, capturing the essence of every cultural, technical, and academic festival.',
    ],
    keyHighlights: ['Photography', 'Videography', 'Auditorium Console', 'Sound Design'],
  },
  {
    id: 'nirmiti',
    name: 'Nirmiti',
    fullName: 'Fine Arts Society',
    tag: 'Fine Arts',
    accentColor: '#00B4A6',
    accentBorder: 'border-[#00B4A6]',
    badgeBg: 'bg-[#00B4A6]/15 text-[#00B4A6] border-[#00B4A6]/30',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    imageAlt: 'Artists oil paints, brushes, canvas, and creative fine arts workspace',
    quote: 'Transforming blank canvases into timeless visual poetry.',
    paragraphs: [
      'Nirmiti is the premier fine arts and visual craftsmanship society at IIIT Allahabad. Uniting sketch artists, painters, calligraphers, digital illustrators, and sculptors, Nirmiti breathes visual color, elegance, and thought-provoking imagery into every corridor of the campus.',
      'The society organizes comprehensive studio workshops spanning charcoal sketching, acrylic on canvas, watercolor blending, clay modeling, origami, and sustainable art from reclaimed materials. Nirmiti is also the creative powerhouse responsible for designing towering sculptural installations, majestic stage backdrops, and sprawling festival decor that transform the campus into a wonderland.',
    ],
    keyHighlights: ['Canvas Annual Art Exhibition', 'Live Spray & Speed Sketching', 'Campus Installation Sculptures', 'Handmade Festival Sets'],
  },
  {
    id: 'geneticx',
    name: 'GeneticX',
    fullName: 'The Official Dance Society',
    tag: 'Dance',
    accentColor: '#FF4D6D',
    accentBorder: 'border-[#FF4D6D]',
    badgeBg: 'bg-[#FF4D6D]/15 text-[#FF4D6D] border-[#FF4D6D]/30',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80',
    imageAlt: 'Dancer performing dramatic choreography with expressive movement on stage',
    quote: 'Defying gravity through synchronized passion and pulse.',
    paragraphs: [
      'GeneticX is the electrifying dance troupe of IIITA, acclaimed for heart-pounding energy, razor-sharp synchronization, and dynamic storytelling through movement. The crew embraces diverse forms including urban hip-hop, breaking, popping, lyrical contemporary, and high-tempo Indian folk-fusion.',
      'Training is rigorous and inclusive. GeneticX holds open-floor dance workshops, conditioning sessions, and weekly freestyle cyphers where freshers and senior dancers alike master isolations, rhythm dynamics, and stage confidence. The society fosters an environment of fearless experimentation where novel styles cross-pollinate.',
      'The crew takes center stage during flagship dance showdowns including "Groove" and national street dance battles. GeneticX has earned widespread recognition at cultural festivals nationwide, winning standing ovations and trophies for jaw-dropping choreographies, aerial stunts, and thematic storytelling.',
    ],
    keyHighlights: ['Groove Dance Battle', 'Hip-Hop & Contemporary Cyphers', 'Annual Freshers Dance Bootcamp', 'National Choreography Trophies'],
  },
  {
    id: 'rangtarangini',
    name: 'Rangtarangini',
    fullName: 'Drama Society',
    tag: 'Drama',
    accentColor: '#F97316',
    accentBorder: 'border-[#F97316]',
    badgeBg: 'bg-[#F97316]/15 text-[#F97316] border-[#F97316]/30',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
    imageAlt: 'Theatrical actors performing under spotlight on an auditorium stage',
    quote: 'Breathing life into characters, scripts, and silent truths.',
    paragraphs: [
      'Rangtarangini is the dramatics society of IIIT Allahabad, capturing emotions through stage plays, street plays (nukkad natak), and acting.',
      'We bring socially conscious art directly to public courtyards and campus squares, while also delving into the sublime craft of proscenium theatre, method acting, and compelling cinematic narratives.',
    ],
    keyHighlights: ['Natya Utsav Annual Play', 'Nukkad Natak', 'Mono-Act Showcases'],
  },
  {
    id: 'virtousi',
    name: 'Virtousi',
    fullName: 'Music Society',
    tag: 'Music',
    accentColor: '#7B2FF7',
    accentBorder: 'border-[#7B2FF7]',
    badgeBg: 'bg-[#7B2FF7]/15 text-[#7B2FF7] border-[#7B2FF7]/30',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    imageAlt: 'Live music band performance',
    quote: 'Where melodies breathe life into campus rhythms.',
    paragraphs: [
      'Virtousi is the official music society of IIIT Allahabad that harmonizes the campus with instrumental, classical, and modern music performances.',
      'Comprising gifted vocalists, multi-instrumentalists, and composers, Virtousi traverses genres ranging from Indian classical and semi-classical ragas to progressive rock, blues, jazz, and contemporary acoustic pop.',
    ],
    keyHighlights: ['Sangeet Sandhya', 'Acoustic Jam Rooms', 'Battle of the Bands Winners'],
  },
  {
    id: 'saraswa',
    name: 'Saraswa',
    fullName: 'Literary & Debating Society',
    tag: 'Literature',
    accentColor: '#3B82F6',
    accentBorder: 'border-[#3B82F6]',
    badgeBg: 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80',
    imageAlt: 'Vintage literature books, fountain pen, and classic writing desk',
    quote: 'Where words become worlds and discourse shapes tomorrow.',
    paragraphs: [
      'Saraswa is the literary, poetic, and debating sanctuary of IIIT Allahabad. Fostering both Hindi and English traditions, Saraswa brings together philosophers, debaters, creative writers, poets, and avid bibliophiles to champion intellectual depth, nuanced rhetoric, and the beauty of the written word.',
      'The society organizes weekly parliamentary debates, Model United Nations simulations, flash fiction challenges, and open poetry circles (Kavyanjali). Through rigorous workshops on argumentation frameworks, rhetoric, persuasive delivery, and creative prose, Saraswa equips members to articulate complex ideas with conviction and poise.',
      'Saraswa spearheads the annual "Lit Fest" and National Youth Parliamentary Debate, hosting eminent authors, poets, and seasoned debaters. Society delegates consistently place in the finals of prestigious national debating championships and contribute poetry and short fiction to celebrated literary journals.',
    ],
    keyHighlights: ['Lit Fest & Youth Parliament', 'Kavyanjali Poetry Slam', 'Parliamentary Debate Circuit', 'Campus Literary Anthologies'],
  },
];

export default function SocietiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      {/* Hero Banner Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-[#0F0B1E] dark:text-[#FFF8EC] border border-black/10 dark:border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
            Vibrant Creative Ecosystem
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#0F0B1E] dark:text-[#FFF8EC]">
            Our Societies
          </h1>

          <p className="text-base sm:text-lg text-black/70 dark:text-white/70 font-sans leading-relaxed">
            The six pillars of the IIITA Cultural Council celebrate artistic excellence, technical synergy, and boundless imagination. Discover where passion meets purpose across music, fine arts, dance, stage drama, street theatre, and literature.
          </p>

          {/* Jump Links Pill Bar */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-4">
            {societies.map((soc) => (
              <a
                key={soc.id}
                href={`#${soc.id}`}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all text-[#0F0B1E] dark:text-[#FFF8EC] hover:scale-105"
              >
                {soc.name} <span className="text-black/50 dark:text-white/50">({soc.tag})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Societies Detailed Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {societies.map((soc, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article
              key={soc.id}
              id={soc.id}
              className={`scroll-mt-32 rounded-2xl sm:rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative border-l-4 sm:border-l-[6px] ${soc.accentBorder}`}
            >
              {/* Subtle top background decorative glow */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ backgroundColor: soc.accentColor }}
              />

              <div className="p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Image Column (Alternating: Even = left on lg, Odd = right on lg) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 aspect-[4/3] w-full shadow-inner bg-black/10 dark:bg-white/10">
                      <Image
                        src={soc.image}
                        alt={soc.imageAlt}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 pointer-events-none" />

                      {/* Tag pill on top of image */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${soc.badgeBg}`}
                        >
                          {soc.tag}
                        </span>
                      </div>

                      {/* Quote overlay on bottom of image */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 text-white pointer-events-none">
                        <p className="text-xs sm:text-sm italic font-serif opacity-90 drop-shadow-sm">
                          &ldquo;{soc.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Text Column (Alternating: Even = right on lg, Odd = left on lg) */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Header with name and badge */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: soc.accentColor }}
                        />
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-black/60 dark:text-white/60">
                          {soc.fullName}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
                        {soc.name}
                      </h2>
                    </div>

                    {/* Detailed Paragraphs */}
                    <div className="space-y-4 text-sm sm:text-base text-black/80 dark:text-white/80 font-sans leading-relaxed">
                      {soc.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Key Highlights Chips */}
                    <div className="pt-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
                        Signature Highlights & Activities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {soc.keyHighlights.map((highlight, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#0F0B1E] dark:text-[#FFF8EC]"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: soc.accentColor }}
                            />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Explore Button */}
                    <div className="pt-6">
                      <Link
                        href={`/societies/${soc.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-transform hover:scale-105 shadow-md"
                        style={{ backgroundColor: soc.accentColor }}
                      >
                        <span>Explore {soc.name}</span>
                        <svg
                          className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Bottom Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-20">
        <div className="rounded-2xl sm:rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
            Ready to Find Your Creative Calling?
          </h3>
          <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-xl mx-auto">
            Society inductions open at the beginning of each semester. Whether you are an experienced performer or eager to pick up your first instrument, brush, or script, there is a stage for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-[#0F0B1E] text-[#FFF8EC] dark:bg-[#FFF8EC] dark:text-[#0F0B1E] hover:opacity-90 transition-opacity shadow-sm"
            >
              Check Upcoming Events
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-black/5 dark:bg-white/10 text-[#0F0B1E] dark:text-[#FFF8EC] border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
            >
              Contact Society Heads
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
