import { useState, useEffect } from 'react';
import useExperienceStore from '../../store/useExperienceStore';
import Button from '../../components/ui/Button';
import { Trash2, Edit, Plus, X, Briefcase, Calendar, MapPin, Zap, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';

const ManageExperience = () => {
  const { experiences, fetchExperiences, addExperience, updateExperience, deleteExperience, loading } = useExperienceStore();
  const [formData, setFormData] = useState({ title: '', company: '', startDate: '', endDate: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateExperience(editId, formData);
        toast.success('Milestone Synchronized Successfully');
      } else {
        await addExperience(formData);
        toast.success('New Milestone Recorded in Journey');
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      toast.error('Operation Failed: Review Console');
      console.error('Operation failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to purge this milestone?')) {
      try {
        await deleteExperience(id);
        toast.success('Milestone Purged from Journey');
      } catch (err) {
        toast.error('Purge Sequence Failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', company: '', startDate: '', endDate: '', description: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (exp) => {
    setFormData(exp);
    setIsEditing(true);
    setEditId(exp._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && experiences.length === 0) return (
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={fadeUp()} className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            Journey <span className="text-gradient-accent">Milestones</span>
          </h1>
          <p className="text-secondary/60 font-light text-lg">Document your professional evolution and impact.</p>
        </motion.div>
        
        <motion.div variants={fadeUp()}>
          <Button 
            onClick={() => { setShowForm(!showForm); if(!showForm) resetForm(); }}
            className="rounded-2xl px-8 flex items-center gap-2"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Close Interface' : 'New Milestone'}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-[32px] border border-white/5 space-y-8 bg-white/2">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-accent" size={20} />
                <h2 className="text-xl font-display font-medium text-white">{isEditing ? 'Modify Milestone' : 'Record New Milestone'}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Professional Role</label>
                  <div className="relative">
                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input required type="text" placeholder="e.g. Senior Architect" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Organization / Entity</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input required type="text" placeholder="Company name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Temporal Start</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input required type="text" placeholder="Jan 2022" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Temporal End</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input required type="text" placeholder="Present (or Date)" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Core Contributions & Impact (HTML supported)</label>
                <textarea required placeholder="Outline key achievements..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none transition-all h-40 resize-none font-light leading-relaxed" />
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <Button type="submit" className="px-10 py-4 rounded-[20px]">{isEditing ? 'Synchronize' : 'Commit'}</Button>
                {isEditing && (
                  <Button type="button" variant="ghost" className="px-10 py-4 rounded-[20px] border border-white/5 hover:bg-white/5" onClick={() => { setShowForm(false); resetForm(); }}>
                    Abort
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp()} className="glass-card rounded-[40px] border border-white/5 overflow-hidden bg-white/2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">Professional Status</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase hidden md:table-cell">Temporal Range</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {experiences?.map((exp) => (
                <tr key={exp._id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex flex-col">
                      <span className="font-display font-medium text-white group-hover:text-accent transition-colors text-lg italic">{exp.title}</span>
                      <span className="text-secondary/60 font-light mt-1 flex items-center gap-2">
                        <MapPin size={12} className="text-accent" /> {exp.company}
                      </span>
                    </div>
                  </td>
                  <td className="p-8 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                      <Calendar size={12} />
                      {exp.startDate} — {exp.endDate}
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleEdit(exp)} className="h-10 w-10 flex border border-white/5 items-center justify-center rounded-xl bg-white/2 text-white/40 hover:text-white hover:bg-white/10 transition-all"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(exp._id)} className="h-10 w-10 border border-white/5 flex items-center justify-center rounded-xl bg-white/2 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {experiences?.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-secondary/20">
                      <BookOpen size={48} strokeWidth={1} />
                      <p className="italic font-light">The journey has no recorded milestones yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManageExperience;
