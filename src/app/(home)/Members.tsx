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
    <div className={`text-center flex flex-col items-center group ${sizeClass}`}>
      <div className={`relative ${imgSizeClass} mb-4 overflow-hidden rounded-full border-4 border-violet/30 group-hover:border-violet transition-colors duration-500`}>
        <img 
          src={member.photoUrl || member.imageUrl || '/placeholder-avatar.jpg'} 
          alt={member.name}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <h3 className="font-serif font-semibold text-paper leading-tight">{member.name}</h3>
      <p className="text-sm text-paper/60 mt-1 uppercase tracking-wider text-[0.65rem] md:text-xs">{member.role}</p>
    </div>
  );

  return (
    <section id="team" className="section-padding max-w-6xl mx-auto overflow-hidden">
      <ScrollAnimationWrapper direction="up">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-paper font-bold uppercase tracking-widest drop-shadow-lg">Cast & Crew</h2>
          <p className="text-paper/50 mt-2 font-mono text-sm tracking-widest">IIITA CULTURAL COUNCIL 2026</p>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.1}>
        {/* Advisor Level */}
        {advisors.length > 0 && (
          <div className="flex justify-center mb-16">
            {advisors.map((member: any) => (
              <MemberCard key={member._id} member={member} sizeClass="w-64" imgSizeClass="w-48 h-48 md:w-56 md:h-56" />
            ))}
          </div>
        )}
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.2}>
        {/* Leadership Level */}
        {leadership.length > 0 && (
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-16">
            {leadership.map((member: any) => (
              <MemberCard key={member._id} member={member} sizeClass="w-48" imgSizeClass="w-36 h-36 md:w-44 md:h-44" />
            ))}
          </div>
        )}
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.3}>
        {/* Core & Society Heads Level */}
        {(core.length > 0 || societyHeads.length > 0) && (
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[...core, ...societyHeads].map((member: any) => (
              <MemberCard key={member._id} member={member} sizeClass="w-32 md:w-40" imgSizeClass="w-24 h-24 md:w-32 md:h-32" />
            ))}
          </div>
        )}
      </ScrollAnimationWrapper>
    </section>
  );
}
