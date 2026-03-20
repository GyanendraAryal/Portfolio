import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations/motionVariants';
import useFetch from '../hooks/useFetch';
import ProjectCard from '../components/sections/ProjectCard';
import Loader from '../components/common/Loader';

const Projects = () => {
  const { data: projects, loading, error } = useFetch('/projects');

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 mt-20">Error loading projects</div>;

  return (
    <motion.section 
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-20"
    >
      <motion.div variants={fadeIn('up')} className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-4">
          <span className="text-accent font-mono text-xl block">02.</span> 
          Some Things I've Built
          <div className="h-[1px] bg-border flex-grow ml-4"></div>
        </h2>
        <p className="text-text/70 mt-4 max-w-2xl">
          Here are a few projects I've worked on recently. They range from frontend applications to full-stack platforms.
        </p>
      </motion.div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={project._id} variants={fadeIn('up', index * 0.1)}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-text/60 italic py-12">No projects available at the moment.</p>
      )}

    </motion.section>
  );
};

export default Projects;
