import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Button, Drawer, Typography} from "@material-ui/core";
import {COLOR} from "../constants/theme";
import {DashboardOutlined} from "@material-ui/icons";

const drawerWidth = 160;
const useStyles = makeStyles((theme) => ({
    root: {
        width: drawerWidth,
    },
    logo: {
        marginBottom: 30
    },
    drawerPaper: {
        width: drawerWidth,
        background: COLOR.WHITE,
        textAlign: 'center',
        padding: 50,
        border: 'none'
    },
    menuItem: {
        width: '100%',
        height: 50,
        borderRadius: 15
    }
}));

const Menus = [
    { name: 'Dashboard', icon: <DashboardOutlined/> }
]

export default function CustomDrawer(props) {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.root}
            classes={{
                paper: classes.drawerPaper
            }}
            open={true}
            variant='persistent'
            {...props}>
            <Typography variant='h5' className={classes.logo}>logo.</Typography>

            <div>
                {Menus.map(({name, icon}, i) => (
                    <Button
                        key={i}
                        className={classes.menuItem}
                        startIcon={icon}>
                        {name}
                    </Button>
                ))}
            </div>
        </Drawer>
    )
}
