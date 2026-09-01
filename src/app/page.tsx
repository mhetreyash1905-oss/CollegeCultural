import Hero from './(home)/Hero';
import FestSection from './(home)/FestSection';
import Societies from './(home)/Societies';
import Events from './(home)/Events';
import Blogs from './(home)/Blogs';
import Gallery from './(home)/Gallery';
import Members from './(home)/Members';
import Contact from './(home)/Contact';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      <Hero />
      <FestSection />
      <Societies />
      <Events />
      <Blogs />
      <Gallery />
      <Members />
      <Contact />
    </div>
  );
}
