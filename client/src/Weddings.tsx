import React, { Component } from "react";
import WeddingCard from "./WeddingCard";

class Weddings extends Component {
  render() {
    return (
      <div>
        <h2>Upcomming Weddings</h2>

        <WeddingCard />

        <h2>Past Weddings</h2>
      </div>
    );
  }
}

export default Weddings;
