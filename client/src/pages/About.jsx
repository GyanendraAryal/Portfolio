import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/animations/motionVariants';
import useAboutStore from '../store/useAboutStore';

const About = () => {
  const { about, fetchAbout, loading, error } = useAboutStore();

  useEffect(() => {
    if (!about) fetchAbout();
  }, [about, fetchAbout]);

  if (loading && !about) return (
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
          The <span className="text-gradient-accent">Architect</span>
        </h2>
        <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto md:mx-0" />
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <motion.div variants={fadeUp()} className="lg:col-span-7 space-y-8">
          <div className="glass p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent/40 group-hover:bg-accent transition-colors duration-500" />
            <div className="text-secondary text-lg md:text-xl font-light leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: about?.content || "I am a developer dedicated to pushing the boundaries of web architecture." }} />
          </div>
          
          <div className="flex flex-wrap gap-6 pt-4">
             {[
               { label: 'Role', value: 'Sr. Software Engineer' },
               { label: 'Focus', value: 'Scalable Systems' },
               { label: 'Philosophy', value: 'Minimalist Engineering' },
             ].map((stat, i) => (
               <div key={i} className="flex flex-col gap-1">
                 <span className="text-white/30 text-xs uppercase tracking-widest font-medium">{stat.label}</span>
                 <span className="text-white text-lg font-display font-medium">{stat.value}</span>
               </div>
             ))}
          </div>

          {about?.resumeUrl && (
            <div className="pt-8 text-center md:text-left">
              <a 
                href={about.resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-accent hover:text-white transition-all duration-300 font-medium text-lg group"
                download
              >
                Procure Credentials / Resume
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  &rarr;
                </motion.span>
              </a>
            </div>
          )}
        </motion.div>

        <motion.div variants={fadeUp()} className="lg:col-span-5 relative group">
          {/* Decorative frames */}
          <div className="absolute -inset-4 border border-white/5 rounded-[40px] -z-10 group-hover:border-accent/20 transition-colors duration-700" />
          <div className="absolute inset-0 bg-accent/20 blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000 -z-20" />
          
          <div className="glass rounded-[32px] overflow-hidden aspect-[4/5] border border-white/10 relative p-3">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
            
            {about?.avatarUrl ? (
              <img 
                src={about.avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-[24px] grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
              />
            ) : (
              <div className="w-full h-full bg-surface flex items-center justify-center rounded-[24px]">
                <span className="text-8xl font-display font-black text-white/5 selection:bg-transparent">GA</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </motion.section>
  );
};

export default About;
