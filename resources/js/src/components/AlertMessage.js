import React from "react";
import {Alert} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px 0',
    }
}));

export default function AlertMessage({ messages, ...props }) {
    const classes = useStyles();

    return (
        <Alert className={classes.root} {...props}>
            {Array.isArray(messages) ? messages.map(item => (
                <span key={item}>{item}<br/></span>
            )) : (
                <span>{messages}</span>
            )}
        </Alert>
    )
}
