import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../lib/animations/motionVariants';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Gyanendra didn't just write code; he architected a solution that solved our core business workflow problem. The dashboard is incredibly fast and intuitive.",
    author: "Sarah Jenkins",
    role: "Product Manager at TechFlow",
    initials: "SJ"
  },
  {
    quote: "Working with him was a breeze. He took our messy MVP and refactored it into a production-ready SaaS platform within a month. Highly recommended.",
    author: "Michael Chen",
    role: "Founder, DataSync UI",
    initials: "MC"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Technical <span className="text-gradient-accent">Legacy</span>
          </h2>
          <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto" />
        </motion.div>

        <motion.div 
          variants={staggerContainer(0.25, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp()}
              className="glass-card p-10 md:p-14 rounded-[40px] relative border border-white/5 hover:border-accent/10 transition-all duration-700 bg-white/2 group"
            >
              <Quote className="absolute top-10 right-10 text-white/5 group-hover:text-accent/5 transition-colors duration-700" size={100} />
              
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-light italic selection:bg-accent/30">
                  "{t.quote}"
                </p>
                
                <div className="mt-auto flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent font-display font-medium text-lg">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="text-white font-display font-medium text-lg">{t.author}</h5>
                    <p className="text-secondary/60 text-sm font-light tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
