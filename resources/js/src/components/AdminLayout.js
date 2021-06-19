import React, {useEffect, useRef, useState} from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {COLOR} from "../constants/theme";
import {
    Avatar,
    Button, Divider,
    Drawer,
    Grid,
    Icon,
    List,
    ListItem, ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Menu, MenuItem,
    Typography
} from "@material-ui/core";
import {
    AccountCircleOutlined,
    AssignmentOutlined,
    DashboardOutlined,
    LayersOutlined,
    ListAltOutlined,
    MenuOutlined,
    NotificationsOutlined,
    LocalLaundryServiceOutlined
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classnames from "classnames";
import CustomDropdown from "./CustomDropdown";

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    logo: {
        marginBottom: 30
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth,
        background: COLOR.WHITE,
        textAlign: 'center',
        padding: '50px 0',
        border: 'none'
    },
    menu: {
        padding: 20
    },
    menuItem: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,

        '& svg': {
            fontSize: 20
        },

        '& span': {
            fontSize: 14
        },

        '& .MuiListItemIcon-root': {
            minWidth: 40
        }
    },
    menuItemActive: {
        background: COLOR.PRIMARY,
        color: COLOR.WHITE,
        boxShadow: '0 7px 7px -7px rgba(8, 183, 131 ,0.75)',

        '& svg': {
            color: COLOR.WHITE
        },

        '&:hover': {
            background: COLOR.DARK_PRIMARY
        }
    },
    appBar: {
        width: `calc(100vw - ${drawerWidth + 40}px)`,
        maxHeight: 70,
        padding: 15,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        left: drawerWidth,
        background: COLOR.BODY,
        zIndex: 1,

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            left: 0
        }
    },
    content: {
        width: `calc(100vw - ${drawerWidth + 60}px)`,
        padding: '0 30px',
        marginTop: 80,

        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    accountMenu: {
        '& button': {
            marginRight: 5
        }
    },
    accountDropDown: {
        top: 70,
        right: 15
    },
    notifDropdown: {
        top: 70,
        right: 65
    },
    footer: {
        height: 70
    }
}));

const Menus = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardOutlined /> },
    { name: 'User', path: '/user', icon: <AccountCircleOutlined/> },
    { name: 'Service', path: '/service', icon: <LocalLaundryServiceOutlined/> },
    { name: 'Product', path: '/product', icon: <LayersOutlined/> },
    { name: 'Order', path: '/order', icon: <ListAltOutlined/> },
    { name: 'Report', path: '/report', icon: <AssignmentOutlined/> }
];

export default function AdminLayout(props) {
    const classes = useStyles();
    const { children, history } = props;
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawer, setDrawer] = useState(false);
    const pathname = history.location.pathname.split('/').filter(String);
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [notifDropdown, setNotifDropdown] = useState(false);

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {

            mounted.current = true;
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('dilaun_token');
        localStorage.removeItem('dilaun_user');

        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000);
    };

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
                open={mobile ? drawer : true}
                variant={mobile ? 'temporary' : 'persistent'}
                onClose={() => setDrawer(false)}
                {...props}>
                <Typography variant='h5' className={classes.logo}>logo.</Typography>

                <List className={classes.menu}>
                    {Menus.map(({name, icon, path}, i) => (
                        <ListItem
                            button
                            key={i}
                            className={classnames(
                                classes.menuItem,
                                pathname.indexOf(path.split('/')[1]) !== -1 && classes.menuItemActive
                            )}
                            onClick={() => history.push(path)}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className={classes.appBar}>
                {mobile ? (
                    <IconButton onClick={() => setDrawer(true)}>
                        <MenuOutlined/>
                    </IconButton>
                ) : <div/>}
                <div className={classes.accountMenu}>
                    <IconButton onClick={() => setNotifDropdown(!notifDropdown)}>
                        <NotificationsOutlined/>
                    </IconButton>
                    <IconButton onClick={() => setMenuDropdown(!menuDropdown)}>
                        <AccountCircleOutlined/>
                    </IconButton>
                </div>

                <CustomDropdown open={menuDropdown} className={classes.accountDropDown}>
                    <MenuItem>Account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </CustomDropdown>

                <CustomDropdown open={notifDropdown} className={classes.notifDropdown}>
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Summer BBQ"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            to Scott, Alex, Jennifer
                                        </Typography>
                                        {" — Wish I could come, but I'm out of town this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Oui Oui"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Sandra Adams
                                        </Typography>
                                        {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </CustomDropdown>
            </div>

            <main className={classes.content}>
                {children}
                <div className={classes.footer}/>
            </main>
        </div>
    )
}
