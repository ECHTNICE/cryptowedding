import React, {Component} from "react";
import "./About.css";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";



class About extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper style={{padding: "15px"}}>
                            <h1>About</h1>

                            <h2>WHAT IS CRYPTOWEDDING?</h2>
                            <p>
                                Cryptoweddings allows anyone to display their marriage for the world to see forever on
                                the Ethereum blockchain.
                            </p>
                            <p>
                                Immutable. Permisionless. Uncensorable.
                            </p>

                            <h2>WHY CRYPTOWEDDING?</h2>
                            <p>
                                There are more and more NFTs and we wanted to show that there are many more use cases for NFTs and all that with something fun and a wink.
                            </p><p>
                                Since we were dealing with real world problems, we wanted to take a break and do something completely different than always to save the world. ;-)
                            </p>

                            <p>
                                Built at #ETHParis in Paris with <span className="text-active">❤</span> by the Team of <a href="https://echtnice.com" target="_blank">ECHTNICE</a> and <a href="https://asure.network" target="_blank">ASURE.NETWORK</a>.
                            </p>

                            <h2>READ MORE...</h2>
                            <Grid container spacing={24}>
                                <Grid item xs={1} style={{textAlign:"center"}}>
                                    <a href="https://echtnice.com" target="_blank">
                                        <img src={process.env.PUBLIC_URL +"/echtnice.png"} style={{width:"64px",height:"64px"}}/>
                                    </a>
                                </Grid>
                                <Grid item xs={1} style={{textAlign:"center"}}>
                                    <a href="https://asure.network" target="_blank">
                                        <img src={process.env.PUBLIC_URL +"/asure.png"} style={{width:"64px",height:"64px",opacity: 0.5}}/>
                                    </a>
                                </Grid>
                                <Grid item xs={1} style={{textAlign:"center"}}>
                                    <a href="https://github.com/ECHTNICE/cryptowedding" target="_blank">
                                    <svg style={{width:"64px",height:"64px"}} viewBox="0 0 24 24">
                                        <path fill="#888888" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                                    </svg>
                                    </a>
                                </Grid>
                                <Grid item xs={1} style={{textAlign:"center"}}>
                                    <a href="https://medium.com/AsureNetwork" target="_blank">
                                    <svg style={{width:"64px",height:"64px"}} viewBox="0 0 24 24">
                                        <path fill="#888888" d="M4.37,7.3C4.4,7.05 4.3,6.81 4.12,6.65L2.25,4.4V4.06H8.05L12.53,13.89L16.47,4.06H22V4.4L20.4,5.93C20.27,6.03 20.2,6.21 20.23,6.38V17.62C20.2,17.79 20.27,17.97 20.4,18.07L21.96,19.6V19.94H14.12V19.6L15.73,18.03C15.89,17.88 15.89,17.83 15.89,17.59V8.5L11.4,19.9H10.8L5.57,8.5V16.14C5.5,16.46 5.63,16.78 5.86,17L7.96,19.57V19.9H2V19.57L4.1,17C4.33,16.78 4.43,16.46 4.37,16.14V7.3Z" />
                                    </svg>
                                    </a>
                                </Grid>
                                <Grid item xs={1} style={{textAlign:"center"}}>
                                    <a href="https://twitter.com/ECHTNICE" target="_blank">
                                    <svg style={{width:"64px",height:"64px"}} viewBox="0 0 24 24">
                                        <path fill="#888888" d="M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
                                    </svg>
                                    </a>
                                </Grid>
                            </Grid>


                            <hr/>

                            <h2>MIT License</h2>

                            Copyright &copy; 2019 <a href="https://echtnice.com" target="_blank">ECHTNICE</a> and <a href="https://asure.network" target="_blank">ASURE.NETWORK</a>
                            <p>
                                Permission is hereby granted, free of charge, to any person obtaining a copy
                                of this software and associated documentation files (the "Software"), to deal
                                in the Software without restriction, including without limitation the rights
                                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                copies of the Software, and to permit persons to whom the Software is
                                furnished to do so, subject to the following conditions:
                            </p><p>
                            The above copyright notice and this permission notice shall be included in all
                            copies or substantial portions of the Software.
                        </p> <p>
                            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                            SOFTWARE.
                        </p>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default About;
