import api from '../api/api';

const projectService = {
  getAll: async () => {
    const { data } = await api.get('/projects');
    return data;
  },

  create: async (projectData) => {
    const { data } = await api.post('/projects', projectData);
    return data;
  },

  update: async (id, projectData) => {
    const { data } = await api.put(`/projects/${id}`, projectData);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },

  uploadImage: async (formData) => {
    const { data } = await api.post('/projects/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
};

export default projectService;
