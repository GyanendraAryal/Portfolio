import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../lib/animations/motionVariants';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discover',
    description: 'We align on your business goals, target audience, and feature requirements to ensure a perfect technical fit.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Plan & Design',
    description: 'Structuring the database, mapping out API endpoints, and delivering high-fidelity UI/UX wireframes.',
    icon: PenTool,
  },
  {
    step: '03',
    title: 'Build',
    description: 'Writing scalable, clean, and tested code. You will get weekly progress updates and staging links.',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Deployment, final QA testing, and handing over the keys. I provide post-launch support to ensure stability.',
    icon: Rocket,
  }
];

const Process = () => {
  return (
    <section className="py-24 bg-surface/20 border-y border-border/30 relative">
      <div className="absolute inset-0 bg-background/50 pointer-events-none mix-blend-multiply"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:w-1/2"
        >
          <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">Workflow</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            A proven process <br className="hidden md:block" /> from idea to production.
          </h3>
        </motion.div>

        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.step} variants={fadeUp()} className="relative">
                {/* Visual connecting line for desktop */}
                {idx !== steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[28px] left-[60px] w-[calc(100%-20px)] h-[1px] bg-border/80" />
                )}
                
                <div className="h-14 w-14 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-6 relative z-10 shadow-lg">
                  <Icon className="text-white" size={24} />
                  <div className="absolute -top-3 -right-3 text-xs font-mono font-bold text-accent bg-accent/10 py-0.5 px-2 rounded-full border border-accent/20">
                    {item.step}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-secondary text-sm leading-relaxed pr-6">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
