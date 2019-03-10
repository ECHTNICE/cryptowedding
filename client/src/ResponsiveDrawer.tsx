import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
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
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {createStyles, Theme, withStyles, WithStyles, WithTheme} from "@material-ui/core/styles";
import Pixi from "./Pixi";
import About from "./About";
import Certificate from "./Certificate";
import {Fab} from "@material-ui/core";
import Weddings from "./Weddings";
import CreateWedding from "./CreateWedding";
import AcceptWedding from "./AcceptWedding";
import classNames from 'classnames';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    toolbar: theme.mixins.toolbar,
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: 25,
        right: 50
    }
});



export interface IResponsiveDrawerProps
    extends WithStyles<typeof styles>,
        WithTheme {
}

export interface IResponsiveDrawerState {
    open: boolean;
}

class ResponsiveDrawer extends React.Component<IResponsiveDrawerProps,
    IResponsiveDrawerState> {

    state = {
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, theme} = this.props;
        const {open} = this.state;
        const drawer = (
            <div>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button
                        key={"Weddings"}
                        component={({innerRef, ...props}) => <Link {...props} to="/"/>}
                    >
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Weddings"}/>
                    </ListItem>
                    <ListItem
                        disabled={true}
                        button
                        key={"Certificate"}
                        component={({innerRef, ...props}) => (
                            <Link {...props} to="/certificate"/>
                        )}
                    >
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Certificate"}/>
                    </ListItem>
                </List>
                <Divider/>
                <ListItem
                    button
                    key={"About"}
                    component={({innerRef, ...props}) => (
                        <Link {...props} to="/about"/>
                    )}
                >
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"About"}/>
                </ListItem>
            </div>
        );

        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed"
                            className={classNames(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                CryptoWedding
                            </Typography>
                            <Fab
                                color="secondary"
                                aria-label="Add"
                                className={classes.fabButton}
                                component={({innerRef, ...props}) => (
                                    <Link {...props} to="/create"/>
                                )}
                            >
                                <AddIcon/>
                            </Fab>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                                className={classes.drawer}
                                variant="persistent"
                                anchor="left"
                                open={open}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >

                                {drawer}
                    </Drawer>
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.toolbar}/>
                        <div>
                            <Route path="/" exact component={Weddings}/>
                            <Route path="/wedding/:weddingId/:view" component={Pixi}/>
                            <Route path="/create" exact component={CreateWedding}/>
                            <Route
                                path="/accept/:weddingId"
                                exact
                                component={AcceptWedding}
                            />
                            <Route path="/about/" component={About}/>
                            <Route path="/certificate/" component={Certificate}/>
                        </div>
                    </main>
                </div>
            </Router>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ResponsiveDrawer);
