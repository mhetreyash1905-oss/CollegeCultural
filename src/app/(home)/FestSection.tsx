import { FEST_CONFIG } from '@/config/fest';
import Countdown from '@/app/components/Countdown';
import ScrollAnimationWrapper from '@/app/components/ScrollAnimationWrapper';
import Link from 'next/link';

export default function FestSection() {
  return (
    <section 
      id="fest" 
      className="relative w-full overflow-hidden section-padding max-w-7xl mx-auto"
    >
      <div className="relative z-10 flex flex-col items-center bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl">
        <ScrollAnimationWrapper direction="up" className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 mb-4 font-sans font-bold">
              Flagship Annual Fest
            </h2>
            <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[#0F0B1E] dark:text-[#FFF8EC]">
              {FEST_CONFIG.name}
            </h3>
            <p className="text-lg md:text-xl text-[#0F0B1E]/70 dark:text-[#FFF8EC]/70 max-w-2xl mx-auto font-light">
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
              <div key={index} className="text-center p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="text-3xl md:text-5xl font-bold text-[#0F0B1E] dark:text-[#FFF8EC] mb-2 font-serif">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-[#0F0B1E]/50 dark:text-[#FFF8EC]/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper direction="up" delay={0.6}>
          <Link
            href={FEST_CONFIG.ctaLink}
            className="inline-block px-10 py-4 bg-[#FF4D6D] text-white font-medium rounded-full hover:bg-[#FF4D6D]/90 transition-colors duration-300 shadow-lg"
          >
            {FEST_CONFIG.cta}
          </Link>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
