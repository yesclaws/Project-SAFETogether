import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from 'axios'

function CrimeCount_TimeofDay({ data }) {
  const [graphData, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  
  const fetchData = () => {
    if (!data || data.length === 0) {
      setNoData(true);
      return;
    }
  
    axios.get('incidents/incidents')
      .then(response => {
        const incidents = response.data; // Assuming the response is already parsed JSON
        const formattedData = incidents.map(incident => ({
          timeOfDay: incident.time_of_day || 'Unknown', // Adjust default value if necessary
          dayOfWeek: incident.day_of_week
        }));
  
        formattedData.forEach((item) => {
          const dayOfWeek = item.dayOfWeek; // Adjust variable names to match formatted data
          const timeOfDay = item.timeOfDay;
  
          const index = dayIndexMap[dayOfWeek];
  
          if (index !== undefined) {
            switch (timeOfDay) {
              case 'Morning':
                morningCounts[index] += 1;
                break;
              case 'Afternoon':
                afternoonCounts[index] += 1;
                break;
              case 'Evening':
                eveningCounts[index] += 1;
                break;
              case 'Midnight':
                midnightCounts[index] += 1;
                break;
              default:
                break;
            }
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  const loadData = (data) => {
    if (!data || data.length === 0) {
      // Set predefined data for an empty bar chart
      const emptyBarChartData = {
        x: ["No Data"], // Replace with desired categories
        y: [2000, 5000, 10000, 20000], // Adjust values based on your preference
        type: "bar",
        marker: {
          color: "#D3D3D3", // Set color for the empty bar
        },
      };
  
      setData([emptyBarChartData]);
      return;
    }
  

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Initialize arrays to store counts for different times of day
  const morningCounts = new Array(7).fill(0);
  const afternoonCounts = new Array(7).fill(0);
  const eveningCounts = new Array(7).fill(0);
  const midnightCounts = new Array(7).fill(0);

  // Create a map to get the index of the day of the week
  const dayIndexMap = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4,
    'Saturday': 5,
    'Sunday': 6,
  };

  // Create traces for each time of day
  const trace1 = {
    x: daysOfWeek,
    y: morningCounts,
    name: 'Morning',
    type: 'bar',
    marker: { color: '#001F3F' }
  };

  const trace2 = {
    x: daysOfWeek,
    y: afternoonCounts,
    name: 'Afternoon',
    type: 'bar',
    marker: { color: '808080' }
  };

  const trace3 = {
    x: daysOfWeek,
    y: eveningCounts,
    name: 'Evening',
    type: 'bar',
    marker: { color: '#C0C0C0' }
  };

  const trace4 = {
    x: daysOfWeek,
    y: midnightCounts,
    name: 'Midnight',
    type: 'bar',
    marker: { color: '#654321' }
  };

  const plotlyData = [trace1, trace2, trace3, trace4];
  setNoData(false);
  setData(plotlyData);
};
  useEffect(() => {
    fetchData(data); ///changed from loadData to fetchData
  }, [data]);

  console.log({ graphData });
  return (
    <div style={{ position: "relative" }}>
      {noData && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          No Crime Data Found
        </div>
      )}
      <div
        style={{
          height: "100%",
          background: "white",
          borderRadius: 17,
          padding: 0,
          margin: 0,
        }}
      >
        <Plot
          data={graphData}
          layout={{
            title: {
              text: "Crime Count At Different Times Of Day",
              font: {
                family: "Merriweather",
                size: "20",
                color: "black",
                bold: true,
                weight: "bolder",
              },
            },
            barmode: "stack",
            marginTop: "-20px",
            padding: "-20px",
            width: 650,
            height: 380,
            autosize: false,
          }}
          useResizeHandler={true}
          style={{
            width: "300px",
            height: "350px",
            color: "Viridis",
            marginTop: "-35px",
          }}
        />
      </div>
    </div>
  );
}

export default CrimeCount_TimeofDay;
