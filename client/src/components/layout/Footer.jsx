import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background pt-20 pb-10 mt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="glow-mesh bottom-[-20%] left-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="text-2xl font-display font-bold tracking-tight inline-block">
              <span className="text-white">Gyanendra</span>
              <span className="text-accent">Aryal</span>
            </Link>
            <p className="text-secondary max-w-sm text-base leading-relaxed font-light">
              Designing and building robust digital architectures for the next generation of web applications. Focused on performance, scalability, and minimalist UI.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: <Github size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <h3 className="font-display font-medium mb-6 text-sm tracking-widest text-white/40 uppercase">Navigation</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: 'Services', path: '/services' },
                { name: 'Case Studies', path: '/case-studies' },
                { name: 'Process', path: '/process' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-secondary hover:text-white transition-all flex items-center group">
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <h3 className="font-display font-medium mb-6 text-sm tracking-widest text-white/40 uppercase">Utilities</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/admin/login" className="text-secondary hover:text-white transition-all">Admin Gateway</Link></li>
              <li><a href="#" className="text-secondary hover:text-white transition-all">Documentation</a></li>
              <li><a href="#" className="text-secondary hover:text-white transition-all">System Status</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/30">
          <p>© {new Date().getFullYear()} Gyanendra Aryal. Engineered for Excellence.</p>
          <p className="mt-4 md:mt-0 italic">Code. Design. Scale.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
