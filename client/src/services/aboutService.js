import api from '../api/api';

const aboutService = {
  get: async () => {
    const { data } = await api.get('/about');
    return data;
  },

  update: async (aboutData) => {
    const { data } = await api.put('/about', aboutData);
    return data;
  }
};

export default aboutService;
