import Societies from '@/app/(home)/Societies';

export const metadata = {
  title: 'Societies | IIITA Cultural Council',
};

export default function SocietiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Societies />
    </div>
  );
}
