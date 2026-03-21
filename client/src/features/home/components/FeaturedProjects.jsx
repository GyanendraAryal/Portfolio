import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../lib/animations/motionVariants';
import useProjectStore from '../../../store/useProjectStore';
import ProjectCard from '../../../components/sections/ProjectCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
  const { projects, fetchProjects, loading } = useProjectStore();

  useEffect(() => {
    if (projects.length === 0) fetchProjects();
  }, [projects, fetchProjects]);

  const featured = projects.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div 
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:w-2/3"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Selected <span className="text-gradient-accent">Work</span>
            </h2>
            <div className="h-1 w-20 bg-accent rounded-full mb-8" />
            <p className="font-light text-secondary text-lg md:text-xl leading-relaxed">
              A curated selection of high-performance systems and premium digital experiences designed to solve complex challenges.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link 
              to="/projects" 
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent"
            >
              View Full Archive
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {loading && projects.length === 0 ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="glass-card h-96 rounded-3xl animate-pulse bg-white/5" />
            ))
          ) : (
            featured.map((project) => (
              <motion.div key={project._id} variants={fadeUp()}>
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
