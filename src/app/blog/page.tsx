import Link from 'next/link';

export const metadata = {
  title: 'Stories & Insights | IIITA Cultural Council',
  description:
    'Chronicles, festival recaps, backstage moments, and creative milestones from the Cultural Council and the 6 societies of IIIT Allahabad.',
};

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  society: string;
  societyShort: string;
  excerpt: string;
  imageUrl: string;
  featured?: boolean;
}

const FEATURED_STORY: BlogPostItem = {
  id: 'featured-1',
  title: 'Echoes of Effervescence: How AMS & GeneticX Orchestrated the Grandest Pro-Night in Campus History',
  slug: 'echoes-of-effervescence-pro-night',
  date: 'September 2, 2026',
  readTime: '6 min read',
  category: 'Fest Recap',
  society: 'AMS & GeneticX',
  societyShort: 'Fest Collaboration',
  excerpt:
    'When the lights dimmed across the Main Arena and the opening synth chords resonated through three thousand spectators, a three-month journey of tireless preparation reached its peak. Behind the spectacle lay midnight jam sessions by AMS, grueling drill formations perfected by GeneticX dancers, and an unyielding commitment from student volunteers. This retrospective takes you backstage into the sweat, sonic engineering, and passion that turned an ambitious setlist into an unforgettable milestone.',
  imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  featured: true,
};

const BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    title: 'Acoustic Resonance: Inside AMS’s Experimental Indian-Western Fusion Ensemble',
    slug: 'ams-acoustic-fusion-ensemble',
    date: 'August 29, 2026',
    readTime: '4 min read',
    category: 'Music',
    society: 'Acoustic & Music Society (AMS)',
    societyShort: 'AMS',
    excerpt:
      'Discover how our music society AMS merged classic Raag Bhairavi with contemporary neo-soul chord voicings during their monsoon showcase, sparking a captivating new sonic wave across the campus amphitheatre.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    id: 'post-2',
    title: 'Gravity & Precision: How GeneticX Claimed Gold at the National Inter-College Dance Invitational',
    slug: 'geneticx-national-gold-triumph',
    date: 'August 22, 2026',
    readTime: '5 min read',
    category: 'Dance',
    society: 'GeneticX Dance Crew',
    societyShort: 'GeneticX',
    excerpt:
      'Twenty dancers, four tempo shifts, and three weeks of nocturnal rehearsals. The core team of GeneticX breaks down the choreography geometry and high-intensity synchronicity that earned them a standing ovation and first place.',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
  },
  {
    id: 'post-3',
    title: 'Canvases of Introspection: Nirmiti Transforms the Student SAC into an Immersive Art Gallery',
    slug: 'nirmiti-canvas-introspection-exhibition',
    date: 'August 15, 2026',
    readTime: '4 min read',
    category: 'Fine Arts',
    society: 'Nirmiti Fine Arts Society',
    societyShort: 'Nirmiti',
    excerpt:
      'From textured charcoal sketches to sprawling 12-foot acrylic installations, Nirmiti’s annual monsoon exhibit invited students to co-create live murals, celebrating diverse perspectives and emotional journeys through raw artistic mediums.',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
  },
  {
    id: 'post-4',
    title: 'Street Clamor to Stage Light: The Dual Soul of Rangtarangini & Virtousi Theatrics',
    slug: 'rangtarangini-virtousi-dual-theatrics',
    date: 'August 08, 2026',
    readTime: '5 min read',
    category: 'Theatre & Drama',
    society: 'Virtousi & Rangtarangini',
    societyShort: 'Virtousi & Rangtarangini',
    excerpt:
      'A candid double interview with the directors of Rangtarangini (street theatre) and Virtousi (stage drama) on tackling urgent social paradigms through rhythmic dholak beats in Nukkad Natak, balanced with nuanced proscenium dramaturgy.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
  },
  {
    id: 'post-5',
    title: 'Whispers Under the Banyan: Saraswa’s Midnight Slam Poetry and Literary Circle',
    slug: 'saraswa-midnight-slam-poetry',
    date: 'July 28, 2026',
    readTime: '3 min read',
    category: 'Literature',
    society: 'Saraswa Literary Society',
    societyShort: 'Saraswa',
    excerpt:
      'Under the ambient lantern glow of the campus banyan tree, Saraswa hosted its flagship midnight open-mic. Student writers gathered to share raw verses about identity, late-night code debugs, distant homes, and nostalgic nostalgia.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  },
  {
    id: 'post-6',
    title: 'The Unsung Backstage Engine: 150 Student Coordinators Powering Cultural Festivities',
    slug: 'backstage-engine-student-coordinators',
    date: 'July 14, 2026',
    readTime: '4 min read',
    category: 'Interviews & Culture',
    society: 'Cultural Council Core',
    societyShort: 'Council Core',
    excerpt:
      'Sound engineers calibrating line arrays at 4 AM, stage directors troubleshooting props, and PR liaisons greeting artists. Hear directly from the council logistics leads about how culture becomes leadership in action.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="py-12 md:py-16 border-b border-black/10 dark:border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 text-[#FF4D6D] text-xs font-semibold tracking-wide uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse"></span>
                The Cultural Chronicle
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F0B1E] dark:text-[#FFF8EC]">
                Stories &amp; Insights
              </h1>
              <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70 font-sans leading-relaxed">
                Step behind the curtains of IIITA’s artistic tapestry. Explore thoughtful features, society milestones, creative reflections, and festival highlights from AMS, Nirmiti, GeneticX, Virtousi, Rangtarangini, and Saraswa.
              </p>
            </div>

            {/* Quick stats / society pill row */}
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                6 Active Societies
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                Weekly Articles
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FFC93C]/10 text-[#FFC93C] border border-[#FFC93C]/20">
                Student Voices
              </span>
            </div>
          </div>
        </section>

        {/* FEATURED STORY SECTION */}
        <section className="py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
                Featured Story
              </h2>
              <p className="text-sm text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 mt-1">
                Handpicked highlight of the month
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF4D6D] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D]"></span>
              Editor’s Choice
            </span>
          </div>

          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image side */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[300px] lg:min-h-[380px] overflow-hidden group">
                <img
                  src={FEATURED_STORY.imageUrl}
                  alt={FEATURED_STORY.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#FF4D6D] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Featured
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                    {FEATURED_STORY.category}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 mb-3">
                    <span className="font-semibold text-[#FF4D6D]">
                      {FEATURED_STORY.societyShort}
                    </span>
                    <span>•</span>
                    <time dateTime={FEATURED_STORY.date}>{FEATURED_STORY.date}</time>
                    <span>•</span>
                    <span>{FEATURED_STORY.readTime}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-[#0F0B1E] dark:text-[#FFF8EC] mb-4 hover:text-[#FF4D6D] transition-colors">
                    {FEATURED_STORY.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#0F0B1E]/75 dark:text-[#FFF8EC]/75 leading-relaxed mb-6">
                    {FEATURED_STORY.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4D6D] to-[#FFC93C] flex items-center justify-center text-white text-xs font-bold">
                      CC
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-[#0F0B1E] dark:text-[#FFF8EC]">Editorial Desk</p>
                      <p className="text-[#0F0B1E]/50 dark:text-[#FFF8EC]/50">Cultural Council</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F0B1E] text-[#FFF8EC] dark:bg-[#FFF8EC] dark:text-[#0F0B1E] font-medium text-sm hover:bg-[#FF4D6D] dark:hover:bg-[#FF4D6D] dark:hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 BLOG POSTS GRID */}
        <section className="py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
                Recent Dispatches &amp; Chronicles
              </h2>
              <p className="text-sm text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 mt-1">
                Explorations across music, dance, art, drama, theatre, and literature
              </p>
            </div>
            <div className="text-xs font-medium text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60">
              Showing 6 of 6 articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#FF4D6D]/40 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-lg"
              >
                {/* Cover Image Container */}
                <div className="relative h-52 w-full overflow-hidden bg-black/10 dark:bg-white/10">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/60 text-white border border-white/10">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-medium backdrop-blur-md bg-black/70 text-white/90">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#0F0B1E]/50 dark:text-[#FFF8EC]/50 mb-2.5">
                      <span className="font-semibold text-[#00B4A6] dark:text-[#00B4A6]">
                        {post.societyShort}
                      </span>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC] group-hover:text-[#FF4D6D] transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>

                    <p className="font-sans text-sm text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 truncate max-w-[170px]">
                      {post.society}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D6D] group-hover:translate-x-1 transition-transform">
                      Read Story
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CALLOUT / EDITORIAL DESK SECTION */}
        <section className="my-12 p-8 sm:p-12 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#7B2FF7]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#FF4D6D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mb-3">
              Have a Story or Creative Review to Pitch?
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70 leading-relaxed mb-6">
              Whether you documented a street play performance, reviewed an inter-college music duel, or wrote poetry about campus life, the Cultural Council invites student contributors to submit their stories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[#FF4D6D] text-white font-medium text-sm hover:bg-[#FF4D6D]/90 transition-colors shadow-md shadow-[#FF4D6D]/20"
              >
                Submit an Article
              </Link>
              <Link
                href="/societies"
                className="px-6 py-3 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-black/10 dark:border-white/10 text-[#0F0B1E] dark:text-[#FFF8EC] font-medium text-sm transition-colors"
              >
                Meet the Societies
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
