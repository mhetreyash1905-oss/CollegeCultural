import Gallery from '@/app/(home)/Gallery';

export const metadata = {
  title: 'Gallery | IIITA Cultural Council',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Gallery />
    </div>
  );
}
