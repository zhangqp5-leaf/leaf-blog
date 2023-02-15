/**
 * 用于发送 HTTP 请求
 */

import { useState, useEffect } from 'react';

export const useFetch = (url: string, options?: RequestInit) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { response, error, loading };
};
