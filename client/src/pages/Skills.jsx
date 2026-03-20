import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations/motionVariants';
import useFetch from '../hooks/useFetch';
import Loader from '../components/common/Loader';

const Skills = () => {
  const { data: skills, loading, error } = useFetch('/skills');

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 mt-20">Error loading skills</div>;

  const categories = ['Frontend', 'Backend', 'Tools', 'Other'];

  const getCategorizedSkills = (cat) => {
    return skills?.filter(skill => skill.category === cat) || [];
  };

  return (
    <motion.section 
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 py-20"
    >
      <motion.div variants={fadeIn('up')} className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-4">
          <span className="text-accent font-mono text-xl block">03.</span> 
          My Skills
          <div className="h-[1px] bg-border flex-grow ml-4"></div>
        </h2>
      </motion.div>

      <div className="space-y-12">
        {categories.map((category, catIdx) => {
          const categorySkills = getCategorizedSkills(category);
          if (categorySkills.length === 0) return null;

          return (
            <motion.div key={category} variants={fadeIn('up', catIdx * 0.1)}>
              <h3 className="text-2xl font-semibold mb-6 text-text/90 capitalize">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categorySkills.map((skill, idx) => (
                  <motion.div 
                    key={skill._id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-3 border border-border/50 hover:border-accent/50 transition-colors group"
                  >
                    <div className="text-4xl text-text/80 group-hover:text-accent transition-colors">
                      {/* If you add an iconUrl property later, render an img else show initial */}
                      {skill.iconUrl ? (
                         <img src={skill.iconUrl} alt={skill.name} className="w-10 h-10 object-contain" />
                      ) : (
                         <span className="font-mono text-2xl font-bold">{skill.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-center">{skill.name}</span>
                    <div className="w-full bg-surface h-1.5 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency || 80}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-accent" 
                      />
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
