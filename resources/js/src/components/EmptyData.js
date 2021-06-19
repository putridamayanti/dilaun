import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function EmptyData() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>No Data</Typography>
        </div>
    )
}
