import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('naval_auth_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('naval_auth_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.getProfile();
        setUser(response.data.user);
        setToken(storedToken);
      } catch (err) {
        console.warn('Session expired or invalid token:', err.message);
        localStorage.removeItem('naval_auth_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authApi.login({ email, password });
    const { user: loggedInUser, token: authToken } = response.data;
    
    localStorage.setItem('naval_auth_token', authToken);
    setToken(authToken);
    setUser(loggedInUser);
    return response;
  };

  const register = async (email, password) => {
    const response = await authApi.register({ email, password });
    const { user: registeredUser, token: authToken } = response.data;

    localStorage.setItem('naval_auth_token', authToken);
    setToken(authToken);
    setUser(registeredUser);
    return response;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn('Error clearing cookie on logout:', err.message);
    }
    localStorage.removeItem('naval_auth_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export { useAuth } from './useAuth';

