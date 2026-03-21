import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-card group relative h-full flex flex-col rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Visual Header */}
      <div className="relative h-60 overflow-hidden">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 z-10" />
        <img 
          src={project.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        
        {/* Floating Tags */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {project.techStack?.slice(0, 2).map((tech, idx) => (
            <span key={idx} className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/80">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8 flex flex-col flex-grow relative z-20">
        <h3 className="text-2xl font-display font-medium text-white mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-secondary/80 text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex gap-4">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-all duration-300">
                <Github size={18} />
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-all duration-300">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
          
          <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent group/btn overflow-hidden">
            <span className="relative">
              Case Study
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
            </span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Premium Border Highlight Effect */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-3xl pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
