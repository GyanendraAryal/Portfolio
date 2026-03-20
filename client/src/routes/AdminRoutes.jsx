import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageSkills from '../pages/admin/ManageSkills';
import ManageExperience from '../pages/admin/ManageExperience';
import ManageMessage from '../pages/admin/ManageMessage';
import AdminLogin from '../pages/admin/AdminLogin';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Login shouldn't be inside the AdminLayout with sidebar, so returning it directly vs wrapped handled above */}
      <Route path="login" element={user ? <Navigate to="/admin" /> : <AdminLogin />} />
      <Route path="/" element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
      <Route path="projects" element={user ? <ManageProjects /> : <Navigate to="/admin/login" />} />
      <Route path="skills" element={user ? <ManageSkills /> : <Navigate to="/admin/login" />} />
      <Route path="experience" element={user ? <ManageExperience /> : <Navigate to="/admin/login" />} />
      <Route path="messages" element={user ? <ManageMessage /> : <Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRoutes;
