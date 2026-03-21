import api from '../api/api';

const messageService = {
  getAll: async () => {
    const { data } = await api.get('/messages');
    return data;
  },

  send: async (messageData) => {
    const { data } = await api.post('/messages', messageData);
    return data;
  },

  markAsRead: async (id) => {
    const { data } = await api.put(`/messages/${id}/read`);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/messages/${id}`);
    return data;
  }
};

export default messageService;
