import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations/motionVariants';
import useFetch from '../hooks/useFetch';
import Loader from '../components/common/Loader';

const Experience = () => {
  const { data: experiences, loading, error } = useFetch('/experience');

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 mt-20">Error loading experience</div>;

  return (
    <motion.section 
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-20"
    >
      <motion.div variants={fadeIn('up')} className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-4">
          <span className="text-accent font-mono text-xl block">04.</span> 
          Where I've Worked
          <div className="h-[1px] bg-border flex-grow ml-4"></div>
        </h2>
      </motion.div>

      <div className="relative border-l border-border ml-4 md:ml-6 space-y-12 pb-8">
        {experiences && experiences.length > 0 ? (
          experiences.map((exp, idx) => (
            <motion.div key={exp._id} variants={fadeIn('up', idx * 0.1)} className="relative pl-8 md:pl-12">
              <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-accent ring-4 ring-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"></span>
              
              <div className="glass p-6 rounded-xl hover:border-accent/30 transition-colors">
                <h3 className="text-xl font-bold text-white flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  {exp.title} <span className="text-accent">@ {exp.company}</span>
                </h3>
                <p className="text-sm font-mono text-text/60 mb-4 tracking-wider">
                  {exp.startDate} - {exp.endDate}
                </p>
                <div 
                  className="text-text/80 leading-relaxed text-sm prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <p className="pl-8 text-text/60 italic">No experience added yet.</p>
        )}
      </div>
    </motion.section>
  );
};

export default Experience;
