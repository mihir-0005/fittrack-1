import { useState, useEffect } from 'react';
import { fetchFitnessData } from '../services/googleFit';

export const useFitnessData = () => {
  const [fitnessData, setFitnessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFitnessData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('googleToken');
      if (!token) throw new Error('No authentication token found');
      
      const data = await fetchFitnessData(token);
      setFitnessData(data);
    } catch (err) {
      setError('Failed to load fitness data');
      console.error('Error loading fitness data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFitnessData();
  }, []);

  return { fitnessData, loading, error, refresh: loadFitnessData };
};