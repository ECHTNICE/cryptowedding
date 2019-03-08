import React, { Component } from "react";
import "./Certificate.css";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import {Howl, Howler} from 'howler';



class Certificate extends Component {

    componentDidMount(){
        /*var sound = new Howl({
            src: ['audio/01.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        });*/
    }

     SvgWithXlink () {
        return (
            <svg viewBox="0 0 500 500">
                <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                <text width="500">
                    <textPath xlinkHref={ "#curve" }>
                        &nbsp;Marriage
                    </textPath>
                </text>
            </svg>
        );
    }

  render() {
    return <div>

        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Paper >xs=12</Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper >xs=2</Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper>
                    {this.SvgWithXlink()}
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper >xs=2</Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper >xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper >xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper >xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper >xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper >xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper>xs=3</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper >xs=12</Paper>
            </Grid>
        </Grid>

    </div>;
  }
}

export default Certificate;
