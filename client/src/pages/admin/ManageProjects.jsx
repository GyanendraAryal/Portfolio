import { useState, useEffect } from 'react';
import useProjectStore from '../../store/useProjectStore';
import Button from '../../components/ui/Button';
import { Trash2, Edit, Plus, X, Link as LinkIcon, Github, Image as ImageIcon, Globe, Zap, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';

const ManageProjects = () => {
  const { projects, fetchProjects, addProject, updateProject, deleteProject, loading, error } = useProjectStore();
  const [formData, setFormData] = useState({ title: '', description: '', techStack: '', imageUrl: '', githubLink: '', liveLink: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map(s => s.trim()) : formData.techStack
    };

    try {
      if (isEditing) {
        await updateProject(editId, payload);
        toast.success('Artifact Synchronized Successfully');
      } else {
        await addProject(payload);
        toast.success('New Artifact Committed to Archive');
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      toast.error('Operation Failed: Review Console');
      console.error('Operation failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to purge this artifact?')) {
      try {
        await deleteProject(id);
        toast.success('Artifact Purged from Archive');
      } catch (err) {
        toast.error('Purge Sequence Failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: '', imageUrl: '', githubLink: '', liveLink: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      techStack: project.techStack.join(', ')
    });
    setIsEditing(true);
    setEditId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && projects.length === 0) return (
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
            Project <span className="text-gradient-accent">Archive</span>
          </h1>
          <p className="text-secondary/60 font-light text-lg">Manage and curate your technical artifacts.</p>
        </motion.div>
        
        <motion.div variants={fadeUp()}>
          <Button 
            onClick={() => { setShowForm(!showForm); if(!showForm) resetForm(); }}
            className="rounded-2xl px-8 flex items-center gap-2"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Close Interface' : 'New Artifact'}
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
                <h2 className="text-xl font-display font-medium text-white">{isEditing ? 'Modify Artifact' : 'Define New Artifact'}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Title</label>
                  <input required type="text" placeholder="Project name" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Visual URI</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input required type="text" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Narrative</label>
                <textarea required placeholder="Technical breakdown..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none transition-all h-40 resize-none" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Stack Dependencies (Comma separated)</label>
                <input type="text" placeholder="React, Node.js, AWS..." value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Source Repository</label>
                  <div className="relative">
                    <Github className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input type="text" placeholder="GitHub link" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-medium tracking-widest text-white/30 uppercase ml-1">Deployment URI</label>
                  <div className="relative">
                    <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input type="text" placeholder="Live link" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <Button type="submit" className="px-10 py-4 rounded-[20px]">{isEditing ? 'Synchronize Data' : 'Commit Artifact'}</Button>
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
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">Artifact Metadata</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase hidden md:table-cell">Architecture Stack</th>
                <th className="p-8 text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects?.map((project) => (
                <tr key={project._id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-20 rounded-xl overflow-hidden border border-white/10 hidden sm:block shrink-0">
                        <img src={project.imageUrl} alt="" className="h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>
                      <div>
                        <span className="block font-display font-medium text-white group-hover:text-accent transition-colors text-lg">{project.title}</span>
                        <div className="flex items-center gap-4 mt-1">
                          {project.githubLink && <a href={project.githubLink} target="_blank" className="text-white/20 hover:text-white transition-colors"><Github size={14} /></a>}
                          {project.liveLink && <a href={project.liveLink} target="_blank" className="text-white/20 hover:text-white transition-colors"><Globe size={14} /></a>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 hidden md:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-3 py-1 text-[10px] font-mono text-secondary/60 bg-white/5 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                          {tech}
                        </span>
                      ))}
                      {project.techStack?.length > 3 && <span className="text-[10px] font-mono text-white/20">+{project.techStack.length - 3} move</span>}
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleEdit(project)} className="h-10 w-10 flex border border-white/5 items-center justify-center rounded-xl bg-white/2 text-white/40 hover:text-white hover:bg-white/10 transition-all"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(project._id)} className="h-10 w-10 border border-white/5 flex items-center justify-center rounded-xl bg-white/2 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects?.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-secondary/20">
                      <Archive size={48} strokeWidth={1} />
                      <p className="italic font-light">The archive is currently empty.</p>
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

export default ManageProjects;
