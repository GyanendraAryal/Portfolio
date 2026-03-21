import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-accent/30">
      <Navbar />
      <main className="flex-grow flex flex-col pt-24 pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
