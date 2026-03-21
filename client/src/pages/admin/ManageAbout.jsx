import { useState, useEffect } from 'react';
import api from '../../api/api';
import Button from '../../components/ui/Button';
import { Save, User, Mail, FileText, Globe, Zap, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';

const ManageAbout = () => {
  const [formData, setFormData] = useState({ content: '', avatarUrl: '', resumeUrl: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await api.get('/about');
      if (data) {
        setFormData({
          content: data.content || '',
          avatarUrl: data.avatarUrl || '',
          resumeUrl: data.resumeUrl || '',
          email: data.email || ''
        });
      }
    } catch (error) {
      toast.error('Failed to load system identity.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await api.put('/about', formData);
      toast.success('Identity Parameters Synchronized');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Synchronization Failure');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.2, 0.1)}
      className="space-y-12"
    >
      <motion.div variants={fadeUp()} className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          System <span className="text-gradient-accent">Identity</span>
        </h1>
        <p className="text-secondary/60 font-light text-lg">Configure the core parameters of your digital persona.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[40px] border border-white/5 space-y-10 bg-white/2">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-accent" size={20} />
          <h2 className="text-xl font-display font-medium text-white">Identity Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-medium tracking-[0.2em] text-white/30 uppercase ml-1">Avatar Source URI</label>
              <div className="relative">
                <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="text" 
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono font-medium tracking-[0.2em] text-white/30 uppercase ml-1">Contact Protocol (Email)</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-white/2 border border-white/5 rounded-[32px] group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-white/10 relative z-10 group-hover:border-accent/40 transition-colors">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Preview" className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                ) : (
                  <div className="h-full w-full bg-white/5 flex items-center justify-center">
                    <User size={40} className="text-white/10" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-[10px] font-mono text-white/20 mt-6 tracking-widest uppercase">Visual Identity Preview</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-mono font-medium tracking-[0.2em] text-white/30 uppercase ml-1">Archive URI (Resume / CV)</label>
          <div className="relative">
            <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="Google Drive / Dropbox / PDF link"
              className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-mono font-medium tracking-[0.2em] text-white/30 uppercase ml-1">Professional Narrative (HTML Supported)</label>
          <div className="relative">
            <FileText className="absolute left-6 top-6 text-white/20" size={18} />
            <textarea 
              name="content"
              rows="8"
              value={formData.content}
              onChange={handleChange}
              placeholder="Inject your expertise narrative here..."
              className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-3xl pl-14 pr-6 py-6 text-white placeholder:text-white/10 outline-none transition-all resize-none font-light leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-end">
          <Button 
            type="submit" 
            disabled={saving}
            className="rounded-2xl px-12 py-4 flex items-center gap-3 transition-transform hover:scale-105"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? 'Synchronizing...' : 'Synchronize Identity'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ManageAbout;
