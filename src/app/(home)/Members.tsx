import dbConnect from '@/lib/mongodb';
import CouncilMember from '@/models/CouncilMember';
import ScrollAnimationWrapper, { StaggeredGrid } from '@/app/components/ScrollAnimationWrapper';

export default async function Members() {
  await dbConnect();
  const membersData = await CouncilMember.find({}).sort({ order: 1 }).lean();
  const members = JSON.parse(JSON.stringify(membersData));

  return (
    <section id="team" className="section-padding max-w-6xl mx-auto overflow-hidden">
      <ScrollAnimationWrapper direction="up">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-paper">Meet the Council</h2>
        </div>
      </ScrollAnimationWrapper>

      <StaggeredGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member: any) => (
          <div key={member._id} className="text-center bg-paper/5 border border-paper/10 rounded-2xl p-6 flex flex-col items-center">
            <img 
              src={member.photoUrl || member.imageUrl || '/placeholder-avatar.jpg'} 
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-violet/30"
            />
            <h3 className="text-lg font-serif font-semibold text-paper mt-4">{member.name}</h3>
            <p className="text-sm text-paper/60">{member.role}</p>
          </div>
        ))}
      </StaggeredGrid>
    </section>
  );
}
