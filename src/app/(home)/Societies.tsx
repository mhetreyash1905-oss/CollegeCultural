import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';
import SocietyOrbit from '@/app/components/SocietyOrbit';

export default async function Societies() {
  await dbConnect();
  const societiesData = await Society.find({}).sort({ order: 1 }).lean();
  const societies = JSON.parse(JSON.stringify(societiesData));

  return (
    <section id="societies" className="w-full">
      <SocietyOrbit societies={societies} />
    </section>
  );
}
