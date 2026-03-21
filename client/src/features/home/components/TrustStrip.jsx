import { motion } from 'framer-motion';
import { fadeUp } from '../../../lib/animations/motionVariants';

const MernStack = [
  { name: 'MongoDB', color: 'hover:text-green-500' },
  { name: 'Express', color: 'hover:text-white' },
  { name: 'React', color: 'hover:text-cyan-400' },
  { name: 'Node.js', color: 'hover:text-green-600' },
  { name: 'Tailwind', color: 'hover:text-teal-400' },
  { name: 'Framer', color: 'hover:text-purple-500' },
];

const TrustStrip = () => {
  return (
    <motion.section 
      variants={fadeUp()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="py-16 border-y border-white/5 bg-white/2 backdrop-blur-md relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <div className="text-center lg:text-left space-y-2">
            <p className="text-[10px] font-mono font-medium tracking-[0.3em] text-accent uppercase">Proven Stack</p>
            <h3 className="text-2xl font-display font-medium text-white/90">Engineered for Performance.</h3>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-10 md:gap-16 items-center">
            {MernStack.map((tech) => (
              <div 
                key={tech.name} 
                className={`font-display text-lg md:text-xl font-medium text-white/30 ${tech.color} transition-all duration-300 cursor-default select-none hover:scale-105`}
              >
                {tech.name}
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default TrustStrip;
