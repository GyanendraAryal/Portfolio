import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = authService.getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      setUser(data);
      authService.setUserInfo(data);
      toast.success('Session Initialized: Welcome, Architect');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Authentication Failed';
      toast.error(message);
      return { 
        success: false, 
        message
      };
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
    toast.success('Session Terminated Safely');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
