import { motion } from 'framer-motion';
import { hoverTilt } from '../../animations/motionVariants';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      variants={hoverTilt}
      whileHover="hover"
      className="glass-card overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
        <img 
          src={project.imageUrl || 'https://via.placeholder.com/600x400/0f172a/6366f1?text=Project+Image'} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text/80 mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map((tech, idx) => (
            <span key={idx} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-text hover:text-accent transition-colors flex items-center gap-2 text-sm font-medium">
              <Github size={18} /> Code
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-text hover:text-accent transition-colors flex items-center gap-2 text-sm font-medium ml-auto">
              Live Demo <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
