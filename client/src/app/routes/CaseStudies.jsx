import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';
import useProjectStore from '../../store/useProjectStore';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const CaseStudies = () => {
  const { projects, fetchProjects, loading, error } = useProjectStore();

  useEffect(() => {
    if (projects.length === 0) fetchProjects();
  }, [projects, fetchProjects]);

  if (loading && projects.length === 0) return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-32 p-8 glass rounded-2xl border-red-500/20 max-w-md mx-auto">
      <p className="text-red-400 font-medium mb-2">Sync Error</p>
      <p className="text-secondary text-sm">{error}</p>
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8">
            Case <span className="text-gradient-accent">Studies</span>
          </h1>
          <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto md:mx-0" />
          <p className="font-light text-secondary max-w-3xl text-lg md:text-xl leading-relaxed">
            A comprehensive look into my most sophisticated work. Exploring architectural decisions, performance bottlenecks, and the pursuit of digital perfection.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer(0.3, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-32 md:space-y-48"
        >
          {projects?.map((project, index) => (
            <motion.div 
              key={project._id} 
              variants={fadeUp()}
              className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual Asset */}
              <div className="w-full lg:w-3/5 group relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-[40px] blur-2xl group-hover:bg-accent/10 transition-colors duration-1000 -z-10" />
                <div className="glass rounded-[32px] overflow-hidden border border-white/10 shadow-3xl bg-surface/5 p-3">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-[24px]">
                    <img 
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200'} 
                      alt={project.title} 
                      className="object-cover w-full h-full grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="w-full lg:w-2/5 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-accent text-xs font-mono font-medium uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 border border-accent/20">Project {index + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-white group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                </div>
                
                <div className="prose prose-invert prose-p:text-secondary/80 prose-p:font-light prose-p:leading-relaxed max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: project.description }} className="line-clamp-6" />
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-tighter rounded-md bg-white/5 text-secondary border border-white/5 group-hover:border-accent/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-8 pt-4">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-all duration-300 group/link"
                      >
                        Launch Infrastructure <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-white transition-colors"
                      >
                        <Github size={18} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {projects?.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl border-white/5">
              <p className="text-secondary/40 font-light italic">Currently documenting new technical milestones...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
