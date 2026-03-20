import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../animations/motionVariants';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {/* Background glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <motion.div 
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        animate="show"
        className="text-center px-4 max-w-4xl mx-auto"
      >
        <motion.p variants={fadeIn('up', 0.2)} className="text-accent font-medium tracking-widest uppercase mb-4">
          Hi, my name is
        </motion.p>
        
        <motion.h1 
          variants={fadeIn('up', 0.4)} 
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight"
        >
          Gyanendra Aryal.
          <br/>
          <span className="text-text/60">I build solutions for the web.</span>
        </motion.h1>

        <motion.p 
          variants={fadeIn('up', 0.6)} 
          className="text-lg md:text-xl text-text/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          I'm a full-stack engineer passionate about building exceptional, high-quality digital experiences that combine stunning design with flawless performance.
        </motion.p>

        <motion.div variants={fadeIn('up', 0.8)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/projects">
            <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-lg">
              Check out my work
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg">
              Get in touch
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;