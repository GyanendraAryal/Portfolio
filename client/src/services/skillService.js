import api from '../api/api';

const skillService = {
  getAll: async () => {
    const { data } = await api.get('/skills');
    return data;
  },

  create: async (skillData) => {
    const { data } = await api.post('/skills', skillData);
    return data;
  },

  update: async (id, skillData) => {
    const { data } = await api.put(`/skills/${id}`, skillData);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/skills/${id}`);
    return data;
  }
};

export default skillService;
