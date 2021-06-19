import React from 'react';
import { Fab, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 20,
        right: 20
    }
}));

export default function FloatingButton(props) {
    const classes = useStyles();
    const { children, className } = props;

    return (
        <Fab {...props} className={clsx(classes.root, className)}>
            {children}
        </Fab>
    )
}
