import dbConnect from '@/lib/mongodb';
import CouncilMember from '@/models/CouncilMember';
import ScrollAnimationWrapper, { StaggeredGrid } from '@/app/components/ScrollAnimationWrapper';

export default async function Members() {
  await dbConnect();
  const membersData = await CouncilMember.find({}).sort({ order: 1 }).lean();
  const members = JSON.parse(JSON.stringify(membersData));

  // Group by tier
  const advisors = members.filter((m: any) => m.tier === 'advisor');
  const leadership = members.filter((m: any) => m.tier === 'leadership');
  const core = members.filter((m: any) => m.tier === 'core');
  const societyHeads = members.filter((m: any) => m.tier === 'society-head');

  const MemberCard = ({ member, sizeClass, imgSizeClass }: { member: any, sizeClass: string, imgSizeClass: string }) => (
    <div className={`text-left flex flex-col items-start group ${sizeClass}`}>
      <div className={`relative ${imgSizeClass} mb-4 overflow-hidden rounded-xl border border-black/10 group-hover:border-[#7B2FF7] transition-colors duration-500`}>
        <img 
          src={member.photoUrl || member.imageUrl || '/placeholder-avatar.jpg'} 
          alt={member.name}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <h3 className="font-serif font-semibold text-[#0F0B1E] leading-tight text-lg">{member.name}</h3>
      <p className="text-sm text-[#0F0B1E]/60 mt-1 uppercase tracking-wider text-[0.65rem] md:text-xs font-bold">{member.role}</p>
    </div>
  );

  return (
    <section id="team" className="section-padding max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ScrollAnimationWrapper direction="up">
        <div className="text-left mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0F0B1E] font-bold uppercase tracking-widest">Cultural Council</h2>
          <p className="text-[#0F0B1E]/50 mt-2 font-mono text-sm tracking-widest">IIITA CULTURAL COUNCIL 2026</p>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.1}>
        {/* Advisor Level */}
        {advisors.length > 0 && (
          <div className="flex flex-wrap justify-start gap-12 mb-16">
            {advisors.map((member: any) => (
              <MemberCard key={member._id} member={member} sizeClass="w-64" imgSizeClass="w-full aspect-square" />
            ))}
          </div>
        )}
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.2}>
        {/* Leadership Level */}
        {leadership.length > 0 && (
          <div className="flex flex-wrap justify-start gap-8 md:gap-12 mb-16">
            {leadership.map((member: any) => (
              <MemberCard key={member._id} member={member} sizeClass="w-48" imgSizeClass="w-full aspect-square" />
            ))}
          </div>
        )}
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.3}>
        {/* Core Level */}
        {core.length > 0 && (
          <div className="flex flex-wrap justify-start gap-6 md:gap-10 mb-16">
            {core.map((member: any) => (
              <MemberCard key={member._id} member={member} sizeClass="w-40" imgSizeClass="w-full aspect-square" />
            ))}
          </div>
        )}
      </ScrollAnimationWrapper>
    </section>
  );
}
