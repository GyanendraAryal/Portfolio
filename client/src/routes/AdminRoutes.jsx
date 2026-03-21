import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/layout/Loader';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ManageProjects = lazy(() => import('../pages/admin/ManageProjects'));
const ManageSkills = lazy(() => import('../pages/admin/ManageSkills'));
const ManageExperience = lazy(() => import('../pages/admin/ManageExperience'));
const ManageAbout = lazy(() => import('../pages/admin/ManageAbout'));
const ManageMessage = lazy(() => import('../pages/admin/ManageMessage'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    }>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="about" element={<ManageAbout />} />
        <Route path="messages" element={<ManageMessage />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
