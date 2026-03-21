import { create } from 'zustand';
import messageService from '../services/messageService';

const useMessageStore = create((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const data = await messageService.getAll();
      set({ messages: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  sendMessage: async (msgData) => {
    set({ loading: true, error: null });
    try {
      const response = await messageService.send(msgData);
      set({ loading: false });
      return response;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },

  markAsRead: async (id) => {
    try {
      await messageService.markAsRead(id);
      set((state) => ({
        messages: state.messages.map((m) => (m._id === id ? { ...m, isRead: true } : m)),
      }));
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  },

  deleteMessage: async (id) => {
    set({ loading: true, error: null });
    try {
      await messageService.delete(id);
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      throw err;
    }
  },
}));

export default useMessageStore;
