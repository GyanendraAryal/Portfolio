import { create } from 'zustand';
import skillService from '../services/skillService';

const useSkillStore = create((set) => ({
  skills: [],
  loading: false,
  error: null,

  fetchSkills: async () => {
    set({ loading: true, error: null });
    try {
      const data = await skillService.getAll();
      set({ skills: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  addSkill: async (skillData) => {
    set({ loading: true, error: null });
    try {
      const newSkill = await skillService.create(skillData);
      set((state) => ({ 
        skills: [newSkill, ...state.skills], 
        loading: false 
      }));
      return newSkill;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  updateSkill: async (id, skillData) => {
    set({ loading: true, error: null });
    try {
      const updatedSkill = await skillService.update(id, skillData);
      set((state) => ({
        skills: state.skills.map((s) => (s._id === id ? updatedSkill : s)),
        loading: false,
      }));
      return updatedSkill;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  deleteSkill: async (id) => {
    set({ loading: true, error: null });
    try {
      await skillService.delete(id);
      set((state) => ({
        skills: state.skills.filter((s) => s._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
}));

export default useSkillStore;
