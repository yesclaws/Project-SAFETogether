import React, { useState, useEffect } from "react";

function CrimeLast30Days({ data }) {
  console.log("crime30", data)
  const [past30, setPast30] = useState(0);
  const [myText, setMyText] = useState("No change");

  useEffect(() => {
    const loadData = () => {
      if (!data) {
        return ;
      }
      const todayDate = new Date(2013, 10, 31);
      const last30Days = new Date(todayDate);
      const prev30Days = new Date(todayDate);
      last30Days.setDate(todayDate.getDate() - 30);
      prev30Days.setDate(todayDate.getDate() - 60);
      var last30DaysCounter = 0;
      var prev30DaysCounter = 0;

      data.forEach((item) => {
          var currDate = new Date(item['year'], item['month'], item['day']);
          if (item['year'] == 2013 && item['month' == 12]) {
            console.log(currDate);
          }
          if (currDate >= prev30Days && currDate <= last30Days) {
            prev30DaysCounter += 1;
          } else if (currDate >= last30Days) {
            last30DaysCounter += 1;
          }
      })

      const past30Value = last30DaysCounter - prev30DaysCounter;
      setPast30(past30Value);

      let toPrint = "No change";
      if (last30DaysCounter > prev30DaysCounter) {
        let percChange = 100 * (last30DaysCounter - prev30DaysCounter) / last30DaysCounter;
        percChange = percChange.toFixed(2); // Round to two decimal places
        toPrint = percChange + " increase";
      } else if (last30DaysCounter < prev30DaysCounter){ 
        let percChange = -100 * (last30DaysCounter - prev30DaysCounter) / last30DaysCounter;
        percChange = percChange.toFixed(2); // Round to two decimal places
        toPrint = percChange + " decrease";
      }
      setMyText(toPrint.toString().substring(0, 5) + "%");
    };

    loadData(data);
  }, [data]);

  const textColor = past30 < 0 ? "red" : "green";

  return (
    <div style={{flex: 1, height: "60%", background: "white", borderRadius: 12, padding: 4 }}>
      <h5 style={{ fontSize: "6", marginTop:"-5px", fontWeight: "normal",fontFamily:"Merriweather" }} >As compared to the previous 30 days</h5>
      <h3 style={{fontSize: "20",marginTop:"-25px",fontWeight: "normal",fontFamily:"Merriweather"}}>Crime Count:</h3>
      <h1 style={{ color: textColor, fontSize: "30",fontFamily:"Merriweather"}}><span id="past30">{past30}</span></h1>
      <h3 style={{fontSize: "20",fontWeight: "normal",fontFamily:"Merriweather"}}>Percentage change in crime rate (%):  </h3>
      <h1 style={{ color: textColor, fontSize: "30",fontFamily:"Merriweather"}}><span id="myText">{myText}</span></h1> 
    </div>
  );
}

export default CrimeLast30Days;
