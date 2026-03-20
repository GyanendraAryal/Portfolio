import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Briefcase, Code, UserCircle, LogOut, MessageSquare, Menu, BookOpen } from 'lucide-react';
import { useState } from 'react';

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Experience', path: '/admin/experience', icon: BookOpen },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-surface text-white rounded-lg border border-border"
        >
          <Menu size={24} />
        </button>
      </div>

      <aside className={`fixed md:relative flex flex-col w-64 h-full bg-surface border-r border-border transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold border-b border-border pb-4 text-gradient">GA. Admin</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-accent/20 text-accent border border-accent/20' : 'text-text/70 hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
