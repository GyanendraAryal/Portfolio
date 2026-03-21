import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Process', path: '/process' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-500',
      isScrolled ? 'py-4' : 'py-6'
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={cn(
          'flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500',
          isScrolled ? 'glass border-white/5 shadow-2xl' : 'bg-transparent border-transparent'
        )}>
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold tracking-tight z-50 group">
            <span className="text-white group-hover:text-accent transition-colors duration-300">Gyanendra</span>
            <span className="text-accent group-hover:text-white transition-colors duration-300">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                    isActive ? 'text-white bg-white/10' : 'text-secondary hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <div className="hidden md:block">
              <Button variant="accent" size="sm" className="btn-premium px-5 py-2 text-white" as="a" href="/contact">
                Let's Talk
              </Button>
            </div>
            
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-primary transition-all active:scale-90"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[85%] left-6 right-6 glass p-6 rounded-2xl flex flex-col gap-2 md:hidden overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {links.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'text-lg font-medium transition-all p-3 rounded-xl flex items-center justify-between',
                      isActive ? 'text-white bg-white/10' : 'text-secondary hover:bg-white/5'
                    )}
                  >
                    {link.name}
                    {isActive && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 }}
              className="pt-4 border-t border-white/10 mt-2"
            >
              <Button variant="accent" className="w-full btn-premium text-white" as="a" href="/contact">Let's Talk</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
