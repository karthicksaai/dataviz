import { useState, useEffect } from 'react';

export const useCSVData = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const firstRow = data[0];
      setColumns(Object.keys(firstRow));
    } else {
      setColumns([]);
    }
  }, [data]);

  const handleSetData = (newData: any[]) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate network delay for better UX
      setTimeout(() => {
        setData(newData);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('An error occurred while processing the data.');
      setLoading(false);
      console.error('Data processing error:', err);
    }
  };

  return {
    data,
    columns,
    loading,
    error,
    setData: handleSetData
  };
};