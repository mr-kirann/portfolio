import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // First check localStorage for user data
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Verify token with backend
      const response = await authAPI.verify();
      
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        // Token is invalid, clear local data
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear local data if verification fails
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Attempting login...');
      const response = await authAPI.login(credentials);
      
      if (response.data.success) {
        console.log('AuthContext: Login successful, storing token...');
        
        // Store in localStorage first
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Verify storage
        const storedToken = localStorage.getItem('auth_token');
        console.log('AuthContext: Token stored?', storedToken ? 'Yes' : 'No');
        
        // Update state
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        return { success: true, user: response.data.user };
      } else {
        console.error('AuthContext: Login failed -', response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local data regardless of backend response
      clearAuthData();
    }
  };

  const clearAuthData = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
