import dbConnect from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import ScrollAnimationWrapper from '@/app/components/ScrollAnimationWrapper';
import DraggableFilmstrip from '@/app/components/DraggableFilmstrip';

export default async function Gallery() {
  await dbConnect();
  const imagesData = await GalleryImage.find({}).sort({ order: 1 }).lean();
  const images = JSON.parse(JSON.stringify(imagesData));

  return (
    <section id="gallery" className="max-w-[100vw] mx-auto overflow-hidden">
      <ScrollAnimationWrapper direction="up">
        <div className="text-center mb-8 px-4 mt-20">
          <h2 className="font-serif text-4xl md:text-5xl text-[#0F0B1E] dark:text-[#FFF8EC]">Gallery</h2>
          <p className="text-[#0F0B1E]/60 dark:text-[#FFF8EC]/60 mt-4 text-lg">Swipe or drag to explore our memories</p>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="up" delay={0.2}>
        <DraggableFilmstrip images={images} />
      </ScrollAnimationWrapper>
    </section>
  );
}
