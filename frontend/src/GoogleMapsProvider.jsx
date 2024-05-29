import React, { createContext, FC, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ["maps", "visualization"]

const GoogleMapsContext = createContext({ isLoaded: false });

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_TOKEN, 
    libraries: libraries
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
