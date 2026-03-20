import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import api from '../../api/api';
import Loader from '../../components/common/Loader';
import Button from '../../components/ui/Button';
import { Trash2, Edit } from 'lucide-react';

const ManageSkills = () => {
  const { data: skills, loading, refetch } = useFetch('/skills');
  const [formData, setFormData] = useState({ name: '', category: 'Frontend', proficiency: 80, iconUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  if (loading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/skills/${editId}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      setFormData({ name: '', category: 'Frontend', proficiency: 80, iconUrl: '' });
      setIsEditing(false);
      setEditId(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving skill');
    }
  };

  const handleEdit = (skill) => {
    setFormData(skill);
    setIsEditing(true);
    setEditId(skill._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        refetch();
      } catch (err) {
        alert('Error deleting skill');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Manage Skills</h1>
      
      <form onSubmit={handleSubmit} className="glass p-6 rounded-xl mb-8 space-y-4">
        <h2 className="text-lg font-bold text-white mb-4">{isEditing ? 'Edit Skill' : 'Add New Skill'}</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Skill Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
          <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input type="number" placeholder="Proficiency (0-100)" min="0" max="100" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
          <input type="text" placeholder="Icon URL (optional)" value={formData.iconUrl} onChange={e => setFormData({...formData, iconUrl: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" />
        </div>

        <div className="flex gap-4">
          <Button type="submit">{isEditing ? 'Update Skill' : 'Add Skill'}</Button>
          {isEditing && <Button type="button" variant="ghost" onClick={() => {setIsEditing(false); setFormData({ name: '', category: 'Frontend', proficiency: 80, iconUrl: '' })}}>Cancel</Button>}
        </div>
      </form>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface/50 border-b border-border text-text/70">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Proficiency</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills?.map((skill) => (
              <tr key={skill._id} className="border-b border-border/50 hover:bg-white/5">
                <td className="p-4 font-medium text-white">{skill.name}</td>
                <td className="p-4 text-sm text-accent">{skill.category}</td>
                <td className="p-4">{skill.proficiency}%</td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => handleEdit(skill)} className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {skills?.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-text/60">No skills found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSkills;
