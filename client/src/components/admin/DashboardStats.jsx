import { Briefcase, Code, MessageSquare, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/animations/motionVariants';

const StatCard = ({ title, value, icon: Icon, delay }) => {
  return (
    <motion.div 
      variants={fadeUp()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-8 rounded-[32px] border border-white/5 hover:border-accent/20 transition-all duration-500 bg-white/2 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} strokeWidth={1} />
      </div>
      
      <div className="relative z-10">
        <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon size={22} className="text-accent" />
        </div>
        <p className="text-[10px] font-mono font-medium tracking-[0.3em] text-white/30 uppercase mb-2">{title}</p>
        <h3 className="text-4xl font-display font-medium text-white tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
};

const DashboardStats = ({ stats }) => {
  const cards = [
    { title: "Artifacts", value: stats.projectsCount, icon: Briefcase },
    { title: "Capabilities", value: stats.skillsCount, icon: Code },
    { title: "Milestones", value: stats.experienceCount, icon: BookOpen },
    { title: "Intelligence", value: stats.messagesCount, icon: MessageSquare },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
      {cards.map((card, idx) => (
        <StatCard key={card.title} {...card} delay={idx * 0.1} />
      ))}
    </div>
  );
};

export default DashboardStats;
