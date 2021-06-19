import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialogContent-root': {
            overflowY: 'hidden',
            paddingBottom: 20
        },
        '& .MuiDialog-paperWidthMd': {
            minWidth: 600
        },
        '& .MuiDialog-paperWidthLg': {
            minWidth: 800
        }
    },
    paper: {
        padding: 15,
        borderRadius: 20,
    },
    title: {
        padding: 15,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}))

export default function CustomDialog(props) {
    const classes = useStyles();
    const { title, open, onClose, children, size } = props;

    return (
        <Dialog
            open={open}
            scroll="body"
            maxWidth={size ?? "md"}
            onClose={onClose}
            className={classes.root}
            classes={{ paper: classes.paper }}
            {...props}>
            <Box className={classes.title}>
                <Typography variant="h6">{title}</Typography>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
            <DialogContent tabIndex={-1}>
                { children }
            </DialogContent>
        </Dialog>
    );
}
