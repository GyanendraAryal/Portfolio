import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, hoverCard } from '../../../lib/animations/motionVariants';
import { MonitorPlay, LayoutDashboard, DatabaseZap } from 'lucide-react';

const services = [
  {
    title: 'MVP Development',
    description: 'Turn your idea into a market-ready product in weeks, not months. Full-cycle development from architecture to deployment.',
    icon: MonitorPlay,
    features: ['Rapid Prototyping', 'Scalable Architecture', 'User Authentication', 'Payment Integration']
  },
  {
    title: 'Dashboard Systems',
    description: 'Internal tools and customer-facing SaaS dashboards built with premium UI, data visualization, and complex state management.',
    icon: LayoutDashboard,
    features: ['Real-time Data', 'Complex Tables/Filters', 'Admin Portals', 'Data Vis']
  },
  {
    title: 'API & Backend Dev',
    description: 'Secure, high-performance REST APIs and microservices designed to scale with your business logic.',
    icon: DatabaseZap,
    features: ['REST/GraphQL', 'Database Design', 'Third-party Integrations', 'Performance Optimization']
  }
];

const Services = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">Core Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">How I can help you</h3>
        </motion.div>

        <motion.div 
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={service.title}
                variants={fadeUp()}
                whileHover={hoverCard.hover}
                initial={hoverCard.rest}
                className="glass-panel p-8 rounded-2xl flex flex-col h-full bg-surface/40 hover:bg-surface/60 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6 border border-accent/20 shadow-inner">
                  <Icon className="text-accent" size={24} />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-secondary leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-3 mt-auto pt-6 border-t border-border/50">
                  {service.features.map(feat => (
                    <li key={feat} className="flex items-center text-sm text-secondary/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mr-3"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
