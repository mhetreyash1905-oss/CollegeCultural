import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SocietyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  
  // Find by name (case-insensitive) or by id
  const society = await Society.findOne({ 
    $or: [
      { name: { $regex: new RegExp('^' + id + '$', 'i') } },
      // if it's a valid ObjectId, we can search by _id too, but for slugs we rely on name
    ]
  }).lean();

  if (!society) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FFF8EC] text-[#0F0B1E] dark:bg-[#0F0B1E] dark:text-[#FFF8EC] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button */}
        <Link 
          href="/societies"
          className="inline-flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to all societies
        </Link>

        {/* Hero Section */}
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 border border-black/10 dark:border-white/10 shadow-lg group">
          <Image
            src={society.imageUrl || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80'}
            alt={society.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <span 
              className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 backdrop-blur-md"
              style={{ backgroundColor: `${society.accentColor}40` }}
            >
              {society.tag}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 drop-shadow-md">
              {society.name}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: society.accentColor }} />
            About {society.name}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none font-sans font-light leading-relaxed text-black/80 dark:text-white/80 whitespace-pre-line">
            {society.description}
          </div>
          
          <div className="mt-12 pt-12 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <p className="text-sm opacity-60">Want to join or collaborate with {society.name}?</p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white transition-transform hover:scale-105 shadow-md"
              style={{ backgroundColor: society.accentColor }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
