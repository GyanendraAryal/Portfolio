import { useEffect } from 'react';
import useProjectStore from '../../store/useProjectStore';
import useSkillStore from '../../store/useSkillStore';
import useMessageStore from '../../store/useMessageStore';
import useExperienceStore from '../../store/useExperienceStore';
import DashboardStats from '../../components/admin/DashboardStats';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';
import { ChevronRight, ArrowUpRight, Zap, Target, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const { projects, fetchProjects, loading: pLoading } = useProjectStore();
  const { skills, fetchSkills, loading: sLoading } = useSkillStore();
  const { messages, fetchMessages, loading: mLoading } = useMessageStore();
  const { experiences, fetchExperiences, loading: eLoading } = useExperienceStore();

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchMessages();
    fetchExperiences();
  }, [fetchProjects, fetchSkills, fetchMessages, fetchExperiences]);

  const isLoading = (pLoading && projects.length === 0) || 
                  (sLoading && skills.length === 0) || 
                  (mLoading && messages.length === 0) || 
                  (eLoading && experiences.length === 0);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );

  const stats = {
    projectsCount: projects?.length || 0,
    skillsCount: skills?.length || 0,
    messagesCount: messages?.length || 0,
    experienceCount: experiences?.length || 0,
  };

  const recentMessages = messages?.slice(0, 4) || [];

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.2, 0.1)}
      className="space-y-12"
    >
      <motion.div variants={fadeUp()} className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          System <span className="text-gradient-accent">Overview</span>
        </h1>
        <p className="text-secondary/60 font-light text-lg">Central command for your digital ecosystem.</p>
      </motion.div>

      <DashboardStats stats={stats} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Intel (Messages) */}
        <motion.div variants={fadeUp()} className="lg:col-span-2 glass-card rounded-[40px] border border-white/5 overflow-hidden flex flex-col">
          <div className="p-8 pb-4 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <Mail className="text-accent" size={20} />
              <h2 className="text-xl font-display font-medium text-white">Recent Intel</h2>
            </div>
            <Link to="/admin/messages" className="group flex items-center gap-2 text-[10px] font-mono font-medium tracking-widest text-accent uppercase">
              Full Archive <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-4 space-y-3 flex-grow">
            {recentMessages.length > 0 ? recentMessages.map(msg => (
              <div key={msg._id} className="p-6 bg-white/2 hover:bg-white/5 rounded-[24px] border border-white/5 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="block font-display font-medium text-white group-hover:text-accent transition-colors">{msg.name}</span>
                    <span className="text-[10px] font-mono text-white/30">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-3 py-1 rounded-full border ${msg.isRead ? 'bg-green-500/5 text-green-400 border-green-500/10' : 'bg-accent/5 text-accent border-accent/20 animate-pulse'}`}>
                    {msg.isRead ? 'SYNCED' : 'UNREAD'}
                  </span>
                </div>
                <p className="text-sm font-light text-secondary/70 line-clamp-1 leading-relaxed">{msg.message}</p>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-20 text-secondary/30 gap-4">
                <Target size={40} strokeWidth={1} />
                <p className="italic font-light">No new intelligence detected.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Rapid Actions */}
        <motion.div variants={fadeUp()} className="space-y-6">
          <div className="glass-card rounded-[40px] border border-white/5 p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-accent" size={20} />
              <h2 className="text-xl font-display font-medium text-white">Rapid Actions</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Append Artifact', path: '/admin/projects', color: 'bg-accent' },
                { label: 'Inject Capability', path: '/admin/skills', color: 'bg-primary' },
                { label: 'Register Milestone', path: '/admin/experience', color: 'bg-white/5' },
              ].map((action) => (
                <Link 
                  key={action.label}
                  to={action.path} 
                  className="group flex items-center justify-between p-6 bg-white/2 hover:bg-white/5 rounded-[24px] border border-white/5 transition-all text-sm font-mono font-medium text-white/70 hover:text-white"
                >
                  <span className="uppercase tracking-[0.2em]">{action.label}</span>
                  <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                    <ArrowUpRight size={14} className="group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
