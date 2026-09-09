import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events & Happenings | IIITA Cultural Council',
  description:
    'Explore upcoming cultural festivals, acoustic concerts, theatrical productions, dance battles, art exhibits, and our complete annual calendar at IIIT Allahabad.',
};

interface UpcomingEvent {
  id: string;
  name: string;
  society: string;
  date: string;
  time: string;
  venue: string;
  accentColor: string;
  tag: string;
  description: string;
  registrationOpen: boolean;
}

interface PastEvent {
  id: string;
  title: string;
  society: string;
  date: string;
  image: string;
  description: string;
}

interface CalendarMonth {
  month: string;
  academicTerm: string;
  events: {
    title: string;
    society: string;
    description: string;
  }[];
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'alankar-2026',
    name: 'Alankar — Annual Cultural Fest 2026',
    society: 'Cultural Council Flagship',
    date: 'October 15 – 17, 2026',
    time: '10:00 AM – 11:30 PM (Daily)',
    venue: 'Main Auditorium & Open Air Theatre (OAT)',
    accentColor: '#FF4D6D',
    tag: 'Flagship Fest',
    description:
      'The biggest three-day celebration of the year at IIIT Allahabad! Experience national battle of the bands, celebrity star nights, high-voltage dance competitions, street theatre showdowns, and massive art pavilions welcoming colleges from across the nation.',
    registrationOpen: true,
  },
  {
    id: 'sangeet-sandhya',
    name: 'Sangeet Sandhya: Twilight Acoustic Sessions',
    society: 'AMS (Music)',
    date: 'October 28, 2026',
    time: '6:30 PM – 9:30 PM',
    venue: 'Central Lawn Amphitheatre',
    accentColor: '#FFC93C',
    tag: 'Music & Acoustics',
    description:
      'An intimate twilight evening celebrating classical Indian ragas, contemporary indie acoustics, vocal jugalbandis, and open-mic jam sessions under the starlit campus sky.',
    registrationOpen: true,
  },
  {
    id: 'natya-utsav',
    name: 'Natya Utsav: Proscenium & Street Drama Gala',
    society: 'Virtousi & Rangtarangini',
    date: 'November 12, 2026',
    time: '5:00 PM – 8:30 PM',
    venue: 'Main Auditorium & Central Fountain',
    accentColor: '#7B2FF7',
    tag: 'Dramatics & Theatre',
    description:
      'A powerful double-bill theatrical showcase. Commencing with hard-hitting Nukkad Natak at the campus fountain circle, the performance moves inside the Main Auditorium for an intense, full-length stage drama production tackling contemporary social dilemmas.',
    registrationOpen: true,
  },
  {
    id: 'canvas-2026',
    name: 'Canvas 2026: Live Art & Sculpting Conclave',
    society: 'Nirmiti (Fine Arts)',
    date: 'November 25, 2026',
    time: '11:00 AM – 6:00 PM',
    venue: 'SAC Courtyard & Foyer',
    accentColor: '#00B4A6',
    tag: 'Fine Arts & Design',
    description:
      'A day-long open studio featuring live graffiti and spray painting, speed portrait sketching duels, clay modeling masterclasses, and an exhibition of more than 100 original student artworks and sustainable installations.',
    registrationOpen: true,
  },
  {
    id: 'kavyanjali-slam',
    name: 'Kavyanjali & National Slam Poetry Summit',
    society: 'Saraswa (Literature)',
    date: 'December 10, 2026',
    time: '4:00 PM – 7:30 PM',
    venue: 'CC3 Multi-Purpose Hall',
    accentColor: '#3B82F6',
    tag: 'Literature & Poetry',
    description:
      'An inspiring symposium uniting wordsmiths, poets, and passionate debaters. Features Hindi and English competitive slam poetry, bilingual debates on modern culture, and expressive dramatic readings.',
    registrationOpen: true,
  },
];

const pastEvents: PastEvent[] = [
  {
    id: 'past-1',
    title: 'Groove Inter-Collegiate Dance Battle',
    society: 'GeneticX',
    date: 'March 22, 2026',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    description:
      'Over 25 premier collegiate dance crews converged at the Main Auditorium for high-octane hip-hop cyphers, popping battles, and synchronized contemporary choreography before a roaring 1,500-strong audience.',
  },
  {
    id: 'past-2',
    title: 'Nukkad Express: Street Theatre Circuit',
    society: 'Rangtarangini',
    date: 'February 18, 2026',
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&q=80',
    description:
      'Staged across six prominent public hubs in Prayagraj and on campus, bringing poignant street plays on digital mindfulness and social unity to over 2,000 citizens and students.',
  },
  {
    id: 'past-3',
    title: 'Monochrome: Art & Sculpture Retrospective',
    society: 'Nirmiti',
    date: 'January 14, 2026',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    description:
      'A curated 3-day exhibition showcasing 120 student artworks spanning charcoal realism, watercolor landscapes, and upcycled scrap metal sculptures displayed in the Central Library foyer.',
  },
  {
    id: 'past-4',
    title: 'Rhapsody: Monsoon Open Jam',
    society: 'AMS',
    date: 'August 28, 2025',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    description:
      'An acoustic campfire and coffeehouse evening welcoming the incoming fresher batch with acoustic melodies, indie band covers, and impromptu instrumental jams.',
  },
];

const annualCalendar: CalendarMonth[] = [
  {
    month: 'August',
    academicTerm: 'Monsoon Semester Kickoff',
    events: [
      {
        title: 'Freshers Cultural Orientation & Talent Showcase',
        society: 'Cultural Council',
        description: 'Introductory gala welcoming freshers into the college cultural ecosystem.',
      },
      {
        title: 'Rhapsody Monsoon Jam',
        society: 'AMS',
        description: 'Open mic acoustic campfire night at the campus amphitheatre.',
      },
    ],
  },
  {
    month: 'September',
    academicTerm: 'Society Inductions',
    events: [
      {
        title: 'Council Society Auditions & Workshops',
        society: 'All Societies',
        description: 'Annual recruitment and foundational training camps across all 6 societies.',
      },
      {
        title: 'Nukkad Natak Street Circuit Prelims',
        society: 'Rangtarangini',
        description: 'Spontaneous street play performances at the campus fountain and hostels.',
      },
    ],
  },
  {
    month: 'October',
    academicTerm: 'Fest Season & Midterms',
    events: [
      {
        title: 'Alankar Cultural Fest (Flagship 3-Day Fest)',
        society: 'Cultural Council',
        description: 'National-level competitions, celebrity pro-nights, and cultural exhibitions.',
      },
      {
        title: 'Sangeet Sandhya Acoustic Gala',
        society: 'AMS',
        description: 'Classical, semi-classical, and western fusion twilight performances.',
      },
    ],
  },
  {
    month: 'November',
    academicTerm: 'Autumn Arts & Drama',
    events: [
      {
        title: 'Natya Utsav Annual Proscenium Play',
        society: 'Virtousi',
        description: 'Full-length theatrical production staged in the Main Auditorium.',
      },
      {
        title: 'Canvas Art Exhibition & Live Painting',
        society: 'Nirmiti',
        description: 'Multi-day student art gallery, speed sketching, and sculpture display.',
      },
    ],
  },
  {
    month: 'December',
    academicTerm: 'Winter Break & Literary Meets',
    events: [
      {
        title: 'Kavyanjali Poetry Slam & Lit Summit',
        society: 'Saraswa',
        description: 'Bilingual spoken word poetry, book talks, and parliamentary debates.',
      },
      {
        title: 'Winter Unplugged Jam',
        society: 'AMS',
        description: 'End-of-semester acoustic evening before the winter hiatus.',
      },
    ],
  },
  {
    month: 'January',
    academicTerm: 'Spring Semester Begins',
    events: [
      {
        title: 'Groove Dance Championship',
        society: 'GeneticX',
        description: 'High-energy inter-college dance battle and choreography showcase.',
      },
      {
        title: 'National Youth Parliament',
        society: 'Saraswa',
        description: 'Collegiate parliamentary debates and resolution drafting.',
      },
    ],
  },
  {
    month: 'February',
    academicTerm: 'Spring Cultural Season',
    events: [
      {
        title: 'Rang Barse Holi Cultural Evening',
        society: 'Cultural Council',
        description: 'Traditional folk performances, colors, music, and festive celebrations.',
      },
      {
        title: 'Prayagraj Heritage Art Walk',
        society: 'Nirmiti & Rangtarangini',
        description: 'Street performances and plein air sketching across historic city sites.',
      },
    ],
  },
  {
    month: 'March',
    academicTerm: 'Festival Grand Finale',
    events: [
      {
        title: 'Effervescence Annual Spring Extravaganza',
        society: 'All Societies',
        description: 'Grand three-day culmination fest featuring international acts and finals.',
      },
      {
        title: 'Battle of the Bands',
        society: 'AMS',
        description: 'Rock, metal, and fusion band championship from across India.',
      },
    ],
  },
  {
    month: 'April',
    academicTerm: 'Valedictory & Transition',
    events: [
      {
        title: 'Annual Cultural Awards Night',
        society: 'Cultural Council',
        description: 'Honoring outstanding performers, organizers, and graduating seniors.',
      },
      {
        title: 'Council Handover Ceremony',
        society: 'Executive Council',
        description: 'Induction of the new executive team and society heads for the upcoming year.',
      },
    ],
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-[#0F0B1E] dark:text-[#FFF8EC] border border-black/10 dark:border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-ping" />
            Campus Stage &amp; Spotlight
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#0F0B1E] dark:text-[#FFF8EC]">
            Events &amp; Happenings
          </h1>

          <p className="text-base sm:text-lg text-black/70 dark:text-white/70 font-sans leading-relaxed">
            From thunderous pro-nights and dramatic proscenium productions to acoustic jam circles, dance cyphers, and thought-provoking debates, discover the cultural heartbeat of IIIT Allahabad.
          </p>

          {/* Quick Navigation Jump Bar */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a
              href="#upcoming-events"
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all text-[#0F0B1E] dark:text-[#FFF8EC]"
            >
              Upcoming Events ({upcomingEvents.length})
            </a>
            <a
              href="#past-events"
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all text-[#0F0B1E] dark:text-[#FFF8EC]"
            >
              Past Highlights
            </a>
            <a
              href="#annual-calendar"
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all text-[#0F0B1E] dark:text-[#FFF8EC]"
            >
              Annual Calendar
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Upcoming Events */}
      <section id="upcoming-events" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-black/10 dark:border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF4D6D]">
              Mark Your Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mt-1">
              Upcoming Events
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 max-w-md">
            Registrations are open for students, faculty, and inter-collegiate participants. Secure your spot early.
          </p>
        </div>

        <div className="space-y-6">
          {upcomingEvents.map((evt) => (
            <article
              key={evt.id}
              className="rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 sm:p-8 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm relative overflow-hidden group"
            >
              {/* Subtle top indicator bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: evt.accentColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Event Primary Info */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
                      style={{
                        backgroundColor: `${evt.accentColor}20`,
                        color: evt.accentColor,
                        border: `1px solid ${evt.accentColor}40`,
                      }}
                    >
                      {evt.tag}
                    </span>
                    <span className="text-xs font-semibold text-black/50 dark:text-white/50">
                      Organized by {evt.society}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC] group-hover:text-[#FF4D6D] transition-colors">
                    {evt.name}
                  </h3>

                  <p className="text-sm sm:text-base text-black/75 dark:text-white/75 font-sans leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Metadata Chips: Date, Time, Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                      <svg className="w-4 h-4 text-[#FF4D6D] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{evt.date}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                      <svg className="w-4 h-4 text-[#FFC93C] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{evt.time}</span>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                      <svg className="w-4 h-4 text-[#00B4A6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Event Register / CTA Column */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between h-full gap-4 pt-4 lg:pt-0 lg:border-l lg:border-black/10 lg:dark:border-white/10 lg:pl-8">
                  <div className="text-left lg:text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Entry / Registration Free
                    </span>
                    <p className="text-xs text-black/50 dark:text-white/50 mt-1">
                      Open to all IIITA students &amp; visitors
                    </p>
                  </div>

                  <a
                    href="#register"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold bg-[#0F0B1E] text-[#FFF8EC] dark:bg-[#FFF8EC] dark:text-[#0F0B1E] hover:opacity-90 transition-all shadow-sm hover:scale-[1.02]"
                  >
                    <span>Register Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Past Events */}
      <section id="past-events" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-black/10 dark:border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00B4A6]">
              Memories &amp; Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mt-1">
              Past Events
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 max-w-md">
            Reliving the energy, passion, and artistic triumphs that illuminated our campus over the past sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEvents.map((past) => (
            <div
              key={past.id}
              className="rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 dark:bg-white/10">
                <Image
                  src={past.image}
                  alt={past.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {past.society}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#FF4D6D]">{past.date}</p>
                  <h3 className="text-lg font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC] leading-snug group-hover:text-[#FF4D6D] transition-colors">
                    {past.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-sans leading-relaxed line-clamp-4">
                    {past.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-black/50 dark:text-white/50">
                  <span>IIITA Cultural Archive</span>
                  <Link
                    href="/gallery"
                    className="font-medium hover:text-[#FF4D6D] transition-colors"
                  >
                    View Photos &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Annual Calendar */}
      <section id="annual-calendar" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-black/10 dark:border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B2FF7]">
              Academic Year Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mt-1">
              Annual Calendar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 max-w-md">
            A comprehensive month-by-month listing of major fests, orientations, competitions, and signature gatherings.
          </p>
        </div>

        {/* Text Listing of Key Events by Month */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annualCalendar.map((cal) => (
            <div
              key={cal.month}
              className="rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all"
            >
              <div>
                {/* Month Header */}
                <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-3 mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
                    {cal.month}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                    {cal.academicTerm}
                  </span>
                </div>

                {/* Events list for the month */}
                <div className="space-y-4">
                  {cal.events.map((evtItem, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold font-serif text-[#0F0B1E] dark:text-[#FFF8EC] leading-snug">
                          {evtItem.title}
                        </h4>
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70">
                          {evtItem.society}
                        </span>
                      </div>
                      <p className="text-xs text-black/70 dark:text-white/70 font-sans leading-relaxed">
                        {evtItem.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/5 text-[11px] text-black/40 dark:text-white/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D]" />
                Dates subject to council semester notifications
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Registration & Inquiry Notice */}
        <div id="register" className="mt-16 rounded-2xl sm:rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif font-bold text-[#0F0B1E] dark:text-[#FFF8EC]">
            Host or Propose an Event
          </h3>
          <p className="text-sm text-black/70 dark:text-white/70 max-w-lg mx-auto">
            Have an idea for an acoustic evening, photography walk, theatre workshop, or open mic? The Cultural Council supports student-driven creative initiatives.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#0F0B1E] text-[#FFF8EC] dark:bg-[#FFF8EC] dark:text-[#0F0B1E] hover:opacity-90 transition-opacity"
            >
              Submit Event Proposal
            </Link>
            <Link
              href="/societies"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-black/5 dark:bg-white/10 text-[#0F0B1E] dark:text-[#FFF8EC] border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
            >
              Explore Society Hubs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
