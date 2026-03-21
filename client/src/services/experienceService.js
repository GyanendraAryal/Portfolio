import api from '../api/api';

const experienceService = {
  getAll: async () => {
    const { data } = await api.get('/experience');
    return data;
  },

  create: async (experienceData) => {
    const { data } = await api.post('/experience', experienceData);
    return data;
  },

  update: async (id, experienceData) => {
    const { data } = await api.put(`/experience/${id}`, experienceData);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/experience/${id}`);
    return data;
  }
};

export default experienceService;
