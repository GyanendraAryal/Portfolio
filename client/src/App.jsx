import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import AdminLayout from './Layouts/AdminLayout';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route path="*" element={<PublicRoutes />} />
      </Route>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
