import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 40,
        maxWidth: 40,
        height: 40,
        borderRadius: 50,
        padding: 10,
    },
    small: {
        minWidth: 25,
        maxHeight: 25,
        padding: 5
    }
}));

export default function IconButton(props) {
    const classes = useStyles();
    const { children, size } = props;

    return (
        <Button
            className={classnames(classes.root, size && classes[size])}
            {...props}>
            {children}
        </Button>
    )
}
