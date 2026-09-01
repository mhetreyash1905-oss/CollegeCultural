import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';
import ScrollAnimationWrapper, { StaggeredGrid } from '@/app/components/ScrollAnimationWrapper';
import SocietyCard from '@/app/components/SocietyCard';

export default async function Societies() {
  await dbConnect();
  const societiesData = await Society.find({}).sort({ order: 1 }).lean();
  const societies = JSON.parse(JSON.stringify(societiesData));

  return (
    <section id="societies" className="section-padding max-w-7xl mx-auto overflow-hidden">
      <ScrollAnimationWrapper direction="up">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-paper">Our Societies</h2>
          <p className="text-paper/60 mt-4 text-lg">Discover the vibrant communities that make our cultural scene thrive</p>
        </div>
      </ScrollAnimationWrapper>

      <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4 py-8">
        {societies.map((society: any, index: number) => (
          <SocietyCard key={society._id} society={society} index={index} />
        ))}
      </StaggeredGrid>
    </section>
  );
}
