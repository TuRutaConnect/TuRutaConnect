import React, { createContext, useContext, useState, useEffect } from 'react';
import mapData from '../data/mapData.json';

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [data, setData] = useState({
    center: [8.535, -82.842],
    zoom: 13,
    categoryStyles: {},
    locations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Loading directly from imported JSON
        setData(mapData); git
        setError(null);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('No se pudo cargar la información de la región.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LocationsContext.Provider value={{ ...data, loading, error }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationsProvider');
  }
  return context;
};
