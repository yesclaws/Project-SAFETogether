import React from "react";
import { Grid } from "@mantine/core";
import './styles.css';

function LeadGrid() {
  return (
    <div style={{ paddingTop: '6vh' }}>
     <div className="dashboard-container" style={{ background: "white", marginTop: "-20px" }}>
        <h1 style={{ fontSize: "25px", marginTop: "0px", fontFamily: "Merriweather"}}>Welcome, Security Team!</h1>
        <p style={{ fontSize: "18px", marginTop: "-20px", fontFamily: "Merriweather" }}>NUS Campus Security Dashboard</p>
        <Grid>
        <Grid.Col span={6}>
            <div className = "center-img" style={{marginTop:"-25px", marginLeft: "-40px"}}>
            <figure>
              <img
                src="src/images/Larencyplots.png"
                alt="Graph"
                style={{ width: "100%", height: "500px", objectFit: "contain" }}
              />
              <figcaption style= {{fontSize: "15px", marginTop: "-20px", fontFamily: "Merriweather", marginTop: "20px", marginLeft: "10px"}}>Weekend: Larceny Theft occurrence is consistently higher from midnight 0000-0159 and 1300-2359</figcaption>
              <figcaption style= {{fontSize: "15px", marginTop: "-20px", fontFamily: "Merriweather", marginTop: "0px", marginLeft: "10px"}}>Weekday:  Larceny Theft occurrence is consistently high from 0800-0059 the next day</figcaption>
            </figure>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className = "center-img" style={{marginLeft: "-40px", marginTop: "-25px"}}>
            <figure>
              <img
                src="src/images/CrimeOccurences.png"
                alt="Graph"
                style={{ width: "100%", height: "500px", objectFit: "contain" }}
              />
              <figcaption style= {{fontSize: "15px", fontFamily: "Merriweather", marginTop: "20px", marginLeft: "-10px"}}>Weekend: Crimes happens most often mostly around midnight, from 2300-0259</figcaption>
              <figcaption style= {{fontSize: "15px", fontFamily: "Merriweather", marginTop: "0px", marginLeft: "-10px"}}>Weekday: Crimes are consistently high from 0800-0059 the next day</figcaption>
            </figure>
            </div>
          </Grid.Col>
        </Grid> 
        <br></br>
        <Grid>
          <Grid.Col span={6} style={{  }}>
          <p style= {{fontSize: "14px", marginTop: "-60px", fontFamily: "Merriweather"}}>
              Weekday:  Larceny Theft occurrence is consistently high from 0800-0059 the next day</p>
          </Grid.Col>
        </Grid> 
      </div>
    </div>
  );
}
export default LeadGrid;
