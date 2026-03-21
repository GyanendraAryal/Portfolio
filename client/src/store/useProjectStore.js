import { create } from 'zustand';
import projectService from '../services/projectService';

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const data = await projectService.getAll();
      set({ projects: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  addProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const newProject = await projectService.create(projectData);
      set((state) => ({ 
        projects: [newProject, ...state.projects], 
        loading: false 
      }));
      return newProject;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  updateProject: async (id, projectData) => {
    set({ loading: true, error: null });
    try {
      const updatedProject = await projectService.update(id, projectData);
      set((state) => ({
        projects: state.projects.map((p) => (p._id === id ? updatedProject : p)),
        loading: false,
      }));
      return updatedProject;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await projectService.delete(id);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
}));

export default useProjectStore;
