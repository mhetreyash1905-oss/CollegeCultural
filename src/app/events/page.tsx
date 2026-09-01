import Events from '@/app/(home)/Events';

export const metadata = {
  title: 'Events | IIITA Cultural Council',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <Events />
    </div>
  );
}
