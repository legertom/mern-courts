// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const signIn = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const signOut = (navigate) => {
    localStorage.removeItem('token');
    setToken(null)
    setIsAuthenticated(false);
    if(navigate) {
      navigate('/');
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    signOut,
  };

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, signIn, signOut }}>{children}</AuthContext.Provider>;
};

