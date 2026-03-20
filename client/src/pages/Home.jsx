import Hero from '../components/sections/Hero';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      {/* Reusing Home for now just to render the Hero, could be extended later */}
      <Hero />
    </motion.div>
  );
};

export default Home;
