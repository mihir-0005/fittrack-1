import { useState, useEffect } from 'react';
import { getProfile } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('googleToken');
        const userData = localStorage.getItem('userData');
        
        if (!token || !userData) {
          setIsAuthenticated(false);
          return;
        }

        const { googleId } = JSON.parse(userData);
        const response = await getProfile(googleId);
        
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, user, loading };
};