import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './app/layouts/MainLayout';
import Loader from './components/layout/Loader';

// Old Admin & Auth preserved
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './Layouts/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/admin/AdminLogin';

// Lazy load the new premium public routes
const Home = lazy(() => import('./app/routes/Home'));
const CaseStudies = lazy(() => import('./app/routes/CaseStudies'));

// For dedicated pages, we can just reuse the components we built wrapped in a div.
import ServicesComponent from './features/home/components/Services';
import ProcessComponent from './features/home/components/Process';
const Contact = lazy(() => import('./app/routes/Contact'));

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(10, 10, 15, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            fontSize: '14px',
            padding: '12px 20px',
            fontFamily: 'Outfit, sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader /></div>}>
        <Routes>
          {/* Public Routes - Wrapped in MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            
            <Route path="services" element={<div className="pt-20"><ServicesComponent /></div>} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="process" element={<div className="pt-20"><ProcessComponent /></div>} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="*" element={<AdminRoutes />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
