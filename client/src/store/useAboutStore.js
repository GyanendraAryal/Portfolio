import { create } from 'zustand';
import aboutService from '../services/aboutService';

const useAboutStore = create((set) => ({
  about: null,
  loading: false,
  error: null,

  fetchAbout: async () => {
    set({ loading: true, error: null });
    try {
      const data = await aboutService.get();
      set({ about: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  updateAbout: async (aboutData) => {
    set({ loading: true, error: null });
    try {
      const updatedAbout = await aboutService.update(aboutData);
      set({ about: updatedAbout, loading: false });
      return updatedAbout;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
}));

export default useAboutStore;
