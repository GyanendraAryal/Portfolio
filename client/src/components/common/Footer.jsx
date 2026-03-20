import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass mt-20 border-t-accent/20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-text/70">
              © {new Date().getFullYear()} Gyanendra Aryal. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-text/70 hover:text-accent transition-colors">
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-text/70 hover:text-accent transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-text/70 hover:text-accent transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter size={20} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
