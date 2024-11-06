import React, { createContext, useState, useEffect } from 'react';
import { logoutService } from '../services/apiService';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = !!token;

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = async () => {
    await logoutService();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider};
