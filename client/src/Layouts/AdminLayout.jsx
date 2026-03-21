import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-background text-white font-display">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <span className="tracking-[0.4em] text-xs uppercase text-accent animate-pulse">Authenticating</span>
      </div>
    </div>
  );

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Global background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.03),transparent_100%)] pointer-events-none" />
      
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto relative z-10 scrollbar-hide pt-20 md:pt-0">
        <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
