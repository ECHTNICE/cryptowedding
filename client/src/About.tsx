import React, { Component } from "react";
import "./About.css";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

class About extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper>
              <h1>About</h1>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>xs=12</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default About;
