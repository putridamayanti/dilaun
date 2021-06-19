import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: '15px 0'
    }
}));

export default function Spinner() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    )
}
