import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/animations/motionVariants';
import useExperienceStore from '../store/useExperienceStore';

const Experience = () => {
  const { experiences, fetchExperiences, loading, error } = useExperienceStore();

  useEffect(() => {
    if (experiences.length === 0) fetchExperiences();
  }, [experiences, fetchExperiences]);

  if (loading && experiences.length === 0) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-20 p-8 glass rounded-2xl border-red-500/20 max-w-md mx-auto">
      <p className="text-red-400 font-medium mb-2">Sync Interrupted</p>
      <p className="text-secondary text-sm">{error}</p>
    </div>
  );

  return (
    <motion.section 
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 py-24 md:py-32"
    >
      <motion.div variants={fadeUp()} className="mb-16 md:mb-24 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          Career <span className="text-gradient-accent">Timeline</span>
        </h2>
        <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto md:mx-0" />
      </motion.div>

      <div className="relative border-l border-white/5 ml-4 md:ml-10 space-y-16 pb-12">
        {experiences && experiences.length > 0 ? (
          experiences.map((exp, idx) => (
            <motion.div key={exp._id} variants={fadeUp()} className="relative pl-10 md:pl-16">
              {/* Timeline Indicator */}
              <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-background border-2 border-accent shadow-[0_0_20px_rgba(99,102,241,0.6)] group">
                 <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
              </div>
              
              <div className="glass p-8 rounded-3xl border-white/5 transition-all duration-500 hover:border-accent/20 relative group hover:bg-accent/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-medium text-white group-hover:text-accent transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-accent/80 font-medium tracking-wide">
                      {exp.company}
                    </p>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-secondary text-xs font-mono whitespace-nowrap">
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>
                
                <div 
                  className="text-secondary/80 font-light leading-relaxed text-base prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="pl-10 py-12">
            <p className="text-secondary/40 font-light italic">No historical records found for this architect.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Experience;
