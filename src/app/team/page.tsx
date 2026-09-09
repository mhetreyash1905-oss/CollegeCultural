import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team | IIITA Cultural Council',
  description:
    'Meet the faculty advisor, council heads, society leads, and core committee members leading the artistic and cultural pulse at IIIT Allahabad.',
};

interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  bio?: string;
  society?: string;
  societyTag?: string;
  email?: string;
  linkedin?: string;
  department?: string;
  year?: string;
}

const facultyAdvisor: TeamMember = {
  name: 'Prof. S. K. Singh',
  role: 'Faculty In-Charge & Advisor',
  department: 'Department of Information Technology',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  bio: 'Prof. S. K. Singh has been mentoring and guiding the Cultural Council for over six years. Passionate about holistic student growth, he ensures that the vibrant cultural traditions of IIITA continue to thrive alongside rigorous technical pursuits. He actively oversees the annual cultural festival and provides strategic mentorship to all 6 constituent societies.',
  email: 'sksingh@iiita.ac.in',
  linkedin: 'https://linkedin.com',
};

const councilHeads: TeamMember[] = [
  {
    name: 'Aditya Narayan',
    role: 'Council President',
    year: 'B.Tech IT, Final Year',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',
    bio: 'Oversees council operations, inter-society synergy, and institute-level festival planning. Dedicated to empowering every artist across campus.',
    email: 'aditya.narayan@iiita.ac.in',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Council Vice President',
    year: 'B.Tech ECE, Final Year',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    bio: 'Leads internal governance, artist relations, and annual calendar scheduling. Championing diversity, equity, and creative expression at IIITA.',
    email: 'ananya.deshmukh@iiita.ac.in',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Kabir Sengupta',
    role: 'General Secretary',
    year: 'B.Tech IT, Third Year',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    bio: 'Coordinates institute administration liaisons, budget management, and logistics execution across all flagship cultural extravaganzas.',
    email: 'kabir.sengupta@iiita.ac.in',
    linkedin: 'https://linkedin.com',
  },
];

const societyHeads: TeamMember[] = [
  {
    name: 'Siddharth Verma',
    role: 'Society Head',
    society: 'AMS',
    societyTag: 'Music',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bio: 'Lead guitarist and composer driving the college acoustic and rock ensembles.',
    year: '3rd Year, IT',
  },
  {
    name: 'Meera Nambiar',
    role: 'Society Head',
    society: 'Nirmiti',
    societyTag: 'Fine Arts',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    bio: 'Contemporary visual artist curating campus murals, installations, and exhibitions.',
    year: '3rd Year, ECE',
  },
  {
    name: 'Rahul Kapoor',
    role: 'Society Head',
    society: 'GeneticX',
    societyTag: 'Dance',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bio: 'Choreographer specializing in urban hip-hop and energetic contemporary dance styles.',
    year: '3rd Year, IT',
  },
  {
    name: 'Tanvi Joshi',
    role: 'Society Head',
    society: 'Virtousi',
    societyTag: 'Dramatics',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    bio: 'Stage director and playwright leading nationally acclaimed one-act proscenium plays.',
    year: '3rd Year, IT-BI',
  },
  {
    name: 'Devansh Saxena',
    role: 'Society Head',
    society: 'Rangtarangini',
    societyTag: 'Theatre',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=80',
    bio: 'Vocal theatre enthusiast directing social-awareness street plays (Nukkad Natak).',
    year: '3rd Year, ECE',
  },
  {
    name: 'Aarushi Bhatt',
    role: 'Society Head',
    society: 'Saraswa',
    societyTag: 'Literature',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    bio: 'Orator and editor organizing parliamentary debates, open-mic slams, and poetry soirées.',
    year: '3rd Year, IT',
  },
];

const coreCommittee: TeamMember[] = [
  {
    name: 'Aryan Dixit',
    role: 'Events & Operations Lead',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80',
    year: '2nd Year, IT',
  },
  {
    name: 'Sneha Nair',
    role: 'PR & Media Head',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    year: '2nd Year, ECE',
  },
  {
    name: 'Parth Patel',
    role: 'Design & Visual Branding Lead',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
    year: '2nd Year, IT',
  },
  {
    name: 'Ritika Sen',
    role: 'Finance & Sponsorship Coordinator',
    photoUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    year: '2nd Year, IT',
  },
  {
    name: 'Yash Vardhan',
    role: 'Technical & Web Operations Lead',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    year: '2nd Year, IT',
  },
  {
    name: 'Gaurav Sharma',
    role: 'Hospitality & Artist Management',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    year: '2nd Year, ECE',
  },
  {
    name: 'Divya Mohan',
    role: 'Stage Production & Sound Engineer',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    year: '2nd Year, IT-BI',
  },
  {
    name: 'Harshit Rastogi',
    role: 'Outreach & Alumni Liaison',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    year: '2nd Year, ECE',
  },
];

const societyBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
  AMS: {
    bg: 'bg-amber-500/10 dark:bg-amber-400/15',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-500/30',
  },
  Nirmiti: {
    bg: 'bg-teal-500/10 dark:bg-teal-400/15',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-500/30',
  },
  GeneticX: {
    bg: 'bg-rose-500/10 dark:bg-rose-400/15',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-500/30',
  },
  Virtousi: {
    bg: 'bg-purple-500/10 dark:bg-purple-400/15',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-500/30',
  },
  Rangtarangini: {
    bg: 'bg-orange-500/10 dark:bg-orange-400/15',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-500/30',
  },
  Saraswa: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-500/30',
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="text-center py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs md:text-sm font-medium tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
            <span>Council Leadership &bull; Academic Year 2026–2027</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Our Team
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-black/70 dark:text-white/70 font-sans leading-relaxed">
            The passionate minds, visionary organizers, and creative leaders guiding IIIT Allahabad&apos;s cultural council.
            Together, we empower artists, stage memorable festivals, and nurture a home for imagination.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="font-serif text-2xl md:text-3xl font-bold text-[#FF4D6D]">6</div>
              <div className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60 mt-1">Societies</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="font-serif text-2xl md:text-3xl font-bold text-[#FFC93C]">40+</div>
              <div className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60 mt-1">Major Events</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="font-serif text-2xl md:text-3xl font-bold text-[#00B4A6]">1200+</div>
              <div className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60 mt-1">Student Artists</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="font-serif text-2xl md:text-3xl font-bold text-[#7B2FF7]">1</div>
              <div className="text-xs uppercase tracking-wider text-black/60 dark:text-white/60 mt-1">Shared Heartbeat</div>
            </div>
          </div>
        </section>

        {/* SECTION 1: FACULTY ADVISOR */}
        <section className="my-16 md:my-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#FF4D6D] font-bold">Guidance & Mentorship</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">Faculty Advisor</h2>
            <div className="w-16 h-1 bg-[#FF4D6D] mx-auto mt-3 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="relative shrink-0">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-[#FF4D6D]/30 shadow-2xl">
                  <img
                    src={facultyAdvisor.photoUrl}
                    alt={facultyAdvisor.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-[#0F0B1E] dark:bg-[#FFF8EC] text-[#FFF8EC] dark:text-[#0F0B1E] text-xs font-semibold rounded-full shadow-md">
                  Advisor
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#FF4D6D]/15 text-[#FF4D6D] mb-2">
                  {facultyAdvisor.department}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {facultyAdvisor.name}
                </h3>
                <p className="text-sm sm:text-base font-medium text-black/60 dark:text-white/60 mb-4">
                  {facultyAdvisor.role}
                </p>
                <p className="text-sm sm:text-base text-black/75 dark:text-white/75 font-sans leading-relaxed mb-6">
                  {facultyAdvisor.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  {facultyAdvisor.email && (
                    <a
                      href={`mailto:${facultyAdvisor.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-black/10 dark:border-white/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {facultyAdvisor.email}
                    </a>
                  )}
                  {facultyAdvisor.linkedin && (
                    <a
                      href={facultyAdvisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#7B2FF7]/15 text-[#7B2FF7] dark:text-[#9B5FF9] hover:bg-[#7B2FF7]/25 transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45 1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45Z" />
                      </svg>
                      Professional Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COUNCIL HEADS */}
        <section className="my-16 md:my-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#7B2FF7] font-bold">Executive Council</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">Council Heads</h2>
            <div className="w-16 h-1 bg-[#7B2FF7] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {councilHeads.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col justify-between bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 hover:border-[#7B2FF7]/50 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative w-36 h-36 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-black/10 dark:border-white/10 group-hover:border-[#7B2FF7] transition-all duration-300">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#7B2FF7]/10 text-[#7B2FF7] dark:text-[#9B5FF9] mb-2">
                      {member.role}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-center">
                      {member.name}
                    </h3>
                    {member.year && (
                      <p className="text-xs text-black/50 dark:text-white/50 tracking-wide mt-0.5">
                        {member.year}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-black/70 dark:text-white/70 font-sans leading-relaxed text-center mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-center gap-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg text-black/60 dark:text-white/60 hover:text-[#7B2FF7] dark:hover:text-[#9B5FF9] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-black/60 dark:text-white/60 hover:text-[#7B2FF7] dark:hover:text-[#9B5FF9] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      aria-label={`LinkedIn of ${member.name}`}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45 1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45Z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SOCIETY HEADS */}
        <section className="my-16 md:my-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#00B4A6] font-bold">Artistic Disciplines</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">Society Heads</h2>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1 max-w-xl mx-auto">
              Leaders spearheading our 6 vibrant societies across music, art, dance, drama, theatre, and literature.
            </p>
            <div className="w-16 h-1 bg-[#00B4A6] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {societyHeads.map((head) => {
              const colors = (head.society && societyBadgeColors[head.society]) || {
                bg: 'bg-black/10 dark:bg-white/10',
                text: 'text-black dark:text-white',
                border: 'border-black/20 dark:border-white/20',
              };

              return (
                <div
                  key={head.name}
                  className="group bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:border-black/25 dark:hover:border-white/25 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-black/10 dark:border-white/10 shrink-0">
                        <img
                          src={head.photoUrl}
                          alt={head.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                            {head.society} &bull; {head.societyTag}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold">
                          {head.name}
                        </h3>
                        <p className="text-xs text-black/60 dark:text-white/60">
                          {head.role} ({head.year})
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-black/75 dark:text-white/75 font-sans leading-relaxed">
                      {head.bio}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-black/50 dark:text-white/50">
                    <span>IIITA Cultural Council</span>
                    <Link
                      href="/societies"
                      className="text-[#FF4D6D] hover:underline font-medium inline-flex items-center gap-1"
                    >
                      View Society &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: CORE COMMITTEE */}
        <section className="my-16 md:my-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#FFC93C] font-bold">The Driving Force</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">Core Committee</h2>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1 max-w-xl mx-auto">
              Our 8-member core operations wing orchestrating stage design, finances, media, logistics, and technology.
            </p>
            <div className="w-16 h-1 bg-[#FFC93C] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {coreCommittee.map((member) => (
              <div
                key={member.name}
                className="group bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 text-center hover:border-black/25 dark:hover:border-white/25 hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10 group-hover:border-[#FFC93C] transition-all duration-300 shadow-sm">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif text-sm sm:text-base font-bold truncate">
                  {member.name}
                </h4>
                <p className="text-xs font-medium text-[#7B2FF7] dark:text-[#9B5FF9] mt-0.5 leading-snug line-clamp-2">
                  {member.role}
                </p>
                {member.year && (
                  <p className="text-[11px] text-black/50 dark:text-white/50 mt-1">
                    {member.year}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SELECTION & ELIGIBILITY */}
        <section className="mt-24 mb-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#B8860B]" />
                <span className="text-[#B8860B] text-xs font-bold tracking-[0.2em] uppercase">
                  SELECTION & ELIGIBILITY
                </span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F0B1E]">
                Who gets on the team
              </h2>
              
              <div className="space-y-4 text-base text-black/70 font-sans leading-relaxed">
                <p>
                  Gymkhana Cultural Council members are selected on the basis of CGPA by a
                  duly constituted committee, appointed by the Director on the
                  recommendation of the Dean of Student Affairs.
                </p>
                <p>
                  Minimum CGPA cutoff for eligibility: <strong className="text-[#0F0B1E]">6.0 / 10</strong>. 
                  Students must additionally have no active disciplinary enquiry or case of Unfair 
                  Means (UFM) against them.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-black/20 text-sm font-medium hover:bg-black/5 transition-colors"
                >
                  Have questions? Contact us &rarr;
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-[480px] bg-white border border-black/10 rounded-2xl p-8 shadow-sm">
              <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <span className="text-emerald-700 text-xs font-bold tracking-widest uppercase">
                  Eligibility Checklist
                </span>
              </div>

              <ul className="space-y-4 text-[15px] font-medium text-[#0F0B1E]">
                <li className="flex gap-3">
                  <span className="font-bold opacity-50">1.</span>
                  <span>CGPA of 6.0/10 or above</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold opacity-50">2.</span>
                  <span>No active disciplinary enquiry</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold opacity-50">3.</span>
                  <span>No recorded case of Unfair Means (UFM)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold opacity-50">4.</span>
                  <span>Recommended by Dean, Student Affairs</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold opacity-50">5.</span>
                  <span>Approved by the Director-appointed committee</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
