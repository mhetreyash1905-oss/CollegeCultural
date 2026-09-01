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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FestSection />
        <Societies />
        <Events />
        <Blogs />
        <Gallery />
        <Members />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
