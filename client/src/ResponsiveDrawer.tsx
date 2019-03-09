import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  WithTheme
} from "@material-ui/core/styles";
import Pixi from "./Pixi";
import About from "./About";
import Certificate from "./Certificate";
import { Fab } from "@material-ui/core";
import Weddings from "./Weddings";
import CreateWedding from "./CreateWedding";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: 25,
      left: 0,
      right: 0,
      margin: "0 auto"
    }
  });

export interface IResponsiveDrawerProps
  extends WithStyles<typeof styles>,
    WithTheme {}

export interface IResponsiveDrawerState {
  mobileOpen: boolean;
}

class ResponsiveDrawer extends React.Component<
  IResponsiveDrawerProps,
  IResponsiveDrawerState
> {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            button
            key={"Weddings"}
            component={({ innerRef, ...props }) => <Link {...props} to="/" />}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Weddings"} />
          </ListItem>
          <ListItem
            button
            key={"Certificate"}
            component={({ innerRef, ...props }) => (
              <Link {...props} to="/certificate" />
            )}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Certificate"} />
          </ListItem>
        </List>
        <Divider />
        <ListItem
          button
          key={"About"}
          component={({ innerRef, ...props }) => (
            <Link {...props} to="/about" />
          )}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"About"} />
        </ListItem>
      </div>
    );

    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                CryptoWedding
              </Typography>
              <Fab
                color="secondary"
                aria-label="Add"
                className={classes.fabButton}
                component={({ innerRef, ...props }) => (
                  <Link {...props} to="/create" />
                )}
              >
                <AddIcon />
              </Fab>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              <Route path="/" exact component={Weddings} />
              <Route path="/wedding/:weddingId" component={Pixi} />
              <Route path="/create" exact component={CreateWedding} />
              <Route path="/about/" component={About} />
              <Route path="/certificate/" component={Certificate} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
