import { FEST_CONFIG } from '@/config/fest';
import Countdown from '@/app/components/Countdown';
import ScrollAnimationWrapper from '@/app/components/ScrollAnimationWrapper';
import Link from 'next/link';

export default function FestSection() {
  return (
    <section 
      id="fest" 
      className="relative w-full overflow-hidden"
      // Using a deep magenta gradient background to stand out from the rest of the site
      style={{
        background: 'linear-gradient(135deg, #4A0E4E 0%, #1A0524 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      
      <div className="section-padding max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <ScrollAnimationWrapper direction="up" className="w-full">
          <div className="text-center mb-10 text-white">
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#FFC93C] mb-4 font-sans font-bold">
              Flagship Annual Fest
            </h2>
            <h3 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-6 drop-shadow-lg">
              {FEST_CONFIG.name}
            </h3>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {FEST_CONFIG.description}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper direction="up" delay={0.2} className="w-full mb-16">
          <Countdown targetDate={FEST_CONFIG.date} />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper direction="up" delay={0.4} className="w-full">
          <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-4xl mx-auto mb-12">
            {FEST_CONFIG.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-[#FFC93C] mb-2 font-serif drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper direction="up" delay={0.6}>
          <Link
            href={FEST_CONFIG.ctaLink}
            className="inline-block px-10 py-4 bg-[#FFC93C] text-[#1A0524] font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {FEST_CONFIG.cta}
          </Link>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
