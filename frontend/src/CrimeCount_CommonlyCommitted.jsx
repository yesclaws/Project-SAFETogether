import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function CrimeCount_CommonlyCommitted({ data }) {
  const [graphData, setData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      if (!data) {
        return;
      }
      console.log({ data });
      const crimeCounts = {};
      data.forEach((item) => {
        const category = item["category"];
        if (!crimeCounts[category]) {
          crimeCounts[category] = 0;
        }
        crimeCounts[category]++;
      });
      // Sort the crime counts in descending order
      const sortedCrimeCounts = Object.entries(crimeCounts).sort(
        (a, b) => a[1] - b[1]
      );

      // Take the top 10 most commonly committed crimes
      const top10Crimes = sortedCrimeCounts.slice(0, 10);

      // Prepare data for the bar chart
      const categories = top10Crimes.map((entry) => entry[0]);
      const counts = top10Crimes.map((entry) => entry[1]);

      const barChartData = [
        {
          x: counts,
          y: categories,
          type: "bar",
          orientation: "h",
          marker: {
            colors: ["lightpink"] // Set custom colors for each segment
          }
        },
      ];

      setData(barChartData);
    };

    loadData(data);
  }, [data]);

  return (
    <div style={{background: "white", borderRadius: 12, marginTop: "-12px" }}>
      <Plot
        data={graphData}
        layout={{
          title: {
            text: "Top 10 Most Commonly Committed Crimes",
            font:{
              family: "Merriweather",
              size: "20",
              color: "black"
            }
          }
        }}
        useResizeHandler={true}
        style={{width: "650px", height: "400px"}}
      />
    </div>
  );
}

export default CrimeCount_CommonlyCommitted;
