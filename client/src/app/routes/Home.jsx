import Hero from '../../features/home/components/Hero';
import TrustStrip from '../../features/home/components/TrustStrip';
import Services from '../../features/home/components/Services';
import FeaturedProjects from '../../features/home/components/FeaturedProjects';
import Process from '../../features/home/components/Process';
import Testimonials from '../../features/home/components/Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturedProjects />
      <Process />
      <Testimonials />
    </div>
  );
};

export default Home;
