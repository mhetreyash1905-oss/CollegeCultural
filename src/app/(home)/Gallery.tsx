import dbConnect from '@/lib/mongodb';
import GalleryItem from '@/models/Gallery';

export default async function Gallery() {
  await dbConnect();
  const imagesData = await GalleryItem.find({}).sort({ createdAt: -1 }).lean();
  const images = JSON.parse(JSON.stringify(imagesData));

  return (
    <section id="gallery" className="section-padding max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-paper">Gallery</h2>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((image: any) => (
          <div 
            key={image._id} 
            className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden group cursor-pointer"
            data-lightbox
            data-src={image.imageUrl}
          >
            <img 
              src={image.imageUrl || '/placeholder.jpg'} 
              alt={image.caption || 'Gallery Image'}
              className="w-full object-cover block"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-paper text-sm p-4 w-full">
                {image.caption || 'Cultural Event Image'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
