import { create } from 'zustand';
import experienceService from '../services/experienceService';

const useExperienceStore = create((set) => ({
  experiences: [],
  loading: false,
  error: null,

  fetchExperiences: async () => {
    set({ loading: true, error: null });
    try {
      const data = await experienceService.getAll();
      set({ experiences: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  addExperience: async (expData) => {
    set({ loading: true, error: null });
    try {
      const newExp = await experienceService.create(expData);
      set((state) => ({ 
        experiences: [...state.experiences, newExp], 
        loading: false 
      }));
      return newExp;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  updateExperience: async (id, expData) => {
    set({ loading: true, error: null });
    try {
      const updatedExp = await experienceService.update(id, expData);
      set((state) => ({
        experiences: state.experiences.map((e) => (e._id === id ? updatedExp : e)),
        loading: false,
      }));
      return updatedExp;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  deleteExperience: async (id) => {
    set({ loading: true, error: null });
    try {
      await experienceService.delete(id);
      set((state) => ({
        experiences: state.experiences.filter((e) => e._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
}));

export default useExperienceStore;
