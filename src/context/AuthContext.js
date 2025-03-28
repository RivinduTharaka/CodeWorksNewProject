import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { login, validateToken } from '../services/authService';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user information
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status
  const [loading, setLoading] = useState(true); // Tracks loading state for session validation
  const location = useLocation(); // Get current path

  // Function to log in a user
  const handleLogin = async (username, password) => {
    try {
      const userData = await login(username, password); // Expecting { token, username, role }
      if (!userData.token) {
        throw new Error('No token received from login');
      }

      // Store token in localStorage explicitly
      localStorage.setItem('authToken', userData.token);

      // Set user state with username and role
      const userInfo = { username: userData.username, role: userData.role };
      setUser(userInfo);
      setIsAuthenticated(true);

      // Save user info in localStorage for session persistence
      localStorage.setItem('user', JSON.stringify(userInfo));

      return userData.token; // Return token for AutoLogin compatibility
    } catch (error) {
      console.error('Login failed:', error.message);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      throw error;
    }
  };



  // Function to validate the user's session
  const validateSession = async () => {
    if (location.pathname === '/') {
      setLoading(false); // Skip validation on login page
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const data = await validateToken(token); // Pass token explicitly if required by service
      setUser({ username: data.username, role: data.role });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Session validation failed:', error.message);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // Validate session on app load or path change
  useEffect(() => {
    validateSession();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleLogin,
        loading,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;