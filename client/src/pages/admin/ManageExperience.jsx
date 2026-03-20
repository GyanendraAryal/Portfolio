import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import api from '../../api/api';
import Loader from '../../components/common/Loader';
import Button from '../../components/ui/Button';
import { Trash2, Edit } from 'lucide-react';

const ManageExperience = () => {
  const { data: experiences, loading, refetch } = useFetch('/experience');
  const [formData, setFormData] = useState({ title: '', company: '', startDate: '', endDate: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  if (loading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/experience/${editId}`, formData);
      } else {
        await api.post('/experience', formData);
      }
      setFormData({ title: '', company: '', startDate: '', endDate: '', description: '' });
      setIsEditing(false);
      setEditId(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving experience');
    }
  };

  const handleEdit = (exp) => {
    setFormData(exp);
    setIsEditing(true);
    setEditId(exp._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.delete(`/experience/${id}`);
        refetch();
      } catch (err) {
        alert('Error deleting experience');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Manage Experience</h1>
      
      <form onSubmit={handleSubmit} className="glass p-6 rounded-xl mb-8 space-y-4">
        <h2 className="text-lg font-bold text-white mb-4">{isEditing ? 'Edit Experience' : 'Add New Experience'}</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Job Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
          <input required type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Start Date (e.g. Jan 2020)" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
          <input required type="text" placeholder="End Date (e.g. Present)" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
        </div>

        <textarea required placeholder="Description (HTML supported)" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white h-24" />

        <div className="flex gap-4">
          <Button type="submit">{isEditing ? 'Update Experience' : 'Add Experience'}</Button>
          {isEditing && <Button type="button" variant="ghost" onClick={() => {setIsEditing(false); setFormData({ title: '', company: '', startDate: '', endDate: '', description: '' })}}>Cancel</Button>}
        </div>
      </form>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface/50 border-b border-border text-text/70">
            <tr>
              <th className="p-4">Role</th>
              <th className="p-4">Company</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences?.map((exp) => (
              <tr key={exp._id} className="border-b border-border/50 hover:bg-white/5">
                <td className="p-4 font-medium text-white">{exp.title}</td>
                <td className="p-4 text-accent">{exp.company}</td>
                <td className="p-4 text-sm text-text/80">{exp.startDate} - {exp.endDate}</td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => handleEdit(exp)} className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(exp._id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {experiences?.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-text/60">No experience found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageExperience;
