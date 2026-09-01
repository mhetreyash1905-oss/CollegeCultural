import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';

export default async function Societies() {
  await dbConnect();
  const societiesData = await Society.find({}).sort({ order: 1 }).lean();
  const societies = JSON.parse(JSON.stringify(societiesData));

  return (
    <section id="societies" className="section-padding max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-paper">Our Societies</h2>
        <p className="text-paper/60 mt-4 text-lg">Discover the vibrant communities that make our cultural scene thrive</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {societies.map((society: any) => (
          <div 
            key={society._id} 
            className="rounded-2xl overflow-hidden bg-paper/5 backdrop-blur-sm border border-paper/10 flex flex-col"
            style={{ borderLeft: `4px solid ${society.accentColor || '#8b5cf6'}` }}
          >
            <img 
              src={society.imageUrl || '/placeholder.jpg'} 
              alt={society.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start">
                <span 
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ 
                    backgroundColor: `${society.accentColor || '#8b5cf6'}33`, 
                    color: society.accentColor || '#8b5cf6' 
                  }}
                >
                  {society.tag || 'Society'}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-paper mt-3">{society.name}</h3>
              <p className="text-paper/70 text-sm mt-2">{society.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
