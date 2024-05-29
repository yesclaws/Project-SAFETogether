import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function CrimeCount_Time({ data }) {
  const [graphData, setGraphData] = useState();
  useEffect(() => {
    const loadData = () => {
      if (!data) {
        return;
      }
      // Process the data to calculate crime count by category and year
      const crimeCounts = {};
      data.forEach((item) => {
        const year = item["year"];
        const category = item["category"];
        if (!crimeCounts[year]) {
          crimeCounts[year] = {};
        }
        if (!crimeCounts[year][category]) {
          crimeCounts[year][category] = 0;
        }
        crimeCounts[year][category]++;
      });

      // Prepare the data for the line graph
      const categories = Object.keys(crimeCounts[Object.keys(crimeCounts)[0]]);
      const years = Object.keys(crimeCounts);
      const parsedData = categories.map((category) => ({
        x: years,
        y: years.map((year) => crimeCounts[year][category] || 0),
        type: "scatter",
        mode: "lines+points",
        name: category,
      }));

      setGraphData(parsedData);
    };

    loadData(data);
  }, [data]);

  return (
    <div style={{ background: "white",  borderRadius: 12, marginTop: "-12px"}}>
      <Plot
        data={graphData}
        layout={{
          title: {
            text: "Crime Count by Year",
            font:{
              family: "Merriweather",
              size: "20",
              color: "black",
            }
          }
        }}
        useResizeHandler={true}
        style={{ width: "650px", height: "400px" }}
      />
    </div>
  );
}

export default CrimeCount_Time;
