import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Briefcase, Code, UserCircle, LogOut, MessageSquare, Menu, BookOpen, X, ChevronRight } from 'lucide-react';

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Console', path: '/admin', icon: LayoutDashboard },
    { name: 'Profile', path: '/admin/about', icon: UserCircle },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Timeline', path: '/admin/experience', icon: BookOpen },
    { name: 'Inbox', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Header / Toggle */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 glass border-b border-white/5 z-50 flex items-center justify-between px-6">
        <span className="text-xl font-display font-bold text-gradient-accent">GA ARCHITECT</span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/5 text-white rounded-xl border border-white/10"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside className={`fixed md:relative flex flex-col w-72 h-screen bg-background border-r border-white/5 transition-all duration-500 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Brand Header */}
        <div className="p-8 pb-12">
          <Link to="/" className="group flex flex-col gap-1">
            <span className="text-2xl font-display font-black tracking-tight text-white group-hover:text-accent transition-colors">GA CONSOLE</span>
            <span className="text-[10px] font-mono font-medium tracking-[0.4em] text-white/20 uppercase">Core Management Layer</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto scrollbar-hide">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-[20px] transition-all duration-300 group ${isActive ? 'bg-accent/10 border border-accent/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={18} className={`${isActive ? 'text-accent' : 'text-current'} transition-colors duration-300`} />
                  <span className="text-sm font-display font-medium tracking-wide">{link.name}</span>
                </div>
                <ChevronRight size={14} className={`${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} transition-all duration-300`} />
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 mt-auto">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/2 border border-white/5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-[24px] transition-all duration-300 font-display font-medium text-sm overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <LogOut size={18} className="relative z-10" />
            <span className="relative z-10 uppercase tracking-[0.2em] text-[11px]">Terminate Session</span>
          </button>
        </div>
      </aside>
      
      {/* Global Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/90 backdrop-blur-md z-30 md:hidden animate-in fade-in duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
