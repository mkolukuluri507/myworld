import { useState, useEffect } from 'react';

/**
 * Custom hook for API calls with loading and error states
 */
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.detail || err.message || 'An error occurred');
          console.error('useApi error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const retry = () => {
    setLoading(true);
    setError(null);
    // Re-trigger the useEffect
    setData(null);
  };

  return { data, loading, error, retry };
};

/**
 * Custom hook for API mutations (POST, PUT, DELETE)
 */
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const mutate = async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiFunction(...args);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { mutate, loading, error, success, reset };
};

export default useApi;