import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/animations/motionVariants';
import useProjectStore from '../store/useProjectStore';
import ProjectCard from '../components/sections/ProjectCard';

const Projects = () => {
  const { projects, fetchProjects, loading, error } = useProjectStore();

  useEffect(() => {
    if (projects.length === 0) fetchProjects();
  }, [projects, fetchProjects]);

  if (loading && projects.length === 0) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-20 p-8 glass rounded-2xl border-red-500/20 max-w-md mx-auto">
      <p className="text-red-400 font-medium mb-2">Architectural Interruption</p>
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
          Strategic <span className="text-gradient-accent">Architectures</span>
        </h2>
        <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto md:mx-0" />
        <p className="font-light text-secondary max-w-2xl text-lg md:text-xl leading-relaxed">
          Exploring the junction of robust engineering and minimalist design. Each project is a deep dive into solving specific business challenges with high-performance code.
        </p>
      </motion.div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div key={project._id} variants={fadeUp()}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl border-white/5">
          <p className="text-secondary/60 font-light italic">Currently compiling new masterworks...</p>
        </div>
      )}

    </motion.section>
  );
};

export default Projects;
