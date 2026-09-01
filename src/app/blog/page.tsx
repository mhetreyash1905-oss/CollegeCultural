import Blogs from '@/app/(home)/Blogs';

export const metadata = {
  title: 'Blog | IIITA Cultural Council',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Blogs />
    </div>
  );
}
