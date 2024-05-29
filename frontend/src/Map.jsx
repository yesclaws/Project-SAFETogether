import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsProvider';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '89vh'
};

const center = {
  lat: 1.2966,
  lng: 103.7764,
};

function Map() {
  const { isLoaded } = useGoogleMaps()
  const [map, setMap] = React.useState(null);
  const [clickedMarker, setClickedMarker] = React.useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPhone, setFilterPhone] = useState('');
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    setLoading(true)
    axios.get('/incidents/incidents')
      .then(response => {
        // Parse the JSON string and map it to the desired format
        const incidents = JSON.parse(response.data);
        const formattedData = incidents.map(incident => ({
          // Ensure it's a valid number or default to 0
          lat: parseFloat(incident.lat) || 0, 
          lng: parseFloat(incident.lon) || 0, 
          individuals: incident.student_name,
          contact: incident.student_contact_no,
          location: incident.area,
          category: incident.category,
          details: incident.additional_info,
        }));
        setPositions(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(()=> {
        setLoading(false)
      });
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (position) => {
    setClickedMarker(position);
  };

  const handleMapClick = (e) => {
    // Prevent the default behavior of showing a pre-built InfoWindow for map clicks
    e.preventDefault();
  };

  const filteredPositions = positions.filter((position) => {
    const categoryMatch =
      filterCategory === 'All' || position.category.toLowerCase().includes(filterCategory.toLowerCase());
  
    const phoneMatch = position.contact.trim().toLowerCase().includes(filterPhone.trim().toLowerCase());
  
    return categoryMatch && phoneMatch;
  });

  
  return isLoaded && !loading ? (
    <div style={{ paddingTop: '4vh' }}>
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        <div>
          <label>Filter by Category: </label>
          <select style={{height: '30px'}} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Theft">Theft</option>
            <option value="Vandalism">Vandalism</option>
            <option value="Peeping Tom">Peeping Tom</option>
            <option value="Assault">Assault</option>
            {/* Add more options for different categories */}
          </select>
        </div>
        <div>
          <label>Filter by Phone: </label>
          <input 
            style={{height: '30px'}} 
            value={filterPhone} 
            onChange={(e) => setFilterPhone(e.target.value)}>
          </input>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={{
          ...containerStyle,
          outline: 'none',
        }}
        center={center}
        zoom={16.1}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {filteredPositions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            onClick={() => handleMarkerClick(position)} // Change to onClick
          />
        ))}

        {clickedMarker && (
          <InfoWindow
            position={clickedMarker}
            onCloseClick={() => setClickedMarker(null)}
          >
            <div className="popup" style={{width: "300px"}}>
              <h3>Details of Crime</h3>
              <p>Individuals Involved: {clickedMarker.individuals}</p>
              <p>Contact: {clickedMarker.contact}</p>
              <p>Location: {clickedMarker.location}</p>
              <p>Crime Category: {clickedMarker.category}</p>
              <p>Details: {clickedMarker.details}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : <></>;
}

export default React.memo(Map);
