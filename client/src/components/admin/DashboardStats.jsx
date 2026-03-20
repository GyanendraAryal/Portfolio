import { Users, Briefcase, Code, MessageSquare, BookOpen } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="glass p-6 rounded-xl border-l-4 border-l-accent flex items-center justify-between">
      <div>
        <p className="text-text/70 font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-4 rounded-full bg-surface`}>
        <Icon size={24} className="text-accent" />
      </div>
    </div>
  );
};

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Projects" value={stats.projectsCount} icon={Briefcase} />
      <StatCard title="Total Skills" value={stats.skillsCount} icon={Code} />
      <StatCard title="Experiences" value={stats.experienceCount} icon={BookOpen} />
      <StatCard title="Messages" value={stats.messagesCount} icon={MessageSquare} />
    </div>
  );
};

export default DashboardStats;
