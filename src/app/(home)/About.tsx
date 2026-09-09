import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
      <ScrollAnimationWrapper direction="up" className="max-w-4xl">
        <div className="flex flex-col gap-16">
          
          {/* Top Part: About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs font-bold tracking-[0.2em] uppercase">
                ABOUT
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F0B1E]">
              The Cultural Council
            </h2>
            
            <p className="text-base md:text-lg text-black/70 font-sans leading-relaxed max-w-3xl">
              IIIT Allahabad actively participates in national and inter-institutional cultural fests, 
              competing in dance, drama, music, literature, fine arts, and media — with students representing 
              the Institute at prestigious collegiate festivals and tournaments across the country.
            </p>
          </div>

          {/* Bottom Part: Vision */}
          <div className="relative pl-8 md:pl-10">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B8860B]" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs font-bold tracking-[0.2em] uppercase">
                OUR VISION
              </span>
            </div>
            
            <p className="font-serif text-xl md:text-2xl text-[#0F0B1E] leading-relaxed max-w-3xl font-medium">
              To nurture a vibrant cultural ecosystem that inspires creativity, promotes artistic 
              expression, and develops confident, well-rounded, and socially responsible individuals.
            </p>
          </div>

          {/* OIC Card */}
          <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start mt-8">
            <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 overflow-hidden rounded-xl border border-black/5 shadow-inner">
              <img 
                src="/dr-sunny.jpg" 
                alt="Dr. Sunny Sharma" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-[#B8860B]" />
                <span className="text-[#B8860B] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  OIC-CULTURAL
                </span>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0F0B1E]">
                Dr. Sunny Sharma
              </h3>
              
              <p className="text-sm md:text-base text-black/70 font-sans leading-relaxed">
                The Cultural Council is one of the constituent councils of the Students' Gymkhana at IIIT Allahabad. 
                It comprises the Officer In-charge of Cultural Activities & Events and a team of student representatives 
                selected to coordinate and promote cultural activities on campus. The Council works towards encouraging 
                student participation, organizing cultural events and fests, managing facilities, and fostering a 
                vibrant artistic culture within the Institute.
              </p>
            </div>
          </div>

        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
