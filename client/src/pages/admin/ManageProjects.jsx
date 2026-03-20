import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import api from '../../api/api';
import Loader from '../../components/common/Loader';
import Button from '../../components/ui/Button';
import { Trash2, Edit } from 'lucide-react';

const ManageProjects = () => {
  const { data: projects, loading, refetch } = useFetch('/projects');
  const [formData, setFormData] = useState({ title: '', description: '', techStack: '', imageUrl: '', githubLink: '', liveLink: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  if (loading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim())
    };

    try {
      if (isEditing) {
        await api.put(`/projects/${editId}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setFormData({ title: '', description: '', techStack: '', imageUrl: '', githubLink: '', liveLink: '' });
      setIsEditing(false);
      setEditId(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      techStack: project.techStack.join(', ')
    });
    setIsEditing(true);
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        refetch();
      } catch (err) {
        alert('Error deleting project');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Manage Projects</h1>
      
      <form onSubmit={handleSubmit} className="glass p-6 rounded-xl mb-8 space-y-4">
        <h2 className="text-lg font-bold text-white mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
          <input required type="text" placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
        </div>
        
        <textarea required placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white h-24" />
        
        <input type="text" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
        
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="GitHub Link" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
          <input type="text" placeholder="Live Link" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
        </div>

        <div className="flex gap-4">
          <Button type="submit">{isEditing ? 'Update Project' : 'Add Project'}</Button>
          {isEditing && <Button type="button" variant="ghost" onClick={() => {setIsEditing(false); setFormData({ title: '', description: '', techStack: '', imageUrl: '', githubLink: '', liveLink: '' })}}>Cancel</Button>}
        </div>
      </form>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface/50 border-b border-border text-text/70">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Tech Stack</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project._id} className="border-b border-border/50 hover:bg-white/5">
                <td className="p-4 font-medium text-white">{project.title}</td>
                <td className="p-4 text-sm text-text/80">{project.techStack?.join(', ')}</td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => handleEdit(project)} className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {projects?.length === 0 && <tr><td colSpan="3" className="p-4 text-center text-text/60">No projects found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProjects;
