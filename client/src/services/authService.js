import api from '../api/api';

const authService = {
  login: async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
  },
  
  register: async (username, password) => {
    const { data } = await api.post('/auth/register', { username, password });
    return data;
  },

  logout: () => {
    localStorage.removeItem('userInfo');
  },

  setUserInfo: (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },

  getUserInfo: () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
};

export default authService;
