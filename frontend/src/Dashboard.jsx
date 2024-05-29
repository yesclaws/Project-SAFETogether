import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@mantine/core";
import CrimeCount_Time from "./CrimeCount_Time";
import CrimeCount_CommonlyCommitted from "./CrimeCount_CommonlyCommitted";
import CrimeCount_HolvsSch from "./CrimeCount_HolvsSch";
import CrimeCount_TimeofDay from './CrimeCount_TimeofDay';
import CrimeLast30Days from './CrimeLast30Days';
import './styles.css';
import axios from 'axios';

function LeadGrid() {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("/incidents/incidents");  
        if (response.status != 200) {
          throw new Error("Failed to fetch data");
        }
        setData(JSON.parse(response.data));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);
  
  const filterData = useCallback(() => {
    const filteredData = data.filter((item) => {
      const incidentDate = new Date(item["DateTime"]);

      if (startDate && endDate) {
        return (
          incidentDate >= new Date(startDate) &&
          incidentDate <= new Date(endDate)
        );
      } else if (startDate) {
        return incidentDate >= new Date(startDate);
      } else if (endDate) {
        return incidentDate <= new Date(endDate);
      }

      return true; // If no date is selected, include all data
    });

    // Update the filtered data
    setFilteredData(filteredData);
  }, [startDate, endDate, data]);

  
  return (
    <div style={{ paddingTop: '6vh' }}>
      <div className="dashboard-container" style={{ background: "white", marginTop: "-20px" }}>
        <h1 style={{ fontSize: "25px", marginTop: "0px", fontFamily: "Merriweather"}}>Welcome, Security Team!</h1>
        <p style={{ fontSize: "18px", marginTop: "-20px", fontFamily: "Merriweather" }}>NUS Campus Security Dashboard</p>
        <Grid>
          <Grid.Col span={12} style={{ padding: "8px 0px 0px 8px", height: '58px' }}>
              <label style={{display: "inline-block", marginRight: "10px", fontFamily: "Merriweather"}}>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ marginRight: "10px", fontFamily: "Merriweather" }}
              />
              <label style={{ marginRight: "10px", fontFamily: "Merriweather"}}>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ marginRight: "10px",fontFamily: "Merriweather"  }}
              />
              <button onClick={() => filterData()} style={{ marginLeft: "10px",fontFamily: "Merriweather" }}>
                Apply Date Filter
              </button>
          </Grid.Col>
        </Grid>
        <br />
        <Grid>
          <Grid.Col span={3}>
            <CrimeLast30Days data={filteredData ?? data} />
          </Grid.Col>
          <Grid.Col span={3}>
              <CrimeCount_HolvsSch data={filteredData ?? data} />
          </Grid.Col>
          <Grid.Col span={6}>
            <CrimeCount_TimeofDay data={filteredData ?? data} />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <CrimeCount_Time data={filteredData ?? data} />
          </Grid.Col>
          <Grid.Col span={6}>
            <CrimeCount_CommonlyCommitted data={filteredData ?? data} />
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
export default LeadGrid;
