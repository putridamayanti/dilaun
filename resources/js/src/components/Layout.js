import React, { useState } from 'react';
import clsx from 'clsx';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from "@material-ui/core";
import {
    ChevronLeft, ChevronRight, Menu, Dashboard, AccountCircle, Layers, ListAlt, Assignment
} from '@material-ui/icons';
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
        marginRight: theme.spacing(2),
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
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
}));

const menus = [
    { name: 'Dashboard', path: '/', icon: <Dashboard/> },
    { name: 'User', path: '/user', icon: <AccountCircle/> },
    { name: 'Product', path: '/product', icon: <Layers/> },
    { name: 'Order', path: '/order', icon: <ListAlt/> },
    { name: 'Report', path: '/report', icon: <Assignment/> },
];

export default function Layout(props) {
    const { children, history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawer, setDrawer] = useState(!mobile);
    const handleDrawerToggle = () => {
        setDrawer(!drawer);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        className={clsx(classes.menuButton, drawer && classes.hide)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        DILAUN
                    </Typography>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant={mobile ? 'temporary' : 'persistent'}
                anchor="left"
                open={drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setDrawer(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menus.map(({name, path, icon}, i) => (
                        <ListItem button key={i} onClick={() => history.push(path)}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={clsx(classes.content, {
                [classes.contentShift]: drawer,
            })}>
                <div className={classes.toolbar} />
                <div>
                    {children}
                </div>
            </main>
        </div>
    )
}
