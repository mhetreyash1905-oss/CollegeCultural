import Hero from './(home)/Hero';
import FestSection from './(home)/FestSection';
import Societies from './(home)/Societies';
import Events from './(home)/Events';
import Blogs from './(home)/Blogs';
import Gallery from './(home)/Gallery';
import Members from './(home)/Members';
import Contact from './(home)/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { WaveDivider, TornPaperDivider } from './components/Dividers';
import NewsTicker from './components/NewsTicker';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <NewsTicker />
      <main>
        <Hero />
        {/* Wave divider transitioning from Hero (indigo) to Fest (magenta) */}
        <WaveDivider className="bg-[#0F0B1E]" fill="#300735" />
        <FestSection />
        {/* Torn paper transitioning from Fest (magenta) back to Societies (indigo) */}
        <TornPaperDivider className="bg-[#1A0524]" fill="#0F0B1E" />
        <Societies />
        <Events />
        <Blogs />
        <TornPaperDivider className="bg-[#0F0B1E]" fill="#0F0B1E" /> {/* Optional spacing or texture */}
        <Gallery />
        <WaveDivider className="bg-[#0F0B1E]" fill="#0F0B1E" /> {/* Same here */}
        <Members />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
