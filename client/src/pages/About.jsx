import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations/motionVariants';
import useFetch from '../hooks/useFetch';
import Loader from '../components/common/Loader';

const About = () => {
  const { data: about, loading, error } = useFetch('/about');

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 mt-20">Error loading about information</div>;

  return (
    <motion.section 
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-20"
    >
      <motion.div variants={fadeIn('up')} className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-4">
          <span className="text-accent font-mono text-xl block">01.</span> 
          About Me
          <div className="h-[1px] bg-border flex-grow ml-4"></div>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12">
        <motion.div variants={fadeIn('right')} className="md:col-span-3 prose prose-invert glass p-8 rounded-2xl">
          <div className="text-text/90 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: about?.content || "I am a developer." }} />
          
          {about?.resumeUrl && (
            <div className="mt-8">
              <a 
                href={about.resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-accent hover:text-white transition-colors"
                download
              >
                Download Resume &rarr;
              </a>
            </div>
          )}
        </motion.div>

        <motion.div variants={fadeIn('left')} className="md:col-span-2 relative group">
          <div className="absolute inset-0 bg-accent rounded-2xl translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <div className="glass rounded-2xl overflow-hidden aspect-square border-2 border-accent/50 relative">
            <div className="absolute inset-0 bg-accent/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            {/* Using a placeholder gradient image since no actual image is provided in the model */}
            <div className="w-full h-full bg-gradient-to-br from-surface to-primary flex items-center justify-center text-accent/20">
              <span className="text-6xl font-black tracking-tighter">GA.</span>
            </div>
          </div>
        </motion.div>
      </div>

    </motion.section>
  );
};

export default About;
