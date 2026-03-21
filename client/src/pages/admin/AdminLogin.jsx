import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';
import Button from '../../components/ui/Button';
import { ShieldCheck, Lock, User, AlertCircle, Zap, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.message || 'Authentication sequence failed.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('System core unreachable. Check protocols.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[140px] animate-pulse [animation-delay:2s]" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <motion.div 
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        animate="show"
        className="w-full max-w-lg relative z-10"
      >
        <motion.div variants={fadeUp()} className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-[28px] bg-white/5 border border-white/10 mb-8 relative group">
            <div className="absolute inset-0 bg-accent rounded-[28px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <ShieldCheck className="text-accent relative z-10" size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-display font-black text-white tracking-tighter mb-4">
            Security <span className="text-gradient-accent">Override</span>
          </h1>
          <p className="text-secondary/50 font-mono text-[10px] uppercase tracking-[0.4em]">Authorized Personnel Only</p>
        </motion.div>

        <motion.div 
          variants={fadeUp()}
          className="glass-card p-10 md:p-14 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden bg-white/2"
        >
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0, scale: 0.95 }}
                animate={{ height: 'auto', opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 0.95 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-red-500/5 text-red-500 border border-red-500/10 p-6 rounded-3xl text-[11px] font-mono flex items-center gap-4">
                  <ShieldAlert size={18} className="shrink-0" />
                  <span className="uppercase tracking-widest leading-relaxed">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.3em] ml-1">Identity Identifier</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-[24px] pl-16 pr-8 py-5 text-white placeholder:text-white/10 outline-none transition-all font-light"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.3em] ml-1">Access Cipher</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-[24px] pl-16 pr-8 py-5 text-white placeholder:text-white/10 outline-none transition-all font-light"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full py-6 rounded-[24px] text-[12px] font-mono font-black uppercase tracking-[0.4em] group"
                disabled={isSubmitting}
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Execute Authorization <Zap size={14} className="group-hover:scale-125 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          variants={fadeUp()}
          className="mt-12 text-center"
        >
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] font-mono text-white/30 hover:text-white transition-colors uppercase tracking-[0.4em]"
          >
            ← Return to Public Terminal
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
