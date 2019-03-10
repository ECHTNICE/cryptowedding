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
                                Cryptoweddings allows anyone to display their marriage for the world to see forever on
                                the Ethereum blockchain.
                            </p>
                            <hr/>
                            <p>
                                Built at #ETHParis in Paris with ❤ by the Team of ECHTNICE and Asure.Network.
                            </p>



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
