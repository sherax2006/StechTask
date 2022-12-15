import React, { Component } from "react";
import "../CSS/common.css"; 
class Dashboard extends Component {
  // componentDidMount() {
  //   VMService.VMS_login("admin", "here2enter").catch((err) => {
  //     console.log(err);
  //   });
  // }
  render() {
    return (
      <div>
        <h1
          style={{
            color: "#222730",
            fontWeight: "600",
            fontFamily: "Poppins",
            fontSize: "2rem",
            marginTop: "5rem",
            marginLeft: ".5rem",
          }}
        >
          Dashboard
        </h1>
      </div>
    );
  }
}

export default Dashboard;
