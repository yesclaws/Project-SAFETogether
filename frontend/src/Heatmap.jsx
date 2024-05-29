import React, {useState, useEffect } from 'react';
import { GoogleMap,HeatmapLayerF } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsProvider';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '91vh'
};

const center = {
  lat: 1.2966,
  lng: 103.7764,
};

function Map() {
  const { isLoaded } = useGoogleMaps()
  const [map, setMap] = React.useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/incidents/incidents');
      const rawData = JSON.parse(response.data);

      if (Array.isArray(rawData)) {
        const formattedData = rawData.map(incident => ({
          lat: parseFloat(incident.lat) || 0,
          lng: parseFloat(incident.lon) || 0,
        }));
        console.log('Formatted Data:', formattedData);
        setHeatmapData(formattedData);
      } else if (typeof rawData === 'object') {
        const formattedData = [{
          lat: parseFloat(rawData.lat) || 0,
          lng: parseFloat(rawData.lon) || 0,
        }];
        console.log('Formatted Data:', formattedData);
        setHeatmapData(formattedData);
      } else {
        console.error('Data from API is not in the expected format:', rawData);
      }
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
    } finally {
      setLoading(false);
    }
  };


  fetchData();
}, []);
  

  return isLoaded && !loading ? (
    <div style={{ paddingTop: '5vh' }}>
      <GoogleMap
        mapContainerStyle={{
          ...containerStyle,
          outline: 'none',
        }}
        center={center}
        zoom={16.1}
        options={{ // Set the map options here
          mapTypeId: 'satellite', // Change the map type to satellite
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <HeatmapLayerF
        data={heatmapData.map(point => new window.google.maps.LatLng(point.lat, point.lng))}
      />
      </GoogleMap>
    </div>
  ) : <></>;
}

export default React.memo(Map);
