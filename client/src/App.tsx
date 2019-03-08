import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MyComponent from "./MyComponent";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: pink
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ResponsiveDrawer />
      </MuiThemeProvider>
    );
  }
}
//    <MyComponent address="0x9FCaFcca8aec0367abB35fBd161c241f7b79891B" />
export default App;
