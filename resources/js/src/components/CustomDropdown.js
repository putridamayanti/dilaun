import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Card, CardContent, Fade} from "@material-ui/core";
import classnames from "classnames";

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 100,
        position: 'absolute',

        '& .MuiCardContent-root': {
            padding: 15
        }
    }
}));

export default function CustomDropdown(props) {
    const classes = useStyles();
    const { className, children, open } = props;

    return (
        <Fade in={open}>
            <div className={classnames(
                classes.root,
                className
            )}>
                <Card>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </Fade>
    )
}
