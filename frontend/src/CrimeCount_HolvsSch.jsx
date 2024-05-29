import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function CrimeCount_HolvsSch({ data }) {
  const [graphData, setData] = useState([]);

  const isSchoolDay = (dayOfWeek) => {
    // Define the days of the week that are considered school days
    const schoolDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return schoolDays.includes(dayOfWeek);
  };

  const loadData = (data) => {
    if (!data) {
      return;
    }

    const holidayCount = data.filter(
      (item) => !isSchoolDay(item.day_of_week)
    ).length;
    const schoolDayCount = data.filter((item) =>
      isSchoolDay(item.day_of_week)
    ).length;

    const pieChartData = {
      values: [holidayCount, schoolDayCount],
      labels: ["Holiday", "School Day"],
      textinfo: "label+percent",
      type: "pie",
      marker: {
        colors: ["#6B8E23", "#001F3F"] // Set custom colors for each segment
      }
    };

    setData([pieChartData]);
  };

  useEffect(() => {
    loadData(data);
  }, [data]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
      }}
    >
      <Plot
        data={graphData}
        layout={{
          title: {
            text: "Holiday VS School Crime Count",
            font:{
              family: "Merriweather",
              size: "20",
              color: "black",
            }
          },
          marginTop:"-40px",
          marginRight: "5px",
          width: 365,
          height: 400,
          autosize: false
        }}
        style={{height: "100%", width: "100%", marginTop: "-35px" }}
      />
    </div>
  );
}

export default CrimeCount_HolvsSch;

