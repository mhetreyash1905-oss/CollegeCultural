import Members from '@/app/(home)/Members';

export const metadata = {
  title: 'Team | IIITA Cultural Council',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Members />
    </div>
  );
}
