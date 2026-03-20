import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import DashboardStats from '../../components/admin/DashboardStats';
import Loader from '../../components/common/Loader';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../../animations/motionVariants';

const AdminDashboard = () => {
  const { data: projects, loading: pLoading } = useFetch('/projects');
  const { data: skills, loading: sLoading } = useFetch('/skills');
  const { data: messages, loading: mLoading } = useFetch('/messages');
  const { data: experiences, loading: eLoading } = useFetch('/experience');

  const isLoading = pLoading || sLoading || mLoading || eLoading;

  if (isLoading) return <Loader />;

  const stats = {
    projectsCount: projects?.length || 0,
    skillsCount: skills?.length || 0,
    messagesCount: messages?.length || 0,
    experienceCount: experiences?.length || 0,
  };

  const recentMessages = messages?.slice(0, 3) || [];

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={fadeIn()}
    >
      <div className="mb-8 mt-12 md:mt-0">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-text/70 mt-2">Welcome to your portfolio admin dashboard.</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Messages</h2>
            <Link to="/admin/messages" className="text-sm text-accent hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentMessages.length > 0 ? recentMessages.map(msg => (
              <div key={msg._id} className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-white">{msg.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${msg.isRead ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {msg.isRead ? 'Read' : 'New'}
                  </span>
                </div>
                <p className="text-sm text-text/70 line-clamp-2">{msg.message}</p>
              </div>
            )) : <p className="text-text/60 italic">No recent messages.</p>}
          </div>
        </div>

        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/projects" className="p-4 bg-surface rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-center">
              Add New Project
            </Link>
            <Link to="/admin/skills" className="p-4 bg-surface rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-center">
              Add New Skill
            </Link>
            <Link to="/admin/experience" className="p-4 bg-surface rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-center">
              Add Experience
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
