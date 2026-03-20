import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import Loader from '../components/common/Loader';

const AdminLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
