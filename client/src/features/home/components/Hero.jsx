import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../lib/animations/motionVariants';
import Button from '../../../components/ui/Button';
import useAboutStore from '../../../store/useAboutStore';

const Hero = () => {
  const { about, fetchAbout, loading } = useAboutStore();

  useEffect(() => {
    if (!about) fetchAbout();
  }, [about, fetchAbout]);
  
  const avatarSrc = about?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop';

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[95vh]">
      {/* Premium background effects */}
      <div className="glow-mesh top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/30 rounded-full" />
      <div className="glow-mesh bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Content */}
          <motion.div 
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            animate="show"
            className="w-full md:w-3/5 text-center md:text-left space-y-8 order-2 md:order-1"
          >
            {/* Status Indicator */}
            <motion.div variants={fadeUp()}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/80 border border-white/10 text-primary/80 text-sm font-medium backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Available for high-stakes projects
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeUp(0.1)}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Architecting <br className="hidden lg:block"/>
              <span className="text-gradient-accent">Next-Gen Products</span>
            </motion.h1>

            {/* Value Proposition */}
            <motion.p 
              variants={fadeUp(0.2)}
              className="text-lg md:text-xl text-secondary max-w-2xl mx-auto md:mx-0 leading-relaxed font-light"
            >
              Transforming complex engineering challenges into minimalist, high-performance digital experiences. Specializing in AI-driven interfaces and scalable cloud architecture.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={fadeUp(0.3)}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5 pt-4"
            >
              <Button size="lg" variant="accent" className="btn-premium w-full sm:w-auto text-white" as="a" href="/contact">
                Start a Conversation
              </Button>
              <Button size="lg" variant="outline" className="glass w-full sm:w-auto border-white/10 hover:border-white/20" as="a" href="/case-studies">
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side: Profile Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            className="w-full md:w-2/5 flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0"
          >
            <div className="relative group p-1 rounded-full bg-gradient-to-br from-accent/50 to-transparent">
              {/* Outer glowing ring */}
              <div className="absolute inset-0 bg-accent rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse"></div>
              
              <div className="relative overflow-hidden rounded-full p-2 bg-background/80 backdrop-blur-3xl">
                <img 
                  src={avatarSrc} 
                  alt="Avatar" 
                  className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
