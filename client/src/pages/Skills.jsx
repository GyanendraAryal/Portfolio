import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/animations/motionVariants';
import useSkillStore from '../store/useSkillStore';

const Skills = () => {
  const { skills, fetchSkills, loading, error } = useSkillStore();

  useEffect(() => {
    if (skills.length === 0) fetchSkills();
  }, [skills, fetchSkills]);

  if (loading && skills.length === 0) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-20 p-8 glass rounded-2xl border-red-500/20 max-w-md mx-auto">
      <p className="text-red-400 font-medium mb-2">Technical Fault</p>
      <p className="text-secondary text-sm">{error}</p>
    </div>
  );

  const categories = ['Frontend', 'Backend', 'Tools', 'Other'];

  const getCategorizedSkills = (cat) => {
    return skills?.filter(skill => skill.category === cat) || [];
  };

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
          Core <span className="text-gradient-accent">Capabilities</span>
        </h2>
        <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto md:mx-0" />
        <p className="font-light text-secondary max-w-2xl text-lg md:text-xl leading-relaxed">
          A comprehensive toolkit engineered for the modern web. From low-level systems to high-level reactive interfaces, I specialize in building solutions that scale.
        </p>
      </motion.div>

      <div className="space-y-20 md:space-y-32">
        {categories.map((category, catIdx) => {
          const categorySkills = getCategorizedSkills(category);
          if (categorySkills.length === 0) return null;

          return (
            <motion.div key={category} variants={fadeUp()} className="space-y-10">
              <div className="flex items-center gap-6">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white/90 capitalize whitespace-nowrap">{category}</h3>
                <div className="h-[1px] bg-white/5 flex-grow" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categorySkills.map((skill, idx) => (
                  <motion.div 
                    key={skill._id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass p-6 rounded-3xl flex flex-col items-center justify-center gap-4 border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all duration-500 group relative overflow-hidden"
                  >
                    {/* Background Glow on Hover */}
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
                    
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-primary group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                      {skill.iconUrl ? (
                         <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 object-contain" />
                      ) : (
                         <span className="font-display text-2xl font-bold">{skill.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <div className="text-center space-y-2">
                       <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors block">{skill.name}</span>
                       <div className="w-20 bg-white/5 h-1 rounded-full overflow-hidden mx-auto">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${skill.proficiency || 80}%` }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-accent/60 group-hover:bg-accent transition-colors" 
                         />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Skills;
