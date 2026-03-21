import { useState, useEffect } from 'react';
import useSkillStore from '../../store/useSkillStore';
import Button from '../../components/ui/Button';
import { Trash2, Edit, Plus, X, Zap, Cpu, Layers, Terminal, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';

const ManageSkills = () => {
  const { skills, fetchSkills, addSkill, updateSkill, deleteSkill, loading } = useSkillStore();
  const [formData, setFormData] = useState({ name: '', category: 'Frontend', proficiency: 80, iconUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateSkill(editId, formData);
        toast.success('Capability Calibrated Successfully');
      } else {
        await addSkill(formData);
        toast.success('New Capability Injected into Matrix');
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      toast.error('Calibration Failed: Review Console');
      console.error('Operation failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to purge this capability?')) {
      try {
        await deleteSkill(id);
        toast.success('Capability Purged from Matrix');
      } catch (err) {
        toast.error('Purge Sequence Failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: 'Frontend', proficiency: 80, iconUrl: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (skill) => {
    setFormData(skill);
    setIsEditing(true);
    setEditId(skill._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && skills.length === 0) return (
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
            Skill <span className="text-gradient-accent">Matrix</span>
          </h1>
          <p className="text-secondary/60 font-light text-lg">Define and calibrate your technical capabilities.</p>
        </motion.div>
        
        <motion.div variants={fadeUp()}>
          <Button 
            onClick={() => { setShowForm(!showForm); if(!showForm) resetForm(); }}
            className="rounded-2xl px-8 flex items-center gap-2"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Close Interface' : 'New Capability'}
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
                <h2 className="text-xl font-display font-medium text-white">{isEditing ? 'Calibrate Capability' : 'Inject New Capability'}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Capability Name</label>
                  <div className="relative">
                    <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input required type="text" placeholder="e.g. Distributed Systems" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Layer / Category</label>
                  <div className="relative">
                    <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white outline-none transition-all appearance-none cursor-pointer">
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Tools">Tools</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Proficiency Level ({formData.proficiency}%)</label>
                  <div className="flex items-center gap-6">
                    <input type="range" min="0" max="100" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value})} className="flex-1 h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-accent" />
                    <span className="text-accent font-mono font-bold w-12 text-right">{formData.proficiency}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Icon Identifier (External)</label>
                  <div className="relative">
                    <Box className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input type="text" placeholder="https://..." value={formData.iconUrl} onChange={e => setFormData({...formData, iconUrl: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <Button type="submit" className="px-10 py-4 rounded-[20px]">{isEditing ? 'Calibrate' : 'Initialize'}</Button>
                {isEditing && (
                  <Button type="button" variant="ghost" className="px-10 py-4 rounded-[20px] border border-white/5 hover:bg-white/5" onClick={() => { setShowForm(false); resetForm(); }}>
                    Cancel
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
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">Capability</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">Layer</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">Readiness</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {skills?.map((skill) => (
                <tr key={skill._id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      {skill.iconUrl ? (
                        <img src={skill.iconUrl} alt="" className="h-8 w-8 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      ) : (
                        <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <Cpu size={14} className="text-white/20" />
                        </div>
                      )}
                      <span className="font-display font-medium text-white group-hover:text-accent transition-colors text-lg">{skill.name}</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-white/5 bg-white/2 text-secondary/60 group-hover:border-accent/20 group-hover:text-accent transition-all">
                      {skill.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-4 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          className="h-full bg-accent"
                        />
                      </div>
                      <span className="text-xs font-mono text-white/40">{skill.proficiency}%</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleEdit(skill)} className="h-10 w-10 flex border border-white/5 items-center justify-center rounded-xl bg-white/2 text-white/40 hover:text-white hover:bg-white/10 transition-all"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(skill._id)} className="h-10 w-10 border border-white/5 flex items-center justify-center rounded-xl bg-white/2 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {skills?.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <p className="italic font-light text-secondary/20">The capability matrix is currently offline.</p>
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

export default ManageSkills;
